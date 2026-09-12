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
   you matched closes the subsection rather than the card. `taxicab-region` went into "Rates,
   Work & Mixtures" this way. Verify with the subsection titles, do not assume:

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

4. **Add the example to `examples-supplement.js`**, never to a card's dead `example:` field.
   Those 143 fields were deleted precisely because they were shadowed and drifting.

5. **A figure goes through the diagram DSL**, one canvas size for every panel on a card, and a
   `cap()` on every panel. Then confirm on the rendered page that no text is drawn outside its
   viewBox and that every panel has its caption.

6. **Run, in order:** `jsc` each edited file (a `window` ReferenceError means the parse
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

### Where new cards go

A card for a **technique** belongs in `js/data/patterns.js` with `type: "method"` (or
`"pattern"`) and a `subject`, so it lands under Additional Tools. Only genuine formulas go in
the four subject files. Dumping techniques into the formula sections is exactly what the
Additional Tools split exists to prevent.

### Recording missing coverage

When a problem's best solution uses something the library has no card for, **record it here**
before moving on, with the sighting that produced it. A single sighting is a candidate; a
second sighting is usually enough to justify writing the card. Classify it when you record it,
because that decides where the card goes:

- **formula** — a stated result, goes in one of the four subject files
- **method** — a technique you apply, goes in `patterns.js` with `type: "method"`
- **pattern** — a recognisable problem shape, goes in `patterns.js` with `type: "pattern"`

#### Written so far

| gap | kind | sightings | nearest existing card |
|---|---|---|---|
| order of a permutation is the lcm of its cycle lengths; count by cycle type | formula | 2026 I #7 | *written* — `permutation-cycle-structure` |
| find where a sequence peaks by the consecutive ratio crossing 1 | **method** | 1991 #3 | *written* — `largest-term-ratio` |
| two tangent circles: the touch point is on the line of centers, so $d = R \pm r$ | formula | 2023 12A #18, and bedrock throughout | *written* — `tangent-circles` |
| $|x|+|y| \le c$ is a tilted square of area $2c^2$, and each nested absolute value reflects the region across an axis | formula | 2023 12B #9, 2022 12A #5 | *written* — `taxicab-region` |

#### Open candidates

| gap | kind | sightings | nearest existing card |
|---|---|---|---|
| a step of size $k$ around an $n$-cycle splits into $\gcd(n,k)$ cycles | formula | 2025 II #11 | none |
| perpendicular bisector of a chord passes through the center | formula | 2024 I #5 | `chord-length` states the distance, not the locus |
| probability symmetry: drop the irrelevant player, the rest is a fair coin | **pattern** | 2026 II #7, 2026 I #9 | `symmetry-probability`, loosely |
| homogenise a two-variable equation by dividing by $y^2$ and solve for the ratio | **method** | 2025 I #4 | none |
| pair consecutive factorials, $k!\,(k+1)! = (k!)^2(k+1)$, to expose square factors | **method** | 2023 10B #15 | none |
| a polyline whose every segment makes the same angle $\theta$ with a direction has net displacement (total length)$\cdot\cos\theta$ | **method** | 2023 12A #15 | `projection-formula` states it for a triangle only |
| unwind a recursion that terminates on a sparse set (perfect squares, powers of 2) into a closed form on each interval between terminators | **method** | 2021 II #15 | none; `first-order-recurrence` and `linear-recurrence` both assume a fixed-step recurrence |

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
| `taxicab-region` — Absolute-Value Regions in the Plane | **formula**, Algebra | what a bar cuts out of the *plane*: the tilted square and its area and lattice count, $\max(\|x\|,\|y\|)$ untilted, the rhombus, the taxicab disc, and the symmetry that deletes the bars ($x \to -x$ changes nothing, so solve on $x \ge 0$ and mirror) |
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

- **Formal card names dropped mid-sentence.** "see [[taxicab-region|absolute-value regions in the
  plane]] for the shapes those cut out" — a five-word title used where "the two-variable case"
  says it better.
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
