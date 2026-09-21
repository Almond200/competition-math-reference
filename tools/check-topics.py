#!/usr/bin/env python3
"""Topic-chip gate.

Topic chips are user-facing: one appears on every card and each opens a browsable
topic page. Nothing measured them, which is exactly why 38 cards carried a wrong
chip for months. The cause was one line in js/app.js, which builds the matching
haystack as `name + keywords + sub.title` -- so a subsection TITLE awards topics
to every card filed under it, whether or not the title describes that card.

This reuses the real TOPIC_RULES out of js/app.js rather than restating them, so
the check cannot drift from the app. It fails on:

  * a card with no topic chip at all (unreachable by topic browsing), and
  * any (subsection, topic) pair on KNOWN_BAD -- the pairs where a title was
    measured to award a topic that is wrong for the cards underneath it.

Run it after touching TOPIC_RULES, after adding a subsection, or after renaming
one. `--list` prints every card's chips and the reason each was awarded.
"""
import json, os, re, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSC = "/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc"
DATA = ["geometry", "algebra", "counting", "number-theory", "patterns"]

# Pairs measured to be wrong: the subsection title awards this topic to cards the
# topic does not describe. Each was read card by card before being listed here.
KNOWN_BAD = [
    ("Counting & Probability", "probability"),      # a tools subsection named by SUBJECT
    ("Counting & Probability", "combinatorics"),
    ("Divisor Functions & Totient", "modular-arithmetic"),
    ("Floors, Radicals & Absolute Value", "radicals"),
    ("Symmetry, Partitions & Posets", "stars-bars"),
    ("Stars & Bars / Distributions", "probability"),
    # "Projective Geometry & Inversion" was the sixth pair. It was fixed at source by
    # renaming the subsection to "Projective Geometry & Cross-Ratio", which both
    # describes its actual contents and removes the word that awarded the chip.
]


def lift_from_app():
    """Lift TOPIC_RULES, TITLE_STOP and topicsForCard verbatim out of js/app.js.

    Copying the logic here instead would let the gate and the app drift, which is
    the failure this whole check exists to prevent."""
    src = open(os.path.join(ROOT, "js/app.js")).read()
    out = []
    i = src.index("  const TOPIC_RULES = [")
    out.append(src[i:src.index("\n  ];", i) + 4])
    i = src.index("  const METHODS_TOPIC =")
    out.append(src[i:src.index("\n", i) + 1])
    i = src.index("  const TITLE_STOP = {")
    out.append(src[i:src.index("\n  };", i) + 5])
    i = src.index("  function topicsForCard(")
    out.append(src[i:src.index("\n  }\n", i) + 4])
    return "\n".join(out)


def run():
    parts = ["var window = {}; window.MATH_SECTIONS = [];"]
    for f in DATA:
        parts.append(open(os.path.join(ROOT, "js/data/%s.js" % f)).read())
    parts.append(lift_from_app())
    parts.append(r"""
var out = [];
window.MATH_SECTIONS.forEach(function (section) {
  (section.subsections || []).forEach(function (sub) {
    (sub.formulas || []).forEach(function (f) {
      var subjectId = f.subject || section.id;
      var own = (f.name + " " + f.keywords.join(" ")).toLowerCase();
      var topics = topicsForCard(f, sub, section, subjectId).map(function (t) { return t.id; });
      var fromOwn = TOPIC_RULES.filter(function (t) {
        return (!t.sec || t.sec.indexOf(subjectId) !== -1) && t.re && t.re.test(own);
      }).map(function (t) { return t.id; });
      out.push({ id: f.id, name: f.name, sub: sub.title, group: section.group,
                 type: f.type || "formula", topics: topics, fromOwn: fromOwn });
    });
  });
});
print(JSON.stringify(out));
""")
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as fh:
        fh.write("\n".join(parts))
        path = fh.name
    try:
        res = subprocess.run([JSC, path], capture_output=True, text=True)
    finally:
        os.unlink(path)
    if res.returncode != 0 or not res.stdout.strip().startswith("["):
        sys.stderr.write(res.stdout + res.stderr)
        sys.exit("check-topics: harness failed to run")
    return json.loads(res.stdout)


def main():
    cards = run()
    bad = set(KNOWN_BAD)
    violations, orphans = [], []
    for c in cards:
        for t in c["topics"]:
            if (c["sub"], t) in bad and t not in c["fromOwn"]:
                violations.append("%s: %r awarded by the title of %r" % (c["id"], t, c["sub"]))
        if not c["topics"]:
            orphans.append("%s (%s > %s)" % (c["id"], c["group"], c["sub"]))

    if "--list" in sys.argv:
        for c in sorted(cards, key=lambda c: (c["sub"], c["id"])):
            via = [t for t in c["topics"] if t not in c["fromOwn"] and t != "methods"]
            note = ("   [title: %s]" % ", ".join(via)) if via else ""
            print("  %-34s %-28s %s%s" % (c["id"], c["sub"][:26], ", ".join(c["topics"]), note))

    print("topics: %d cards | title-awarded violations: %d | cards with no chip: %d"
          % (len(cards), len(violations), len(orphans)))
    for v in violations[:25]:
        print("   " + v)
    for o in orphans[:25]:
        print("   NO CHIP  " + o)
    if violations or orphans:
        sys.exit(1)
    print("OK - every card carries a topic, and no title awards a topic it should not")


main()
