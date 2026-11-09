/* Original teaching schematics. Coordinates are drawn in a shared 360 × 200 view. */
(() => {
  "use strict";
  const ink = "#25445c", blue = "#386dc1", teal = "#167b73", light = "#cfe9e6", line = "#9ab7bf";
  const path = (d, color = ink, width = 2, extra = "") =>
    '<path d="' + d + '" fill="none" stroke="' + color + '" stroke-width="' + width + '" stroke-linecap="round" stroke-linejoin="round" ' + extra + '/>';
  const fill = (d, color) => '<path d="' + d + '" fill="' + color + '"/>';
  const dot = (x, y, color = teal, r = 4) => '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + color + '"/>';
  const label = (x, y, value, anchor = "middle", size = 13) =>
    '<text x="' + x + '" y="' + y + '" text-anchor="' + anchor + '" fill="' + ink + '" font-family="system-ui, sans-serif" font-size="' + size + '">' + value + '</text>';
  const rect = (x, y, w, h, color) => '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="2" fill="' + color + '"/>';
  const axes = () => path("M35 29v122h301", line, 1.5);
  const dash = (d) => path(d, blue, 1.5, 'stroke-dasharray="4 4"');
  const bell = (cx, baseline, height, sd) => {
    const points = [];
    for (let x = 36; x <= 334; x += 2) {
      const y = baseline - height * Math.exp(-0.5 * ((x - cx) / sd) ** 2);
      points.push((points.length ? "L" : "M") + x + " " + y.toFixed(1));
    }
    return points.join(" ");
  };
  const interval = (x1, x2, y, color = teal) => path("M" + x1 + " " + y + "H" + x2 + "M" + x1 + " " + (y - 6) + "v12M" + x2 + " " + (y - 6) + "v12", color, 2.5);
  const diagrams = {
    1: {
      title: "Reading area in a density histogram",
      caption: "Two adjacent bins from the worked example. The wider 32–36 MPa bin is shorter but contains more observations (25% compared with 20%).",
      icon: "M5 31h31M9 28v-6h4v6m4 0V13h4v15m4 0V6h4v22m4 0V17h3v11",
      draw() {
        return path("M68 26v122h256",line)+rect(70,48,80,100,"#bdd8ef")+rect(150,85.5,160,62.5,"#9fcdc2")+label(61,52,"0.100","end")+label(61,90,"0.0625","end")+label(109,112,"20%")+label(229,118,"25%")+label(70,168,"30")+label(150,168,"32")+label(310,168,"36")+label(184,193,"Strength (MPa)")+label(80,20,"Density (MPa⁻¹)","start");
      }
    },
    2: {
      title: "The overlap of two events",
      caption: "The shaded intersection contains outcomes shared by A and B. Adding P(A) and P(B) counts that intersection twice.",
      icon: "M21 13a10 10 0 1 0 0 14m-3-14a10 10 0 1 1 0 14",
      draw() {
        return '<rect x="18" y="22" width="324" height="149" rx="9" fill="none" stroke="'+line+'"/><circle cx="150" cy="95" r="53" fill="#d4e6fd" stroke="'+blue+'" stroke-width="2"/><circle cx="210" cy="95" r="53" fill="#d2eae4" stroke="'+teal+'" stroke-width="2"/>'+fill("M180 51.3a53 53 0 0 1 0 87.4 53 53 0 0 1 0-87.4", "#8bbab8")+label(128,99,"A")+label(232,99,"B")+label(179,101,"A ∩ B","middle",11)+label(180,191,"Sample space");
      }
    },
    3: {
      title: "Conditional paths",
      caption: "Multiply conditional probabilities along one path. Add the probabilities of paths that reach the same outcome.",
      icon: "M5 20h8m0 0 11-12m-11 12 11 12m0-24h9m-9 24h9",
      draw() {
        return path("M38 96 123 52m-85 44 85 44M146 52l83-22m-83 22 83 25m-83 63 83-23m-83 23 83 25",line,2)+dot(34,96)+label(136,56,"A")+label(136,144,"Aᶜ")+label(235,34,"B given A","start")+label(235,82,"Bᶜ given A","start")+label(235,121,"B given Aᶜ","start")+label(235,169,"Bᶜ given Aᶜ","start")+label(179,195,"P(A ∩ B) = P(A) P(B | A)");
      }
    },
    4: {
      title: "How a CDF accumulates probability",
      caption: "For this discrete variable, the jump at each possible value equals its probability. The CDF includes the mass at that value.",
      icon: "M6 32V8m0 24h28M8 29h7v-7h8v-9h9V7",
      draw() {
        return axes()+path("M38 151h48v-27h80V68h80V34h76",teal,3)+[ [86,124],[166,68],[246,34] ].map(([x,y])=>dot(x,y,blue)).join("")+label(22,154,"0")+label(22,38,"1")+label(31,17,"F(x)")+[0,1,2].map((v,i)=>label(86+80*i,173,String(v))).join("")+label(330,174,"x");
      }
    },
    6: {
      title: "Counts in a fixed set of trials",
      caption: "A binomial model counts successes in a fixed number of independent trials with a common success probability. For n = 4 and p = 0.5, two successes are most likely.",
      icon: "M5 32h32M8 29v-7h4v7m3 0V12h4v17m3 0V6h4v23m3 0V18h4v11",
      draw() {
        return axes()+[1,4,6,4,1].map((v,i)=>rect(55+i*54,151-v*17,33,v*17,i===2?blue:teal)+label(72+54*i,173,String(i))).join("")+label(78,21,"Probability")+label(182,194,"Number of successes");
      }
    },
    5: {
      title: "An interval under a normal density",
      caption: "The shaded area is the probability of falling between a and b. For a continuous variable the curve height itself has units of inverse x.",
      icon: "M5 31h31M5 28c10 0 8-20 16-20s7 20 15 20",
      draw() {
        const curve=bell(180,151,99,47);
        const area=[];for(let x=140;x<=212;x+=2)area.push("L"+x+" "+(151-99*Math.exp(-.5*((x-180)/47)**2)).toFixed(1));
        return axes()+fill("M140 151 "+area.join(" ")+" L212 151Z",light)+path(curve,teal,2.8)+dash("M140 151V82m72 69V72")+label(140,173,"a")+label(212,173,"b")+label(327,173,"x")+label(65,21,"Density");
      }
    },
    7: {
      title: "Propagating two independent uncertainties",
      caption: "For independent X and Y, the variance of their sum is the sum of the two variances. In this example the output standard deviation is 5 units.",
      icon: "M5 9h8l11 12h10M5 31h8l11-10",
      draw() {
        return rect(18,34,137,49,"#d8e8fa")+rect(18,112,137,49,"#d3ebe5")+label(86,54,"Input X")+label(86,73,"SD = 3")+label(86,133,"Input Y")+label(86,152,"SD = 4")+path("m161 59 43 38m-43 39 43-39h30m-6-5 6 5-6 5",line)+label(282,93,"S = X + Y")+label(282,117,"SD = 5")+label(180,191,"Var(S) = 3² + 4² = 25");
      }
    },
    8: {
      title: "Estimating a population mean",
      caption: "A point estimate compresses sample information into one value. Here four observations give a sample mean of 12.",
      icon: "M5 29h31M12 20l3-4m3 1 3-4m4 7 3-4m-8 10v7",
      draw() {
        return path("M34 113h295",line)+[8,10,13,17].map((n,i)=>dot(47+(n-8)*28,111,i===3?blue:teal,6)+label(47+(n-8)*28,138,String(n))).join("")+path("M159 57v45m-5-6 5 6 5-6",blue)+label(159,42,"Sample mean = 12")+label(182,179,"(8 + 10 + 13 + 17) / 4 = 12");
      }
    },
    9: {
      title: "Sample means from larger samples",
      caption: "With independent observations from a normal population, the mean has standard error σ/√n. Increasing n concentrates sample means around μ.",
      icon: "M5 31h31M5 28c9 0 10-11 16-11s8 11 15 11M11 29c6 0 5-22 10-22s6 22 10 22",
      draw() {
        return axes()+path(bell(184,151,40,63),blue,2.5)+path(bell(184,151,98,26),teal,2.5)+dash("M184 151V48")+label(184,173,"μ")+path("M247 42h16",teal,3)+label(270,47,"Larger n","start",12)+path("M247 65h16",blue,3)+label(270,69,"Smaller n","start",12)+label(64,21,"Density");
      }
    },
    10: {
      title: "A mean interval and a reference value",
      caption: "For a two-sided test using the same model and significance level, reject the hypothesised mean when it lies outside the corresponding confidence interval.",
      icon: "M5 30h31M9 17h22m-22-5v10m22-10v10M22 7v24",
      draw() {
        return path("M30 143h305",line)+dash("M224 45v99")+label(224,34,"Hypothesised mean")+interval(66,184,85)+dot(125,85,teal,5)+label(125,114,"Confidence interval")+label(228,169,"μ₀");
      }
    },
    11: {
      title: "Two samples with different spreads",
      caption: "Both samples have the same centre. The second sample has a larger variance because its readings lie farther from their mean.",
      icon: "M5 31h31M7 12h24m-24 9h24m-15-12v6m8 3v6",
      draw() {
        return label(35,40,"Sample A","start")+label(35,104,"Sample B","start")+path("M35 67h294m-294 62h294",line)+dash("M180 39v105")+[145,160,180,200,215].map(x=>dot(x,67,teal,6)).join("")+[68,124,180,236,292].map(x=>dot(x,129,blue,6)).join("")+label(180,169,"Common mean");
      }
    },
    12: {
      title: "Observed and expected counts",
      caption: "Compare counts in each category with those predicted by the model. A larger discrepancy contributes more to the chi-square goodness-of-fit statistic.",
      icon: "M5 31h31M8 29V15h4v14m2 0V9h4v20m6 0V7h4v22m2 0V17h4v12",
      draw() {
        return axes()+[[45,54],[84,68],[70,77]].map(([a,b],i)=>rect(60+i*89,151-a,22,a,teal)+rect(85+i*89,151-b,22,b,blue)+label(82+i*89,173,["A","B","C"][i])).join("")+rect(46,24,12,12,teal)+label(64,35,"Observed","start",12)+rect(147,24,12,12,blue)+label(165,35,"Expected","start",12)+label(181,196,"Category");
      }
    },
    13: {
      title: "A residual on a regression line",
      caption: "At the highlighted x, the observed response lies above its fitted value. Its residual, observed minus fitted, is positive.",
      icon: "M5 31V7m0 24h31M9 26l23-17M9 21h1m8-4h1m4-6h1m6 3h1",
      draw() {
        return axes()+path("M45 140 306 49",teal,2.5)+[[65,130],[94,112],[131,120],[153,91],[201,77],[231,84],[268,71],[297,45]].map(([x,y])=>dot(x,y,blue,4.8)).join("")+path("M210 46v37",blue,2.5)+dot(210,46,blue,5)+dot(210,82.5,teal,4)+label(221,36,"Observed", "start",12)+label(221,63,"Residual","start",12)+label(68,21,"Response y")+label(287,173,"Predictor x");
      }
    }
  };
  window.HUB_DIAGRAMS=diagrams;
})();
