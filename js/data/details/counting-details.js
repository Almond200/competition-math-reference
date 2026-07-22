// Extended detail-page write-ups for Counting & Probability, keyed by formula id.
window.MATH_DETAILS = window.MATH_DETAILS || {};

Object.assign(window.MATH_DETAILS, {

"permutations-combinations": String.raw`## Why it works
$P(n,k)$: fill $k$ slots in order — $n$ choices, then $n-1$, down to $n-k+1$. $\binom{n}{k}$: the same count where order is irrelevant, so divide out the $k!$ orderings of each selection.

## How to use it
The decision is always "does order matter?" — and when in doubt, count ordered and divide by the overcount. Complementary framings help: choosing $k$ to include equals choosing $n - k$ to exclude.

## On contests
The atoms of all counting. AMC layers them: committees with restrictions, words from letters, and hybrid counts where one part is ordered (officers) and another is not (members).`,

"multiset-permutations": String.raw`## Why it works
Arrange all $n$ objects as if distinct ($n!$ ways), then divide by the internal reorderings of each identical group ($n_i!$ each) since they produce the same visible arrangement.

## How to use it
MISSISSIPPI-type words, paths written as letter strings (RRUU... — this is why grid paths are $\binom{m+n}{m}$), and any arrangement of a multiset. With added restrictions ("no two I's adjacent"), arrange the rest first and place the repeats in gaps.

## On contests
Constant at every level. The subtle uses: treating identical-looking steps/objects as a multiset word converts many problems into one formula.`,

"circular-permutations": String.raw`## Why it works
Rotations of a circular arrangement look identical, and there are $n$ rotations of each linear order — so $\frac{n!}{n} = (n-1)!$. Equivalently: seat one person to kill the rotational symmetry, arrange the remaining $n-1$ freely. Flips halve again when reflections are indistinguishable.

## How to use it
"Fix one person" is the operational habit — it also handles hybrid constraints ("A opposite B": fix A, B's seat is forced, arrange the rest). Decide from the problem's physicality whether reflections count (keychains: usually yes; people at a table: usually no).

## On contests
Round-table arrangements with adjacency conditions (glue couples into blocks, remember the $2!$ inside each block) are an AMC fixture; necklace versions with beads bring in the $\div 2$.`,

"complementary-counting": String.raw`## Why it works
Good and bad outcomes partition the total; counting whichever side is structurally simpler is pure economy. "At least one" conditions have complements ("none") that factor into independent choices — that asymmetry is the whole trick.

## How to use it
Trigger phrases: "at least one," "not all," "some pair." Compute the total, subtract the structured complement. For "at least two," complement is "zero or one" — still usually easier. In probability: $P(\text{at least one}) = 1 - P(\text{none})$, and for independent events $P(\text{none})$ is a clean product.

## On contests
Possibly the most-used single idea on AMC counting problems. The classic error is a mismatched universe — make sure "total" counts exactly the same kind of object as "bad."`,

"counting-blocks": String.raw`## Why it works
Gluing forced-adjacent items into a super-object preserves the bijection with valid arrangements: each block arrangement times each internal order is one valid seating. The gap method inverts it: placing forbidden-adjacent items into separate gaps between the others guarantees separation.

## How to use it
"Together" → glue (multiply by internal orders). "Apart" → arrange the unrestricted items, then choose gaps: $k$ non-adjacent items into $n$ others' $n+1$ gaps gives $\binom{n+1}{k} \cdot k!$ for distinct items. Mixed conditions: glue first, then gap.

## On contests
Bread-and-butter AMC 10 material; the circular variants (gaps around a table) and multi-block problems (two couples, three languages of books) are the standard escalations.`,

"grid-paths": String.raw`## Why it works
A monotone path is a word in $\{R, U\}$ with exactly $m$ R's and $n$ U's; choosing which positions are R's is $\binom{m+n}{m}$ — a multiset permutation in disguise.

## How to use it
Forced waypoints multiply: paths through $P$ = (paths to $P$) × (paths from $P$). Forbidden points subtract: total minus through-the-point, with inclusion-exclusion for several. Diagonal barriers → reflection principle/Catalan. Block-by-block recursion (writing the count into each lattice node) is the fail-safe when formulas tangle.

## On contests
AMC standard; AIME versions add barriers, diagonal moves, or 3D. Write the two-coordinate model explicitly — most errors are mis-tallied step counts.`,

"rectangles-in-grid": String.raw`## Why it works
A rectangle is determined by choosing 2 of the $m+1$ vertical grid lines and 2 of the $n+1$ horizontal ones — the choices are independent.

## How to use it
Squares need equal spans: $\sum_k (m+1-k)(n+1-k)$ over valid sizes $k$. Count sub-rectangles containing a marked cell by counting line choices on each side of it. Tilted squares/rectangles on lattice points are a separate count (vectors $(a,b)$ with rotations).

## On contests
"How many rectangles/squares in this grid" appears verbatim on MATHCOUNTS/AMC 10; chessboard variants (counting those containing a given square) are the common twist.`,

"handshakes-diagonals": String.raw`## Why it works
All three count unordered pairs or triples: handshakes and games are $\binom{n}{2}$ directly; diagonals are all pairs minus the $n$ adjacent ones (sides); triangles from $n$ general-position points choose any 3 vertices.

## How to use it
Reverse-engineering is common: "45 handshakes" → $\binom{n}{2} = 45$ → $n = 10$. Points with some collinear: subtract degenerate triples $\binom{k}{3}$ per collinear family. Intersections of diagonals in convex position: $\binom{n}{4}$ (each 4 vertices give one crossing) — the elegant cousin.

## On contests
MATHCOUNTS/AMC staples; the $\binom{n}{4}$ diagonal-intersection fact and collinearity corrections are the AIME-level upgrades.`,

"counting-functions": String.raw`## Why it works
Each of the $n$ inputs independently selects an output: $k$ options each, multiplied. Injections consume options: $k(k-1)\cdots(k-n+1)$. Subsets are functions to $\{$in, out$\}$: $2^n$.

## How to use it
Model "assign each object a label" problems as functions and multiply per-object choices. Watch the direction (which set maps to which); surjections need PIE (see that entry). Chains of choices with shrinking menus are injections even when disguised.

## On contests
$2^n$ subset counts and $k^n$ assignment counts anchor countless problems; recognizing "this is just counting functions" strips away story-problem camouflage.`,

"pascals-identity": String.raw`## Why it works
Condition on one distinguished element: subsets of size $k$ either contain it ($\binom{n-1}{k-1}$ ways to finish) or not ($\binom{n-1}{k}$). Symmetry: choosing what's in = choosing what's out.

## How to use it
The recursion builds Pascal's triangle row by row — useful computationally and for induction proofs. "Absorb" sums by repeatedly applying it (this is how hockey stick telescopes). Symmetry halves work and reveals palindromic structure in rows.

## On contests
Identity manipulation on AMC 12/AIME: recognize when an awkward sum is one Pascal application away from collapsing. Conditioning-on-an-element is also a general proof technique worth extracting.`,

"binomial-row-sums": String.raw`## Why it works
$(1+1)^n$ expands to the row sum; $(1-1)^n = 0$ expands to the alternating sum. Combinatorially: subsets of all sizes total $2^n$; the involution "toggle element 1" pairs even with odd subsets.

## How to use it
Substituting values into $(1+x)^n$ is a general coefficient-sum machine: $x = 2$ gives $\sum \binom{n}{k}2^k = 3^n$, etc. The even/odd split $2^{n-1}$ handles parity-constrained subset counts instantly.

## On contests
"How many subsets have even size" ($2^{n-1}$), weighted sums via clever substitution, and the roots-of-unity filter's base case. AMC 12 loves substitute-and-evaluate identities.`,

"hockey-stick": String.raw`## Why it works
Telescoping Pascal: $\binom{n+1}{r+1} = \binom{n}{r} + \binom{n}{r+1}$, expand the last term repeatedly. Combinatorially: to choose $r+1$ from $\{1..n+1\}$, condition on the largest element chosen — the cases are the diagonal terms.

## How to use it
Sums of $\binom{i}{r}$ over $i$ collapse instantly; so do sums of products like $\sum k(k+1)$ (rewrite as $2\binom{k+1}{2}$). Polynomial sums: express $k^2, k^3$ in binomial basis and hockey-stick each piece — the systematic route to power-sum formulas.

## On contests
AIME sum evaluations and stars-and-bars cumulative counts ("solutions with $x_1 + \cdots \le n$" = hockey stick over exact sums). The largest-element conditioning is reusable everywhere.`,

"vandermonde": String.raw`## Why it works
Choose $r$ from a group of $m$ men and $n$ women: condition on how many men ($k$) are chosen. Generating-function view: matching the $x^r$ coefficient in $(1+x)^m(1+x)^n = (1+x)^{m+n}$.

## How to use it
Recognize convolution-shaped sums $\sum_k \binom{m}{k}\binom{n}{r-k}$ and collapse them. The self-convolution $\sum \binom{n}{k}^2 = \binom{2n}{n}$ (via symmetry $\binom{n}{r-k} = \binom{n}{n-r+k}$ at $r = n$) is the most-quoted case.

## On contests
AIME identity evaluations and probability normalizations (hypergeometric distributions sum to 1 by Vandermonde). If a sum has two binomials whose bottom indices add to a constant — this is it.`,

"committee-chair": String.raw`## Why it works
Count (committee, chair) pairs twice: pick the $k$-committee then its chair ($k\binom{n}{k}$), or pick the chair first then the rest ($n\binom{n-1}{k-1}$). Summing over $k$: chair first ($n$ ways), each remaining person in or out ($2^{n-1}$).

## How to use it
The absorption identity $k\binom{n}{k} = n\binom{n-1}{k-1}$ removes the $k$ factor from weighted sums — apply repeatedly for $k^2$ (or use $k^2 = k(k-1) + k$). Story-proof thinking ("count pairs two ways") generalizes far beyond this identity.

## On contests
Weighted binomial sums on AMC 12/AIME ($\sum k\binom{n}{k}$, $\sum k^2\binom{n}{k} = n(n+1)2^{n-2}$), and expected-size-of-random-subset arguments ($= \frac{n}{2}$, this identity divided by $2^n$).`,

"multinomial-theorem": String.raw`## Why it works
Expanding $(x_1 + \cdots + x_m)^n$ picks one variable from each factor; the coefficient of a monomial counts the arrangements of that multiset of picks — the multinomial coefficient.

## How to use it
Coefficient extraction in trinomial+ powers: identify the exponent pattern, compute $\frac{n!}{k_1!\cdots k_m!}$, include the variables' own coefficients raised to matching powers. Setting all $x_i = 1$ counts total assignments $m^n$ as a sanity check.

## On contests
"Coefficient of $x^3y^2z^2$ in $(x + 2y - z)^7$"-type AMC/AIME items: multinomial count times $2^2 \cdot (-1)^2$. Also underlies counting ordered set partitions with prescribed sizes.`,

"pascal-parity": String.raw`## Why it works
Lucas' theorem mod 2: $\binom{m}{n}$ is odd iff every binary digit of $n$ fits under $m$'s. The number of valid $n$ is $2^{(\text{number of 1-bits of } m)}$ — each 1-bit offers a free binary choice.

## How to use it
Row $m$ of Pascal's triangle has $2^{s_2(m)}$ odd entries; rows that are all-odd are $m = 2^k - 1$; rows with exactly 2 odd entries are $m = 2^k$. The Sierpinski-triangle picture organizes all of it.

## On contests
"How many entries of row 100 are odd" ($100 = 1100100_2$, so $2^3 = 8$) and divisibility-pattern problems. Mod 4 or higher powers needs more than Lucas — don't overextend the tool.`,

"stars-and-bars": String.raw`## Why it works
Write $n$ identical units as stars; $k-1$ bars split them into $k$ labeled groups. Arrangements of the $n + k - 1$ symbols choose bar positions: $\binom{n+k-1}{k-1}$. Positive solutions: place bars in the $n-1$ internal gaps instead.

## How to use it
Normalize constraints first: lower bounds $x_i \ge a_i$ substitute away; upper bounds need PIE (next entry). Inequalities $x_1 + \cdots + x_k \le n$: add a slack variable and count equalities. Distributing distinct objects is NOT stars and bars — that's $k^n$; the objects must be identical.

## On contests
Among the highest-yield formulas at every level: dice-sum counts, coin distributions, monomial counting ($x^ay^bz^c$ with $a+b+c=n$: $\binom{n+2}{2}$ monomials), and AIME digit/partition hybrids.`,

"stars-bars-upper-bound": String.raw`## Why it works
Violating a cap $x_i \le m$ means $x_i \ge m+1$ — substitute $x_i' = x_i - (m+1)$ and count freely; inclusion-exclusion alternates over which caps are violated since violations can overlap.

## How to use it
$\#= \sum_j (-1)^j \binom{k}{j}\binom{n - j(m+1) + k - 1}{k-1}$, truncating when the top argument goes negative. For small cases, the complement or direct generating functions $(1 + x + \cdots + x^m)^k$ may be faster.

## On contests
Bounded dice sums ("three dice show total 11"), digit-sum counts (digits capped at 9 — the canonical use), and AIME distribution problems with room capacities.`,

"balls-boxes-table": String.raw`## Why it works
Distinguishability of balls and boxes each change the symmetry group of the count: distinct→distinct is free choice ($k^n$); identical balls quotient by permutations of balls (stars and bars); identical boxes quotient by box permutations (Stirling); both identical gives partitions.

## How to use it
Diagnose the two distinguishabilities before computing anything. "Nonempty" variants: surjections ($k!S(n,k)$), positive stars and bars, $S(n,k)$ alone, partitions into exactly $k$ parts. When box sizes are prescribed, it's multinomial coefficients instead.

## On contests
The mis-diagnosis (using stars and bars on distinct objects) is a top contest error; running the two-question checklist prevents it. AMC/AIME sample all four cells of the table.`,

"pie": String.raw`## Why it works
An element in exactly $t$ of the sets is counted $\binom{t}{1} - \binom{t}{2} + \binom{t}{3} - \cdots = 1$ time (alternating binomial sum), so the alternating formula counts every covered element once.

## How to use it
Use for unions of overlapping conditions, or flip to count "none of the conditions" (complement of the union). Symmetric cases collapse to $\sum (-1)^{j+1}\binom{k}{j}N_j$ where $N_j$ counts elements in some fixed $j$ conditions. Two/three sets: draw the Venn diagram and fill from the inside out.

## On contests
Divisibility unions, derangement-style forbidden positions, surjection counts, and seating with forbidden adjacencies. On AIME, PIE with symmetric terms is the default for "avoid all of these patterns" problems.`,

"derangements": String.raw`## Why it works
PIE over the events "element $i$ is fixed": $D_n = \sum_j (-1)^j\binom{n}{j}(n-j)! = n!\sum \frac{(-1)^j}{j!}$ — the truncated $e^{-1}$ series, whence the nearest-integer form. The recurrence $D_n = (n-1)(D_{n-1} + D_{n-2})$ conditions on where element 1 goes and whether the swap closes.

## How to use it
Memorize $D_1..D_5 = 0, 1, 2, 9, 44$ (and $D_6 = 265$). Variants: exactly $k$ fixed points = $\binom{n}{k}D_{n-k}$; probability $\to \frac{1}{e}$. Partial derangements (some elements unrestricted) go back to PIE.

## On contests
Hat checks, mismatched letters/envelopes, and "no one gets their own" scenarios on AMC/AIME. The exactly-$k$-fixed-points formula is the standard follow-up question.`,

"catalan-numbers": String.raw`## Why it works
Reflection principle: monotone paths crossing the diagonal biject (reflect after first violation) with paths to a shifted endpoint, giving $\binom{2n}{n} - \binom{2n}{n+1} = \frac{1}{n+1}\binom{2n}{n}$. The recurrence $C_{n+1} = \sum C_iC_{n-i}$ conditions on the first return to the diagonal.

## How to use it
Recognize Catalan structure: balanced sequences, non-crossing configurations (chords, handshakes across a table), triangulations, binary trees, ballot-type majorities, and "never go below zero" random walks. Then just index correctly — off-by-one in $n$ is the standard error.

## On contests
$1, 2, 5, 14, 42, 132, 429, 1430$ should be recognizable on sight. AIME problems rarely say "Catalan" — they describe a non-crossing or non-negative-partial-sum condition and expect the identification.`,

"ballot-problem": String.raw`## Why it works
The cycle lemma or reflection principle: bad sequences (where B ties or leads at some point) biject with sequences starting with a B-vote, giving the clean $\frac{a-b}{a+b}$ fraction of orderings.

## How to use it
Strict lead throughout: $\frac{a-b}{a+b}$. Weak version (never behind): related shifted formula — re-derive by adding a virtual first vote. Random-walk translation: paths with $+1/-1$ steps staying positive.

## On contests
Vote-counting and queue problems on AIME; also the engine behind Catalan path counts (the $a = b$ boundary case). Reflection-principle fluency transfers to many "stay above the line" problems.`,

"burnsides-lemma": String.raw`## Why it works
Count pairs (symmetry $g$, coloring fixed by $g$) two ways: summing $|\mathrm{Fix}(g)|$ over $g$, or noting each orbit contributes exactly $|G|$ pairs (stabilizer-orbit theorem). Dividing by $|G|$ counts orbits.

## How to use it
Recipe: list the symmetries (rotations; add reflections only if flips are indistinguishable), count colorings fixed by each (cycles of the permutation must be monochromatic: $k^{\#\text{cycles}}$), average. Rotation by $d$ positions on an $n$-cycle has $\gcd(n,d)$ cycles — the key subcount.

## On contests
Necklaces, colored cubes (the 24 rotations and their cycle structures are worth pre-computing), and seating-up-to-rotation counts. AIME expects the rotation-only case; full dihedral for physical flippable objects.`,

"stirling-bell": String.raw`## Why it works
$S(n,k)$ recursion conditions on element $n$: either it forms its own block ($S(n-1,k-1)$) or joins one of the $k$ existing blocks ($kS(n-1,k)$). Bell numbers sum over all block counts.

## How to use it
Small values by the triangle: $S(n,2) = 2^{n-1}-1$, $S(n, n-1) = \binom{n}{2}$; $B_3 = 5$, $B_4 = 15$, $B_5 = 52$. Surjections onto $k$ labeled targets: $k! \, S(n,k)$ — the bridge to counting onto-functions. Explicit PIE form available when needed.

## On contests
"Partition 5 students into study groups" ($B_5$ or $S(5,k)$ depending on wording) and surjection counts. The labeled/unlabeled distinction (Stirling vs. surjection) is the tested subtlety.`,

"fibonacci-tilings": String.raw`## Why it works
Condition on the last piece: a $1\times n$ tiling ends in a square (leaving $a_{n-1}$) or a domino (leaving $a_{n-2}$). Binary strings without adjacent 1s: condition on the last character the same way.

## How to use it
The conditioning template generalizes: last-step analysis turns most "count strings/tilings avoiding a pattern" problems into linear recurrences. Verify small cases by hand to pin initial conditions (the classic off-by-one source). Circular versions: subtract or use Lucas numbers.

## On contests
Stair-climbing, seating without adjacent occupants, and string-avoidance counts throughout AMC/AIME. Compute terms iteratively — closed forms are rarely needed.`,

"non-adjacent-selection": String.raw`## Why it works
Row: lay down the $n-k$ unchosen positions, creating $n-k+1$ gaps (ends included); choosing $k$ gaps for the chosen items enforces separation — $\binom{n-k+1}{k}$. Circle: fix-and-split into the row case, giving the $\frac{n}{n-k}\binom{n-k}{k}$ correction.

## How to use it
Direct formula for "no two chosen items adjacent" in rows and circles. Generalized spacing (gaps $\ge g$) substitutes away $g-1$ forced blanks per gap. For labeled people (not just positions), multiply by arrangements afterwards.

## On contests
Seat selections, lighting non-adjacent lamps, and committee-with-feuds problems. The circular formula handles round tables — deriving it live is error-prone, so know it.`,

"partitions": String.raw`## Why it works
No closed form; the structure lives in bijections. Conjugation (flip the Ferrers diagram) proves partitions into $\le k$ parts = partitions into parts $\le k$. Euler's odd = distinct theorem comes from binary-splitting parts.

## How to use it
Small $n$: know or quickly list $p(n)$ for $n \le 10$ ($1,2,3,5,7,11,15,22,30,42$). Compositions (ordered) are different: $2^{n-1}$ total, $\binom{n-1}{k-1}$ with $k$ parts. Ferrers-diagram bijections settle most "partitions with property A = partitions with property B" claims.

## On contests
Casework enumeration of small partitions (distributing identical objects to identical boxes), and composition counts. AIME occasionally rewards the conjugation trick on restricted counts.`,

"surjections": String.raw`## Why it works
PIE over missed targets: $\sum_j (-1)^j \binom{k}{j}(k-j)^n$ subtracts assignments avoiding $j$ specified outputs. Equals $k!\,S(n,k)$ since a surjection is an unordered partition into $k$ blocks plus a labeling.

## How to use it
"Every box nonempty with distinct objects" is this — not stars and bars. Small cases: onto 2 targets $= 2^n - 2$; onto 3 $= 3^n - 3\cdot2^n + 3$. Sanity check: zero when $k > n$.

## On contests
"Each of 3 teachers gets at least one of 6 students" style problems recur on AMC/AIME; the formula plus small-case fluency covers them.`,

"stirling-first-kind": String.raw`## Why it works
Permutations decompose uniquely into disjoint cycles; $c(n,k)$ counts those with exactly $k$ cycles. Recursion: element $n$ starts its own cycle ($c(n-1,k-1)$) or inserts into any of $n-1$ positions inside existing cycles ($(n-1)c(n-1,k)$).

## How to use it
Generating identity $\sum_k c(n,k)x^k = x(x+1)\cdots(x+n-1)$ evaluates sums fast. Expected number of cycles: $H_n$ (harmonic). Single-cycle permutations: $(n-1)!$.

## On contests
Cycle-structure problems (dance circles, function iteration orbits) and probability questions about random permutations' cycles — e.g. probability 1..n form one cycle is $\frac{1}{n}$.`,

"necklace-formula": String.raw`## Why it works
Burnside specialized to the cyclic group: rotation by $d$ has $\gcd(n,d)$ cycles, and grouping rotations by $g = \gcd$ collects $\varphi(n/g)$ rotations each, giving $\frac{1}{n}\sum_{d\mid n}\varphi(d)k^{n/d}$.

## How to use it
Rotation-only "necklace" counts (fixed orientation, e.g. round tables, circular strings). Add reflections (bracelets) by averaging in the dihedral terms: $\frac{k^{(n+1)/2}}{\cdot}$-style terms depending on parity. Prime $n$ simplifies beautifully: $\frac{k^n - k}{n} + k$.

## On contests
Circular binary strings up to rotation, bead necklaces, and AIME's occasional "distinguishable up to rotation" counts. The prime-$n$ simplification doubles as a proof of Fermat's little theorem.`,

"generating-functions": String.raw`## Why it works
Multiplying polynomials convolves coefficient sequences — exactly the arithmetic of combining independent choices whose sizes add. A generating function is bookkeeping for "ways per total."

## How to use it
Encode each independent component as a polynomial/series in $x$ (allowed sizes as exponents), multiply, extract the target coefficient. Standard vocabulary: $\frac{1}{1-x} = $ unlimited supply, $\frac{1}{(1-x)^k} = $ stars and bars, $(1+x)^n = $ binomial choices, $\frac{x(1 - x^6)}{1-x}\cdot$-style factors $= $ dice. Roots-of-unity filter extracts residue-class coefficient sums.

## On contests
Dice-sum distributions ("two dice relabeled to match standard sums" — a famous AIME problem), partition-with-conditions counts, and as the unifying view behind stars and bars/PIE identities.`,

"basic-probability": String.raw`## Why it works
With equally likely outcomes, probability is proportional counting. The union formula is PIE scaled by the sample-space size.

## How to use it
Fix the sample space FIRST — most probability errors are counting numerators and denominators over different spaces. Ordered spaces are usually safer (keep both dice distinguishable). Then the problem is two counting problems sharing a denominator.

## On contests
The framing step of every counting-probability hybrid. When outcomes aren't equally likely, weight them or switch to a finer space that is uniform.`,

"conditional-probability": String.raw`## Why it works
Conditioning restricts the sample space to $B$ and renormalizes; Bayes' theorem is the definition applied twice to swap the conditioning order.

## How to use it
For "given that" problems: count within the restricted space directly when possible (often simpler than plugging formulas). Bayes for inverse questions (disease tests, biased-coin identification): compute both paths to the evidence, divide the target path by the total. Tree diagrams organize multi-stage versions.

## On contests
AMC/AIME "given that" problems reward direct restricted counting. Watch the classic traps: "at least one boy" vs "the older is a boy" condition different spaces.`,

"binomial-probability": String.raw`## Why it works
A specific sequence with $k$ successes has probability $p^k(1-p)^{n-k}$ by independence; $\binom{n}{k}$ sequences share that probability.

## How to use it
Requires: fixed trial count, independence, constant $p$. Mode/comparison questions ("most likely number of heads") compare consecutive ratios $\frac{P(k+1)}{P(k)}$. Cumulative "at least" questions: complement or symmetry (fair coins: $P(\ge$ half$)$ exploits symmetry).

## On contests
Coin/dice repetition problems throughout AMC. AIME variants weight the coin or condition on the outcome — combine with Bayes and the binomial coefficients carefully.`,

"expected-value": String.raw`## Why it works
Expectation is a weighted average, and linearity holds because summation commutes with weighting — no independence needed anywhere in the proof.

## How to use it
The indicator decomposition is the superpower: write the quantity as a sum of 0/1 indicators, take probabilities, add. Works on dependent events (fixed points, matching pairs, occupied boxes). Also: expected value of a sum of dice, expected number of runs, expected pairs — all linearity.

## On contests
AIME expected-value problems are almost always linearity-of-indicators in disguise; recognizing "count = sum of indicators" replaces heavy casework with one-line sums.`,

"geometric-distribution": String.raw`## Why it works
Self-similarity: after one failure the situation resets, so $E = 1 + (1-p)E$, giving $E = \frac{1}{p}$. The series view sums $\sum k p(1-p)^{k-1}$ (arithmetico-geometric).

## How to use it
Waiting-time questions: expected trials to first success $\frac{1}{p}$; to see all $n$ outcomes (coupon collector): $n H_n$ by summing the stage-wise geometric waits. The reset trick (condition on the first step) also computes probabilities, not just expectations.

## On contests
"Expected rolls until a 6" ($=6$), coupon-collector variants (expected rolls to see every face: $14.7$), and first-passage questions. The self-similar equation is faster and safer than series summation.`,

"turn-based-games": String.raw`## Why it works
Sum the geometric series over rounds, or self-similarity: $P = p + (1-p)(1-q)P$ — either the first player wins now, or both miss and the game restarts identically.

## How to use it
First-mover advantage quantifies as $\frac{p}{p+q-pq}$; for identical players it's $\frac{1}{2-p}$. Extensions: three players cycle the same way (condition on the first round); "first to succeed twice" needs states instead.

## On contests
Alternating dice/coin duels are AMC/AIME classics ("first to roll a six wins — probability the second player wins" $= \frac{5}{11}$). Set up the restart equation directly; series are backup.`,

"geometric-probability": String.raw`## Why it works
For uniform continuous choices, probability is measure (length/area/volume) — counting becomes integration-free region geometry when constraints are linear.

## How to use it
Draw the sample space as a square/triangle/cube; shade the favorable region; compute areas (usually by cutting corner triangles). Classic regions: $|x - y| < d$ is the band around the diagonal ($1 - (1-d)^2$); broken-stick triangle condition shades an inner triangle of ratio $\frac{1}{4}$; meeting-time problems are the band picture again.

## On contests
"Two people arrive uniformly at random..." and stick-breaking problems are AMC/AIME fixtures. Corner-triangle arithmetic beats integration every time; just keep the geometry exact.`,

"states-recursion-prob": String.raw`## Why it works
Markov structure: the future depends only on the current state, so probabilities/expectations per state satisfy linear equations obtained by conditioning on one step.

## How to use it
Name a variable per state, write one equation per state ("value = weighted average of neighbor values, plus 1 if counting steps"), solve the small linear system. Absorbing states anchor the system (probability 1/0, expectation 0). Gambler's ruin closed form: fair walk from $a$ with target $a+b$ succeeds with probability $\frac{a}{a+b}$.

## On contests
AIME's standard hard-probability format: frogs on lily pads, bugs on cube vertices, best-of series. Symmetry first (merge equivalent states) — the system often collapses from 8 states to 3.`,

"symmetry-probability": String.raw`## Why it works
A uniformly random arrangement induces a uniform distribution on any single position's content — revealing other information in a symmetric way cannot break the symmetry.

## How to use it
"The $k$-th card is an ace" has probability $\frac{4}{52}$ regardless of $k$; "A is before B" is $\frac{1}{2}$; "A, B, C in this cyclic order" is $\frac{1}{3}$. Before computing, ask what the answer must be by exchangeability — many conditional-looking problems have symmetric answers.

## On contests
Massive shortcut on AMC/AIME: relative-order questions ($P(\text{A beats B beats C})$ among random orderings), position questions, and "without replacement" draws that look sequential but are exchangeable.`,

"hypergeometric": String.raw`## Why it works
Choosing $n$ from a population with $K$ marked items: favorable choices pick $k$ marked and $n-k$ unmarked independently; divide by all $\binom{N}{n}$.

## How to use it
The no-replacement analogue of binomial probability — use it for card hands, committee compositions, and quality-control draws. Expected marked count is $n\frac{K}{N}$ (linearity — no formula needed). Vandermonde guarantees the probabilities sum to 1.

## On contests
"Probability a 5-card hand has exactly 2 aces" and committee-composition problems. Choosing between binomial (with replacement/independent) and hypergeometric (without) is the tested judgment.`,

"birthday-collision": String.raw`## Why it works
Complement: all $k$ items distinct means each new item avoids all previous — multiply the shrinking fractions $\prod_{i \lt k}(1 - \frac{i}{n})$.

## How to use it
Collision probability $= 1 -$ that product. Useful approximation: $\approx 1 - e^{-\binom{k}{2}/n}$, so collisions become likely around $k \approx \sqrt{2n\ln 2} \approx 1.18\sqrt{n}$ (23 people for 365 days). Exact small cases: just multiply.

## On contests
Shared-birthday and matching-pair problems; the multiply-the-avoidances pattern generalizes to seating, hashing, and repeated-digit questions.`,

"variance-independence": String.raw`## Why it works
$\mathrm{Var}(X) = E[X^2] - E[X]^2$ is algebra on the definition; independence makes cross terms factor ($E[XY] = E[X]E[Y]$), so variances add.

## How to use it
Variance of a sum of independent variables: add variances (dice: each die has variance $\frac{35}{12}$). For dependent sums, expand with covariances. Products need independence to factor expectations — check it before multiplying.

## On contests
Rare directly on AMC/AIME but appears in expected-square computations: $E[X^2] = \mathrm{Var} + (E[X])^2$ evaluates sums of squares over random processes cleanly.`,

"expected-fixed-points": String.raw`## Why it works
Indicator per position ($P = \frac{1}{n}$ each), linearity sums to exactly 1 — independence is false but irrelevant.

## How to use it
The template result for linearity-of-indicators: dependent events, trivial expectation. Same technique: expected matched pairs in two shuffled decks (1), expected cycles ($H_n$), expected records ($H_n$), expected empty boxes ($k(1-\frac{1}{k})^n$).

## On contests
Both a quotable fact and a proof pattern; AIME expected-value problems about permutations nearly always yield to the same indicator setup.`,

"coprime-probability": String.raw`## Why it works
Heuristically: divisibility by each prime $p$ is "independent" with probability $\frac{1}{p^2}$ for both of a pair, giving density $\prod_p (1 - \frac{1}{p^2}) = \frac{1}{\zeta(2)} = \frac{6}{\pi^2}$.

## How to use it
An asymptotic density, not an exact finite answer — use for estimates and for recognizing $\frac{6}{\pi^2} \approx 0.608$ when it appears. Finite versions compute via Möbius sums: $\sum_d \mu(d)\lfloor\frac{n}{d}\rfloor^2$.

## On contests
Mostly enrichment; finite coprime-pair counts on AIME go through the Möbius/inclusion-exclusion sum rather than the constant.`,

"pigeonhole": String.raw`## Why it works
If every hole held fewer, the total would be too small — a counting contradiction. The general form just divides and rounds up.

## How to use it
The craft is choosing holes: residue classes (two of any $n+1$ integers agree mod $n$), geometric cells (points in a subdivided square are close), value ranges, and paired structures ($\{1,2\},\{3,4\},\dots$ forces a consecutive pair). To guarantee $k+1$ in a hole, exceed $kn$ pigeons.

## On contests
"Guarantee" and "minimum to force" problems at every level: socks in the dark, equal digit sums, close points. The worst-case-plus-one arithmetic ($kn + 1$) answers most direct versions.`,

"handshake-lemma": String.raw`## Why it works
Summing degrees counts each edge at its two endpoints — so the total is even, forcing evenly many odd-degree vertices.

## How to use it
Parity impossibility proofs ("can 7 people each shake 3 hands?" — no, odd sum) and edge counting ($E = \frac{1}{2}\sum \deg$). Generalizes to any incidence structure: total memberships = sum over containers = sum over members.

## On contests
Party-handshake parity questions and graph-flavored AMC problems; the double-count template extends to tournaments, committees, and face-edge counts in polyhedra.`,

"double-counting": String.raw`## Why it works
One set of incidences, two partitions of it — the totals must match. All the power is in choosing what to count.

## How to use it
Count pairs/triples of related objects by rows and by columns: memberships (people × committees), incidences (points × lines), ordered wins (tournament dominance). Equating the two expressions produces nontrivial identities and constraints "for free."

## On contests
AIME combinatorics regularly hinges on one clean double count — e.g. counting (student, problem-pair) incidences to bound how many students can agree. When stuck on a counting constraint, ask "what can I count in two ways?"`,

"ramsey-33": String.raw`## Why it works
Among one person's 5 relations, pigeonhole gives 3 of one type; those 3 either contain a matching pair (closing a monochromatic triangle with the center) or form the opposite triangle themselves. $K_5$'s two-pentagon coloring shows 6 is tight.

## How to use it
Quote $R(3,3) = 6$ for friends-strangers puzzles; reuse its pigeonhole-on-a-vertex argument for ad hoc two-coloring problems ("any 2-coloring of these edges contains..."). Known small values: $R(3,4) = 9$, $R(4,4) = 18$.

## On contests
The 6-people puzzle appears verbatim in competition folklore; the argument template (fix a vertex, pigeonhole its edges) solves related AMC/AIME-adjacent coloring questions.`

});

// Entries added from the 2023-2025 AMC/AIME sweep.
Object.assign(window.MATH_DETAILS, {

"losing-positions": String.raw`## Why it works
Backward induction: the terminal position's label is forced by the rules ("take the last token and win" makes 0 a loss for the mover), and every earlier position is Winning iff some legal move reaches a Losing one. With finitely many move sizes, labels depend only on recent history, so the W/L pattern is eventually periodic — with period dividing a small combination of the move sizes.

## How to use it
Tabulate $0, 1, 2, \dots$ by hand until the pattern repeats twice (that confirms the period), then answer counting questions with modular arithmetic. Care at the boundary: "last token wins" vs. "last token loses" flips the base case. For two-pile or richer games, look for symmetry strategies (mirror the opponent) before brute-forcing.

## On contests
2024 AIME I #3 (remove 1 or 4, count $n$ where the second player wins) is the direct application: losing positions are $n \equiv 0, 2 \pmod 5$, count $= 809$. AMC versions typically ask "who wins with optimal play" for one specific $n$ — the same table answers instantly.`

});

Object.assign(window.MATH_DETAILS, {

"weighted-binomial-sums": String.raw`## Why it works
Differentiating $(1+x)^n = \sum \binom{n}{k}x^k$ brings down a factor of $k$; multiplying by $x$ realigns the powers; setting $x = 1$ sums. Twice through gives $k(k-1)$ sums, and $k^2 = k(k-1) + k$ assembles the $k^2$ version. Combinatorially: $k^2\binom{n}{k}$ counts committees with a chair and a (possibly identical) secretary.

## How to use it
The derivative pipeline evaluates any $\sum k^m \binom{n}{k} x^k$; the combinatorial story (chair/secretary casework: same person or different) is faster for small $m$ and less error-prone under pressure. For alternating versions, differentiate first and then substitute $x = -1$.

## On contests
Expected values over random subsets ($E[|S|^2]$ for uniform random subsets needs exactly $\sum k^2\binom{n}{k}/2^n = \frac{n(n+1)}{4}$) and AIME identity evaluations. The committee-chair-secretary story generalizes to any polynomial weight.`,

"cayleys-formula": String.raw`## Why it works
The Prüfer correspondence: repeatedly delete the smallest-labeled leaf and record its neighbor; a tree on $n$ labeled vertices produces a sequence of $n-2$ labels, and the process reverses uniquely. Sequences are free choices: $n^{n-2}$.

## How to use it
Count labeled trees directly, or refined versions via Prüfer: trees where vertex $v$ has degree $d$ correspond to sequences containing $v$ exactly $d-1$ times — so degree-constrained tree counts become multinomial coefficients. Rooted trees/forests have neighboring formulas ($n^{n-1}$ rooted trees).

## On contests
AIME/olympiad network-counting problems ("how many ways to connect $n$ towns with $n-1$ roads so all are reachable"). The degree-refinement (multinomial over Prüfer sequences) handles "each hub connects to exactly $k$ cities" variants.`,

"eulerian-paths": String.raw`## Why it works
A pass through a vertex uses two edges (in, out), so intermediate vertices need even degree; the endpoints of a non-closed trail each spare one odd edge. Sufficiency is Hierholzer's construction: greedily walk until stuck (necessarily back at the start when degrees are even), then splice in detours at visited vertices with unused edges.

## How to use it
Count odd-degree vertices: 0 → closed circuit exists; 2 → open path forced to run between the odd pair; more → impossible without retracing. For "minimum edges to retrace/add," pair up the odd vertices optimally (each added/duplicated path fixes two).

## On contests
"Can this figure be drawn in one stroke" (MATHCOUNTS/AMC) and postman-flavored "minimum retraced distance" questions. Distinguish from Hamiltonian (every vertex once) — the vertex version has no such clean criterion.`,

"plane-regions": String.raw`## Why it works
Incremental counting: a new line crossing $k$ existing lines is cut into $k+1$ pieces, each splitting one region — so lines add $1, 2, 3, \dots$ new regions, summing to $1 + \sum_{i=1}^{n} i = \frac{n^2+n+2}{2}$. A new circle crossing each old one twice is cut into $2(n-1)$ arcs, each adding a region.

## How to use it
The increment principle (new regions = crossings + 1 per curve, arcs for closed curves) matters more than the closed forms — it adapts to mixed configurations, segments, and expected-value versions (take expectations of the crossing counts). Also Euler's $V - E + F = 2$ recomputes any planar region count as a check.

## On contests
Direct AMC questions ("max pieces of a pancake with 5 cuts": 16) and the backbone of 2025 AIME I #13 (expected regions from random chords = 1 + chords + expected crossings, by linearity).`,

"order-statistics": String.raw`## Why it works
By symmetry, $n$ uniform points plus the two interval endpoints split $[0,1]$ into $n+1$ exchangeable gaps, so each gap expects $\frac{1}{n+1}$; the $k$-th smallest point sits after $k$ gaps at $E[X_{(k)}] = \frac{k}{n+1}$. Directly: $P(\max \le x) = x^n$ integrates to $E[\max] = \frac{n}{n+1}$.

## How to use it
The distribution function route ($P(\max \le x) = x^n$, $P(\min \ge x) = (1-x)^n$) answers probability questions; the gap-symmetry route answers expectation questions instantly. For the range: $E[\max - \min] = \frac{n-1}{n+1}$.

## On contests
"Expected value of the largest of three spins," waiting-point problems, and geometric probability hybrids (the broken-stick setup is order statistics on two points). The $\frac{k}{n+1}$ pattern is worth having on instant recall.`,

"total-expectation": String.raw`## Why it works
Group the outcomes by which case $A_i$ occurred and average within cases first: the inner averages are the conditional expectations, and recombining with weights $P(A_i)$ reproduces the overall average. It is associativity of weighted averages, elevated to a principle.

## How to use it
Choose the partition that makes each branch easy: the first move of a game, the first coin flip, which die was picked. Combined with self-similarity it produces one-line equations ($E = 1 + \frac{1}{2}E$ patterns). For random numbers of repetitions, Wald's identity $E[\text{total}] = E[N] \cdot E[X]$ is the sibling shortcut.

## On contests
The organizing principle behind nearly every AIME expected-value problem: condition on the first step, write the tower equation, solve. Misapplying it (conditioning on a non-partition) is the error to guard against — cases must be exclusive and exhaustive.`,

"polyhedron-walks": String.raw`## Why it works
Symmetry collapses the walk to a few states (distance classes from the start), giving a small linear recursion; its eigenvalues produce closed forms. For the tetrahedron the "not home" states are interchangeable, so $p_{n+1} = \frac{1}{3}(1 - p_n)$, whose fixed point $\frac{1}{4}$ and ratio $-\frac{1}{3}$ give the formula.

## How to use it
Always collapse by symmetry before writing equations: tetrahedron → 2 states, cube → 4 (by distance 0-3), octahedron → 3 (start, middle ring, antipode). Then either iterate the recursion for small $n$ (AIME asks for specific steps) or solve the geometric-plus-constant pattern for closed form.

## On contests
Bug-on-a-cube walks are an AIME classic (probability of being at the start/opposite corner after $n$ moves). The state-collapse setup is the entire difficulty; the arithmetic afterward is routine.`

});

Object.assign(window.MATH_DETAILS, {

"reflection-principle": String.raw`## Why it works
Take any path that touches the forbidden line and reflect everything after the first touch across that line: the result is a path to the mirror image of the endpoint. The map is reversible (paths to the mirrored endpoint must cross the line), so bad paths biject with unrestricted paths to a reflected target — countable by plain binomials.

## How to use it
Recipe: total paths minus $\binom{\cdot}{\cdot}$ to the reflected endpoint. Compute the reflection of the endpoint across the barrier line (for $y = x + c$ barriers, swap-and-shift coordinates). Iterated barriers (two walls) need alternating reflections with inclusion-exclusion. The ballot problem and Catalan formula are the two canonical outputs.

## On contests
Vote-count and never-trailing problems, queue problems (people with 5- and 10-dollar bills), and lattice paths avoiding a diagonal. When a path constraint says "never above/below," reflect before attempting recursion — the closed form is one subtraction.`

});

Object.assign(window.MATH_DETAILS, {

"gamblers-ruin": String.raw`## Why it works
Let $P_a$ be the success probability from bankroll $a$: the one-step recursion $P_a = pP_{a+1} + qP_{a-1}$ has characteristic roots $1$ and $\frac{q}{p}$, so $P_a$ is linear in $a$ (fair) or linear in $(q/p)^a$ (biased); the boundary values $P_0 = 0$, $P_N = 1$ pin the constants.

## How to use it
Map the problem onto the walk: current lead/bankroll $a$, absorbing targets at $0$ and $N$, per-step win chance $p$. Fair case: probability is simply $\frac{a}{N}$ — worth quoting without derivation. Expected duration (fair): $a(N - a)$ steps, another quotable gem. For biased walks toward a single barrier, let $N \to \infty$: ruin is certain iff $p \le q$.

## On contests
Best-of series with momentum, "first to win two more than the opponent," and token games between two players are gambler's-ruin instances. The $\frac{a}{N}$ and $a(N-a)$ facts turn multi-minute state computations into lookups.`

});

Object.assign(window.MATH_DETAILS, {

"casework-method": String.raw`## Why it works
The addition principle: if every object belongs to exactly one case, the total is the sum of the case counts. All the craft is in choosing the *splitting feature* so that "exactly one" holds and each case becomes strictly easier than the original.

## How to use it
Split on the most constrained element: the largest value, the leading digit, where the special person sits, how many of some type appear. Before summing, run the two sanity checks — can an object satisfy two cases (overlap)? can it satisfy none (gap)? If the case count balloons past five or six, that's the signal to switch: complementary counting, a bijection, or a recursion usually compresses it. Symmetric cases can be counted once and multiplied.

## On contests
The single most-used counting technique at every level. MATHCOUNTS problems are often pure two-case splits; AMC problems reward finding the split that makes cases symmetric; AIME problems layer casework inside other techniques — the errors are almost always an overlap or a forgotten case, so the discipline of naming the cases explicitly is the whole game.`,

"bijection-method": String.raw`## Why it works
A one-to-one correspondence pairs the two sets off perfectly, so they have the same size — even when one is a mess and the other is a textbook family. Counting the easy set *is* counting the hard set.

## How to use it
Standard dictionary worth memorizing: strictly increasing $k$-sequences from $[n]$ $\leftrightarrow$ $k$-subsets ($\binom{n}{k}$); nondecreasing sequences $\leftrightarrow$ stars and bars (shift by position: $b_i = a_i + i$ turns nondecreasing into increasing); lattice paths $\leftrightarrow$ words in R and U; solutions with $x_i \ge a_i$ $\leftrightarrow$ solutions with $y_i \ge 0$ (substitute $y_i = x_i - a_i$); "at most half" $\leftrightarrow$ "at least half" via complement. To verify a bijection, exhibit the inverse map — if you can undo it uniquely, the correspondence is genuine.

## On contests
The elegant path on AMC/AIME counting: any time the answer to a strange-looking count is a clean binomial, a bijection is the intended solution. Also the safest way to handle "sequences with constraints" — transform the constraint away rather than casing on it.`,

"recursive-counting": String.raw`## Why it works
Every valid configuration of size $n$ ends in *some* final step, and removing that step leaves a valid smaller configuration. Classifying by the last step therefore partitions the count into copies of smaller counts — a recurrence, computable forward from base cases without any closed form.

## How to use it
Ask: what can the ending look like? Strings with no $11$: end in $0$ (anything before) or $01$ (anything before that) — $a_n = a_{n-1} + a_{n-2}$. Tilings with dominoes: last tile vertical or two horizontals. When one sequence isn't enough (say, the constraint depends on the last character), keep one sequence per *state* — $z_n$ = valid strings ending in 0, $o_n$ = ending in 1 — and update the vector each step. Compute a small table by hand; contest sizes rarely exceed $n = 20$.

## On contests
The AIME workhorse for strings, seatings, and paths with adjacency constraints. AMC versions are usually two-term recurrences in disguise (often Fibonacci); the AIME versions need 2–4 states. The reflex to build: "constraint on neighbors" $\Rightarrow$ recursion on the last block, computed as a table.`

});

Object.assign(window.MATH_DETAILS, {

"constructive-counting": String.raw`## Why it works
The multiplication principle: if a sequence of decisions builds each object exactly once, and step $i$ always offers $c_i$ options no matter what came before, the total is $\prod c_i$. The two ways it breaks are exactly the two things to watch: a step whose option count depends on earlier choices (fix: reorder the steps or split into cases), and an object built more than once (fix: divide by the number of times each is built).

## How to use it
Order the decisions from most constrained to least — the restricted slot first, so its count stays uniform. For "at least one" constraints, construction usually loses to complementary counting; for identical objects or unordered selections, construct the ordered version and divide ($k!$ for unordered, $n$ for rotations, $2$ for reflections). The reflex check before multiplying: "does this step's count ever depend on what I picked earlier?"

## On contests
The default engine for digit counts, seatings, and license-plate problems at MATHCOUNTS/AMC level, and the inner loop inside nearly every harder count. The classic trap is the leading-zero/last-digit interaction (as in the even-distinct-digits example — units $0$ or not changes the thousands count), which is why "most restricted first, then case if needed" is the discipline.`,

"indicator-variables": String.raw`## Why it works
Expectation is linear: $E[X + Y] = E[X] + E[Y]$ with no independence assumption, because expectation is a sum over outcomes and sums reorder freely. An indicator $X_i$ (1 if event $i$ occurs, else 0) has $E[X_i] = P(X_i = 1)$, so any counting random variable $X = \sum X_i$ has expectation $\sum P(\text{event}_i)$ — each potential occurrence contributes its own probability, overlaps and all.

## How to use it
Identify the atomic occurrences being counted — fixed points, adjacent pairs, satisfied people, monochromatic triangles — and write one indicator each. Compute a single $P(X_i = 1)$ (symmetry usually makes them all equal), multiply by how many there are. Never condition, never case. Classics: expected fixed points of a permutation $= n \cdot \frac{1}{n} = 1$; expected records $= H_n$; coupon-collector via a different decomposition. It computes expectations of dependent counts that would be hopeless by distribution.

## On contests
The intended solution to most AIME "find the expected number of ..." problems, and the only humane one when events overlap. If a problem asks for an average over all configurations, translate it to an expectation and fire indicators — averages are expectations in disguise.`,

"invariants-coloring": String.raw`## Why it works
If every legal move preserves a quantity, then the quantity is constant along any sequence of moves — so states with different values of the invariant are mutually unreachable, no matter how clever the play. Colorings are invariants in disguise: assigning weights (colors) to cells and checking what each piece or move covers turns a geometric impossibility into arithmetic.

## How to use it
Hunt in this order: parity of a natural quantity (sum, number of inversions, count of a symbol), then sums mod 3 or 4, then colorings — checkerboard first, then stripes or four-colorings for L-shaped and longer pieces. For termination questions use a monovariant: a bounded quantity that strictly moves one way. The craft is matching the coloring to the piece: a $1 \times 3$ tile wants three-coloring by column mod 3, a T-tetromino wants the checkerboard imbalance.

## On contests
The standard finisher for "show it's impossible" — mutilated chessboards, coin-flipping games, chip-firing puzzles. AMC versions hide it as "which of these positions can be reached"; olympiad versions demand inventing the invariant. If a process problem stumps you, compute a few small states and watch what *doesn't* change.`

});

Object.assign(window.MATH_DETAILS, {

"bayes-theorem": String.raw`## Why it works
Both $P(A \cap B) = P(A)P(B \mid A)$ and $P(A \cap B) = P(B)P(A \mid B)$ describe the same overlap. Setting them equal and dividing by $P(B)$ gives Bayes' theorem — a bookkeeping identity that swaps the direction of the conditioning. The denominator $P(B) = \sum_i P(B \mid A_i)P(A_i)$ is the law of total probability: sum the evidence's probability across every disjoint cause.

## How to use it
Identify the cause $A$ (or a partition $A_1, \dots, A_n$) and the observed evidence $B$. Write the easy "forward" probabilities $P(B \mid A_i)$ and the priors $P(A_i)$, build $P(B)$ by total probability, and divide. A tree diagram makes it concrete: each leaf is $P(A_i)P(B \mid A_i)$, and the answer is one favorable leaf over the sum of the relevant leaves. The recurring lesson is that a small base rate $P(A)$ can swamp a high accuracy $P(B \mid A)$.

## On contests
The intended tool for "given that [evidence], find the probability of [cause]" — defective-item-from-a-factory, positive-medical-test, drawn-from-an-unknown-urn. On AMC/AIME it usually reduces to the tree-diagram form: favorable path over total paths, which is Bayes in disguise.`,

"generating-function-method": String.raw`## Why it works
Multiplying $\left(\sum_i x^{a_i}\right)\left(\sum_j x^{b_j}\right)$ produces a term $x^{a_i + b_j}$ for every pair of choices, so the coefficient of $x^N$ in the product counts exactly the combinations that sum to $N$. Independent decisions multiply as factors; the exponents do the addition for you.

## How to use it
Model each choice as a factor whose exponents are its allowed contributions: a die is $x + x^2 + \cdots + x^6$, an unlimited supply of value-$a$ coins is $\frac{1}{1 - x^a} = 1 + x^a + x^{2a} + \cdots$, a bounded part $0 \le k \le m$ is $1 + x + \cdots + x^m$. Multiply, then extract the coefficient of $x^N$ — by expansion, by a known series (e.g. $\frac{1}{(1-x)^k}$ gives $\binom{n+k-1}{k-1}$; see the generating functions card), or by partial fractions for a closed form. Global tricks: substitute $x = 1$ to total all coefficients, differentiate then set $x = 1$ for a weighted sum, and use a roots-of-unity filter to select one residue class of exponents.

## On contests
The systematic route for coin/stamp/dice-sum counts and for constrained integer solutions, and the natural home for the roots-of-unity filter on AIME "count the subsets whose sum is divisible by $k$" problems. It trades cleverness for a reliable model-multiply-extract pipeline — reach for it when casework on the count would explode.`

});

Object.assign(window.MATH_DETAILS, {

"extremal-principle": String.raw`## Why it works
A finite (or well-ordered) collection has a largest and a smallest member. Naming one lets you use a property no other element has: the maximum admits no larger neighbor, the minimum no smaller one. Assuming otherwise — that the extreme element could be improved or extended — contradicts its being extreme, which is precisely the leverage. Against a minimal counterexample, producing a still-smaller one is the same contradiction, the finite echo of infinite descent.

## How to use it
Pick the right extreme for the structure: the longest path or chain (its endpoints' neighbors are trapped inside it), the closest pair of points (nothing is nearer), the vertex of highest degree, the smallest positive value of some quantity, or the minimal counterexample to the claim. Then push on it: show the extremal object forces the configuration you want, or that it could be pushed further — a contradiction. Well-ordering of the positive integers is the number-theoretic version; convex-hull and closest-pair arguments are the geometric ones.

## On contests
An olympiad workhorse for existence and impossibility proofs — graph and grid problems, combinatorial geometry, and "show some configuration must occur." On AIME it appears more quietly, e.g. justifying that a smallest solution exists before bounding it. When a problem resists direct construction, ask what the largest or smallest object must look like.`

});
