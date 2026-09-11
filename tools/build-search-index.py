#!/usr/bin/env python3
"""Build the static semantic-search index for the competition-math reference.

Emits two files consumed by js/search-semantic.js:

  js/data/search-vectors.bin    int8 vectors, word table then card table
  js/data/search-vectors.json   header: vocab, dims, scales, SIF principal component

Why static vectors at all: the search needs to bridge "connecting the midpoints"
to a card that says "joining the side midpoints". No lexical ranker can do that.
A sentence transformer could, but shipping one to the browser costs 20-30 MB and a
cold start. Distilling it down to a word -> vector lookup keeps the semantics and
makes the runtime a table lookup plus a mean, with no model at all.

Both the cards and the query MUST be embedded by the same table, or the cosine is
meaningless -- which is why the query encoder is this same lookup rather than a
real model.

Usage (needs the build venv, which lives OUTSIDE the served directory so the
static site stays small):

    ~/Downloads/competition-math-buildenv/bin/python tools/build-search-index.py

    # to recreate that venv from scratch:
    python3 -m venv ~/Downloads/competition-math-buildenv
    ~/Downloads/competition-math-buildenv/bin/pip install "model2vec[distill]"

Options: [--dims 256] [--backend auto|model2vec|glove] [--extra-vocab N]

Do NOT install model2vec into the system Python: it requires newer tokenizers and
huggingface-hub than the transformers already installed there, and pulling them in
breaks that install.

Re-run after adding or substantially editing cards. Cards with no vector simply
fall back to lexical-only ranking, so a stale index degrades softly.
"""

import argparse
import glob
import io
import json
import os
import re
import struct
import sys
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL = "BAAI/bge-base-en-v1.5"

# ---------------------------------------------------------------- card parsing

# Entry bodies end either at `,\n (another entry follows) or at `\n}) / `\n\n})
# (last entry of an Object.assign block). Missing the second case silently glues
# the next block's first entry onto the previous card.
_BODY_END = ("`,\n", "`\n\n})", "`\n})")


def _entry_bodies(src):
    out = {}
    for m in re.finditer(r'\n"([^"]+)": String\.raw`', src):
        st = m.end()
        rest = src[st:]
        ends = [rest.find(t) for t in _BODY_END]
        ends = [e for e in ends if e >= 0]
        out[m.group(1)] = rest[: min(ends)] if ends else rest
    return out


def load_cards():
    """-> {id: {name, keywords, description, body, section}}"""
    cards = {}
    for path in sorted(glob.glob(os.path.join(ROOT, "js/data/*.js"))):
        section = os.path.basename(path)[:-3]
        src = io.open(path, encoding="utf-8").read()
        idx = [(m.start(), m.group(1)) for m in re.finditer(r'\n\s+id: "([^"]+)",', src)]
        for i, (st, cid) in enumerate(idx):
            en = idx[i + 1][0] if i + 1 < len(idx) else len(src)
            blob = src[st:en]
            # A card whose title contains maths writes it as String.raw`...` rather than a
            # quoted string. Matching only the quoted form dropped those cards from the whole
            # pipeline: no semantic vector, and -- since build-cross-links reuses this loader --
            # no alias either, so nothing could ever link to them.
            name = re.search(r'name: "([^"]+)"', blob) or re.search(r"name: String\.raw`([^`]*)`", blob)
            if not name:
                continue                      # section shells carry no name
            kw = re.search(r"keywords: \[([^\]]*)\]", blob)
            desc = re.search(r"description: String\.raw`([\s\S]*?)`", blob)
            cards[cid] = {
                "name": name.group(1),
                "keywords": " ".join(re.findall(r'"([^"]+)"', kw.group(1))) if kw else "",
                "description": desc.group(1) if desc else "",
                "body": "",
                "section": section,
            }
    for path in sorted(glob.glob(os.path.join(ROOT, "js/data/details/*.js"))):
        for cid, body in _entry_bodies(io.open(path, encoding="utf-8").read()).items():
            if cid in cards:
                cards[cid]["body"] = body
    return cards


# Mirrors js/app.js normWord closely enough for the vocabularies to line up.
_DEDOUBLE = re.compile(r"([bdfglmnprt])\1$")


def norm_word(w):
    w = re.sub(r"[^a-z0-9]", "", w.lower())
    if len(w) > 3 and re.search(r"(?:ss|x|z|ch|sh)es$", w):
        w = w[:-2]
    elif len(w) > 3 and w.endswith("s") and not w.endswith("ss"):
        w = w[:-1]
    elif len(w) > 5 and w.endswith("ing"):
        w = _DEDOUBLE.sub(r"\1", w[:-3])
    elif len(w) > 4 and w.endswith("ed"):
        w = _DEDOUBLE.sub(r"\1", w[:-2])
    return w


# Domain glossary, applied ONLY when building the semantic vectors.
#
# The embedding model knows general English, not competition-math vocabulary:
# measured on the built table, connect/join = 0.47 but midpoint/medial = 0.10.
# Cards compound the problem by using a term without ever defining it — Stewart's
# Theorem says "for a cevian of length d" and never says what a cevian is, so a
# reader asking for "the length of a segment from a vertex to the opposite side"
# has no route to it at all.
#
# Expanding a term into its definition when embedding fixes that for every card
# using the term at once. This is NOT keyword stuffing: it never touches the
# lexical index, so it cannot shift the ranking of a card that already matches by
# word, and one entry here serves every card mentioning the term.
DEFINITIONS = {
    # --- plain-language bridges, added after probing how readers actually phrase things ---
    "heron": "area of a triangle worked out from its three side lengths alone",
    "complementary": "counting the opposite instead, the total minus the ones you do not want",
    "conditional": "chance of one event given another already happened, both events happening",
    "stirling": "number of ways to split objects into groups teams or blocks",
    "gcd": "greatest common divisor, the biggest number dividing both",
    "lcm": "least common multiple, the smallest number that both divide into",
    "sum": "the total you get when you add things up",
    "mean": "the average of the numbers",
    "quadratic": "involving a square, of degree two",
    "cosines": "relates the third side to two sides and the angle between them",
    "sines": "relates each side to the sine of the angle opposite it",
    "ptolemy": "relates the diagonals of a quadrilateral inscribed in a circle to its sides",
    "stewart": "length of a cevian, a segment from a corner to a point on the far side",
    "vieta": "sum and product of the roots read off the coefficients",
    "telescope": "sum where consecutive terms cancel leaving only the ends",
    "surjection": "function hitting every possible output, onto",
    "injection": "function sending different inputs to different outputs, one to one",
    # --- triangle parts and centres ---
    "cevian": "segment from a vertex to a point on the opposite side of a triangle",
    "median": "cevian from a vertex to the midpoint of the opposite side",
    "altitude": "perpendicular segment from a vertex straight down to the opposite side, "
                "its height, and its foot or base is where it meets that side",
    "foot": "point where a perpendicular meets the line, the base or bottom end of an altitude",
    "orthic": "triangle made by joining connecting the feet, the bases, of the three altitudes",
    "pedal": "triangle made by joining the feet, the bases, of the perpendiculars dropped from a point",
    "medial": "triangle made by joining connecting the midpoints of the three sides",
    "contact": "triangle made by the points where the inscribed circle touches is tangent to the three sides",
    "intouch": "triangle made by the points where the inscribed circle touches is tangent to the three sides",
    "excentral": "triangle made by the three excentres, the centres of the escribed circles",
    "symmedian": "reflection of a median across the angle bisector from the same vertex",
    "apothem": "distance from the centre out to the middle of a side",
    "hypotenuse": "longest side of a right triangle, the side opposite the right angle",
    "midsegment": "segment joining connecting the midpoints of two sides, a midline",
    "bisector": "line or ray splitting something into two equal halves",
    "vertex": "corner point where two sides meet",
    "diagonal": "segment joining two corners that are not next to each other",
    "perimeter": "total distance all the way around the outside",
    "semiperimeter": "half of the distance around the outside",
    # --- centres ---
    "circumcenter": "point where the perpendicular bisectors meet, centre of the circle through all vertices",
    "incenter": "point where the angle bisectors meet, centre of the inscribed circle",
    "orthocenter": "point where the three altitudes meet or cross",
    "centroid": "point where the medians meet, the centre of mass or balance point",
    "excenter": "centre of a circle touching tangent to one side and the extensions of the other two",
    "circumradius": "radius of the circle passing through all three vertices corners",
    "inradius": "radius of the inscribed circle touching and tangent to every side",
    "exradius": "radius of a circle touching tangent to one side and the extensions of the others",
    "circumcircle": "circle passing through all the vertices corners, drawn around the outside",
    "incircle": "circle inside touching and tangent to every side",
    # --- circles ---
    "chord": "segment joining two points on a circle",
    "secant": "line cutting through a circle at two points",
    "tangent": "line just touching a curve at exactly one point without crossing it",
    "arc": "curved part of the edge of a circle",
    "sector": "pie slice wedge of a circle between two radii",
    "annulus": "ring shaped region between two circles with the same centre",
    "sagitta": "height of an arc above its chord",
    "concyclic": "lying together on one common circle, four points all on the same circle",
    "cyclic": "lying on one circle, inscribed in a circle, concyclic",
    "inscribed": "drawn inside just touching and tangent to the boundary, and an angle at the edge of a circle is half the angle at the centre",
    "circumscribed": "drawn around the outside enclosing and touching",
    # --- quadrilaterals and polygons ---
    "trapezoid": "quadrilateral with one pair of parallel sides",
    "parallelogram": "quadrilateral whose opposite sides are both parallel",
    "rhombus": "parallelogram with all four sides the same length",
    "kite": "quadrilateral with two pairs of equal sides next to each other",
    "quadrilateral": "four sided shape",
    "polygon": "many sided closed shape or figure",
    "regular": "having all sides equal and all angles equal",
    "convex": "bulging outward with no dent, no reflex angle",
    "similar": "same shape, corresponding angles equal and sides in the same proportion, two triangles that are similar",
    "congruent": "identical, the same size and shape, or leaving the same remainder",
    "collinear": "lying together on one straight line, three points all on the same line",
    "concurrent": "all passing through one single common point, three lines meeting at a point",
    # --- solids ---
    "frustum": "solid left when the top of a cone or pyramid is cut off",
    "lateral": "the side surface, not counting the top or bottom faces",
    "polyhedron": "solid with flat faces",
    "tetrahedron": "solid with four triangular faces, a triangular pyramid",
    "dihedral": "angle between two flat faces meeting at an edge",
    # --- transformations ---
    "homothety": "scaling everything by the same factor about a fixed centre, a dilation",
    "inversion": "map sending a point to another along the same ray so the distances multiply to a fixed value",
    "locus": "set of all the points satisfying some condition, the path traced",
    # --- number theory ---
    "totient": "count of the numbers below n that share no common factor with it, Euler phi",
    "divisor": "number that divides another exactly leaving no remainder, a factor",
    "coprime": "sharing no common factor other than one, relatively prime",
    "squarefree": "having no repeated prime factor, not divisible by any perfect square",
    "modulo": "the remainder left after dividing",
    "residue": "the remainder left over after dividing, and a number that is a square modulo a prime is a quadratic residue",
    "valuation": "how many times a prime divides into a number",
    "primitive": "a number whose powers run through every possible nonzero remainder",
    "lattice": "grid of points whose coordinates are whole numbers",
    "diophantine": "equation that must be solved in whole numbers",
    "pythagorean": "three whole numbers that fit as the sides of a right triangle",
    "palindrome": "reads the same forwards and backwards",
    "repunit": "number written as a string of ones",
    # --- combinatorics ---
    "derangement": "arrangement leaving nothing at all in its original place, nobody in their own seat spot or position, no fixed point",
    "permutation": "arrangement in which the order matters",
    "combination": "selection in which the order does not matter",
    "partition": "way of writing a number as a sum where the order does not matter, or splitting a set into groups teams or blocks",
    "composition": "way of writing a number as a sum where the order does matter",
    "antichain": "collection of items none of which contains or precedes another",
    "matching": "set of edges sharing no endpoints, a pairing",
    "clique": "group of vertices every one of which is joined to all the others",
    "spanning": "reaching every vertex of the graph",
    "eulerian": "route using every edge exactly once",
    "hamiltonian": "route visiting every vertex exactly once",
    "bipartite": "vertices split into two groups with edges only running between them",
    "planar": "able to be drawn flat with no edges crossing",
    "degree": "number of edges meeting at a vertex",
    "bijection": "exact one to one pairing between two sets",
    "pigeonhole": "with more items than boxes some box must hold two",
    "indicator": "variable equal to one when something happens and zero otherwise",
    "recurrence": "rule where each term depends on and is built from the previous earlier terms",
    "telescoping": "sum whose middle terms cancel leaving only the two ends",
    # --- algebra ---
    "monic": "polynomial whose leading coefficient is one",
    "discriminant": "expression deciding how many real roots a quadratic has",
    "conjugate": "the same expression with the sign of its radical or imaginary part flipped",
    "symmetric": "unchanged when the variables are swapped around",
    "coefficient": "the number multiplying a term",
    "asymptote": "line that a curve approaches but never quite touches",
    "arithmetic": "sequence going up by a constant difference each step",
    "geometric": "sequence multiplied by a constant ratio each step",
    "modulus": "distance from the origin, the absolute value or size of a complex number",
    "logarithm": "the exponent a base must be raised to",
    "factorial": "product of all the whole numbers up to n",
    "binomial": "expression with two terms, or the count of ways to choose",
}


def gloss_tokens(tokens):
    """Definition words for any glossary term present, with no original text."""
    extra, seen = [], set()
    for t in tokens:
        d = DEFINITIONS.get(t)
        if d and t not in seen:
            seen.add(t)
            extra.extend(w for w in re.split(r"[^a-z]+", d) if len(w) > 1)
    return extra


def expand(tokens):
    """Append the definition of any glossary term present. Semantic text only."""
    return tokens + gloss_tokens(tokens)


def words(text):
    """Drop $...$ math: the vectors model English, and LaTeX tokens would be noise."""
    text = re.sub(r"\$[^$]*\$", " ", text)
    text = re.sub(r"^##\s*", " ", text, flags=re.M)
    out = []
    for raw in re.split(r"[^A-Za-z]+", text):
        if len(raw) < 2:
            continue
        w = norm_word(raw)
        if len(w) > 1:
            out.append(w)
    return out


# --------------------------------------------------------------- word vectors


def vectors_model2vec(vocab, dims):
    """Distil a sentence transformer into a static table over exactly our vocab."""
    import numpy as np
    from model2vec.distill import distill

    print("  distilling %s (first run downloads the model)..." % MODEL)
    model = distill(model_name=MODEL, vocabulary=sorted(vocab), pca_dims=dims)

    # Read the vectors back through encode() rather than off the model's internals.
    # It is the supported API, it is stable across model2vec versions, and for a
    # word outside the distilled vocabulary it still composes a vector from the
    # word's subword pieces — which is what covers domain terms like
    # "circumradius" or "excircle" that no general model has seen as one token.
    keys = sorted(vocab)
    print("  encoding %d words..." % len(keys))
    M = np.asarray(model.encode(keys, show_progress_bar=False), dtype="float32")
    table = {}
    for i, w in enumerate(keys):
        v = M[i]
        if np.isfinite(v).all() and np.linalg.norm(v) > 0:
            table[w] = v
    return table


def vectors_glove(vocab, dims):
    """Fallback with no torch: pretrained GloVe restricted to our vocabulary."""
    import gensim.downloader as api
    import numpy as np

    name = "glove-wiki-gigaword-200"
    print("  loading %s (large one-time download)..." % name)
    kv = api.load(name)
    table = {}
    for w in vocab:
        if w in kv:
            table[w] = np.asarray(kv[w], dtype="float32")
    if dims < 200 and table:
        from sklearn.decomposition import PCA

        keys = list(table)
        M = np.stack([table[k] for k in keys])
        M = PCA(n_components=dims, random_state=0).fit_transform(M)
        table = {k: M[i] for i, k in enumerate(keys)}
    return table


# ------------------------------------------------------------------- SIF mean


def sif_vector(tokens, table, weight, dims, np):
    """Smooth-inverse-frequency weighted mean: common words contribute less."""
    acc = np.zeros(dims, dtype="float32")
    n = 0
    for t in tokens:
        v = table.get(t)
        if v is None:
            continue
        acc += weight.get(t, 1.0) * v
        n += 1
    if n:
        acc /= n
    return acc


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dims", type=int, default=256)
    ap.add_argument("--backend", default="auto", choices=["auto", "model2vec", "glove"])
    ap.add_argument("--extra-vocab", type=int, default=100000,
                    help="cap on common English words pulled from the model tokenizer; "
                         "0 disables and uses corpus vocabulary only")
    args = ap.parse_args()

    import numpy as np

    print("reading cards...")
    cards = load_cards()
    print("  %d cards" % len(cards))

    # Three texts per card. Kept separate because a card is heterogeneous: its
    # name is a label, its body is an essay. One averaged vector over all of it
    # washes out the name; three vectors with max-cosine at query time does not.
    parts = {}
    corpus_counts = Counter()
    for cid, c in cards.items():
        t_raw = words(c["name"] + " " + c["keywords"])
        d_raw = words(c["description"])
        b_raw = words(c["body"])
        title = expand(t_raw)
        desc = expand(d_raw)
        body = expand(b_raw)
        # A fourth vector holding ONLY the definitions of the jargon this card
        # uses. Folding them into the body instead leaves them drowned: Stewart's
        # Theorem runs to ~200 tokens, so ten words defining "cevian" barely move
        # its mean, and SIF then discounts those very words for being common. On
        # its own the definition is undiluted, so a query phrased AS the definition
        # ("length of a segment from a vertex to the opposite side") has something
        # to match. Empty for cards using no glossary term, which scores 0 and is
        # simply ignored.
        gloss = gloss_tokens(t_raw + d_raw)
        parts[cid] = (title, desc, body, gloss)
        corpus_counts.update(title + desc + body)

    vocab = set(corpus_counts)
    print("  %d distinct corpus words" % len(vocab))

    # Add common English so a paraphrase resolves even when no card uses the word
    # ("connecting", "yields", "roughly"). The embedding model's own tokenizer
    # vocabulary is exactly the list wanted here: WordPiece vocabularies are built
    # by corpus frequency, so its whole-word entries ARE the common words, already
    # ranked and already spelled the way the model expects.
    if args.extra_vocab:
        try:
            from transformers import AutoTokenizer

            tok = AutoTokenizer.from_pretrained(MODEL)
            common = []
            for t in tok.get_vocab():
                if t.startswith("##") or not t.isalpha() or len(t) < 3:
                    continue
                common.append(t.lower())
            common.sort()
            before = len(vocab)
            for w in common[: args.extra_vocab] if args.extra_vocab < len(common) else common:
                n = norm_word(w)
                if len(n) > 1:
                    vocab.add(n)
            print("  +%d common English words from the model vocabulary -> %d total"
                  % (len(vocab) - before, len(vocab)))
        except Exception as e:
            print("  (could not read tokenizer vocabulary: %s; corpus words only)" % e)

    backend = args.backend
    if backend == "auto":
        try:
            import torch  # noqa: F401
            import model2vec  # noqa: F401
            backend = "model2vec"
        except ImportError:
            backend = "glove"
    print("building word vectors via %s..." % backend)
    table = (vectors_model2vec if backend == "model2vec" else vectors_glove)(vocab, args.dims)
    table = {w: v for w, v in table.items() if w in vocab}
    if not table:
        sys.exit("no vectors produced -- check the backend install")
    dims = len(next(iter(table.values())))
    print("  %d words x %d dims" % (len(table), dims))

    # SIF weights: a / (a + p(w)). Frequent words are nearly free.
    total = sum(corpus_counts.values()) or 1
    a = 1e-3
    weight = {w: a / (a + corpus_counts.get(w, 0) / total) for w in table}

    print("embedding cards...")
    ids = sorted(cards)
    rows = []
    for cid in ids:
        for toks in parts[cid]:
            rows.append(sif_vector(toks, table, weight, dims, np))
    M = np.stack(rows) if rows else np.zeros((0, dims), "float32")

    # Remove the top principal component. Standard SIF post-processing: the first
    # component is dominated by syntax common to every sentence, and subtracting
    # it is a large, cheap quality win. The runtime must apply the same removal to
    # the query, so the component ships in the header.
    pc = np.zeros(dims, dtype="float32")
    nz = M[np.linalg.norm(M, axis=1) > 0]
    if len(nz) > 2:
        from sklearn.decomposition import TruncatedSVD

        svd = TruncatedSVD(n_components=1, random_state=0).fit(nz)
        pc = svd.components_[0].astype("float32")
        M -= np.outer(M @ pc, pc)

    def unit(x):
        n = np.linalg.norm(x, axis=-1, keepdims=True)
        return x / np.where(n == 0, 1, n)

    M = unit(M)
    W = unit(np.stack([table[w] for w in sorted(table)]))
    words_sorted = sorted(table)

    # int8 with one scale per row: vectors are unit-norm so components sit in
    # [-1, 1] and a per-row scale keeps the quantization error negligible.
    def quantize(A):
        if len(A) == 0:
            return b"", []
        scales = np.max(np.abs(A), axis=1)
        scales[scales == 0] = 1
        Q = np.clip(np.round(A / scales[:, None] * 127), -127, 127).astype("int8")
        return Q.tobytes(), [float(s) for s in scales]

    wbytes, wscales = quantize(W)
    cbytes, cscales = quantize(M)

    os.makedirs(os.path.join(ROOT, "js/data"), exist_ok=True)
    binp = os.path.join(ROOT, "js/data/search-vectors.bin")
    with open(binp, "wb") as f:
        f.write(wbytes)
        f.write(cbytes)

    header = {
        "dims": dims,
        "backend": backend,
        "words": words_sorted,
        "wordScales": [round(s, 4) for s in wscales],
        "ids": ids,
        "cardScales": [round(s, 4) for s in cscales],
        "vectorsPerCard": 4,
        "pc": [round(float(x), 5) for x in pc],
        "sifA": a,
        # Only the corpus words have a frequency; the ~14k common-English words
        # pulled from the tokenizer appear on no card, and the runtime already
        # defaults a missing entry to 0. Emitting those zeros tripled this file.
        "wordFreq": {w: corpus_counts[w] for w in words_sorted if corpus_counts.get(w)},
        "totalTokens": total,
    }
    jsonp = os.path.join(ROOT, "js/data/search-vectors.json")
    io.open(jsonp, "w", encoding="utf-8").write(json.dumps(header, separators=(",", ":")))

    # Also emit the glossary for the LEXICAL index. It is tiny and loads eagerly,
    # unlike the vectors. Without this the glossary helps only the semantic side,
    # so a query saying "bases of altitudes" has no lexical route to a card that
    # says "feet of altitudes", and the semantic channel alone cannot lift a card
    # the lexical one never scored at all.
    glossp = os.path.join(ROOT, "js/data/search-glossary.js")
    io.open(glossp, "w", encoding="utf-8").write(
        "// GENERATED by tools/build-search-index.py -- do not edit by hand.\n"
        "// Domain terms mapped to plain-English definitions. js/app.js indexes these\n"
        "// as a low-weight field so a reader's wording can reach a card that uses the\n"
        "// technical term, without any per-card tagging.\n"
        "window.MATH_GLOSSARY = " + json.dumps(DEFINITIONS, separators=(",", ":")) + ";\n")
    print("wrote %s (%.1f KB)" % (glossp, os.path.getsize(glossp) / 1e3))
    print("wrote %s (%.2f MB)" % (binp, os.path.getsize(binp) / 1e6))
    print("wrote %s (%.2f MB)" % (jsonp, os.path.getsize(jsonp) / 1e6))
    print("  %d word vectors, %d card vectors (%d cards x 3)" % (len(W), len(M), len(ids)))


if __name__ == "__main__":
    main()
