#!/usr/bin/env python3
"""Assert every id in built-in-lists.js resolves to a real card.

This exists because both failure paths in js/app.js are silent:
  - app.js ~1123 drops unknown ids, and DELETES a whole list from the UI if all of them fail
  - app.js ~1090 rewrites the user's localStorage, permanently discarding ids that fail to resolve
So a typo costs a list, or a reader's saved collection, with nothing printed anywhere.
"""
import io, re, glob, sys

cards = set()
for f in glob.glob("js/data/*.js"):
    if f.endswith("built-in-lists.js"):
        continue
    s = io.open(f, encoding="utf-8").read()
    # a card name may be a plain string OR String.raw (two names contain LaTeX), and
    # patterns.js inserts type/subject after name -- accept every shape or the checker
    # under-counts the corpus and reports live ids as broken.
    # A card name may be a plain string or String.raw (two names carry LaTeX), and field
    # order varies: patterns.js puts type/subject after name, except periodic-sequences,
    # the one documented deviation in the corpus, which puts them before it. Accept all.
    cards |= set(re.findall(r'\n\s+id: "([a-z0-9-]+)",\n\s+(?:type: "[a-z]+",\n\s+subject: "[a-z-]+",\n\s+)?name:', s))

src = io.open("js/data/built-in-lists.js", encoding="utf-8").read()
bad, total, lists = [], 0, 0
for m in re.finditer(r'\{ id: "([a-z0-9-]+)", name: "([^"]+)"', src):
    lists += 1
seen_ids = re.findall(r'ids: \[([^\]]*)\]', src)
for blob in seen_ids:
    for cid in re.findall(r'"([a-z0-9-]+)"', blob):
        total += 1
        if cid not in cards:
            bad.append(cid)

print("lists: %d | id references: %d | distinct cards known: %d" % (lists, total, len(cards)))
if bad:
    print("UNRESOLVED ids (%d):" % len(bad))
    for b in sorted(set(bad)):
        print("   " + b)
    sys.exit(1)

# ---- route completeness -----------------------------------------------------------------
# built-in-lists.js opens by promising that a route is "every card carrying that level and
# subject, so a route is complete by construction rather than a hand-picked sample". Nothing
# enforced it, and routes are edited by hand, so every card added to the library silently
# failed to join the routes it qualified for -- 14 such gaps had accumulated across six cards
# before this check existed. The failure is invisible in the UI: the route just quietly omits
# a card the reader was promised.
LEVELS_FOR_TIER = {"MATHCOUNTS": {"MATHCOUNTS"},
                   "AMC": {"AMC10", "AMC12"},      # one tier, TWO level tags
                   "AIME": {"AIME"},
                   "Olympiad": {"Olympiad"}}
SUBJECT_FILE = {"Geometry": "geometry", "Algebra": "algebra",
                "Number Theory": "number-theory", "Counting & Probability": "counting"}

# card id -> (subject, {levels}). Requiring `name:` or `type:` to follow the id is what keeps
# the section object at the top of each file out of this map -- its id is followed by `group:`,
# and without the guard it is read as a card whose levels belong to the first real card below.
# `level` is a card's last field, so the first one after an id always belongs to that card.
meta = {}
for f in sorted(glob.glob("js/data/*.js")):
    if f.endswith("built-in-lists.js"):
        continue
    fam = f.split("/")[-1][:-3]
    body = io.open(f, encoding="utf-8").read()
    for m in re.finditer(r'\n\s+id: "([a-z0-9-]+)",\n\s+(?:name|type):', body):
        cid = m.group(1)
        if cid in meta:
            continue
        seg = body[m.start():m.start() + 2500]
        lv = re.search(r'level: \[([^\]]*)\]', seg)
        if not lv:
            continue
        sm = re.search(r'subject: "([a-z-]+)"', seg[:lv.start()])
        meta[cid] = (sm.group(1) if sm else fam,
                     set(re.findall(r'"([A-Za-z0-9]+)"', lv.group(1))))

blocks = re.split(r'\n  \{ id: "', src)     # one blob per list, so sections cannot leak across
route_bad = []
for blk in blocks[1:]:
    lid = blk[:blk.index('"')]
    head_of = blk[:400]
    if 'kind: "route"' not in head_of:
        continue
    tm = re.search(r'tier: "([^"]+)"', head_of)
    sm = re.search(r'subject: "([^"]+)"', head_of)
    if not tm or not sm or sm.group(1) not in SUBJECT_FILE:
        continue
    want_subj = SUBJECT_FILE[sm.group(1)]
    want_lv = LEVELS_FOR_TIER.get(tm.group(1), set())
    have = set()
    for blob in re.findall(r'ids: \[([^\]]*)\]', blk):
        have |= set(re.findall(r'"([a-z0-9-]+)"', blob))
    should = {c for c, (sj, lv) in meta.items() if sj == want_subj and (lv & want_lv)}
    for c in sorted(should - have):
        route_bad.append("%s: MISSING %s" % (lid, c))
    for c in sorted(have - should):
        route_bad.append("%s: %s does not qualify" % (lid, c))

# Advisory, not fatal: a single-card section renders as a heading with nothing under it, which
# is a presentation call rather than a broken promise. 17 exist today.
thin = []
for blk in blocks[1:]:
    lid = blk[:blk.index('"')]
    for tm in re.finditer(r'\{ title: "([^"]+)",(?:\n\s+note: "[^"]*",)?\n\s+ids: \[([^\]]*)\]', blk):
        if len(re.findall(r'"([a-z0-9-]+)"', tm.group(2))) == 1:
            thin.append("%s: section %r holds a single card" % (lid, tm.group(1)))

print("cards indexed: %d | route problems: %d | single-card sections: %d (advisory)"
      % (len(meta), len(route_bad), len(thin)))
for r in route_bad[:25]:
    print("   " + r)
if route_bad:
    sys.exit(1)
print("OK - every list id resolves and every route is complete")
