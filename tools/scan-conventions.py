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
# A card with no write-up used only to lower the count above, and the run still passed. Two went
# missing that way on 2026-09-27: a merge script deleted a write-up with a regex ending in "`,\n",
# and the write-up it targeted was the LAST entry of its Object.assign block, which has no comma.
# The lazy match ran on through "});" into the next block and took the following card's write-up
# with it; the file still parsed, so nothing else noticed.
missing_wu = [c["id"] for c in CARDS if c["id"] not in DETAILS]
print("  cards with no write-up: %d  (must stay 0)" % len(missing_wu))
for _i in missing_wu:
    print("    " + _i)
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
# A raw "<" followed by a letter inside $...$ is swallowed by the HTML parser before KaTeX
# ever sees it, because every one of these strings reaches the page through innerHTML. This
# shipped once as "$\\sum_{i<j} ...$": everything from "<j" to the next ">" was eaten, the
# bullet lost its formula AND the next bullet was mangled. Write "\\lt" instead. Descriptions,
# latex, write-ups and examples all travel the same path, so every String.raw literal in the
# data files is checked rather than write-ups alone.
# Split on $...$ and look only at the math spans. Matching "$ ... < ... $" across the text
# BETWEEN two formulas gives nothing but false hits on the intentional <br> in examples.
_MATHSPAN = re.compile(r"\$[^$]*\$")
_INNERLT = re.compile(r"<[A-Za-z/]")
class _RawLt:
    @staticmethod
    def search(txt):
        for _s in _MATHSPAN.findall(txt):
            m = _INNERLT.search(_s)
            if m: return _s
        return None
_RAWLT = _RawLt
_KEY = re.compile(r'(?:id: "([a-z0-9-]+)"|^"([a-z0-9-]+)":|MATH_EXAMPLES\["([a-z0-9-]+)"\])', re.M)
_lt = []
for _f in (sorted(glob.glob("js/data/*.js")) + sorted(glob.glob("js/data/details/*.js"))):
    _txt = io.open(_f, encoding="utf-8").read()
    _keys = [(m.start(), m.group(1) or m.group(2) or m.group(3)) for m in _KEY.finditer(_txt)]
    for _m in re.finditer(r"String\.raw`([^`]*)`", _txt):
        if not _RAWLT.search(_m.group(1)):
            continue
        _owner = "?"
        for _pos, _k in _keys:
            if _pos < _m.start(): _owner = _k
            else: break
        _lt.append((os.path.basename(_f), _owner))
print("  raw '<' inside maths: %d  (must stay 0)" % len(_lt))
for _w, _k in _lt[:8]:
    print("    %s: %s" % (_w, _k))

# Every way a [[link]] can be written and silently not become a link. Both of these have
# actually shipped: math in a label (linkifyCards splits the prose on $...$ first, so the
# pattern never matches) and a link in a "## heading" line (headings are interpolated raw).
# Neither trips the validator or renders .card-link-broken, because no link is ever attempted.
# A link in a card `description` used to be a third; since 2026-09-27 the card page linkifies
# its description (a card is linked at its first mention on the page, often the intro), and
# everywhere else shows the plain text.
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
for c in CARDS:
    for _m in LINK_RE.finditer(c["desc"] or ""):
        if _m.group(2) and "$" in _m.group(2):
            mislaid.append((c["id"], "math in a description link label", _m.group(0)))
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

print("\n-- figures in write-ups and examples --")
# The registries are built by JS, so ask JS for their keys rather than regexing object literals.
import subprocess as _sp, tempfile as _tf, json as _js
_jsc = "/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc"
_src = ("var window = {};\n" +
        "".join("load(%r);\n" % f for f in ["js/data/diagrams/geometry-diagrams.js",
                                           "js/data/diagrams/general-diagrams.js"]) +
        "var B = window.MATH_BODY_DIAGRAMS || {}, X = window.MATH_EXAMPLE_DIAGRAMS || {}, o = {b: {}, x: {}};\n"
        "Object.keys(B).forEach(function (k) { o.b[k] = Object.keys(B[k]); });\n"
        "Object.keys(X).forEach(function (k) { o.x[k] = Object.keys(X[k]); });\n"
        "print(JSON.stringify(o));\n")
with _tf.NamedTemporaryFile("w", suffix=".js", delete=False) as _fh:
    _fh.write(_src)
_res = _sp.run([_jsc, _fh.name], capture_output=True, text=True)
os.unlink(_fh.name)
_reg = _js.loads(_res.stdout.strip().splitlines()[-1]) if _res.returncode == 0 else {"b": {}, "x": {}}
if _res.returncode != 0:
    print("  DIAGRAM FILES FAILED TO EVALUATE: %s" % _res.stderr.strip()[:200])
fig_bad = []
_used = set()
for _k, _v in DETAILS.items():
    for _blk in re.split(r"\n\s*\n", _v):
        for _m in re.finditer(r"\{\{figure:([\w-]+)\}\}", _blk):
            _used.add((_k, _m.group(1)))
            _rest = [l.strip() for l in _blk.split("\n") if l.strip() and not l.strip().startswith("## ")]
            if _rest != [_m.group(0)]:
                fig_bad.append("%s: {{figure:%s}} must be a paragraph of its own -- inside prose it prints raw"
                               % (_k, _m.group(1)))
            if _m.group(1) not in _reg["b"].get(_k, []):
                fig_bad.append("%s: {{figure:%s}} names no figure in MATH_BODY_DIAGRAMS[%r]"
                               % (_k, _m.group(1), _k))
for _k, _names in _reg["b"].items():
    for _n in _names:
        if (_k, _n) not in _used:
            fig_bad.append("%s: figure %r is registered but no write-up places it" % (_k, _n))
_exkeys = set(re.findall(r'^"([a-z0-9-]+)":', ex, re.M)) | set(re.findall(r'MATH_EXAMPLES\["([a-z0-9-]+)"\]', ex))
for _k, _parts in _reg["x"].items():
    if _k not in _exkeys:
        fig_bad.append("%s: has an example figure but no example" % _k)
    if "s" in _parts and "q" not in _parts:
        fig_bad.append("%s: example figure has a solution panel but no setup panel" % _k)
for _f in glob.glob("js/data/*.js"):
    if "{{figure:" in io.open(_f, encoding="utf-8").read():
        fig_bad.append("%s: a {{figure:...}} marker outside a write-up is never rendered" % _f)
print("  in-text figures: %d placed on %d cards | example figures: %d"
      % (len(_used), len({k for k, _ in _used}), len(_reg["x"])))
print("  figure problems: %d  (must stay 0)" % len(fig_bad))
for _x in fig_bad[:10]:
    print("    " + _x)

# Headings: the three required ones, Key forms, and Full proof (collapsible, rendered behind a
# "Show full proof" button). Anything else renders as a stray <h4> nobody designed for.
_ALLOWED = {"Why it works", "How to use it", "On contests", "Key forms", "Full proof"}
_odd_heads = sorted(set(heads) - _ALLOWED)
if _odd_heads:
    print("  UNKNOWN HEADINGS: %s" % ", ".join(_odd_heads))

# Progress of the intro-and-explanation rewrite, which runs over many sessions.
try:
    _rr = _js.load(io.open("tools/rewrite-register.json", encoding="utf-8"))
    _done = [e["id"] for e in _rr.get("done", [])]
    _unknown = [i for i in _done if i not in {c["id"] for c in CARDS}]
    print("  rewritten intros and explanations: %d/%d%s"
          % (len(set(_done)), len(CARDS), ("  (unknown ids: %s)" % ", ".join(_unknown)) if _unknown else ""))
except FileNotFoundError:
    _unknown = []
    _done = []

# Digestible paragraphs, measured on rewritten cards only: one idea per paragraph, and a long
# derivation goes on its own line as display math rather than through a sentence. Source length
# with display math and link targets removed; lists, figures and Key forms are exempt.
_PARA_LIMIT = 500
_long_paras = []
for _id in set(_done):
    _sec = ""
    for _blk in re.split(r"\n\s*\n", DETAILS.get(_id, "").strip()):
        _m = re.match(r"## (.+)\n?", _blk)
        if _m:
            _sec, _blk = _m.group(1).strip(), _blk[_m.end():]
        if not _blk.strip() or _sec == "Key forms" or _blk.lstrip().startswith(("- ", "{{figure")):
            continue
        _plain = re.sub(r"\[\[[\w-]+\|([^\]]*)\]\]", r"\1", re.sub(r"\$\$.*?\$\$", "", _blk, flags=re.S))
        if len(_plain) > _PARA_LIMIT:
            _long_paras.append((_id, _sec, len(_plain)))
print("  rewritten-card paragraphs over %d characters: %d  (must stay 0)" % (_PARA_LIMIT, len(_long_paras)))
for _id, _sec, _n in sorted(_long_paras)[:8]:
    print("    %s / %s: %d" % (_id, _sec, _n))

# _lt (raw "<" inside maths) was printed as "must stay 0" but never counted towards the exit
# code, so a planted fault showed in the output and the run still passed.
# ---- card text never names a specific problem (Stanley, 2026-09-26) ----
# Problems are listed under each card from problem-db; the card's own prose stays general.
_PROBREF = re.compile(r"(?:19|20)\d\d\s+(?:AIME|AMC|HMMT|USAMO|USAJMO|IMO|ARML|PUMaC|CMIMC|BMT|Putnam|MATHCOUNTS)"
                      r"|(?:AIME|AMC\s*1[02][AB]?|HMMT|USAMO|IMO)\s+(?:19|20)\d\d"
                      r"|(?:AIME|AMC|HMMT|IMO)[^.\n`]{0,14}(?:Problem|#|\bP)\s*\d+")
_probref_hits = []
for _f in sorted(glob.glob(os.path.join(ROOT, "js/data/details/*-details.js"))) + [os.path.join(ROOT, "js/data/examples-supplement.js")] + [os.path.join(ROOT, "js/data", _n + ".js") for _n in ("geometry", "algebra", "number-theory", "counting", "patterns")]:
    _src = open(_f, encoding="utf-8").read()
    _src = re.sub(r"^\s*//.*$", "", _src, flags=re.M)
    for _m in _PROBREF.finditer(_src):
        _probref_hits.append((os.path.basename(_f), _m.group(0)))
print("  card text naming a specific problem: %d  (must stay 0)" % len(_probref_hits))
for _h in _probref_hits[:10]:
    print("    %s: %s" % _h)

# ---- Expanded notation (Stanley, 2026-09-27) ----
# The "Expanded" setting promises terms written out in every formula box and Key-forms list.
# A formula box does that through latexPlain; a Key-forms bullet writes each sum as
# \alt{sigma form}{expanded form}, resolved by notate() in js/app.js. The explanations may
# keep sigma notation. Before this gate, 80 cards and 50 bullets showed a sigma either way.
def _pick_alt(t, pick):
    out, i = [], 0
    while True:
        j = t.find("\\alt{", i)
        if j < 0:
            return "".join(out) + t[i:], True
        out.append(t[i:j])
        k, groups = j + 4, []
        while len(groups) < 2 and k < len(t) and t[k] == "{":
            depth, st = 0, k
            while k < len(t):
                if t[k - 1] != "\\":
                    if t[k] == "{":
                        depth += 1
                    elif t[k] == "}":
                        depth -= 1
                        if depth == 0:
                            break
                k += 1
            groups.append(t[st + 1:k])
            k += 1
        if len(groups) < 2:
            return t, False
        out.append(groups[pick])
        i = k
_SIG = re.compile(r"\\(?:sum|prod)(?![A-Za-z])")   # not \b: "\sum_" has no word boundary
_no_plain = [c["id"] for c in CARDS if _SIG.search(c["latex"] or "") and
             (not field(c["blk"], "latexPlain") or _SIG.search(field(c["blk"], "latexPlain")))]
_kf_sigma, _bad_alt = [], []
for _id, _body in DETAILS.items():
    _exp, _ok = _pick_alt(_body, 1)
    if not _ok:
        _bad_alt.append(_id)
        continue
    _kfm = re.search(r"## Key forms\n(.*?)(?=\n## |\Z)", _exp, re.S)
    if _kfm:
        _kf_sigma += [(_id, l) for l in _kfm.group(1).split("\n") if l.startswith("- ") and _SIG.search(l)]
print("\n-- expanded notation --")
print("  formula boxes with a sigma and no written-out latexPlain: %d  (must stay 0)" % len(_no_plain))
for _i in _no_plain[:10]:
    print("    " + _i)
print("  Key-forms bullets still showing a sigma in Expanded: %d  (must stay 0)" % len(_kf_sigma))
for _i, _l in _kf_sigma[:10]:
    print("    %s: %s" % (_i, _l[:90]))
print("  malformed \\alt{..}{..}: %d  (must stay 0)" % len(_bad_alt))

# ---------------------------------------------------------------------------------------------
# Cross-links on a card's page, read in page order (description, then the write-up), 2026-09-27.
#  1. A card is linked at its FIRST mention on the page, and once. The reader asked for it after
#     "Fermat's Little Theorem" sat unlinked in an intro and linked two paragraphs later.
#  2. A named result keeps its capitals, linked or not: a theorem, lemma or "Law of ...", or a
#     formula, identity, inequality, sums, principle or criterion named after a person, is written
#     as its card titles it. Links used to lowercase them ("Fermat's little theorem").
# Techniques and objects stay lowercase mid-sentence (casework, mass points, the Euler line).
_BYID = {c["id"]: c for c in CARDS}
_PAGE_SEP = "\n\u0001\n"
def _variants(n):
    v = set(); b = re.sub(r"\s*\([^)]*\)\s*$", "", n).strip()
    for x in (n, b):
        v.add(x)
        if x.lower().startswith("the "): v.add(x[4:])
    return {x for x in v if len(x) >= 4}
def _cw(t):
    return {re.sub(r"(’s|'s|')$", "", w.lower()) for w in re.findall(r"[\w’']+", t)} - {"the", "a", "an", "of", "and", "to", "in", "for", "on"}
_STOPW = {"card", "cards", "that", "this", "their", "own", "here", "fact", "above", "below", "previous", "its"}
_PROPER = set()
for c in CARDS:
    _PROPER |= set(re.findall(r"([A-Z][\w\u00c0-\u017f]+)(?:’s|'s|')(?!\w)", c["name"]))
_PROPER |= {"Pythagorean", "Catalan", "Vieta", "Heron", "Brahmagupta", "Hölder", "Muirhead", "Schur", "Jensen", "Burnside",
            "Ptolemy", "Simson", "Euler", "Fermat", "Miquel", "Pascal", "Brianchon", "Nagel", "Gergonne", "Ceva", "Hall", "Bézout"}
# (page card, linked card) pairs where the earlier "mention" is a different sense or a plain word:
# "the altitude" is not the altitude-to-the-hypotenuse result, "Vieta" inside "Vieta jumping", ...
_FM_EXEMPT = {("pythagorean-theorem", "altitude-hypotenuse"), ("regular-polygon-area", "regular-hexagon-area"),
    ("cevian-area-ratio", "area-method"), ("stewarts-theorem", "angle-bisector-theorem"), ("circle-equation", "tangency-condition"),
    ("perpendicular-bisector-locus", "apollonius-circle"), ("vietas-quadratic", "quadratic-formula"),
    ("completing-the-square", "quadratic-formula"), ("quadratic-formula", "tangency-condition"), ("double-angle", "trig-area"),
    ("sum-of-divisors", "number-of-divisors"), ("absolute-value-rules", "abs-value-relations"), ("abs-value-graphing", "abs-value-relations"),
    ("carmichael-numbers", "fermat-numbers"), ("cyclic-equal-angles", "cyclic-opposite-angles"), ("vector-projection", "point-plane-distance"),
    ("solid-tactics", "point-plane-distance"), ("vietas-quadratic", "vietas-general"), ("gaussian-integers", "eisenstein-criterion"),
    ("vieta-jumping", "vietas-general"), ("complete-quadrilateral-miquel", "miquels-theorem"), ("perp-to-angle-bisector", "angle-bisector-theorem"),
    ("shared-angle-area-ratio", "area-method")}
_ALLOW1 = {("conic-sections", "ellipse-properties"), ("conic-sections", "hyperbola-properties"), ("conic-sections", "parabola-focus-directrix"),
           ("radical-axis", "power-of-a-point"), ("medial-triangle", "homothety-monge"), ("mixtilinear-incircle", "homothety-monge"),
           ("linear-change-of-variables", "determinant-geometric"), ("muirheads-inequality", "karamata-inequality"),
           ("vivianis-theorem", "barycentric-coordinates")}
_phr = collections.defaultdict(set)
for c in CARDS:
    _phr[c["id"]] |= _variants(c["name"])
for _k, _v in DETAILS.items():
    for _m in LINK_RE.finditer(_v):
        _t = re.sub(r"^(the|a|an) ", "", _m.group(2) or "", flags=re.I); _tg = _m.group(1)
        if _tg in _BYID and len(_t) >= 4 and (_cw(_t) & _cw(_BYID[_tg]["name"]) or (len(_t.split()) >= 2 and not (_cw(_t) & _STOPW))):
            _phr[_tg].add(_t)
def _okp(p, cid, tgt):
    if len(p.split()) > 1 or re.search(r"[-–]", p) or p.lower() in {"pigeonhole", "symmedian", "symmedians"}: return True
    return re.sub(r"(’s|'s|')$", "", p) in _PROPER or (cid, tgt) in _ALLOW1
def _mask(t, own):
    out = list(t)
    for _m in list(re.finditer(r"\$\$.*?\$\$|\$[^$]*\$", t, re.S)) + list(LINK_RE.finditer(t)) + list(re.finditer(r"^##.*$", t, re.M)):
        out[_m.start():_m.end()] = "\0" * (_m.end() - _m.start())
    for _o in own:
        for _m in re.finditer(r"(?<![\w-])" + re.escape(_o) + r"(?![\w-])", t, re.I):
            out[_m.start():_m.end()] = "\0" * (_m.end() - _m.start())
    return "".join(out)
_late, _twice = [], []
for c in CARDS:
    if c["id"] not in DETAILS: continue
    _page = (c["desc"] or "") + _PAGE_SEP + DETAILS[c["id"]]
    _M = _mask(_page, _variants(c["name"])); _seen = set()
    for _m in LINK_RE.finditer(_page):
        _tg, _lab = _m.group(1), _m.group(2) or ""
        if _tg == c["id"] or _tg not in _BYID: continue
        if _tg in _seen:
            if not re.search(r"\bcard\b", _lab, re.I): _twice.append((c["id"], _tg))
            continue
        _seen.add(_tg)
        if (c["id"], _tg) in _FM_EXEMPT: continue
        for _p in _phr[_tg]:
            if _okp(_p, c["id"], _tg) and re.search(r"(?<![\w-])" + re.escape(_p) + r"(?![\w-])", _M[:_m.start()], re.I):
                _late.append((c["id"], _tg, _p)); break
# named results, from card names (see 2. above)
def _person(n):
    return bool(re.search(r"[A-Z][\w\u00c0-\u017f]+(?:’s|'s|')(?!\w)", n)) or bool(re.search(r"[A-Z]\w+–[A-Z]", n)) or \
        any(p in n for p in ("Cauchy", "Sophie Germain", "Brahmagupta", "Erdős", "Newton", "Pythagorean", "Euler", "Fermat"))
_CANON = {}
for c in CARDS:
    _b = re.sub(r"^The ", "", re.sub(r"\s*\([^)]*\)\s*$", "", c["name"]).strip())
    if re.search(r"\b(Theorem|Theorems|Lemma)\b", _b) or re.match(r"(Extended )?Law of ", _b) or \
       (_person(_b) and re.search(r"\b(Formula|Formulas|Identity|Inequality|Sums|Principle|Criterion)\b", _b)):
        if len(_b.split()) >= 2: _CANON[_b.lower()] = _b
        if _b.startswith("Extended "): _CANON[_b[9:].lower()] = _b[9:]
for _x in ["Law of Sines", "Law of Tangents", "Pascal's Identity", "Monge's Theorem", "Euler's Formula",
           "Sprague–Grundy Theorem", "Chicken McNugget Theorem", "Remainder Theorem", "Factor Theorem"]:
    _CANON[_x.lower()] = _x
for _x in ["am–gm inequality", "committee–chair identity"]:
    _CANON.pop(_x, None)
_cap_re = re.compile(r"(?<![\w'’\-])(" + "|".join(re.escape(k) for k in sorted(_CANON, key=len, reverse=True)) + r")(?![\w\-])", re.I)
_EXTEXT = io.open("js/data/examples-supplement.js", encoding="utf-8").read()
_texts = [("desc " + c["id"], c["desc"] or "") for c in CARDS] + [("write-up " + k, v) for k, v in DETAILS.items()] + \
         [("examples", _m.group(1)) for _m in re.finditer(r"String\.raw`(.*?)`", _EXTEXT, re.S)]
_lowcap = []
for _w, _t in _texts:
    for _i, _part in enumerate(re.split(r"(\$\$.*?\$\$|\$[^$]*\$)", _t, flags=re.S)):
        if _i % 2: continue
        for _m in _cap_re.finditer(_part):
            _want = _CANON[_m.group(1).lower()]
            if _want.split()[0] == "De": _want = _m.group(1).split()[0] + _want[2:]
            if _m.group(1) != _want: _lowcap.append((_w, _m.group(1), _want))
print("\n-- cross-links and names on a card's page --")
print("  a card linked after an earlier plain mention on its page: %d  (must stay 0)" % len(_late))
for _x in _late[:8]:
    print("    %s: [[%s]] is mentioned earlier as %r; link that mention instead" % _x)
print("  a card linked twice on one page: %d  (must stay 0)" % len(_twice))
for _x in _twice[:8]:
    print("    %s: [[%s]] again; keep only the first" % _x)
print("  named results written without their capitals: %d  (must stay 0)" % len(_lowcap))
for _x in _lowcap[:8]:
    print("    %s: %r should read %r" % _x)

bad = bool(missing_wu or _late or _twice or _lowcap or missing_ex or missing_dia or bare or _bad or mislaid or emph or kf_examples
           or _lt or fig_bad or _odd_heads or _unknown or _long_paras or _probref_hits
           or _no_plain or _kf_sigma or _bad_alt)
print("\n%s" % ("FAILURES ABOVE" if bad else "no convention violations found"))
sys.exit(1 if bad else 0)
