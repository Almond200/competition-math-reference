# CONVENTIONS

Every rule here was measured against all 534 cards, and the count that proves it is quoted. If a
rule has no number, it is not a rule. `CONTRIBUTING.md` holds the reasoning, the gap register and
the per-year retag notes; this file is the checklist you follow while actually adding a card.

Regenerate the numbers with `tools/scan-conventions.py`.

---

## 1. The card

Exactly two field orders exist, and nothing else. Copy one of these.

**Subject file** (`geometry.js`, `algebra.js`, `number-theory.js`, `counting.js`) — 432 of 432 cards:

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

**`patterns.js`** — 102 of 102 cards. Same, plus `type` and `subject` immediately after `name`:

```js
          type: "method",       // or "pattern"
          subject: "counting",  // geometry | algebra | number-theory | counting
```

- `type` and `subject` appear on **102/102** `patterns.js` cards and on **0/432** subject-file cards.
  Putting either in a subject file, or omitting either from `patterns.js`, is always wrong.
- `latex` uses `String.raw` on **533/534** cards. Use it even when there is no backslash.
- One card deviates: `periodic-sequences` in `patterns.js` orders its fields
  `id, type, subject, name, ...`. That card was corrected, so the corpus now has **no** exception:
  all 534 cards use one of the four canonical orders, the extra two being the same pair with an
  optional `latexPlain` after `latex` (13 cards carry one, giving the expanded-notation setting
  something to show).
  `tools/scan-conventions.py` names any card that is not in one of the two orders.
- Every card has a `latex` and a `description`. **0** cards omit either.

### Field values

| field | measured |
|---|---|
| `importance` | five values, not three: `high` 135, `medium` 222, `low` 87, `lower` 42, `lowest` 48 |
| `level` | drawn from `MATHCOUNTS` (105), `AMC10` (202), `AMC12` (287), `AIME` (380), `Olympiad` (196). No other string appears |
| `keywords` | min 4, median 6, 90th percentile 9, max 20. Four is the floor — never ship fewer |
| `name` | median 24 chars, max 55. 63 names use ` & `, 42 carry a parenthetical like `(PIE)` |
| `description` | median 273 chars, 90th percentile 501, max 1001. Two to four sentences |

### Naming

The id does **not** have to resemble the name — `pie` is "Principle of Inclusion-Exclusion (PIE)".
This is exactly why the duplicate check in §5 must search names, not ids.

---

## 2. The write-up — mandatory, in `js/data/details/<subject>-details.js`

**534 write-ups for 534 cards. One each, no orphans, no card without one.**

Three headings, and all three are required:

```
## Why it works      534/534
## How to use it     534/534
## On contests       534/534
```

An optional fourth, `## Key forms`, appears on 106. There is exactly one other heading in the whole
corpus (`## Full proof` on `mean-chain`), and it is a sanctioned exception. Do not invent a fifth.

- **Key forms is a `patterns.js` habit**: 95 of 102 `patterns.js` cards have one, against 11 of 432
  subject-file cards. If you are writing a formula card and reaching for Key forms, put the material
  in the prose instead.
- Key forms lists the shapes a technique takes, not worked examples.
- **Each bullet leads with the maths, then ` — `, then the gloss:** `- $\frac{n!}{n} = (n-1)!$ — n rotations
  of a row give the same circular arrangement`. It does not lead with a bolded phrase; bold never
  renders, so `- **the division** — ...` reaches the reader as literal asterisks. The ` — ` here is a
  structural separator and does not count against the em-dash budget.

### Prose rules

- **No `**bold**` anywhere.** Markdown emphasis is never processed; it reaches the reader as literal
  asterisks. **0 of 534** write-ups contain `**`. This rule is unbroken — do not be the first.
- **Em dashes: median 2 per write-up, 90th percentile 5, and 87 write-ups use none.** Prefer commas.
  (`CONTRIBUTING.md` quotes a p90 of 3 from an older census; the current corpus measures 5.)
- **American spellings** in anything you write: `center`, `-ize`. 31 existing write-ups carry British
  forms; leave those alone rather than sweeping a file.
- **Never a raw `<` inside maths.** The write-up, the description and a problem `strategy` are all
  inserted as HTML before KaTeX runs, so `<` plus a letter opens a tag and the browser silently eats
  the rest of the line. Use `\lt` and `\gt`.

### Cross-links

Always `[[card-id|display text]]`, effectively never bare `[[card-id]]`. Measured: **677 piped
links, 0 bare** across the corpus. A bare link renders the card's Title Case
name, which lands capitalised in the middle of a sentence.

- **Lowercase the display text mid-sentence** (268 of the piped links do), capitalising only a
  proper name: "apply [[gcd-substitution|gcd substitution]] first", but "[[kummers-theorem|Kummer's
  theorem]]".
- **Never put `$...$` inside a link's display text.** `linkifyCards` (`js/app.js`) splits the prose on
  `$...$` *before* it matches `[[...]]`, so a link whose label contains math is torn across two parts,
  the pattern never matches, and the raw `[[id|...]]` is printed to the reader. It fails silently: the
  validator passes, and `.card-link-broken` does not fire because no link was ever produced. Write
  `[[trig-area|the sine area formula]] $\tfrac12ab\sin C$`, never `[[trig-area|$\tfrac12ab\sin C$]]`.
  Three occurrences existed when this was found; a corpus check is one grep for `\[\[[^\]]*\$`.
- **No `*italics*` either.** Same reason as bold: markdown emphasis is not processed, so it reaches the
  reader as literal asterisks.
- **A card's `description` is never linkified.** `linkifyCards` runs on the write-up in
  `js/data/details/` and nowhere else, so `[[id|text]]` placed in a `description` is printed to the
  reader verbatim. It fails the same silent way math-inside-a-link does: the validator passes and
  `.card-link-broken` never fires, because no link was attempted. Put the cross-link in the write-up
  and let the description read as plain prose. One grep finds any regression:
  `grep -n 'description: String.raw`[^`]*\[\[' js/data/*.js`.
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
- **a mathematician's name is not a card match.** "Brahmagupta's" in `cyclic-perpendicular-diagonals`
  means Brahmagupta's *theorem* (the perpendicular from the diagonal intersection bisects the opposite
  side), not `brahmaguptas-formula`, which is his area formula. Likewise "Pappus' chain" in `arbelos`
  is the chain of circles, not `pappus-centroid`, which is the solid-of-revolution theorem. Both
  reappear on every `--seed`, and both are rejections.

---

## 3. The example — mandatory, in `js/data/examples-supplement.js`

**534 example keys for 534 cards. Zero cards lack one.**

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

**185 of 185 `geometry.js` cards have a diagram.** It is not a strong tendency, it is the rule: a
geometry card without a figure is incomplete. The count reached 185/185 only after a card shipped
without one and had to be fixed, which is why `tools/scan-conventions.py` exits non-zero on any
geometry card missing a diagram.

Elsewhere it is the exception, reserved for configuration-heavy figures: `patterns.js` 35/102,
`algebra.js` 11/102, `counting.js` 3/67, `number-theory.js` 1/78.

- Figures go through the diagram DSL in `js/data/diagrams/`, registered as
  `DIAGRAMS["card-id"] = [...]`. Geometry figures live in `geometry-diagrams.js`, everything else in
  `general-diagrams.js`.
- One canvas size for every panel on a card, and a `cap()` caption on every panel.
- **Nothing overlaps, and nothing falls off the canvas.** Run `python3 tools/check-diagrams.py`; it
  exits non-zero on any label outside its viewBox, any marker dot outside it, and any two labels
  whose boxes intersect. Then confirm on the rendered page that every panel has its caption.
- **Derive positions; do not hardcode one where the construction gives it.** This is the rule that
  the other checks could not enforce, and every instance of the bug below is the same mistake:
  a coordinate chosen by eye, or a derived point never checked against the frame.
    - The arbelos comparison circle sat at a hardcoded `[330, 118]` and landed *on top of* the
      figure. Both shapes are now placed from a computed gap.
    - `angle-bisector-length`'s external foot is at `t = b/(b-a)` along `AB`, so it runs to infinity
      as `a` approaches `b`. A near-isosceles triangle put it at `x = -406`. Sides must be clearly
      unequal -- 197 : 104 places it at 337.
    - `ellipse-tangent-line` reflects a focus to `2*yAx - F1.y`; with the line low in the frame that
      was `y = 368` on a 330-tall canvas, so the point and its label drew nothing.
    - `difference-of-squares` left 14px to the right of the figure for a 28px label.
  In each case the figure rendered, the page looked plausible, and every existing gate passed.
- A line drawn deliberately past the frame is *not* a violation -- that is how an unbounded line is
  rendered, and the clipping is the intent.
- **A drawn circle that nearly fits is a bug.** `check-diagrams.py`'s circle test was long gated on
  `r <= 8`, so it only ever saw marker dots: a radius-166 circumcircle sliced flat at BOTH ends of
  `median-to-hypotenuse` passed every gate for months. It now flags any circle overflowing by up to
  25% of its own radius. Beyond that the circle is plainly bigger than the frame on purpose -- four
  circumcircles of four triangles genuinely are -- and stays exempt. Today's data splits cleanly
  either side: the three real bugs sat at 4%, 17% and 23%, the deliberate arc at 90%.
- **Never assign `DIAGRAMS["id"]` twice.** Six keys had drifted into a second definition that
  silently replaced the first, and for `median-to-hypotenuse` the *discarded* copy was the correct
  one. The checker now fails on a repeated key.
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
python3 tools/check-diagrams.py          # every panel fits its canvas, no labels collide
python3 tools/scan-conventions.py        # the census above; fails on any rule marked "must stay 0"
python3 tools/check-lists.py             # list ids resolve, and every route is complete
./tools/check-lab.sh                     # the inline script of each lab/ page still parses
python3 tools/build-cross-links.py --seed && python3 tools/build-cross-links.py --report
~/Downloads/competition-math-buildenv/bin/python tools/build-search-index.py
```

- Bump `?v=` in `index.html` for **every** file you touched, including ones a build step regenerated
  (`search-glossary.js`). The exception is `search-vectors.{json,bin}`, which revalidate themselves.
- Confirm `window.MathSemantic.info().cards` equals the validator's card count before reading any
  search number. If they disagree, the browser is serving a cached data file.
- **Changing only the hash does not reload the document.** To see new data you must navigate to
  `index.html` itself, and a `?nocache=` parameter is the reliable way.
- Measure search with `tools/search-eval.html`, never by eye, and **always compare warm to warm**.
  A cold first run and a warm re-run differ by a point or two because the semantic index loads
  lazily; warm runs are reproducible to the query. Measured 2026-09-20 over 534 cards, the
  original 171 queries give **153 cold, 154 warm** (warm stable across three runs), against a
  previously recorded warm **155**. That is a real net loss of one query, not a measurement
  artifact. The query set is now **183**: twelve were added for the matrices, conics and
  projection cards, and eleven of those twelve rank first, giving **165/183 warm, MRR 0.9332**.
  Adding a card jostles neighbouring queries by a rank or two; what must not move is the top-1 count.
- On the rendered page: correct breadcrumb, all three write-up headings, the example block, 0
  `.katex-error`, 0 `.card-link-broken`, and no literal `**`.

---

## 8. Built-in lists

`js/data/built-in-lists.js` opens by promising that a route is "every card carrying that level and
subject, so a route is complete by construction rather than a hand-picked sample". Nothing enforced
it, and the file is edited by hand, so **every card added to the library silently failed to join the
routes it qualified for**: 14 such gaps had accumulated across six cards before the check existed.
The failure is invisible in the UI -- the route just quietly omits a card the reader was promised.

- `tools/check-lists.py` now enforces it in both directions: a qualifying card missing from a route
  fails, and a non-qualifying card present in one fails too.
- **`tier: "AMC"` maps to two level tags, `AMC10` and `AMC12`.** Comparing the tier string against
  card levels directly reports all four AMC routes as 100% wrong. This is the single easiest thing
  to get wrong when touching that checker.
- A list that is *not* complete by construction must not be `kind: "route"`. "Olympiad Heavy
  Hitters" was tagged one while its own blurb read "Not a syllabus", and held 16 of 192 olympiad
  cards; it is now `kind: "thinking"`, and the four real olympiad routes carry the other 192.
- Sections of one card are reported as advisory, not fatal: that is a presentation call. 17 exist.
- **A card listed twice in one list is now fatal too.** The route check collects ids into a set, so
  it could never see a duplicate. Moving `conic-sections` into a new Conics subsection and adding a
  Conics section to the two geometry routes left it in "Coordinates & Transformations" as well: it
  rendered twice, under two headings, and every gate passed. `check-lists.py` now reports the card
  and both sections holding it, and it covers curated lists as well as routes.

---

## 9. Tagging a problem

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
