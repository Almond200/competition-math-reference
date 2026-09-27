// Extended detail-page write-ups for Counting & Probability, keyed by formula id.
window.MATH_DETAILS = window.MATH_DETAILS || {};

Object.assign(window.MATH_DETAILS, {

"permutations-combinations": String.raw`
## Why it works
An ordered selection is built slot by slot, and each unordered selection corresponds to exactly $k!$ ordered ones.

To choose $k$ objects in order from $n$, fill the first slot in $n$ ways, the second in $n - 1$ ways, since one object is used up, and so on down to the $k$th slot, which has $n - k + 1$ options. By the multiplication principle, and multiplying top and bottom by $(n - k)!$, $$P(n, k) = n(n - 1)\cdots(n - k + 1) = \frac{n!}{(n - k)!}.$$

Now group the ordered selections by which set of objects they use. Each set of $k$ objects can be put in order in $k!$ ways, so every set appears exactly $k!$ times among the ordered selections, and dividing out that overcount leaves $$\binom nk = \frac{P(n, k)}{k!} = \frac{n!}{k!(n-k)!}.$$ From $10$ people, the $P(10, 3) = 10 \cdot 9 \cdot 8 = 720$ ranked top-three lists collapse to $\frac{720}{6} = 120$ committees.

The symmetry $\binom nk = \binom n{n-k}$ has a one-line reason: choosing which $k$ objects to take is the same as choosing which $n - k$ to leave behind.

## How to use it
The decision is always "does order matter?", and when in doubt count the ordered version and divide by the overcount. That is safer than guessing, because the overcount is usually easy to name.

Three habits cover most problems. Read $P(n,k)$ as filling slots one at a time with a shrinking menu, which is how "chains of choices" problems appear in disguise. Use the [[complementary-counting|complementary framing]] $$\binom nk = \binom n{n-k}$$ whenever the smaller side is easier to count. And when the objects are not all distinct, switch to [[multiset-permutations|the multiset formula]] rather than trying to patch $\binom nk$.

The common error is mixing the two within one problem: counting an ordered stage and an unordered stage and then multiplying without checking that the second count does not depend on the first.

## On contests
The atoms of all counting, which is why they are rarely the whole answer: 2 of the 24 problems tagged here use them alone, and [[casework-method|casework]] joins them in 4. The recurring shapes layer the two kinds of selection: committees with restrictions, words formed from letters, and hybrid counts where one stage is ordered, like officers, and another is not, like ordinary members.
`,

"multiset-permutations": String.raw`
## Why it works
Label the identical objects to make them distinct, count those arrangements, then divide out the labels, since they do not change what you see.

With every object distinct there are $n!$ arrangements. Now erase the labels. Each visible arrangement came from $n_1!$ labeled ones that differ only in the order of the first group's labels, times $n_2!$ for the second group, and so on, because each group's labels can be shuffled among that group's positions independently. So each visible arrangement was counted $n_1!\,n_2! \cdots n_k!$ times, and dividing gives the formula.

{{figure:labels}}

With two groups of sizes $k$ and $n - k$ the formula is $\frac{n!}{k!\,(n - k)!} = \binom nk$: arranging $k$ identical A's and $n - k$ identical B's is the same as choosing which $k$ positions get the A's.

## How to use it
Any arrangement of objects that are not all distinct is this formula: list the multiset, take $n!$, and divide by a factorial for each repeated type. Grid paths are the most common disguise, since a path across a $5 \times 3$ grid is a word of five R's and three U's, and there are $\frac{8!}{5!\,3!} = 56$ of them.

With a restriction, do not patch the formula. Arrange the unrestricted objects first, then place the repeated ones into the gaps between them. For "no two I's adjacent" in MISSISSIPPI, arrange the other seven letters, then choose $4$ of the $8$ gaps for the I's: $$\frac{7!}{4!\,2!} \cdot \binom84 = 105 \cdot 70 = 7350.$$ When several types are restricted at once, handle the most constrained first, or switch to inclusion-exclusion on the adjacency conditions.

## On contests
Eight problems here, seven of them AIME, and none by it alone: it counts the pieces of a [[casework-method|casework]] split or the outcomes of a [[basic-probability|probability]], and twice it counts the words a [[bijection-method|bijection]] produces. The useful habit is to see identical-looking steps or objects as the letters of a word, which turns many problems into this one formula.
`,

"circular-permutations": String.raw`
## Why it works
Every circular arrangement corresponds to exactly $n$ rows, one for each seat you could start reading from, so dividing the $n!$ rows by $n$ counts the circles: $(n - 1)!$.

{{figure:rotations}}

Equivalently, seat one person anywhere; since rotations do not matter, that seat is as good as any other. The remaining $n - 1$ people then fill the remaining seats in order, in $(n - 1)!$ ways. When flips count as the same, each circle and its mirror image are one object, so divide by $2$ again, as long as $n \ge 3$ so that a circle differs from its mirror image.

## How to use it
Fixing one person is the habit worth building, because it also handles constraints. For "$A$ sits directly opposite $B$" at a table of $8$, fix $A$; then $B$'s seat is forced, and the other $6$ people fill the remaining seats in $6!$ ways.

Decide from the physical situation whether flips count: a bracelet or a key ring can be turned over, so divide by $2$, but people at a table cannot. For people who must sit together, glue them into a block first. A block of $k$ among $n$ people leaves $n - k + 1$ units around the circle, so the count is $$(n - k)! \cdot k!.$$ In general this division is the [[uniform-overcount|uniform overcount]] idea.

## On contests
Four problems here, all AIME, none by it alone; two use [[complementary-counting|complementary counting]] for "no two of these sit together" conditions. Round tables with adjacency conditions are an AMC fixture as well, and bead necklaces bring in the extra division by $2$.
`,

"complementary-counting": String.raw`
## Key forms
- $\#(\text{good})=\#(\text{total})-\#(\text{bad})$ — the counting form, used when the bad side has more structure
- $P(\text{at least one})=1-P(\text{none})$ — the probability form, and the phrase that triggers it
- $P(\text{none})=\alt{\prod_i(1-p_i)}{(1-p_1)(1-p_2)\cdots(1-p_n)}$ — why flipping pays: independent complements multiply

## Why it works
Every object either has the property or does not, so the two counts add up to the total, and whichever is easier to count gives the other by subtraction.

The flip helps as often as it does because of an asymmetry in how conditions combine. "At least one of four rolls is a $6$" can happen in many overlapping ways, the first roll, the second, two of them, and counting those without double counting is exactly the mess that [[pie|inclusion-exclusion]] exists to clean up.

Its opposite, "no roll is a $6$", is one condition on each roll separately, and separate conditions multiply: $5^4$ of the $6^4$ outcomes, so $$P(\text{at least one } 6) = 1 - \left(\frac56\right)^4.$$ "At least one" is an "or" across the trials, and the opposite of an "or" is an "and", which factors.

The same asymmetry says when not to flip. If the condition is already an "and", such as "every digit is odd", count it directly; its complement would be the messy side.

## How to use it
Listen for the trigger phrases: "at least one", "not all", "some pair", "two of them share". Count the total, count the structured complement, and subtract. For "at least two" the complement is "zero or one", which is still usually the easier side even though it is two cases. In probability the move is $P(\text{at least one}) = 1 - P(\text{none})$, and when the trials are independent, $P(\text{none})$ is a product of single-trial probabilities.

The one discipline is matching the universe. The total and the complement must count exactly the same kind of object, ordered with ordered and unordered with unordered, or the subtraction means nothing.

## On contests
A setup step rather than a whole solution: none of the 28 problems tagged here uses it alone, and 27 of them are AIME. Its partner is [[pie|inclusion-exclusion]] in 8, because the complement of a union of bad events is itself a union that needs correcting.

The birthday problem is the canonical case. Asking for the chance that two of $k$ people share a birthday means summing over a mess of overlapping coincidences, but its complement factors cleanly: all $k$ birthdays distinct has probability $\frac{n(n-1)\cdots(n-k+1)}{n^{k}}$, since each person in turn must avoid the days already taken.

With $n = 365$ that product drops below $\frac12$ at $k = 23$, so the chance of a shared birthday passes one half at only $23$ people, which is the famous part. The same product answers any "are these $k$ uniform choices all different" question.
`,

"counting-blocks": String.raw`## Key forms
- $k!\,(n-k+1)!$ — glue $k$ items that must stay together into one block, then order within it
- $n!\binom{n+1}{k}k!$ — the opposite condition, $k$ items no two adjacent, dropped into the $n+1$ gaps

## Why it works
Gluing forced-adjacent items into a super-object preserves the bijection with valid arrangements: each block arrangement times each internal order is one valid seating. [[gap-method|The gap method]] inverts it: placing forbidden-adjacent items into separate gaps between the others guarantees separation.

## How to use it
"Together" → glue (multiply by internal orders). "Apart" → arrange the unrestricted items, then choose gaps: $k$ non-adjacent items into $n$ others' $n+1$ gaps gives $\binom{n+1}{k} \cdot k!$ for distinct items. Mixed conditions: glue first, then gap.

## On contests
Bread-and-butter AMC 10 material; the circular variants (gaps around a table) and multi-block problems (two couples, three languages of books) are the standard escalations.`,

"grid-paths": String.raw`
## Why it works
A path is determined by its sequence of steps, and the sequence is any arrangement of $m$ R's and $n$ U's, so the paths match the ways to choose which $m$ of the $m + n$ positions hold an R. That is $\binom{m + n}{m}$, an instance of [[multiset-permutations|arrangements with repeated letters]].

The same count also builds up point by point. The last step into any point comes either from the left or from below, so the number of paths to a point is the sum of the numbers at those two neighbors. Filling in the grid from the corner reproduces Pascal's triangle, tilted.

{{figure:counts}}

## How to use it
From $(0, 0)$ to $(4, 3)$ there are $\binom73 = 35$ paths. A required waypoint $P$ multiplies: $$\#(\text{paths through } P) = \#(\text{paths to } P) \times \#(\text{paths from } P).$$ A forbidden point subtracts the paths through it, with [[pie|inclusion-exclusion]] when there are several, and a diagonal barrier is the [[reflection-principle|reflection principle]], which is where the [[catalan-numbers|Catalan numbers]] come from.

When the formulas start tangling, with several forbidden points or an awkward region, write the count at each point as the sum of the counts to its left and below. It is slower, but it is never wrong, and on a small grid it is often faster than getting inclusion-exclusion right.

## On contests
Four problems here, all AIME, one solved by it alone; the others pair it with a [[bijection-method|bijection]], a [[recursive-counting|recursion]] or [[stars-and-bars|stars and bars]]. AMC uses the plain count, and AIME adds barriers, diagonal steps or a third dimension. Most errors are miscounted steps, so write the two totals $m$ and $n$ down explicitly.
`,

"rectangles-in-grid": String.raw`## Why it works
A rectangle is determined by choosing 2 of the $m+1$ vertical grid lines and 2 of the $n+1$ horizontal ones — the choices are independent. Squares are the constrained version, since the two spans must be equal: summing over the side length $k$ gives $\sum_k (m+1-k)(n+1-k)$, which collapses to $\sum_{k=1}^{n} k^2$ on a square grid.

## How to use it
The key move is to stop counting rectangles and start counting the lines that bound them: any two of the $m+1$ vertical lines and any two of the $n+1$ horizontal lines determine exactly one rectangle, so the count is a product of two binomial coefficients.

Squares are the harder cousin, because the two spans must be equal — sum over the side length instead, which is why an $n\times n$ grid gives a sum of squares rather than a closed product.

For sub-rectangles containing a marked cell, count the line choices on each side of it separately and multiply. Tilted rectangles on lattice points are a genuinely different count, parametrised by the vector $(a,b)$ along one side, and are not covered by this formula.

## On contests
"How many rectangles/squares in this grid" appears verbatim on MATHCOUNTS/AMC 10; chessboard variants (counting those containing a given square) are the common twist.`,

"handshakes-diagonals": String.raw`
## Why it works
Each count chooses a few objects from $n$ without regard to order, which is what $\binom nk$ counts.

A handshake is an unordered pair of people, and so is a game in a round robin, so both number $\binom n2$. A diagonal is a pair of vertices that are not neighbors: of the $\binom n2$ pairs, $n$ are sides, which leaves $$\binom n2 - n = \frac{n(n - 1)}{2} - n = \frac{n(n - 3)}{2}.$$

Equivalently, each vertex has $n - 3$ diagonals, to every vertex except itself and its two neighbors, and each diagonal is counted from both ends. A triangle is a set of three points, and with no three on a line every such set gives a real triangle.

The crossing count is a pairing. Any four vertices of a convex polygon form a quadrilateral whose two diagonals cross exactly once, and every crossing of two diagonals comes from the four endpoints of those diagonals, so crossings and sets of four vertices match one-to-one.

{{figure:crossings}}

## How to use it
Counts often run backwards: $45$ handshakes means $\binom n2 = 45$, so $n = 10$. When some of the points are collinear, subtract the triples that do not make triangles, $\binom k3$ for each line through $k$ of the points. When three diagonals of a polygon do meet at one point, as the three long diagonals of a regular hexagon meet at its center, $\binom n4$ overcounts, and the coinciding crossings must be corrected by hand.

## On contests
Six problems here, spread across AMC 10, AMC 12 and AIME, three solved by it alone; two others use it as the total in [[complementary-counting|complementary counting]], such as counting all triples of points and removing the collinear ones. The $\binom n4$ crossing count and the collinearity corrections are the AIME-level versions.
`,

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

Moving along a row is a different relation and often the more useful one: dividing the factorials leaves $\frac{\binom n{k+1}}{\binom nk} = \frac{n-k}{k+1}$, so a stated ratio between adjacent entries becomes a linear equation in $n$ and $k$, and two such conditions pin both. Combinatorially, a $(k+1)$-subset is built by adding one of the $n-k$ absent elements and arises from $k+1$ different $k$-subsets, which is the same fraction. It is also the ratio [[largest-term-ratio|the largest-term method]] asks for, crossing $1$ at $k = \frac{n-1}2$ and so putting the row's peak at $k = \lfloor n/2 \rfloor$.

The other use is absorption: applying the rule repeatedly collapses a sum of consecutive entries into a single coefficient, which is precisely how the [[hockey-stick|hockey stick identity]] telescopes. Symmetry halves your work and explains why every row reads the same forwards and backwards.

## On contests
Identity manipulation on AMC 12/AIME: recognize when an awkward sum is one Pascal application away from collapsing. Conditioning-on-an-element is also a general proof technique worth extracting.`,

"binomial-row-sums": String.raw`
## Why it works
Both identities count subsets: the row sum counts all of them, and the alternating sum compares the even-sized ones with the odd-sized ones.

Each of the $n$ elements is either in a subset or not, so there are $2^n$ subsets, and grouping them by size gives $$\binom n0 + \binom n1 + \cdots + \binom nn = 2^n.$$ Algebraically this is $(1 + 1)^n$ expanded by the [[binomial-theorem|binomial theorem]].

For the alternating sum, pair each subset with the one obtained by toggling element $1$: add it if it is absent, remove it if it is present. Toggling twice gets back the original, so this splits all the subsets into pairs, and each pair has one even-sized and one odd-sized member. So there are equally many of each, $2^{n-1}$, and $\sum (-1)^k\binom nk = 0$. Algebraically it is $(1 - 1)^n = 0$, which needs $n \ge 1$.

{{figure:toggle}}

## How to use it
Substituting into $(x + y)^n$ is a general machine for coefficient sums, not just two facts. Put $x = y = 1$ for the total, $x = 1$ and $y = -1$ for the alternating version, and other values when the sum carries weights: $\sum_k \binom nk 2^k = (1 + 2)^n = 3^n$.

The even/odd split settles parity-constrained subset counts at once: exactly $2^{n-1}$ subsets of an $n$-element set have even size, for any $n \ge 1$. Adding the two identities also gives the sum of every other entry in a row, $\binom n0 + \binom n2 + \binom n4 + \cdots = 2^{n-1}$.

When the sum has a factor of $k$ in it, substitution alone will not reach it: use $k\binom nk = n\binom{n-1}{k-1}$, which is [[committee-chair|the committee-chair identity]], or differentiate $(1 + x)^n$ first.

## On contests
Eight problems here, seven of them AIME, and none by it alone. Four pair it with a [[bijection-method|bijection]] that turns the problem into a count of subsets, and others use $2^n$ as the total in [[complementary-counting|complementary counting]]. Weighted sums by clever substitution, and the base case of the roots-of-unity filter, are the other regular appearances.
`,

"nested-subset-pairs": String.raw`## Key forms
- $\#\{(A,B):A\subseteq B\subseteq S\}=3^n$ — three destinations per element
- $\alt{\sum_{k=0}^{n}\binom nk 2^k}{\binom n0 2^0+\binom n1 2^1+\cdots+\binom nn 2^n}=3^n$ — the same count organized by $|B|$
- chains $A_1\subseteq\cdots\subseteq A_m\subseteq S$ give $(m+1)^n$

## Why it works
Build the pair element by element rather than set by set. For each element of $S$ there are exactly three consistent possibilities: it belongs to $A$, in which case it belongs to $B$ as well; it belongs to $B$ only; or it belongs to neither. The fourth combination, in $A$ but not $B$, is precisely what $A\subseteq B$ forbids. The elements are independent, so the count is $3^n$.

Organizing the same count by the size of $B$ gives the identity. There are $\binom nk$ sets $B$ of size $k$, and once $B$ is fixed any of its $2^k$ subsets serves as $A$, so the total is $\sum_k\binom nk 2^k$. That is $(1+2)^n$ by the binomial theorem, so both routes give $3^n$ and each proves the other.

## How to use it
Recognize the shape: two sets with one required to sit inside the other, and a question asking how many such pairs exist. Counting by element is immediate, while counting by size leads to a binomial sum you then have to evaluate — so use the element argument to get the answer and the sum only if the problem asks for that form.

The extension is worth remembering because it is free. A chain of $m$ nested sets inside $S$ gives each element $m+1$ choices: the first set in the chain it enters, or none at all. Two nested sets is the $m=2$ case, $3^n$.

## On contests
The AMC and AIME phrasings hide it well — ordered pairs of subsets with a containment condition, or a question about $A\cap B=A$, which is the same statement. Anything of the form "count something for each element independently" beats summing [[binomial-row-sums|binomial row sums]] by hand; if you find yourself evaluating $\sum\binom nk 2^k$, the element argument was available.`,

"hockey-stick": String.raw`## Why it works
Telescoping Pascal: $\binom{n+1}{r+1} = \binom{n}{r} + \binom{n}{r+1}$, expand the last term repeatedly. Combinatorially: to choose $r+1$ from $\{1..n+1\}$, condition on the largest element chosen — the cases are the diagonal terms.

## How to use it
Any sum of binomial coefficients with a fixed lower index collapses in one step, so recognizing the diagonal is all that is required.

Its real reach is polynomial sums. Express $k$, $k^2$, $k^3$ in the binomial basis — $k=\binom k1$, $k^2=2\binom k2+\binom k1$, and so on — then hockey-stick each piece separately. That is the systematic route to the power-sum formulas, and unlike memorizing them it extends to any degree.

The same rewriting handles products: $k(k+1)=2\binom{k+1}{2}$ and $k(k+1)(k+2)=6\binom{k+2}{3}$, so sums of consecutive-integer products telescope immediately.

## On contests
AIME sum evaluations and stars-and-bars cumulative counts ("solutions with $x_1 + \cdots \le n$" = hockey stick over exact sums). The largest-element conditioning is reusable everywhere.`,

"vandermonde": String.raw`
## Key forms
- $\alt{\sum_{k}\binom{n}{k}^2}{\binom n0^2+\binom n1^2+\cdots+\binom nn^2} = \binom{2n}{n}$ — the $m = n = r$ case, by far the one that appears; choosing $k$ from the first $n$ and $n-k$ from the second is choosing $n$ from all $2n$
- $\binom{n}{k} = \binom{n}{n-k}$ — the symmetry the squared form leans on, since it turns $\binom{n}{k}\binom{n}{n-k}$ into $\binom{n}{k}^2$

## Why it works
Both sides count the committees of $r$ chosen from $m$ men and $n$ women.

The right side counts them directly. The left side sorts them by the number $k$ of men, who can be chosen in $\binom mk$ ways, with the other $r - k$ chosen from the women in $\binom n{r-k}$ ways; every committee has exactly one value of $k$, so the sorted counts add to the total.

Generating functions say the same thing. The coefficient of $x^r$ in $$(1 + x)^m(1 + x)^n = (1 + x)^{m+n}$$ is the sum on the left, from multiplying out the two factors, and $\binom{m+n}{r}$ on the right.

## How to use it
Recognizing the shape is the whole skill: two binomial coefficients multiplied, bottom indices adding to a constant, summed over the split. It collapses to a single coefficient.

It also runs in reverse: when a count naturally splits a group in two, expanding $\binom{m+n}{r}$ into the sum can be what makes the argument work. In probability it is why the hypergeometric probabilities add up to $1$: $$\sum_k \frac{\binom mk\binom n{r-k}}{\binom{m+n}{r}} = 1.$$

## On contests
Two problems here, both AIME, neither solved by it alone. Typical uses count how often each element appears across pairs of subsets, which produces a sum of squared binomial coefficients, or read a double sum as a single committee count.`,

"committee-chair": String.raw`## Why it works
Count (committee, chair) pairs twice: pick the $k$-committee then its chair ($k\binom{n}{k}$), or pick the chair first then the rest ($n\binom{n-1}{k-1}$). Summing over $k$: chair first ($n$ ways), each remaining person in or out ($2^{n-1}$).

## How to use it
The identity is a double count: choosing a committee of $k$ and then its chair gives $k\binom nk$, while choosing the chair first and then the rest of the committee gives $n\binom{n-1}{k-1}$. Both count the same pairs, so they are equal — and that story-proof pattern generalises far beyond this one identity.

Operationally it is an absorption rule: it removes a factor of $k$ from a weighted binomial sum, converting $\sum k\binom nk$ into $n\sum\binom{n-1}{k-1}=n\cdot2^{n-1}$.

For a factor of $k^2$, do not apply it twice directly. Write $k^2=k(k-1)+k$, absorb each piece separately, and the sum becomes $n(n-1)2^{n-2}+n2^{n-1}$. The same trick handles any polynomial weight by expressing it in falling factorials first.

## On contests
[[weighted-binomial-sums|Weighted binomial sums]] on AMC 12/AIME ($\sum k\binom{n}{k}$, $\sum k^2\binom{n}{k} = n(n+1)2^{n-2}$), and expected-size-of-random-subset arguments ($= \frac{n}{2}$, this identity divided by $2^n$).`,

"multinomial-theorem": String.raw`
## Why it works
Expanding $(x_1 + \cdots + x_m)^n$ means picking one term from each of the $n$ brackets and multiplying, so each product corresponds to a word of length $n$ recording the picks.

A word with $k_1$ copies of $x_1$, $k_2$ of $x_2$, and so on produces the monomial $x_1^{k_1}\cdots x_m^{k_m}$, and the number of such words is the number of arrangements of that multiset, $\frac{n!}{k_1!\cdots k_m!}$. Collecting like terms gives that coefficient. With two terms it is the [[binomial-theorem|binomial theorem]], and the count is the one on [[multiset-permutations|arrangements with repeated objects]].

## How to use it
To extract a coefficient, find the exponent pattern that produces the wanted monomial, then take the multinomial coefficient and multiply by each term's own coefficient raised to its power. For $x^3y^2z^2$ in $(x + 2y - z)^7$: $$\frac{7!}{3!\,2!\,2!} \cdot 2^2 \cdot (-1)^2 = 210 \cdot 4 = 840.$$ Forgetting the coefficients of the terms is the usual error.

If several exponent patterns give the same monomial, as when some terms are powers of the same variable, add their contributions. Setting every $x_i = 1$ gives $m^n$, a check that the coefficients of a full expansion must pass.

## On contests
Four problems here, mostly AMC, none by it alone and each with a different partner. Coefficient extraction in a trinomial is the standard form, and the same coefficient counts ordered splits of a set into groups of prescribed sizes.
`,

"pascal-parity": String.raw`## Why it works
[[lucas-theorem|Lucas' theorem]] mod 2: $\binom{m}{n}$ is odd iff every binary digit of $n$ fits under $m$'s. The number of valid $n$ is $2^{(\text{number of 1-bits of } m)}$ — each 1-bit offers a free binary choice.

## How to use it
The parity of $\binom nk$ depends only on the binary digits: it is odd exactly when every $1$-bit of $k$ is also a $1$-bit of $n$. Counting the submasks of $n$ gives $2^{s_2(n)}$ odd entries in row $n$.

That single rule answers the standard questions immediately. Rows that are entirely odd are $n=2^m-1$, where every bit is set; rows with exactly two odd entries are $n=2^m$, where only the leading bit is.

Drawing Pascal's triangle mod $2$ produces the Sierpinski triangle, and the picture is worth keeping in mind — the self-similar structure is exactly the binary submask condition, and it makes questions about blocks of even entries easy to see. For odd primes, the same reasoning is Lucas' theorem in base $p$.

## On contests
"How many entries of row 100 are odd" ($100 = 1100100_2$, so $2^3 = 8$) and divisibility-pattern problems. Mod 4 or higher powers needs more than Lucas — don't overextend the tool.`,

"stars-and-bars": String.raw`
## Why it works
Line up the $n$ objects as stars and drop $k - 1$ bars among them; the bars cut the row into $k$ groups, and the sizes of the groups are the $x_i$.

For $x_1 + x_2 + x_3 = 7$, the row $\star\star \mid \star\star\star \mid \star\star$ stands for $2 + 3 + 2$, as in the figure, and the row $\mid \star\star\star\star\star\star\star \mid$ stands for $0 + 7 + 0$: a bar at either end, or two bars side by side, simply makes an empty group. Every solution gives exactly one such row and every row gives exactly one solution, so counting solutions is the same as counting rows.

A row has $n + k - 1$ symbols, and it is decided completely by which $k - 1$ of those positions hold bars. So there are $$\binom{n+k-1}{k-1}$$ rows, and that many solutions.

When every $x_i$ must be at least $1$, no group may be empty, so no two bars may touch and none may sit at an end. The bars then go into the $n - 1$ gaps between neighboring stars, at most one per gap, which gives $\binom{n-1}{k-1}$. The same answer comes from the first formula by handing each variable its required $1$ in advance and distributing the remaining $n - k$ freely: $$\binom{(n-k)+k-1}{k-1} = \binom{n-1}{k-1}.$$

## How to use it
Identify which of the two forms applies by checking whether empty boxes are allowed, since that is the only difference between them. If the lower bounds are not all $0$ or all $1$, subtract them out first, $$y_i = x_i - a_i,$$ and apply the nonnegative formula to what remains.

Upper bounds break the picture, because a bound like $x_i \le 4$ is not about empty groups. Count everything, then subtract the solutions that break a bound: for each variable that is too big, give it the excess in advance and count what is left, correcting for overlaps with [[pie|inclusion-exclusion]].

For $x + y + z = 10$ with every variable at most $4$, there are $\binom{12}{2} = 66$ solutions in all and $\binom{7}{2} = 21$ with $x \ge 5$, the same for $y$ and $z$. Each of the three pairs of variables can both be at least $5$ in exactly $\binom{2}{2} = 1$ way, which forces the third to be $0$, so the answer is $$66 - 3 \cdot 21 + 3 \cdot 1 = 6.$$

## On contests
A counting workhorse that rarely stands alone: 3 of the 23 problems tagged here need nothing else, and [[casework-method|casework]] joins it in 6, usually to split a problem into pieces that are each a clean distribution. The recurring disguises are dice or digits with a fixed total, identical coins or candies handed out to people, and monomials $x^ay^bz^c$ of a fixed degree $n$, of which there are $\binom{n+2}{2}$.
`,

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

Unlabeled boxes mean partitioning the balls into groups with no order among the groups. For distinct balls that is the Stirling number of the second kind $S(n,k)$, and summing over the number of groups gives the Bell number. This also explains the surjection formula: take an unlabeled partition into $k$ blocks and glue labels onto the boxes in $k!$ ways, so the number of onto maps is $k!\,S(n,k)$.

With nothing labeled at all, a distribution is just a way to write $n$ as a sum of positive parts — an integer partition, which has no closed form. Use the recursion $p_k(n)=p_{k-1}(n-1)+p_k(n-k)$, splitting on whether the smallest part is $1$ or every part is at least $2$, or simply list them for small $n$.

## How to use it
Answer two yes/no questions before writing a single number: are the balls distinguishable, and are the boxes distinguishable? Those pick the row. A third question — must every box be nonempty? — picks the column. Confusing identical with distinct is the most common counting mistake there is, and applying stars and bars to distinguishable objects, or $k^n$ to identical ones, is the classic way to lose the problem. Constraints ride on top of the twelve cells rather than needing new formulas. A per-box minimum $m_i$: hand out the minimums first and distribute the remaining $n - \sum m_i$ freely, which is the substitution $x_i \mapsto x_i - m_i$. An upper cap $x_i \le c$: inclusion-exclusion, giving an offending box $c+1$ up front and alternating signs. At most one ball per box: just choose the boxes, $\binom{k}{n}$ for identical balls and $\binom{k}{n}n! = k(k-1)\cdots(k-n+1)$ for distinct ones.

When box $i$ needs at least $m_i$ balls, give each box its minimum up front and distribute what remains with no restriction; formally the substitution $x_i\mapsto x_i-m_i$ turns every "at least $m_i$" into "at least $0$" and lands you back in plain stars and bars. For $20$ identical balls into $4$ distinct boxes with each box at least $3$, place $3$ in each box and distribute the remaining $8$ freely: $\binom{8+4-1}{3}=\binom{11}{3}=165$.

Upper bounds do not work that way, and need inclusion-exclusion instead. Count all distributions, then subtract those where some box overflows by handing that box $c+1$ balls first and counting the rest, alternating signs as you consider one overflowing box, then two. For $10$ balls into $3$ boxes each holding at most $4$: all distributions $\binom{12}{2}=66$, minus those with a box at $5$ or more $3\binom72=63$, plus those with two such boxes $3\binom22=3$, giving $6$.

When both bounds apply, do the minimum substitution first — which also shifts the cap — then run the overflow inclusion-exclusion on what is left. For $12$ balls into $3$ boxes each between $2$ and $5$, setting $y_i=x_i-2$ gives $y_1+y_2+y_3=6$ with each $y_i\le3$, so $\binom82-3\binom42=28-18=10$, the two-box term being impossible since $8\gt6$.

If instead the box sizes are fixed in advance, none of the table applies: putting exactly $n_1,\dots,n_k$ distinct balls into distinct boxes is the multinomial coefficient, since you choose which balls go to box $1$, then box $2$, and so on.

## On contests
Run the two-question checklist first. AMC and AIME sample every cell of the table — identical candies into distinct bags for stars and bars, distinct people into identical teams for Stirling, coin and score totals for partitions — and love bolting a minimum or a cap on top, which the substitution and inclusion-exclusion recipes above clear away.`,

"pie": String.raw`
## Key forms
- $|A\cup B|=|A|+|B|-|A\cap B|$ — subtract the overlap that both terms counted twice
- $|A\cup B\cup C|=\alt{\sum|A_i|-\sum|A_i\cap A_j|}{|A|+|B|+|C|-|A\cap B|-|B\cap C|-|C\cap A|}+|A\cap B\cap C|$ — add singles, subtract pairs, add the triple
- $\alt{\left|\bigcup A_i\right|=\sum_{\emptyset\ne S}(-1)^{|S|+1}\left|\bigcap_{i\in S}A_i\right|}{|A_1\cup\cdots\cup A_n|=\big(|A_1|+\cdots\big)-\big(|A_1\cap A_2|+\cdots\big)+\cdots\pm|A_1\cap\cdots\cap A_n|}$ — an element in exactly $t$ sets is counted $\binom t1-\binom t2+\cdots=1$ time
- $\alt{\sum_{j}(-1)^{j+1}\binom kj N_j}{\binom k1N_1-\binom k2N_2+\binom k3N_3-\cdots}$ — the symmetric case, when every $j$-fold intersection has the same size $N_j$

## Why it works
Adding the sizes of overlapping sets counts each shared element more than once, and the alternating terms are exactly the corrections that bring every element back to a count of one.

With two sets, $|A| + |B|$ counts every element of $A \cap B$ twice, once in each set, so subtracting $|A \cap B|$ once fixes it.

With three sets it is easiest to follow one element at a time. An element in exactly one set is added once. An element in exactly two sets is added twice among the singles and subtracted once among the pairs, net $1$. An element in all three is added $3$ times, subtracted $3$ times, once for each pair it belongs to, and added once in the triple, net $3 - 3 + 1 = 1$.

In general, an element that lies in exactly $t$ of the sets appears in $\binom t1$ single terms, $\binom t2$ pair terms, $\binom t3$ triple terms, and so on, so the formula counts it $$\binom t1 - \binom t2 + \binom t3 - \cdots$$ times. That alternating sum is $1$ for every $t \ge 1$, because $\binom t0 - \binom t1 + \binom t2 - \cdots = (1 - 1)^t = 0$ by the [[binomial-theorem|binomial theorem]].

So every element of the union is counted exactly once, and elements outside every set are never counted at all.

## How to use it
The principle exists to fix a specific failure: adding overlapping counts double-counts the overlaps, and there is no way to avoid that by being careful. Inclusion-exclusion is the correction, and its real payoff is that counting an intersection is usually far easier than counting a union, so the principle trades one hard count for several easy ones.

Almost always, flip it. Problems ask for "none of these conditions", and that is the complement of the union, so the answer is $$\#(\text{none}) = \text{total} - |A_1 \cup A_2 \cup \cdots \cup A_k|.$$ That is why this card and [[complementary-counting|complementary counting]] appear together in 8 of its 28 problems, more than any other pairing. Counting what you do not want and subtracting is the default move, not a trick.

When the conditions are symmetric the sum collapses. If every choice of $j$ conditions has the same intersection size $N_j$, the whole alternating sum becomes $$\sum_{j=1}^{k} (-1)^{j+1}\binom kj N_j,$$ which turns $2^k$ terms into $k$ of them. That collapse is what makes forbidden-position and surjection problems tractable, and spotting the symmetry is the entire step.

For two or three sets, stop computing and draw. A Venn diagram filled from the center outward is faster than the formula and much harder to get wrong. For the numbers $1$ to $30$ divisible by $2$, $3$ or $5$, the center holds the one multiple of $30$; each pairwise region holds the multiples of $6$, $10$ or $15$ minus that one; and each single region holds what is left of its set.

{{figure:venn-2-3-5}}

## On contests
Almost never alone — 2 of 28 — because it is a correction applied to counts something else produced. Its partners are [[complementary-counting|complementary counting]] (8) and [[casework-method|casework]] (6), which is the honest picture: set up cases, count them, then correct the overlaps.

Four shapes recur: divisibility unions, forbidden positions of the derangement family, counting surjections, and seatings with forbidden adjacencies. The last three are all symmetric, so the collapsed form applies and the work is choosing $N_j$ correctly.
`,

"derangements": String.raw`## Why it works
[[pie|PIE]] over the events "element $i$ is fixed": $D_n = \sum_j (-1)^j\binom{n}{j}(n-j)! = n!\sum \frac{(-1)^j}{j!}$ — the truncated $e^{-1}$ series, whence the nearest-integer form. The recurrence $D_n = (n-1)(D_{n-1} + D_{n-2})$ conditions on where element 1 goes and whether the swap closes.

## How to use it
Recognize the setup as "no object in its own place" — hats returned to the wrong owners, letters in wrong envelopes, a permutation with no fixed point.

The nearest-integer formula is the fastest route for a specific $n$: compute $\frac{n!}{e}$ and round. It is not an approximation but exact, which makes it safe under time pressure.

For "exactly $k$ fixed points", choose which $k$ are fixed and derange the rest, giving $\binom nkD_{n-k}$. The recurrence is the one to use when the problem is a derangement variant, since its derivation — the first element goes to some position $j$, and then either $j$ maps back or it does not — adapts to modified conditions in a way the closed form does not.

## On contests
Hat checks, mismatched letters/envelopes, and "no one gets their own" scenarios on AMC/AIME. The exactly-$k$-fixed-points formula is the standard follow-up question.`,

"catalan-numbers": String.raw`## Why it works
[[reflection-principle|Reflection principle]]: monotone paths crossing the diagonal biject (reflect after first violation) with paths to a shifted endpoint, giving $\binom{2n}{n} - \binom{2n}{n+1} = \frac{1}{n+1}\binom{2n}{n}$. The recurrence $C_{n+1} = \sum C_iC_{n-i}$ conditions on the first return to the diagonal.

## How to use it
The skill is recognition rather than computation: whenever a structure is built by nesting or by never letting one running count fall behind another, it is Catalan. Balanced brackets, lattice paths staying weakly below the diagonal, triangulations of a convex polygon, and binary trees on $n$ nodes are the standard disguises.

To confirm a guess, compute the first few values by hand and compare against $1,1,2,5,14$. That check is faster than finding the bijection and almost always settles it.

Two derivations are worth keeping. The subtraction form comes from the reflection principle — all paths minus the bad ones. The convolution recurrence comes from splitting at the first return to the diagonal, and it is the one that generalises when the problem is Catalan-like but not exactly Catalan.

## On contests
$1, 2, 5, 14, 42, 132, 429, 1430$ should be recognizable on sight. AIME problems rarely say "Catalan" — they describe a non-crossing or non-negative-partial-sum condition and expect the identification.`,

"ballot-problem": String.raw`## Why it works
The cycle lemma or [[reflection-principle|reflection principle]]: bad sequences (where B ties or leads at some point) biject with sequences starting with a B-vote, giving the clean $\frac{a-b}{a+b}$ fraction of orderings.

## How to use it
Recognize the shape as a running-total condition: one count must stay ahead of another throughout a random ordering. Vote counts are the classic dressing, but queues with correct change and lattice paths above a line are the same problem.

The reflection argument is what to reproduce: any ordering where the counts tie can be reflected before the first tie, biject the bad orderings with the ones starting with a $B$, and the subtraction gives the clean fraction.

Check which version the problem wants. "Always strictly ahead" gives $\frac{a-b}{a+b}$, while "never behind" allows equality and gives $\frac{a-b+1}{a+1}$ — the two differ, and problems exploit the distinction.

## On contests
Vote-counting and queue problems on AIME; also the engine behind Catalan path counts (the $a = b$ boundary case). Reflection-principle fluency transfers to many "stay above the line" problems.`,

"burnsides-lemma": String.raw`
## Key forms
- $|\mathrm{Fix}(g)|=k^{c(g)}$ — count the cycles of $g$, since every cycle must be a single color
- rotation by $d$ on an $n$-cycle has $\gcd(n,d)$ cycles — the subcount behind every necklace problem
- reflections join the group only when flips are allowed — a bracelet, not a seating chart

## Why it works
Count the pairs made of a symmetry and a coloring it fixes, in two ways.

Summing over the symmetries gives $\sum_g|\mathrm{Fix}(g)|$. Summing over the colorings instead, each coloring is fixed by the symmetries in its stabilizer, which by the orbit-stabilizer theorem has $\frac{|G|}{\text{orbit size}}$ elements. So the colorings in one orbit contribute $$\text{orbit size} \times \frac{|G|}{\text{orbit size}} = |G|$$ pairs between them, whatever the orbit, and the total is $|G|$ times the number of orbits.

A coloring is fixed by $g$ exactly when $g$ never moves a position to one of a different color, that is, when every cycle of $g$ is one color, which gives $|\mathrm{Fix}(g)| = k^{c(g)}$.

{{figure:rotations}}

## How to use it
List the symmetry group, count the colorings each element fixes, and average. Choose the group first, since the answer depends on it: rotations alone for an object fixed in place, and reflections as well when flipping it over gives something indistinguishable, like a necklace that can be turned over.

For $2$-colorings of the corners of a square up to rotation, the identity fixes $2^4 = 16$, the quarter turns fix $2$ each, and the half turn fixes $2^2 = 4$, so there are $$\frac{16 + 2 + 4 + 2}{4} = 6.$$ On a necklace of $n$ beads, rotation by $d$ positions has $\gcd(n, d)$ cycles.

The sum over the group must be a multiple of $|G|$, so a non-integer average means a miscounted fixed set. Burnside counts orbits only; for colorings with a prescribed number of each color, use [[polya-enumeration|Pólya enumeration]].

## On contests
Five problems here, four of them AIME, one solved by it alone; two combine it with [[constructive-counting|constructive counting]] of the fixed colorings. AIME usually needs only rotations, while flippable physical objects need the reflections too. The cube's $24$ rotations and their cycle structures are worth working out once in advance.
`,

"stirling-bell": String.raw`## Why it works
$S(n,k)$ recursion conditions on element $n$: either it forms its own block ($S(n-1,k-1)$) or joins one of the $k$ existing blocks ($kS(n-1,k)$). Bell numbers sum over all block counts.

## How to use it
The recurrence is the practical tool and its derivation tells you how to adapt it: consider the last element, which either joins one of the $k$ existing blocks or forms a block of its own.

Keep the distinction between labeled and unlabeled straight, since it decides which count you need. Objects labeled and blocks unlabeled gives $S(n,k)$; labeling the blocks as well multiplies by $k!$ and gives surjections; making the objects identical instead gives integer partitions.

Bell numbers answer "how many ways to partition into any number of blocks", and their own recurrence $B_{n+1}=\sum_k\binom nkB_k$ comes from choosing the block containing a fixed element.

## On contests
"Partition 5 students into study groups" ($B_5$ or $S(5,k)$ depending on wording) and surjection counts. The labeled/unlabeled distinction (Stirling vs. surjection) is the tested subtlety.`,


"non-adjacent-selection": String.raw`
## Why it works
Putting the chosen objects into different gaps between the unchosen ones is exactly the same as choosing a set with no two neighbors.

In a row, the $n - k$ unchosen objects leave $n - k + 1$ gaps: one between each neighboring pair and one at each end. Putting each chosen object into a different gap guarantees an unchosen object between any two chosen ones, and every non-adjacent choice arises this way from exactly one set of gaps. So there are $\binom{n - k + 1}{k}$.

{{figure:gaps}}

For a circle, split on whether a fixed object, say object $1$, is chosen. If it is, its two neighbors are not, and the other $k - 1$ come from a row of $n - 3$, giving $\binom{n - k - 1}{k - 1}$. If it is not, the rest form a row of $n - 1$, giving $\binom{n - k}{k}$.

Since $\binom{n - k - 1}{k - 1} = \frac{k}{n - k}\binom{n - k}{k}$, the two cases add up to $\frac{n}{n - k}\binom{n - k}{k}$.

## How to use it
Do not attack the condition directly; lay out the unchosen objects and choose gaps. For $3$ of $8$ chairs in a row, the $5$ unchosen chairs leave $6$ gaps, so there are $\binom63 = 20$ ways; around a round table there are $\frac85\binom53 = 16$.

For "at least $d$ apart" instead of merely not adjacent, put $d - 1$ spacers into each inner gap first; the row count becomes $\binom{n - (k - 1)(d - 1)}{k}$. The complement, "at least two adjacent", is the total $\binom nk$ minus the non-adjacent count.

## On contests
Six problems here, all AIME, none by it alone; two turn the count into a [[basic-probability|probability]] by dividing by $\binom nk$. The circular formula is the one to know by heart, since deriving it under time pressure invites an off-by-one error.
`,

"partitions": String.raw`
## Why it works
Compositions are easy because order makes every choice independent. Write $n$ as $n$ ones in a row; a composition is a choice, at each of the $n - 1$ gaps, of whether to break there, so there are $2^{n-1}$.

Partitions ignore order, which destroys that independence, so there is no formula. What they have instead is a picture, the Ferrers diagram, with one row of dots for each part, longest first. Reflecting it across its diagonal swaps rows and columns, so it matches the partitions with at most $k$ parts with the partitions whose parts are at most $k$.

{{figure:conjugate}}

Euler's theorem comes from splitting parts. An odd part repeated $m$ times regroups, by writing $m$ in binary, into distinct parts, and every distinct part is an odd number times a power of $2$, so the process runs backwards and the two kinds of partitions are equally many.

## How to use it
Decide first whether order matters, since the two counts are wildly different. For small $n$, list partitions in decreasing order of the largest part to avoid repeats, as in the example.

With a restriction on the parts, use the generating function $$\prod_{k \ge 1} \frac{1}{1 - x^k},$$ which counts all partitions; dropping factors restricts the allowed parts. Conjugation turns a hard restriction into an easy one, since at most $k$ parts is the same count as parts at most $k$.

## On contests
Three problems here, two AIME and one AMC 12, none solved by it alone. Typical uses count compositions in disguise, such as the halves of a palindrome or the jump sequences of a frog, and partitions under a parity or size restriction, alongside [[stars-and-bars|stars and bars]] and [[casework-method|casework]].
`,

"surjections": String.raw`## Why it works
Inclusion–exclusion over which outputs are missed: $\sum_{j=0}^{k}(-1)^j\binom{k}{j}(k-j)^n$ subtracts the assignments that avoid $j$ chosen outputs, alternating to correct for double-counted overlaps. It equals $k!\,S(n,k)$ because a surjection is an unordered partition of the $n$ inputs into $k$ nonempty blocks — that count is $S(n,k)$, a Stirling number of the second kind — followed by a bijection matching the $k$ blocks to the $k$ labeled outputs, which adds a factor of $k!$.

## How to use it
The requirement that every output is used destroys the independence between inputs, so no product formula exists — that is why this needs inclusion-exclusion while counting plain functions does not.

Run the exclusion over which outputs are missed: subtract the functions avoiding one chosen output, add back those avoiding two, and so on. Each term is a plain function count into a smaller codomain.

The Stirling form is often faster when $k$ is small, since $k!\,S(n,k)$ separates the count into "how are the inputs grouped" and "which output does each group take". It is also the entry in [[balls-boxes-table|the twelvefold way]] for distinguishable balls into distinguishable boxes with none empty.

## On contests
"Each of 3 mailboxes gets at least one of 6 letters," "every color is used," "no group left empty" — all recurring AMC/AIME shapes. The [[pie|PIE]] formula plus fluency with the small cases handles essentially all of them.`,

"permutation-cycle-structure": String.raw`
## Key forms
- $\operatorname{ord}(f) = \operatorname{lcm}$ of the cycle lengths — so $f^{\,k} = \mathrm{id}$ exactly when every cycle length divides $k$, which turns a condition on the function into a condition on a partition of $n$
- $\alt{\dfrac{n!}{\prod_c c^{m_c} m_c!}}{\dfrac{n!}{1^{m_1}m_1!\cdot 2^{m_2}m_2!\cdots}}$ functions have $m_c$ cycles of each length $c$ — divide by $c$ per cycle, since a cycle can be written starting anywhere, and by $m_c!$ because equal-length cycles are interchangeable
- $f = f^{-1}$ means every cycle has length $1$ or $2$ — an involution, the $k = 2$ case, counted by $\alt{\sum_j \binom{n}{2j}(2j-1)!!}{1+\binom n2\cdot 1+\binom n4\cdot 3+\binom n6\cdot 15+\cdots}$
- a single $c$-cycle on a chosen set of $c$ elements can be written $(c-1)!$ ways — the [[circular-permutations|circular arrangement]] count, which is where the $c^{m_c}$ comes from

## Why it works
Following an element must lead back to it, and the loops that result do not interact.

Start at $x$ and iterate. The set is finite, so some value repeats, say $f^{\,i}(x) = f^{\,j}(x)$ with $i \lt j$ and $i$ as small as possible. If $i$ were positive, $f$ being one-to-one would give the earlier repeat $f^{\,i-1}(x) = f^{\,j-1}(x)$, so $i = 0$ and the first repeat is $x$ itself. The orbit closes into a cycle, and repeating on what is left splits the whole set into disjoint cycles.

{{figure:cycles}}

Applying $f$ turns every cycle one step. A cycle of length $c$ is back in place after exactly the multiples of $c$ steps, so all of them are back at once after a common multiple of the lengths. The first such time is the $\operatorname{lcm}$, and $f^{\,k} = \mathrm{id}$ exactly when every length divides $k$.

The counting formula comes from writing permutations down. List the $n$ elements in a row, in $n!$ ways, and cut the row into consecutive blocks of the chosen lengths, each block a cycle. Each permutation is written $c$ times per $c$-cycle, once for each starting point, and equal-length cycles can be listed in any of $m_c!$ orders, so dividing by $\prod_c c^{m_c} m_c!$ counts each permutation once.

## How to use it
When a problem constrains an iterate of $f$, translate it at once into allowed cycle lengths: $$f^{\,k}(x) = x \text{ for every } x \iff \text{every cycle length divides } k.$$ Then list the partitions of $n$ into allowed parts and count each type with the formula, as in the example.

The picture answers the reverse question too. The largest order of a permutation of $n$ elements is the largest $\operatorname{lcm}$ of a partition of $n$; for $n = 8$ it is $15$, from $3 + 5$. Parity also reads off the cycles: a $c$-cycle is a product of $c - 1$ swaps, so a permutation is even exactly when it has an even number of cycles of even length.

One family comes up whenever something steps around a ring. Moving $k$ places at a time around $n$ positions splits them into $$\gcd(n, k) \text{ cycles, each of length } \frac{n}{\gcd(n, k)}.$$ A position comes back after $m$ steps exactly when $n$ divides $mk$, which first happens at $m = \frac{n}{\gcd(n, k)}$, and since every cycle has that length there are $\gcd(n, k)$ of them.

## On contests
Four problems here, all AIME, none solved by it alone, and three of them finish with [[casework-method|casework]] over cycle types. The standard shape is "count the functions with $f^{\,k}(x) = x$ for every $x$", where the allowed cycle lengths are the divisors of $k$, as in the example.

Variations forbid every cycle shorter than some length, count arrangements such as handshake rings that are cycle structures in disguise, or step around a ring of $n$ points, where $\gcd(n, k)$ decides the cycles.

[[derangements|Derangements]] ask about fixed points instead, [[burnsides-lemma|Burnside's lemma]] averages over cycle structure, and counting by the number of cycles rather than their lengths is [[stirling-first-kind|Stirling numbers of the first kind]].
`,

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


"basic-probability": String.raw`
## Why it works
If all the outcomes are equally likely, each one holds the same share of the total probability, so an event's probability is just how many shares it holds.

Suppose there are $N$ equally likely outcomes. Their probabilities add up to $1$ and are all the same, so each one is $\frac{1}{N}$. An event made of $k$ of them therefore has probability $$k \cdot \frac{1}{N} = \frac{k}{N},$$ which is favorable over total.

The union rule is a counting fact divided by $N$. Counting the outcomes in $A$ and then the outcomes in $B$ counts every outcome in both of them twice, so $|A \cup B| = |A| + |B| - |A \cap B|$, and dividing by $N$ gives $$P(A \cup B) = P(A) + P(B) - P(A \cap B).$$ With three or more events the same correction becomes [[pie|inclusion-exclusion]].

The complement rule is the special case where $A$ and "not $A$" never overlap and together cover every outcome, so their probabilities add to $1$.

When the outcomes are not equally likely, none of this applies. The sums $2, 3, \ldots, 12$ of two dice are eleven outcomes, but a sum of $7$ happens six ways and a sum of $2$ only one, so they do not share the probability equally. The fix is always to go back to a finer list that is equally likely, here the $36$ ordered pairs, and count there.

## How to use it
Choose the sample space so that a single count answers the question, then use the union rule for "or" and the complement for "at least one". The complement is almost always shorter, because "none" factors into independent choices while "at least one" does not.

Multiply probabilities only after confirming independence. When the draws are without replacement they are dependent, so either condition step by step or count the favorable and total selections directly with binomial coefficients.

## On contests
It is the frame around most probability problems rather than the step that solves them: of the 46 problems tagged here, only one needs nothing else. The partner that does the work is almost always a counting technique, [[casework-method|casework]] in 14 of them and [[constructive-counting|constructive counting]] in 5, because once the outcomes are equally likely the whole problem is two counts.

The recurring trap on AMC and AIME is a sample space that looks uniform and is not, like the dice sums above; the fix is to rebuild it from ordered, distinguishable choices.
`,

"conditional-probability": String.raw`
## Why it works
Once $B$ is known to have happened, the outcomes outside $B$ are impossible and the ones inside keep their relative likelihoods, so conditioning means restricting to $B$ and rescaling.

With equally likely outcomes this is plain counting. If $B$ has $|B|$ outcomes and $|A \cap B|$ of them are in $A$, then among the outcomes still possible a fraction $\frac{|A \cap B|}{|B|}$ lie in $A$. Dividing the top and bottom by the size of the whole space turns this into $\frac{P(A \cap B)}{P(B)}$.

The same ratio is taken as the definition when outcomes are not equally likely, because it is the only rescaling that keeps the outcomes of $B$ in their original proportions and makes their total $1$.

{{figure:dice}}

Bayes' theorem is the definition used twice. Both $P(A \mid B)\,P(B)$ and $P(B \mid A)\,P(A)$ equal $P(A \cap B)$, so they equal each other, and dividing by $P(B)$ gives $P(A \mid B) = \frac{P(B \mid A)\,P(A)}{P(B)}$. That is how a conditional probability is reversed, and [[bayes-theorem|Bayes' theorem]] has its own card.

## How to use it
Read $P(A \mid B)$ as "throw away every outcome outside $B$, then measure $A$ within what remains." With equally likely outcomes that is a count of $A \cap B$ over a count of $B$, and it handles most problems without any formula.

The rearranged form is what you use going forward: a sequence of dependent choices multiplies as $$P(\text{first}) \cdot P(\text{second} \mid \text{first}) \cdots,$$ which is how draws without replacement are computed step by step. Drawing two red balls from $3$ red and $2$ blue happens with probability $\frac35 \cdot \frac24 = \frac{3}{10}$, since after one red is gone, $2$ of the $4$ remaining balls are red.

Two traps are worth naming. $P(A \mid B)$ and $P(B \mid A)$ are different numbers, and confusing them is exactly the error Bayes' theorem exists to correct. And independence is a claim to check, not to assume from the story: "the two draws feel unrelated" is not evidence, while checking $P(A \cap B) = P(A)\,P(B)$ is.

## On contests
Eleven problems here, ten of them AIME, and none solved by it alone: the condition defines the restricted space, then [[casework-method|casework]] or [[constructive-counting|a direct count]] measures it, and three of them reverse the condition with [[bayes-theorem|Bayes' theorem]]. The classic trap is which space the condition defines. For two children, "at least one is a boy" leaves three equally likely cases and makes two boys $\frac13$, while "the older one is a boy" leaves two cases and makes it $\frac12$.
`,

"binomial-probability": String.raw`
## Why it works
One particular sequence of outcomes with $k$ successes has probability $p^k(1 - p)^{n - k}$, and $\binom nk$ different sequences have that many successes.

Because the trials are independent, the probability of a particular sequence, such as success, failure, success, failure, is the product $p \cdot (1 - p) \cdot p \cdot (1 - p)$. Every sequence with exactly $k$ successes has the same product, $p^k(1 - p)^{n - k}$, whatever the order. Such a sequence is fixed by which $k$ of the $n$ positions hold the successes, so there are $\binom nk$ of them, and their probabilities add.

{{figure:sequences}}

## How to use it
Check three conditions first: the trials are independent, their number is fixed in advance, and $p$ is the same every time. If one fails, this is the wrong model: drawing without replacement is hypergeometric, and waiting for the first success is [[geometric-distribution|geometric]].

For "at least $k$" questions, add the terms from $k$ upward, or subtract the shorter tail from $1$. Expected counts need no sum at all, since [[expected-value|linearity]] gives $np$ directly: $4$ fair flips average $2$ heads, while exactly $2$ heads has probability $\binom42 \cdot \frac1{16} = \frac38$.

## On contests
Five problems here, all AIME, two solved by it alone; the others add [[symmetry-probability|symmetry]], a [[generating-function-method|generating function]] or a [[bijection-method|bijection]]. AMC uses the plain formula on coins and dice, and AIME variants weight the coin, compare two binomial probabilities, or condition on the outcome.
`,

"expected-value": String.raw`
## Why it works
Expectation is a weighted average, and a weighted average of a sum is the sum of the weighted averages, whatever the relationship between the terms.

Over a finite sample space whose outcomes $\omega$ have probabilities $p(\omega)$, $E[X] = \sum_\omega X(\omega)\,p(\omega)$. Splitting the sum gives $$E[X + Y] = \sum_\omega \bigl(X(\omega) + Y(\omega)\bigr)p(\omega) = E[X] + E[Y].$$ Independence never enters, because nothing about how $X$ and $Y$ relate was used. The same step gives $E[aX + b] = aE[X] + b$.

The table shows it for three coin flips: averaging the row totals gives the same answer as averaging each column and adding.

{{figure:flips}}

## How to use it
When the question asks for an expected number of something, write the count as a sum of [[indicator-variables|indicators]], one for each place the thing could happen, each equal to $1$ if it happens and $0$ if not. An indicator's expected value is the probability of its event, so the answer is a sum of probabilities, and the distribution of the total is never needed.

For the number of fixed points of a random permutation of $n$ items, the indicator for each position has expected value $\frac1n$, so $$E[\text{fixed points}] = n \cdot \frac1n = 1,$$ even though the events are far from independent.

Compute $E[X] = \sum x_ip_i$ directly only when the distribution is short. For a long or infinite range, use indicators or the [[tail-sum-expectation|tail-sum formula]]; for a process that moves between states, use [[states-recursion-prob|first-step analysis]].

## On contests
Six problems here, five of them AIME, none by it alone; two continue into [[states-recursion-prob|first-step analysis]] and two into [[indicator-variables|indicator variables]]. AIME expected-value problems are almost always linearity of indicators in disguise, and recognizing a count as a sum of indicators replaces heavy [[casework-method|casework]] with a one-line sum.
`,

"geometric-distribution": String.raw`## Why it works
Self-similarity: after one failure the situation resets, so $E = 1 + (1-p)E$, giving $E = \frac{1}{p}$. The series view sums $\sum k p(1-p)^{k-1}$ (arithmetico-geometric), whose terms are the distribution itself: the first success falls exactly on trial $k$ with probability $P(X=k)=(1-p)^{k-1}p$.

## How to use it
Set up the self-similar equation rather than summing a series: after one trial you have either succeeded or are back where you started, so $E=1+(1-p)E$, giving $E=\frac1p$. The same conditioning handles variants the closed form does not cover.

Coupon collector is a sum of geometric waits. Once you hold $k$ distinct types, the chance the next draw is new is $\frac{n-k}{n}$, so that stage takes $\frac{n}{n-k}$ on average; adding the stages gives $nH_n$. Recognizing it as a sum of independent waits is what makes it easy.

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

"geometric-probability": String.raw`
## Key forms
- one axis per random quantity — two arrival times become a point in a square, three become a point in a cube
- $|x - y| \le t$ — the meeting condition, a band around the diagonal whose complement is two corner triangles
- $x$, $y - x$, $1 - y$ all below $\frac12$ — the broken-stick family, where the triangle inequalities cut the square down to a quarter

## Why it works
"Uniform" means that equally long pieces of the range are equally likely, so probability is proportional to size.

With one number $x$ chosen uniformly from $[0, 1]$, the chance that it lands in a subinterval is that subinterval's length: two intervals of the same length must be equally likely, and the whole of $[0, 1]$ has probability $1$.

With two independent uniform numbers $x$ and $y$, the pair is a point chosen uniformly from the unit square, and the chance that it lands in a region is that region's area: $$P\big((x, y) \in R\big) = \text{area of } R.$$ Each additional random quantity adds a dimension, so three give a point in a cube and probability becomes volume.

That is why the method reduces to geometry. A condition like $x + y \lt 1$ or $|x - y| \le t$ is an inequality, and a linear inequality cuts the square along a straight line. The favorable region is then a polygon, and its area comes from triangles and trapezoids.

## How to use it
Draw the region. Put each random quantity on its own axis, shade the outcomes satisfying the condition, and take the ratio of areas; the picture does the work that algebra would make painful.

Two habits make the shading reliable. Translate every condition into an inequality in the coordinates before drawing, and check whether the region is bounded by lines through the origin, which usually means the answer is a simple fraction of the square.

For meeting problems, such as two people arriving between 1 and 2 and each waiting 15 minutes, the condition is $$|x - y| \le \tfrac14 \text{ hour},$$ a band around the diagonal whose complement is two corner triangles with legs $\frac34$, so the probability is $1 - \left(\frac34\right)^2 = \frac{7}{16}$.

The broken stick is the same picture. Break a stick of length $1$ at two uniform points $x$ and $y$. The three pieces form a triangle exactly when each is shorter than $\frac12$, since a piece of length at least $\frac12$ is at least as long as the other two put together.

When $x \lt y$ the pieces are $x$, $y - x$ and $1 - y$, and the three conditions carve out the triangle with corners $\left(0, \frac12\right)$, $\left(\frac12, \frac12\right)$ and $\left(\frac12, 1\right)$; the case $y \lt x$ gives its mirror image. Each has area $\frac18$, so the probability is $\frac14$.

{{figure:broken-stick}}

## On contests
A fixture of AMC and AIME probability, with 17 tagged problems here, 11 of them AIME, and only 2 that need nothing else. The usual partner is [[casework-method|casework]], when the favorable region has to be cut into pieces before its area can be taken.

The standing shapes are two people arriving at random times and waiting for each other, sticks broken at random points, and points dropped in a square or on a segment. In all of them corner-triangle arithmetic beats integration, as long as the region is drawn exactly.
`,

"states-recursion-prob": String.raw`
## Key forms
- $p_S=\alt{\sum_{\text{moves}}P(\text{move})\,p_{S'}}{P(\text{move}_1)\,p_{S_1}+P(\text{move}_2)\,p_{S_2}+\cdots}$ — one equation per state, conditioning on the first step
- $E_S=1+\alt{\sum_{\text{moves}}P(\text{move})\,E_{S'}}{P(\text{move}_1)\,E_{S_1}+P(\text{move}_2)\,E_{S_2}+\cdots}$ — the same for expected number of steps
- $p_{\text{absorb}}=1$, $p_{\text{fail}}=0$, $E_{\text{absorb}}=0$ — the anchors that close the system
- $P=\frac{a}{a+b}$, $E=ab$ — gambler's ruin from $a$ with target $a+b$ on a fair walk

## Why it works
What happens next depends only on the current state, not on how the process got there, so the value from a state is a weighted average of the values from the states it moves to.

Let $p_S$ be the probability of eventually winning from state $S$. The first step goes to $S'$ with probability $P(S \to S')$, and from there the process starts afresh at $S'$, winning with probability $p_{S'}$. Adding over the possible first steps, $$p_S = \sum_{S'} P(S \to S')\,p_{S'}.$$

For the expected number of steps, the first step costs $1$ and the process then continues from $S'$, so $$E_S = 1 + \sum_{S'} P(S \to S')\,E_{S'}.$$

The stopping states supply the constants: $p = 1$ at a win, $p = 0$ at a loss, and $E = 0$ wherever the process has ended.

A bug on a cube, stepping to a random neighboring corner until it reaches the corner opposite its start, has eight positions but only four kinds of state: distance $0$, $1$, $2$ or $3$ from the start. Corners at the same distance behave identically, so they share one unknown.

{{figure:cube}}

The equations are $$E_0 = 1 + E_1, \qquad E_1 = 1 + \tfrac13E_0 + \tfrac23E_2, \qquad E_2 = 1 + \tfrac23E_1 + \tfrac13 \cdot 0.$$ Substituting the first and third into the second gives $E_1 = 2 + \frac79E_1$, so $E_1 = 9$, and the walk from the start takes $E_0 = 10$ steps on average.

## How to use it
Name one unknown per state, merging states that are the same by symmetry. Write one equation per state from its first step, fix the stopping states, and solve the small linear system. Without merging, the cube would need eight unknowns.

Gambler's ruin is the one-dimensional case: from $a$, step up with probability $p$ and down with probability $q = 1 - p$, stopping at $0$ or $N$. Then $$p_a = p\,p_{a+1} + q\,p_{a-1}, \qquad p_0 = 0, \quad p_N = 1.$$ In a fair game each $p_a$ is the average of its neighbors, so the values are in arithmetic progression and $p_a = \frac aN$, and the expected length of the game is $a(N - a)$. A biased game gives $p_a = \frac{1 - (q/p)^a}{1 - (q/p)^N}$.

Some walks have closed forms worth recognizing. On a tetrahedron, where every other corner is a neighbor, the chance of being back at the start after $n$ steps is $$\tfrac14 + \tfrac34\left(-\tfrac13\right)^n.$$ For a process with a fixed length, such as a best-of-seven series, the same idea runs as a recursion on the score instead of a system of equations.

## On contests
Nine problems here, all AIME, and four solved by it alone: this is the standard format for a hard AIME probability question, with frogs on lily pads, bugs on the corners of a solid, and series played to a number of wins. Others combine it with [[expected-value|expected value]]. Look for the symmetry that merges states before writing any equations, since it is what keeps the system small enough to solve by hand.
`,

"symmetry-probability": String.raw`
## Key forms
- every position is equally likely to hold every item — so a given position is special with probability $\frac{\#\text{special}}{\#\text{total}}$, whatever the position
- $P(A\text{ before }B)=\frac12$ — relative-order questions need no computation at all
- $\frac1{k!}$ — the chance of one prescribed relative order among $k$ items

## Why it works
A symmetry argument is a one-to-one pairing between two sets of equally likely outcomes, and two sets of the same size have the same probability.

In a uniformly random arrangement of $n$ items, every one of the $n!$ orders has probability $\frac{1}{n!}$. Take two named items $A$ and $B$ and swap their places. This sends every order with $A$ before $B$ to an order with $B$ before $A$, and doing the swap again gives back the order you started with, so no two orders are sent to the same place. The two sets are therefore the same size, $\frac{n!}{2}$ each, and $P(A\text{ before }B) = \frac12$.

{{figure:swap}}

Positions work the same way. Exchanging the contents of position $1$ and position $k$ is again a swap that undoes itself, and it matches the arrangements with an ace in position $k$ to those with an ace in position $1$. So every position holds an ace with the same probability, and for the top card it is plain: $$P(\text{ace in position } k) = P(\text{ace on top}) = \frac{4}{52}.$$

With $k$ named items, rearranging their places among themselves matches any one of their relative orders with any other, so each of the $k!$ orders has probability $\frac{1}{k!}$.

The argument needs the outcomes to be equally likely to begin with and the swap to keep them that way. A shuffled deck, a random permutation or a uniformly chosen subset qualify. A setup that favors one side, such as a game where one player moves first, does not, and there the shortcut gives a wrong answer.

## How to use it
Look for the outcomes the problem cannot tell apart, then divide. "The $k$-th card is an ace" has probability $\frac{4}{52}$ whatever $k$ is. "$A$ is before $B$" is $\frac12$, "$A$ comes first among $A$, $B$, $C$" is $\frac13$, and "$A$, $B$, $C$ appear in that order" is $\frac16$.

Irrelevant items can be ignored. Among the four aces and four kings of a shuffled deck, the first of those eight cards to appear is equally likely to be any of the eight, so it is an ace with probability $\frac48 = \frac12$; the other $44$ cards change nothing.

Many sequential-looking setups dissolve the same way. Drawing without replacement is just reading a random order from the left, so the chance that the third ball drawn is red equals the chance that the first is red, whatever happened in between.

## On contests
Twelve problems here use it, nine of them AIME, and none by it alone: it is the step that fixes one probability or removes a case inside a [[casework-method|casework]] count or a [[basic-probability|direct probability]] computation. Typical sightings are relative-order questions, a particular position in a random arrangement, and draws without replacement that look sequential but are exchangeable.
`,

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

"pigeonhole": String.raw`
## Why it works
If every box held fewer than the average, the boxes together would hold fewer than all the objects, which is impossible.

With $n$ objects in $k$ boxes the average box holds $\frac nk$, and the fullest box holds at least the average. Since box counts are whole numbers, it holds at least $\lceil \frac nk \rceil$. In the simplest case, $n \gt k$ makes the average more than $1$, so some box holds two. Run backwards, forcing some box to hold $r$ objects needs more than $k(r - 1)$ of them.

## How to use it
Invent the boxes. Choose a feature with few possible values, which become the boxes, such that two objects sharing a value gives what you want. Two integers with the same remainder mod $m$ differ by a multiple of $m$; two points in the same small region are close together; two subsets with the same sum can be compared.

For five points in a unit square, cut it into four squares of side $\frac12$. Five points in four squares put two in the same one, and two points in a square of side $\frac12$ are at most its diagonal, $\frac{\sqrt2}{2}$, apart.

{{figure:square}}

## On contests
Five problems here, mostly AMC, three solved by it alone. The signature is a guarantee: "show that two of them must", or a number exactly one more than the count of some category, as in the fewest socks that guarantee a matching pair. The art is always the choice of boxes, never the principle itself.
`,

"handshake-lemma": String.raw`
## Why it works
Count the pairs (vertex, edge at that vertex) in two ways.

Grouped by vertex, a vertex of degree $\deg(v)$ contributes $\deg(v)$ pairs. Grouped by edge, each edge has exactly two ends and contributes two. Both count the same pairs, so $$\sum_v \deg(v) = 2E.$$

The total is even, and the vertices of even degree contribute an even amount, so the odd degrees must also add to an even number, which needs an even number of them.

## How to use it
Use it in two directions. Forwards, it converts degree information into an edge count: if each of $n$ people shakes $k$ hands, there are $\frac{nk}{2}$ handshakes.

Backwards, it is a [[invariants-coloring|parity obstruction]]. Can seven people each shake exactly three hands? The degrees would add to $$7 \cdot 3 = 21,$$ an odd number, so no such arrangement exists.

The lemma also underlies [[eulerian-paths|Eulerian paths]]: a path through every edge needs $0$ or $2$ vertices of odd degree, and the count being even is why $1$ or $3$ never occurs.

## On contests
Three problems here, two AIME and one AMC 10, one solved by it alone. Typical uses add up the degrees of a network to count its edges, split a polyhedron's vertices by degree once [[eulers-polyhedron-formula|Euler's formula]] gives how many there are, or use the odd degrees to bound a trail through a graph. The same template counts games in a tournament and edges of a polyhedron from its faces.`,

"double-counting": String.raw`
## Key forms
- $\alt{\sum_v\deg v}{\deg v_1+\cdots+\deg v_n}=2E$ — count edge-endpoints once per vertex and once per edge
- $k\binom nk=n\binom{n-1}{k-1}$ — count (committee, chair) pairs by committee first or by chair first
- $\alt{\sum_i\binom{w_i}{2}}{\binom{w_1}{2}+\cdots+\binom{w_n}{2}}$ against $\binom n3$ — count dominated pairs in a tournament to extract the cyclic triangles
- rows against columns of a $0/1$ incidence matrix — the picture underneath all of them

## Why it works
One set, counted two ways, has one size.

Formally you are sizing a set of pairs $S \subseteq A \times B$. Grouping the pairs by their first entry gives a sum over $a \in A$ of how many partners $a$ has, grouping by the second gives a sum over $b \in B$, and both equal $|S|$. In a grid with a dot for each pair, these are the row totals added up and the column totals added up.

{{figure:incidence}}

The identity is free; all the work is in choosing what to count. The right set is one where both ways of grouping give something you can evaluate, or at least bound.

## How to use it
Name a set of pairs whose two groupings you can both handle, then equate them. The recurring choices are memberships (people and committees), incidences (points and lines, or students and problems solved), edge-endpoints (vertices and edges), and ordered outcomes (winner and loser in a tournament).

Three shapes are worth recognizing.

- Both sums computable: you get an identity, like $k\binom{n}{k} = n\binom{n-1}{k-1}$ from counting a committee together with its chair.
- One sum computable, the other bounded: you get an inequality, which is how most olympiad "at most" and "at least" combinatorics is proved.
- One sum computable and every row the same: you get an exact count, as in the example.

When a problem gives a global total and asks about a local count, or the other way around, this is nearly always the intended tool: count the constrained pairs, then divide by how many any single object can take part in.

## On contests
Four problems here, all AIME, one solved by it alone. The recurring shapes are counting pairs of lines once in all and once at each crossing point, where $k$ lines through a point account for $\binom k2$ pairs; counting tournament points by games and by players; counting ownerships by item and by person, alongside [[pie|inclusion-exclusion]]; and counting element by element instead of pair by pair, which often ends in [[vandermonde|Vandermonde's identity]].`,

"ramsey-33": String.raw`## Why it works
Among one person's 5 relations, pigeonhole gives 3 of one type; those 3 either contain a matching pair (closing a monochromatic triangle with the center) or form the opposite triangle themselves. $K_5$'s two-pentagon coloring shows 6 is tight.

## How to use it
The proof is a two-step pigeonhole worth reproducing. Fix one person: of their five relationships, at least three share a color, say three friends. If any two of those three are friends with each other, that trio plus the fixed person is a monochromatic triangle; if none are, those three are mutual strangers.

Minimality needs a construction, not an argument — color a $5$-cycle one way and its complement the other, and no monochromatic triangle exists. Contest problems asking to show a bound is tight always need this second half.

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
The direct application is a take-away game with a bound: find the losing starting positions up to some $n$, which the table turns into a residue pattern. In a game where each move removes $1$ or $3$ tokens, for instance, the losing positions are exactly the even piles, since every move changes the parity. AMC versions typically ask who wins with optimal play for one specific $n$, which the same table answers instantly.`

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
The formula is short but the bijection is what solves problems. Encode a tree by repeatedly deleting the smallest-labeled leaf and recording its neighbor; the resulting $n-2$ labels determine the tree uniquely, and every sequence arises exactly once.

That correspondence answers the harder variants directly. Since a vertex appears one fewer time than its degree, counting trees with prescribed degrees $d_1,\dots,d_n$ becomes the multinomial coefficient $\binom{n-2}{d_1-1,\dots,d_n-1}$, and counting trees in which a given vertex is a leaf becomes counting sequences that omit it.

Watch the labeling assumption — the count is for distinguishable vertices, and unlabeled trees have no closed form.

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
Derive rather than memorize: adding the $k$-th line crosses the previous $k-1$ lines, and each crossing splits one more region, so it adds $k$ regions in total. Summing gives $1+\sum_{k=1}^{n}k$, which is the closed form. The same argument with two crossings per circle gives the circle count.

That incremental principle is the transferable part — it handles configurations the formulas do not cover, such as a mix of lines and circles, or lines with some parallels, by counting crossings as each curve is added.

Check the general-position hypothesis before quoting a maximum. Any parallel pair or triple concurrence loses regions, and problems often specify a configuration that deliberately fails it.

## On contests
Direct AMC questions ask for the most pieces from a few straight cuts, such as $16$ pieces of a pancake from $5$ cuts, and harder problems use the same count, $1 +$ lines $+$ crossings, for the expected number of regions from random chords, by linearity.`,

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

Wald's identity is the case worth recognizing separately: when a random number of independent pieces are summed, the expected total is the product of the two expectations, provided $N$ does not depend on the values of the pieces. That proviso matters, and dropping it is the standard error.

The technique pairs naturally with state recursions: the law of total expectation writes one equation per state, and solving the small system gives every expectation at once. Whichever partition you pick, check it is disjoint and exhaustive — the same requirement as ordinary [[casework-method|casework]], and the usual source of a wrong weighted average.

## On contests
The organizing principle behind nearly every AIME expected-value problem: condition on the first step, write the tower equation, solve. Misapplying it (conditioning on a non-partition) is the error to guard against — cases must be exclusive and exhaustive.`,



"bijection-method": String.raw`
## Key forms
- strictly increasing sequences $\leftrightarrow$ subsets — choosing the set fixes the order, so $\binom nk$ counts both
- solutions of $x_1+\cdots+x_k=n$ $\leftrightarrow$ [[stars-and-bars|stars and bars]] — a solution is a row of stars cut by $k-1$ bars
- lattice paths $\leftrightarrow$ words in R and U — a path is the string of its own steps
- "at most $k$" $\leftrightarrow$ its complement — $k\leftrightarrow n-k$ turns an awkward bound into an easy one

## Why it works
If every object in one set is paired with exactly one object in the other, and nothing is left over on either side, the two sets have the same size.

Such a pairing needs two things. No two objects may share a partner, or the second set would be smaller, and every object in the second set must be someone's partner, or it would be larger. The cleanest way to check both at once is to write down the reverse rule: if every easy object can be turned back into exactly one hard object, the pairing is perfect.

Take the strictly increasing sequences of three numbers from $1$ to $9$. Each is a list like $2, 5, 7$, and forgetting the order turns it into a set: $$(2, 5, 7) \longleftrightarrow \{2, 5, 7\}.$$ Going back, a three-element set can be written in increasing order in exactly one way. So the sequences pair off perfectly with the three-element subsets, and there are $\binom93 = 84$ of them. Nothing was counted about the sequences themselves; the count came entirely from the set they were paired with.

## How to use it
To verify a candidate bijection, exhibit the reverse map. If you can undo it uniquely, the correspondence is genuine; if two hard objects land on the same easy one, or some easy object has no source, the count will be off.

A bijection replaces the set you cannot count with one you can, and the reason to hunt for one is that it removes the casework rather than organizing it. Casework on a constraint is always available and always long; a bijection that absorbs the constraint into the objects makes the count immediate. A lattice path from one corner of a grid to the other is nothing but the word spelled by its steps, so counting paths is counting arrangements of two letters.

{{figure:path-word}}

The same idea turns other constraints into nothing. Nondecreasing sequences become strictly increasing ones once you add $0, 1, 2, \ldots$ to the terms in order. Subsets with no two adjacent elements become ordinary subsets of a smaller range once you subtract $0, 1, 2, \ldots$ from their sorted elements. And "at most $k$" becomes "at least $n - k$" by swapping each object for its complement.

## On contests
The elegant path on AMC and AIME counting, alone in 3 of its 27 problems. Its partners name the two families it usually serves: [[binomial-row-sums|row sums of Pascal's triangle]] (4 problems) and [[base-conversion|base representations]] (3), the latter because writing a number in base two is itself a bijection between integers and subsets.

The tell is the answer. If a strange-looking count comes out as a clean binomial coefficient or a power of two, a bijection was the intended route, and finding it afterwards is how you learn to see it next time.
`,

"grid-path-fill": String.raw`## Key forms
- $N(\text{cell})=\alt{\sum N(\text{cells that step into it})}{N(\text{left})+N(\text{below})+\cdots}$, with $N(\text{start})=1$ — the whole method
- a blocked cell is $N=0$, not a special case — the sweep does not change shape
- right/up on a clear grid rebuilds Pascal's triangle, so the answer is $\binom{m+n}{m}$
- right/up/diagonal gives the Delannoy numbers, $1,3,13,63,321,\dots$ along the main diagonal

## Why it works
Every path into a cell arrives by exactly one final step, so the paths reaching that cell are partitioned by which neighbor they came from. Adding the neighbors' counts therefore counts each path once. That is the same argument as [[recursive-counting|classifying by the last step]], drawn on the grid rather than written as a table, which is why no separate justification is needed: the grid is the recursion.

A removed square needs no new idea. Nothing can stand there, so it holds $0$, and every later sum that would have drawn on it draws on nothing instead.

## How to use it
Write $1$ at the start. Sweep in an order that fills a cell only after everything stepping into it is already filled — for right/up steps, the bottom row left to right, then the next row up, and so on. Each cell gets the sum of its left and lower neighbors, plus the lower-left diagonal if diagonal steps are allowed. Read the answer off the destination.

Compare with the closed form before choosing. On a clear grid $\binom{m+n}{m}$ is instant and the sweep is a waste. With one forbidden point, subtracting the paths through it is still easy: paths to it times paths from it. From two obstacles on, that subtraction becomes [[pie|inclusion-exclusion]] over the ways a path can meet several of them, and the bookkeeping is where the mistakes live. The sweep costs the same no matter how many squares are gone.

## On contests
The standard MATHCOUNTS and AMC phrasing is a street map: shortest routes from one corner to another with a closed intersection or a missing block. Filling the grid answers those in one pass, and it is the only practical method once the obstacles interact. Keep [[grid-paths|the binomial count]] for the clear-grid case and reach for the sweep the moment a square is missing.`,

"recursive-counting": String.raw`
## Key forms
- $a_n=\alt{\sum(\text{ways to finish})\times a_{\text{smaller}}}{c_1\,a_{n-1}+c_2\,a_{n-2}+\cdots}$ — classify by the last step or the last block
- one sequence per state, updated together — the move when several constraints interact
- disjoint, exhaustive cases and hand-checked base cases — the two places these arguments go wrong

## Why it works
Every valid arrangement of size $n$ ends in some way, and removing its ending leaves a valid smaller arrangement, so the count splits into copies of smaller counts.

Take tilings of a $1 \times n$ strip by $1 \times 1$ squares and $1 \times 2$ dominoes. The last tile is either a square or a domino, never both, so these two cases split the tilings with no overlap. Removing a final square leaves a tiling of length $n - 1$, and every tiling of length $n - 1$ extends by a square in exactly one way; removing a final domino leaves a tiling of length $n - 2$, likewise. So $a_n = a_{n-1} + a_{n-2}$.

{{figure:last-tile}}

Two things make the argument valid, and they are the two things to check. The cases must be disjoint and exhaustive, which classifying by the ending guarantees, since every arrangement has exactly one ending. And removing the ending must give back every smaller arrangement exactly once, which fails if the ending interacts with what comes before it.

When it does, as when a string's last digit restricts the digit before it, split the count into states, such as strings ending in $0$ and strings ending in $1$, and write one recurrence for each.

## How to use it
Ask: what can the ending look like? Strings with no $11$: end in $0$ (anything before) or $01$ (anything before that), so $a_n = a_{n-1} + a_{n-2}$. Tilings with dominoes: last tile vertical or two horizontals.

When one sequence isn't enough (say, the constraint depends on the last character), keep one sequence per state, such as $z_n$ for valid strings ending in $0$ and $o_n$ for those ending in $1$, and update the vector each step. Compute a small table by hand; contest sizes rarely exceed $n = 20$.

## On contests
The AIME workhorse for strings, seatings, and paths with adjacency constraints. AMC versions are usually two-term recurrences in disguise (often Fibonacci); the AIME versions need 2–4 states. The reflex to build: "constraint on neighbors" $\Rightarrow$ recursion on the last block, computed as a table.

Two recurrences are worth knowing on sight, and they are the same one. Tilings of a $1\times n$ strip by $1\times1$ and $1\times2$ tiles satisfy $a_n=a_{n-1}+a_{n-2}$, classifying on whether the last tile is short or long, so the counts are Fibonacci.

Binary strings with no two consecutive $1$s obey the same recurrence, classifying on the last digit: a string ending in $0$ can follow anything of length $n-1$, and one ending in $1$ forces a $0$ before it.

Changing the tile set changes only the shape of the recurrence, so $1\times3$ tiles give $a_n=a_{n-1}+a_{n-3}$.
`

});

Object.assign(window.MATH_DETAILS, {

"constructive-counting": String.raw`
## Key forms
- $n(n-1)\cdots(n-k+1)$ — an ordered selection built one slot at a time from a shrinking menu
- $\binom nk=\frac{n(n-1)\cdots(n-k+1)}{k!}$ — the same build, divided by the orders producing one unordered object
- fill the most restricted slot first — the last digit of an even number, or the picky person's seat
- $9\cdot10^{n-1}$ — the count of $n$-digit numbers, the leading digit avoiding zero, and $(d-1)d^{\,n-1}$ when only $d$ digits are allowed, as in "no digit $7$"
- $\binom 9n$ — numbers with strictly increasing digits, since choosing the digit set fixes the order

## Why it works
If a sequence of decisions produces each object exactly once, the number of objects is the product of the numbers of choices at the steps.

Picture the decisions as a tree. The first decision branches $c_1$ ways, each of those branches splits $c_2$ ways at the second decision, and so on; the finished objects are the leaves. A tree in which every branch point at level $i$ has $c_i$ branches has $$c_1c_2\cdots c_k$$ leaves. In the figure, choosing a president and then a vice president from three people gives $3 \cdot 2 = 6$ outcomes.

{{figure:decision-tree}}

The figure also shows the one condition that matters. The second step always has $2$ options, but which two depends on the first pick. That is allowed: the number of choices must be the same on every branch, while the choices themselves may change freely. The count for a 3-letter code with no repeated letter is $26 \cdot 25 \cdot 24$ for the same reason.

The principle breaks in two ways, and each has a standard fix. If a step's count depends on earlier picks, as when an even number's units digit being $0$ or not changes what its leading digit may be, reorder the steps so the restricted one comes first, or split into cases.

If each object is built more than once, as when an unordered group is built in order, divide by the number of builds. A group of $k$ can be built in $k!$ orders, which is exactly why $$\binom nk = \frac{n(n-1)\cdots(n-k+1)}{k!}.$$

## How to use it
Three habits keep a construction honest.

- Order the decisions from most constrained to least, so that the restricted slot's count stays the same whatever came before.
- For identical objects or unordered selections, construct the ordered version and divide: by $k!$ for unordered, $n$ for rotations, $2$ for reflections.
- For "at least one" constraints, construction usually loses to [[complementary-counting|complementary counting]].

The reflex check before multiplying is "does this step's count ever depend on what I picked earlier?"

For counting integers by a digit rule, the slots are the digit positions. At a fixed length, multiply the choices per slot with the leading digit avoiding $0$.

Up to a bound $N$, sweep the position where the number first drops below $N$: earlier digits match $N$, that digit is strictly smaller, and the rest are free, then sum over positions. This is the digit-DP idea, and it scales to AIME-sized bounds where listing cannot.

Treat "digit sum $=k$" with [[stars-and-bars|stars and bars]] across the slots, and remember that complementary counting, total minus the ones that do contain a $7$, is often shorter than the direct build.

## On contests
The most-tagged counting card after [[casework-method|casework]], with 73 problems here, and one of the more self-sufficient: 14 need nothing else. Casework is its partner in 27, because the usual shape is a count that multiplies cleanly inside each case.

Digit counts, seatings, codes and license plates are the standard setups at MATHCOUNTS and AMC level, and "how many integers below $N$ have property P" appears at every level.

The classic trap is the interaction between a leading digit and a last digit, as in the even-distinct-digits example, where whether the units digit is $0$ changes the count for the thousands digit; that is why the discipline is most restricted first, then cases if needed.
`,

"indicator-variables": String.raw`
## Key forms
- $X=\alt{\sum_iX_i}{X_1+\cdots+X_n}$ with $E[X]=\alt{\sum_iP(\text{occurrence }i)}{P(\text{occurrence }1)+\cdots+P(\text{occurrence }n)}$ — the whole method in one line
- one indicator per pair, per position or per adjacency — choosing the atomic occurrence is the only real decision

## Why it works
Expectation is linear, $E[X + Y] = E[X] + E[Y]$, whether or not $X$ and $Y$ are independent, because an expected value is a weighted sum over outcomes and sums can be reordered freely.

An indicator $X_i$, equal to $1$ if event $i$ happens and $0$ otherwise, has expected value $1 \cdot P(\text{event } i) + 0 = P(\text{event } i)$. So any count $X = X_1 + \cdots + X_n$ has $$E[X] = \sum_i P(\text{event } i),$$ each potential occurrence contributing its own probability, overlaps and all.

## How to use it
Identify the atomic occurrences being counted: fixed points, adjacent pairs, matched people, monochromatic triangles. Write one indicator for each, find one probability, since symmetry usually makes them all equal, and multiply by how many there are. The [[expected-fixed-points|expected number of fixed points]] of a random permutation is $$n \cdot \frac1n = 1$$ for every $n$, even though the events are far from independent.

Never condition and never split into cases; avoiding that is the point of the method. An average over all configurations is an [[expected-value|expected value]] in disguise, so translate it and use indicators.

## On contests
Three problems here, two AIME and one AMC 12, one solved by it alone. The shapes are an expected number of chosen consecutive pairs, an expected score in a guessing game played optimally, and an expected number of regions formed by random chords, where one indicator per pair of chords counts the crossings, as on [[plane-regions|plane regions]].
`,

"invariants-coloring": String.raw`
## Key forms
- parity of a sum or of a count — by far the most common invariant
- $\#\text{dark} - \#\text{light}$ — a checkerboard coloring builds one, since a domino always covers one square of each color
- a sum or product $\bmod n$ — the invariant of choice when moves add or multiply by fixed amounts
- $(i + j) \bmod 3$ — the coloring for $1 \times 3$ tiles, which then cover one square of each color in either direction
- $I(\text{after}) \lt I(\text{before})$ — a monovariant, which proves that a process terminates rather than that a state is unreachable

## Why it works
If every move leaves a quantity unchanged, it has the same value after any number of moves, so a state with a different value can never be reached, however the moves are chosen.

The standard example is a chessboard with two opposite corners removed, to be tiled by dominoes. Color it as usual. The two removed corners have the same color, so $30$ squares of that color remain and $32$ of the other.

Each domino covers two neighboring squares, which always have different colors, so any set of dominoes covers equally many squares of each color. A tiling would have to cover $31$ and $31$, while the board has $30$ and $32$, so no tiling exists, and no amount of searching could find one.

{{figure:board}}

A coloring is an invariant in disguise: it gives each square a value, and checking what each piece covers turns a geometric question into arithmetic. A monovariant uses the same logic in one direction. A quantity that changes the same way with every move and cannot keep doing so forever, such as a positive integer that decreases at every step, forces the process to stop.

## How to use it
Hunt in this order: the parity of a natural quantity, such as a sum, a count of some symbol or the number of inversions, then sums mod $3$ or mod $4$, then colorings, starting with the checkerboard and moving to other patterns for longer pieces.

Match the coloring to the piece. For $1 \times 3$ tiles, color the square in row $i$ and column $j$ with $$(i + j) \bmod 3;$$ every tile, horizontal or vertical, then covers one square of each of the three colors, so a region whose three color counts differ cannot be tiled.

When stuck, compute a few small cases by hand and watch what does not change. For a question about whether a process ends, look for a monovariant: a whole-number quantity that every move strictly decreases.

## On contests
Eight problems here, five AIME and three AMC, two solved by it alone; two others pair it with the [[extremal-principle|extremal principle]], which picks the object an invariant or monovariant is applied to. AMC versions hide it as "which of these positions can be reached", and olympiad versions ask you to invent the invariant. It is the standard finisher for any question that asks you to show something is impossible.
`

});

Object.assign(window.MATH_DETAILS, {

"bayes-theorem": String.raw`
## Why it works
Both $P(A)\,P(B \mid A)$ and $P(B)\,P(A \mid B)$ are the probability of the overlap $A \cap B$, so they are equal, and dividing by $P(B)$ gives the theorem. It is bookkeeping that swaps the direction of the conditioning.

The denominator is the law of total probability. If the causes $A_i$ are disjoint and cover every outcome, the evidence happens through exactly one of them, so $$P(B) = \sum_i P(B \mid A_i)\,P(A_i).$$ That denominator is the same whichever cause is being tested, so the chance of a cause is proportional to its prior times its likelihood, and comparing causes needs only the numerators.

## How to use it
Identify which direction you are given and which you want. Problems give $P(\text{evidence} \mid \text{cause})$, such as a test's accuracy, and ask for $P(\text{cause} \mid \text{evidence})$.

Counting whole people is more reliable than the formula. For a disease in $1\%$ of people and a test that is $90\%$ accurate both ways, take $100{,}000$ people: $1{,}000$ are sick and $900$ of them test positive, while $9{,}900$ of the $99{,}000$ healthy people also test positive. So $$P(\text{sick} \mid +) = \frac{900}{900 + 9{,}900} = \frac{1}{12}.$$

A rare condition drowns even an accurate test in false positives: when the base rate is far below the false-positive rate, most positives are false.

## On contests
Three problems here, all AIME, none solved by it alone, and each pairs it with [[conditional-probability|conditional probability]]. The shapes are a coin or die that might be fair or biased, judged after a few outcomes; a population split into groups with different rates, where it helps to count $100$ people; and a lottery, the chance of the top prize given some prize.`,

"generating-function-method": String.raw`
## Key forms
- $\frac{1}{1-x}=\alt{\sum_{n\ge0}x^n}{1+x+x^2+\cdots}$ — an unlimited supply of one item
- $1+x+\cdots+x^m$ — an item usable at most $m$ times; $(1+x)$ for at most once, and $(1+x)^n$ for take-or-leave over $n$ items
- $\frac{1}{(1-x)^k}=\alt{\sum_n\binom{n+k-1}{k-1}x^n}{1+kx+\binom{k+1}{k-1}x^2+\cdots}$ — [[stars-and-bars|stars and bars]], read off as a coefficient
- $\frac{x(1-x^6)}{1-x}=x+x^2+\cdots+x^6$ — one standard die
- $[x^N]\alt{\prod_i f_i(x)}{f_1(x)f_2(x)\cdots f_m(x)}$ — multiply the factors and read the coefficient; the product handles every interaction

## Why it works
Multiplying two sums of powers of $x$ produces one term for every pair of choices, and the exponents add, so the coefficient of $x^N$ counts exactly the pairs of choices with total $N$.

For two dice, $(x + x^2 + \cdots + x^6)^2$ expands into $36$ terms $x^{i + j}$, one for each pair of rolls. Collecting like terms groups the rolls by their sum, so the coefficient of $x^5$ is the number of rolls summing to $5$, which is $4$. More factors work the same way: independent choices multiply, and the exponents do the adding.

{{figure:product}}

## How to use it
Model each choice as a factor whose exponents are its allowed contributions: a die is $x + \cdots + x^6$, unlimited coins of value $a$ are $$1 + x^a + x^{2a} + \cdots = \frac1{1 - x^a},$$ and a part between $0$ and $m$ is $1 + x + \cdots + x^m$. Multiply, then extract the coefficient of $x^N$ by expanding, by a known series such as $\frac1{(1 - x)^k}$, or by partial fractions when a closed form is wanted.

To total all the coefficients, set $x = 1$; for a weighted sum, differentiate first. To select the exponents in one residue class, average over roots of unity, which is the [[roots-of-unity-filter|roots-of-unity filter]]. For labeled structures, [[exponential-generating-functions|exponential generating functions]] put the count on $\frac{x^n}{n!}$ instead.

## On contests
Five problems here, four of them AIME, one solved by it alone; two finish with the [[roots-of-unity-filter|roots-of-unity filter]], as in counting subsets whose sum is divisible by some $k$. It trades cleverness for a reliable pipeline of model, multiply and extract, so reach for it when [[casework-method|casework]] on the count would explode.
`

});

Object.assign(window.MATH_DETAILS, {

"extremal-principle": String.raw`
## Key forms
- take $\max S$ or $\min S$ and contradict its extremeness — what usually falls is the assumption that the configuration exists at all
- the longest path or chain — its endpoint has no unused neighbors, so every neighbor already lies on it
- the closest pair of points — nothing is nearer, which rules out any construction that would produce a shorter distance
- a minimal counterexample — build a smaller one from it and the minimality is contradicted, which is infinite descent run over a finite set
- well-ordering: every non-empty set of positive integers has a least element — the guarantee that "smallest" exists at all
- an optimum over a constrained set — it sits at an extreme of the constraints, so test the boundary rather than the interior

## Why it works
A finite set, or any set of positive integers, has a largest and a smallest member, and naming one hands you a property no other member has: nothing is larger, or nothing is smaller. If you can show the extreme object could be pushed a little further, you contradict the very thing that defined it.

Take a longest path $v_1v_2\ldots v_k$ in a graph. If $v_1$ had a neighbor off the path, adding it at the front would give a longer path, which is impossible. So every neighbor of $v_1$ lies on the path, and the path has more vertices than $v_1$ has neighbors.

{{figure:longest-path}}

Nothing was constructed. The extreme object simply had nowhere left to go, and that forced the structure the problem asked about.

## How to use it
Pick the extreme that matches the structure.

- The longest path or chain traps its endpoints' neighbors.
- The closest pair of points leaves no room for anything nearer.
- The vertex of highest degree bounds what its neighbors can do.
- The smallest positive value of a quantity is what infinite descent attacks.
- A minimal counterexample is the default when the claim is that something cannot happen.

Then push on it: show the extreme object forces the configuration you want, or show it could be improved, which is a contradiction. Check first that the extreme exists, which is automatic for a finite set and for positive integers but needs an argument on an infinite set of real numbers.

The optimization reading is the one that turns up on the AMC and AIME. When a quantity is maximized or minimized over a constrained set, the optimum sits at an extreme of the constraints, so identify which boundary and evaluate it: to minimize a positive fraction, take the smallest allowed numerator and the largest allowed denominator. When the pushing is done one step at a time, each step shown not to hurt, that is [[smoothing-method|smoothing]] instead.

## On contests
Six problems here, four AIME and two AMC, one solved by it alone; two pair it with [[invariants-coloring|invariants]], the other standard tool for proving that something must or cannot happen. Below olympiad level it appears mostly in its optimization form, where naming the extreme configuration is the whole solution. When a problem resists direct construction, ask what the largest or smallest object must look like; when it asks for an optimum, ask which constraint is tight.
`

});

Object.assign(window.MATH_DETAILS, {

"sprague-grundy": String.raw`## Why it works
In [[sprague-grundy|Nim]] the XOR ("Nim-sum") of the pile sizes is a handle you control: if it's nonzero, some pile has a leading bit you can clear to zero the whole XOR (a move to a losing-for-opponent position); if it's zero, every move breaks it. Sprague–Grundy generalizes this by assigning each position a value $g = \operatorname{mex}$ of its options' values — the least nonnegative integer they miss. A position with $g = 0$ can only move to $g \ne 0$ and vice versa, exactly Nim's win/loss logic, and independent games combine because the XOR of Grundy values behaves like one Nim position.

## How to use it
For a single game type, tabulate $g(0), g(1), \dots$ via $g(n) = \operatorname{mex}\{g(\text{reachable})\}$ until the (usually periodic) pattern emerges; $g = 0$ marks the losing positions. When a game splits into independent parts — several piles, a board that separates — compute each part's Grundy value and XOR them: the whole is a loss iff the XOR is $0$, and the winning move is the one that zeroes it (treat each part as a Nim pile of size $g$).

## On contests
Multi-pile take-away and token games on AIME and olympiad. The single-pile version is the Losing Positions card; Sprague–Grundy is what you need once the game separates into independent components. Remember two facts: losing $\iff$ Nim-sum $0$, and games add by XOR of Grundy values.`,

"erdos-szekeres": String.raw`## Why it works
Tag each term $x_i$ with $(u_i, d_i)$: the lengths of the longest increasing and longest decreasing subsequences ending at $x_i$. If $i \lt  j$ and $x_i \lt  x_j$ then $u_j > u_i$; if $x_i > x_j$ then $d_j > d_i$ — so distinct terms always get distinct tags. With $mn + 1$ terms but only $mn$ tags satisfying $u \le m, d \le n$, pigeonhole forces some $u \ge m+1$ or $d \ge n+1$.

## How to use it
The proof is the technique worth carrying: attach to each term the pair (longest increasing run ending there, longest decreasing run ending there). Any two terms have different labels, because whichever comes first extends one of the other's runs.

If no run reached $m+1$ or $n+1$, every label would lie in an $m\times n$ grid of possibilities — only $mn$ of them for $mn+1$ terms, which pigeonhole forbids.

Recognize the trigger as any problem asking to guarantee a monotone subsequence, or to show a sequence cannot avoid one. The labeling idea generalises: pairing each element with two extremal statistics and counting the available pairs is a reusable pigeonhole setup.

## On contests
Olympiad combinatorics, typically as a lemma ("among these $N$ values, some $k$ form a monotone chain"), and a natural companion to the [[pigeonhole|Pigeonhole Principle]]. The bound $mn+1$ is sharp — a grid of decreasing blocks of decreasing runs achieves $mn$ with no long monotone subsequence.`,

"planar-graph-bound": String.raw`## Why it works
[[eulers-polyhedron-formula|Euler's formula]] $v - e + f = 2$ holds for any connected planar drawing. Every face is bounded by at least $3$ edges and every edge borders exactly $2$ faces, so $2e \ge 3f$, i.e. $f \le \frac{2e}{3}$; substituting into Euler gives $e \le 3v - 6$. If the graph is triangle-free (in particular bipartite), every face needs $\ge 4$ edges, so $2e \ge 4f$ and $e \le 2v - 4$.

## How to use it
Use the bound to prove non-planarity by counting: a graph with more edges than $3v-6$ allows cannot be drawn without crossings. This settles $K_5$ immediately, since $10\gt3\cdot5-6=9$.

For triangle-free graphs use the sharper form, because every face then needs at least four edges. That is what disposes of $K_{3,3}$, which is bipartite with $9\gt2\cdot6-4=8$.

The bound runs one way only — violating it disproves planarity, but satisfying it proves nothing. A useful corollary is that every planar graph has a vertex of degree at most $5$, which is the starting point for planar coloring arguments.

## On contests
AMC/AIME problems about maps, networks, and polyhedra, and olympiad graph theory. It is the corollary of Euler's Polyhedron Formula (filed under Geometry) — the same identity read as a planar graph rather than a solid; keep the two linked in your head.`,

"halls-marriage": String.raw`## Why it works
The condition $|N(S)| \ge |S|$ for every $S \subseteq X$ is clearly necessary — a group of applicants adjacent to fewer jobs than its size can't all be matched. Sufficiency is the theorem: if no matching saturates $X$, an augmenting-path argument extracts a specific deficient set $S$ with $|N(S)| \lt  |S|$. So the sole obstruction to a full matching is one bottleneck set.

## How to use it
To prove a matching exists, verify Hall's condition; to prove none exists, exhibit one deficient set — a group of applicants collectively connected to fewer jobs than there are applicants. That asymmetry is what makes the theorem practical, since disproof needs only a single example.

Checking all $2^{|X|}$ subsets is rarely necessary. Structural arguments usually suffice: in a $k$-regular bipartite graph, counting the edges leaving $S$ shows $|N(S)|\ge|S|$ at once, so a perfect matching always exists.

The standard dressings are assigning people to tasks, placing non-attacking rooks, and choosing distinct representatives from a family of sets — recognizing any of these as bipartite matching is the first step.

## On contests
Olympiad combinatorics: systems of distinct representatives, Latin-square and tiling completions, and "can these be paired / assigned?" existence problems. The whole task reduces to checking Hall's condition or naming the one set that fails it.`

});

Object.assign(window.MATH_DETAILS, {

"dilworths-theorem": String.raw`## Why it works
A chain and an antichain share at most one element, so you always need at least (largest antichain) chains to cover the poset — the easy direction. That this many suffice is the theorem, provable by induction or via [[konigs-theorem|Kőnig's theorem]] on an associated bipartite graph. Mirsky's dual swaps chains and antichains.

## How to use it
Recognize the setup as a partial order — divisibility, containment, or dominance in two coordinates — where you must either cover everything with few chains or find a large incomparable family.

The theorem converts between the two, which is what makes it useful: bounding one side is usually much easier than the other. To show few chains suffice, exhibit a small antichain bound; to show a large antichain exists, exhibit a covering.

Erdős–Szekeres falls out by ordering terms by both index and value, where chains are monotone subsequences and antichains are the opposite monotonicity — recognizing that specialisation is often the quickest route into a sequence problem.

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
- $Z_G=\frac{1}{|G|}\alt{\sum_g\prod_i x_i^{c_i(g)}}{\left(x_1^{c_1(g_1)}x_2^{c_2(g_1)}\cdots+x_1^{c_1(g_2)}x_2^{c_2(g_2)}\cdots+\cdots\right)}$ — the cycle index, recording how each symmetry splits the positions into cycles
- $x_i=k$ — substituting this recovers [[burnsides-lemma|Burnside's]] plain count of $k$-colorings
- $x_i=\alt{\sum_j y_j^{\,i}}{y_1^{\,i}+y_2^{\,i}+\cdots+y_m^{\,i}}$ — substituting this instead breaks the count down by how many of each color, which Burnside alone cannot do
- $Z_{C_n}=\frac1n\alt{\sum_{d\mid n}\varphi(d)\,x_d^{\,n/d}}{\left(x_1^{\,n}+\cdots+\varphi(d)\,x_d^{\,n/d}+\cdots+\varphi(n)\,x_n\right)}$ — the cycle index for necklaces

## Why it works
Burnside counts orbits by averaging fixed points; Pólya refines "fixed" into a generating function via each symmetry's cycle structure. A coloring is fixed by $g$ iff it is constant on every cycle of $g$, so weighting by colors gives $\prod_k(\sum \text{colors}^k)^{c_k(g)}$, and averaging over $G$ is the cycle index $Z_G$.

## How to use it
Compute the cycle index $Z_G = \frac{1}{|G|}\sum_g \prod_k t_k^{c_k(g)}$. Substitute $t_k = m$ for a plain count (that's Burnside), or $t_k = x^k + y^k + \cdots$ to get a generating function whose coefficients count colorings with a prescribed number of each color — e.g. bracelets with exactly three red beads.

## On contests
Needed only for "count colorings with a fixed color distribution, up to symmetry" — rare and olympiad-tier. For plain orbit counts, Burnside's lemma is enough.`,

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
Recognize the shape as an extremal question: how many edges can a graph have before a clique of a given size is unavoidable. The bound answers it and the Turán graph shows it cannot be improved.

Mantel's case is the one that appears at contest level — at most $\lfloor n^2/4\rfloor$ edges without a triangle, attained by the balanced complete bipartite graph. Proving that case directly is short: for any edge, its endpoints share no neighbor, so their degrees sum to at most $n$.

Use it in the contrapositive when a problem gives you many edges and asks for a clique — exceeding the bound guarantees one exists without having to construct it.

## On contests
Olympiad extremal graph theory, with Mantel occasionally surfacing on harder problems. Remember the extremal example (balanced complete multipartite), not just the number.`,

"graph-coloring": String.raw`## Why it works
Greedy coloring in any order uses $\le \Delta + 1$ colors: each vertex sees at most $\Delta$ colored neighbors, so a color is free. Two colors suffice exactly when the graph is bipartite, which is equivalent to having no odd cycle (a 2-coloring is a bipartition). Planar 4-colorability is the deep Four Color Theorem.

## How to use it
Bound from both sides. The greedy bound caps the chromatic number above, and any clique caps it below, so exhibiting a $k$-clique together with a $k$-coloring settles $\chi=k$ exactly.

The bipartite test is the one used most: two colors suffice precisely when there is no odd cycle, and producing a single odd cycle is usually the fastest way to prove three are needed.

The greedy bound is rarely tight — Brooks' theorem sharpens it to $\Delta$ for every connected graph except complete graphs and odd cycles, which is worth knowing when the bound looks one too large. Pair it with the clique bound $\chi(G)\ge\omega(G)$ from below: exhibiting a $k$-clique alongside a $k$-coloring settles $\chi=k$ exactly.

## On contests
Scheduling, map, and conflict problems on AMC/AIME, plus olympiad [[invariants-coloring|coloring arguments]]. The everyday facts are the greedy $\Delta + 1$ bound and "bipartite ⟺ no odd cycle."`,

"probabilistic-method": String.raw`## Key forms
- $E[X]\ge c\Rightarrow$ some outcome has $X\ge c$ — an average is always attained, so a bound on the mean proves existence
- $\alt{\sum_iP(\text{bad}_i)}{P(\text{bad}_1)+\cdots+P(\text{bad}_m)}\lt 1\Rightarrow$ some outcome avoids every bad event — the union bound
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
[[matrix-multiplication|Matrix multiplication]] sums over intermediate states, so the $(i,j)$ entry of $M^n$ counts exactly the length-$n$ walks from state $i$ to state $j$ in the transition graph — and those walks are precisely the valid sequences. Sandwiching with boundary vectors, $a_n = \mathbf u^{\top} M^n \mathbf v$, restricts to the allowed start and end states. Since $M$ is a fixed $k\times k$ matrix, its characteristic polynomial $\det(xI-M)$ hands you a linear recurrence of order at most $k$ that the counts obey.

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
Use EGFs when the objects are labeled and ordinary [[generating-function-method|generating functions]] fail — that is, whenever the count involves choosing which labels go to which part, since that is exactly what the $\binom nk$ in the product supplies.

The dictionary is short: $e^x$ builds one structure per label, $\frac{1}{1-x}$ as an EGF builds linear orders, and exponentiating an EGF partitions the labels into an unordered collection of that structure. [[derangements|Derangements]], set partitions, and labeled trees all come out of applying that exponential rule.

Extract $a_n$ by reading the coefficient and multiplying back by $n!$ — forgetting that final factorial is the standard slip.

## On contests
Advanced olympiad / Putnam counting; EGFs crack derangements, surjections, and set-partition and permutation-structure counts that ordinary generating functions handle badly.`,

"moser-circle": String.raw`## Why it works
Apply [[eulers-formula|Euler's formula]] $V-E+F=2$ to the planar graph of points, chord crossings, and arcs: there are $\binom{n}{2}$ chords and $\binom{n}{4}$ interior crossings (one per choice of 4 points, assuming no three chords meet inside), and bookkeeping the edges and faces yields $R(n)=\binom{n}{4}+\binom{n}{2}+1$.

## How to use it
Treat the formula as a warning: five data points agreeing with $2^{n-1}$ prove nothing, and the sequence breaks at exactly the moment most people stop checking.

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

"squared-binomial-sum": String.raw`## Key forms
- $\alt{\sum_{k=0}^{n}\binom nk^2}{\binom n0^2+\binom n1^2+\cdots+\binom nn^2}=\binom{2n}{n}$ — the squares of one row of Pascal's triangle
- $\binom{2n}{n}/4^n$ — the chance two people flipping $n$ coins each tie

## Why it works
Count the ways to choose $n$ things from $2n$, having split the $2n$ into two halves of size $n$. Any such choice takes some number $k$ from the first half and the remaining $n-k$ from the second, so the choices with a given $k$ number $\binom nk\binom n{n-k}$. Since $\binom n{n-k}=\binom nk$, that is $\binom nk^2$, and summing over $k$ counts every choice exactly once. The total is $\binom{2n}{n}$.

It is [[vandermonde|Vandermonde's identity]] with $m=r=n$, but the special case behaves differently from the general one: the answer collapses to a single binomial coefficient instead of staying a convolution, which is what makes it usable in the middle of a computation.

## How to use it
Recognize it whenever squares of binomial coefficients are being summed, and replace the whole sum with one coefficient. The reverse direction matters just as much: a lone $\binom{2n}{n}$ can be opened up into $\sum_k\binom nk^2$ when you need a sum to compare against another sum.

The probability reading is the one worth carrying. Two people each flip $n$ fair coins; the chance they get the same number of heads is $\sum_k\binom nk^2/4^n$, which the identity turns into $\binom{2n}{n}/4^n$. Everything else follows by symmetry — the two of them are equally likely to be ahead, so each wins with probability $\tfrac12\left(1-\binom{2n}{n}/4^n\right)$.

## On contests
AIME uses it to close a sum that would otherwise need generating functions, and AMC uses the coin version. The signed companion, [[alternating-squared-binomials|the alternating sum of squared binomials]], comes from the same $(1-x)^m(1+x)^m$ expansion and is worth learning alongside it.`,

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

"casework-method": String.raw`
## Key forms
- $\#(\text{total})=\alt{\sum_i\#(\text{case}_i)}{\#(\text{case}_1)+\#(\text{case}_2)+\cdots}$ — valid only if the cases are disjoint and exhaustive, the two things to check first
- $P(A)=\alt{\sum_i P(A\mid B_i)P(B_i)}{P(A\mid B_1)P(B_1)+P(A\mid B_2)P(B_2)+\cdots}$ — the weighted version, the law of total probability

## Why it works
If every object lands in exactly one case, adding up the cases counts every object exactly once.

That is the addition principle, and both halves of "exactly one" matter. If an object can fall into two cases, the sum counts it twice; if it falls into none, the sum misses it. So the cases must be disjoint, meaning no overlaps, and exhaustive, meaning nothing left out; then $$|S| = |S_1| + |S_2| + \cdots + |S_m|.$$ Everything that makes casework reliable is a way of guaranteeing those two properties.

It works as often as it does because fixing one feature removes a whole layer of difficulty. Once you know the largest element, or the first digit, or which seat the special person takes, the remaining choices usually become independent, and independent choices simply multiply. A problem no single formula counts becomes several problems that each have one.

## How to use it
Split on the most constrained feature: the largest value, the leading digit, where the special person sits, or how many objects of some type appear. A good split is one where, inside each case, the remaining choices no longer interfere with each other.

Before adding, run the two checks by name.

- Can one object satisfy two cases? Then the cases overlap.
- Can an object satisfy none? Then there is a gap.

Splitting on a single value, such as "the largest element is $k$" for each $k$, makes both checks automatic, since every object has exactly one largest element.

Watch the number of cases. If it grows past five or six, a different tool is usually shorter: [[complementary-counting|complementary counting]] when the cases describe "at least one", a bijection, or a recursion when each case looks like a smaller copy of the problem. Cases that are mirror images of each other can be counted once and multiplied by the number of copies.

## On contests
The most-used technique in the whole library: it appears in 195 tagged problems, 152 of them AIME, and 17 need nothing else. Its usual partners show what it is for, [[constructive-counting|constructive counting]] in 27 problems and [[basic-probability|probability]] in 14, because splitting into cases is how a count that no single formula covers gets built.

MATHCOUNTS problems are often a clean two-case split, AMC problems reward finding the split that makes the cases symmetric, and AIME problems nest casework inside other techniques. The errors are almost always an overlap or a forgotten case.
`,

"reflection-principle": String.raw`## Key forms
- $\#\{\text{paths touching the barrier}\}=\#\{\text{paths to the reflected endpoint}\}$ — reflect after the first touch; the map is reversible
- $\binom{m+n}{n}-\binom{m+n}{n-1}$ — total minus bad, leaving the paths that stay strictly on one side
- reached versus crossed — the strict and weak versions differ by one step, and so do their answers

## Why it works
Take any path that touches the forbidden line and reflect everything after the first touch across that line: the result is a path to the mirror image of the endpoint. The map is reversible (paths to the mirrored endpoint must cross the line), so bad paths biject with unrestricted paths to a reflected target — countable by plain binomials.

## How to use it
Recipe: total paths minus $\binom{\cdot}{\cdot}$ to the reflected endpoint. Compute the reflection of the endpoint across the barrier line (for $y = x + c$ barriers, swap-and-shift coordinates). Iterated barriers (two walls) need alternating reflections with inclusion-exclusion. [[ballot-problem|The ballot problem]] and [[catalan-numbers|Catalan]] formula are the two canonical outputs.

## On contests
Vote-count and never-trailing problems, queue problems (people with 5- and 10-dollar bills), and lattice paths avoiding a diagonal. When a path constraint says "never above/below," reflect before attempting recursion — the closed form is one subtraction.`,

"uniform-overcount": String.raw`
## Key forms
- $\#(\text{objects}) = \frac{\#(\text{constructions})}{k}$ — legal exactly while $k$ does not depend on the object
- $\binom nr = \frac{n!}{(n-r)!} \div r!$ — arrangements divided by the $r!$ orders inside one selection
- $\frac{n!}{n} = (n-1)!$ — $n$ rotations of a row give the same circular arrangement
- $\frac{n!}{n_1!\,n_2!\cdots}$ — the orderings within each block of identical items divided out
- $\frac{N - f}{k} + f$ — the repair, when $f$ objects are built fewer than $k$ times

## Why it works
If every object is built exactly $k$ times, the constructions fall into groups of $k$, one group per object, so there are $k$ times as many constructions as objects.

Choosing $r$ people in order can be done in $\frac{n!}{(n - r)!}$ ways, and each unordered group of $r$ appears $r!$ times, once for each order of its members. Every group appears the same number of times, so dividing gives $\binom nr$. Seating $n$ people around a table works the same way: each circular arrangement appears as $n$ different rows, one starting from each seat, so there are $$\frac{n!}{n} = (n - 1)!.$$

The argument breaks exactly when some objects are built fewer times than others. Choosing two scoops from four flavors, allowing a double, gives $16$ ordered choices: each mixed pair is built twice, but each double only once, so dividing $16$ by $2$ would undercount the doubles.

{{figure:grid}}

The repair is to set the special objects aside. If $f$ objects are built once and the rest $k$ times, the count is $$\frac{N - f}{k} + f;$$ here $\frac{16 - 4}{2} + 4 = 10$.

## How to use it
Say out loud how many times a typical object gets built before dividing. If the answer depends on which object it is, do not divide yet.

Then check the symmetric cases by hand: pairs whose two halves are identical, colorings fixed by a rotation, and arrangements that read the same backwards are the usual culprits. Pull them out, divide the rest, and add them back once each.

Choosing two subsets of an $n$-element set whose union is the whole set is the standard example. In order there are $3^n$ choices, since each element goes in the first subset, the second or both, and only the pair with both subsets equal to the whole set is built once, so the unordered count is $$\frac{3^n - 1}{2} + 1.$$

When the symmetric cases are many rather than a few exceptions, stop patching and use [[burnsides-lemma|Burnside's lemma]], which averages over the symmetries and needs no repair step.

## On contests
Seven problems here, spread across AMC 10, AMC 12 and AIME, one solved by it alone. It is the step hidden inside [[multiset-permutations|arrangements with repeated objects]] and [[circular-permutations|circular arrangements]], and it finishes what [[constructive-counting|constructive counting]] starts, since that method builds the constructions this one divides. It is also the most often botched step in AMC counting, which is why a wrong answer is usually off by a little rather than by a lot.
`,





});
