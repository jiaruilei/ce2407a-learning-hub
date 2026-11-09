/* Browser-only workbook. Canvas supplies the source papers and optional course pack. */
(() => {
  "use strict";
  const base = "https://canvas.nus.edu.sg/courses/93981/files/folder/Past%20year%20exam%20questions";
  const catalogue = [
    {year:"2024", label:"AY 2024/25", count:4, file:"10625024"},
    {year:"2023", label:"AY 2023/24", count:5, file:"10625023"},
    {year:"2022", label:"AY 2022/23", count:5, file:"10625022"},
    {year:"2021", label:"AY 2021/22", count:5, file:"10625021"}
  ];
  const prefix = "ce2407a.exam-workbook.v1.";
  const memory = new Map();
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const record = x => x !== null && typeof x === "object" && !Array.isArray(x);
  const route = (paper, number) => "#/exams/" + paper.year + (number ? "/" + number : "");
  let temporary = false;
  let current = null;
  let importMessage = "";
  function read(key) {
    try {
      const value = memory.has(key) ? memory.get(key) : localStorage.getItem(prefix + key);
      return value ? JSON.parse(value) : null;
    } catch { return null; }
  }
  function write(key, value) {
    const text = JSON.stringify(value);
    try { localStorage.setItem(prefix + key, text); memory.delete(key); }
    catch {
      memory.set(key, text);
      temporary = true;
      const flag = document.getElementById("workbook-storage");
      if (flag) flag.hidden = false;
    }
  }
  function clear() {
    try {
      for (const key of Object.keys(localStorage)) if (key.startsWith(prefix)) localStorage.removeItem(key);
    } catch { /* In-memory changes are cleared below. */ }
    memory.clear();
    importMessage = "";
    current = null;
  }
  const questionKey = (p, n) => "q." + p.year + "." + n;
  function questionState(p, n) {
    const saved = read(questionKey(p, n)) || {};
    return {
      note:typeof saved.note === "string" ? saved.note : "", reviewed:saved.reviewed === true,
      flagged:saved.flagged === true, answers:record(saved.answers) ? saved.answers : {},
      checks:record(saved.checks) ? saved.checks : {}, signature:saved.signature || ""
    };
  }
  function link(url, label) {
    return `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>`;
  }
  const paperLink = p => link(base + "?preview=" + p.file, "Exam paper");
  const keyLink = () => link(base + "?preview=10625025", "Numerical solutions");
  function packLink() {
    if (!window.EXAM_PACK_URL) return "";
    try {
      const url = new URL(window.EXAM_PACK_URL);
      if (url.protocol === "https:" && url.hostname === "canvas.nus.edu.sg") return link(url.href, "Get course pack on Canvas");
    } catch { /* A local file can still be imported. */ }
    return "";
  }
  const savedPack = () => read("pack") || {};
  function importBlock(openIfEmpty = false) {
    const pack = savedPack(), loaded = catalogue.filter(p => pack[p.year]).map(p => p.label);
    return `<details class="wb-import"${openIfEmpty && !loaded.length ? " open" : ""}><summary>Import course pack <span>(optional)</span></summary>
      <p>For answer checks and worked steps, open the course pack on Canvas and select <strong>Download</strong>. Then choose the downloaded file below. One import covers all four papers on this browser.</p>
      ${packLink()}<label>Course file (.json)<input data-wb-import type="file" accept=".json,application/json"></label>
      <p class="wb-muted">${loaded.length ? "Available on this device: " + esc(loaded.join(", ")) + "." : ""}</p>
      <p data-wb-import-status role="status">${esc(importMessage)}</p></details>`;
  }
  function progress(p) {
    let reviewed = 0, flagged = 0;
    for (let n = 1; n <= p.count; n++) {
      const s = questionState(p, n);
      if (s.reviewed) reviewed++;
      if (s.flagged) flagged++;
    }
    return `<div class="wb-progress"><span>${reviewed} of ${p.count} reviewed${flagged ? " · " + flagged + " flagged" : ""}</span>
      <progress max="${p.count}" value="${reviewed}" aria-label="${esc(p.label)} questions reviewed"></progress></div>`;
  }
  function library() {
    return `<header class="pagehead"><h1>Previous exams</h1><p class="lede">Choose a paper to practise its questions and keep track of your revision.</p></header>
      ${importBlock(true)}
      <div class="wb-grid">${catalogue.map(p => `<article class="wb-card"><h2><a href="${route(p)}">${esc(p.label)}</a></h2>
        <p class="wb-meta">Semester 1 · ${p.count} questions</p>${progress(p)}
        <a class="button primary" href="${route(p)}">Practise paper<span class="sr-only">, ${esc(p.label)}</span></a>
        <div class="wb-sources">${paperLink(p)} ${keyLink()}</div></article>`).join("")}</div>
      <p class="wb-caption">${link(base, "All previous exam files on Canvas")} · NUS course access required</p>`;
  }
  function paperPage(p) {
    const pack = savedPack()[p.year];
    return `<a class="back" href="#/exams">← Previous exams</a><header class="pagehead"><h1>${esc(p.label)} exam</h1>
      <p class="wb-meta">Semester 1 · ${p.count} questions</p><div class="wb-sources">${paperLink(p)} ${keyLink()}</div></header>
      ${progress(p)}<h2>Questions</h2><ol class="wb-question-list">${Array.from({length:p.count}, (_, i) => {
        const n = i + 1, s = questionState(p, n), title = pack?.questions?.[i]?.title;
        const state = [s.reviewed ? "Reviewed" : "", s.flagged ? "Flagged for revision" : ""].filter(Boolean).join(" · ");
        return `<li><a href="${route(p,n)}"><span>${title ? "Q" + n + " · " + esc(title) : "Question " + n}</span><small>${esc(state)}</small><span aria-hidden="true">→</span></a></li>`;
      }).join("")}</ol>${importBlock()}`;
  }
  const decimal = str => {
    const text = String(str ?? "").trim().replace(/^−/, "-");
    return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[-+]?\d+)?$/i.test(text) ? Number(text) : NaN;
  };
  function partBlock(part, i, s) {
    const checked = s.checks[i] === true;
    const fields = part.fields.map((f, j) => {
      const k = i + "-" + j, value = s.answers[k] ?? "", num = decimal(value);
      const correct = Number.isFinite(num) && Math.abs(num - f.answer) <= f.tolerance + Number.EPSILON * 4 * Math.max(1, Math.abs(f.answer));
      const msg = Number.isFinite(num) ? (correct ? "Correct." : "Check this value.") : "Enter a number.";
      return `<label>${esc(f.label)}${f.unit ? ` <span class="wb-unit">(${esc(f.unit)})</span>` : ""}
        <input type="text" inputmode="decimal" data-wb-answer="${k}" maxlength="80" aria-describedby="wb-help-${k}" value="${esc(value)}">
        <small id="wb-help-${k}" class="wb-muted">${f.tolerance ? "Tolerance ±" + esc(f.tolerance) : "Exact value"}${checked ? ` <span class="wb-verdict ${correct ? "right" : "retry"}">${msg}</span>` : ""}</small></label>`;
    }).join("");
    return `<section class="wb-part" id="wb-part-${i}"><h3>${esc(part.label)}</h3><p>${esc(part.prompt)}</p>
      ${part.hint ? `<details class="wb-hint"><summary>Hint</summary><p>${esc(part.hint)}</p></details>` : ""}
      ${fields ? `<form data-wb-check="${i}" novalidate><div class="wb-fields">${fields}</div><button class="button" type="submit">Check answers</button></form>` : ""}
      <details class="wb-working"><summary>Show working</summary><ol>${part.working.map(step => "<li>" + esc(step) + "</li>").join("")}</ol></details></section>`;
  }
  function signature(q) {
    // Re-imported questions may change. Retain personal notes and flags independently.
    let hash = 2166136261;
    for (const c of JSON.stringify(q)) hash = Math.imul(hash ^ c.charCodeAt(0), 16777619);
    return (hash >>> 0).toString(16);
  }
  function questionPage(p, n) {
    const q = savedPack()[p.year]?.questions?.[n - 1];
    const s = questionState(p, n);
    if (q && s.signature !== signature(q)) {
      s.signature = signature(q); s.answers = {}; s.checks = {}; write(questionKey(p,n),s);
    }
    current = {p, n, q};
    const privateContent = q ? `<div class="wb-private"><p class="wb-setup">${esc(q.setup)}</p>
      ${q.inputs.length ? `<details class="wb-data" open><summary>Question data</summary><dl>${q.inputs.map(d =>
        `<div><dt>${esc(d.label)}</dt><dd>${esc(d.value)}</dd></div>`).join("")}</dl></details>` : ""}
      <h2>Practice</h2>${q.parts.map((part, i) => partBlock(part, i, s)).join("")}</div>` : "";
    return `<a class="back" href="${route(p)}">← ${esc(p.label)} questions</a><header class="pagehead">
      <p class="wb-meta">${esc(p.label)} · Semester 1</p><h1>Question ${n}${q ? " · " + esc(q.title) : ""}</h1>
      <div class="wb-sources">${paperLink(p)}</div></header>
      <nav class="wb-qnav" aria-label="Questions in this paper">${Array.from({length:p.count}, (_, i) => `<a href="${route(p, i+1)}"${i+1 === n ? ' aria-current="page"' : ""}>Q${i+1}</a>`).join("")}</nav>
      ${!q ? '<p class="wb-guide">Open the exam paper on Canvas and record your working below. To check answers and reveal worked steps here, import the course pack.</p>' + importBlock() : ""}
      ${privateContent}
      <section class="wb-notes"><h2>My working</h2><label for="wb-note">Calculations and revision notes</label>
        <textarea id="wb-note" data-wb-note rows="5" maxlength="30000" aria-describedby="wb-autosave">${esc(s.note)}</textarea>
        <p class="wb-muted" id="wb-autosave">Saved in this browser as you type.</p>
        <div class="wb-marks"><label><input type="checkbox" data-wb-mark="reviewed" ${s.reviewed ? "checked" : ""}> Mark as reviewed</label>
        <label><input type="checkbox" data-wb-mark="flagged" ${s.flagged ? "checked" : ""}> Flag for revision</label></div></section>
      <details class="wb-solution"><summary>Compare with the official solution</summary>
        <p>Find ${esc(p.label)}, Question ${n} in the combined Canvas file. Some questions have no published numerical answer.</p>${keyLink()}</details>
      ${q ? importBlock() : ""}
      <div class="wb-sequence">${n > 1 ? `<a href="${route(p,n-1)}">← Previous question</a>` : ""}
        <a href="${n < p.count ? route(p,n+1) : route(p)}">${n < p.count ? "Next question →" : "Back to paper →"}</a></div>`;
  }
  let lastRoute = [];
  function render(year, number) {
    lastRoute = [year, number]; current = null;
    const p = catalogue.find(p => p.year === String(year));
    let result;
    if (!year && !number) result = library();
    else if (p && !number) result = paperPage(p);
    else if (p && /^[1-9]\d*$/.test(String(number)) && Number(number) <= p.count) result = questionPage(p, Number(number));
    else result = '<h1>Paper or question unavailable</h1><p><a href="#/exams">Browse previous exams</a></p>';
    return `<div id="exam-workbook">${result}<p class="wb-caption" id="workbook-storage" role="status" ${temporary ? "" : "hidden"}>This browser could not save your changes. They are available for this visit.</p></div>`;
  }
  function cleanPack(doc) {
    const fail = () => { throw new Error("The course pack has incomplete or invalid question data."); };
    function string(s, limit = 12000) {
      if (typeof s !== "string" || s.length > limit) fail();
      return s;
    }
    function array(a, limit) { if (!Array.isArray(a) || a.length > limit) fail(); return a; }
    if (!record(doc) || doc.format !== "ce2407a-private-exams-v1" || !record(doc.papers)) throw new Error("Choose a CE2407A exam course pack (.json).");
    const entries = Object.entries(doc.papers), cleaned = {};
    if (!entries.length || entries.length > catalogue.length) fail();
    for (const [year, data] of entries) {
      const p = catalogue.find(p => p.year === year);
      if (!p || !record(data) || !Array.isArray(data.questions) || data.questions.length !== p.count) fail();
      cleaned[year] = {questions:data.questions.map(q => {
        if (!record(q)) fail();
        const inputs = array(q.inputs, 120).map(d => {
          if (!record(d)) fail();
          return {label:string(d.label,400), value:string(d.value)};
        });
        const parts = array(q.parts, 48).map(part => {
          if (!record(part)) fail();
          const fields = array(part.fields, 100).map(f => {
            if (!record(f) || !Number.isFinite(f.answer) || !Number.isFinite(f.tolerance) || f.tolerance < 0) fail();
            return {label:string(f.label,400),unit:string(f.unit ?? "",180),answer:f.answer,tolerance:f.tolerance};
          });
          const working = array(part.working, 120).map(s => string(s));
          if (!working.length) fail();
          return {label:string(part.label,300),prompt:string(part.prompt),hint:string(part.hint ?? ""),fields,working};
        });
        if (!parts.length) fail();
        return {title:string(q.title,400), setup:string(q.setup), inputs, parts};
      })};
    }
    return cleaned;
  }
  document.addEventListener("input", e => {
    if (!current || !e.target.closest("#exam-workbook")) return;
    const ctx = current, s = questionState(ctx.p, ctx.n);
    if (e.target.matches("[data-wb-note]")) s.note = e.target.value;
    else if (e.target.matches("[data-wb-answer]")) {
      const key = e.target.dataset.wbAnswer;
      s.answers[key] = e.target.value;
      delete s.checks[key.split("-")[0]];
      e.target.closest("form").querySelectorAll(".wb-verdict").forEach(el => el.remove());
    } else return;
    write(questionKey(ctx.p,ctx.n),s);
  });
  document.addEventListener("submit", e => {
    const form = e.target;
    if (!current?.q || !form.matches("form[data-wb-check]") || !form.closest("#exam-workbook")) return;
    e.preventDefault();
    const ctx = current, i = Number(form.dataset.wbCheck), s = questionState(ctx.p, ctx.n);
    s.checks[i] = true; write(questionKey(ctx.p,ctx.n), s);
    const section = form.closest(".wb-part");
    section.outerHTML = partBlock(ctx.q.parts[i], i, s);
    const refreshed = document.getElementById("wb-part-" + i);
    const invalid = refreshed.querySelector(".wb-verdict.retry");
    const target = invalid?.closest("label")?.querySelector("input") || refreshed.querySelector(".wb-working summary"); target?.focus();
    const live = document.querySelector("#announcement");
    if (live) live.textContent = [...refreshed.querySelectorAll(".wb-verdict")].map(e => e.textContent).join(" ");
  });
  document.addEventListener("change", async e => {
    if (!e.target.closest("#exam-workbook")) return;
    if (current && e.target.matches("[data-wb-mark]")) {
      const ctx = current, s = questionState(ctx.p,ctx.n);
      s[e.target.dataset.wbMark] = e.target.checked;
      write(questionKey(ctx.p,ctx.n),s);
      return;
    }
    if (!e.target.matches("[data-wb-import]") || !e.target.files?.length) return;
    const picker = e.target, box = picker.closest(".wb-import");
    try {
      const file = picker.files[0];
      if (file.size > 1800000) throw new Error("Choose a course pack smaller than 1.8 MB.");
      let parsed;
      try { parsed = JSON.parse((await file.text()).replace(/^\uFEFF/, "")); }
      catch { throw new Error("The selected file could not be read as JSON."); }
      const additions = cleanPack(parsed);
      write("pack", {...savedPack(), ...additions});
      importMessage = "Imported " + catalogue.filter(p => additions[p.year]).map(p => p.label).join(", ") + ".";
      if (picker.isConnected) {
        document.getElementById("exam-workbook").outerHTML = render(...lastRoute);
        const details = document.querySelector(".wb-import");
        details.open = true; details.querySelector("summary").focus();
        const live = document.getElementById("announcement"); if (live) live.textContent = importMessage;
      }
    } catch (error) {
      box.querySelector("[data-wb-import-status]").textContent = error.message;
      picker.value = "";
    }
  });
  window.ExamWorkbook = {render, clear};
})();
