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

print("problems: " + DB.length + " | cards: " + Object.keys(CARDS).length + " | topics: " + Object.keys(TOPICS).length);
if (errors.length) { print("VIOLATIONS (" + errors.length + "):"); errors.slice(0, 50).forEach(print); }
else print("OK — 0 violations");
