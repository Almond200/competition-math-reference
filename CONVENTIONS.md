# CONVENTIONS

Every rule here was measured against all 503 cards, and the count that proves it is quoted. If a
rule has no number, it is not a rule. `CONTRIBUTING.md` holds the reasoning, the gap register and
the per-year retag notes; this file is the checklist you follow while actually adding a card.

Regenerate the numbers with `tools/scan-conventions.py`.

---

## 1. The card

Exactly two field orders exist, and nothing else. Copy one of these.

**Subject file** (`geometry.js`, `algebra.js`, `number-theory.js`, `counting.js`) — 409 of 409 cards:

```js
        {
          id: "kebab-case-id",
          name: "Title Case Name",
          latex: String.raw`...`,
          description: String.raw`...`,
          keywords: ["...", "...", "...", "..."],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
```

**`patterns.js`** — 94 of 94 cards. Same, plus `type` and `subject` immediately after `name`:

```js
          type: "method",       // or "pattern"
          subject: "counting",  // geometry | algebra | number-theory | counting
```

- `type` and `subject` appear on **94/94** `patterns.js` cards and on **0/409** subject-file cards.
  Putting either in a subject file, or omitting either from `patterns.js`, is always wrong.
- `latex` uses `String.raw` on **502/503** cards. Use it even when there is no backslash.
- One card deviates: `periodic-sequences` in `patterns.js` orders its fields
  `id, type, subject, name, ...`. It is the only exception in 503 cards, and it is not a precedent.
  `tools/scan-conventions.py` names any card that is not in one of the two orders.
- Every card has a `latex` and a `description`. **0** cards omit either.

### Field values

| field | measured |
|---|---|
| `importance` | five values, not three: `high` 132, `medium` 202, `low` 83, `lower` 38, `lowest` 48 |
| `level` | drawn from `MATHCOUNTS` (100), `AMC10` (195), `AMC12` (266), `AIME` (351), `Olympiad` (188). No other string appears |
| `keywords` | min 4, median 6, 90th percentile 9, max 20. Four is the floor — never ship fewer |
| `name` | median 24 chars, max 55. 63 names use ` & `, 42 carry a parenthetical like `(PIE)` |
| `description` | median 259 chars, 90th percentile 496, max 729. Two to four sentences |

### Naming

The id does **not** have to resemble the name — `pie` is "Principle of Inclusion-Exclusion (PIE)".
This is exactly why the duplicate check in §5 must search names, not ids.

---

## 2. The write-up — mandatory, in `js/data/details/<subject>-details.js`

**503 write-ups for 503 cards. One each, no orphans, no card without one.**

Three headings, and all three are required:

```
## Why it works      503/503
## How to use it     503/503
## On contests       503/503
```

An optional fourth, `## Key forms`, appears on 96. There is exactly one other heading in the whole
corpus (`## Full proof` on `mean-chain`), and it is a sanctioned exception. Do not invent a fifth.

- **Key forms is a `patterns.js` habit**: 89 of 94 `patterns.js` cards have one, against 7 of 409
  subject-file cards. If you are writing a formula card and reaching for Key forms, put the material
  in the prose instead.
- Key forms lists the shapes a technique takes, not worked examples.
- **Each bullet leads with the maths, then ` — `, then the gloss:** `- $\frac{n!}{n} = (n-1)!$ — n rotations
  of a row give the same circular arrangement`. It does not lead with a bolded phrase; bold never
  renders, so `- **the division** — ...` reaches the reader as literal asterisks. The ` — ` here is a
  structural separator and does not count against the em-dash budget.

### Prose rules

- **No `**bold**` anywhere.** Markdown emphasis is never processed; it reaches the reader as literal
  asterisks. **0 of 503** write-ups contain `**`. This rule is unbroken — do not be the first.
- **Em dashes: median 2 per write-up, 90th percentile 5, and 64 write-ups use none.** Prefer commas.
  (`CONTRIBUTING.md` quotes a p90 of 3 from an older census; the current corpus measures 5.)
- **American spellings** in anything you write: `center`, `-ize`. 31 existing write-ups carry British
  forms; leave those alone rather than sweeping a file.
- **Never a raw `<` inside maths.** The write-up, the description and a problem `strategy` are all
  inserted as HTML before KaTeX runs, so `<` plus a letter opens a tag and the browser silently eats
  the rest of the line. Use `\lt` and `\gt`.

### Cross-links

Always `[[card-id|display text]]`, effectively never bare `[[card-id]]`. Measured: **481 piped
against 17 bare**, and all 17 bare ones were added in a single careless batch and have since been
converted, so the corpus now reads **498 piped, 0 bare**. A bare link renders the card's Title Case
name, which lands capitalised in the middle of a sentence.

- **Lowercase the display text mid-sentence** (268 of the piped links do), capitalising only a
  proper name: "apply [[gcd-substitution|gcd substitution]] first", but "[[kummers-theorem|Kummer's
  theorem]]".
- **Do not write a paragraph in order to hang a link on it.** Link where the sentence was going to
  mention the idea anyway. A sentence that exists only to list three neighbouring cards is padding;
  a sentence that says how this card differs from them is not.

The validator fails on an unresolvable target, which is the safety net for a renamed card. After adding a card run `python3 tools/build-cross-links.py --seed`
(the alias table is generated from card *names*, so a new or renamed card leaves it stale), then
`--report` and judge each candidate in context. Two classes of candidate are permanent false
positives and should be rejected every time they reappear:

- "extended Euclid" or "run symbolic Euclid" offered a link to `euclids-lemma`. Both mean the
  *algorithm*, not the lemma.
- the phrase "digit sums" offered a link to `digit-sum-carries`. In `divisibility-rules` and
  `repeating-decimals` it means $10 \equiv 1 \pmod 9$ or the digits of a repeating block, neither of
  which involves a carry; `digit-sum-mod-9` is the card those mean.

---

## 3. The example — mandatory, in `js/data/examples-supplement.js`

**503 example keys for 503 cards. Zero cards lack one.**

Shape is `{ q, s }`: a clean question, and the solution shown on demand.

```js
window.MATH_EXAMPLES["your-card-id"] = { q: String.raw`...`, s: String.raw`...` };
```

- **The file is not one object.** It is a long series of separate `Object.assign(...)` blocks
  followed by individual `window.MATH_EXAMPLES["id"] = {...};` statements. Appending before "the last
  `};`" drops your entry *inside the last example's object*, where it parses fine and silently never
  loads. Use the standalone-statement form above, appended at the end of the file.
- Never use a card's dead inline `example:` field. Those 143 fields were deleted for drifting.

---

## 4. The diagram — mandatory for geometry

**171 of 171 `geometry.js` cards have a diagram.** It is not a strong tendency, it is the rule: a
geometry card without a figure is incomplete. The count reached 171/171 only after a card shipped
without one and had to be fixed, which is why `tools/scan-conventions.py` exits non-zero on any
geometry card missing a diagram.

Elsewhere it is the exception, reserved for configuration-heavy figures: `patterns.js` 31/94,
`algebra.js` 11/96, `counting.js` 3/65, `number-theory.js` 1/77.

- Figures go through the diagram DSL in `js/data/diagrams/`, registered as
  `DIAGRAMS["card-id"] = [...]`. Geometry figures live in `geometry-diagrams.js`, everything else in
  `general-diagrams.js`.
- One canvas size for every panel on a card, and a `cap()` caption on every panel.
- Then confirm on the rendered page that no text is drawn outside its viewBox and every panel has its
  caption.
- A vertex dot drawn with a filled circle of `r <= 7` is re-appended to the end of the SVG by
  `tidyDiagram` (`js/app.js`), so it will be hoisted in front of any face. Use a larger radius or an
  unfilled marker on projected solids.
- Add the id to `CARD_DIAGRAM_IDS` in `js/app.js` only if the figure should also show on the section
  list page, not just the detail page.

### 3D figures

Project real $(x,y,z)$ rather than hand-tuning a parallelogram; the helpers live at the top of
`geometry-diagrams.js`. `proj3(O, scale, axes)` gives a projector, `depth3` sorts front to back,
and `box3` returns a wireframe box with the hidden corner's edges already dashed. Two rules came
out of building the first two figures, and both were mistakes first:

- **Use `AX3_ISO` for anything round.** The default `AX3` foreshortens the two horizontal axes
  unequally (0.72 against 1.01), which visibly squashes a ring of spheres. Boxes are fine under it.
- **Solids need opaque fills, painted back to front.** Tangent spheres seen from an angle project
  to *overlapping* circles, which is correct; drawn translucent they read as interpenetrating
  rather than as one in front of another. Opaque fills plus a `depth3` sort fix it.

`angleArc(P, Q, R, radius, ...)` takes the **vertex first**. Passing the vertex second draws the arc
centered on the wrong point, far from where its label sits.

---

## 5. Before you write anything: does it already exist?

Two cards were duplicated this way before the check below was written down. Both times the search
that "proved" the gap was the thing at fault.

```bash
# search NAMES across every data file, including patterns.js. never pipe through head.
grep -rhoE 'name: "[^"]*"' js/data/*.js | grep -iE 'your|topic|words'
```

- **Never pipe a does-this-exist search through `head`.** `grep -riE 'inclusion' js/data/*.js | head -8`
  returned eight keyword hits from other files and cut off before `patterns.js`, which held
  `pie` — a card already tagged on about twenty problems.
- **Search names, not ids.** `pie` would not match a search for "inclusion".
- **Search every file, not the subsection you expect.** `weighted-average` states alligation outright
  but lives in algebra, not in the subsection named "Rates, Work & Mixtures", and was recorded as
  missing because only that subsection was checked.
- **A near-miss is not a duplicate.** `euclids-lemma` alongside `euclidean-algorithm`, or a formula
  card beside a method card that uses it, is the sanctioned "technique and facts" split. But then the
  two must not repeat each other's content: cross-link instead.

---

## 6. Inserting the card safely

Inserting after a card's closing `},` puts your card in the **next** subsection whenever the anchor
was last in its own, because the brace you matched closed the subsection. Insert **before** a card
that sits in the middle of the target subsection, then verify:

```python
subs = [(m.start(), m.group(1)) for m in re.finditer(r'title: "([^"]+)"', src)]
owner = [t for pos, t in subs if pos < src.index('id: "your-card"')][-1]
```

A related trap in the details and examples files: the last entry of an object has **no trailing
comma**, so appending after it produces `...\`` immediately followed by your `"id":` and the parse
fails with `Unexpected string literal`. Add the comma.

---

## 7. Verify, in this order

```bash
jsc js/data/<file>.js                    # a `window` ReferenceError means the parse SUCCEEDED
jsc tools/validate-problem-db.js         # 0 violations, and check the card count moved as intended
python3 tools/build-cross-links.py --seed && python3 tools/build-cross-links.py --report
~/Downloads/competition-math-buildenv/bin/python tools/build-search-index.py
```

- Bump `?v=` in `index.html` for **every** file you touched, including ones a build step regenerated
  (`search-glossary.js`). The exception is `search-vectors.{json,bin}`, which revalidate themselves.
- Confirm `window.MathSemantic.info().cards` equals the validator's card count before reading any
  search number. If they disagree, the browser is serving a cached data file.
- **Changing only the hash does not reload the document.** To see new data you must navigate to
  `index.html` itself, and a `?nocache=` parameter is the reliable way.
- Measure search with `tools/search-eval.html`, never by eye. Current hold: **154/171 top-1, MRR 0.935**.
  Adding a card jostles neighbouring queries by a rank or two; what must not move is the top-1 count.
- On the rendered page: correct breadcrumb, all three write-up headings, the example block, 0
  `.katex-error`, 0 `.card-link-broken`, and no literal `**`.

---

## 8. Tagging a problem

`{ ref, formulas, strategy }`, optionally `trick` and `trickFormulas`.

- `formulas` = the basic tools for the **appropriate** route, not the theoretical minimum. Everything
  reduces to similar triangles and Pythagoras; tagging that way tells a reader nothing.
- `trick` = a shortcut over a feasible standard route. The dividing line is **feasibility, not
  obscurity**: if the problem cannot reasonably be solved without a result, that result is a formula
  however obscure it is.
- Both trick fields are required together; the validator rejects prose without cards and cards
  without prose.
- A trick-only card still lists the problem among its practice problems, with the row rendered
  exactly like any other. The problem page is the only place a trick is labelled.
- `strategy` is a double-quoted JS string: LaTeX backslashes doubled, no raw `"`, no raw `<`.
- **AMC 10 and AMC 12 share problems, often a whole run of them.** In 2024, AMC 10B #1-5 are the
  same five problems as AMC 12B #1-5, word for word. A shared problem gets **the same cards and the
  same route in both entries** — it is one problem with one best solution, so writing a different
  strategy for the 10 than for the 12 would mean one of them is not the best route. Copy the entry
  and change only the `ref`.
- Detect sharing by comparing statements on AoPS before writing, not after. `tools/scan-conventions.py`
  gates on the consequence: two entries with identical strategy text must carry identical `formulas`.
