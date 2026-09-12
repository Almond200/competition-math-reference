// Validate js/data/problems/problem-db.js. Run from repo root with jsc:
//   jsc tools/validate-problem-db.js
// Checks: every `formulas` id is a real card; every `types` id is a real topic;
// `d` (if present) in [1,10]; `ref` is AoPS-URL parseable; no duplicate refs.
var window = {};
var SECTIONS = [];
function defineSection(s) { SECTIONS.push(s); }
window.MATH_SECTIONS = SECTIONS;
load('js/data/geometry.js'); load('js/data/algebra.js');
load('js/data/number-theory.js'); load('js/data/counting.js');
load('js/data/patterns.js');
var CARDS = {};
SECTIONS.forEach(function (s) { (s.subsections || []).forEach(function (sub) { (sub.formulas || []).forEach(function (f) { CARDS[f.id] = 1; }); }); });

// Topic ids: pull from app.js (TOPIC_RULES entries look like `id: "x", label: "y"`).
var TOPICS = {};
var appSrc = read('js/app.js');
var re = /id:\s*"([a-z0-9-]+)",\s*label:\s*"/g, m;
while ((m = re.exec(appSrc))) TOPICS[m[1]] = 1;

load('js/data/problems/problem-db.js');
var DB = window.MATH_PROBLEM_DB || [];
var refRe = /^\d{4}\s+.*?,\s*Problem\s+\d+$/;
var errors = [], seen = {};
DB.forEach(function (e, i) {
  var at = "[" + i + "] " + (e.ref || "(no ref)");
  if (!e.ref || !refRe.test(e.ref)) errors.push(at + ": ref not AoPS-parseable");
  if (seen[e.ref]) errors.push(at + ": duplicate ref"); seen[e.ref] = 1;
  if (!e.formulas || !e.formulas.length) errors.push(at + ": no formulas");
  (e.formulas || []).forEach(function (f) { if (!CARDS[f]) errors.push(at + ": unknown formula id '" + f + "'"); });
  (e.types || []).forEach(function (t) { if (!TOPICS[t]) errors.push(at + ": unknown type id '" + t + "'"); });
  if (e.d != null && (typeof e.d !== "number" || e.d < 1 || e.d > 10)) errors.push(at + ": d out of range");
});
// Every [[card-id]] cross-link in a write-up must resolve, or a renamed card leaves a
// dead link that nothing else would catch.
var DETAILS = {};
["geometry", "algebra", "number-theory", "counting"].forEach(function (s) {
  try { load("js/data/details/" + s + "-details.js"); } catch (e) {}
});
DETAILS = window.MATH_DETAILS || {};
var linkErrors = [], linkCount = 0;
Object.keys(DETAILS).forEach(function (cid) {
  var re2 = /\[\[([\w-]+)(?:\|[^\]]*)?\]\]/g, mm;
  while ((mm = re2.exec(DETAILS[cid]))) {
    linkCount++;
    if (!CARDS[mm[1]]) linkErrors.push(cid + " -> [[" + mm[1] + "]]");
  }
});
print("card cross-links: " + linkCount + " | dangling: " + (linkErrors.length ? linkErrors.join(", ") : "none"));

// A strategy is written as a plain "..." JS string, so a LaTeX command needs its backslash
// DOUBLED in the source. Written singly, the escape is consumed before KaTeX ever sees it:
// \f becomes a formfeed, \t a tab, \b a backspace, and \c \g \p \s \m \a \l just lose the
// backslash. The damage is invisible in the source and only shows as mangled maths on the
// page, so it is checked here. Control characters are the tell.
var latexErrors = [];
DB.forEach(function (e) {
  if (!e.strategy) return;
  if (/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(e.strategy)) {
    latexErrors.push(e.ref + ": control character in strategy (un-escaped LaTeX backslash)");
  }
  // a lone "$...$" span that contains a letter-run with no backslash where one is expected
  var m = e.strategy.match(/\$[^$]*\$/g) || [];
  m.forEach(function (span) {
    if (/(?:^|[^\\a-zA-Z])(?:frac|sqrt|cdot|pmod|bmod|equiv|angle|triangle|varphi|mathrm|mathbb|tfrac|circ|times|prod|sum|leq|geq)(?![a-zA-Z])/.test(span)) {
      latexErrors.push(e.ref + ": LaTeX command missing its backslash in " + span.slice(0, 40));
    }
    // A raw "<" followed by a letter is parsed as the START OF AN HTML TAG, because the
    // strategy is inserted as HTML before KaTeX runs. The browser then silently swallows
    // everything up to the next ">", so the sentence renders cut off halfway and the
    // source looks perfectly fine. "\sum_{i<j}" is the case that got through. House
    // convention is \lt / \gt inside maths -- enforced here, not left to review.
    if (/<[A-Za-z/]/.test(span)) {
      latexErrors.push(e.ref + ": raw '<' inside maths is read as an HTML tag and eats the "
        + "rest of the line -- use \\lt: " + span.slice(0, 44));
    }
  });
});
if (latexErrors.length) { errors = errors.concat(latexErrors); }

print("problems: " + DB.length + " | cards: " + Object.keys(CARDS).length + " | topics: " + Object.keys(TOPICS).length);
if (errors.length) { print("VIOLATIONS (" + errors.length + "):"); errors.slice(0, 50).forEach(print); }
else print("OK — 0 violations");
