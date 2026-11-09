(() => {
  "use strict";
  const byId = (id) => document.getElementById(id);
  const text = (id, value) => { byId(id).textContent = value; };
  const number = (id) => Number(byId(id).value);
  const formatCount = new Intl.NumberFormat("en");
  const labIds = ["bayes", "margin", "interval"];

  function showLab(id) {
    if (!labIds.includes(id)) return;
    for (const lab of labIds) {
      byId(lab).hidden = lab !== id;
      const link = document.querySelector('.lab-nav a[href="#' + lab + '"]');
      if (lab === id) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  }

  function updateBayes() {
    const prevalence = number("prevalence");
    const sensitivity = number("sensitivity");
    const falseAlarm = number("false-alarm");
    const defective = 100 * prevalence;
    const sound = 10000 - defective;
    const trueFlags = defective * sensitivity / 100;
    const falseFlags = sound * falseAlarm / 100;
    const totalFlags = trueFlags + falseFlags;
    for (const id of ["prevalence", "sensitivity", "false-alarm"]) {
      text(id + "-val", byId(id).value + "%");
      byId(id).setAttribute("aria-valuetext", byId(id).value + " percent");
    }
    for (const [id, value] of Object.entries({
      "defective-count": defective, "sound-count": sound, "true-flags": trueFlags,
      "false-flags": falseFlags, "missed-count": defective - trueFlags, "clear-count": sound - falseFlags
    })) text(id, formatCount.format(value));
    if (totalFlags === 0) {
      text("posterior", "Undefined");
      text("bayes-reading", "No joints are flagged. The conditional probability has a zero denominator.");
    } else {
      const percent = 100 * trueFlags / totalFlags;
      text("posterior", percent.toLocaleString("en", {maximumFractionDigits: 2}) + "%");
      text("bayes-reading", formatCount.format(trueFlags) + " defective among " + formatCount.format(totalFlags) +
        " flagged. Divide true flags by all flags to obtain P(defective | flagged).");
    }
  }

  // Upper tail for a positive standard normal score, evaluated without subtracting from one.
  function normalCdf(z) {
    if (z === 0) return 0.5;
    const x = Math.abs(z);
    const t = 1 / (1 + 0.2316419 * x);
    const polynomial = t * (0.319381530 + t * (-0.356563782 + t *
      (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
    const tail = Math.exp(-0.5 * x * x) * polynomial / Math.sqrt(2 * Math.PI);
    return z < 0 ? tail : 1 - tail;
  }

  function probabilityLabel(p) {
    if (p < 0.0001) return "< 0.01%";
    if (p > 0.9999) return "> 99.99%";
    return (100 * p).toFixed(2) + "%";
  }

  const svgNs = "http://www.w3.org/2000/svg";
  function shape(chart, tag, attributes, label) {
    const element = document.createElementNS(svgNs, tag);
    for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
    if (label !== undefined) element.textContent = label;
    chart.append(element);
    return element;
  }
  const line = (chart, x1, y1, x2, y2, style) => shape(chart, "line", {x1, y1, x2, y2, class: style});
  const label = (chart, x, y, value, anchor = "middle", style = "") =>
    shape(chart, "text", {x, y, "text-anchor": anchor, class: style}, value);

  function drawMargin(mean, sd) {
    const chart = byId("margin-chart");
    chart.replaceChildren();
    const left = Math.min(mean - 4 * sd, -0.6 * sd);
    const right = Math.max(mean + 4 * sd, 0.6 * sd);
    const x = (g) => 16 + 508 * (g - left) / (right - left);
    const base = 172;
    const y = (g) => base - 114 * Math.exp(-0.5 * ((g - mean) / sd) ** 2);
    function curve(start, end) {
      const points = [];
      for (let i = 0; i <= 240; i++) {
        const g = start + (end - start) * i / 240;
        points.push(x(g).toFixed(2) + "," + y(g).toFixed(2));
      }
      return points;
    }
    const shaded = [x(left) + "," + base, ...curve(left, 0), x(0) + "," + base];
    shape(chart, "polygon", {points: shaded.join(" "), class: "risk"});
    line(chart, 16, base, 524, base, "axis");
    line(chart, x(mean), 50, x(mean), base, "guide");
    if (mean !== 0) line(chart, x(0), 74, x(0), base + 5, "guide");
    shape(chart, "polyline", {points: curve(left, right).join(" "), class: "density"});
    label(chart, x(mean), 37, "Mean " + mean + " kN", "middle", "chart-emphasis");
    label(chart, x(0), base + 21, "0", "middle", "chart-emphasis");
    const step = right - left > 70 ? 20 : right - left > 35 ? 10 : 5;
    for (let tick = Math.ceil(left / step) * step; tick < right; tick += step) {
      const pos = x(tick);
      if (tick === 0 || Math.abs(pos - x(0)) < 31 || pos < 28 || pos > 512) continue;
      line(chart, pos, base, pos, base + 5, "axis");
      label(chart, pos, base + 21, tick);
    }
    label(chart, 270, 221, "Safety margin G (kN)");
  }

  function updateMargin() {
    const mean = number("headroom");
    const rho = number("correlation");
    const sd = Math.sqrt(8 ** 2 + 6 ** 2 - 2 * rho * 8 * 6);
    const probability = probabilityLabel(normalCdf(-mean / sd));
    text("headroom-val", mean + " kN");
    byId("headroom").setAttribute("aria-valuetext", mean + " kilonewtons");
    text("correlation-val", rho.toFixed(2));
    text("margin-sd", sd.toFixed(2) + " kN");
    text("failure-prob", probability);
    text("margin-reading", "SD(G) = √(8² + 6² − 2ρ × 8 × 6). The standard score at failure is " +
      (mean === 0 ? "0.00" : (-mean / sd).toFixed(2)) + ", giving a lower-tail probability of " + probability + ".");
    drawMargin(mean, sd);
  }

  const criticalValues = {90: 1.64485362695, 95: 1.95996398454, 99: 2.57582930355};
  function drawInterval(lower, upper) {
    const chart = byId("interval-chart");
    chart.replaceChildren();
    const x = (value) => 32 + 476 * (value - 22) / 20;
    label(chart, 32, 25, "Interval for the mean", "start", "chart-emphasis");
    line(chart, x(lower), 53, x(upper), 53, "interval-line");
    for (const value of [lower, upper]) line(chart, x(value), 44, x(value), 62, "interval-cap");
    shape(chart, "circle", {cx: x(32), cy: 53, r: 6.5, fill: "#153e50", stroke: "#fff", "stroke-width": 2});
    line(chart, x(32), 64, x(32), 145, "guide");
    label(chart, 32, 96, "One specimen SD (6 MPa)", "start");
    line(chart, x(32), 116, x(38), 116, "sigma-line");
    for (const value of [32, 38]) line(chart, x(value), 110, x(value), 122, "sigma-line");
    line(chart, 32, 146, 508, 146, "axis");
    for (let tick = 22; tick <= 42; tick += 2) {
      line(chart, x(tick), 146, x(tick), 151, "axis");
      label(chart, x(tick), 168, tick);
    }
    label(chart, 270, 191, "Strength (MPa)");
  }

  function updateInterval() {
    const n = number("sample-size");
    const confidence = number("confidence");
    const se = 6 / Math.sqrt(n);
    const critical = criticalValues[confidence];
    const halfWidth = critical * se;
    const lower = 32 - halfWidth;
    const upper = 32 + halfWidth;
    text("sample-size-val", String(n));
    text("interval-se", se.toFixed(2) + " MPa");
    text("interval-label", confidence + "% confidence interval");
    text("interval-bounds", lower.toFixed(2) + " – " + upper.toFixed(2) + " MPa");
    text("interval-reading", "Standard error = 6/√" + n + " MPa. The margin of error is " +
      critical.toFixed(3) + " × " + se.toFixed(2) + " ≈ " + halfWidth.toFixed(2) +
      " MPa; the full interval width is " + (2 * halfWidth).toFixed(2) + " MPa.");
    drawInterval(lower, upper);
  }

  const update = {bayes: updateBayes, margin: updateMargin, interval: updateInterval};
  for (const lab of labIds) {
    const panel = byId(lab);
    panel.addEventListener("input", update[lab]);
    panel.querySelector("[data-reset]").addEventListener("click", () => {
      for (const input of panel.querySelectorAll("input")) input.value = input.defaultValue;
      for (const select of panel.querySelectorAll("select")) {
        select.value = [...select.options].find((option) => option.defaultSelected).value;
      }
      update[lab]();
    });
    update[lab]();
  }
  showLab(labIds.includes(location.hash.slice(1)) ? location.hash.slice(1) : "bayes");
  window.addEventListener("hashchange", () => showLab(location.hash.slice(1)));
})();
