#!/usr/bin/env python3
"""Propose and apply [[card-id|text]] cross-links inside the detail write-ups.

Why this exists as a saved tool: the first linking pass was a throwaway script that
generated its patterns from the card *names*. Names cannot express the two things that
actually appear in the prose --

  * the short form a card carries in parentheses ("Lifting the Exponent (LTE)" is written
    "LTE" eight times and spelled out twice), and
  * the bare surname ("Stewart's" alone, where only "Stewart's theorem" ever matched),

-- so both went unlinked, and because nothing was saved, the editorial denylist from that
pass (Pythagoras, the quadratic formula, the law of sines, the triangle inequality: bedrock
results a reader already knows) survived only as an accident of the data. The vocabulary now
lives in tools/link-aliases.json and this tool is re-runnable, so cards added later get the
same treatment.

Build-time only. Nothing here ships to the browser; the links are baked into the data as
[[...]] markup, which js/app.js linkifyCards() renders.

Usage:
    python3 tools/build-cross-links.py --seed      # regenerate candidate aliases from cards
    python3 tools/build-cross-links.py --report    # list candidates in context (writes nothing)
    python3 tools/build-cross-links.py --apply     # write the links into js/data/details/*.js

--report is the review surface: every candidate is printed with its sentence so a human can
strike the false positives. They are real and frequent -- "picks" is usually the verb, not
Pick's Theorem; "Cauchy" in the Matrix-Tree card means Cauchy-Binet.

Re-running --report after --apply must propose zero. That is the idempotency check.
"""

import argparse
import io
import json
import os
import re
import sys
import glob

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from importlib import import_module

_bsi = import_module("build-search-index") if os.path.exists(
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "build-search-index.py")
) else None

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ALIAS_PATH = os.path.join(ROOT, "tools/link-aliases.json")
DETAIL_GLOB = os.path.join(ROOT, "js/data/details/*.js")


# ---------------------------------------------------------------- card loading

def load_cards():
    """{id: {name, description, body, section}} -- reuses the search-index parser."""
    if _bsi is not None:
        return _bsi.load_cards()
    raise SystemExit("tools/build-search-index.py not found; it owns the card parser")


# ---------------------------------------------------------------- alias seeding

_ACRONYM = re.compile(r"^[A-Z][A-Z0-9&-]{1,5}$")


def seed_aliases(cards):
    """Candidate surface forms per card, generated FROM THE DATA.

    Never hand-typed: the TAG_GROUPS pass taught that eight of ten hand-written ids were
    wrong. Three sources -- the name minus any parenthetical, each parenthetical itself
    (this is where LTE/PIE/SFFT/Nim live), and the possessive stem of a name that starts
    with a surname (this is where the bare "Stewart's" lives).
    """
    out = {}
    for cid, c in cards.items():
        name = c["name"]
        base = re.sub(r"\s*\([^)]*\)", "", name).strip()
        forms = {base}
        for par in re.findall(r"\(([^)]+)\)", name):
            forms.add(par.strip())
        m = re.match(r"([A-Z][\wÀ-ɏ–-]*)(?:'s|’s)\s+\S", base)
        if m:
            sur = m.group(1)
            forms |= {sur, sur + "'s", sur + "’s", sur + "s"}
        forms = {f for f in forms if len(f) >= 3}
        if forms:
            out[cid] = sorted(forms)
    return out


def build_table(cards, cfg):
    """alias(lowercased) -> card id, plus the ambiguous ones held back.

    An alias claimed by more than one card is NOT guessed at. "euler" alone reaches seven
    cards; those go to `ambiguous` as a worklist for a later context-aware pass.
    """
    deny = {d.lower() for d in cfg.get("deny", [])}
    claims, surface = {}, {}
    for cid, forms in cfg.get("aliases", {}).items():
        if cid not in cards:
            continue
        for f in forms:
            if f.lower() in deny:
                continue
            claims.setdefault(f.lower(), set()).add(cid)
            surface.setdefault(f.lower(), f)
    table, ambiguous = {}, {}
    for a, ids in claims.items():
        if len(ids) == 1:
            # carry the ORIGINAL casing: the key is lowercased for ambiguity detection, and
            # matching a case-sensitive acronym against that key searched for "lte", which
            # never matches "LTE" -- the exact miss this pass exists to fix.
            table[a] = (next(iter(ids)), surface[a])
        else:
            ambiguous[a] = sorted(ids)
    return table, ambiguous


# ---------------------------------------------------------------- matching

def spans_to_skip(text):
    """Character ranges that must never be touched: math, and existing links."""
    out = []
    for m in re.finditer(r"\$[^$]*\$", text):
        out.append((m.start(), m.end()))
    for m in re.finditer(r"\[\[[^\]]*\]\]", text):
        out.append((m.start(), m.end()))
    return out


def in_span(i, j, spans):
    return any(s <= i and j <= e for s, e in spans)


def find_candidates(host, body, table, cfg, cards):
    """Longest alias first, once per (host, target).

    Longest-first is what keeps a link off a substring of a longer term: where the prose
    says "Cayley-Menger", the host's own full name matches before the bare "Cayley" from
    cayleys-formula can, and self-links are dropped.
    """
    protect = [p for p in cfg.get("protect", [])]
    case_sensitive = {c for c in cfg.get("caseSensitive", [])}
    skip = spans_to_skip(body)
    for p in protect:
        for m in re.finditer(r"(?<![\w-])" + re.escape(p) + r"(?![\w-])", body, re.I):
            skip.append((m.start(), m.end()))
    # the host's own names are protected too, so a card never links to itself
    own = [cards[host]["name"], re.sub(r"\s*\([^)]*\)", "", cards[host]["name"]).strip()]
    for p in own:
        for m in re.finditer(r"(?<![\w-])" + re.escape(p) + r"(?![\w-])", body, re.I):
            skip.append((m.start(), m.end()))

    reject = set(cfg.get("reject", []))
    # Targets this card already links. Without this the once-per-host-per-target rule holds
    # only WITHIN a run: on the next run the applied link is hidden inside a [[...]] skip
    # span, so a second mention further down looks unlinked and a duplicate is proposed.
    found = []
    taken = set(re.findall(r"\[\[([\w-]+)[|\]]", body))
    for alias in sorted(table, key=len, reverse=True):
        tgt, form = table[alias]
        if tgt == host or tgt in taken or (host + " -> " + tgt) in reject:
            continue
        cs = any(c.lower() == alias for c in case_sensitive)
        pat = re.compile(r"(?<![\w-])" + re.escape(form if cs else alias) + r"(?![\w-])",
                         0 if cs else re.I)
        for m in pat.finditer(body):
            if in_span(m.start(), m.end(), skip):
                continue
            # linkifyCards splits on $...$ before looking for [[...]], so a link whose text
            # straddles math would never match its regex and would render as literal markup.
            if "$" in m.group(0):
                continue
            found.append({"host": host, "target": tgt, "alias": alias,
                          "start": m.start(), "end": m.end(), "text": m.group(0)})
            skip.append((m.start(), m.end()))
            taken.add(tgt)
            break
    return found


def sentence_of(body, i, j):
    a = max(body.rfind(". ", 0, i), body.rfind("\n", 0, i)) + 1
    b = body.find(". ", j)
    b = len(body) if b < 0 else b + 1
    return re.sub(r"\s+", " ", body[a:b]).strip()


# ---------------------------------------------------------------- entry walking

_ENTRY = re.compile(r'\n"([\w-]+)":\s*String\.raw`')


def entries_of(src):
    """(id, body_start, body_end) for each details entry.

    Found by scanning forward for the closing backtick rather than by a non-greedy match to
    a fixed terminator: the last entry in an Object.assign block ends with ` + '});' and not
    ` + ',', and a regex assuming the comma silently swallows the following entry. That
    exact bug ate two entries on earlier passes.
    """
    out = []
    for m in _ENTRY.finditer(src):
        st = m.end()
        k = src.find("`", st)
        while k != -1 and src[k - 1] == "\\":
            k = src.find("`", k + 1)
        if k == -1:
            continue
        out.append((m.group(1), st, k))
    return out


# ---------------------------------------------------------------- modes

def load_cfg():
    if not os.path.exists(ALIAS_PATH):
        return {"aliases": {}, "deny": [], "protect": [], "caseSensitive": [], "ambiguous": {}}
    return json.load(io.open(ALIAS_PATH, encoding="utf-8"))


def collect(cards, cfg):
    table, ambiguous = build_table(cards, cfg)
    hits = []
    for path in sorted(glob.glob(DETAIL_GLOB)):
        src = io.open(path, encoding="utf-8").read()
        for cid, st, en in entries_of(src):
            if cid not in cards:
                continue
            body = src[st:en]
            for c in find_candidates(cid, body, table, cfg, cards):
                c["path"] = path
                c["start"] += st
                c["end"] += st
                hits.append(c)
    return hits, ambiguous


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--seed", action="store_true")
    ap.add_argument("--report", action="store_true")
    ap.add_argument("--apply", action="store_true")
    args = ap.parse_args()
    cards = load_cards()
    cfg = load_cfg()

    if args.seed:
        seeded = seed_aliases(cards)
        cfg.setdefault("deny", [])
        cfg.setdefault("protect", [])
        cfg["aliases"] = seeded
        acro = sorted({f for forms in seeded.values() for f in forms if _ACRONYM.match(f)})
        cfg["caseSensitive"] = acro
        _, amb = build_table(cards, cfg)
        cfg["ambiguous"] = amb
        io.open(ALIAS_PATH, "w", encoding="utf-8").write(
            json.dumps(cfg, indent=1, ensure_ascii=False, sort_keys=True) + "\n")
        print("seeded %d cards, %d acronyms, %d ambiguous aliases -> %s"
              % (len(seeded), len(acro), len(amb), ALIAS_PATH))
        return

    hits, amb = collect(cards, cfg)
    if args.report or not args.apply:
        for h in sorted(hits, key=lambda h: (h["host"], h["alias"])):
            print("%-34s -> %-32s '%s'\n     %s"
                  % (h["host"], h["target"], h["text"], sentence_of(
                      io.open(h["path"], encoding="utf-8").read(), h["start"], h["end"])[:190]))
        print("\n%d candidates | %d ambiguous aliases held back" % (len(hits), len(amb)))
        return

    if args.apply:
        n = 0
        for path in sorted(glob.glob(DETAIL_GLOB)):
            mine = [h for h in hits if h["path"] == path]
            if not mine:
                continue
            src = io.open(path, encoding="utf-8").read()
            for h in sorted(mine, key=lambda h: -h["start"]):
                src = src[:h["start"]] + "[[%s|%s]]" % (h["target"], h["text"]) + src[h["end"]:]
                n += 1
            io.open(path, "w", encoding="utf-8").write(src)
        print("applied %d links" % n)


if __name__ == "__main__":
    main()
