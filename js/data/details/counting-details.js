// Extended detail-page write-ups for Counting & Probability, keyed by formula id.
window.MATH_DETAILS = window.MATH_DETAILS || {};

Object.assign(window.MATH_DETAILS, {

"permutations-combinations": String.raw`## Why it works
$P(n,k)$: fill $k$ slots in order — $n$ choices, then $n-1$, down to $n-k+1$. $\binom{n}{k}$: the same count where order is irrelevant, so divide out the $k!$ orderings of each selection.

## How to use it
The decision is always "does order matter?", and when in doubt count the ordered version and divide by the overcount — that is safer than guessing, because the overcount is usually easy to name.

Three habits cover most problems. Read $P(n,k)$ as filling slots one at a time with a shrinking menu, which is how "chains of choices" problems appear in disguise. Use the complementary framing $\binom nk=\binom n{n-k}$ whenever the smaller side is easier to count. And when the objects are not all distinct, switch to the multiset formula rather than trying to patch $\binom nk$.

The common error is mixing the two within one problem — counting an ordered stage and an unordered stage and then multiplying without checking that the second count does not depend on the first.

## On contests
The atoms of all counting. AMC layers them: committees with restrictions, words from letters, and hybrid counts where one part is ordered (officers) and another is not (members).`,

"multiset-permutations": String.raw`## Why it works
Arrange all $n$ objects as if distinct ($n!$ ways), then divide by the internal reorderings of each identical group ($n_i!$ each) since they produce the same visible arrangement.

## How to use it
Any arrangement of objects that are not all distinct is this formula: write the multiset, take $n!$, and divide by a factorial for each repeated type. Grid paths are the most common disguise, since a path is just a string of R's and U's.

With an added restriction, do not try to patch the formula. Arrange the unrestricted objects first, then place the repeated ones into the gaps between them — for "no two I's adjacent" in MISSISSIPPI, arrange the other eight letters, then choose four of the nine gaps for the I's.

When several types are restricted at once, handle them one at a time from the most constrained outward, or switch to inclusion-exclusion on the adjacency conditions.

## On contests
Constant at every level. The subtle uses: treating identical-looking steps/objects as a multiset word converts many problems into one formula.`,

"circular-permutations": String.raw`## Why it works
Rotations of a circular arrangement look identical, and there are $n$ rotations of each linear order — so $\frac{n!}{n} = (n-1)!$. Equivalently: seat one person to kill the rotational symmetry, arrange the remaining $n-1$ freely. Flips halve again when reflections are indistinguishable.

## How to use it
"Fix one person" is the habit worth building: pin someone to a seat, and the remaining $n-1$ arrange linearly. This is not just a derivation, it is how you handle added constraints — for "$A$ opposite $B$", fix $A$, note that $B$'s seat is then forced, and arrange the other $n-2$ freely.

Decide from the problem's physicality whether reflections count. A keychain or a bracelet can be flipped, so divide by $2$; people seated at a table cannot, so do not. If the problem says "arrangements are the same if one is a rotation of the other" without mentioning flips, take rotations only.

For blocks around a circle, glue first and then fix: treat the block as one unit, giving $(n-k)!$ circular arrangements of the units, times $k!$ within the block.

## On contests
Round-table arrangements with adjacency conditions (glue couples into blocks, remember the $2!$ inside each block) are an AMC fixture; necklace versions with beads bring in the $\div 2$.`,

"complementary-counting": String.raw`## Key forms
- $\#(\text{good})=\#(\text{total})-\#(\text{bad})$ — the counting form, used when the bad side has more structure
- $P(\text{at least one})=1-P(\text{none})$ — the probability form, and the phrase that triggers it
- $P(\text{none})=\prod_i(1-p_i)$ — why flipping pays: independent complements multiply

## Why it works
Good and bad outcomes partition the total; counting whichever side is structurally simpler is pure economy. "At least one" conditions have complements ("none") that factor into independent choices — that asymmetry is the whole trick.

## How to use it
Trigger phrases: "at least one," "not all," "some pair." Compute the total, subtract the structured complement. For "at least two," complement is "zero or one" — still usually easier. In probability: $P(\text{at least one}) = 1 - P(\text{none})$, and for independent events $P(\text{none})$ is a clean product.

## On contests
Possibly the most-used single idea on AMC counting problems. The classic error is a mismatched universe — make sure "total" counts exactly the same kind of object as "bad."

The birthday problem is the canonical case. Asking for the chance that two of $k$ people share a birthday means summing over a mess of overlapping coincidences, but its complement factors cleanly: all $k$ distinct has probability $\frac{n(n-1)\cdots(n-k+1)}{n^{k}}$, since each person in turn must avoid the days already taken. With $n=365$ that product drops below $\frac12$ at $k=23$, so the collision probability passes one half at only $23$ people, which is the famous part. The same product answers any "are these $k$ uniform choices all different" question, hash collisions included.`,

"counting-blocks": String.raw`## Key forms
- $k!\,(n-k+1)!$ — glue $k$ items that must stay together into one block, then order within it
- $n!\binom{n+1}{k}k!$ — the opposite condition, $k$ items no two adjacent, dropped into the $n+1$ gaps

## Why it works
Gluing forced-adjacent items into a super-object preserves the bijection with valid arrangements: each block arrangement times each internal order is one valid seating. [[gap-method|The gap method]] inverts it: placing forbidden-adjacent items into separate gaps between the others guarantees separation.

## How to use it
"Together" → glue (multiply by internal orders). "Apart" → arrange the unrestricted items, then choose gaps: $k$ non-adjacent items into $n$ others' $n+1$ gaps gives $\binom{n+1}{k} \cdot k!$ for distinct items. Mixed conditions: glue first, then gap.

## On contests
Bread-and-butter AMC 10 material; the circular variants (gaps around a table) and multi-block problems (two couples, three languages of books) are the standard escalations.`,

"grid-paths": String.raw`## Why it works
A monotone path is a word in $\{R, U\}$ with exactly $m$ R's and $n$ U's; choosing which positions are R's is $\binom{m+n}{m}$ — a multiset permutation in disguise.

## How to use it
Every monotone lattice path is a string of $m$ R's and $n$ U's, so the count is a single binomial coefficient. Everything harder is built from three moves on top of that.

Forced waypoints multiply: paths through $P$ equal paths to $P$ times paths from $P$, because the two halves are independent. Forbidden points subtract, using inclusion-exclusion when there are several. A diagonal barrier is the [[reflection-principle|reflection principle]], which is where the [[catalan-numbers|Catalan numbers]] come from.

When the formulas start tangling — several forbidden cells, or an awkward region — abandon them and write the count into each lattice node, each node being the sum of the node below and the node to its left. That block-by-block recursion is slower but never wrong, and on a small grid it is often faster than getting the inclusion-exclusion right.

## On contests
AMC standard; AIME versions add barriers, diagonal moves, or 3D. Write the two-coordinate model explicitly — most errors are mis-tallied step counts.`,

"rectangles-in-grid": String.raw`## Why it works
A rectangle is determined by choosing 2 of the $m+1$ vertical grid lines and 2 of the $n+1$ horizontal ones — the choices are independent. Squares are the constrained version, since the two spans must be equal: summing over the side length $k$ gives $\sum_k (m+1-k)(n+1-k)$, which collapses to $\sum_{k=1}^{n} k^2$ on a square grid.

## How to use it
The key move is to stop counting rectangles and start counting the lines that bound them: any two of the $m+1$ vertical lines and any two of the $n+1$ horizontal lines determine exactly one rectangle, so the count is a product of two binomial coefficients.

Squares are the harder cousin, because the two spans must be equal — sum over the side length instead, which is why an $n\times n$ grid gives a sum of squares rather than a closed product.

For sub-rectangles containing a marked cell, count the line choices on each side of it separately and multiply. Tilted rectangles on lattice points are a genuinely different count, parametrised by the vector $(a,b)$ along one side, and are not covered by this formula.

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
Model "assign each object a label" as a function and multiply the per-object choices. The direction matters and is the usual slip: $n$ objects each choosing among $k$ labels gives $k^n$, not $n^k$, so name which set is the domain before writing anything.

Injections are the same count with a shrinking menu, which is how they appear in disguise — a sequence of choices where nothing may repeat is an injection whether or not the word is used.

Surjections are the exception: requiring every label to be used breaks the independence, so the count needs inclusion-exclusion over which labels go unused, giving $\sum_j(-1)^j\binom kj(k-j)^n$.

## On contests
$2^n$ subset counts and $k^n$ assignment counts anchor countless problems; recognizing "this is just counting functions" strips away story-problem camouflage.`,

"pascals-identity": String.raw`## Why it works
Condition on one distinguished element: subsets of size $k$ either contain it ($\binom{n-1}{k-1}$ ways to finish) or not ($\binom{n-1}{k}$). Symmetry: choosing what's in = choosing what's out.

## How to use it
The identity is a case split: fix one element of the $n$, and every $k$-subset either contains it (leaving $\binom{n-1}{k-1}$ ways) or does not (leaving $\binom{n-1}{k}$). That story-proof reading is what lets you invent the right split in an unfamiliar problem.

Computationally the recursion builds Pascal's triangle row by row, which is the fastest way to get a whole row by hand and the standard engine for induction proofs about binomial coefficients.

The other use is absorption: applying the rule repeatedly collapses a sum of consecutive entries into a single coefficient, which is precisely how the [[hockey-stick|hockey stick identity]] telescopes. Symmetry halves your work and explains why every row reads the same forwards and backwards.

## On contests
Identity manipulation on AMC 12/AIME: recognize when an awkward sum is one Pascal application away from collapsing. Conditioning-on-an-element is also a general proof technique worth extracting.`,

"binomial-row-sums": String.raw`## Why it works
$(1+1)^n$ expands to the row sum; $(1-1)^n = 0$ expands to the alternating sum. Combinatorially: subsets of all sizes total $2^n$; the involution "toggle element 1" pairs even with odd subsets.

## How to use it
Both identities come from substituting into $(x+y)^n$, and that substitution is a general coefficient-sum machine rather than two isolated facts. Put $x=1$ and $y=1$ for the total, $x=1$ and $y=-1$ for the alternating version, and any other value when the sum carries weights — $\sum_k\binom nk2^k=3^n$ is the same move at $x=2$.

The even/odd split settles parity-constrained subset counts instantly: exactly $2^{n-1}$ subsets have even size, whatever $n$ is.

When the sum has a factor of $k$ in it, substitution alone will not reach it — differentiate $(1+x)^n$ first, or use the absorption identity, which is what the committee-chair card covers.

## On contests
"How many subsets have even size" ($2^{n-1}$), weighted sums via clever substitution, and the roots-of-unity filter's base case. AMC 12 loves substitute-and-evaluate identities.`,

"hockey-stick": String.raw`## Why it works
Telescoping Pascal: $\binom{n+1}{r+1} = \binom{n}{r} + \binom{n}{r+1}$, expand the last term repeatedly. Combinatorially: to choose $r+1$ from $\{1..n+1\}$, condition on the largest element chosen — the cases are the diagonal terms.

## How to use it
Any sum of binomial coefficients with a fixed lower index collapses in one step, so recognising the diagonal is all that is required.

Its real reach is polynomial sums. Express $k$, $k^2$, $k^3$ in the binomial basis — $k=\binom k1$, $k^2=2\binom k2+\binom k1$, and so on — then hockey-stick each piece separately. That is the systematic route to the power-sum formulas, and unlike memorising them it extends to any degree.

The same rewriting handles products: $k(k+1)=2\binom{k+1}{2}$ and $k(k+1)(k+2)=6\binom{k+2}{3}$, so sums of consecutive-integer products telescope immediately.

## On contests
AIME sum evaluations and stars-and-bars cumulative counts ("solutions with $x_1 + \cdots \le n$" = hockey stick over exact sums). The largest-element conditioning is reusable everywhere.`,

"vandermonde": String.raw`## Key forms
- $\sum_{k}\binom{n}{k}^2 = \binom{2n}{n}$ — the $m = n = r$ case, and by far the one that actually appears; choosing $k$ from the first $n$ and $n-k$ from the second is the same as choosing $n$ from all $2n$
- $\binom{n}{k} = \binom{n}{n-k}$ — the symmetry the squared form leans on, since it turns $\binom{n}{k}\binom{n}{n-k}$ into $\binom{n}{k}^2$

## Why it works
Choose $r$ from a group of $m$ men and $n$ women: condition on how many men ($k$) are chosen. Generating-function view: matching the $x^r$ coefficient in $(1+x)^m(1+x)^n = (1+x)^{m+n}$.

## How to use it
Recognising the shape is the whole skill: a sum of products of two binomial coefficients whose bottom indices add to a constant is a Vandermonde convolution, and it collapses to a single coefficient.

The most-quoted case is the self-convolution $\sum_k\binom nk^2=\binom{2n}{n}$, which looks different only because the symmetry $\binom nk=\binom n{n-k}$ has already been applied to one factor.

It also runs in reverse: when a problem hands you $\binom{m+n}{r}$ and you need to split it by a two-group structure, expanding into the convolution is often what makes the counting argument work. [[generating-function-method|Generating functions]] give the same identity as the coefficient of $x^r$ in $(1+x)^m(1+x)^n$, which is the quickest proof if you already have that machinery.

## On contests
AIME identity evaluations and probability normalizations (hypergeometric distributions sum to 1 by Vandermonde). If a sum has two binomials whose bottom indices add to a constant — this is it.`,

"committee-chair": String.raw`## Why it works
Count (committee, chair) pairs twice: pick the $k$-committee then its chair ($k\binom{n}{k}$), or pick the chair first then the rest ($n\binom{n-1}{k-1}$). Summing over $k$: chair first ($n$ ways), each remaining person in or out ($2^{n-1}$).

## How to use it
The identity is a double count: choosing a committee of $k$ and then its chair gives $k\binom nk$, while choosing the chair first and then the rest of the committee gives $n\binom{n-1}{k-1}$. Both count the same pairs, so they are equal — and that story-proof pattern generalises far beyond this one identity.

Operationally it is an absorption rule: it removes a factor of $k$ from a weighted binomial sum, converting $\sum k\binom nk$ into $n\sum\binom{n-1}{k-1}=n\cdot2^{n-1}$.

For a factor of $k^2$, do not apply it twice directly. Write $k^2=k(k-1)+k$, absorb each piece separately, and the sum becomes $n(n-1)2^{n-2}+n2^{n-1}$. The same trick handles any polynomial weight by expressing it in falling factorials first.

## On contests
[[weighted-binomial-sums|Weighted binomial sums]] on AMC 12/AIME ($\sum k\binom{n}{k}$, $\sum k^2\binom{n}{k} = n(n+1)2^{n-2}$), and expected-size-of-random-subset arguments ($= \frac{n}{2}$, this identity divided by $2^n$).`,

"multinomial-theorem": String.raw`## Why it works
Expanding $(x_1 + \cdots + x_m)^n$ picks one variable from each factor; the coefficient of a monomial counts the arrangements of that multiset of picks — the multinomial coefficient.

## How to use it
For coefficient extraction, first solve the small equation $k_1+\cdots+k_m=n$ that produces the exponent pattern you want, then compute $\frac{n!}{k_1!\cdots k_m!}$ and multiply by each variable's own coefficient raised to the matching power. Forgetting that last factor is the usual error when the terms are not simply $x$, $y$, $z$.

If several exponent patterns give the same monomial, sum their contributions rather than picking one.

Setting all $x_i=1$ gives $m^n$, which is worth doing as a check: the multinomial coefficients of a full expansion must add to it. The coefficient itself is the same number as the multiset arrangement count, which is why this theorem and the MISSISSIPPI formula are the same fact seen from two sides.

## On contests
"Coefficient of $x^3y^2z^2$ in $(x + 2y - z)^7$"-type AMC/AIME items: multinomial count times $2^2 \cdot (-1)^2$. Also underlies counting ordered set partitions with prescribed sizes.`,

"pascal-parity": String.raw`## Why it works
[[lucas-theorem|Lucas' theorem]] mod 2: $\binom{m}{n}$ is odd iff every binary digit of $n$ fits under $m$'s. The number of valid $n$ is $2^{(\text{number of 1-bits of } m)}$ — each 1-bit offers a free binary choice.

## How to use it
The parity of $\binom nk$ depends only on the binary digits: it is odd exactly when every $1$-bit of $k$ is also a $1$-bit of $n$. Counting the submasks of $n$ gives $2^{s_2(n)}$ odd entries in row $n$.

That single rule answers the standard questions immediately. Rows that are entirely odd are $n=2^m-1$, where every bit is set; rows with exactly two odd entries are $n=2^m$, where only the leading bit is.

Drawing Pascal's triangle mod $2$ produces the Sierpinski triangle, and the picture is worth keeping in mind — the self-similar structure is exactly the binary submask condition, and it makes questions about blocks of even entries easy to see. For odd primes, the same reasoning is [[lucas-theorem|Lucas' theorem]] in base $p$.

## On contests
"How many entries of row 100 are odd" ($100 = 1100100_2$, so $2^3 = 8$) and divisibility-pattern problems. Mod 4 or higher powers needs more than Lucas — don't overextend the tool.`,

"stars-and-bars": String.raw`## Why it works
Write $n$ identical units as stars; $k-1$ bars split them into $k$ labeled groups. Arrangements of the $n + k - 1$ symbols choose bar positions: $\binom{n+k-1}{k-1}$. Positive solutions: place bars in the $n-1$ internal gaps instead.

## How to use it
Identify which of the two forms applies by checking whether empty boxes are allowed, since that is the only difference between them. If the lower bounds are not all $0$ or all $1$, subtract them out first with $y_i=x_i-a_i$ and apply the non-negative formula to what remains.

The bijection is worth holding onto rather than the formula: arrange $n$ identical stars and $k-1$ bars in a row, and the bars cut the stars into $k$ groups. That picture tells you immediately why the count is a single binomial coefficient and what changes when the rules change.

Upper bounds break the bijection and need inclusion-exclusion on top — give a violating variable its excess and re-count, alternating signs, which is the neighbouring card.

## On contests
Among the highest-yield formulas at every level: dice-sum counts, coin distributions, monomial counting ($x^ay^bz^c$ with $a+b+c=n$: $\binom{n+2}{2}$ monomials), and AIME digit/partition hybrids.`,

"stars-bars-upper-bound": String.raw`## Why it works
Violating a cap $x_i \le m$ means $x_i \ge m+1$ — substitute $x_i' = x_i - (m+1)$ and count freely; inclusion-exclusion alternates over which caps are violated since violations can overlap. With a common cap $m$ on all $k$ variables this closes up as $\sum_j(-1)^j\binom kj\binom{n-j(m+1)+k-1}{k-1}$, and the terms vanish once $j(m+1)\gt n$, which is why the sum is short in practice.

## How to use it
Handle the upper bound by violation rather than by construction. Count everything with plain [[stars-and-bars|stars and bars]], then subtract the cases where a chosen variable exceeds $m$ — force that overflow by pre-assigning it $m+1$ and re-counting the remainder, which is again a stars-and-bars problem.

Add back the double violations, subtract the triple ones, and so on. The sum terminates quickly because $j$ variables cannot all overflow unless $j(m+1)\le n$, so in practice only two or three terms are non-zero.

If the bounds differ between variables, the same method works but each subset of violating variables contributes its own shift, so track them individually rather than using the symmetric binomial factor.

## On contests
Bounded dice sums ("three dice show total 11"), digit-sum counts (digits capped at 9 — the canonical use), and AIME distribution problems with room capacities.`,

"balls-boxes-table": String.raw`## Why it works
Each row of the table is a different bijection, and the four cases differ only in what "the same distribution" means.

Distinct balls into distinct boxes is a free choice per ball, giving $k^n$ assignments. Requiring no empty box turns it into a surjection, and inclusion-exclusion over which boxes go unused gives $\sum_{i=0}^{k}(-1)^i\binom ki(k-i)^n$. Requiring at most one ball per box turns it into an injection, so the count is the falling factorial $k(k-1)\cdots(k-n+1)$.

Identical balls into distinct boxes is [[stars-and-bars|stars and bars]]: lay the $n$ balls in a row and insert $k-1$ bars to cut them into $k$ groups, so every arrangement of $n$ stars and $k-1$ bars is exactly one distribution. With every box nonempty, drop one ball into each box first and distribute the remaining $n-k$ freely, which is $\binom{(n-k)+k-1}{k-1}=\binom{n-1}{k-1}$. With at most one per box you are only choosing which boxes are occupied, so it is $\binom kn$.

Unlabelled boxes mean partitioning the balls into groups with no order among the groups. For distinct balls that is the Stirling number of the second kind $S(n,k)$, and summing over the number of groups gives the Bell number. This also explains the surjection formula: take an unlabelled partition into $k$ blocks and glue labels onto the boxes in $k!$ ways, so the number of onto maps is $k!\,S(n,k)$.

With nothing labelled at all, a distribution is just a way to write $n$ as a sum of positive parts — an integer partition, which has no closed form. Use the recursion $p_k(n)=p_{k-1}(n-1)+p_k(n-k)$, splitting on whether the smallest part is $1$ or every part is at least $2$, or simply list them for small $n$.

## How to use it
Answer two yes/no questions before writing a single number: are the balls distinguishable, and are the boxes distinguishable? Those pick the row. A third question — must every box be nonempty? — picks the column. Confusing identical with distinct is the most common counting mistake there is, and applying stars and bars to distinguishable objects, or $k^n$ to identical ones, is the classic way to lose the problem. Constraints ride on top of the twelve cells rather than needing new formulas. A per-box minimum $m_i$: hand out the minimums first and distribute the remaining $n - \sum m_i$ freely, which is the substitution $x_i \mapsto x_i - m_i$. An upper cap $x_i \le c$: inclusion-exclusion, giving an offending box $c+1$ up front and alternating signs. At most one ball per box: just choose the boxes, $\binom{k}{n}$ for identical balls and $\binom{k}{n}n! = k(k-1)\cdots(k-n+1)$ for distinct ones.

When box $i$ needs at least $m_i$ balls, give each box its minimum up front and distribute what remains with no restriction; formally the substitution $x_i\mapsto x_i-m_i$ turns every "at least $m_i$" into "at least $0$" and lands you back in plain stars and bars. For $20$ identical balls into $4$ distinct boxes with each box at least $3$, place $3$ in each box and distribute the remaining $8$ freely: $\binom{8+4-1}{3}=\binom{11}{3}=165$.

Upper bounds do not work that way, and need inclusion-exclusion instead. Count all distributions, then subtract those where some box overflows by handing that box $c+1$ balls first and counting the rest, alternating signs as you consider one overflowing box, then two. For $10$ balls into $3$ boxes each holding at most $4$: all distributions $\binom{12}{2}=66$, minus those with a box at $5$ or more $3\binom72=63$, plus those with two such boxes $3\binom22=3$, giving $6$.

When both bounds apply, do the minimum substitution first — which also shifts the cap — then run the overflow inclusion-exclusion on what is left. For $12$ balls into $3$ boxes each between $2$ and $5$, setting $y_i=x_i-2$ gives $y_1+y_2+y_3=6$ with each $y_i\le3$, so $\binom82-3\binom42=28-18=10$, the two-box term being impossible since $8\gt6$.

If instead the box sizes are fixed in advance, none of the table applies: putting exactly $n_1,\dots,n_k$ distinct balls into distinct boxes is the multinomial coefficient, since you choose which balls go to box $1$, then box $2$, and so on.

## On contests
Run the two-question checklist first. AMC and AIME sample every cell of the table — identical candies into distinct bags for stars and bars, distinct people into identical teams for Stirling, coin and score totals for partitions — and love bolting a minimum or a cap on top, which the substitution and inclusion-exclusion recipes above clear away.`,

"pie": String.raw`## Key forms
- $|A\cup B|=|A|+|B|-|A\cap B|$ — subtract the overlap that both terms counted twice
- $|A\cup B\cup C|=\sum|A_i|-\sum|A_i\cap A_j|+|A\cap B\cap C|$ — add singles, subtract pairs, add the triple
- $\left|\bigcup A_i\right|=\sum_{\emptyset\ne S}(-1)^{|S|+1}\left|\bigcap_{i\in S}A_i\right|$ — an element in exactly $t$ sets is counted $\binom t1-\binom t2+\cdots=1$ time
- $\sum_{j}(-1)^{j+1}\binom kj N_j$ — the symmetric case, when every $j$-fold intersection has the same size $N_j$

## Why it works
An element in exactly $t$ of the sets is counted $\binom{t}{1} - \binom{t}{2} + \binom{t}{3} - \cdots = 1$ time (alternating binomial sum), so the alternating formula counts every covered element once.

## How to use it
Use for unions of overlapping conditions, or flip to count "none of the conditions" (complement of the union). Symmetric cases collapse to $\sum (-1)^{j+1}\binom{k}{j}N_j$ where $N_j$ counts elements in some fixed $j$ conditions. Two/three sets: draw the Venn diagram and fill from the inside out.

## On contests
Divisibility unions, derangement-style forbidden positions, surjection counts, and seating with forbidden adjacencies. On AIME, PIE with symmetric terms is the default for "avoid all of these patterns" problems.`,

"derangements": String.raw`## Why it works
[[pie|PIE]] over the events "element $i$ is fixed": $D_n = \sum_j (-1)^j\binom{n}{j}(n-j)! = n!\sum \frac{(-1)^j}{j!}$ — the truncated $e^{-1}$ series, whence the nearest-integer form. The recurrence $D_n = (n-1)(D_{n-1} + D_{n-2})$ conditions on where element 1 goes and whether the swap closes.

## How to use it
Recognise the setup as "no object in its own place" — hats returned to the wrong owners, letters in wrong envelopes, a permutation with no fixed point.

The nearest-integer formula is the fastest route for a specific $n$: compute $\frac{n!}{e}$ and round. It is not an approximation but exact, which makes it safe under time pressure.

For "exactly $k$ fixed points", choose which $k$ are fixed and derange the rest, giving $\binom nkD_{n-k}$. The recurrence is the one to use when the problem is a derangement variant, since its derivation — the first element goes to some position $j$, and then either $j$ maps back or it does not — adapts to modified conditions in a way the closed form does not.

## On contests
Hat checks, mismatched letters/envelopes, and "no one gets their own" scenarios on AMC/AIME. The exactly-$k$-fixed-points formula is the standard follow-up question.`,

"catalan-numbers": String.raw`## Why it works
[[reflection-principle|Reflection principle]]: monotone paths crossing the diagonal biject (reflect after first violation) with paths to a shifted endpoint, giving $\binom{2n}{n} - \binom{2n}{n+1} = \frac{1}{n+1}\binom{2n}{n}$. The recurrence $C_{n+1} = \sum C_iC_{n-i}$ conditions on the first return to the diagonal.

## How to use it
The skill is recognition rather than computation: whenever a structure is built by nesting or by never letting one running count fall behind another, it is Catalan. Balanced brackets, lattice paths staying weakly below the diagonal, triangulations of a convex polygon, and binary trees on $n$ nodes are the standard disguises.

To confirm a guess, compute the first few values by hand and compare against $1,1,2,5,14$. That check is faster than finding the bijection and almost always settles it.

Two derivations are worth keeping. The subtraction form comes from [[reflection-principle|the reflection principle]] — all paths minus the bad ones. The convolution recurrence comes from splitting at the first return to the diagonal, and it is the one that generalises when the problem is Catalan-like but not exactly Catalan.

## On contests
$1, 2, 5, 14, 42, 132, 429, 1430$ should be recognizable on sight. AIME problems rarely say "Catalan" — they describe a non-crossing or non-negative-partial-sum condition and expect the identification.`,

"ballot-problem": String.raw`## Why it works
The cycle lemma or [[reflection-principle|reflection principle]]: bad sequences (where B ties or leads at some point) biject with sequences starting with a B-vote, giving the clean $\frac{a-b}{a+b}$ fraction of orderings.

## How to use it
Recognise the shape as a running-total condition: one count must stay ahead of another throughout a random ordering. Vote counts are the classic dressing, but queues with correct change and lattice paths above a line are the same problem.

The reflection argument is what to reproduce: any ordering where the counts tie can be reflected before the first tie, biject the bad orderings with the ones starting with a $B$, and the subtraction gives the clean fraction.

Check which version the problem wants. "Always strictly ahead" gives $\frac{a-b}{a+b}$, while "never behind" allows equality and gives $\frac{a-b+1}{a+1}$ — the two differ, and problems exploit the distinction.

## On contests
Vote-counting and queue problems on AIME; also the engine behind Catalan path counts (the $a = b$ boundary case). Reflection-principle fluency transfers to many "stay above the line" problems.`,

"burnsides-lemma": String.raw`## Key forms
- $|\mathrm{Fix}(g)|=k^{c(g)}$ — count the cycles of $g$, since every cycle must be a single colour
- rotation by $d$ on an $n$-cycle has $\gcd(n,d)$ cycles — the subcount behind every necklace problem
- reflections join the group only when flips are allowed — a bracelet, not a seating chart

## Why it works
Count pairs (symmetry $g$, coloring fixed by $g$) two ways: summing $|\mathrm{Fix}(g)|$ over $g$, or noting each orbit contributes exactly $|G|$ pairs (stabilizer-orbit theorem). Dividing by $|G|$ counts orbits.

## How to use it
Work in three steps: list the symmetry group, count the colourings each element fixes, then average. The middle step is the only real work, and it is always the same question — a colouring survives $g$ exactly when every cycle of $g$ is a single colour, so $|\mathrm{Fix}(g)|=k^{c(g)}$ and you only ever need the cycle count.

Choose the group before anything else, since the answer depends on it. Rotations alone are right when the object is fixed in place, and reflections join them only when flipping it over gives something indistinguishable — a necklace that may be turned over, but not a seating chart. Rotation by $d$ positions on an $n$-cycle has $\gcd(n,d)$ cycles, which is the subcount behind every necklace problem.

For the solids, precompute the cycle structure once. The cube has $24$ rotations, and grouping them by axis — identity, face turns, edge flips, vertex turns — gives $\frac{k^6+3k^4+12k^3+8k^2}{24}$ for face colourings, a result worth carrying into the exam.

Check the answer for divisibility: the sum over the group must be a multiple of $|G|$, so a non-integer average means a miscounted fixed set. Burnside gives only the number of orbits — when a problem asks how many colourings use a prescribed number of each colour, you need Pólya enumeration instead.

## On contests
Necklaces, colored cubes (the 24 rotations and their cycle structures are worth pre-computing), and seating-up-to-rotation counts. AIME expects the rotation-only case; full dihedral for physical flippable objects.`,

"stirling-bell": String.raw`## Why it works
$S(n,k)$ recursion conditions on element $n$: either it forms its own block ($S(n-1,k-1)$) or joins one of the $k$ existing blocks ($kS(n-1,k)$). Bell numbers sum over all block counts.

## How to use it
The recurrence is the practical tool and its derivation tells you how to adapt it: consider the last element, which either joins one of the $k$ existing blocks or forms a block of its own.

Keep the distinction between labelled and unlabelled straight, since it decides which count you need. Objects labelled and blocks unlabelled gives $S(n,k)$; labelling the blocks as well multiplies by $k!$ and gives surjections; making the objects identical instead gives integer partitions.

Bell numbers answer "how many ways to partition into any number of blocks", and their own recurrence $B_{n+1}=\sum_k\binom nkB_k$ comes from choosing the block containing a fixed element.

## On contests
"Partition 5 students into study groups" ($B_5$ or $S(5,k)$ depending on wording) and surjection counts. The labeled/unlabeled distinction (Stirling vs. surjection) is the tested subtlety.`,


"non-adjacent-selection": String.raw`## Why it works
Row: lay down the $n-k$ unchosen positions, creating $n-k+1$ gaps (ends included); choosing $k$ gaps for the chosen items enforces separation — $\binom{n-k+1}{k}$. Circle: fix-and-split into the row case, giving the $\frac{n}{n-k}\binom{n-k}{k}$ correction.

## How to use it
Do not attack the condition directly. Lay out the unchosen items, which creates $n-k+1$ gaps, and choose which gaps receive the selected items — one per gap guarantees non-adjacency automatically.

The circular case needs care because the first and last positions are now neighbours. The standard fix is to split on whether a fixed position is chosen, which reduces each branch to a row problem and produces the $\frac{n}{n-k}$ factor.

For "at least $d$ apart" rather than merely non-adjacent, pre-place $d-1$ spacers in each gap and apply the same formula to what remains. The complement, "at least two adjacent", is total minus this.

## On contests
Seat selections, lighting non-adjacent lamps, and committee-with-feuds problems. The circular formula handles round tables — deriving it live is error-prone, so know it.`,

"partitions": String.raw`## Why it works
No closed form; the structure lives in [[bijection-method|bijections]]. Conjugation (flip the Ferrers diagram) proves partitions into $\le k$ parts = partitions into parts $\le k$. Euler's odd = distinct theorem comes from binary-splitting parts.

## How to use it
Distinguish partitions from compositions first, since the two counts are wildly different: compositions have the clean $2^{n-1}$, partitions have no closed form and must be built up.

For small $n$, generate $p(n)$ by listing in decreasing order to avoid duplicates, or use the generating function $\prod_k\frac{1}{1-x^k}$ when a restriction is imposed — restricting the parts just drops factors from that product.

The conjugation trick is the one that turns hard restrictions into easy ones. Reflecting a Young diagram swaps rows with columns, so "partitions of $n$ into at most $k$ parts" and "partitions of $n$ into parts of size at most $k$" are the same count — often one side is far easier to enumerate.

## On contests
[[casework-method|Casework]] enumeration of small partitions (distributing identical objects to identical boxes), and composition counts. AIME occasionally rewards the conjugation trick on restricted counts.`,

"surjections": String.raw`## Why it works
Inclusion–exclusion over which outputs are missed: $\sum_{j=0}^{k}(-1)^j\binom{k}{j}(k-j)^n$ subtracts the assignments that avoid $j$ chosen outputs, alternating to correct for double-counted overlaps. It equals $k!\,S(n,k)$ because a surjection is an unordered partition of the $n$ inputs into $k$ nonempty blocks — that count is $S(n,k)$, a Stirling number of the second kind — followed by a bijection matching the $k$ blocks to the $k$ labeled outputs, which adds a factor of $k!$.

## How to use it
The requirement that every output is used destroys the independence between inputs, so no product formula exists — that is why this needs inclusion-exclusion while counting plain functions does not.

Run the exclusion over which outputs are missed: subtract the functions avoiding one chosen output, add back those avoiding two, and so on. Each term is a plain function count into a smaller codomain.

The Stirling form is often faster when $k$ is small, since $k!\,S(n,k)$ separates the count into "how are the inputs grouped" and "which output does each group take". It is also the entry in [[balls-boxes-table|the twelvefold way]] for distinguishable balls into distinguishable boxes with none empty.

## On contests
"Each of 3 mailboxes gets at least one of 6 letters," "every color is used," "no group left empty" — all recurring AMC/AIME shapes. The [[pie|PIE]] formula plus fluency with the small cases handles essentially all of them.`,

"stirling-first-kind": String.raw`## Why it works
Permutations decompose uniquely into disjoint cycles; $c(n,k)$ counts those with exactly $k$ cycles. Recursion: element $n$ starts its own cycle ($c(n-1,k-1)$) or inserts into any of $n-1$ positions inside existing cycles ($(n-1)c(n-1,k)$).

## How to use it
Two readings, and knowing both is what makes the numbers usable. Algebraically they are the coefficients when a rising factorial is expanded into powers; combinatorially they count permutations by cycle number.

The recurrence follows the same last-element argument as the second-kind numbers, but with $(n-1)$ rather than $k$ as the multiplier, because the new element can be inserted after any of the $n-1$ existing elements within a cycle.

The row sum is $n!$, which is the quickest sanity check on a computed row, and the algebraic reading is what lets you convert between falling-factorial and ordinary-power bases when manipulating polynomial identities.

## On contests
Cycle-structure problems (dance circles, function iteration orbits) and probability questions about random permutations' cycles — e.g. probability 1..n form one cycle is $\frac{1}{n}$.`,

"necklace-formula": String.raw`## Why it works
[[burnsides-lemma|Burnside]] specialized to the cyclic group: rotation by $d$ has $\gcd(n,d)$ cycles, and grouping rotations by $g = \gcd$ collects $\varphi(n/g)$ rotations each, giving $\frac{1}{n}\sum_{d\mid n}\varphi(d)k^{n/d}$.

## How to use it
This is Burnside specialised to rotations, so use it directly when the objects are arranged in a cycle and rotations are considered identical.

The grouping by order is what makes the sum short: rotating by $j$ positions creates $\gcd(n,j)$ cycles, and collecting the $j$ with the same $\gcd$ gives the $\varphi(d)$ factor. For a specific small $n$ it is often faster to list the rotations directly than to evaluate the sum.

If flips also count as the same object, the group is dihedral rather than cyclic and you must add the reflection terms — $n$ of them, with the count depending on whether $n$ is odd or even, since the axes pass through beads or between them.

## On contests
Circular binary strings up to rotation, bead necklaces, and AIME's occasional "distinguishable up to rotation" counts. The prime-$n$ simplification doubles as a proof of [[fermats-little-theorem|Fermat's little theorem]].`,


"basic-probability": String.raw`## Why it works
With equally likely outcomes, probability is proportional counting. The union formula is [[pie|PIE]] scaled by the sample-space size.

## How to use it
The first thing to check is that your outcomes really are equally likely, because the counting formula is meaningless otherwise. Listing "sum of two dice is $2,3,\dots,12$" as eleven outcomes is the standard way to go wrong; the $36$ ordered pairs are the equally likely ones.

Choose the sample space so that a single count answers the question, then use the union rule for "or" and the complement for "at least one". The complement is almost always shorter, because "none" factors into independent choices while "at least one" does not.

Multiply probabilities only after confirming independence. When the draws are without replacement they are dependent, so either condition step by step or count the favourable and total selections directly with binomial coefficients.

## On contests
The framing step of every counting-probability hybrid. When outcomes aren't equally likely, weight them or switch to a finer space that is uniform.`,

"conditional-probability": String.raw`## Why it works
Conditioning restricts the sample space to $B$ and renormalizes; [[bayes-theorem|Bayes' theorem]] is the definition applied twice to swap the conditioning order.

## How to use it
Read $P(A\mid B)$ as "throw away every outcome outside $B$, then measure $A$ within what remains" — that picture handles most problems without any formula.

The rearranged form is what you use going forwards: a sequence of dependent choices multiplies as $P(\text{first})\cdot P(\text{second}\mid\text{first})\cdots$, which is how without-replacement draws are computed step by step.

Two traps are worth naming. $P(A\mid B)$ and $P(B\mid A)$ are different numbers, and confusing them is exactly the error [[bayes-theorem|Bayes' theorem]] exists to correct. And independence is a claim to verify, not to assume from the story — "the two draws feel unrelated" is not evidence, whereas checking $P(A\cap B)=P(A)P(B)$ is.

## On contests
AMC/AIME "given that" problems reward direct restricted counting. Watch the classic traps: "at least one boy" vs "the older is a boy" condition different spaces.`,

"binomial-probability": String.raw`## Why it works
A specific sequence with $k$ successes has probability $p^k(1-p)^{n-k}$ by independence; $\binom{n}{k}$ sequences share that probability.

## How to use it
Check three conditions before using it: the trials are independent, the number of trials is fixed in advance, and $p$ is the same each time. If any fails, this is the wrong model — drawing without replacement is hypergeometric, and waiting for a first success is geometric.

The formula factors into two pieces worth reading separately: $p^k(1-p)^{n-k}$ is the probability of one specific sequence with $k$ successes, and $\binom nk$ counts how many such sequences there are.

For "at least $k$" questions, sum the terms from $k$ upward, or subtract the smaller tail from $1$ when that is shorter. Expected counts need no summation at all — linearity gives $np$ immediately, without touching the distribution, and the variance is $np(1-p)$, largest at $p=\tfrac12$.

## On contests
Coin/dice repetition problems throughout AMC. AIME variants weight the coin or condition on the outcome — combine with Bayes and the binomial coefficients carefully.`,

"expected-value": String.raw`## Why it works
Expectation is a weighted average, and linearity holds because summation commutes with weighting — no independence needed anywhere in the proof. The same argument in one variable gives $E[aX+b]=aE[X]+b$, so expectation is linear in the variable as well as across variables.

## How to use it
Linearity is the whole toolkit, and the reason is that it needs no independence — dependent, overlapping events add just as cleanly as independent ones. That is what makes hard problems tractable. When the quantity is a count, write it as a sum of [[indicator-variables|indicator variables]] and apply linearity termwise, which is the single most common way expectation problems collapse.

The standard move is decomposition: write the quantity as a sum of indicators, one for each thing that might happen, and add their probabilities. "Expected number of ..." problems become one-line computations this way, because you never need the distribution of the total, only the probability of each individual occurrence.

Compute $E[X]=\sum x_ip_i$ directly only when the distribution is short. If the values run over a long or infinite range, either use the indicator decomposition or the tail-sum formula, both of which avoid enumerating the distribution at all.

## On contests
AIME expected-value problems are almost always linearity-of-indicators in disguise; recognizing "count = sum of indicators" replaces heavy [[casework-method|casework]] with one-line sums.`,

"geometric-distribution": String.raw`## Why it works
Self-similarity: after one failure the situation resets, so $E = 1 + (1-p)E$, giving $E = \frac{1}{p}$. The series view sums $\sum k p(1-p)^{k-1}$ (arithmetico-geometric), whose terms are the distribution itself: the first success falls exactly on trial $k$ with probability $P(X=k)=(1-p)^{k-1}p$.

## How to use it
Set up the self-similar equation rather than summing a series: after one trial you have either succeeded or are back where you started, so $E=1+(1-p)E$, giving $E=\frac1p$. The same conditioning handles variants the closed form does not cover.

Coupon collector is a sum of geometric waits. Once you hold $k$ distinct types, the chance the next draw is new is $\frac{n-k}{n}$, so that stage takes $\frac{n}{n-k}$ on average; adding the stages gives $nH_n$. Recognising it as a sum of independent waits is what makes it easy.

Watch what is being counted. "Trials until the first success" includes the successful trial and averages $\frac1p$; "failures before the first success" excludes it and averages $\frac{1-p}{p}$.

## On contests
"Expected rolls until a 6" ($=6$), coupon-collector variants (expected rolls to see every face: $14.7$), and first-passage questions. The self-similar equation is faster and safer than series summation.`,

"turn-based-games": String.raw`## Why it works
Sum the [[geometric-series|geometric series]] over rounds, or self-similarity: $P = p + (1-p)(1-q)P$ — either the first player wins now, or both miss and the game restarts identically.

## How to use it
Condition on the first round rather than summing the series: either the first player succeeds immediately, or both fail and the position resets exactly, giving $P=p+(1-p)(1-q)P$. Solving takes one line and generalises to variants the closed form does not cover.

The structural fact worth carrying is that moving first is always an advantage when the players are equally skilled — $\frac{1}{2-p}$ exceeds $\frac12$ for every $p$ in $(0,1)$, and approaches $1$ as $p$ grows.

If the turn order is not strictly alternating, or the success probability changes between rounds, the reset argument fails and you need a state recursion instead.

## On contests
Alternating dice/coin duels are AMC/AIME classics ("first to roll a six wins — probability the second player wins" $= \frac{5}{11}$). Set up the restart equation directly; series are backup.`,

"geometric-probability": String.raw`## Key forms
- $P=\dfrac{\text{favourable measure}}{\text{total measure}}$ — length, area or volume, whichever matches the number of free quantities
- one axis per random quantity — two arrival times become a point in a square, three become a point in a cube
- every condition becomes an inequality cutting that region — the answer is then an area of triangles and trapezoids, never an integral
- $|x-y|\le t$ — the meeting condition, a band around the diagonal whose complement is two corner triangles
- $x+y\gt z$ style constraints — the broken-stick family, where the triangle inequalities cut the square to a quarter

## Why it works
For uniform continuous choices, probability is measure (length/area/volume) — counting becomes integration-free region geometry when constraints are linear.

## How to use it
Draw the region. Put each random quantity on its own axis, shade the outcomes satisfying the condition, and take the ratio of areas — the picture does the work that algebra would make painful.

Two habits make the shading reliable. Translate every condition into an inequality in the coordinates before drawing, and check whether the region is bounded by lines through the origin, which usually means the answer is a simple fraction of the square. For meeting problems ("both arrive between 1 and 2, wait 15 minutes"), the condition $|x-y|\le t$ carves a band around the diagonal, and the complement is two corner triangles.

The triangle-from-a-broken-stick classic is the same picture: the three triangle inequalities cut the unit square down to a quarter of its area.

## On contests
"Two people arrive uniformly at random..." and stick-breaking problems are AMC/AIME fixtures. Corner-triangle arithmetic beats integration every time; just keep the geometry exact.`,

"states-recursion-prob": String.raw`## Key forms
- $p_S=\sum_{\text{moves}}P(\text{move})\,p_{S'}$ — one equation per state, conditioning on the first step
- $E_S=1+\sum_{\text{moves}}P(\text{move})\,E_{S'}$ — the same for expected number of steps
- $p_{\text{absorb}}=1$, $p_{\text{fail}}=0$, $E_{\text{absorb}}=0$ — the anchors that close the system
- $P=\frac{a}{a+b}$, $E=ab$ — gambler's ruin from $a$ with target $a+b$ on a fair walk

## Why it works
Markov structure: the future depends only on the current state, so probabilities/expectations per state satisfy linear equations obtained by conditioning on one step.

## How to use it
Name a variable per state, write one equation per state ("value = weighted average of neighbor values, plus 1 if counting steps"), solve the small linear system. Absorbing states anchor the system (probability 1/0, expectation 0). Gambler's ruin closed form: fair walk from $a$ with target $a+b$ succeeds with probability $\frac{a}{a+b}$.

## On contests
AIME's standard hard-probability format: frogs on lily pads, bugs on cube vertices, best-of series. Symmetry first (merge equivalent states) — the system often collapses from 8 states to 3.

Two named cases are worth recognising, and both are this method with the states already chosen.

Gambler's ruin is the one-dimensional walk: from $a$, step $+1$ with probability $p$ and $-1$ with probability $q=1-p$, stopping at $0$ or $N$. First-step analysis gives $p_a = p\,p_{a+1} + q\,p_{a-1}$ with $p_0=0$, $p_N=1$. Fair play makes the $p_a$ arithmetic, so $p_a = \frac{a}{N}$; biased play gives $p_a=\frac{1-(q/p)^a}{1-(q/p)^N}$.

Random walks on a graph are the same thing once symmetric vertices are merged. A particle hopping to a random neighbour is a Markov chain, and collapsing vertices that behave identically usually reduces a graph of eight vertices to three or four states. On a cube, the corners collapse to distance $0,1,2,3$ from the start, and the expected number of steps to reach the opposite corner is $10$; on a tetrahedron the return probability after $n$ steps is $\frac14+\frac34\left(-\frac13\right)^n$. Always look for the collapse before writing equations, since it is what keeps the system small enough to solve by hand.`,

"symmetry-probability": String.raw`## Key forms
- every position is equally likely to hold every item — so a given position is special with probability $\frac{\#\text{special}}{\#\text{total}}$, whatever the position
- $P(A\text{ before }B)=\frac12$ — relative-order questions need no computation at all
- $\frac1{k!}$ — the chance of one prescribed relative order among $k$ items

## Why it works
A uniformly random arrangement induces a uniform distribution on any single position's content — revealing other information in a symmetric way cannot break the symmetry.

## How to use it
"The $k$-th card is an ace" has probability $\frac{4}{52}$ regardless of $k$; "A is before B" is $\frac{1}{2}$; "A, B, C in this cyclic order" is $\frac{1}{3}$. Before computing, ask what the answer must be by exchangeability — many conditional-looking problems have symmetric answers.

## On contests
Massive shortcut on AMC/AIME: relative-order questions ($P(\text{A beats B beats C})$ among random orderings), position questions, and "without replacement" draws that look sequential but are exchangeable.`,

"hypergeometric": String.raw`## Why it works
Choosing $n$ from a population with $K$ marked items: favorable choices pick $k$ marked and $n-k$ unmarked independently; divide by all $\binom{N}{n}$.

## How to use it
Use it whenever a fixed pool is sampled without replacement and you want exactly $k$ of a distinguished type — red balls, face cards, defective parts. The trials are dependent, so the binomial formula does not apply.

The numerator is a straight product: choose which special items are drawn and which ordinary ones fill the rest. The denominator is every equally likely draw. Because it is a ratio of counts, order never enters, and you should not multiply by any arrangement factor.

Expected values still come from linearity, giving $n\frac KN$ exactly as in the binomial case — the dependence changes the distribution but not the mean, which is $E[X]=n\frac KN$ either way. When $N$ is very large compared with $n$, the two distributions nearly coincide, which is why sampling from a big population can be treated as independent.

## On contests
"Probability a 5-card hand has exactly 2 aces" and committee-composition problems. Choosing between binomial (with replacement/independent) and hypergeometric (without) is the tested judgment.`,


"variance-independence": String.raw`## Why it works
$\mathrm{Var}(X) = E[X^2] - E[X]^2$ is algebra on the definition; independence makes cross terms factor ($E[XY] = E[X]E[Y]$), so variances add. Affine changes need no independence at all: $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$, since a shift moves the whole distribution without changing its spread while a scale squares it.

## How to use it
The contrast with expectation is the point worth internalising: $E[X+Y]=E[X]+E[Y]$ always, but the corresponding statements for products and for variance need independence. Applying them to dependent variables is the standard error.

Compute variance as $E[X^2]-E[X]^2$, which usually means finding $E[X^2]$ by the same indicator or [[casework-method|casework]] method used for $E[X]$. For an indicator, $E[X^2]=E[X]$ since $0$ and $1$ square to themselves, which simplifies sums of indicators considerably.

When the variables are dependent, the correction term is the covariance: $\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)+2\operatorname{Cov}(X,Y)$.

## On contests
Rare directly on AMC/AIME but appears in expected-square computations: $E[X^2] = \mathrm{Var} + (E[X])^2$ evaluates sums of squares over random processes cleanly.`,

"expected-fixed-points": String.raw`## Why it works
Write $X=\sum_{i=1}^{n}\mathbf 1[\text{position }i\text{ is fixed}]$. Each indicator has $P=\frac1n$ (position $i$ maps to $i$ with probability $1/n$), so $E[X]=n\cdot\frac1n=1$ for every $n$ — the events are dependent, but [[indicator-variables|linearity of expectation]] ignores dependence entirely. For the full distribution, the number of permutations of $n$ with exactly $k$ fixed points is $\binom{n}{k}D_{n-k}$: choose which $k$ are fixed, then derange the other $n-k$. Dividing by $n!$ gives $P(X=k)=\frac{1}{k!}\cdot\frac{D_{n-k}}{(n-k)!}\to\frac{e^{-1}}{k!}$, a Poisson($1$) limit.

## How to use it
The expectation is pure linearity: $n$ positions, each fixed with probability $\frac1n$, so the answer is $1$ regardless of $n$ — no distribution needed, and the dependence between positions is irrelevant.

For the exact distribution, choose which $k$ points are fixed and derange the rest, which is where $\binom nkD_{n-k}$ comes from. The $D$ values are worth knowing for small arguments: $D_1=0$, $D_2=1$, $D_3=2$, $D_4=9$, $D_5=44$.

Because the count is nearly Poisson with mean $1$, the probability of exactly $k$ fixed points is close to $\frac{1}{e\,k!}$ even for small $n$ — a good sanity check on an exact computation.

## On contests
Both a one-line quotable fact and a proof pattern: AIME expected-value questions and "exactly $k$ fixed / matching" counts about permutations almost always reduce to the indicator sum or the $\binom{n}{k}D_{n-k}$ formula.`,

"coprime-probability": String.raw`## Why it works
Heuristically: divisibility by each prime $p$ is "independent" with probability $\frac{1}{p^2}$ for both of a pair, giving density $\prod_p (1 - \frac{1}{p^2}) = \frac{1}{\zeta(2)} = \frac{6}{\pi^2}$.

## How to use it
The derivation is the useful part: a fixed prime $p$ divides both numbers with probability $\frac{1}{p^2}$, these events are independent across primes, so the coprime density is $\prod_p\left(1-\frac{1}{p^2}\right)$, which is $\frac{1}{\zeta(2)}=\frac{6}{\pi^2}$.

The same reasoning generalises: the probability that $k$ random integers share no common factor is $\frac{1}{\zeta(k)}$, and the density of $k$-th-power-free integers is the same number.

Treat "probability" here as a density over a growing range rather than a genuine uniform distribution, since there is no uniform measure on the integers — for contest purposes the limiting proportion is what is meant.

## On contests
Mostly enrichment; finite coprime-pair counts on AIME go through the Möbius/inclusion-exclusion sum rather than the constant.`,

"pigeonhole": String.raw`## Why it works
If $n$ objects go into $k$ boxes and $n > k$, some box holds two or more — because if every box held at most one, the total would be at most $k \lt  n$. The generalized form is the same counting-by-averages argument: with $n$ objects in $k$ boxes, some box holds at least $\lceil n/k \rceil$, since the maximum is never below the average.

## How to use it
The whole difficulty is inventing the boxes. You control that design. Pick a feature that (a) has few possible values (the boxes) and (b) makes "two objects sharing a value" imply what you want. Classic box choices: remainders mod $m$ (two numbers with equal residue $\Rightarrow$ their difference is divisible by $m$); regions of a subdivided figure (two points in one region $\Rightarrow$ they are close); sum or subset (two subsets with equal sum). For "at least $r$" bounds, run it backward: to force some box to $r$, you need more than $k(r-1)$ objects.

## On contests
The signature of a pigeonhole problem is a guarantee — "prove there must exist," "show two of them," a specific number appearing as $k+1$. On AMC/AIME it shows up quietly inside divisibility and geometry existence problems; the art is always the choice of pigeons and holes, never the principle itself.`,

"handshake-lemma": String.raw`## Why it works
Summing degrees counts each edge at its two endpoints — so the total is even, forcing evenly many odd-degree vertices.

## How to use it
Use it in two directions. Forwards, it converts degree information into an edge count, which is how "each of $n$ people shakes $k$ hands" problems are solved.

Backwards, it is a parity obstruction: since the odd-degree vertices come in pairs, any configuration requiring an odd number of them is impossible. "Can seven people each shake exactly three hands?" is answered instantly — the degree sum would be $21$, an odd number, so no such graph exists.

The lemma also underlies Eulerian path conditions, where the count of odd-degree vertices must be $0$ or $2$, and that count being even is precisely why $1$ or $3$ never occurs.

## On contests
Party-handshake parity questions and graph-flavored AMC problems; the double-count template extends to tournaments, committees, and face-edge counts in polyhedra.`,

"double-counting": String.raw`## Key forms
- $\sum_v\deg v=2E$ — count edge-endpoints once per vertex and once per edge
- $k\binom nk=n\binom{n-1}{k-1}$ — count (committee, chair) pairs by committee first or by chair first
- $\sum_i\binom{w_i}{2}$ against $\binom n3$ — count dominated pairs in a tournament to extract the cyclic triangles
- rows against columns of a $0/1$ incidence matrix — the picture underneath all of them

## Why it works
One set of incidences, two partitions of it — the totals must match. Formally you are sizing a set of ordered pairs $S \subseteq A \times B$ two ways: sum over $a \in A$ of how many $b$ it pairs with, or sum over $b \in B$ of how many $a$. Both count $|S|$, so the expressions are equal. All the power is in choosing what to count — the identity is free once the right set of pairs is named.

## How to use it
Name a set of pairs whose two [[binomial-row-sums|row sums]] you can both evaluate, then equate them. The recurring choices are memberships (people × committees), incidences (points × lines, or students × problems solved), edge-endpoints (vertex × edge), and ordered outcomes (winner × loser in a tournament).

Three shapes are worth recognising.

- Both sums computable — you get an identity, like $k\binom{n}{k} = n\binom{n-1}{k-1}$ from counting a committee together with its chair.
- One sum computable, the other bounded — you get an inequality, which is how most olympiad "at most / at least" combinatorics is proved.
- One sum computable and constant across rows — you get an exact value, the standard route to counting a design's configurations.

When a problem hands you a global constraint and asks for a local bound, this is nearly always the intended tool: count the constrained pairs, then divide by how many any single object can absorb.

## On contests
AIME combinatorics regularly hinges on one clean double count — e.g. counting (student, problem-pair) incidences to bound how many students can agree. When stuck on a counting constraint, ask "what can I count in two ways?"`,

"ramsey-33": String.raw`## Why it works
Among one person's 5 relations, pigeonhole gives 3 of one type; those 3 either contain a matching pair (closing a monochromatic triangle with the center) or form the opposite triangle themselves. $K_5$'s two-pentagon coloring shows 6 is tight.

## How to use it
The proof is a two-step pigeonhole worth reproducing. Fix one person: of their five relationships, at least three share a colour, say three friends. If any two of those three are friends with each other, that trio plus the fixed person is a monochromatic triangle; if none are, those three are mutual strangers.

Minimality needs a construction, not an argument — colour a $5$-cycle one way and its complement the other, and no monochromatic triangle exists. Contest problems asking to show a bound is tight always need this second half.

The general lesson is that these results are proved by fixing one vertex and pigeonholing its edges, which is the standard opening for any small Ramsey-style question. Do not expect the pattern to continue cheaply — Ramsey numbers grow ferociously, with $R(4,4)=18$ and $R(5,5)$ still unknown.

## On contests
The 6-people puzzle appears verbatim in competition folklore; the argument template (fix a vertex, pigeonhole its edges) solves related AMC/AIME-adjacent coloring questions.`

});

// Entries added from the 2023-2025 AMC/AIME sweep.
Object.assign(window.MATH_DETAILS, {

"losing-positions": String.raw`## Key forms
- $W$ = some move reaches $L$, $\;L$ = every move reaches $W$ — label upward from the terminal position by backward induction, and the position you are asked about is winning iff it carries a $W$
- terminal position is $L$ — the base case under normal play, which flips if taking the last object loses
- $(k+1)\nmid n$ — the winning positions of the subtraction game with moves $\{1,\dots,k\}$, since the loser is exactly the multiples of $k+1$
- $n_1\oplus\cdots\oplus n_k\ne0$ — the winning positions of multi-pile Nim, the XOR of the pile sizes being nonzero

## Why it works
Backward induction. The terminal position's label is forced by the rules, so "take the last token and win" makes $0$ a loss for whoever must move. Every earlier position is then Winning iff some legal move reaches a Losing one, and Losing iff all of them reach Winning ones. With finitely many move sizes the label depends only on recent history, so the $W$/$L$ pattern is eventually periodic, with period dividing a small combination of the move sizes. The winner from a given $n$ is then decided by a congruence rather than by playing the game out.

## How to use it
Tabulate $0, 1, 2, \dots$ by hand until the pattern repeats twice, which is what confirms the period, then answer counting questions with modular arithmetic. The strategy falls straight out of the labels: from a winning position, move to any losing one and repeat. Care at the boundary, since "last token wins" and "last token loses" flip the base case and therefore the whole table. For two-pile or richer games, look for a symmetry strategy (mirror the opponent) before brute-forcing, and for genuine multi-pile Nim use the XOR rule directly.

## On contests
2024 AIME I #3 is the direct application: players remove $1$ or $4$ tokens, and the first player loses exactly at $n \equiv 0, 2 \pmod 5$, giving $809$ values of $n \le 2024$. AMC versions typically ask who wins with optimal play for one specific $n$, which the same table answers instantly.`

});

Object.assign(window.MATH_DETAILS, {

"weighted-binomial-sums": String.raw`## Why it works
Differentiating $(1+x)^n = \sum \binom{n}{k}x^k$ brings down a factor of $k$; multiplying by $x$ realigns the powers; setting $x = 1$ sums. Twice through gives $k(k-1)$ sums, and $k^2 = k(k-1) + k$ assembles the $k^2$ version. Combinatorially: $k^2\binom{n}{k}$ counts committees with a chair and a (possibly identical) secretary.

## How to use it
The derivative pipeline evaluates any $\sum k^m \binom{n}{k} x^k$; the combinatorial story (chair/secretary [[casework-method|casework]]: same person or different) is faster for small $m$ and less error-prone under pressure. For alternating versions, differentiate first and then substitute $x = -1$.

## On contests
Expected values over random subsets ($E[|S|^2]$ for uniform random subsets needs exactly $\sum k^2\binom{n}{k}/2^n = \frac{n(n+1)}{4}$) and AIME identity evaluations. The committee-chair-secretary story generalizes to any polynomial weight.`,

"cayleys-formula": String.raw`## Why it works
The Prüfer correspondence: repeatedly delete the smallest-labeled leaf and record its neighbor; a tree on $n$ labeled vertices produces a sequence of $n-2$ labels, and the process reverses uniquely. Sequences are free choices: $n^{n-2}$.

## How to use it
The formula is short but the bijection is what solves problems. Encode a tree by repeatedly deleting the smallest-labelled leaf and recording its neighbour; the resulting $n-2$ labels determine the tree uniquely, and every sequence arises exactly once.

That correspondence answers the harder variants directly. Since a vertex appears one fewer time than its degree, counting trees with prescribed degrees $d_1,\dots,d_n$ becomes the multinomial coefficient $\binom{n-2}{d_1-1,\dots,d_n-1}$, and counting trees in which a given vertex is a leaf becomes counting sequences that omit it.

Watch the labelling assumption — the count is for distinguishable vertices, and unlabelled trees have no closed form.

## On contests
AIME/olympiad network-counting problems ("how many ways to connect $n$ towns with $n-1$ roads so all are reachable"). The degree-refinement (multinomial over Prüfer sequences) handles "each hub connects to exactly $k$ cities" variants.`,

"eulerian-paths": String.raw`## Why it works
A pass through a vertex uses two edges (in, out), so intermediate vertices need even degree; the endpoints of a non-closed trail each spare one odd edge. Sufficiency is Hierholzer's construction: greedily walk until stuck (necessarily back at the start when degrees are even), then splice in detours at visited vertices with unused edges.

## How to use it
Count odd-degree vertices, and the answer follows immediately: zero means a closed trace, two means an open one starting and ending at those vertices, anything more means it cannot be done in one stroke.

Check connectivity as well, since the degree condition alone is not sufficient — a graph in two separate pieces fails however even its degrees are.

For "minimum retraced distance" problems, the number of odd vertices tells you how many edges must be duplicated: pair up the odd vertices along shortest paths and double those edges, which makes every degree even. Do not confuse any of this with Hamiltonian paths, which visit vertices rather than edges and have no comparable criterion.

## On contests
"Can this figure be drawn in one stroke" (MATHCOUNTS/AMC) and postman-flavored "minimum retraced distance" questions. Distinguish from Hamiltonian (every vertex once) — the vertex version has no such clean criterion.`,

"plane-regions": String.raw`## Why it works
Incremental counting: a new line crossing $k$ existing lines is cut into $k+1$ pieces, each splitting one region — so lines add $1, 2, 3, \dots$ new regions, summing to $1 + \sum_{i=1}^{n} i = \frac{n^2+n+2}{2}$. A new circle crossing each old one twice is cut into $2(n-1)$ arcs, each adding a region.

## How to use it
Derive rather than memorise: adding the $k$-th line crosses the previous $k-1$ lines, and each crossing splits one more region, so it adds $k$ regions in total. Summing gives $1+\sum_{k=1}^{n}k$, which is the closed form. The same argument with two crossings per circle gives the circle count.

That incremental principle is the transferable part — it handles configurations the formulas do not cover, such as a mix of lines and circles, or lines with some parallels, by counting crossings as each curve is added.

Check the general-position hypothesis before quoting a maximum. Any parallel pair or triple concurrence loses regions, and problems often specify a configuration that deliberately fails it.

## On contests
Direct AMC questions ("max pieces of a pancake with 5 cuts": 16) and the backbone of 2025 AIME I #13 (expected regions from random chords = 1 + chords + expected crossings, by linearity).`,

"order-statistics": String.raw`## Why it works
By symmetry, $n$ uniform points plus the two interval endpoints split $[0,1]$ into $n+1$ exchangeable gaps, so each gap expects $\frac{1}{n+1}$; the $k$-th smallest point sits after $k$ gaps at $E[X_{(k)}] = \frac{k}{n+1}$. Directly: $P(\max \le x) = x^n$ integrates to $E[\max] = \frac{n}{n+1}$.

## How to use it
The distribution function route ($P(\max \le x) = x^n$, $P(\min \ge x) = (1-x)^n$) answers probability questions; the gap-symmetry route answers expectation questions instantly. For the range: $E[\max - \min] = \frac{n-1}{n+1}$.

## On contests
"[[expected-value|Expected value]] of the largest of three spins," waiting-point problems, and [[geometric-probability|geometric probability]] hybrids (the broken-stick setup is order statistics on two points). The $\frac{k}{n+1}$ pattern is worth having on instant recall.`,

"total-expectation": String.raw`## Why it works
Group the outcomes by which case $A_i$ occurred and average within cases first: the inner averages are the conditional expectations, and recombining with weights $P(A_i)$ reproduces the overall average. It is associativity of [[weighted-average|weighted averages]], elevated to a principle.

## How to use it
Choose the partition that makes each conditional expectation easy, and conditioning on the first step is almost always that choice — it turns a process into an equation relating $E[X]$ to itself.

Wald's identity is the case worth recognising separately: when a random number of independent pieces are summed, the expected total is the product of the two expectations, provided $N$ does not depend on the values of the pieces. That proviso matters, and dropping it is the standard error.

The technique pairs naturally with state recursions: the law of total expectation writes one equation per state, and solving the small system gives every expectation at once. Whichever partition you pick, check it is disjoint and exhaustive — the same requirement as ordinary [[casework-method|casework]], and the usual source of a wrong weighted average.

## On contests
The organizing principle behind nearly every AIME expected-value problem: condition on the first step, write the tower equation, solve. Misapplying it (conditioning on a non-partition) is the error to guard against — cases must be exclusive and exhaustive.`,



"bijection-method": String.raw`## Key forms
- strictly increasing sequences $\leftrightarrow$ subsets — choosing the set fixes the order, so $\binom nk$ counts both
- solutions of $x_1+\cdots+x_k=n$ $\leftrightarrow$ [[stars-and-bars|stars and bars]] — a solution is a row of stars cut by $k-1$ bars
- lattice paths $\leftrightarrow$ words in R and U — a path is the string of its own steps
- "at most $k$" $\leftrightarrow$ its complement — $k\leftrightarrow n-k$ turns an awkward bound into an easy one

## Why it works
A one-to-one correspondence pairs the two sets off perfectly, so they have the same size — even when one is a mess and the other is a textbook family. Counting the easy set is counting the hard set.

## How to use it
Standard dictionary worth memorizing: strictly increasing $k$-sequences from $[n]$ $\leftrightarrow$ $k$-subsets ($\binom{n}{k}$); nondecreasing sequences $\leftrightarrow$ [[stars-and-bars|stars and bars]] (shift by position: $b_i = a_i + i$ turns nondecreasing into increasing); lattice paths $\leftrightarrow$ words in R and U; solutions with $x_i \ge a_i$ $\leftrightarrow$ solutions with $y_i \ge 0$ (substitute $y_i = x_i - a_i$); "at most half" $\leftrightarrow$ "at least half" via complement. To verify a bijection, exhibit the inverse map — if you can undo it uniquely, the correspondence is genuine.

## On contests
The elegant path on AMC/AIME counting: any time the answer to a strange-looking count is a clean binomial, a bijection is the intended solution. Also the safest way to handle "sequences with constraints" — transform the constraint away rather than casing on it.`,

"recursive-counting": String.raw`## Key forms
- $a_n=\sum(\text{ways to finish})\times a_{\text{smaller}}$ — classify by the last step or the last block
- one sequence per state, updated together — the move when several constraints interact
- disjoint, exhaustive cases and hand-checked base cases — the two places these arguments go wrong

## Why it works
Every valid configuration of size $n$ ends in some final step, and removing that step leaves a valid smaller configuration. Classifying by the last step therefore partitions the count into copies of smaller counts — a recurrence, computable forward from base cases without any closed form.

## How to use it
Ask: what can the ending look like? Strings with no $11$: end in $0$ (anything before) or $01$ (anything before that) — $a_n = a_{n-1} + a_{n-2}$. Tilings with dominoes: last tile vertical or two horizontals. When one sequence isn't enough (say, the constraint depends on the last character), keep one sequence per state — $z_n$ = valid strings ending in 0, $o_n$ = ending in 1 — and update the vector each step. Compute a small table by hand; contest sizes rarely exceed $n = 20$.

## On contests
The AIME workhorse for strings, seatings, and paths with adjacency constraints. AMC versions are usually two-term recurrences in disguise (often Fibonacci); the AIME versions need 2–4 states. The reflex to build: "constraint on neighbors" $\Rightarrow$ recursion on the last block, computed as a table.

Two recurrences are worth knowing on sight, and they are the same one. Tilings of a $1\times n$ strip by $1\times1$ and $1\times2$ tiles satisfy $a_n=a_{n-1}+a_{n-2}$, classifying on whether the last tile is short or long, so the counts are Fibonacci. Binary strings with no two consecutive $1$s obey the same recurrence, classifying on the last digit: a string ending in $0$ can follow anything of length $n-1$, and one ending in $1$ forces a $0$ before it. Changing the tile set changes only the shape of the recurrence, so $1\times3$ tiles give $a_n=a_{n-1}+a_{n-3}$.`

});

Object.assign(window.MATH_DETAILS, {

"constructive-counting": String.raw`## Key forms
- $n(n-1)\cdots(n-k+1)$ — an ordered selection built one slot at a time from a shrinking menu
- $\binom nk=\frac{n(n-1)\cdots(n-k+1)}{k!}$ — the same build, divided by the orders producing one unordered object
- fill the most restricted slot first — the last digit of an even number, or the picky person's seat
- $9\cdot10^{n-1}$ — the count of $n$-digit numbers, the leading digit avoiding zero, and $(d-1)d^{\,n-1}$ when only $d$ digits are allowed, as in "no digit $7$"
- $\binom 9n$ — numbers with strictly increasing digits, since choosing the digit set fixes the order

## Why it works
The multiplication principle: if a sequence of decisions builds each object exactly once, and step $i$ always offers $c_i$ options no matter what came before, the total is $\prod c_i$. The two ways it breaks are exactly the two things to watch: a step whose option count depends on earlier choices (fix: reorder the steps or split into cases), and an object built more than once (fix: divide by the number of times each is built). Digit conditions are the cleanest case, because they are independent across positions, so the count factors into a product instead of an enumeration.

## How to use it
Order the decisions from most constrained to least, so the restricted slot's count stays uniform. For "at least one" constraints, construction usually loses to [[complementary-counting|complementary counting]]; for identical objects or unordered selections, construct the ordered version and divide, by $k!$ for unordered, $n$ for rotations, $2$ for reflections. The reflex check before multiplying is "does this step's count ever depend on what I picked earlier?"

For counting integers by a digit rule, the slots are the digit positions. At a fixed length, multiply the choices per slot with the leading digit avoiding $0$. Up to a bound $N$, sweep the position where the number first drops below $N$: earlier digits match $N$, that digit is strictly smaller, and the rest are free, then sum over positions. This is the digit-DP idea, and it scales to AIME-sized bounds where listing cannot. Treat "digit sum $=k$" with [[stars-and-bars|stars and bars]] across the slots, and remember that complementary counting, total minus the ones that do contain a $7$, is often shorter than the direct build.

## On contests
The default engine for digit counts, seatings, and license-plate problems at MATHCOUNTS and AMC level, and the inner loop inside nearly every harder count. "How many integers below $N$ have property P" is constant at every level. The classic trap is the leading-zero and last-digit interaction, as in the even-distinct-digits example where units $0$ or not changes the thousands count, which is why "most restricted first, then case if needed" is the discipline.`,

"indicator-variables": String.raw`## Key forms
- $X=\sum_iX_i$ with $E[X]=\sum_iP(\text{occurrence }i)$ — the whole method in one line
- one indicator per pair, per position, or per adjacency — choosing the atomic occurrence is the only real decision

## Why it works
Expectation is linear: $E[X + Y] = E[X] + E[Y]$ with no independence assumption, because expectation is a sum over outcomes and sums reorder freely. An indicator $X_i$ (1 if event $i$ occurs, else 0) has $E[X_i] = P(X_i = 1)$, so any counting random variable $X = \sum X_i$ has expectation $\sum P(\text{event}_i)$ — each potential occurrence contributes its own probability, overlaps and all.

## How to use it
Identify the atomic occurrences being counted — fixed points, adjacent pairs, satisfied people, monochromatic triangles — and write one indicator each. Compute a single $P(X_i = 1)$ (symmetry usually makes them all equal), multiply by how many there are. Never condition, never case. Classics: [[expected-fixed-points|expected fixed points]] of a permutation $= n \cdot \frac{1}{n} = 1$; expected records $= H_n$; coupon-collector via a different decomposition. It computes expectations of dependent counts that would be hopeless by distribution. The whole method is linearity of expectation applied to a sum of $0$/$1$ terms, so it inherits every property of [[expected-value|expected value]], including that the indicators need not be independent.

## On contests
The intended solution to most AIME "find the expected number of ..." problems, and the only humane one when events overlap. If a problem asks for an average over all configurations, translate it to an expectation and fire indicators — averages are expectations in disguise.`,

"invariants-coloring": String.raw`## Key forms
- $\operatorname{parity}(\text{sum})$ or $\operatorname{parity}(\text{count})$ — by far the most common invariants
- $\#\text{black}-\#\text{white}$ — a checkerboard colouring builds one, since a domino covers one of each and an L-tromino does not
- a sum or product taken $\bmod n$ — the invariant of choice when moves add or scale by fixed amounts
- $I(\text{after})\ge I(\text{before})$ — a monovariant instead, which proves termination rather than unreachability

## Why it works
If every legal move preserves a quantity, then the quantity is constant along any sequence of moves — so states with different values of the invariant are mutually unreachable, no matter how clever the play. Colorings are invariants in disguise: assigning weights (colors) to cells and checking what each piece or move covers turns a geometric impossibility into arithmetic.

## How to use it
Hunt in this order: parity of a natural quantity (sum, number of inversions, count of a symbol), then sums mod 3 or 4, then colorings — checkerboard first, then stripes or four-colorings for L-shaped and longer pieces. For termination questions use a monovariant: a bounded quantity that strictly moves one way. The craft is matching the coloring to the piece: a $1 \times 3$ tile wants three-coloring by column mod 3, a T-tetromino wants the checkerboard imbalance.

## On contests
The standard finisher for "show it's impossible" — mutilated chessboards, coin-flipping games, chip-firing puzzles. AMC versions hide it as "which of these positions can be reached"; olympiad versions demand inventing the invariant. If a process problem stumps you, compute a few small states and watch what doesn't change.`

});

Object.assign(window.MATH_DETAILS, {

"bayes-theorem": String.raw`## Why it works
Both $P(A \cap B) = P(A)P(B \mid A)$ and $P(A \cap B) = P(B)P(A \mid B)$ describe the same overlap. Setting them equal and dividing by $P(B)$ gives Bayes' theorem — a bookkeeping identity that swaps the direction of the conditioning. The denominator $P(B) = \sum_i P(B \mid A_i)P(A_i)$ is the law of total probability: sum the evidence's probability across every disjoint cause. Since that denominator does not depend on which cause you are testing, the shape worth remembering is that the posterior is proportional to the likelihood times the prior.

## How to use it
Identify which direction you are given and which you want. Problems hand you $P(\text{evidence}\mid\text{cause})$ — the test's accuracy — and ask for $P(\text{cause}\mid\text{evidence})$, and Bayes is the conversion.

The reliable method is not the formula but counting whole people. Take a population of $100{,}000$, split it by the base rate, apply the accuracy rates to each group, and read the answer as true positives over all positives. It is faster under time pressure and makes the result intuitive rather than surprising.

The lesson to carry is that a rare condition drowns even a very accurate test in false positives: when the base rate is far below the false-positive rate, most positives are false, no matter how good the test sounds.

## On contests
The intended tool for "given that [evidence], find the probability of [cause]" — defective-item-from-a-factory, positive-medical-test, drawn-from-an-unknown-urn. On AMC/AIME it usually reduces to the tree-diagram form: favorable path over total paths, which is Bayes in disguise.`,

"generating-function-method": String.raw`## Key forms
- $\frac{1}{1-x}=\sum_{n\ge0}x^n$ — an unlimited supply of one item
- $1+x+\cdots+x^m$ — an item usable at most $m$ times; $(1+x)$ for at most once, and $(1+x)^n$ for take-or-leave over $n$ items
- $\frac{1}{(1-x)^k}=\sum_n\binom{n+k-1}{k-1}x^n$ — [[stars-and-bars|stars and bars]], read off as a coefficient
- $\frac{x(1-x^6)}{1-x}=x+x^2+\cdots+x^6$ — one standard die
- $[x^N]\prod_i f_i(x)$ — multiply the factors and read the coefficient; the product handles every interaction

## Why it works
Multiplying $\left(\sum_i x^{a_i}\right)\left(\sum_j x^{b_j}\right)$ produces a term $x^{a_i + b_j}$ for every pair of choices, so the coefficient of $x^N$ in the product counts exactly the combinations summing to $N$. Independent decisions multiply as factors and the exponents do the addition for you, which is to say that multiplying polynomials convolves their coefficient sequences. A generating function is bookkeeping for "ways per total".

## How to use it
Model each choice as a factor whose exponents are its allowed contributions: a die is $x + x^2 + \cdots + x^6$, an unlimited supply of value-$a$ coins is $\frac{1}{1 - x^a} = 1 + x^a + x^{2a} + \cdots$, a bounded part $0 \le k \le m$ is $1 + x + \cdots + x^m$. Multiply, then extract the coefficient of $x^N$ by expansion, by a known series such as $\frac{1}{(1-x)^k} \to \binom{n+k-1}{k-1}$, or by partial fractions when you want a closed form. Splitting a rational generating function into pieces $\frac{c}{1-rx}$ makes each one a [[geometric-series|geometric series]], so $a_n$ becomes a sum of $r^n$ terms, which is the generating-function proof of linear-recurrence closed forms.

Global tricks: substitute $x = 1$ to total all coefficients, differentiate then set $x = 1$ for a weighted sum, and use a roots-of-unity filter to select one residue class of exponents.

Everything above uses ordinary generating functions, which count unlabeled totals. [[exponential-generating-functions|Exponential generating functions]], where the count sits on $\frac{x^n}{n!}$, handle labeled or ordered structures instead; multiplying EGFs interleaves labels, which is why $e^x$ builds permutations and $\frac{e^x + e^{-x}}{2}$ builds even-size subsets.

## On contests
The systematic route for coin, stamp and dice-sum counts and for constrained integer solutions, and the natural home for the roots-of-unity filter on AIME "count the subsets whose sum is divisible by $k$" problems. It also covers dice-sum distributions, including the famous relabel-two-dice problem, partition-with-conditions counts, and it is the unifying view behind [[stars-and-bars|stars and bars]] and the [[pie|PIE]] identities. It trades cleverness for a reliable model-multiply-extract pipeline, so reach for it when [[casework-method|casework]] on the count would explode.`

});

Object.assign(window.MATH_DETAILS, {

"extremal-principle": String.raw`## Key forms
- take $\max S$ or $\min S$ and contradict its extremeness — what usually falls is the assumption that the configuration exists at all
- the longest path or chain — its endpoint has no unused neighbours, so every neighbour already lies on it
- the closest pair of points — nothing is nearer, which rules out any construction that would produce a shorter distance
- a minimal counterexample — build a smaller one from it and the minimality is contradicted, which is infinite descent run over a finite set
- well-ordering: every non-empty set of positive integers has a least element — the guarantee that "smallest" exists at all

## Why it works
A finite collection, or any set of positive integers, has a largest and a smallest member. Naming one hands you a property no other element has. The maximum admits no larger neighbour and the minimum no smaller one, so if you can show the extreme object could be pushed a little further, you have contradicted the very thing that defined it. That is the entire method: not constructing an object, but showing that the extreme one cannot behave the way the problem assumes.

Concretely, take the longest path $v_1 v_2 \dots v_k$ in a graph. If $v_1$ had a neighbour off the path, the path could be lengthened, which is impossible. So every neighbour of $v_1$ sits somewhere on the path, and now the degree of $v_1$ tells you something about the path's length. Nothing was built; the extreme object simply had nowhere left to go.

## How to use it
Pick the extreme that matches the structure. The longest path or chain traps its endpoints' neighbours inside it. The closest pair of points leaves no room for anything nearer. The vertex of highest degree bounds what its neighbours can do. The smallest positive value of a quantity is what infinite descent attacks. The minimal counterexample is the default when the claim is an impossibility.

Then push on it, in one of two directions: show the extremal object forces the configuration you want, or show it could be extended or improved, which is the contradiction. Before either, make sure the extreme exists, which is immediate for a finite set and is well-ordering for the positive integers, but needs an argument on an infinite set of reals.

## On contests
An olympiad workhorse for existence and impossibility proofs, especially graph and grid problems, combinatorial geometry, and "show some configuration must occur". On AIME it appears more quietly, for instance in justifying that a smallest solution exists before bounding it. When a problem resists direct construction, ask what the largest or smallest object must look like.`

});

Object.assign(window.MATH_DETAILS, {

"sprague-grundy": String.raw`## Why it works
In [[losing-positions|Nim]] the XOR ("Nim-sum") of the pile sizes is a handle you control: if it's nonzero, some pile has a leading bit you can clear to zero the whole XOR (a move to a losing-for-opponent position); if it's zero, every move breaks it. Sprague–Grundy generalizes this by assigning each position a value $g = \operatorname{mex}$ of its options' values — the least nonnegative integer they miss. A position with $g = 0$ can only move to $g \ne 0$ and vice versa, exactly Nim's win/loss logic, and independent games combine because the XOR of Grundy values behaves like one Nim position.

## How to use it
For a single game type, tabulate $g(0), g(1), \dots$ via $g(n) = \operatorname{mex}\{g(\text{reachable})\}$ until the (usually periodic) pattern emerges; $g = 0$ marks the losing positions. When a game splits into independent parts — several piles, a board that separates — compute each part's Grundy value and XOR them: the whole is a loss iff the XOR is $0$, and the winning move is the one that zeroes it (treat each part as a Nim pile of size $g$).

## On contests
Multi-pile take-away and token games on AIME and olympiad. The single-pile version is the Losing Positions card; Sprague–Grundy is what you need once the game separates into independent components. Remember two facts: losing $\iff$ Nim-sum $0$, and games add by XOR of Grundy values.`,

"erdos-szekeres": String.raw`## Why it works
Tag each term $x_i$ with $(u_i, d_i)$: the lengths of the longest increasing and longest decreasing subsequences ending at $x_i$. If $i \lt  j$ and $x_i \lt  x_j$ then $u_j > u_i$; if $x_i > x_j$ then $d_j > d_i$ — so distinct terms always get distinct tags. With $mn + 1$ terms but only $mn$ tags satisfying $u \le m, d \le n$, pigeonhole forces some $u \ge m+1$ or $d \ge n+1$.

## How to use it
The proof is the technique worth carrying: attach to each term the pair (longest increasing run ending there, longest decreasing run ending there). Any two terms have different labels, because whichever comes first extends one of the other's runs.

If no run reached $m+1$ or $n+1$, every label would lie in an $m\times n$ grid of possibilities — only $mn$ of them for $mn+1$ terms, which pigeonhole forbids.

Recognise the trigger as any problem asking to guarantee a monotone subsequence, or to show a sequence cannot avoid one. The labelling idea generalises: pairing each element with two extremal statistics and counting the available pairs is a reusable pigeonhole setup.

## On contests
Olympiad combinatorics, typically as a lemma ("among these $N$ values, some $k$ form a monotone chain"), and a natural companion to the [[pigeonhole|Pigeonhole Principle]]. The bound $mn+1$ is sharp — a grid of decreasing blocks of decreasing runs achieves $mn$ with no long monotone subsequence.`,

"planar-graph-bound": String.raw`## Why it works
[[eulers-formula|Euler's formula]] $v - e + f = 2$ holds for any connected planar drawing. Every face is bounded by at least $3$ edges and every edge borders exactly $2$ faces, so $2e \ge 3f$, i.e. $f \le \frac{2e}{3}$; substituting into Euler gives $e \le 3v - 6$. If the graph is triangle-free (in particular bipartite), every face needs $\ge 4$ edges, so $2e \ge 4f$ and $e \le 2v - 4$.

## How to use it
Use the bound to prove non-planarity by counting: a graph with more edges than $3v-6$ allows cannot be drawn without crossings. This settles $K_5$ immediately, since $10\gt3\cdot5-6=9$.

For triangle-free graphs use the sharper form, because every face then needs at least four edges. That is what disposes of $K_{3,3}$, which is bipartite with $9\gt2\cdot6-4=8$.

The bound runs one way only — violating it disproves planarity, but satisfying it proves nothing. A useful corollary is that every planar graph has a vertex of degree at most $5$, which is the starting point for planar colouring arguments.

## On contests
AMC/AIME problems about maps, networks, and polyhedra, and olympiad graph theory. It is the corollary of [[eulers-polyhedron-formula|Euler's Polyhedron Formula]] (filed under Geometry) — the same identity read as a planar graph rather than a solid; keep the two linked in your head.`,

"halls-marriage": String.raw`## Why it works
The condition $|N(S)| \ge |S|$ for every $S \subseteq X$ is clearly necessary — a group of applicants adjacent to fewer jobs than its size can't all be matched. Sufficiency is the theorem: if no matching saturates $X$, an augmenting-path argument extracts a specific deficient set $S$ with $|N(S)| \lt  |S|$. So the sole obstruction to a full matching is one bottleneck set.

## How to use it
To prove a matching exists, verify Hall's condition; to prove none exists, exhibit one deficient set — a group of applicants collectively connected to fewer jobs than there are applicants. That asymmetry is what makes the theorem practical, since disproof needs only a single example.

Checking all $2^{|X|}$ subsets is rarely necessary. Structural arguments usually suffice: in a $k$-regular bipartite graph, counting the edges leaving $S$ shows $|N(S)|\ge|S|$ at once, so a perfect matching always exists.

The standard dressings are assigning people to tasks, placing non-attacking rooks, and choosing distinct representatives from a family of sets — recognising any of these as bipartite matching is the first step.

## On contests
Olympiad combinatorics: systems of distinct representatives, Latin-square and tiling completions, and "can these be paired / assigned?" existence problems. The whole task reduces to checking Hall's condition or naming the one set that fails it.`

});

Object.assign(window.MATH_DETAILS, {

"dilworths-theorem": String.raw`## Why it works
A chain and an antichain share at most one element, so you always need at least (largest antichain) chains to cover the poset — the easy direction. That this many suffice is the theorem, provable by induction or via [[konigs-theorem|Kőnig's theorem]] on an associated bipartite graph. Mirsky's dual swaps chains and antichains.

## How to use it
Recognise the setup as a partial order — divisibility, containment, or dominance in two coordinates — where you must either cover everything with few chains or find a large incomparable family.

The theorem converts between the two, which is what makes it useful: bounding one side is usually much easier than the other. To show few chains suffice, exhibit a small antichain bound; to show a large antichain exists, exhibit a covering.

Erdős–Szekeres falls out by ordering terms by both index and value, where chains are monotone subsequences and antichains are the opposite monotonicity — recognising that specialisation is often the quickest route into a sequence problem.

## On contests
Olympiad combinatorics: partitioning into monotone pieces, scheduling, "cover with few chains." Building the right poset and quoting Dilworth or Mirsky is usually the cleanest path.`,

"sperners-theorem": String.raw`## Why it works
Partition the subset lattice of $[n]$ into $\binom{n}{\lfloor n/2\rfloor}$ symmetric chains; an antichain meets each at most once, capping its size, and the middle layer attains it. The LYM inequality $\sum_{A} \binom{n}{|A|}^{-1} \le 1$ over any antichain gives the bound directly, maximized by all middle-size sets.

## How to use it
Use it when a problem asks for the most subsets you can choose with none containing another — committees where no committee contains another, or divisor sets with no divisibility relations.

The construction is immediate: take every subset of size $\lfloor n/2\rfloor$. Proving no larger family exists is the real content, and the symmetric chain decomposition is the clean route — partition all subsets into chains, and an antichain can take at most one member from each.

The LYM inequality is the more flexible form, since it weights subsets by size and so handles families with mixed sizes, which the plain bound does not.

## On contests
Olympiad extremal set theory. Carry two things: the answer $\binom{n}{\lfloor n/2\rfloor}$ and the LYM inequality as the lever.`,

"polya-enumeration": String.raw`## Key forms
- $Z_G=\frac{1}{|G|}\sum_g\prod_i x_i^{c_i(g)}$ — the cycle index, recording how each symmetry splits the positions into cycles
- $x_i=k$ — substituting this recovers [[burnsides-lemma|Burnside's]] plain count of $k$-colourings
- $x_i=\sum_j y_j^{\,i}$ — substituting this instead breaks the count down by how many of each colour, which Burnside alone cannot do
- $Z_{C_n}=\frac1n\sum_{d\mid n}\varphi(d)\,x_d^{\,n/d}$ — the cycle index for necklaces

## Why it works
Burnside counts orbits by averaging fixed points; Pólya refines "fixed" into a generating function via each symmetry's cycle structure. A coloring is fixed by $g$ iff it is constant on every cycle of $g$, so weighting by colors gives $\prod_k(\sum \text{colors}^k)^{c_k(g)}$, and averaging over $G$ is the cycle index $Z_G$.

## How to use it
Compute the cycle index $Z_G = \frac{1}{|G|}\sum_g \prod_k t_k^{c_k(g)}$. Substitute $t_k = m$ for a plain count (that's Burnside), or $t_k = x^k + y^k + \cdots$ to get a generating function whose coefficients count colorings with a prescribed number of each color — e.g. bracelets with exactly three red beads.

## On contests
Needed only for "count colorings with a fixed color distribution, up to symmetry" — rare and olympiad-tier. For plain orbit counts, [[burnsides-lemma|Burnside's lemma]] is enough.`,

"probability-generating-functions": String.raw`## Why it works
$G_X(s) = E[s^X] = \sum_k P(X=k)s^k$ stores the whole distribution. Differentiating and evaluating at $s = 1$ pulls down factors of $k$: $G'(1) = E[X]$ and $G''(1) = E[X(X-1)]$, giving the variance. Independence multiplies PGFs since $E[s^{X+Y}] = E[s^X]\,E[s^Y]$.

## How to use it
For a sum of independent nonnegative-integer variables, multiply their PGFs and expand to read the distribution — a single die is $\frac{s + s^2 + \cdots + s^6}{6}$, so $n$ dice is that to the $n$-th power. Get moments from the derivatives at $1$, and recover $P(X=k)$ as the coefficient of $s^k$.

## On contests
An AIME/olympiad convenience for sums of independent counts and for extracting $E[X]$ and $\mathrm{Var}(X)$ together — essentially ordinary [[generating-function-method|generating functions]] in probabilistic dress.`,

"konigs-theorem": String.raw`## Why it works
Any vertex cover must contain an endpoint of every matched edge, so cover $\ge$ matching always. In bipartite graphs, an augmenting-path argument (equivalently max-flow/min-cut on the bipartite network) constructs a cover of exactly the maximum matching's size, giving equality. It is the dual of [[halls-marriage|Hall's]] theorem.

## How to use it
Use it to convert between two bounds of very different difficulty. Exhibiting a matching of size $k$ bounds the cover from below, and exhibiting a cover of size $k$ bounds the matching from above; when the two agree, both are optimal and you have proved it.

The complementary reading is often what a problem actually wants: the largest independent set is the complement of the smallest vertex cover, so König also computes maximum independent sets in bipartite graphs.

Check bipartiteness first, since the theorem genuinely fails without it, and configurations that look bipartite sometimes contain an odd cycle.

## On contests
Olympiad combinatorics on grids and bipartite structures. The min–max duality is the tool; pair it with Hall's theorem, its existence-flavored twin.`,

"turans-theorem": String.raw`## Why it works
Among $K_{r+1}$-free graphs, rebalancing degrees (Zykov symmetrization) never creates a clique and only adds edges, pushing the maximum to the Turán graph — the complete $r$-partite graph with near-equal parts — which has $(1-\frac1r)\frac{n^2}{2}$ edges.

## How to use it
Recognise the shape as an extremal question: how many edges can a graph have before a clique of a given size is unavoidable. The bound answers it and the Turán graph shows it cannot be improved.

Mantel's case is the one that appears at contest level — at most $\lfloor n^2/4\rfloor$ edges without a triangle, attained by the balanced complete bipartite graph. Proving that case directly is short: for any edge, its endpoints share no neighbour, so their degrees sum to at most $n$.

Use it in the contrapositive when a problem gives you many edges and asks for a clique — exceeding the bound guarantees one exists without having to construct it.

## On contests
Olympiad extremal graph theory, with Mantel occasionally surfacing on harder problems. Remember the extremal example (balanced complete multipartite), not just the number.`,

"graph-coloring": String.raw`## Why it works
Greedy coloring in any order uses $\le \Delta + 1$ colors: each vertex sees at most $\Delta$ colored neighbors, so a color is free. Two colors suffice exactly when the graph is bipartite, which is equivalent to having no odd cycle (a 2-coloring is a bipartition). Planar 4-colorability is the deep Four Color Theorem.

## How to use it
Bound from both sides. The greedy bound caps the chromatic number above, and any clique caps it below, so exhibiting a $k$-clique together with a $k$-colouring settles $\chi=k$ exactly.

The bipartite test is the one used most: two colours suffice precisely when there is no odd cycle, and producing a single odd cycle is usually the fastest way to prove three are needed.

The greedy bound is rarely tight — Brooks' theorem sharpens it to $\Delta$ for every connected graph except complete graphs and odd cycles, which is worth knowing when the bound looks one too large. Pair it with the clique bound $\chi(G)\ge\omega(G)$ from below: exhibiting a $k$-clique alongside a $k$-colouring settles $\chi=k$ exactly.

## On contests
Scheduling, map, and conflict problems on AMC/AIME, plus olympiad [[invariants-coloring|coloring arguments]]. The everyday facts are the greedy $\Delta + 1$ bound and "bipartite ⟺ no odd cycle."`,

"probabilistic-method": String.raw`## Key forms
- $E[X]\ge c\Rightarrow$ some outcome has $X\ge c$ — an average is always attained, so a bound on the mean proves existence
- $\sum_iP(\text{bad}_i)\lt 1\Rightarrow$ some outcome avoids every bad event — the union bound
- $E[X]\lt 1$ for an integer count $\Rightarrow P(X=0)>0$ — the first-moment form used for "no bad events" arguments

## Why it works
An average is always achieved: if $E[X] \ge c$ then some outcome has $X \ge c$ (and some has $X \le c$), or the mean couldn't reach $c$. The union-bound form: if $\sum P(\text{bad}_i) \lt  1$, then with positive probability no bad event occurs, so a good object must exist. Both turn probability into pure existence.

## How to use it
To show an object with property $P$ exists, build one at random and prove $P(\text{fails}) \lt  1$; or define a quantity $X$ and show $E[X]$ is large enough to force a good outcome. Classics: random 2-colorings avoiding monochromatic structures (Ramsey lower bounds), and "some vertex beats the average degree."

## On contests
Olympiad existence proofs where an explicit construction is elusive — "show there is a subset / coloring / arrangement with …". It is [[expected-value|linearity of expectation]] aimed at guaranteeing rather than computing.`

});

// Detail bodies added for dense medium-importance cards.
Object.assign(window.MATH_DETAILS, {

"transfer-matrix-method": String.raw`## Key forms
- $M_{ij}=1$ when state $i$ may be followed by state $j$ — the adjacency matrix of allowed transitions
- $(M^n)_{ij}$ — counts length-$n$ sequences from $i$ to $j$, since multiplication sums over intermediate states
- $\operatorname{tr}(M^n)$ — counts the closed ones, the version for [[circular-permutations|circular arrangements]]
- $\det(xI-M)$ — its characteristic polynomial is the linear recurrence these counts satisfy

## Why it works
Matrix multiplication sums over intermediate states, so the $(i,j)$ entry of $M^n$ counts exactly the length-$n$ walks from state $i$ to state $j$ in the transition graph — and those walks are precisely the valid sequences. Sandwiching with boundary vectors, $a_n = \mathbf u^{\top} M^n \mathbf v$, restricts to the allowed start and end states. Since $M$ is a fixed $k\times k$ matrix, its characteristic polynomial $\det(xI-M)$ hands you a linear recurrence of order at most $k$ that the counts obey.

## How to use it
Pick states that record just enough recent history to enforce the rule (for "no two adjacent $1$'s," the state is the last symbol; for a tiling, the last column's fill). Put a $1$ or a weight in $M$ for each legal transition, set $\mathbf u,\mathbf v$ from the boundary, and compute $M^n$ — or read off the recurrence from $\det(xI-M)$ and iterate. Example: binary strings with no two consecutive $1$'s use $M=\begin{pmatrix}1&1\\1&0\end{pmatrix}$, whose powers give Fibonacci counts.

## On contests
"Count the tilings," "no two adjacent," and "walks of length $n$ on a small graph" are the standard AIME/olympiad appearances; the matrix view both proves the recurrence and gives a closed form through the eigenvalues.`,

"subset-sum-facts": String.raw`## Why it works
Fix one element $x$. Pairing each subset that contains $x$ with that subset minus $x$ is a bijection, so $x$ sits in exactly half of all subsets — $2^{n-1}$ of them. Weighting each element by how often it appears gives $\sum_{S}\sum_{x\in S} x = 2^{n-1}\sum_x x$. For parity, pick an odd element $t$: toggling $t$ (symmetric difference with $\{t\}$) flips a subset's sum-parity and is a bijection, so even-sum and odd-sum subsets are equinumerous, $2^{n-1}$ each.

## How to use it
Reach for these whenever a problem sums something over all subsets, or splits subsets by the parity of their sum or their size.

For a sum over all subsets, the shortcut is that each element appears in exactly $2^{n-1}$ of them, so the total is $2^{n-1}$ times the sum of the set. Over $\{1,2,3,4\}$ that gives $2^3\cdot10=80$ without listing anything.

The sum-parity split needs one odd element, and the reason is a bijection: toggling that element in or out flips the parity of the sum and pairs the even-sum subsets with the odd-sum ones exactly. With no odd element every subset sum is even and the split fails, which is the case to check before quoting the result.

The size-parity split is different and always holds — it is the [[binomial-theorem|binomial theorem]] at $x=1$, $y=-1$.

## On contests
AMC/AIME "sum over all subsets" and "how many subsets have even sum" problems collapse to one line; the same appearance-counting idea — each element or pair is counted a fixed number of times — generalizes to summing any additive statistic over a family.`,

"tail-sum-expectation": String.raw`## Why it works
Write $X$ as a sum of indicators of its own tail: $X = \sum_{k\ge 1} \mathbf{1}[X \ge k]$, since a value of $X = m$ makes exactly the first $m$ indicators equal to $1$. Taking expectations and using linearity, $E[X] = \sum_{k\ge 1} E[\mathbf{1}[X\ge k]] = \sum_{k\ge 1} P(X\ge k)$. Equivalently, it is a swap of summation order: $\sum_k P(X\ge k) = \sum_k \sum_{m\ge k} P(X=m) = \sum_m m\, P(X=m)$. The continuous version replaces the sum by $\int_0^\infty P(X>t)\,dt$ — the "area above the CDF."

## How to use it
Use it whenever $P(X\ge k)$ is easier to describe than $P(X=k)$, which happens far more often than not. Expected maxima are the flagship case: $P(\max\lt k)$ is a product over the independent draws, so the tail is one subtraction, while the exact distribution of the maximum requires a difference of two such products.

The identity itself is a double count — summing $P(X\ge k)$ over $k$ counts each outcome once for every $k$ up to its value, which totals $X$.

Watch the boundary: the sum starts at $k=1$ and uses $\ge$, not $>$. Starting at $k=0$ adds a spurious $1$, which is the usual slip.

## On contests
An AIME expected-value problem where the distribution is messy but "at least $k$" is a one-liner is the signal to switch to the tail sum. It also unifies familiar results: for a geometric wait, $P(X\ge k)=(1-p)^{k-1}$ sums to $\frac1p$; and it is the discrete cousin of the layer-cake / survival-function integral seen in continuous problems.`

});

Object.assign(window.MATH_DETAILS, {

"exponential-generating-functions": String.raw`## Why it works
Weighting the $n$-th term by $\frac{1}{n!}$ makes the product of two EGFs reindex as $c_n=\sum_k\binom{n}{k}a_k b_{n-k}$ — exactly "split the $n$ labels between two labeled structures." So EGF multiplication is the labeled analogue of the choose operation, where ordinary (unlabeled) GFs would undercount.

## How to use it
Use EGFs when the objects are labelled and ordinary [[generating-function-method|generating functions]] fail — that is, whenever the count involves choosing which labels go to which part, since that is exactly what the $\binom nk$ in the product supplies.

The dictionary is short: $e^x$ builds one structure per label, $\frac{1}{1-x}$ as an EGF builds linear orders, and exponentiating an EGF partitions the labels into an unordered collection of that structure. [[derangements|Derangements]], set partitions, and labelled trees all come out of applying that exponential rule.

Extract $a_n$ by reading the coefficient and multiplying back by $n!$ — forgetting that final factorial is the standard slip.

## On contests
Advanced olympiad / Putnam counting; EGFs crack derangements, surjections, and set-partition and permutation-structure counts that ordinary generating functions handle badly.`,

"zeckendorf-theorem": String.raw`## Why it works
Greedily subtracting the largest Fibonacci number $\le n$ can never leave a remainder that needs two adjacent Fibonaccis, because $F_k+F_{k-1}=F_{k+1}$ would merge them into a larger term — which gives both existence and uniqueness of the non-consecutive representation.

## How to use it
The greedy algorithm is both the construction and the proof: taking the largest Fibonacci number at each step automatically leaves a remainder smaller than the previous term's predecessor, which is exactly the non-consecutive condition.

The representation is a bijection between integers and binary strings with no two adjacent $1$s, which links this card to the Fibonacci tiling count — and explains why exactly $F_{n+2}$ integers have representations using only the first $n$ Fibonacci numbers.

Contest uses are usually about that uniqueness: showing a Fibonacci-sum representation is forced, or converting between an integer and its Fibonacci digits.

## On contests
Occasional AIME and olympiad appearances (Fibonacci representations, Wythoff and [[beatty-theorem|Beatty]] problems); the greedy algorithm together with uniqueness is essentially the whole toolkit.`,

"moser-circle": String.raw`## Why it works
Apply [[eulers-formula|Euler's formula]] $V-E+F=2$ to the planar graph of points, chord crossings, and arcs: there are $\binom{n}{2}$ chords and $\binom{n}{4}$ interior crossings (one per choice of 4 points, assuming no three chords meet inside), and bookkeeping the edges and faces yields $R(n)=\binom{n}{4}+\binom{n}{2}+1$.

## How to use it
The value of this card is as a warning: five data points agreeing with $2^{n-1}$ prove nothing, and the sequence breaks at exactly the moment most people stop checking.

The derivation is worth knowing because it explains the shape. Each interior crossing comes from choosing four points on the circle, giving $\binom n4$ vertices; each new chord adds one region plus one more for every crossing it makes. Applying Euler's formula to the resulting planar graph gives the closed form directly.

The no-three-chords-concurrent condition is essential — with a regular polygon, chords do meet three at a time and the count drops, which is a common trap in problem statements.

## On contests
A famous AMC/MATHCOUNTS trap; the "the next term must be $32$" instinct is exactly what the problem punishes, so carry the $\binom{n}{4}+\binom{n}{2}+1$ formula.`,

"gap-method": String.raw`## Key forms
- $\binom{n+1}{k}$ — seat the other $n$ items first, then choose which of the $n+1$ gaps take the restricted ones
- $n!\binom{n+1}{k}k!$ — the full count when every item is distinguishable
- $\binom{n-k+1}{k}$ — the same count written in terms of the total $n$ items in a row

## Why it works
Place the unrestricted items first; the only way the restricted items avoid being adjacent is for each to sit in a distinct gap (before, between, or after the others). With $n$ others there are $n+1$ gaps, so choosing $k$ of them — and permuting if the specials are distinct — counts every valid arrangement exactly once.

## How to use it
For "no two of these $k$ together," seat the other $n$ first ($n!$ ways if distinct and ordered), then drop the $k$ specials into $\binom{n+1}{k}$ gaps (times $k!$ if distinguishable). The complementary "at least two adjacent" is then the total minus this.

## On contests
A go-to MATHCOUNTS/AMC arrangement tool for non-adjacency conditions (people in a row, no two books together, binary strings with no two $1$s) — far cleaner than inclusion-exclusion.`,


"matrix-tree-theorem": String.raw`## Why it works
Expanding a cofactor of the Laplacian $L=D-A$ by Cauchy–Binet sums with signs over edge subsets, and only the acyclic spanning subsets survive — so the cofactor counts spanning trees. Equivalently it equals $\frac{1}{n}$ times the product of the nonzero Laplacian eigenvalues.

## How to use it
Build $L$ by putting each degree on the diagonal and $-1$ for each edge, delete any one row and the matching column, then take the determinant. Which row you delete does not matter, so pick whichever makes the arithmetic easiest.

The eigenvalue form is faster for highly symmetric graphs whose Laplacian spectrum is known — cycles, complete graphs, and hypercubes all have clean spectra, turning the count into a short product.

Check the result against a known case: applying the theorem to $K_n$ must reproduce $n^{n-2}$, which catches sign and deletion errors quickly.

## On contests
Advanced olympiad / Putnam combinatorics; it converts a daunting spanning-tree enumeration into one determinant, and [[cayleys-formula|Cayley's formula]] is its headline corollary.`,

"lgv-lemma": String.raw`## Why it works
In a directed acyclic graph, swapping the tails of any two crossing paths pairs up all intersecting path systems with opposite signs in the determinant expansion, so they cancel — leaving only the non-intersecting families, whose signed count is $\det[M_{ij}]$ with $M_{ij}$ the single-path counts.

## How to use it
Set up the sources and sinks so the only non-crossing pairing is $a_i\to b_i$; then every off-diagonal permutation cancels and the determinant counts exactly what you want.

The cancellation is the mechanism worth understanding: given two crossing paths, swapping their tails at the first crossing produces another system with the opposite sign, so those terms annihilate and only the non-intersecting families survive.

The standard applications are families of lattice paths forbidden to touch, and the determinant formulas for plane partitions and tilings — the word "non-intersecting" in a problem statement is the cue.

## On contests
Olympiad / Putnam level; recognizing "non-intersecting lattice paths" as a determinant is the key move behind many exact product-formula counts.`,

"alternating-squared-binomials": String.raw`## Why it works
Compare the coefficient of $x^m$ on both sides of $(1-x)^m(1+x)^m = (1-x^2)^m$.

On the left, expand each factor: $(1-x)^m = \sum_j (-1)^j\binom{m}{j}x^j$ and $(1+x)^m = \sum_i \binom{m}{i}x^i$. Collecting $x^m$ needs $i + j = m$, so the coefficient is $\sum_j (-1)^j \binom{m}{j}\binom{m}{m-j}$, and $\binom{m}{m-j} = \binom{m}{j}$ turns it into $\sum_j (-1)^j\binom{m}{j}^2$ — exactly the sum in question.

On the right, $(1-x^2)^m = \sum_t (-1)^t\binom{m}{t}x^{2t}$ contains only even powers. If $m = 2n$ is even, the term $x^m$ arises from $t = n$, contributing $(-1)^n\binom{2n}{n}$. If $m$ is odd there is no $t$ with $2t = m$, so the coefficient is $0$ and the whole alternating sum vanishes.

The unsigned identity $\sum_k\binom{n}{k}^2 = \binom{2n}{n}$ comes from the same comparison without the sign, using $(1+x)^n(1+x)^n = (1+x)^{2n}$, which is why the two are companions.

## How to use it
Spot the shape first: a sum of squared binomials with alternating signs is one coefficient of $(1-x^2)^m$, so read off the parity of the upper index before computing anything. Odd upper index means the answer is $0$ with no work at all — a common trap, since the sum looks like it should be messy.

More generally, whenever a binomial sum has the form $\sum_k (-1)^k \binom{m}{k}\binom{m}{r-k}$, it is the coefficient of $x^r$ in $(1-x^2)^m$: zero when $r$ is odd, and $(-1)^{r/2}\binom{m}{r/2}$ when $r$ is even. The squared case is $r = m$.

## On contests
An AIME-level identity that shows up when a problem manufactures $\sum(-1)^k\binom{2n}{k}^2$ out of a counting argument or a product of two [[generating-function-method|generating functions]]. The takeaway worth carrying is the technique rather than the closed form: multiply the two expansions whose product simplifies, then compare a single coefficient.`,

"markovs-inequality": String.raw`## Why it works
Split the expectation at the threshold. Because $X \ge 0$, throwing away the part below $a$ only decreases the average:
$E[X] \ge E\left[X \cdot \mathbf{1}_{X \ge a}\right] \ge a \cdot P(X \ge a)$,
where the second step replaces $X$ by $a$ on the event $X \ge a$, which is legitimate since $X \ge a$ there. Dividing by $a$ gives the inequality. Nonnegativity is essential: without it the discarded part could be very negative and the first step fails.

Chebyshev is a corollary rather than a separate idea. Apply Markov to the nonnegative variable $Y = (X-\mu)^2$ with threshold $k^2\sigma^2$: since $E[Y] = \sigma^2$, we get $P\!\left((X-\mu)^2 \ge k^2\sigma^2\right) \le \frac{\sigma^2}{k^2\sigma^2} = \frac{1}{k^2}$, and the event inside is exactly $|X-\mu| \ge k\sigma$.

## How to use it
Use it whenever you need to show something cannot happen too often, or that a good case must exist. Two directions:

- Bounding a tail. If the average score is $60$, at most a quarter of the students can have scored $240$ or more, whatever the distribution.
- Proving existence. If $E[X] \lt 1$ for a nonnegative integer count $X$, then $P(X = 0) \gt 0$, so some outcome has no bad events at all — the first-moment method behind many probabilistic-method arguments.

The bound is deliberately crude, using only the mean, so it is the right tool when you know almost nothing about the distribution and the wrong one when you need a sharp estimate. Its existence form is what [[probabilistic-method|the probabilistic method]] uses: if $E[X] \lt a$ then $P(X \lt a) \gt 0$, so some outcome beats the average.

## On contests
Rare on AMC and AIME as a named result, but the reasoning appears constantly in disguise: "the average is $m$, so some term is at least $m$" is the one-line version, and its contrapositive settles many "show some configuration exists" olympiad problems. Pair it with [[indicator-variables|linearity of expectation]], which computes the mean, and Markov converts that mean into a guarantee.`,

"casework-method": String.raw`## Key forms
- $\#(\text{total})=\sum_i\#(\text{case}_i)$ — valid only if the cases are disjoint and exhaustive, the two things to check first
- $P(A)=\sum_i P(A\mid B_i)P(B_i)$ — the weighted version, the law of total probability

## Why it works
The addition principle: if every object belongs to exactly one case, the total is the sum of the case counts. All the craft is in choosing the splitting feature so that "exactly one" holds and each case becomes strictly easier than the original.

## How to use it
Split on the most constrained element: the largest value, the leading digit, where the special person sits, how many of some type appear. Before summing, run the two sanity checks — can an object satisfy two cases (overlap)? can it satisfy none (gap)? If the case count balloons past five or six, that's the signal to switch: [[complementary-counting|complementary counting]], a bijection, or a recursion usually compresses it. Symmetric cases can be counted once and multiplied.

## On contests
The single most-used counting technique at every level. MATHCOUNTS problems are often pure two-case splits; AMC problems reward finding the split that makes cases symmetric; AIME problems layer casework inside other techniques — the errors are almost always an overlap or a forgotten case, so the discipline of naming the cases explicitly is the whole game.`,

"reflection-principle": String.raw`## Key forms
- $\#\{\text{paths touching the barrier}\}=\#\{\text{paths to the reflected endpoint}\}$ — reflect after the first touch; the map is reversible
- $\binom{m+n}{n}-\binom{m+n}{n-1}$ — total minus bad, leaving the paths that stay strictly on one side
- reached versus crossed — the strict and weak versions differ by one step, and so do their answers

## Why it works
Take any path that touches the forbidden line and reflect everything after the first touch across that line: the result is a path to the mirror image of the endpoint. The map is reversible (paths to the mirrored endpoint must cross the line), so bad paths biject with unrestricted paths to a reflected target — countable by plain binomials.

## How to use it
Recipe: total paths minus $\binom{\cdot}{\cdot}$ to the reflected endpoint. Compute the reflection of the endpoint across the barrier line (for $y = x + c$ barriers, swap-and-shift coordinates). Iterated barriers (two walls) need alternating reflections with inclusion-exclusion. [[ballot-problem|The ballot problem]] and [[catalan-numbers|Catalan]] formula are the two canonical outputs.

## On contests
Vote-count and never-trailing problems, queue problems (people with 5- and 10-dollar bills), and lattice paths avoiding a diagonal. When a path constraint says "never above/below," reflect before attempting recursion — the closed form is one subtraction.`

});
