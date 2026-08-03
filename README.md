# Competition Math Reference

A complete, searchable curation of the mathematical formulas and theorems needed for
MATHCOUNTS, AMC 10, AMC 12, AIME, and beyond.

## Features

- **Four sections**: Geometry, Algebra, Number Theory, Counting & Probability — each
  organized into topical subsections, from bedrock basics (Pythagorean Theorem,
  stars and bars) to legendary deep cuts (Casey's Theorem, Zsygmondy, the Brocard angle).
- **Keyword search**: type natural keywords ("cyclic", "expected value", "mod",
  "tangent circles") and results rank by relevance across names, keywords, and descriptions.
  Press `/` to jump to the search box, `Esc` to clear.
- **Level filters**: narrow everything to MATHCOUNTS, AMC 10, AMC 12, AIME, or Olympiad.
- **Beautiful math**: every formula rendered with KaTeX; hover a card to copy its LaTeX.

## Running

It's a fully static site — no build step, no server required:

```sh
open index.html
```

or serve it locally:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

(KaTeX is loaded from a CDN, so an internet connection is needed for math rendering.)

## Structure

```
index.html            page shell
css/styles.css        theme & layout
js/app.js             navigation, rendering, search engine
js/data/geometry.js   formula data, one file per section
js/data/algebra.js
js/data/number-theory.js
js/data/counting.js
```

## Adding formulas

Each formula is a plain object in one of the `js/data/*.js` files:

```js
{
  id: "unique-kebab-case-id",
  name: "Display Name",
  latex: String.raw`a^2 + b^2 = c^2`,        // String.raw: no backslash-escaping needed
  description: String.raw`Prose; inline math with $...$ works.`,
  keywords: ["search", "terms", "here"],
  level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME", "Olympiad"],  // any subset
  example: String.raw`Optional worked example, shown behind a "Show example" toggle.`,
  diagram: `<svg viewBox="...">Optional inline SVG, shown in the same panel.</svg>`
}
```

Multi-formula `latex` strings separated by `\qquad` (or `,`/`;` + `\quad`) are automatically
stacked onto separate lines; `\begin{cases}`/`\begin{gathered}` environments also work for
explicit multi-line layout (see the CRT entry).

Drop it into the appropriate subsection's `formulas` array and reload — the nav counts,
search index, and level filters pick it up automatically.
