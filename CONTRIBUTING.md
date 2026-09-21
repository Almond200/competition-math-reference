# Authoring conventions

> **Adding a card? Read [CONVENTIONS.md](CONVENTIONS.md) instead.** It is the short checklist:
> the two legal field orders, the three required write-up headings, the mandatory example, the
> diagram rule for geometry, and the duplicate check — each with the measurement across all 535
> cards that proves it, regenerable with `python3 tools/scan-conventions.py`. This file holds the
> reasoning, the coverage-gap register and the per-year retag notes, which is why it is long.


House style for writing cards. Moved out of the README, which is for readers of the
reference rather than people editing it.

## Write-up style

**Four headings, and no fifth.** A write-up uses `## Why it works`, `## How to use it`,
`## On contests`, and optionally `## Key forms`. Do not invent another one. A card may gain or
lose its Key forms block as its content changes — that is not "adding a subsection", which is
what this rule is about. Census across 535 write-ups: Why it works 535, On contests 535, How to
use it 535, Key forms 107, and one sanctioned exception (`mean-chain` carries a `## Full proof`
holding complete proofs of the four mean inequalities, which genuinely is not a "why it works").

- **Key forms is not a default section.** It belongs to cards that are a technique or a bundle
  of related statements, which in practice means methods and patterns: 93 of the 100 cards in
  `patterns.js` have one, against 11 of the 418 in the subject files. A formula card whose latex
  already shows the statement does not get one; put the material in the prose instead.
- Key forms lists the shapes a technique takes, not examples of it. This is now gated:
  `scan-conventions.py` fails on a bullet that is mostly concrete digits. Exactly one existed
  (`squared-binomial-sum` carried "row $n = 4$: $1+16+36+16+1=70$"), so the rule was being kept
  by habit rather than by anything enforcing it.
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

An entry is `{ ref, formulas, strategy }`, optionally carrying `trick` and `trickFormulas` too —
no problem statement, just a link out to AoPS. The `formulas` list is a claim about **how the
problem is best solved**, so it has to be earned.

### Formulas and Strategies, or a Trick

`formulas` holds the most basic tools needed to solve the problem *the appropriate way*. That is
not the theoretical minimum. Nearly every geometry problem reduces to similar triangles, the
Pythagorean theorem and some trig, and tagging it that way tells a reader nothing about how to
attack it. Tag the route a good solver would actually take under time.

`trick` holds a shortcut: a second route, faster than the tagged one, that leans on something a
solver would not normally reach for. Most problems have none, and the section only appears when
one is recorded. It is written after `strategy` in the entry, and its cards go in
`trickFormulas`. Both halves are required together — the validator rejects prose without cards
and cards without prose, since a card with no prose puts a problem on a card page with nothing
explaining why it is there.

**The dividing line is feasibility, not obscurity.** If the problem cannot reasonably be solved
without a particular result, that result is a *formula*, however obscure: Pell's equation,
Lucas' theorem and the roots-of-unity filter are formulas on the problems that need them. A
result is a *trick* only when a standard route exists and the result merely beats it. So the
test is not "is this famous?" but "could a solver get there without it?" — British Flag on
2021 I #6 is a trick because the coordinate bash works; Burnside on 1993 #8 is a trick because
constructing and repairing the overcount works.

A card tagged only in `trickFormulas` still lists the problem among its practice problems, and
the row is not marked out in any way. That is deliberate: the obscure cards are the ones a main
route never reaches for, so tricks are the only way many of them acquire a worked use, and the
problem's own page is where the trick route is labelled.

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
| triangular numbers, $T_n=\frac{n(n+1)}2$, and $T_{n-1}+T_n=n^2$ | formula | 1994 #3 | `triangular-numbers` (Sequences & Series); it unblocked the trick route on 1994 #3 |
| Euclid's lemma, $\gcd(a,b)=1$ and $b \mid an \implies b \mid n$ | formula | 1994 #12, 1992 #11 | `euclids-lemma` (Divisibility & GCD) |
| composing two reflections in lines at angle $\theta$ is a rotation by $2\theta$ | formula | 1992 #11 | `reflection-composition` (Coordinate & Grid Geometry) |
| multi-leg distance-rate-time: the leg times $\frac{d_i}{v_i}$ add to the total while the distances add to $D$ | **method** | 2013 I #1, 2012 I #4, 2012 II #4, 2008 II #2 | `multi-leg-rates` (Methods › Algebra). 2007 I #2 was recorded as a fifth sighting and was a mis-sighting: each walker there moves at a single speed, so nothing is multi-leg. It is retagged on `casework-method`, its actual crux |
| counting with a uniform overcount: build every object exactly $k$ times, divide by $k$, and repair the objects built fewer times | **method** | 1997 #10, 2002 I #5, 1993 #8 | `uniform-overcount` (Methods › Counting & Probability) |
| adding two numbers drops the digit sum by $9$ per carry, $s(a+b)=s(a)+s(b)-9c$ | formula | 2015 I #8, 1999 #5 | `digit-sum-carries` (Bases, Digits & Decimals) |
| a symmetric or cyclic linear system: add all $n$ equations to collapse the symmetric part into the grand total, or substitute around the loop | **method** | 1986 #4, 1986 #14, 2024 II #4, 2024 10B #25 | `symmetric-linear-system` (Methods &rsaquo; Algebra). All four had been tagged with whatever the surrounding algebra happened to be |
| expanding a determinant along its sparsest row, which turns a banded family into a linear recurrence | **method** | 2011 II #11 | `cofactor-expansion` (Methods &rsaquo; Algebra). 2011 II #11 hands you a tridiagonal matrix outright and was tagged `linear-recurrence` alone |
| orthogonal projection onto a plane multiplies every area by $\cos\theta$, so a slanted section is its shadow divided by $\cos\theta$ | formula | 2015 I #15, 2019 HMMT Feb Geo #9 | `projected-area-cosine` (Solid Geometry). **Two of this row's original sightings were wrong and were dropped on reading them**: 1996 #4 is a point-light shadow, which is a central projection scaling by similar triangles, and 2008 II #11 projects a length rather than an area |

#### Closed by a clause on a card that already existed

| gap | resolved on |
|---|---|
| perpendicular bisector of a chord passes through the center | `equal-chords-arcs` — it carried the forward direction, not the locus reading that finds a circumcenter |
| a step of size $k$ around an $n$-cycle splits into $\gcd(n,k)$ cycles | `permutation-cycle-structure` — it reasoned about orbits but never stated the count |
| a polyline whose segments share an angle has net displacement (length)$\cdot\cos\theta$ | `projection-formula` — it stated the triangle case only |
| in a regular polygon, $R^2 = a^2 + (s/2)^2$ | `regular-polygon-area` — it named the apothem without relating it to $R$ and $s$. The clause also records why the annulus between the two circles depends only on the side length |
| reflecting a **graph** in $y = x$ gives the inverse relation | `reflection-coordinates` — it had the point-level swap $(x,y) \to (y,x)$ but not the function-level reading |
| the three-dimensional lattice-crossing count | `lattice-points-gcd` — the same inclusion-exclusion one dimension up. 1996 #14 was tagged `gcd-lcm-product`, which is the product identity and is not used there; it now carries `lattice-points-gcd` |

#### Closed as already covered

| gap | already stated by |
|---|---|
| homogenize a two-variable equation by dividing by $y^2$ and solve for the ratio | `normalization` — "only the ratios matter, so you may fix one quantity for free" |
| probability symmetry: drop the irrelevant player, the rest is a fair coin | `symmetry-probability` — the general statement; the sighting was one instance of it |
| alligation: the mixing volumes split in inverse ratio to the distances from the target concentration | `weighted-average` ("Weighted Averages & Mixtures") — states the mixing ratio $\frac{w_1}{w_2} = \frac{x_2-\bar x}{\bar x-x_1}$ and names the alligation seesaw outright. It was recorded as missing because the search looked in the "Rates, Work & Mixtures" subsection, where it is not; the card sits in algebra. Search by keyword, not by section |
| the inclusion-exclusion principle | `pie` ("Principle of Inclusion-Exclusion (PIE)", `patterns.js`) — it carries the full alternating form, a Key-forms write-up and an example, and was already tagged on about twenty problems. **A card was built before this was caught, then removed.** The search that "proved" it missing was `grep -riE 'inclusion' js/data/*.js | head -8`, and the eight lines it printed were all keyword hits from other files; `patterns.js` came later in the output and was cut off. Never pipe a does-this-exist search through `head`, and search card names across `patterns.js` as well as the four subject files, since a card's id can be nothing like its name |
| the ratio of adjacent binomial coefficients, $\frac{\binom n{k+1}}{\binom nk}=\frac{n-k}{k+1}$ | folded into `pascals-identity`, which already owned the other two relations between binomial coefficients (the additive one between rows, and the symmetry). **A separate card was built first and removed**: read next to `largest-term-ratio` it plainly duplicated it, since that card already claims binomial terms as its usual target. A new card must be distinguishable from its neighbours on the page, not just absent from the index |

#### Dropped as too narrow

- pair consecutive factorials, $k!\,(k+1)! = (k!)^2(k+1)$, to expose square factors. One problem's
  algebra. It reads as a solution, not a pattern, which is exactly what the first bar above rejects.

#### Open candidates

| gap | kind | sightings | nearest existing card |
|---|---|---|---|
| unwind a recursion that terminates only on a sparse set of inputs into a closed form on each interval between them | **method** | 2021 II #15 | none; `first-order-recurrence` and `linear-recurrence` both assume a fixed-step recurrence |
| invert a digit-sum condition using the fact that the least positive integer with base-$b$ digit sum $s$ is strictly increasing in $s$ | **method** | 2020 II #5 | none; `base-conversion` handles representation, not this monotonicity |
| a circle of radius $r$ rolling without slipping around the outside of a radius-$R$ circle turns through $\frac Rr + 1$ full rotations, not $\frac Rr$ | formula | 2014 I #10 | none; the coin-rotation count appears nowhere, and `circle-basics` gives only $\text{arc} = r\theta$ |
| the full solution set of a basic trig equation: $\sin\theta = \sin\alpha$ exactly when $\theta = \alpha + 2\pi k$ or $\theta = \pi - \alpha + 2\pi k$, with the analogous families for cosine and tangent | formula | 2002 II #10 | none; `common-angle-values` gives the value table and the reference-angle rule, and the addition and double-angle cards give identities, but no card states which angles share a given sine |
| a $3\times3$ magic square's center is one third of the common line sum, and any two cells symmetric about it add to twice the center | formula | 1996 #1 | none; nothing in the library mentions magic squares, so the nearest owner used was `proportion-properties` for the averaging step |
| a sum over all tuples of a product of per-coordinate terms factors into a product of per-coordinate sums, $\sum_{d_1,\ldots,d_k}\prod_i f(d_i) = \prod_i\left(\sum_d f(d)\right)$ | **method** | 1994 #5 | none states it directly. `sum-of-divisors` is the most familiar instance ($\sigma$ as a product of geometric sums) but presents it as a divisor formula, and `generating-function-method` is the coefficient-extraction version, which hides that the same expansion evaluated at $1$ totals every tuple |
| the number of ways to split $n=ab$ with $\gcd(a,b)=1$ is $2^{\omega(n)}$, since each prime power must go wholly to one side; halve it for unordered or for $a\lt b$ | formula | 1991 #5 | none. `number-of-divisors` gives $d(n)=\prod(e_i+1)$ from the same factorization, but counts every divisor rather than the coprime splits, and no card mentions $\omega(n)$, the count of distinct primes |
| the combinatorial reading of the Fibonacci numbers: tilings of a $1 \times n$ strip by squares and dominoes, and binary strings with no two adjacent $1$s, both number $F_{n+2}$ | **method** | 1990 #9 | **partly a misrecord, now corrected.** `binets-formula` does carry the sequence and its identities (closed form, Cassini, $\gcd(F_m,F_n)=F_{\gcd(m,n)}$, $\sum F_i = F_{n+2}-1$) and its keywords include Fibonacci, so the earlier claim that nothing covered Fibonacci was wrong. It was found by searching card *names* only. What is genuinely absent is the counting interpretation, which is how the sequence actually enters AMC/AIME problems; `binets-formula` is purely algebraic and `non-adjacent-selection` gives only the fixed-$k$ closed form |
| the cotangent rule, $\cot A = \frac{b^2+c^2-a^2}{4K}$, whose immediate corollary is $\cot A + \cot B = \frac{c^2}{2K}$ | formula | 1989 #10 | none. It follows in one line from `law-of-cosines` and `trig-area` together, and those two are what 1989 #10 is tagged with, but no card states it. It is the standard way any $\cot$-of-a-triangle expression collapses to side lengths, so the derivation gets redone every time |
| an extremal set cut out by gap conditions is bounded by its densest periodic block: find the shortest repeating window, work out the most elements it can hold, then tile the range with copies and add the tail | **method** | 2024 10A #20 | none. `gap-method` supplies the minimum-gap bookkeeping and is what that problem is tagged with, but it counts selections of a fixed size rather than maximizing the size, and no card states the tile-the-range bound |
| the center of a rotation is equidistant from every point and its image, so it is the intersection of the perpendicular bisectors of the point-image segments | **method** | 2023 10A #19 | none. `distance-midpoint` is what the problem is tagged with because squaring the two distance equations is how the center is actually found, and `reflection-composition` shows a rotation arises from two reflections, but no card gives the perpendicular-bisector locus. The register already carries the chord version of the same locus idea as a clause for `equal-chords-arcs` |
| a region swept by independently varying parameters is the Minkowski sum of the segments they generate, and a sum of segments is a zonogon whose sides come in opposite parallel pairs, one pair per generator, so its perimeter is twice the total generator length | **method** | 2023 10B #24 | none. `affine-transformations` covers what a linear map preserves but never the image of a region, `minkowski-lattice` is the lattice-point theorem and unrelated, and the problem is tagged `distance-midpoint` only because measuring the three generators is the arithmetic that remains |

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

### The 3D British Flag theorem belongs on `british-flag-theorem` — DONE 2026-09-20

The card said only that the planar statement "holds even if $P$ is outside the rectangle or off its
plane", which is weaker than the box version 2021 AIME I #6 actually uses. The latex now carries

$$PA^2 + PG^2 = PB^2 + PH^2 = PC^2 + PE^2 = PD^2 + PF^2,$$

and the description gives the doubled form $2PA^2 + PG^2 = PB^2 + PC^2 + PD^2$.

**No retag followed, and the original note was wrong about why.** It claimed 2021 I #6 "could
reasonably be tagged to this card instead of to `coordinate-bash`". Reading the entry, the problem
already carries `british-flag-theorem` in `trickFormulas`, with trick prose that derives exactly
this box form. That is the correct classification under the rule in CONVENTIONS &sect;11 — the
dividing line is feasibility, and coordinate-bashing it is entirely feasible, so British Flag is a
shortcut over a standard route rather than a required tool. The real gap was that the card did not
state what its own trick used.

### A way to draw real 3D figures — BUILT

The recommendation below was followed and the helpers now exist in
`js/data/diagrams/geometry-diagrams.js`: `proj3(O, scale, axes)` returns a `(x, y, z)` projector,
`depth3` orders points front to back, `box3` emits a wireframe box with the hidden corner's three
edges dashed, and `AX3` / `AX3_ISO` are the two axis sets. First uses: the box panel on
`british-flag-theorem` (the form 2021 I #6 actually needs) and the five-sphere panel on
`descartes-sphere-theorem`. See CONVENTIONS.md §4 for the two rules that came out of building them.
The nineteen hand-tuned Solid Geometry figures are still hand-tuned; converting them is optional
and should only happen where a figure is actually wrong.

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

## Persisted state must never be rebuilt from loaded data

Two bugs of the same shape destroyed user data, and both were invisible to every gate. The rule
that prevents a third: **anything read from `localStorage` may only be written back by merging into
it. Never rebuild it from something derived from the data files**, because those files can fail to
load and the derived thing is then empty.

- **`loadLists()` pruned saved list ids against `BY_ID`.** `BY_ID` comes from
  `window.MATH_SECTIONS`, which is `[]` when a data script does not run, so one mistyped `?v=` or a
  half-populated cache emptied every list in memory -- and the next `saveLists()`, one star-click
  away, made it permanent. **Reproduced before fixing**: with `number-theory.js` missing, a
  five-card list fell to two after a single click, and restoring the file did not bring the three
  cards back. The prune was also redundant: every render path already does
  `.map(id => BY_ID[id]).filter(Boolean)`, so an unresolvable id is invisible rather than broken
  and returns intact when the data does. Displayed counts now use `liveCount()`, which filters for
  display only and leaves storage alone.
- **`saveSettings()` rebuilt `out.sections` from `SECTION_IDS`.** Same derivation, same failure:
  on a page where the data did not load it wrote `sections: {}` and erased all six per-section
  filters, on the reader's first click. It now reads the stored object and merges into it, so keys
  the current page cannot see survive.

Two smaller failure paths were closed at the same time, both of which failed **silently**, which is
what made them worth finding:

- `saveLists()` and `saveSettings()` swallowed every exception. Safari private browsing and a full
  quota both throw, so a reader could build a thirty-card list, close the tab and lose it having
  been told nothing. Both now return a boolean and route failure through `storageFailed()`, which
  toasts **once per session** -- repeating it on every click would be worse than silence.
- Both copy buttons called `navigator.clipboard.writeText(...).then(...)` with no `.catch()`.
  That API is secure-context-only, so on a plain-http origin -- a classroom or LAN server --
  `navigator.clipboard` is `undefined` and the click threw a TypeError the reader never saw.
  `copyText()` now tries the modern API, falls back to a hidden-textarea `execCommand`, and toasts
  if both fail. Deliberately no global `unhandledrejection` handler: a catch-all would hide the
  next bug of this kind instead of surfacing it.

Finally, `?debug=1` now warns when `MathSemantic.info().cards` disagrees with the library's card
count. A stale index loads, answers, and is quietly wrong; CONVENTIONS made checking it a manual
step, which is exactly the kind of step that gets skipped. Watch the state machine when touching
it -- the loader starts at `idle`, not `loading`, and a first version of this check compared an
undefined count and warned about a healthy index.

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

Three subsections were added on 2026-09-20, and unlike the 2026-09-14 batch these carry new cards
rather than only moving old ones:

- **Algebra &rsaquo; Matrices, Determinants & Linear Systems** (5 cards). The library already
  invoked a determinant, a matrix power, a cofactor or an eigenvalue on eleven cards -- Heron,
  Cayley-Menger, the cross product, the Sylvester matrix, Stirling numbers of the first kind,
  Matrix-Tree, LGV, barycentrics, affine maps, Markov states, the transfer matrix -- and defined
  none of them. Matrices are off the AMC/AIME syllabus; the justification is internal consistency
  plus 2011 AIME II #11, which hands you a tridiagonal matrix and asks for its determinant.
- **Geometry &rsaquo; Conics** (7 cards, one of them the existing `conic-sections` moved in and
  retargeted as the overview). One `medium` card had been carrying all three curves across six
  tagged problems, and the word "eccentricity" appeared nowhere in the library although 2025 AMC
  12A #14 turns entirely on it.
- A **Systems & Determinants** cluster inside Methods &rsaquo; Algebra, for the two method cards.

When a card moves into a new subsection, check the curated lists as well as the routes: see the
duplicate-placement gate in CONVENTIONS &sect;9, which exists because this batch broke it.

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

## Curated lists drift, and nothing used to notice

`built-in-lists.js` promises that a route is "every card carrying that level and subject, so a
route is complete by construction rather than a hand-picked sample". It is edited by hand, so the
promise decays every time a card is added: on 2026-09-20 an audit found **14 missing memberships
across six cards** — `triangle-13-14-15`, `concyclicity-tests`, `absolute-value-identities`,
`grid-path-fill`, `nested-subset-pairs`, `squared-binomial-sum` — every one of them added in a
recent session by someone who updated the library and not the routes. Zero strays in the other
direction, which is the signature of pure omission.

This is worth internalising because the failure is *invisible*. A route with a card missing renders
perfectly; it is just quietly less than it claims. `tools/check-lists.py` now enforces completeness
both ways, but the habit matters more than the gate: **adding a card is not finished until it has
joined every route it qualifies for.**

Two related findings from the same audit:

- **"Geometry Configurations" had become a catalogue.** 63 cards, of which 3 were high importance
  and 35 were low or below, with only 18 reachable below AIME. A list whose blurb says "recurring
  figures you should recognize on sight" cannot be half Newton-Gauss Line and Isotomic Conjugate.
  It is now 28 cards; the rest moved to "Deeper Configurations" rather than being deleted.
- **A list must not claim a `kind` it does not honour.** "Olympiad Heavy Hitters" was `kind:
  "route"` while its own blurb read "Not a syllabus", and held 16 of the library's 192 olympiad
  cards. Retagged `thinking`, with four real olympiad routes added alongside it.

## Auto-sectioning a saved list: what the scoring has to defend against

A saved list is a flat array, so `autoSections()` in `js/app.js` matches it against headings already
written by hand — the built-in lists' 228 sections, the 25 `TAG_GROUPS` families, then the library's
own subsections. Two things about it were learned the hard way and should not be undone:

- **Do not merge same-titled sections across tiers.** The first version did, to improve coverage.
  "Triangles: Sides, Areas & Radii" merged to ~40 ids and then out-scored the 5-card "Cevians &
  Ratios" for a list whose cevian cards it barely described. Small, specific candidates are the
  point of the whole exercise.
- **Score `|hit|^2 / |candidate|`, never `|hit|` alone.** A 37-card route section overlapping six of
  a reader's cards wins on raw count while saying almost nothing about them. The denominator is what
  demands the heading actually be *about* the cards it collects.
- **Subject names are not an acceptable fallback.** Grouping leftovers under "Geometry" or "Number
  Theory" was tried and removed: it tells the reader nothing the cards do not already show.

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

### Standing state, measured 2026-09-20 against a verified-fresh index

**Compare warm to warm, and say which you ran.** The semantic index loads lazily, so a cold first
run and a warm re-run disagree on a handful of near-tied queries in both directions; warm runs are
reproducible to the individual query (three consecutive runs gave identical output). Over 535 cards
the original 171 queries give **153 warm**, against the **155 warm** recorded before this work and
the **153** stored in `eval-baseline.json`, which was itself a cold capture. Warm to warm that is a
**net loss of two queries out of 171** while the corpus grew 3%. Small, real, and not a
measurement artifact -- do not report it as one. The full set is **164/183, MRR 0.9295**.

**Every point lost was traced, and one of them was a genuine defect worth recording.** Adding
`euler-line-parallel-side` dropped the score by two, and the reason was not jostling: the new card
took first place on `line through the circumcenter centroid and orthocenter`, a query whose answer
is the Euler line card itself. Its keywords had included `circumcenter and orthocenter same height`
and `orthocenter divides the altitude 2:1`, phrases that name the general objects rather than the
special configuration, so a card about one case out-ranked the card about the rule. Narrowing them
to what is distinctive -- the parallel condition, $\tan B\tan C = 3$, the $2:1$ division --
recovered the point. **A special case must never out-rank the general card it specialises; check
for it by name whenever you add one.** The other point went to
`complex numbers on the unit circle`, where `complex-bash` edged out `roots-of-unity`; that one is
a semantic near-tie with no honest fix, since `roots-of-unity` already carries `unit circle` as a
keyword and adding more would be gaming the metric.

The query set is now **183**. Twelve were added for the matrices, conics and projection cards, and
**eleven of the twelve rank first**; the miss is `is this equation an ellipse or a hyperbola`,
where `conic-sections` takes the top slot and `conic-classification` sits third, which is a
defensible answer to that phrasing rather than a failure.

Two long-standing misses are unchanged and still deliberately unfixed:

- `ratio between circumradius and inradius` expects `euler-distance-theorem` and does not reach
  the top three, behind `equilateral-triangle-facts`, `right-triangle-inradius` and
  `regular-tetrahedron`. It is present in the **lexical** ranking too, so it is content growth in
  those cards rather than semantic drift. This query has already cost one reverted promotion (the
  $\frac rR$ clause in `inradius-area`), so it should be addressed by a measured change, not by eye.
- `quadrilateral whose vertices lie on a circle` expects `cyclic-opposite-angles` and returns
  `concyclicity-tests` first, which is arguably the better answer to the literal question.

No card added on 2026-09-20 appears in the top three of any query it was not written for, so the
new content is not displacing correct answers; the movement came from re-embedding a corpus that
grew 3%. The one clear casualty is `area of triangle formed by connecting midpoints of the sides`,
where `varignons-theorem` now edges out `medial-triangle`. Varignon's keywords were the generic
`midpoints, parallelogram, half area, varignon` -- four, the documented floor -- and were rewritten
to be quadrilateral-specific, which is a better card either way but **did not move the ranking**:
that query is decided by the semantic vector, not the keyword field. Recorded here so the next
person does not repeat the attempt.

Do **not** press "Download as baseline" to make a regression disappear. The baseline is the
record of what was true when the ranking was last deliberately tuned.

## Reorganising the taxonomy

Seven new subsections were added on 2026-09-14, all **intra-file moves** of existing cards. The card
count did not change (512 before and after), and search held at 154/171.

| New subsection | n | out of |
|---|---|---|
| Geometry › Derived Triangles & Conjugates | 7 | Advanced Triangle Theorems 29 → 22 |
| Geometry › Tangent Circles & Chains | 7 | Circles 24 → 17 |
| Geometry › Vectors & Coordinates in Space | 7 | Solid Geometry 20 → 14, Coordinate & Grid 16 → 12 |
| Geometry › Transformations in the Coordinate Plane | 3 | Coordinate & Grid |
| Number Theory › Quadratic Residues | 5 | Modular Arithmetic 19 → 14 |
| Number Theory › Continued Fractions & Representations | 5 | Special Numbers & Sequences 14 → 9 |
| Counting › Expectation & Variance | 6 | Probability 16 → 10 |

**The rule that governed all of it:** cards in `patterns.js` carry `type` and `subject`; cards in the
four subject files carry neither. A cross-file move changes a card's type, drops it out of
Methods/Patterns browsing, and forces a search-index rebuild. So every move was intra-file, and that
single constraint rejected functional equations, conics, generating functions and region counting,
each of which had only one or two cards inside the relevant file.

Two title-dependent chips had to be handled:

- `point-plane-distance` held `solid-geometry` **only because its old title said "Solid"** — its own
  keywords matched nothing in that regex. Rather than contort the new title, the keyword
  `"solid geometry"` was added so the card earns the chip. That is the general fix for this class.
- "Transformations in the Coordinate Plane" keeps the word **Coordinate** deliberately. "Transformations
  of the Plane" or "Isometries of the Plane" would strip `coordinate-geometry` from all three cards.

The move also **fixed a bug**: `expected-fixed-points`, `variance-independence` and `order-statistics`
were missing the `expected-value` chip and now have it.

Two corrections to the original audit below: the quadratic-residue block is **five** cards, not seven
(`primitive-roots`, `multiplicative-order` and `carmichael-function` are order theory, not
residuacity), and `CARD_DIAGRAM_IDS` is a **set of card ids**, read as `CARD_DIAGRAM_IDS.has(f.id)`,
so it is **not** a risk for any move — it was wrongly listed as something to check.

### The original audit (what remains undone)

Raised because the library has roughly doubled and the section titles were set when it was much
smaller. This is written up rather than done, because the cost is unusually asymmetric: the content
gain is zero and several things read subsection titles as data. What follows is the evidence, so a
later pass can act on it without re-deriving anything.

### What breaks on a rename, and how loudly

| Mechanism | Where | Failure mode |
|---|---|---|
| `ALSO_LISTED_IN` | `js/app.js` ~809 | Hardcodes the literal string `"Trigonometric Identities"` and the section id `"algebra"`. `find(x => x.title === title)` then `if (!sub) return;` — renaming that subsection **silently drops five mirrored cards** with no warning. The single most fragile string in the file. |
| `TOPIC_RULES` | `js/app.js` ~882 | `sub.title` is concatenated into the haystack the topic regexes run against, so subsection titles *create* topic chips. Renaming changes `#/topic/...` membership. Roughly 30 topic assignments exist only because of a title. |
| `ctxWords` | `js/app.js` ~849 | Section and subsection titles are an indexed search field. Renaming moves keyword-search rankings. |
| Related-cards | `js/app.js` ~2295 | `+3` for a shared subsection, `+1` for a shared section. Moving a card rewires its Related list. |
| `sectionFilters` | `js/app.js` ~1302 | Keyed by **section id** in `localStorage`. Renaming a section id silently resets saved filters for existing readers. |

Subsection *order* is safe: anchors are positional but regenerated every render, and no route
addresses them. Card ids are safe everywhere — details, examples, diagrams, problems, built-in lists,
`link-aliases.json` and the search vectors are all id-keyed. `tools/build-search-index.py` keys
`section` off the **file name**, not the section object, so moving a card between subsections needs no
index rebuild; moving it between files does.

### A bug that was worth fixing on its own — FIXED 2026-09-20

`TOPIC_RULES` matched against subsection titles, so several subsections mis-tagged their contents.
Measured before the fix: **38 cards carried a chip their subsection title awarded and the card did
not deserve**, and **20 cards carried no chip at all**, which made them unreachable by topic
browsing. Both are now zero, gated by `tools/check-topics.py`.

The fix is described in CONVENTIONS &sect;8. In short: the assignment moved into a named
`topicsForCard` function so the gate can lift it verbatim instead of restating it; Methods and
Patterns subsection titles are never fed in, because they are subject names; and a four-entry
`TITLE_STOP` vetoes a specific topic on a specific subsection, but only when the card's own words
do not independently earn it, so **zero correct chips were lost**.

One design was tried and rejected, recorded so it is not retried: *use the title only when the
card's own words yield nothing.* It loses 56 correct chips and still leaves 10 wrong ones.

Three loose regexes were tightened at the same time, each measured first: `/factor/` was matching
`cofactor`, `factorial` and "scale factor"; `/similar/` put a `triangles` chip on "similar conics";
a bare `/degree/` matched "second degree equation". Exactly seven chips were dropped and all seven
were false positives.

Six cross-section topics were added, since the taxonomy splits these clusters across files and a
cross-file move is forbidden: `conics` (11 cards), `linear-algebra` (14), `transformations` (39),
`floors-abs` (21), `convexity` (8), `games` (3). The last of these also gives the one-card
"Combinatorial Game Theory" subsection somewhere to belong without moving anything.

### Titles that no longer describe their contents

- ~~**Geometry › "Projective Geometry & Inversion" (8) contains no inversion card.**~~ **Done
  2026-09-20**: renamed to **"Projective Geometry & Cross-Ratio"**, which describes the actual
  contents (cross-ratio, harmonic bundle, harmonic quadrilateral, Möbius) and removed the word that
  was awarding a false `circles` chip to `desargues-theorem` and `harmonic-bundle`. Moving an
  inversion card in was the alternative and was rejected: both live in `patterns.js`, so it would
  have been a cross-file move.
- ~~**Counting › "Pigeonhole & Double Counting" (4) contains no double-counting card**~~ **Done
  2026-09-20**: `handshake-lemma` moved to Graph Theory beside `eulerian-paths`, which already
  depends on it, and the remainder renamed to **"Pigeonhole & Ramsey Theory"** for its actual
  contents (`pigeonhole`, `ramsey-33`, `erdos-szekeres`). Neither rename moved search: warm-to-warm
  the eval is unchanged at 165/183, 154/171, MRR 0.9332.
- **Geometry › "Advanced Triangle Theorems" (29)** is three groups wearing one title: fundamentals
  that are not advanced (`law-of-sines`, `law-of-cosines`, `angle-bisector-theorem`,
  `projection-formula`), five derived triangles (`pedal-`, `orthic-`, `medial-`, `contact-`,
  `excentral-triangle`), and two conjugacies (`isogonal-`, `isotomic-conjugate`). All seven of the
  latter are already grouped as `"triangle centers"` in `TAG_GROUPS`, which is a ready-made answer.
- **Geometry › "Ratios & Constants to Memorize" (5)** holds two things that are not constants
  (`isoperimetric-facts`, `inscribed-square`).

### Sizes

Geometry, before the 2026-09-14 split `[4, 5, 8, 10, 12, 13, 16, 18, 18, 20, 24, 29]` · Algebra `[4, 4, 5, 5, 11, 14, 15, 18, 20]` ·
Number Theory `[5, 8, 10, 10, 12, 14, 19]` · Counting `[1, 3, 4, 7, 8, 8, 9, 9, 16]`.

Counting has a **one-card subsection** (`sprague-grundy` alone under "Combinatorial Game Theory"),
which renders as a heading over a single card and takes a full sidebar row. It would become a real
subsection by absorbing `losing-positions` and `turn-based-games`, which are the same subject filed
elsewhere. The 19-card "Modular Arithmetic" contains a self-contained seven-card quadratic-residue
block that is the most obvious clean split in the library.

### Clusters split across sections

Roots of unity (5 places), generating functions (4), combinatorial game theory (3), symmetry/group
counting (2), the floor function (5), absolute value (5), and the twelvefold way (4). `TOPIC_RULES`
already has cross-section topics for `generating-functions` and `functions` precisely because no
subsection holds them — which is the argument that topics, not subsections, are the right home for
these, and that the taxonomy may not need to change at all.
