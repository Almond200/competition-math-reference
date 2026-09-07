# Competition Math Reference

A searchable reference for MATHCOUNTS, AMC 10/12, AIME and olympiad training. 492 cards
covering formulas, general techniques, and recurring problem formats, plus a database of
~500 past contest problems cross-linked to the cards their solutions run through.

Fully static: no build step, no server, no dependencies to install.

## The two books

The sidebar splits into two groups, and only one is open at a time.

**Formulas** holds the reference proper, in four subjects (Geometry, Algebra, Number
Theory, Counting & Probability), each divided into topical subsections that run from
bedrock (Pythagorean Theorem, stars and bars) to deep cuts (Casey's Theorem, Zsygmondy,
the Brocard angle).

**Additional Tools** holds the two things that are not formulas, each filed by subject:

- **Methods** are general techniques, the moves you make once you are already inside a
  problem: angle chasing, casework, coordinate bashing, generating functions.
- **Patterns** are specific recurring problem formats with an intended solution you are
  expected to know on sight: single-pile take-away games, minimising a sum of absolute
  values, cryptarithms.

The test that separates them: a pattern describes a whole problem you can recognise from
its statement, a method describes a move you make inside one. Method and pattern cards
carry a badge and a **Key forms** block listing the shapes the technique takes; formula
cards carry neither, since their formulas are already enumerated on the card face.

## Search

Hybrid retrieval, rebuilt from scratch and measured rather than tuned by eye.

- **Lexical**: BM25F over eight weighted fields (name, keywords, concepts, latex,
  description, section context, glossary, body), with fields combined as *strongest plus a
  fraction of the rest* rather than summed.
- **Phrase matching**: adjacent word pairs indexed with their own document-frequency
  table, including pairs from a spoken rendering of each formula, so "two pi r" finds
  the circumference.
- **Semantic**: static distilled embeddings (256-dim int8, ~17k words, four vectors per
  card), lazily fetched on first search and degrading silently to lexical-only if absent.
- **Fusion**: reciprocal rank fusion, gated on query length, lexical margin and semantic
  confidence, so short exact queries are left alone and paraphrases get help.
- **Spelling correction** resolves an unknown token to its nearest corpus word.

Press `/` to focus the box, `Esc` to clear.

`tools/search-eval.html` runs 171 labelled queries against the live app and diffs every one
against `tools/eval-baseline.json`. Current: 154/171 top-1, 97.1% top-3, MRR 0.935.
**Wait for the semantic vectors to load before reading results**, or the run under-reports
by about two points.

## Other features

- **Level and importance filters** narrow any section to MATHCOUNTS through Olympiad, or
  to the tiers from `high` down to `lowest`.
- **Problem database** (`Database`) lists past contest problems by year and family, each
  linked to the cards its solution uses, with a one-line strategy note.
- **Study lists** (`Lists`) let you star cards and build filtered sets.
- **Diagrams** are computed from exact geometry rather than sketched, so every point is a
  true intersection, foot or tangency. Configuration-heavy cards also show their figure on
  the card face.
- **Interactive widgets** on selected cards: drag the vertices and watch the invariant hold.
- **Advanced search** builds a query from tag chips across the whole library.
- Light and dark themes; KaTeX throughout; `copy tex` and `copy asy` on every card.

## Running

```sh
python3 -m http.server 8688
```

then open `http://localhost:8688`. Opening `index.html` directly also works, except that
the semantic search index cannot be fetched from a `file://` page, so search falls back to
lexical-only. KaTeX loads from a CDN, so math rendering needs a connection.

## Structure

```
index.html                     page shell and script order
css/styles.css                 theme, layout, card and diagram styling
js/app.js                      routing, rendering, and the search engine
js/data/geometry.js            formula cards, one file per subject
js/data/algebra.js
js/data/number-theory.js
js/data/counting.js
js/data/patterns.js            Additional Tools: the Methods and Patterns sections
js/data/details/*.js           long write-ups, keyed by card id
js/data/examples-supplement.js worked examples, keyed by card id
js/data/diagrams/*.js          computed SVG figures, keyed by card id
js/data/problems/*.js          contest problem database
js/geo-interactive.js          draggable geometry widgets
js/search-semantic.js          semantic channel (loads js/data/search-vectors.*)
tools/build-search-index.py    offline: rebuilds the embeddings and glossary
tools/search-eval.html         search relevance harness
tools/validate-problem-db.js   checks every problem's card and topic ids resolve
```

A card's write-up, examples and diagram are all keyed by its id in flat maps, so **moving a
card between files only moves the card object**; nothing else needs to follow it.

## Adding a card

```js
{
  id: "unique-kebab-case-id",
  name: "Display Name",
  type: "method",                            // omit for a formula; "method" or "pattern"
  subject: "geometry",                       // required on method/pattern cards
  latex: String.raw`a^2 + b^2 = c^2`,        // String.raw: no backslash-escaping needed
  description: String.raw`Prose; inline math with $...$ works.`,
  keywords: ["search", "terms", "here"],
  importance: "high",                        // high | medium | low | lower | lowest
  level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME", "Olympiad"]   // any subset
}
```

Drop it into the appropriate subsection's `formulas` array and reload; nav counts, search
index and filters pick it up automatically. Multi-formula `latex` separated by `\qquad`
(or `,`/`;` plus `\quad`) is stacked onto separate lines automatically, and
`\begin{cases}` / `\begin{gathered}` work for explicit layout.

The `subject` field matters: topic chips and the symbol-to-concept rules are gated on it,
so a method filed under Additional Tools still resolves against its home subject.

Longer content goes in the id-keyed side files: `## Why it works`, `## How to use it` and
`## On contests` in `js/data/details/`, a `{ q, s }` pair in `examples-supplement.js`. On a
method or pattern card a leading `## Key forms` block is pulled out and rendered under the
description; each bullet may carry an explanation after a ` — `, shown as gray subtext.

## Conventions

- Never add new `##` subsections to a write-up. Fold content into the existing ones.
- No bold inside body paragraphs.
- Key forms lists the shapes a technique takes, not examples of it.
- Commas rather than em dashes in prose. The ` — ` inside a Key forms bullet is a
  structural separator, not punctuation.
