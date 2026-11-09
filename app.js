/* CE2407A study hub — buildless browser interface. */
(function hub() {
  "use strict";
  const chapters = (window.CHAPTERS || []).slice().sort((a,b) => a.id - b.id);
  const diagrams = window.HUB_DIAGRAMS || {};
  const main = document.querySelector("main");
  const clearDialog = document.querySelector("#clear-dialog");
  const diagramDialog = document.querySelector("#diagram-dialog");
  const storageKey = "ce2407a-learning-hub.v1";
  const freshState = () => ({reviewed:{}, sessions:{}});
  let state = freshState();
  let saved = true;
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, ch =>
    ({"&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"})[ch]);
  const number = (id) => String(id).padStart(2, "0");
  const byId = (id) => chapters.find(chapter => chapter.id === Number(id));
  const announce = (message) => { document.querySelector("#announcement").textContent = message; };

  function unavailable() {
    saved = false;
    document.querySelector("#storage-notice").hidden = false;
  }
  function readState() {
    if (!saved) return;
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (!stored) { state = freshState(); return; }
      const data = JSON.parse(stored);
      if (data && typeof data === "object" && !Array.isArray(data)) {
        state = {
          reviewed: data.reviewed && typeof data.reviewed === "object" ? data.reviewed : {},
          sessions: data.sessions && typeof data.sessions === "object" ? data.sessions : {}
        };
      }
    } catch (error) {
      if (error instanceof SyntaxError) state = freshState();
      else unavailable();
    }
  }
  function saveState() {
    if (!saved) return;
    try { window.localStorage.setItem(storageKey, JSON.stringify(state)); }
    catch { unavailable(); }
  }
  function resourceLink(item, text = item?.label, className = "", aria = "") {
    if (!item || typeof item.url !== "string") return "";
    const raw = item.url.trim();
    const external = /^https?:\/\//i.test(raw);
    if (!external && !/^(?:\.\/)?[a-z0-9][a-z0-9_./?=#%&:+-]*$/i.test(raw)) return "";
    const target = external ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${esc(raw)}"${target} class="${esc(className)}"${aria ? ` aria-label="${esc(aria + (external ? " (opens in a new tab)" : ""))}"` : ""}>${esc(text)}${external ? ' <i class="ext" aria-hidden="true">↗</i><span class="sr-only"> (opens in a new tab)</span>' : ""}</a>`;
  }
  function icon(id) {
    const path = diagrams[id]?.icon || "M6 31h29M8 28l7-9 8 3 10-14";
    return `<span class="chapter-icon"><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${esc(path)}"/></svg></span>`;
  }
  function figure(chapter) {
    const diagram = diagrams[chapter.id];
    if (!diagram) return "";
    return `<figure class="chart-wrap"><svg viewBox="0 0 360 202" aria-hidden="true">${diagram.draw()}</svg><figcaption><strong>${esc(diagram.title)}.</strong> ${esc(diagram.caption)}</figcaption></figure>`;
  }
  const keyFor = (chapter) => JSON.stringify(chapter.practice.map(q => [q.prompt,q.options,q.correct,q.numeric || null]));
  function correctAnswer(q, value) {
    if (value == null) return false;
    if (!q.numeric) return value === q.correct;
    const {answer, tolerance} = q.numeric;
    const rounding = Number.EPSILON * Math.max(1, Math.abs(value), Math.abs(answer)) * 4;
    return Number.isFinite(value) && Math.abs(value - answer) <= tolerance + rounding;
  }
  function correctText(q) {
    return q.numeric ? q.numeric.display : q.options[q.correct];
  }
  function answerText(q, value) {
    return q.numeric ? [String(value),q.numeric.unit].filter(Boolean).join(" ") : q.options[value];
  }
  function validSession(chapter) {
    const s = state.sessions[chapter.id];
    if (!s || s.key !== keyFor(chapter) || !Array.isArray(s.order) || !s.order.length ||
      !Number.isInteger(s.at) || s.at < 0 || s.at >= s.order.length ||
      !s.answers || typeof s.answers !== "object" ||
      new Set(s.order).size !== s.order.length ||
      !s.order.every(i => Number.isInteger(i) && i >= 0 && i < chapter.practice.length)) return null;
    const answersValid = Object.entries(s.answers).every(([index, answer]) => {
      const q = chapter.practice[index];
      if (!q || !s.order.includes(Number(index)) || !Number.isFinite(answer)) return false;
      return q.numeric || (Number.isInteger(answer) && answer >= 0 && answer < q.options.length);
    });
    if (!answersValid || (s.done && s.order.some(i => s.answers[i] == null))) return null;
    return s;
  }
  function begin(chapter, selected = null) {
    const order = selected ? [...selected] : chapter.practice.map((q,i) => i);
    if (!selected) {
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i],order[j]] = [order[j],order[i]];
      }
    }
    const session = {key:keyFor(chapter), order, at:0, answers:{}, hints:{}, done:false};
    state.sessions[chapter.id] = session;
    saveState();
    return session;
  }
  const currentLabel = (s) => s?.done ? "Practise again" : s ? "Resume practice" : "Practice";
  const topicUrl = (id) => `#/topic/${id}`;
  const practiceUrl = (id) => `#/practice/${id}`;
  const heading = (text, extra = "") => `<header class="pagehead"><h1>${esc(text)}</h1>${extra}</header>`;
  const back = '<a class="back" href="#/">← Topics</a>';

  function card(c) {
    const s = validSession(c);
    const checked = s ? Object.keys(s.answers).length : 0;
    const total = s?.order.length || c.practice.length;
    const first = c.tutorials?.[0];
    const tutorial = first ? resourceLink(first, "Tutorial", "", first.label) : "";
    return `<article class="card"><a class="card-main" href="${topicUrl(c.id)}"><div class="card-top">${icon(c.id)}<span class="number">Chapter ${number(c.id)}</span></div><h3>${esc(c.title)}</h3></a><div class="status-block"><div class="progress-line"><span>Practice progress</span><span>${checked} / ${total}</span></div><progress value="${checked}" max="${total}" aria-label="${esc(c.title)}: ${checked} of ${total} questions checked"></progress><div class="card-state">${state.reviewed[c.id] ? '<span class="is-reviewed">✓ Reviewed</span>' : 'Not reviewed'}</div></div><div class="card-actions"><a href="${topicUrl(c.id)}" aria-label="Review ${esc(c.title)}">Review</a><a class="primary" href="${practiceUrl(c.id)}" data-start="${c.id}" aria-label="${currentLabel(s)}: ${esc(c.title)}">${currentLabel(s)}</a>${tutorial}</div></article>`;
  }
  function home() {
    const sections = [...new Set(chapters.map(c => c.section))];
    return heading("Topics", '<p class="lede">Review a chapter and check your understanding.</p>') + sections.map(section =>
      `<section class="group"><h2 class="group-heading">${esc(section)}</h2><div class="grid">${chapters.filter(c => c.section === section).map(card).join("")}</div></section>`
    ).join("");
  }
  function resourceGroup(title, items) {
    if (!items?.length) return "";
    return `<section class="group"><h2 class="group-heading">${esc(title)}</h2><div class="resource-grid">${items.map(item =>
      `<article class="resource">${resourceLink(item)}${item.detail ? `<span>${esc(item.detail)}</span>` : ""}</article>`
    ).join("")}</div></section>`;
  }
  function resources() {
    return heading("Tutorials & resources", '<p class="lede">Continue with the digital tutorials, or open the course references on Canvas.</p>') +
      resourceGroup("Digital tutorial sets", window.SETS) + resourceGroup("Course resources", window.RESOURCES);
  }
  function details(title, content) {
    return `<details class="disclose"><summary>${esc(title)}</summary><div>${content}</div></details>`;
  }
  const list = (items, tag = "ul") => `<${tag}>${items.map(item => `<li>${esc(item)}</li>`).join("")}</${tag}>`;
  function chapterPage(c) {
    const reviewed = !!state.reviewed[c.id];
    const subsequent = chapters[chapters.indexOf(c) + 1];
    const diagram = diagrams[c.id];
    const tutorials = (c.tutorials||[]).map(item => resourceLink(item)).join("");
    const external = (c.source ? resourceLink(c.source) : "") + tutorials;
    const s = validSession(c);
    return `${back}<header class="review-header"><div><div class="topic-title">${icon(c.id)}<div><div class="minor">Chapter ${number(c.id)} · ${esc(c.section)}</div><h1>${esc(c.title)}</h1></div></div><p class="lede">${esc(c.summary)}</p></div><div class="actions"><a class="button selected" href="${topicUrl(c.id)}" aria-current="page">Review</a><a class="button primary" href="${practiceUrl(c.id)}" data-start="${c.id}">${currentLabel(s)}</a></div></header>
      <div class="layout"><div class="stack">
      ${details("Learning objectives", list(c.goals))}
      <section class="panel"><div class="section-top"><h2>Key concepts & equations</h2>${diagram ? '<button class="text-action" type="button" data-action="enlarge" aria-haspopup="dialog">Enlarge diagram</button>' : ""}</div><div class="concept-layout">${figure(c)}<div class="ideas">${c.ideas.map(idea => `<article class="idea"><h3>${esc(idea.name)}</h3>${idea.formula ? `<span class="formula">${esc(idea.formula)}</span>` : ""}<p>${esc(idea.text)}</p></article>`).join("")}</div></div></section>
      <section class="panel"><h2>Worked example</h2><p class="example-text">${esc(c.example.prompt)}</p><details class="reveal"><summary>Show worked solution</summary>${list(c.example.steps,"ol")}</details></section>
      ${details("Common misconception", `<p>${esc(c.pitfall)}</p>`)}
      ${details("Guided activity", `<p>${esc(c.activity.prompt)}</p><details class="reveal"><summary>Check your reasoning</summary><p>${esc(c.activity.answer)}</p></details>`)}
      ${details("Connect the ideas", `<p>${esc(c.next)}</p><p style="margin-top:10px">${subsequent ? `<a href="${topicUrl(subsequent.id)}">Next: ${esc(subsequent.title)} →</a>` : '<a href="#/">Return to all topics →</a>'}</p>`)}
      </div><aside class="stack"><div class="aside-box"><button type="button" aria-pressed="${reviewed}" id="review-toggle" data-action="review" class="button ${reviewed ? "selected" : "primary"}">${reviewed ? "✓ Reviewed" : "Mark as reviewed"}</button></div>
      ${external ? `<section class="aside-box"><h2>Study links</h2><div class="links">${external}</div></section>` : ""}
      <a class="button" href="#/resources">All tutorials & resources</a></aside></div>`;
  }
  function practicePage(c) {
    const s = validSession(c) || begin(c);
    if (s.done) return summary(c,s);
    const i = s.order[s.at];
    const q = c.practice[i];
    const response = s.answers[i];
    const checked = response != null;
    const correct = checked && correctAnswer(q,response);
    const total = s.order.length;
    const choices = q.numeric
      ? `<label class="numeric-label" for="number-answer">Your answer${q.numeric.unit ? " (" + esc(q.numeric.unit) + ")" : ""}</label><div class="numeric-row"><input id="number-answer" name="number-answer" type="number" inputmode="decimal" step="any" aria-describedby="number-help quiz-error" ${checked ? "disabled" : ""} value="${checked ? esc(response) : ""}"><span aria-hidden="true">${esc(q.numeric.unit)}</span></div><p class="minor numeric-help" id="number-help">Accepted tolerance: ±${esc(q.numeric.tolerance)} ${esc(q.numeric.unit)}.</p>`
      : `<fieldset class="choices" aria-labelledby="question-title" ${checked ? "disabled" : ""}><legend class="sr-only">Choose one answer</legend>${q.options.map((option,k) => `<label class="choice ${checked && k===q.correct ? "solution" : ""}"><input type="radio" name="response" value="${k}" ${checked && response===k ? "checked" : ""}><span>${esc(option)}</span></label>`).join("")}</fieldset>`;
    const hint = !checked && q.hint ? `<details class="hint-box" data-hint="${i}" ${s.hints?.[i] ? "open" : ""}><summary>Show hint</summary><p>${esc(q.hint)}</p></details>` : "";
    return `<div class="practice"><div class="practice-top"><a class="back" href="${topicUrl(c.id)}">← Save &amp; leave</a><span class="minor">${s.at+1} / ${total} questions</span></div>
      <div class="segments" aria-hidden="true">${s.order.map((j,k) => `<span class="${s.answers[j] == null ? (k === s.at ? "current":"") : correctAnswer(c.practice[j],s.answers[j]) ? "right" : "wrong"}"></span>`).join("")}</div>
      <section class="panel"><div class="minor">${esc(c.title)} · Chapter practice</div><h1 class="question" id="question-title">${esc(q.prompt)}</h1>
      <form id="quiz" novalidate>${choices}${hint}
      ${checked ? "" : `<p id="quiz-error" role="alert" class="error"></p><div class="actions"><button class="button primary" type="submit">Check my answer</button><a href="${topicUrl(c.id)}" class="button">Review chapter</a></div>`}</form>
      ${checked ? `<div class="feedback ${correct?"":"incorrect"}" id="feedback" tabindex="-1"><h2>${correct ? "Correct" : "Not quite"}</h2>${correct ? "" : `<p>Correct answer: <strong>${esc(correctText(q))}</strong></p>`}<p>${esc(q.explain)}</p></div><div class="actions"><button class="button primary" type="button" data-action="next">${s.at+1===total ? "See my summary" : "Next question"} →</button></div>` : ""}</section></div>`;
  }
  function summary(c,s) {
    const missed = s.order.filter(i => !correctAnswer(c.practice[i],s.answers[i]));
    return `<div class="practice">${back}<section class="panel"><div class="minor">${esc(c.title)}</div><h1>Session complete</h1><p class="score">${s.order.length-missed.length} / ${s.order.length} <span>questions correct</span></p><div class="actions">${missed.length ? '<button class="button primary" type="button" data-action="retry">Retry missed questions</button>' : ""}<a class="button" href="${topicUrl(c.id)}">Back to chapter</a><button type="button" class="button" data-action="again">New set</button></div></section><section class="stack results"><h2>Answers &amp; solutions</h2>${s.order.map(i => {
      const q = c.practice[i];
      const right = correctAnswer(q,s.answers[i]);
      return details((right ? "✓ " : "↻ ") + q.prompt, `<p><strong>Your answer:</strong> ${esc(answerText(q,s.answers[i]))}</p>${right ? "" : `<p><strong>Correct answer:</strong> ${esc(correctText(q))}</p>`}<p>${esc(q.explain)}</p>`);
    }).join("")}</section></div>`;
  }
  function route() {
    const hash = location.hash.slice(1);
    const [path,query] = hash.split("?");
    const [page,chapterId] = path.replace(/^\/+/,"").split("/");
    const chapter = byId(chapterId || new URLSearchParams(query).get("topic"));
    return { page, chapter };
  }
  function render(focus = false) {
    const {page,chapter} = route();
    const resourcesView = page === "resources";
    let pageTitle = "Topics";
    if (!chapters.length) main.innerHTML = '<h1>The study material could not load</h1><p>Refresh the page to try again.</p>';
    else if (resourcesView) { main.innerHTML = resources(); pageTitle = "Tutorials & resources"; }
    else if (chapter && page === "topic") { main.innerHTML = chapterPage(chapter); pageTitle = chapter.title; }
    else if (chapter && page === "practice") { main.innerHTML = practicePage(chapter); pageTitle = chapter.title + " practice"; }
    else if (!page || page === "topics" || page === "main") main.innerHTML = home();
    else { main.innerHTML = back + heading("Page unavailable", '<p class="lede">Choose a chapter from the Topics page.</p>'); }
    document.title = `${pageTitle} · CE2407A Learning Hub`;
    const topicsNav = document.querySelector("#nav-topics");
    const resourcesNav = document.querySelector("#nav-resources");
    topicsNav.removeAttribute("aria-current"); resourcesNav.removeAttribute("aria-current");
    (resourcesView ? resourcesNav : topicsNav).setAttribute("aria-current", resourcesView || !page ? "page" : "location");
    if (focus) { main.focus({preventScroll:true}); window.scrollTo(0,0); }
  }
  main.addEventListener("submit", event => {
    if (event.target.id !== "quiz") return;
    event.preventDefault();
    const {chapter} = route();
    const s = chapter && validSession(chapter);
    if (!s || s.done || s.answers[s.order[s.at]] != null) return;
    const q = chapter.practice[s.order[s.at]];
    const chosen = event.target.querySelector(q.numeric ? "#number-answer" : "input:checked");
    const answer = q.numeric ? chosen?.valueAsNumber : Number(chosen?.value);
    if (!chosen || !chosen.value.trim() || !Number.isFinite(answer)) {
      document.querySelector("#quiz-error").textContent = q.numeric ? "Enter a number before checking." : "Choose an answer before checking.";
      event.target.querySelector("input")?.focus();
      return;
    }
    if (!q.numeric && (!Number.isInteger(answer) || answer < 0 || answer >= q.options.length)) return;
    s.answers[s.order[s.at]] = answer;
    saveState(); render();
    document.querySelector("#feedback")?.focus();
  });
  main.addEventListener("toggle", event => {
    const el = event.target;
    if (!el.matches?.("details[data-hint]") || !el.isConnected) return;
    const {chapter} = route();
    const s = chapter && validSession(chapter);
    if (s && !s.done && !s.answers.hasOwnProperty(el.dataset.hint)) {
      s.hints ||= {}; s.hints[el.dataset.hint] = el.open; saveState();
    }
  },true);
  main.addEventListener("click", event => {
    const start = event.target.closest("[data-start]");
    if (start && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
      const c = byId(start.dataset.start);
      if (c && validSession(c)?.done) begin(c);
    }
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (!action) return;
    const {chapter:c} = route();
    if (!c) return;
    if (action === "enlarge") {
      document.querySelector("#diagram-title").textContent = diagrams[c.id].title;
      document.querySelector("#diagram-view").innerHTML = figure(c); diagramDialog.showModal(); return;
    }
    if (action === "review") {
      state.reviewed[c.id] = !state.reviewed[c.id]; saveState();
      const toggle = document.querySelector("#review-toggle");
      toggle.textContent = state.reviewed[c.id] ? "✓ Reviewed" : "Mark as reviewed";
      toggle.className = "button " + (state.reviewed[c.id] ? "selected" : "primary");
      toggle.setAttribute("aria-pressed", String(state.reviewed[c.id]));
      announce(state.reviewed[c.id] ? "Chapter marked reviewed." : "Review mark removed."); return;
    }
    const s = validSession(c);
    if (!s) return;
    if (action === "again") begin(c);
    else if (action === "retry" && s.done) {
      const missed = s.order.filter(i => !correctAnswer(c.practice[i],s.answers[i]));
      if (missed.length) begin(c,missed);
    } else if (action === "next" && s.answers[s.order[s.at]] != null && !s.done) {
      if (s.at + 1 === s.order.length) s.done = true;
      else s.at++;
      saveState();
    } else return;
    render(true);
  });
  document.querySelector("#clear").addEventListener("click", () => {
    clearDialog.returnValue = ""; clearDialog.showModal();
  });
  clearDialog.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    const choice = event.submitter?.value || "cancel";
    clearDialog.close(choice);
    if (choice !== "confirm") return;
    state = freshState();
    try { window.localStorage.removeItem(storageKey); } catch { unavailable(); }
    if (location.hash !== "#/") location.hash = "/";
    else render(true);
    announce("Progress cleared.");
  });
  document.querySelector(".skip").addEventListener("click", event => {
    event.preventDefault(); main.focus();
  });
  window.addEventListener("hashchange", () => { readState(); render(true); });
  window.addEventListener("storage", event => {
    if (!event.key || event.key === storageKey) { readState(); render(); }
  });
  readState(); render();
})();
