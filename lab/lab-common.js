// Shared data layer for the experimental "lab" pages.
//
// These pages are deliberately OUTSIDE the app: they load the same window.MATH_* data scripts
// but none of js/app.js, so nothing here can destabilise the reference itself. That is the whole
// point of filing them under Experimental -- they open in their own tab and share only data.
window.LabData = (function () {
  "use strict";

  // Match whatever theme the app was last left in, so opening a lab page is not a flashbang.
  function applyTheme() {
    var t = "light";
    try { t = localStorage.getItem("theme") === "dark" ? "dark" : "light"; } catch (e) {}
    document.documentElement.setAttribute("data-theme", t);
    return t;
  }

  var SECTION_COLOR = {
    "geometry":       "#5b8cff",
    "algebra":        "#4cc38a",
    "number-theory":  "#f0a35e",
    "counting":       "#9d7bff",
    "tools-methods":  "#45d6c3",
    "tools-patterns": "#ef5f8b"
  };

  function build() {
    var sections = window.MATH_SECTIONS || [];
    var details = window.MATH_DETAILS || {};
    var diagrams = window.MATH_DIAGRAMS || {};
    var cards = [], byId = {};

    sections.forEach(function (sec) {
      (sec.subsections || []).forEach(function (sub) {
        (sub.formulas || []).forEach(function (f) {
          if (byId[f.id]) return;                    // a mirrored listing; keep the first
          var panels = diagrams[f.id] || [];
          var card = {
            id: f.id,
            name: f.name,
            latex: f.latex || "",
            latexPlain: f.latexPlain || "",
            description: f.description || "",
            type: f.type || null,
            importance: f.importance || "medium",
            level: f.level || [],
            sectionId: sec.id,
            sectionTitle: sec.title,
            subsection: sub.title,
            subKey: sec.id + " / " + sub.title,
            color: SECTION_COLOR[sec.id] || "#8aa",
            diagram: panels.length ? panels[0] : null,
            diagramCount: panels.length,
            body: details[f.id] || ""
          };
          byId[f.id] = card;
          cards.push(card);
        });
      });
    });

    // Edges are the [[card-id]] cross-links authors actually wrote into the write-ups --
    // the only relation in the data that means "these two belong together" rather than
    // "these two happen to share a word".
    var seen = {}, links = [];
    cards.forEach(function (c) {
      var re = /\[\[([\w-]+)(?:\|[^\]]*)?\]\]/g, m;
      while ((m = re.exec(c.body))) {
        var t = m[1];
        if (!byId[t] || t === c.id) continue;
        var key = c.id < t ? c.id + "|" + t : t + "|" + c.id;
        if (seen[key]) continue;
        seen[key] = 1;
        links.push({ a: c.id, b: t, cross: byId[t].sectionId !== c.sectionId });
      }
    });

    // Degree drives node size: a card many write-ups point at is a card worth seeing first.
    var degree = {};
    cards.forEach(function (c) { degree[c.id] = 0; });
    links.forEach(function (e) { degree[e.a]++; degree[e.b]++; });
    cards.forEach(function (c) { c.degree = degree[c.id]; });

    return { cards: cards, byId: byId, links: links };
  }

  // Every list the reader could pick: the curated built-ins plus whatever they saved.
  function lists(byId) {
    var out = [];
    (window.MATH_BUILTIN_LISTS || []).forEach(function (l) {
      var ids = l.ids || (l.sections || []).reduce(function (acc, s) { return acc.concat(s.ids || []); }, []);
      ids = ids.filter(function (id) { return byId[id]; });
      if (ids.length) out.push({ id: l.id, name: l.name, ids: uniq(ids), kind: l.kind || "built-in" });
    });
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem("mq-lists") || "null"); } catch (e) {}
    if (saved && Array.isArray(saved.items)) {
      saved.items.forEach(function (l) {
        var ids = (l.ids || []).filter(function (id) { return byId[id]; });
        if (ids.length) out.push({ id: "user-" + l.id, name: l.name, ids: uniq(ids), kind: "yours" });
      });
    }
    return out;
  }

  function uniq(a) {
    var s = {}, o = [];
    a.forEach(function (x) { if (!s[x]) { s[x] = 1; o.push(x); } });
    return o;
  }

  return { applyTheme: applyTheme, build: build, lists: lists, SECTION_COLOR: SECTION_COLOR, uniq: uniq };
})();
