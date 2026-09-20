#!/usr/bin/env python3
"""Measure the house conventions across every card, so CONVENTIONS.md can cite numbers.

Run from the repo root:  python3 tools/scan-conventions.py
Every figure quoted in CONVENTIONS.md comes from here. If a rule cannot be produced
by this script, it is an opinion, not a convention.
"""
import collections
import glob, glob, io, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
SUBJECT = ["geometry", "algebra", "number-theory", "counting"]
FILES = SUBJECT + ["patterns"]


def cards_of(fam):
    """Brace-match each card object, skipping template literals and strings."""
    s = io.open("js/data/%s.js" % fam, encoding="utf-8").read()
    marks = [(m.start(), m.group(1)) for m in re.finditer(r'title: "([^"]+)"', s)]
    out = []
    # `name:` or `type:` may follow the id; requiring one of them excludes the
    # section objects at the top of each file, whose id is followed by `group:`.
    for m in re.finditer(r'\n\s+id: "([a-z0-9-]+)",\n\s+(?:name|type):', s):
        i = s.rfind("{", 0, m.start())
        depth, j, n = 0, i, len(s)
        while j < n:
            ch = s[j]
            if ch in "`\"":
                q = ch
                j += 1
                while j < n and s[j] != q:
                    j += 2 if s[j] == "\\" else 1
            elif ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    break
            j += 1
        sub = [t for p, t in marks if p < i]
        out.append(dict(file=fam, id=m.group(1), sub=sub[-1] if sub else None, blk=s[i:j + 1]))
    return out


def field(blk, name):
    m = re.search(name + r":\s*String\.raw`(.*?)`,?\n", blk, re.S)
    if m:
        return m.group(1)
    m = re.search(name + r':\s*"([^"]*)"', blk)
    return m.group(1) if m else None


CARDS = [c for f in FILES for c in cards_of(f)]
for c in CARDS:
    c["name"] = field(c["blk"], "name")
    c["latex"] = field(c["blk"], "latex")
    c["desc"] = field(c["blk"], "description")
    kw = re.search(r"keywords:\s*\[(.*?)\]", c["blk"], re.S)
    c["kw"] = re.findall(r'"([^"]*)"', kw.group(1)) if kw else []
    c["imp"] = field(c["blk"], "importance")
    lv = re.search(r"level:\s*\[(.*?)\]", c["blk"], re.S)
    c["lvl"] = re.findall(r'"([^"]*)"', lv.group(1)) if lv else []
    c["type"], c["subject"] = field(c["blk"], "type"), field(c["blk"], "subject")
    c["fields"] = re.findall(r"\n\s+([a-zA-Z]+):", c["blk"])

DETAILS = {}
for f in SUBJECT:
    s = io.open("js/data/details/%s-details.js" % f, encoding="utf-8").read()
    for m in re.finditer(r'\n"([a-z0-9-]+)": String\.raw`', s):
        DETAILS[m.group(1)] = s[m.end():s.index("`", m.end())]

EXAMPLES = set()
ex = io.open("js/data/examples-supplement.js", encoding="utf-8").read()
EXAMPLES |= set(re.findall(r'^"([a-z0-9-]+)":', ex, re.M))
EXAMPLES |= set(re.findall(r'MATH_EXAMPLES\["([a-z0-9-]+)"\]', ex))

DIAGRAMS = set()
for g in glob.glob("js/data/diagrams/*.js"):
    DIAGRAMS |= set(re.findall(r'DIAGRAMS\[\s*"([^"]+)"\s*\]', io.open(g, encoding="utf-8").read()))


def pct(part, whole):
    return "%d/%d" % (part, whole)


def quantiles(xs):
    xs = sorted(xs)
    return xs[0], xs[len(xs) // 2], xs[int(len(xs) * 0.9)], xs[-1]


print("CARDS: %d  %s" % (len(CARDS), dict(collections.Counter(c["file"] for c in CARDS))))

print("\n-- field order --")
# `latexPlain` is the expanded-notation twin of `latex`, carried by 13 cards; it sits directly
# after `latex` in both orders. The slice is [:10], not [:9], because the pattern order plus
# latexPlain is ten fields long and [:9] truncated it into a phantom eleventh variant.
CANON = {("id", "name", "latex", "description", "keywords", "importance", "level"),
         ("id", "name", "latex", "latexPlain", "description", "keywords", "importance", "level"),
         ("id", "name", "type", "subject", "latex", "description", "keywords", "importance", "level"),
         ("id", "name", "type", "subject", "latex", "latexPlain", "description", "keywords", "importance", "level")}
counts = collections.Counter(tuple(c["fields"][:10]) for c in CARDS)
for order, n in counts.most_common(4):
    flag = "" if order in CANON else "   <-- NOT one of the two canonical orders"
    print("  %3d  %s%s" % (n, ", ".join(order), flag))
odd = [c["id"] for c in CARDS if tuple(c["fields"][:10]) not in CANON]
if odd:
    print("  deviating cards: %s" % ", ".join(odd))

print("\n-- required fields --")
print("  type+subject on patterns.js: %s | on subject files: %s"
      % (pct(sum(1 for c in CARDS if c["file"] == "patterns" and c["type"] and c["subject"]),
             sum(1 for c in CARDS if c["file"] == "patterns")),
         pct(sum(1 for c in CARDS if c["file"] != "patterns" and (c["type"] or c["subject"])),
             sum(1 for c in CARDS if c["file"] != "patterns"))))
print("  latex present: %s | description present: %s"
      % (pct(sum(1 for c in CARDS if c["latex"] is not None), len(CARDS)),
         pct(sum(1 for c in CARDS if c["desc"] is not None), len(CARDS))))

print("\n-- field values --")
print("  importance: %s" % dict(collections.Counter(c["imp"] for c in CARDS)))
print("  level:      %s" % dict(collections.Counter(l for c in CARDS for l in c["lvl"])))
print("  keywords    min %d median %d p90 %d max %d" % quantiles([len(c["kw"]) for c in CARDS]))
print("  name chars  min %d median %d p90 %d max %d" % quantiles([len(c["name"]) for c in CARDS]))
print("  desc chars  min %d median %d p90 %d max %d" % quantiles([len(c["desc"]) for c in CARDS]))

print("\n-- write-ups --")
print("  one per card: %s | orphaned write-ups: %d"
      % (pct(sum(1 for c in CARDS if c["id"] in DETAILS), len(CARDS)),
         len(set(DETAILS) - {c["id"] for c in CARDS})))
heads = collections.Counter()
for v in DETAILS.values():
    for m in re.finditer(r"^## (.+)$", v, re.M):
        heads[m.group(1).strip()] += 1
print("  headings: %s" % dict(heads))
kf = [k for k, v in DETAILS.items() if "## Key forms" in v]
byfile = {c["id"]: c["file"] for c in CARDS}
print("  Key forms: %d total | patterns.js %d | subject files %d"
      % (len(kf), sum(1 for k in kf if byfile.get(k) == "patterns"),
         sum(1 for k in kf if byfile.get(k) and byfile[k] != "patterns")))
em = [v.count("—") for v in DETAILS.values()]
print("  em dashes: median %d p90 %d max %d | %d write-ups use none"
      % (quantiles(em)[1], quantiles(em)[2], quantiles(em)[3], sum(1 for x in em if x == 0)))
print("  containing literal '**': %d  (must stay 0)" % sum(1 for v in DETAILS.values() if "**" in v))

# Single-asterisk emphasis reaches the reader as literal asterisks exactly like bold does, and
# the "**" check above never saw it. The word-boundary guards are what keep LaTeX out: P^*Q^*
# (inversion) and a keyword written "AB*CD = AC*BD" both have the asterisk glued to a character,
# while markdown emphasis always opens after a space and closes before one.
EMPH_RE = re.compile(r"(?<![\w^_{])\*[A-Za-z][^*\n]{0,40}\*(?![\w])")
emph = []
for _f in sorted(glob.glob("js/data/**/*.js", recursive=True)):
    for _i, _line in enumerate(io.open(_f, encoding="utf-8").read().split("\n"), 1):
        if _line.strip().startswith("//"):
            continue                      # source comments are not shown to anyone
        for _m in EMPH_RE.finditer(_line):
            if "**" not in _m.group(0):
                emph.append((_f.split("/")[-1], _i, _m.group(0)))
print("  markdown *emphasis* in prose: %d  (must stay 0)" % len(emph))
for _e in emph[:8]:
    print("    %s:%d  %s" % _e)
bare = [(k, m.group(1)) for k, v in DETAILS.items() for m in re.finditer(r"\[\[([\w-]+)\]\]", v)]
piped = sum(len(re.findall(r"\[\[[\w-]+\|", v)) for v in DETAILS.values())
print("  cross-links: %d piped, %d bare  (bare must stay 0; a bare link renders Title Case mid-sentence)"
      % (piped, len(bare)))
if bare:
    print("  BARE LINKS: %s" % ", ".join("%s -> %s" % b for b in bare[:8]))
print("  raw '<' inside maths: %d  (must stay 0)"
      % sum(1 for v in DETAILS.values() if re.search(r"\$[^$]*<[A-Za-z/][^$]*\$", v)))

# Every way a [[link]] can be written and silently not become a link. All three of these have
# actually shipped: math in a label (linkifyCards splits the prose on $...$ first, so the
# pattern never matches), a link in a card `description` (linkifyCards runs on the write-up and
# nowhere else), and a link in a "## heading" line (headings are interpolated raw). None of them
# trip the validator and none render .card-link-broken, because no link is ever attempted.
LINK_RE = re.compile(r"\[\[([\w-]+)(?:\|([^\]]*))?\]\]")
mislaid = []
for _k, _v in DETAILS.items():
    for _line in _v.split("\n"):
        _head = _line.strip().startswith("## ")
        for _m in LINK_RE.finditer(_line):
            if _m.group(2) and "$" in _m.group(2):
                mislaid.append((_k, "math in label", _m.group(0)))
            if _head:
                mislaid.append((_k, "link in a heading", _m.group(0)))
for _f in sorted(glob.glob("js/data/*.js")):
    for _m in re.finditer(r'description: String\.raw`([^`]*)`', io.open(_f, encoding="utf-8").read()):
        if "[[" in _m.group(1):
            mislaid.append((_f.split("/")[-1], "link in a card description", _m.group(1)[:50]))
print("  links that would render raw: %d  (must stay 0)" % len(mislaid))
for _x in mislaid[:8]:
    print("    %s: %s -- %s" % _x)

# CONVENTIONS.md: "Key forms lists the shapes a technique takes, not worked examples." A bullet
# that is mostly concrete digits is a worked example wearing a form's clothes -- the one that
# prompted this read "row $n = 4$: $1+16+36+16+1=70=\\binom 84$", which is an instance of the
# identity above it, not another shape of it. Threshold is deliberately loose (a real form like
# "$\\binom{2n}{n}/4^n$" carries digits too) and catches exactly the offending kind.
kf_examples = []
for _k, _v in DETAILS.items():
    _m = re.search(r"## Key forms\n(.*?)(?=\n## |\Z)", _v, re.S)
    if not _m:
        continue
    for _line in _m.group(1).split("\n"):
        _t = _line.strip()
        if not _t.startswith("- "):
            continue
        _d = len(re.findall(r"\d", _t))
        _l = len(re.findall(r"[A-Za-z]", _t))
        if _d >= 6 and _d > _l * 0.5:
            kf_examples.append((_k, _t[:90]))
print("  worked examples inside Key forms: %d  (must stay 0)" % len(kf_examples))
for _x in kf_examples[:8]:
    print("    %s: %s" % _x)

print("\n-- examples --")
print("  one per card: %s" % pct(sum(1 for c in CARDS if c["id"] in EXAMPLES), len(CARDS)))
missing_ex = [c["id"] for c in CARDS if c["id"] not in EXAMPLES]
if missing_ex:
    print("  MISSING: %s" % ", ".join(missing_ex))

print("\n-- diagrams --")
for f in FILES:
    fam = [c for c in CARDS if c["file"] == f]
    have = sum(1 for c in fam if c["id"] in DIAGRAMS)
    note = "  <-- geometry is effectively mandatory" if f == "geometry" else ""
    print("  %-14s %s%s" % (f, pct(have, len(fam)), note))
missing_dia = [c["id"] for c in CARDS if c["file"] == "geometry" and c["id"] not in DIAGRAMS]
if missing_dia:
    print("  GEOMETRY CARDS WITHOUT A DIAGRAM: %s" % ", ".join(missing_dia))

print("\n-- shared AMC 10/12 problems --")
import json as _json
_db = io.open("js/data/problems/problem-db.js", encoding="utf-8").read()
_ent = re.findall(r'\{ ref: "([^"]+)", formulas: \[([^\]]*)\], strategy: "((?:[^"\\\\]|\\\\.)*)"', _db)
_by = collections.defaultdict(list)
for _r, _f, _s in _ent:
    _by[_s].append((_r, tuple(re.findall(r'"([a-z0-9-]+)"', _f))))
_shared = {k: v for k, v in _by.items() if len(v) > 1}
_bad = [v for v in _shared.values() if len({t for _, t in v}) > 1]
print("  entry pairs sharing a strategy: %d  |  with MISMATCHED tags: %d" % (len(_shared), len(_bad)))
for _v in _bad:
    print("    MISMATCH: " + " vs ".join("%s %s" % (r, list(t)) for r, t in _v))

print("\n-- duplicate watch (names sharing a significant word) --")
STOP = set("the of a an and in to for by with on two three its it is are from at".split())
seen = collections.defaultdict(list)
for c in CARDS:
    for w in re.findall(r"[A-Za-z]{4,}", c["name"].lower()):
        if w not in STOP:
            seen[w].append(c["id"])
dupes = {w: v for w, v in seen.items() if len(v) > 1}
for w in sorted(dupes, key=lambda w: -len(dupes[w]))[:12]:
    print("  %-16s %s" % (w, ", ".join(dupes[w])))

bad = bool(missing_ex or missing_dia or bare or _bad or mislaid or emph or kf_examples)
print("\n%s" % ("FAILURES ABOVE" if bad else "no convention violations found"))
sys.exit(1 if bad else 0)
