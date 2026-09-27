# CONVENTIONS

Every rule here was measured against all 555 cards, and the count that proves it is quoted. If a
rule has no number, it is not a rule. `CONTRIBUTING.md` holds the reasoning, the gap register and
the per-year retag notes; this file is the checklist you follow while actually adding a card.

Regenerate the numbers with `tools/scan-conventions.py`.

---

## 1. The card

Exactly two field orders exist, and nothing else. Copy one of these.

**Subject file** (`geometry.js`, `algebra.js`, `number-theory.js`, `counting.js`) — 434 of 434 cards:

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

**`patterns.js`** — 105 of 105 cards. Same, plus `type` and `subject` immediately after `name`:

```js
          type: "method",       // or "pattern"
          subject: "counting",  // geometry | algebra | number-theory | counting
```

- `type` and `subject` appear on **105/105** `patterns.js` cards and on **0/434** subject-file cards.
  Putting either in a subject file, or omitting either from `patterns.js`, is always wrong.
- `latex` uses `String.raw` on **555/555** cards. Use it even when there is no backslash.
- **never write a raw `<` followed by a letter inside `$...$`** — write `\lt`. Every one of these
  strings reaches the page through `innerHTML`, so the HTML parser sees `<j` as the start of a tag
  and eats everything up to the next `>` before KaTeX is ever called. This shipped once as
  `$\sum_{i<j} \lvert \vec v_i \times \vec v_j \rvert$` on `zonogon-minkowski`: the bullet lost its
  formula and the bullet after it was mangled too. `scan-conventions.py` checks every `String.raw`
  literal in the data files — descriptions, `latex`, write-ups and examples alike — and it looks
  only *inside* math spans, because matching across the gap between two formulas just flags the
  intentional `<br>` in examples.
- One card deviates: `periodic-sequences` in `patterns.js` orders its fields
  `id, type, subject, name, ...`. That card was corrected, so the corpus now has **no** exception:
  all 555 cards use one of the four canonical orders, the extra two being the same pair with an
  optional `latexPlain` after `latex` (13 cards carry one, giving the expanded-notation setting
  something to show).
  `tools/scan-conventions.py` names any card that is not in one of the two orders.
- Every card has a `latex` and a `description`. **0** cards omit either.

### Field values

| field | measured |
|---|---|
| `importance` | five values, not three: `high` 136, `medium` 223, `low` 90, `lower` 42, `lowest` 48 |
| `level` | drawn from `MATHCOUNTS` (106), `AMC10` (204), `AMC12` (290), `AIME` (385), `Olympiad` (198). No other string appears |
| `keywords` | min 4, median 6, 90th percentile 9, max 20. Four is the floor — never ship fewer |
| `name` | median 24 chars, max 55. 63 names use ` & `, 42 carry a parenthetical like `(PIE)` |
| `description` | median 273 chars, 90th percentile 501, max 1001. Three to five sentences, to the intro standard below |

### The intro (`description`) standard

The description is the card's introduction. It is the first prose on the card's page, and its
**first two sentences are all the section grid and search results show** (`firstSentences` in
`js/app.js`), so those two must stand on their own. Adopted 2026-09-25, after a reader put it
exactly: the old intros read "like someone who knows what they are talking about but isn't doing
a good job of explaining it". Progress is tracked in `tools/rewrite-register.json`.

- **Sentence one defines the topic of the card** — what the object, result or method is — before
  any formula variant, use case or caveat. A term is defined ("Two integers are congruent modulo
  $m$ when they leave the same remainder"), a theorem is stated in words ("In a right triangle,
  the square of the hypotenuse equals the sum of the squares of the two legs"), a method says what
  it does ("Stars and bars counts the ways to split $n$ identical objects into $k$ labeled
  groups"). Never open with a list of variables ("For a cevian of length $d$ dividing side $a$
  into..."), a mnemonic, a fragment ("For nonnegative reals; equality iff all equal"), or the
  conditions under which something happens before saying what it is.
- **Sentence two says when you reach for it and what it buys you.**
- Then conditions, variants and symbol meanings, woven into sentences. Three to five in all.
- **No `[[links]]`** — descriptions are not linkified, and the scan fails on one.
- **Search reads it.** Descriptions feed both search channels, so rebuild the index and run the
  eval after every batch. A specialisation's intro must not paraphrase the general card's
  defining phrase: "The line through the circumcenter and the orthocenter..." on
  `euler-line-parallel-side` took "line through the circumcenter centroid and orthocenter" off
  `euler-line-ratio`, and "the circle that touches $AD$, touches $BC$..." on `sawayama-thebault`
  took "radius of the circle touching all three sides" off `inradius-area`.

### Naming

The id does **not** have to resemble the name — `pie` is "Principle of Inclusion-Exclusion (PIE)".
This is exactly why the duplicate check in §5 must search names, not ids.

---

## 2. The write-up — mandatory, in `js/data/details/<subject>-details.js`

**555 write-ups for 555 cards. One each, no orphans, no card without one.**

Three headings, and all three are required:

```
## Why it works      555/555
## How to use it     555/555
## On contests       555/555
```

Two optional headings, and no others (the scan fails on any other): `## Key forms`, on 109, and
`## Full proof`, which renders collapsed behind a "Show full proof" button.

- **Why it works explains; Full proof proves.** Open Why it works with the idea in one plain
  sentence, then the argument step by step at a strong AMC 12 reader's level, each step saying why
  it is allowed, in short paragraphs. No compressed gaps like "factors as a difference of squares,
  twice". A concrete instance (the divisors of $360$) is often the clearest way in.
- **Add a Full proof when Why it works is an outline or an instance** and a complete argument is
  within contest reach: the general expansion behind Vieta, unique factorization behind the
  divisor count, the determinant behind barycentric area ratios. Do not add one to a method or
  pattern with nothing to prove, and do not duplicate a Why it works that is already complete.
  Where the real proof is beyond contest level, say so in Why it works instead.

- **Key forms is a `patterns.js` habit**: 98 of 105 `patterns.js` cards have one, against 11 of 434
  subject-file cards. If you are writing a formula card and reaching for Key forms, put the material
  in the prose instead.
- Key forms lists the shapes a technique takes, not worked examples.
- **Each bullet leads with the maths, then ` — `, then the gloss:** `- $\frac{n!}{n} = (n-1)!$ — n rotations
  of a row give the same circular arrangement`. It does not lead with a bolded phrase; bold never
  renders, so `- **the division** — ...` reaches the reader as literal asterisks. The ` — ` here is a
  structural separator and does not count against the em-dash budget.

### Prose rules

- **No `**bold**` anywhere.** Markdown emphasis is never processed; it reaches the reader as literal
  asterisks. **0 of 555** write-ups contain `**`. This rule is unbroken — do not be the first.
- **Em dashes: median 2 per write-up, 90th percentile 5, and 87 write-ups use none.** Prefer commas.
  (`CONTRIBUTING.md` quotes a p90 of 3 from an older census; the current corpus measures 5.)
- **American spellings** in anything you write: `center`, `-ize`. 31 existing write-ups carry British
  forms; leave those alone rather than sweeping a file.
- **Never a raw `<` inside maths.** The write-up, the description and a problem `strategy` are all
  inserted as HTML before KaTeX runs, so `<` plus a letter opens a tag and the browser silently eats
  the rest of the line. Use `\lt` and `\gt`.

### Cross-links

Always `[[card-id|display text]]`, effectively never bare `[[card-id]]`. Measured: **687 piped
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
  which involves a carry; `divisibility-rules` is the card those mean (it absorbed `digit-sum-mod-9`).
- **a mathematician's name is not a card match.** "Brahmagupta's" in `cyclic-perpendicular-diagonals`
  means Brahmagupta's *theorem* (the perpendicular from the diagonal intersection bisects the opposite
  side), not `brahmaguptas-formula`, which is his area formula. Likewise "Pappus' chain" in `arbelos`
  is the chain of circles, not `pappus-centroid`, which is the solid-of-revolution theorem. Both
  reappear on every `--seed`, and both are rejections.
  The library now holds **three** distinct Pappus results — `pappus-centroid` (solids of
  revolution), Pappus' chain (a clause inside `arbelos`), and `pappus-hexagon` (the projective
  theorem) — so the bare alias "Pappus" is genuinely ambiguous and `build-cross-links.py` holds
  it back rather than guessing. That is the wanted behaviour: do not resolve it by hand.

---

## 3. The example — mandatory, in `js/data/examples-supplement.js`

**555 example keys for 555 cards. Zero cards lack one.**

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

**200 of 200 `geometry.js` cards have a diagram.** It is not a strong tendency, it is the rule: a
geometry card without a figure is incomplete. The count reached 200/200 only after a card shipped
without one and had to be fixed, which is why `tools/scan-conventions.py` exits non-zero on any
geometry card missing a diagram.

Elsewhere it is the exception, reserved for configuration-heavy figures: `patterns.js` 38/105,
`algebra.js` 11/102, `counting.js` 3/67, `number-theory.js` 1/78.

- **Figures inside the text.** A paragraph that is nothing but `{{figure:name}}` draws
  `BODY["card-id"]["name"]` at that point in the write-up. Use one wherever a paragraph describes
  something the reader would otherwise have to imagine: a construction, a labelled configuration,
  a before-and-after, a worked diagram (`barycentric-coordinates` marks two points on the sides,
  turns each cevian into an equation and solves for the crossing). Put it right after the paragraph
  it illustrates, never repeat the figure at the top of the card, and make the caption say what to
  look at. Label points with the values the text uses, vertex coordinates included. The scan fails
  on a marker that names no figure, a figure no text places, and a marker sharing its paragraph
  with prose. `EXAMPLE["card-id"] = { q, s }` is the same idea for an example's own figure: `q`
  shows only the given setup, `s` an optional construction inside the solution.
- **Keep paragraphs digestible.** One idea per paragraph, about 450 characters at most, and a
  multi-step derivation or the key equation goes on its own line as display math (`$$...$$`)
  instead of being threaded through a long sentence. A paragraph that walks through several steps
  is split at the step boundaries. `scan-conventions.py` reports rewritten-card paragraphs over the
  limit.
- **Never name a specific problem on a card.** On contests, the write-up, the example and the
  description describe problem types in general ("a cubic with no $x^2$ term", "two circles in a
  corner") and may quote the tag counts, but never cite "2024 AIME II Problem 4" or similar; the
  practice problems are listed under the card from `problem-db.js`, and that is where references
  live. `scan-conventions.py` fails on any card text that names one.
- **Keep each card in its lane.** A neighbouring card's result gets one sentence and a `[[link]]`,
  never a re-derivation, a displayed copy of its formula, or its picture. A construction or
  configuration is drawn and worked on the one card whose topic it is (the doubled median on
  Doubling a Median, the 13-14-15 altitude split on the 13-14-15 card), and every other card
  points there. Check the neighbours' figures before drawing a new one.
- **Break up runs of long paragraphs.** Two or three paragraphs of three or more lines in a row are
  hard to take in, so something visual should sit between them: on a geometry card, an in-text
  figure (`{{figure:name}}`) of the configuration the text describes; on any card, a centered
  display line with the key equation. Figures are for geometry. A non-geometry card gets one only
  when a picture explains more than a centered line would, never as decoration. One or two
  in-text figures per card is the norm, one for each distinct idea: a card covering two concepts
  (the acute and the obtuse case, the theorem and its converse) gets a figure for each.
- **Write to teach, not to list.** Each explanation should build understanding: say what the idea
  is, why each step follows, and how the pieces connect, instead of stating facts one after another.
  This is not a formal lesson, and most cards need far less than `barycentric-coordinates`, which
  is the fullest case. Add a figure wherever a picture makes the concept clearer, and not only in
  geometry: an area model for an algebraic identity, the grid of outcomes for a probability, a
  graph for an extremum, a tiling for an algorithm.
- Figures go through the diagram DSL in `js/data/diagrams/`, registered as
  `DIAGRAMS["card-id"] = [...]`. Geometry figures live in `geometry-diagrams.js`, everything else in
  `general-diagrams.js`.
- One canvas size for every panel on a card, and a `cap()` caption on every panel.
- **Nothing overlaps, and nothing falls off the canvas.** Run `python3 tools/check-diagrams.py`; it
  exits non-zero on any label outside its viewBox, any marker dot outside it, and any two labels
  whose boxes intersect. Then confirm on the rendered page that every panel has its caption.
- **No label touches a dot, a stroke or another label as rendered, and none relies on the tidy pass
  to rescue it.** Run `python3 tools/check-labels.py`. It renders every figure in headless Chrome
  through the app's own `tidyDiagram()` and measures real glyphs, which `check-diagrams.py` cannot:
  that gate reads the source with estimated widths and never saw the "1"s printed on the circle
  centres of the Soddy figure, or a vertex letter sitting on one of its own sides. It also fails a
  label the tidy pass had to carry more than 14px, since a label moved that far can end up naming
  the wrong point (a "Brianchon point" label once landed beside a tangency point); place it in the
  figure instead. `tools/label-audit.html#show` draws every offending figure with the label boxed.
  Two tools for crowded spots: `gapLabel(p, neighbours, ...)` puts a point's label in the widest
  gap between the lines leaving it, and in an in-text figure drawn on a grid, `plate(...)` prints
  an opaque patch in the page colour under a coordinate label so grid lines stop at its edge.
  (Plates only in `BODY` figures: card panels also sit on the white card, where the patch would show.)
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
- **A diagram file that throws must fail the run, and used not to.** `check-diagrams.py` captured
  only `stdout` from `jsc`, so a file that raised at load looked exactly like a file with no
  diagrams in it: the count came back smaller and the run said OK. One undefined colour constant
  (`PNK`, which exists in `geometry-diagrams.js` but not in `general-diagrams.js`) silently removed
  **all 27 figures in that file** from the app while every gate passed. The checker now inspects
  the return code and stderr. Colour constants are per-file: check the one you are editing defines
  what you are about to use.
- **The marker-dot test checks the CENTRE, and used not to.** It read
  `cy > H + r`, giving a dot a full radius of slack past the edge -- so a marker centred at
  y = 342 on a 340-tall canvas, entirely invisible, passed the gate. Found when a derived point
  in `perpendicular-bisector-locus` landed off the bottom and `check-diagrams.py` said OK. The
  bound is now the viewBox itself; tightening it produced zero false positives across the other
  269 panels.
- **A drawn circle that nearly fits is a bug.** `check-diagrams.py`'s circle test was long gated on
  `r <= 8`, so it only ever saw marker dots: a radius-166 circumcircle sliced flat at BOTH ends of
  `median-to-hypotenuse` passed every gate for months. It now flags any circle overflowing by up to
  25% of its own radius. Beyond that the circle is plainly bigger than the frame on purpose -- four
  circumcircles of four triangles genuinely are -- and stays exempt. Today's data splits cleanly
  either side: the three real bugs sat at 4%, 17% and 23%, the deliberate arc at 90%.
- **When a figure claims points are collinear, the drawn line must span all of them.** Take the
  extremes along the line direction, never an arbitrary pair. `steiner-line` spanned `rs[0]` to
  `rs[2]` while the middle reflection lay *outside* that pair, so the third point rendered as a dot
  floating in empty space — a figure that visually contradicts its own caption while sitting
  0.02px from the line. **No gate covers this**, and two attempts to build one both reached a 100%
  false-positive rate: on 279 panels the "collinear but past the end" test flagged 41 legitimate
  cases, and restricting it to same-coloured dots still flagged 8, all of them lattice grids where
  collinear dots are the whole point. Check it by eye and by projecting the points onto the line.
- **Corner/apex pairing is easy to get backwards.** In `equiangular-hexagon-area` the apex where
  two extended sides meet is cut off by the side *between* them; pairing each apex with an adjacent
  side instead produced three non-equilateral slivers that looked fine on screen. Measure the
  triangles you draw.
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
python3 tools/check-labels.py            # as rendered: no label on a dot, stroke or label, none moved far
python3 tools/scan-conventions.py        # the census above; fails on any rule marked "must stay 0"
python3 tools/check-lists.py             # list ids resolve, and every route is complete
python3 tools/check-topics.py            # every card carries a topic chip, and no title awards a wrong one
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
  lazily; warm runs are reproducible to the query. Measured 2026-09-20 over 539 cards, the
  original 171 queries give **154 warm**, against a previously recorded warm **155**. The query
  set is now **183**, twelve added for the matrices, conics and projection cards, of which eleven
  rank first: **165/183 warm, MRR 0.9323**. Every point lost across this work was traced before
  being accepted, and one was not accepted -- see CONTRIBUTING for the card that had to have its
  keywords narrowed because it out-ranked the general card it specialises.
  Adding a card jostles neighbouring queries by a rank or two; what must not move is the top-1 count.
- On the rendered page: correct breadcrumb, all three write-up headings, the example block, 0
  `.katex-error`, 0 `.card-link-broken`, and no literal `**`.

---

## 8. Topic chips

Every card carries at least one topic chip, and each chip opens a browsable topic page. The chips
are derived, not authored: `topicsForCard` (`js/app.js`) runs `TOPIC_RULES` against the card's name,
its keywords, and **its subsection title**. That last ingredient is the one to understand before
adding a subsection or a rule.

- **A title is a weaker signal than a card's own words, and a compound title is weaker still.**
  "Divisor Functions & Totient" matched the modular-arithmetic rule on the word `totient` and put a
  modular chip on nine divisor cards; the Methods subsections are named by SUBJECT, so seventeen
  pure counting methods came out tagged `probability`. Thirty-eight cards carried a wrong chip.
  Two mechanisms fix that and both live next to the rules: tools titles are never fed in at all,
  and `TITLE_STOP` vetoes one topic on one subsection, but only when the card's own words do not
  independently earn it, so nothing correct is lost.
- **Prefer a topic to a subsection for anything that spans files.** `conics` has to reach
  `vertex-form` in algebra and `ellipse-tangent-line` in patterns; `linear-algebra` has to reach the
  six older cards that were already assuming determinants. A cross-file move would change those
  cards' `type` and force a search rebuild, so the cross-section topic is the right tool. Six exist
  for exactly this reason: `conics`, `linear-algebra`, `floors-abs`, `games`, `convexity`,
  `transformations`, alongside the older `trigonometry`, `recursion` and `generating-functions`.
- **Watch for a loose term matching inside a longer word.** `/factor/` matched `cofactor`,
  `factorial` and "scale factor"; `/similar/` put a `triangles` chip on "similar conics";
  a bare `/degree/` matched "second degree equation". Each is now spelled out.
- `tools/check-topics.py` fails on a card with no chip and on any known-bad (subsection, topic)
  pair. It **lifts `TOPIC_RULES`, `TITLE_STOP` and `topicsForCard` straight out of `js/app.js`**
  rather than restating them, so the gate cannot drift from the app. Run it after touching a rule,
  adding a subsection, or renaming one.

## 9. Built-in lists

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

## 10. Touching persisted state

Three keys live in `localStorage`: `mq-lists`, `mq-settings` and `theme`. One rule governs all of
them, and it exists because breaking it destroyed user data twice.

- **Merge into stored state; never rebuild it from anything derived from the data files.** `BY_ID`
  and `SECTION_IDS` are both empty when a data script fails to load, so code that rebuilds storage
  from them turns a transient outage into permanent loss on the reader's next click. The full
  account, including the reproduction, is in CONTRIBUTING under "Persisted state must never be
  rebuilt from loaded data".
- **Filter for display, not for storage.** `liveCount()` / `liveIds()` exist so a count can ignore
  ids the library cannot currently resolve while the stored list keeps them.
- **A failed write must say so.** Both savers return a boolean and route failure through
  `storageFailed()`, which toasts once per session. `catch (e) {}` on a write path is how a reader
  loses a list without ever being told.

None of this is covered by a gate -- there is no way to assert it from a script. Test it by hand:
point one data file's `?v=` at a nonexistent path, click something, and confirm the stored lists
are untouched.

## 11. Tagging a problem

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
