# Authoring conventions

House style for writing cards. Moved out of the README, which is for readers of the
reference rather than people editing it.

## Write-up style

**Four headings, and no fifth.** A write-up uses `## Why it works`, `## How to use it`,
`## On contests`, and optionally `## Key forms`. Do not invent another one. A card may gain or
lose its Key forms block as its content changes — that is not "adding a subsection", which is
what this rule is about. Census across 499 write-ups: Why it works 499, On contests 499, How to
use it 498, Key forms 95, and one sanctioned exception (`mean-chain` carries a `## Full proof`
holding complete proofs of the four mean inequalities, which genuinely is not a "why it works").

- **Key forms is not a default section.** It belongs to cards that are a technique or a bundle
  of related statements, which in practice means methods and patterns: 88 of the 89 cards in
  `patterns.js` have one, against 7 of the 410 in the subject files. A formula card whose latex
  already shows the statement does not get one; put the material in the prose instead.
- Key forms lists the shapes a technique takes, not examples of it.
- **No bold in body prose.** Markdown emphasis is never processed — the body is inserted as HTML
  and then typeset by KaTeX, so `**like this**` reaches the reader as literal asterisks. (A
  widget caption in `js/geo-interactive.js` or `js/math-tools.js` is a different context: those
  are raw HTML strings and `<b>` there does render, which is the existing precedent.)
- **Em dashes: a budget of about three per write-up, and prefer commas.** The ` — ` inside a
  Key forms bullet is a structural separator and does not count. Measured house usage in prose
  is a median of 2 and a 90th percentile of 3, with 77 write-ups using none, so four or more is
  a signal to rewrite rather than a hard error.
- **American spellings.** `center`, not `centre` (the corpus runs about 4:1 American, and the
  problem database was 100% American before it drifted). Likewise `-ize`, not `-ise`:
  `recognize`, `normalize`, `minimize`. That axis is messier — 221 `-ize` against 75 `-ise`, and
  nearly even on `recognize`/`recognise` — so apply it to what you write and leave the rest. In
  both cases, if you are editing a long-standing card that uses a British spelling, leave it; do
  not sweep a whole file to fix one word you introduced.

## Checklist for a new or edited card

Each item here is something that has actually gone wrong, not a hypothetical.

1. **Check the subsection it landed in.** Inserting after a card's closing `},` puts the new
   card in the *next* subsection whenever the anchor card is last in its own, because the brace
   you matched closes the subsection rather than the card. The card now called `abs-value-relations` went into
   "Rates, Work & Mixtures" this way. Verify with the subsection titles, do not assume:

   ```python
   subs = [(m.start(), m.group(1)) for m in re.finditer(r'title: "([^"]+)"', src)]
   owner = [t for pos, t in subs if pos < src.index('id: "your-card"')][-1]
   ```

2. **Never put a raw `<` inside maths.** The write-up, the description and a problem's
   `strategy` are all inserted as HTML before KaTeX runs, so `<` followed by a letter starts an
   HTML tag and the browser silently eats everything up to the next `>`. The source looks
   perfect and the sentence renders cut off halfway. Use `\lt` and `\gt`.
   `tools/validate-problem-db.js` now fails on this for strategies; card fields are still on you.

3. **Bump `?v=` in `index.html` for every file you touched**, including files a build step
   regenerated (`search-glossary.js`) and not only the ones you hand-edited. Without the bump a
   returning reader gets the old data file out of cache and none of the change is visible. The
   one exception is `search-vectors.{json,bin}`, which carry no `?v=` because
   `js/search-semantic.js` revalidates them instead — see the cache section below.

4. **No raw `"` inside a problem `strategy`.** It is a double-quoted JS string, so an unescaped
   quote ends it and breaks the *whole file* — `validate-problem-db.js` then fails to load rather
   than reporting a violation, which is the signal to look for this. Reword instead of escaping;
   quoted phrases read badly in a strategy anyway.

5. **Add the example to `examples-supplement.js`**, never to a card's dead `example:` field.
   Those 143 fields were deleted precisely because they were shadowed and drifting.

6. **A figure goes through the diagram DSL**, one canvas size for every panel on a card, and a
   `cap()` on every panel. Then confirm on the rendered page that no text is drawn outside its
   viewBox and that every panel has its caption.

7. **Run, in order:** `jsc` each edited file (a `window` ReferenceError means the parse
   succeeded); `jsc tools/validate-problem-db.js`; `python3 tools/build-cross-links.py --seed`
   if you added or **renamed** a card, since the alias table is generated from card names and a
   rename leaves it stale; `--report` and review every candidate in context; then rebuild the
   index with the build venv at `~/Downloads/competition-math-buildenv/bin/python`, never the
   system Python.


## Tagging a problem in the database

An entry is `{ ref, formulas, strategy }` — no problem statement, just a link out to AoPS. The
`formulas` list is a claim about **how the problem is best solved**, so it has to be earned.

### The rule, in order

1. **Read every solution on the AoPS page, not just Solution 1.** It is frequently not the
   best one, and the good idea often sits in Solution 3.
2. **Decide which single solution is the best route** for a solver working under time — short,
   findable, and not dependent on a trick you would only spot in hindsight. Do this *before*
   touching the tags.
3. **Tag only the methods that route uses.** A theorem appearing in one of the other solutions
   does not earn a tag. Sending a reader to a card the best solution never touches is the same
   defect as tagging a theorem that merely *could* apply.
4. **Write the strategy so it names the methods it tags.** If the prose cannot mention the
   card without sounding forced, the tag is probably wrong. This also makes the tag checkable:
   `tools/audit-problem-tags.py` flags any tag its own strategy does not support.

### Failure modes seen in practice

- **Tagging the object, not the method.** `rotation-trick` is the specific "rotate about a
  vertex of an equilateral triangle to fuse three distances" technique. It was attached three
  separate times to problems that merely *contain* a rotation.
- **Tagging a near-miss card.** `divisibility-rules` is the digit-sum and alternating-sum card,
  not general divisibility. `square-of-sum` is $(a+b+c)^2$, three variables, not a general
  expansion. `lcm-pair-counting` counts *pairs*, not subsets. `non-adjacent-selection` is no
  **two** adjacent, not no three consecutive.
- **Tagging what merely suffices.** 1983 #5 was tagged `newtons-sums`, which would work, when
  AoPS sets $s=x+y$, $p=xy$ outright — that is `sp-substitution`.
- **Tagging from the wrong solution.** See rule 3.

### AMC 10 and AMC 12 share problems

The later problems of an AMC 10 and the earlier problems of the AMC 12 of the same letter overlap,
so one problem can sit in the database twice under two refs. Both entries must carry the **same tag
set** — a solver landing on either page is looking at one problem, and drift between them is a
defect no per-entry review can see.

The AoPS page says so at the top ("The following problem is from the 2023 AMC 10A #16 and 2023 AMC
12A #13, so those problems redirect to this page"), so the check costs nothing while the page is
already open. Four such pairs exist today: 2023 10A #16 = 12A #13, 2023 10B #17 = 12B #13, 2024
10B #18 = 12B #14, and 2024 10B #23 = 12B #18. One of the four had drifted.

Collisions are only possible between the same year *and* letter, so a 10B entry can only ever
collide with a 12B entry.

### Where new cards go

A card for a **technique** belongs in `js/data/patterns.js` with `type: "method"` (or
`"pattern"`) and a `subject`, so it lands under Additional Tools. Only genuine formulas go in
the four subject files. Dumping techniques into the formula sections is exactly what the
Additional Tools split exists to prevent.

### Recording missing coverage

When a problem's best solution uses something the library has no card for, **record it here**
before moving on, with the sighting that produced it. Two bars it has to clear first.

**It must be a general pattern, not one problem's move.** State it without referring to the problem
that produced it. If you cannot, it is a worked example and belongs in an existing card's write-up,
not on this register. Measured on the first seven candidates recorded here, four failed this test
or were already covered — the register was filling up with problem residue.

**Search for an owner before adding a row.** Of those seven, two were already stated generally by a
card that existed, and three more were one clause away from being covered.

Then classify it, because that decides where a card would go:

- **method** — the default, and what nearly every problem-derived finding actually is: a technique
  you apply. Goes in `patterns.js` with `type: "method"`.
- **pattern** — a recognisable problem shape rather than a technique. Also `patterns.js`, with
  `type: "pattern"`.
- **formula** — needs a justification, not just an expression. The four subject files already hold
  essentially every true formula, so the test is whether the library would carry this statement
  even if no contest had ever asked for it. "Two tangent circles have $d = R \pm r$" passes.
  "The area of this particular region is $2c^2$" does not — that is a method with an expression
  attached, which is a different thing, and putting an expression in the latex field does not make
  it a formula.

#### Written so far

| gap | kind | sightings | card |
|---|---|---|---|
| order of a permutation is the lcm of its cycle lengths; count by cycle type | formula | 2026 I #7 | `permutation-cycle-structure` |
| find where a sequence peaks by the consecutive ratio crossing 1 | **method** | 1991 #3 | `largest-term-ratio` |
| two tangent circles: the touch point is on the line of centers, so $d = R \pm r$ | formula | 2023 12A #18, and bedrock throughout | `tangent-circles` |
| graph a relation in $|x|$ and $|y|$ by solving one quadrant and reflecting, including nested bars | **method** | 2023 12B #9, 2022 12A #5 | `abs-value-relations` |

#### Closed by a clause on a card that already existed

| gap | resolved on |
|---|---|
| perpendicular bisector of a chord passes through the center | `equal-chords-arcs` — it carried the forward direction, not the locus reading that finds a circumcenter |
| a step of size $k$ around an $n$-cycle splits into $\gcd(n,k)$ cycles | `permutation-cycle-structure` — it reasoned about orbits but never stated the count |
| a polyline whose segments share an angle has net displacement (length)$\cdot\cos\theta$ | `projection-formula` — it stated the triangle case only |

#### Closed as already covered

| gap | already stated by |
|---|---|
| homogenize a two-variable equation by dividing by $y^2$ and solve for the ratio | `normalization` — "only the ratios matter, so you may fix one quantity for free" |
| probability symmetry: drop the irrelevant player, the rest is a fair coin | `symmetry-probability` — the general statement; the sighting was one instance of it |

#### Dropped as too narrow

- pair consecutive factorials, $k!\,(k+1)! = (k!)^2(k+1)$, to expose square factors. One problem's
  algebra. It reads as a solution, not a pattern, which is exactly what the first bar above rejects.

#### Open candidates

| gap | kind | sightings | nearest existing card |
|---|---|---|---|
| unwind a recursion that terminates only on a sparse set of inputs into a closed form on each interval between them | **method** | 2021 II #15 | none; `first-order-recurrence` and `linear-recurrence` both assume a fixed-step recurrence |
| invert a digit-sum condition using the fact that the least positive integer with base-$b$ digit sum $s$ is strictly increasing in $s$ | **method** | 2020 II #5 | none; `base-conversion` handles representation, not this monotonicity |
| in a regular polygon the circumradius, the apothem and half a side form a right triangle, so $R^2 = a^2 + (s/2)^2$ | formula | 2009 12A #19 | **one clause on `regular-polygon-area`**, which names the apothem but never relates it to $R$ and $s$. It is why the annulus between a regular polygon's two circles depends only on the side length, not on the number of sides |
| reflecting a graph in $y = x$ gives the inverse relation, so a graph symmetric about that line is its own inverse | formula | 2024 12A #25 | **one clause on `reflection-coordinates`**, which gives the point-level swap $(x,y) \to (y,x)$ but not the function-level reading. No card in the library mentions inverse functions at all |

Detailed per-year findings and the defect tally live in `tools/RETAG-NOTES.md`.

## Propose, do not build, for coverage gaps

The register under "Recording missing coverage" is the queue. A gap found while reading AMC or
AIME solutions gets written there, classified, with its sighting, and waits. Fixing a defect,
retagging a problem, and improving a card that already exists are not additions and do not wait.

The reason is concrete: a batch of unreviewed card additions in one sitting introduced a
misplaced subsection, a Key forms block on a formula card, bold that rendered as literal
asterisks, and British spellings into an American corpus, all of which then had to be unpicked.
A register line costs a sentence; an unwanted card costs a cleanup across five files.

### Done, recorded here because the reasoning is worth keeping

**Viviani's theorem now states the cases it was hiding.** The card gave only the interior case.
Counting a distance as negative when $P$ lies beyond that side makes $d_1 + d_2 + d_3 = h$ true
for every point of the plane, by the same area decomposition read with signed areas, and the
same decomposition on a general triangle gives $a\,d_a + b\,d_b + c\,d_c = 2[ABC]$, of which
Viviani is the equilateral case. The widget was actively hiding this: it clamped $P$ back inside
the triangle, so the outside cases were unreachable and a constant sum looked like a property of
interior points. It now lets $P$ go anywhere, draws a negative distance in red, extends a side
dashed to its foot when the perpendicular lands past the segment, and marks each foot with a
right-angle bracket. Verified over a grid of 7,326 points covering all three regions: the signed
sum equals the altitude to $1.1 \times 10^{-13}$ px.

**Three hub cards were restating facts that other cards own.** Found by sorting write-ups by
length, which is a decent proxy for a card doing two jobs. `angle-chasing` re-explained the
cyclic-quadrilateral fact, `solid-tactics` re-explained taking a cross-section and unfolding a
net, and `symmetric-polynomial-strategies` linked roots-of-unity *filtering* to the general
`roots-of-unity` card rather than to `roots-of-unity-filter`. That last one is a mis-targeted
link, the same defect class as tagging a problem with the wrong card: it sends the reader to
study the adjacent thing. All four now point at the owner.

The four angle-chasing facts with no owning card (triangle sum, exterior angle, isosceles base
angles, parallel-line transfer) are correctly owned by the hub. They sit below the library's
floor as standalone cards.

**A generic alias is worse than no alias.** Adding `cross-section` as an alias so the linker
could find that card produced nine candidates of which seven were the everyday geometric term,
not the method: "the geometric-mean cross-section", "every cross-section parallel to the base".
It went on the denylist with `quadratic` and `pick`, and the two genuine links were written by
hand. Reword the prose to match a *specific* alias, or hand-write the link; do not widen an
alias until it matches common nouns.

## One topic, two cards: technique and facts

A topic that has both *a thing you do* and *a body of results* belongs on **two cards that link
to each other**, not on one card that grows until neither half is findable. The absolute-value
material is the worked example:

| card | kind | owns |
|---|---|---|
| `abs-value-graphing` — Graphing Absolute Value Transformations | **method**, Additional Tools | what a bar does to a *graph*: $f(\|x\|)$ mirrors, $\|f(x)\|$ folds, $\|y\|=f(x)$ doubles; shifts and stretches; peel from the innermost bar; count solutions by sliding a horizontal line |
| `abs-value-relations` — Graphing Absolute Value Relations | **method**, Additional Tools | what a bar does to a *region*: the symmetry that deletes the bars ($x \to -x$ changes nothing, so solve one quadrant and mirror), how a nested bar places copies, and the two shapes worth knowing by sight |
| `absolute-value-rules` | formula, Algebra | the one-variable algebra: $\|x\| \lt a$ as a band, $\sqrt{x^2} = \|x\|$, $\|A\|=\|B\| \iff A = \pm B$ |

The name carries its half of the split: that card is called *Transformations*, not *Equations*,
because transformations are all it covers. A name broad enough to cover the whole topic would
invite the material back in.

Two rules make the split work, and both were violated before this was written down:

1. **No overlap in ownership.** `abs-value-graphing` used to explain the $\|x\|+\|y\|=k$ diamond
   itself. Duplicated material drifts, and it means a reader searching for the area lands on the
   card that treats it as an aside. It now hands that off in one sentence.
2. **Link both ways, and write the sentence first.** A bare "see also" is not enough: say *why*
   the other card is the next thing you want. But write the sentence you would write anyway —
   see the linking rules below, because an earlier version of this rule is what bent a dozen
   sentences out of shape.

Overlapping *practice problems* are fine and expected — one AMC problem routinely wants the
transformation from one card and the area formula from the other. It is overlapping
**explanation** that is the defect.

When you are about to add a fourth bullet to a card that is already carrying two different jobs,
that is the signal to split instead.

## To-do

Recorded, not built. Each has its research already done so it can be picked up cold.

### The 3D British Flag theorem belongs on `british-flag-theorem`

The card says the planar statement "holds even if $P$ is outside the rectangle or off its plane".
That is a weaker claim than the **box** version, which is what 2021 AIME I #6 actually wants: for a
rectangular box, the sums of squared distances to *diagonally opposite* vertices all agree,

$$PA^2 + PG^2 = PB^2 + PH^2 = PC^2 + PE^2 = PD^2 + PF^2.$$

Applying it twice gives the form that problem uses, $2PA^2 + PG^2 = PB^2 + PC^2 + PD^2$. Put the box
form in the latex. Once it is there, 2021 I #6 could reasonably be tagged to this card instead of
to `coordinate-bash` — right now it is not, because the card does not state what the problem needs.

### A way to draw real 3D figures

The honest finding is the opposite of the obvious guess: **stay in SVG and put the 3D in the
coordinates.** Projecting real $(x,y,z)$ points down to 2D gives genuine three dimensions, and it
keeps every existing pass working. A rotatable figure is reachable too, since `mountGeo`
(`js/geo-interactive.js:79`) already maps pointer events through `getScreenCTM().inverse()`, so a
drag could set azimuth and elevation instead of moving a point.

**What exists now.** No projection maths, no `<canvas>`, no WebGL, no CSS 3D anywhere in the app.
All 19 Solid Geometry cards fake depth by hand, and four of them independently open-code the *same*
oblique box shift with *different* tuned constants — `dx,dy` of `70,50`, `65,45`, `60,45`, `64,48`
at `js/data/diagrams/geometry-diagrams.js:976`, `:1339`, `:2118`, `:1429`. Tetrahedra are four
literal screen points; round solids use a squashed ellipse; `regular-octahedron` says
`// Schematic projection:` outright. A shared projector would unify all of that.

**There is working prior art, used once and never generalised** —
`js/data/diagrams/geometry-diagrams.js:3431`, inside `plane-intercept-form`:

```js
const ex = [-0.62, 0.36], ey = [1, 0.17], ez = [0, -1];
const P = (u, v, w) => [O[0] + ex[0]*u + ey[0]*v + ez[0]*w, O[1] + ex[1]*u + ey[1]*v + ez[1]*w];
```

**What it would take:** roughly 60–100 lines in the shared helper block — `P(x,y,z)`, 3-vector
`add3/sub3/cross3/norm3`, faces emitted back-to-front by centroid depth, and a hidden-edge test so
occluded edges come out dashed the way the hand-drawn boxes already do.

**Why not canvas, CSS 3D or WebGL.** `MATH_DIAGRAMS` entries are inert HTML strings inserted by
`innerHTML` in three places (`js/app.js:1933`, `:2387`, `:2512`) with **no mount hook**, and the
same string can be live in two places at once (card face plus hover preview). So any non-SVG
surface needs a new mount contract, device-pixel-ratio handling, and a theme-redraw hook — the
theme toggle (`js/app.js:3416`) re-renders nothing today, because SVG recolours for free from CSS
variables. On top of that, all three lose the same four working features:

- **copy-asy silently no-ops.** The button still appears, since `hasDiagram` only checks that a
  `MATH_DIAGRAMS` entry exists (`js/app.js:2484`), but the handler finds zero `svg` elements
  (`js/app.js:3571`) and neither copies nor reports a failure.
- **Label de-collision stops running** — `tidyDiagrams` selects `".diagram svg"` (`js/app.js:1668`).
- **Dead-height trimming stops** — `cropDiagramHeight` rewrites a viewBox (`js/app.js:1685`).
- **The out-of-viewBox check has no analogue**, and that check is the acceptance test the diagram
  checklist above depends on.

One gotcha for whoever builds it: `tidyDiagram` re-appends every filled circle of radius $\le 7$ to
the end of the SVG (`js/app.js:1702`), so a vertex dot drawn *behind* a face gets hoisted in front
of it. Use a larger radius or an unfilled marker on projected solids.

## Filing: what goes where, and the moves already made

The Formulas / Additional Tools split is decided by the **section's** `group` field
(`js/app.js:242`), not by a card's `type`. A card's `type` only paints its badge, so a
`type: "method"` card left in a subject file would render inside Formulas wearing a METHOD
badge and nothing in code would stop it. The invariant is therefore worth checking by hand after
any move: no `type:` field may appear in the four subject files at all.

**The test is the card's content, not its name.** A card whose body is a procedure is a method;
a card whose body is a stated result is a formula, however verb-shaped its title.

Moved into `patterns.js` as methods, because each body is a procedure:

| card | was | why |
|---|---|---|
| `area-method` | Geometry → Triangle Areas & Radii | its own keywords say "area method", "mass points alternative", "method"; the results it quotes are owned by the cevian-ratio cards |
| `factor-pair-counting` | Number Theory → Diophantine & Additive | "rearrange into a product, then count divisor pairs"; its one stated fact belongs to `number-of-divisors` |
| `double-summation` | Algebra → Sequences & Series | "the three moves that turn most intimidating double sums into routine ones" |
| `rationalizing` | Algebra → Floors, Radicals & Absolute Value | gerund name, and its sibling `denesting-radicals` was already a method |

**Deliberately left as formulas**, despite procedure-shaped names: `linear-recurrence`, whose
latex states four closed forms (distinct roots, repeated root, complex pair) and so is a body of
results; and `euclidean-algorithm`, whose content is the identity
$\gcd(a,b) = \gcd(b, a \bmod b)$. Both are bedrock that readers expect to find in their subject.

Subsections corrected at the same time. The pattern in most of them is a card filed by an
adjacent keyword rather than by its content:

- four "any quadrilateral" results (`van-aubel`, `varignons-theorem`, `euler-quadrilateral`,
  `bretschneiders-formula`) sat under *Cyclic & Tangential* Quadrilaterals; `van-aubel` says
  "even non-convex" in its own description. All four now sit under Polygons & Quadrilaterals.
- `pascals-theorem` is a projective result about a hexagon in a conic and now sits beside its
  dual `brianchon-theorem` in Projective Geometry; `harmonic-quadrilateral` joins it there,
  since its content is poles, tangents and a harmonic division, not triangle centers.
- `floor-multiples` is divisibility counting and moved out of Primes, Factorials & Valuations.
- `plane-regions` joined `moser-circle` in Advanced Counting; they are one topic.
- `zeckendorf-theorem` moved **files**, from `counting.js` to `number-theory.js`, next to
  `pisano-periods` and `beatty-theorem`. Its write-up moved with it, because details files are
  organized by subject rather than by section — the same treatment `recognition-numbers` got.

A move is safe for everything keyed by card id (problem tags, `TAG_GROUPS`, diagrams, examples,
cross-links), so the checks that matter afterwards are: every card still has exactly one
write-up, no duplicate ids, and the breadcrumb on the rendered page reads as intended.

## Writing a cross-link

`linkifyCards` (`js/app.js:2324`) renders `[[id|label]]` with **`label` verbatim**. The visible
text therefore has nothing to do with the target's name, and never did. Two hard constraints:

- **A label may not contain maths.** The function splits on `$…$` *before* matching `[[…]]`, so
  `[[id|the $n$th root]]` never matches its own pattern and the reader sees raw markup. An
  unpaired `$` anywhere in a label is worse: it shifts the split parity and corrupts every link
  after it in that block.
- **A label may not contain another link.** The label pattern `([^\]]*)` stops at the first `]]`,
  so a nested link prints its own markup. There was exactly one of these and it is now fixed.
- `[[id]]` with no label prints the card's **full formal name**, which is usually too long to sit
  in a sentence. Nothing in the corpus uses that form; prefer `[[id|natural phrase]]`.

### The rule

**Write the sentence you would write anyway, then attach the link to whatever phrase it already
contains.** If `python3 tools/build-cross-links.py --report` happens to find the phrase, let it
make the link. If it does not, hand-write `[[id|the natural phrase]]`. **Do not reword a sentence
so the matcher can find a literal card name.**

This replaces an earlier rule that said never to hand-write a link. That rule caused real damage,
and it is worth knowing what it looked like so it is not reintroduced:

- **Formal card names dropped mid-sentence.** "see [[…|absolute-value regions in the plane]] for
  the shapes those cut out" — a five-word card title used where "the two-variable case" says it
  better. (That card has since been reworked into `abs-value-relations`; the link now reads
  "see [[abs-value-relations|the two-variable case]]".)
- **Card titles used as parts of speech they do not fit** — as the subject of a verb ("*graphing
  absolute value transformations* uses in one variable…"), or as a predicate ("the modular case
  is *periodicity mod m*").
- **Prose about cards instead of about mathematics** — "this card hands off to", "which lives on
  the … card", "that is this card".
- **Clauses restated so the matcher had a phrase to hit.** Eight sites said the same thing twice
  in a row, e.g. "…keep pairing up — which is why incentre and circumcentre, or centroid and
  symmedian point, keep appearing in pairs." Those restatements have been deleted.

### Density and correctness

- **One link per host card per target.** The generator enforces this within a run and across runs
  (it seeds its `taken` set from the markup already in the body), which means **`--report` can
  never surface a violation** — a hand-written duplicate is invisible to it. There were 30; they
  are gone. Check with a one-off scan over `entries_of`, not with `--report`.
- **A link must point at the card that owns the idea**, which is the same standard as tagging a
  problem. Four links pointed at a near neighbour: "polar form" of a complex number at the
  projective `pole-polar` card, $v-e+f=2$ at the complex-numbers `eulers-formula` instead of
  `eulers-polyhedron-formula`, "symmedian point" at `symmedian-lemoine` instead of
  `lemoine-point`, and multi-pile Nim at the single-pile `losing-positions` instead of
  `sprague-grundy`. A generated link is a *candidate*; review decides the target.
- **Never widen an alias until it matches a common noun.** Adding `cross-section` produced nine
  candidates of which seven were the everyday geometric term. It is on the denylist with
  `quadratic` and `pick`, and the two real links were hand-written.
- A terse label is acceptable when it is established contest shorthand — `casework`, `CRT`,
  `Vieta`, `Ceva`, `AM-GM`, `LTE`. 163 of the links use one-word labels and most read correctly.

## Measuring search: the cache trap

`js/search-semantic.js` fetches `search-vectors.json` and `.bin` **from JavaScript**, so for a
long time they never picked up the `?v=` bump every asset in `index.html` carries. A stale
vector table does not look broken — it still ranks, just against the wrong corpus — so every
relevance measurement taken against it is quietly invalid. This was caught in the act: the
browser was serving a **490-card** table while the corpus had reached **499**, and the eval
harness reported a regression that the fresh index did not have.

Both fetches now pass `{cache: "no-cache"}`, which forces an `If-None-Match` round trip and
returns `304` with the cached body when nothing changed — so the 5 MB is not re-downloaded and
there is nothing to remember to bump. Before trusting any eval number, confirm the index the
page actually loaded:

```js
window.MathSemantic.load();            // then, once status() === "ready":
window.MathSemantic.info()             // { cards, words, ... } must match the build output
```

If `cards` does not equal the card count `validate-problem-db.js` reports, stop — the number
you are about to read is meaningless. The same trap already bit `eval-queries.json` once, which
is why `tools/search-eval.html` carries its own cache-buster.

### Standing state, measured 2026-09-11 against a verified-fresh index

**154/171 top-1, 97.1% top-3, MRR 0.936**, name and jargon 100%, paraphrase 90.6%. Three
regressions are long-standing and accepted; the fourth is new and **not** attributable to the
cards added that day:

- `ratio between circumradius and inradius` expects `euler-distance-theorem`, which now sits at
  **rank 7 fused / 12 lexical**, behind `equilateral-triangle-facts`, `right-triangle-inradius`,
  `regular-tetrahedron` and `triangle-half-angle-identities`. It is present in the **lexical**
  ranking too, so it is content growth in those cards — not a semantic drift and not the new
  cards, which contain none of "ratio", "circumradius" or "inradius". Left unfixed deliberately:
  this query has already cost one reverted promotion (the $\frac rR$ clause in `inradius-area`),
  so it should be addressed by a measured change, not by eye.

Do **not** press "Download as baseline" to make a regression disappear. The baseline is the
record of what was true when the ranking was last deliberately tuned.
