#!/usr/bin/env python3
"""Check that every card tagged on a problem is actually used by that problem's strategy.

The failure this exists to catch: tagging a card because the problem *mentions* the object
rather than because the solution *uses* the method. 2026 AIME I #5 was tagged `rotation-trick`
because the problem rotates a point, but `rotation-trick` is the specific "rotate about a
vertex of an equilateral triangle to fuse three distances" technique, which that solution never
touches. A tag like that is worse than no tag: it sends a reader to study the wrong method.

The rule enforced here: **a tag must be recognisable in the strategy text.** If the strategy
never alludes to the card, either the tag is wrong or the strategy fails to explain why the
card is relevant -- both are defects worth fixing.

Terms are drawn from the card's name, its keywords, and the hand-written aliases in
link-aliases.json, minus the generic-word denylist that the cross-link tool already maintains.
Matching is deliberately loose (any signature term, stemmed, word-boundary) so the output is a
short review list rather than noise: a flag means "justify or drop", not "certainly wrong".

Usage:
    python3 tools/audit-problem-tags.py                # every problem
    python3 tools/audit-problem-tags.py 2026           # refs starting with 2026
    python3 tools/audit-problem-tags.py --sample 24    # a spread across years
"""

import io
import json
import os
import random
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from importlib import import_module

_bsi = import_module("build-search-index")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Words that carry no evidence either way: every geometry strategy says "triangle".
STOP = set("""a an the of in on to for and or with by from at is are be that this it its
triangle circle number numbers integer integers point points line lines value values
formula theorem method problem sum product ratio area length side sides angle angles
set function equation equations term terms case cases count counting
""".split())


def load_db():
    """One entry per line. Matching a brace-balanced object instead would break on the braces
    inside the LaTeX -- \\frac{p+2}{7} ends the object early and the strategy is lost, which
    silently reported 16 entries as having no strategy at all."""
    src = io.open(os.path.join(ROOT, "js/data/problems/problem-db.js"), encoding="utf-8").read()
    out = []
    for line in src.split("\n"):
        rm = re.search(r'ref:\s*"([^"]+)"', line)
        fm = re.search(r'formulas:\s*\[([^\]]*)\]', line)
        if not (rm and fm):
            continue
        sm = re.search(r'strategy:\s*"((?:[^"\\]|\\.)*)"', line)
        strat = sm.group(1) if sm else ""
        strat = strat.replace('\\"', '"').replace("\\\\", "\\")
        out.append({"ref": rm.group(1), "formulas": re.findall(r'"([\w-]+)"', fm.group(1)),
                    "strategy": strat})
    return out


def norm(w):
    w = re.sub(r"[^a-z0-9]", "", w.lower())
    if len(w) > 4 and w.endswith("s") and not w.endswith("ss"):
        w = w[:-1]
    return w


def signature(cid, card, aliases):
    """Two kinds of evidence, because they are not equally strong.

    A PHRASE from the card's name or aliases is decisive when all of its words appear in the
    strategy. Phrases keep short words like "law" and "sum" -- filtering those out collapsed
    "law of cosines" to the single word "cosines" and flagged an obviously correct tag. Only
    true connectives are dropped, so word order can still vary.

    A single shared word is NOT evidence: "rotations" in the prose matched `rotation-trick`
    and let the wrong tag through, which is the mistake this tool exists to catch. A lone word
    is therefore only accepted when two distinct ones land.
    """
    JOIN = {"of", "the", "a", "an", "and", "or", "for", "to", "in", "on", "with", "by", "its"}
    phrases, words = set(), set()
    src = [card["name"]] + aliases.get(cid, []) + [cid.replace("-", " ")]
    for s in src:
        s = re.sub(r"\$[^$]*\$", " ", s)
        toks = [norm(w) for w in re.split(r"[^A-Za-z0-9]+", s)]
        toks = [t for t in toks if t and t not in JOIN]
        if len(toks) >= 2:
            phrases.add(" ".join(toks))
    for s in [card["name"], card.get("keywords", "")] + aliases.get(cid, []):
        s = re.sub(r"\$[^$]*\$", " ", s)
        for w in re.split(r"[^A-Za-z0-9]+", s):
            n2 = norm(w)
            if len(n2) > 3 and n2 not in STOP:
                words.add(n2)
    return phrases, words


def main():
    args = [a for a in sys.argv[1:]]
    sample = 0
    if "--sample" in args:
        i = args.index("--sample")
        sample = int(args[i + 1]); del args[i:i + 2]
    prefix = args[0] if args else None

    cards = _bsi.load_cards()
    cfg = json.load(io.open(os.path.join(ROOT, "tools/link-aliases.json"), encoding="utf-8"))
    aliases = {k: list(v) for k, v in cfg.get("aliases", {}).items()}
    for k, v in cfg.get("aliasesExtra", {}).items():
        aliases.setdefault(k, []).extend(v)
    deny = {norm(d) for d in cfg.get("deny", [])}

    # how many cards claim each signature word, so "distinctive" is measured, not guessed
    DF = {}
    for k, c in cards.items():
        _, ws = signature(k, c, aliases)
        for w in ws - deny:
            DF[w] = DF.get(w, 0) + 1

    db = load_db()
    if prefix:
        db = [p for p in db if p["ref"].startswith(prefix)]
    if sample:
        by_year = {}
        for p in db:
            by_year.setdefault(p["ref"][:4], []).append(p)
        years = sorted(by_year)
        random.seed(7)
        picked, i = [], 0
        while len(picked) < sample and years:
            y = years[i % len(years)]
            if by_year[y]:
                picked.append(by_year[y].pop(random.randrange(len(by_year[y]))))
            else:
                years.remove(y); i -= 1
            i += 1
        db = sorted(picked, key=lambda p: p["ref"])

    flagged, missing_strategy, unknown = [], [], []
    for p in db:
        words = {norm(w) for w in re.split(r"[^A-Za-z0-9]+", re.sub(r"\$[^$]*\$", " ", p["strategy"]))}
        words = {w for w in words if w}
        if not p["strategy"]:
            missing_strategy.append(p["ref"]); continue
        for cid in p["formulas"]:
            c = cards.get(cid)
            if not c:
                unknown.append((p["ref"], cid)); continue
            phrases, sig = signature(cid, c, aliases)
            sig -= deny
            hit_words = sig & words
            hit_phrase = any(set(ph.split()) <= words for ph in phrases)
            # One word is enough when it is DISTINCTIVE -- owned by at most a couple of cards
            # in the whole library. "casework" belongs to casework-method alone and settles the
            # tag; "rotation" is shared by rotation-trick, rotation-90, affine-transformations
            # and more, so on its own it settles nothing. That distinction is exactly what
            # separates the tag that motivated this tool from the ones it was over-flagging.
            distinctive = {w for w in hit_words if DF.get(w, 0) <= 2}
            if not hit_phrase and not distinctive and len(hit_words) < 2:
                why = ("only '%s' (shared by %d cards)" % (sorted(hit_words)[0], DF.get(sorted(hit_words)[0], 0))
                       if hit_words else "no overlap")
                flagged.append((p["ref"], cid, c["name"], why))

    print("problems checked: %d   tags checked: %d"
          % (len(db), sum(len(p["formulas"]) for p in db)))
    if unknown:
        print("\nTAGS POINTING AT NO CARD (%d):" % len(unknown))
        for ref, cid in unknown: print("   %-30s %s" % (ref, cid))
    if missing_strategy:
        print("\nNO STRATEGY TEXT (%d): %s%s"
              % (len(missing_strategy), ", ".join(missing_strategy[:6]),
                 " ..." if len(missing_strategy) > 6 else ""))
    print("\nTAGS THE STRATEGY DOES NOT SUPPORT (%d):" % len(flagged))
    for ref, cid, name, why in flagged:
        print("   %-30s %-28s %-30s %s" % (ref, cid, name[:28], why))
    if not flagged:
        print("   none")


if __name__ == "__main__":
    main()
