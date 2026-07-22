// Extended detail-page write-ups for Algebra, keyed by formula id.
window.MATH_DETAILS = window.MATH_DETAILS || {};

Object.assign(window.MATH_DETAILS, {

"quadratic-formula": String.raw`## Why it works
Complete the square on $ax^2 + bx + c = 0$: divide by $a$, add $\left(\frac{b}{2a}\right)^2$ to both sides, take the root. The discriminant $\Delta = b^2 - 4ac$ is what sits under the radical, hence controls the nature of the roots.

## How to use it
Before grinding the formula, check for factoring and for Vieta shortcuts (sum/product may be all the problem needs). $\Delta$ answers qualitative questions alone: real/distinct/rational roots, tangency of a line to a parabola ($\Delta = 0$), and integer-solution feasibility ($\Delta$ must be a perfect square for rational roots of integer quadratics).

## On contests
"For how many integer $k$ does this quadratic have rational/integer roots" = perfect-square discriminant analysis, a recurring AMC/AIME pattern. Tangency-via-discriminant handles many circle/parabola contact problems without calculus.`,

"vietas-quadratic": String.raw`## Why it works
Factor $ax^2 + bx + c = a(x - r)(x - s)$ and expand: matching coefficients gives $r + s = -\frac{b}{a}$, $rs = \frac{c}{a}$.

## How to use it
Compute symmetric expressions of roots without finding the roots: $r^2 + s^2 = (r+s)^2 - 2rs$, $\frac{1}{r} + \frac{1}{s} = \frac{r+s}{rs}$, $|r - s| = \frac{\sqrt{\Delta}}{|a|}$. Also in reverse: numbers with known sum $s$ and product $p$ are roots of $x^2 - sx + p = 0$.

## On contests
Endless AMC use. The reverse direction cracks systems like $x + y = 7$, $xy = 12$ instantly, and "minimal polynomial" constructions on AIME.`,

"vietas-general": String.raw`## Why it works
Expand $a_n(x - r_1)\cdots(x - r_n)$: the coefficient of $x^{n-k}$ collects all products of $k$ roots with sign $(-1)^k$. That is exactly the elementary symmetric polynomial $e_k$.

## How to use it
Any symmetric function of the roots is expressible in the $e_k$ — power sums via Newton's identities, $\sum r_i^2 = e_1^2 - 2e_2$ directly. Cubic workhorse: for $x^3 + px^2 + qx + r$, roots sum to $-p$, pair-sum to $q$, multiply to $-r$. Also design polynomials: to shift roots by $c$, substitute $x \to x - c$; to scale by $k$, substitute $x \to \frac{x}{k}$; to invert, reverse coefficients.

## On contests
AIME's favorite polynomial tool. The root-transformation trick (build the polynomial whose roots are $r_i^2$ or $\frac{1}{r_i}$ or $r_i + 1$) converts scary questions into coefficient bookkeeping.`,

"factor-remainder-theorem": String.raw`## Why it works
Divide $P(x)$ by $(x - a)$: the remainder has degree 0, i.e. a constant; evaluating both sides at $x = a$ shows that constant is $P(a)$.

## How to use it
Remainder mod a quadratic $(x-a)(x-b)$ is linear: interpolate the line through $(a, P(a))$ and $(b, P(b))$. Mod $(x - a)^2$: use $P(a) + P'(a)(x - a)$ if you know derivatives, or match coefficients. Divisibility questions about polynomials nearly always reduce to evaluations at roots — including complex ones ($x^2 + 1 \mid P(x)$ iff $P(i) = 0$).

## On contests
"Find the remainder when $x^{100}$ is divided by $x^2 - 3x + 2$" — evaluate at the roots $1, 2$, interpolate. A top-frequency AIME/AMC 12 pattern, especially with roots of unity as the evaluation points.`,

"rational-root-theorem": String.raw`## Why it works
Plug $\frac{p}{q}$ (lowest terms) into the polynomial and clear denominators: every term but one is divisible by $p$ (forcing $p \mid a_0$), and every term but one by $q$ (forcing $q \mid a_n$).

## How to use it
Generates the finite candidate list for rational roots; test candidates with synthetic division (which simultaneously deflates the polynomial when a root is found). Monic integer polynomials have a sharper corollary: any rational root is an integer dividing the constant term.

## On contests
The standard opener for factoring cubics/quartics on AMC 12 and AIME. The monic corollary also proves irrationality results ("$\sqrt2$ is irrational" = rational root theorem on $x^2 - 2$).`,

"coefficient-extraction": String.raw`## Why it works
$P(1)$ substitutes 1 for every power of $x$, leaving the bare coefficient sum; $P(-1)$ alternates signs by parity of the exponent. Averaging keeps even-degree terms and cancels odd ones (and vice versa). This is the 2nd roots of unity filter — the general $n$-th version uses all $n$-th roots of unity.

## How to use it
Works on any polynomial you can evaluate but not expand: products like $(1 + 2x)^{10}(1 - x)^4$, compositions, generating functions. The constant term is $P(0)$; "sum of coefficients of even powers of $x$ in a two-variable polynomial" fixes the other variable and filters.

## On contests
"The sum of the coefficients of..." is a literal AMC catchphrase — answer $P(1)$, done. AIME layers it: find $P(1)$ of an implicitly defined polynomial, or combine $P(1), P(-1), P(0)$ to isolate coefficient classes.`,

"int-poly-divisibility": String.raw`## Why it works
$P(a) - P(b) = \sum c_k(a^k - b^k)$ and each $a^k - b^k$ has the factor $a - b$. No cleverness — just the $a^n - b^n$ factorization applied termwise.

## How to use it
Impossibility proofs: candidate values at integer points must satisfy all the pairwise divisibility conditions $(a - b) \mid P(a) - P(b)$. Also constrains fixed points and cycles: if $P(P(x)) = x$ for integers, then $a - b \mid P(a) - P(b) \mid P(P(a)) - P(P(b)) = a - b$ forces $|P(a) - P(b)| = |a - b|$ — the key to "polynomial 2-cycles" problems.

## On contests
AIME and olympiad regular: "an integer polynomial takes values 3 and 7 at some integers — can it take value 5 at another?" Check parity/divisibility of the differences. Fast, decisive, and easy to forget under pressure.`,

"newtons-sums": String.raw`## Why it works
Multiply $x^n = e_1 x^{n-1} - e_2 x^{n-2} + \cdots$ (the polynomial relation each root satisfies) by $r_i^{k-n}$ and sum over roots: each power sum recurses on earlier ones. The correction term $(-1)^{k-1}k\,e_k$ for $k \le n$ accounts for the constant coefficient.

## How to use it
Layout: $p_1 = e_1$; $p_2 = e_1p_1 - 2e_2$; $p_3 = e_1p_2 - e_2p_1 + 3e_3$; $p_4 = e_1p_3 - e_2p_2 + e_3p_1 - 4e_4$; beyond the degree, drop the correction term (pure recursion). Works even when roots are complex or unknown — only coefficients are needed.

## On contests
"Given $x + y + z$, $x^2+y^2+z^2$, $x^3+y^3+z^3$, find $x^4+y^4+z^4$" — pure Newton's sums, an AIME classic. Run it in reverse to recover $e_k$ from power sums and reconstruct the polynomial.`,

"conjugate-root-theorems": String.raw`## Why it works
Complex conjugation (or the map $\sqrt d \mapsto -\sqrt d$) is a ring homomorphism fixing the coefficients' field; applying it to $P(r) = 0$ yields $P(\bar r) = 0$. The polynomial cannot "see" which square root of $-1$ (or of $d$) it is using.

## How to use it
Root pairs come with their quadratic factors: $a \pm bi$ contributes $x^2 - 2ax + (a^2 + b^2)$; $a \pm b\sqrt d$ contributes $x^2 - 2ax + (a^2 - b^2 d)$. Minimal-degree constructions and "smallest polynomial with these roots" problems assemble these factors. Odd-degree real polynomials must have a real root (conjugates pair up the rest).

## On contests
AMC/AIME: "a cubic with rational coefficients has root $3 + \sqrt2$ and integer root..." — the conjugate is also a root, Vieta finishes. Watch the hypothesis: rational coefficients are required for the radical version.`,

"palindromic-polynomials": String.raw`## Why it works
Reversing coefficients corresponds to $x \mapsto \frac{1}{x}$ (times $x^n$), so a palindromic polynomial satisfies $P(x) = x^n P(\frac{1}{x})$ — roots come in reciprocal pairs. Dividing by $x^{n/2}$ symmetrizes, and everything becomes a polynomial in $y = x + \frac{1}{x}$ via $x^2 + \frac{1}{x^2} = y^2 - 2$, $x^3 + \frac{1}{x^3} = y^3 - 3y$.

## How to use it
Even degree $2m$: divide by $x^m$, substitute, halve the degree. Odd degree: $x = -1$ is always a root — factor it out first. Anti-palindromic (signs flip): $x = 1$ is a root. Applications beyond solving: products of roots in reciprocal pairs multiply to 1, simplifying Vieta computations.

## On contests
Quartic equations on AMC 12/AIME with symmetric coefficients are begging for this — it converts them to quadratics. The substitution powers $x + \frac{1}{x} = 2\cos\theta$ connections too (roots on the unit circle).`,

"vertex-form": String.raw`## Why it works
Complete the square: $y = a\left(x + \frac{b}{2a}\right)^2 + c - \frac{b^2}{4a}$. The squared term is minimized (or maximized, $a<0$) exactly at $x = -\frac{b}{2a}$, and symmetry about that vertical line is manifest.

## How to use it
Optimization without calculus. The symmetry fact is used more than the extremum: roots average to $-\frac{b}{2a}$; equal function values occur at points equidistant from the axis; "the parabola passes through $(p, k)$ and $(q, k)$" pins the axis at $x = \frac{p+q}{2}$.

## On contests
Max-area/max-product problems on AMC 10 are quadratic vertices in disguise. Symmetric-point pairs give the axis instantly, often collapsing a system of conditions to one equation.`,

"lagrange-interpolation": String.raw`## Why it works
Each basis term $\prod_{j\ne i}\frac{x - x_j}{x_i - x_j}$ is engineered to equal 1 at $x_i$ and 0 at every other node; the sum therefore hits all the data. Uniqueness: two degree-$\le n{-}1$ interpolants differ by a polynomial with $n$ roots, hence zero.

## How to use it
Rarely expand fully — evaluate at the one point you need. Finite differences are the discrete shortcut: for integer nodes, a degree-$n$ polynomial has constant $n$-th differences, so extend the difference table instead of building basis polynomials. Also useful conceptually: $n$ points determine a degree-$\le n{-}1$ polynomial, so "a cubic passes through these five points" is a contradiction machine.

## On contests
AIME: "$P$ has degree 3 with $P(k) = \frac{1}{k}$ for $k = 1..4$; find $P(5)$" — consider $xP(x) - 1$, which has known roots (the slicker cousin of interpolation). Both the direct formula and the auxiliary-polynomial trick belong in the toolkit.`,

"difference-of-squares": String.raw`## Why it works
Multiply out $(a-b)(a+b)$ — the cross terms cancel. Sum/difference of cubes: $(a \pm b)(a^2 \mp ab + b^2)$ expands the same way.

## How to use it
Beyond literal factoring: rationalizing ($\frac{1}{\sqrt a - \sqrt b}$), fast arithmetic ($51 \cdot 49 = 2500 - 1$), telescoping products ($\prod (1 + x^{2^k})$ collapses against $1 - x$), and Diophantine equations ($n = a^2 - b^2$ factorizations). Sum of cubes also gives the divisibility $a + b \mid a^3 + b^3$.

## On contests
$2^{32} - 1$ factored repeatedly, $\frac{10^4 + 324}{\dots}$-style Sophie Germain chains, and difference-of-squares Diophantine counts are all AMC/AIME staples. When a number is "one less than a power," factor first, think second.`,

"an-minus-bn": String.raw`## Why it works
The geometric-series identity: multiply $(a - b)$ by the sum $a^{n-1} + a^{n-2}b + \cdots + b^{n-1}$ and everything telescopes. For odd $n$, substitute $-b$ to get the $a^n + b^n$ version.

## How to use it
Divisibility engine: $a - b \mid a^n - b^n$ always; $a + b \mid a^n + b^n$ for odd $n$; and $a^m - 1 \mid a^n - 1$ iff $m \mid n$. Factoring numbers like $2^{15} - 1$: factor the exponent's divisor chain. Combined with LTE it computes exact prime powers.

## On contests
"Find the largest prime factor of $3^{12} - 1$"-type problems: factor via exponent divisors ($3^6-1$, $3^4-1$, $3^3-1$, cyclotomic pieces). Mersenne-flavored AIME number theory leans on $m \mid n \iff 2^m - 1 \mid 2^n - 1$.`,

"sophie-germain": String.raw`## Why it works
$a^4 + 4b^4 = (a^2 + 2b^2)^2 - (2ab)^2$ — add and subtract $4a^2b^2$ to complete the square, then difference of squares.

## How to use it
Trigger: fourth powers with coefficient 4 (or rewritable to it, e.g. $4^{n} = 4 \cdot 4^{n-1}$ makes $k^4 + 4^n$ eligible when $n$ is odd... check parity carefully). Each factor is $\ge 2$ for $a, b \ge 1$ except tiny cases — hence compositeness proofs.

## On contests
"Show $n^4 + 4$ is never prime for $n > 1$" and "compute $\frac{(10^4+324)(22^4+324)\cdots}{(4^4+324)(16^4+324)\cdots}$" (with $324 = 4 \cdot 3^4$, the factors telescope) — the latter is a famous AIME problem pattern.`,

"sfft": String.raw`## Why it works
$xy + ax + by$ is one constant short of factoring as $(x + b)(y + a)$; add $ab$ to both sides and it does.

## How to use it
Solve $xy + ax + by = c$ over integers: rewrite as $(x + b)(y + a) = c + ab$, list factor pairs of the right side (positive and negative), and read off solutions. Same trick handles $\frac{1}{x} + \frac{1}{y} = \frac{1}{n}$ (clear denominators first → $(x - n)(y - n) = n^2$) and lattice-point counts on hyperbolas.

## On contests
The unit-fraction equation $(x-n)(y-n) = n^2$ is an AIME classic (count divisors of $n^2$). Any two-variable equation that is linear in each variable separately is SFFT bait.`,

"cubes-minus-3abc": String.raw`## Why it works
Direct expansion, or the elegant route: $a^3+b^3+c^3 - 3abc = \det$ of a circulant matrix, factoring via roots of unity. The second factor is $\frac{1}{2}[(a-b)^2 + (b-c)^2 + (c-a)^2]$, manifestly nonnegative.

## How to use it
Two directions: (1) if $a + b + c = 0$ then $a^3 + b^3 + c^3 = 3abc$ — applies to differences like $(x-y), (y-z), (z-x)$ which always sum to zero; (2) the factorization itself for Diophantine or symmetric-system problems. Also proves AM-GM for three variables.

## On contests
"$x - y$, $y - z$, $z - x$" cube sums, and systems giving $a+b+c$ and $ab+bc+ca$ and $abc$ (compute cube sums via this + Newton). The zero-sum special case is the single most reused fragment.`,

"square-of-sum": String.raw`## Why it works
Direct expansion; the general pattern is the multinomial theorem.

## How to use it
The three-variable identity is the currency converter among $e_1 = a+b+c$, $e_2 = ab+bc+ca$, and $\sum a^2$: any two determine the third. $x + \frac{1}{x}$ powers: square and cube it to climb to $x^2 + \frac{1}{x^2}$ and $x^3 + \frac{1}{x^3}$ ($= y^3 - 3y$). These two moves open a large fraction of all symmetric algebra problems.

## On contests
"Given $x + \frac{1}{x} = 4$, find $x^5 + \frac{1}{x^5}$" (recursive climbing) and "given $\sum a$, $\sum a^2$, find $\sum ab$" are permanent AMC fixtures. Automatic recall required.`,

"binomial-theorem": String.raw`## Why it works
Expanding $(x+y)^n$ chooses $x$ or $y$ from each of the $n$ factors; the term $x^{n-k}y^k$ arises once per way of choosing which $k$ factors contribute $y$ — that is $\binom{n}{k}$.

## How to use it
Individual coefficient extraction (including with substitutions like $y \to -2y$), approximations $(1+\epsilon)^n \approx 1 + n\epsilon$, and parity/mod arguments (via Lucas or by expanding $(1+1)^p$). Two-term expansions mod small powers: $(10 - 1)^n$ mod 100 keeps only two terms.

## On contests
Last-digits problems ($9^{100}$ mod 1000 via $(10-1)^{100}$), coefficient hunts in products, and the generating-function bridge to counting. Also the proof engine for $\sum \binom{n}{k} = 2^n$ and friends by clever substitution.`,

"brahmagupta-fibonacci": String.raw`## Why it works
$|z|^2|w|^2 = |zw|^2$ for complex numbers $z = a+bi$, $w = c+di$ — expand both sides. The two sign choices come from $zw$ and $z\bar w$.

## How to use it
Closure tool: products of sums-of-two-squares are sums of two squares, with an explicit recipe for the representation. Run it forward to build representations (e.g. $65 = 5 \cdot 13 = (1^2+2^2)(2^2+3^2)$ gives both $1^2+8^2$ and $4^2+7^2$) or cite it for existence.

## On contests
AIME problems asking for numbers expressible as $a^2 + b^2$ in multiple ways lean on the two sign choices producing distinct representations. Also the algebraic heart of counting lattice points on circles.`,

"arithmetic-series": String.raw`## Why it works
Pair first with last, second with second-to-last — every pair sums to $a_1 + a_n$, and there are $\frac{n}{2}$ pairs (Gauss's trick). Equivalently, sum = (number of terms) × (average term).

## How to use it
The "count × average" view generalizes beyond arithmetic sequences to any symmetric list. Careful points: counting terms ($\frac{b-a}{d} + 1$, the fencepost formula) and handling partial sums ($S_n = \frac{n}{2}(2a_1 + (n-1)d)$ when the last term is unknown).

## On contests
Everywhere at every level. AMC twists: sums of specific residue classes, "sum of interior angles"-style disguises, and sequences of sums (the sums of consecutive blocks form another arithmetic sequence).`,

"geometric-series": String.raw`## Why it works
Multiply $S$ by $r$ and subtract: all middle terms cancel, leaving $S(1 - r) = a(1 - r^n)$. As $n \to \infty$ with $|r| < 1$, the $r^n$ term dies, giving $\frac{a}{1-r}$.

## How to use it
The shift-and-subtract derivation matters more than the formula — it also cracks arithmetico-geometric sums and repeating decimals. Infinite case: always confirm $|r| < 1$ before summing. Partial fractions of self-similar structures (fractals, infinitely nested figures) are geometric series in disguise.

## On contests
Infinite geometric setups (bouncing balls' total distance, shaded fractal areas, probabilities of "first success on turn $k$") pervade AMC and AIME. Two-series tricks: sum of even-index terms is $\frac{ar^{\,\cdot}}{1-r^2}$-flavored — split by parity when asked.`,

"power-sums": String.raw`## Why it works
$\sum k$ is Gauss pairing. $\sum k^2$ and $\sum k^3$ follow by telescoping $(k+1)^3 - k^3$ and $(k+1)^4 - k^4$, or induction. The cube-sum-equals-square-of-sum identity also has a beautiful counting proof (count ordered pairs of divisors... or the L-shaped gnomon picture).

## How to use it
Any polynomial summed over $1..n$ reduces to these three (plus $\sum 1 = n$). Sum of odds $= n^2$, sum of evens $= n(n+1)$. For sums over other ranges, subtract prefix sums.

## On contests
Direct evaluations, telescoping setups, and "find $n$ such that the sum is a perfect square" Diophantine questions. The $\left(\sum k\right)^2 = \sum k^3$ identity is periodically tested verbatim.`,

"telescoping": String.raw`## Why it works
If each term rewrites as $f(k) - f(k+1)$, the sum collapses to $f(\text{first}) - f(\text{last}+1)$: everything interior cancels.

## How to use it
Standard decompositions: $\frac{1}{k(k+1)} = \frac{1}{k} - \frac{1}{k+1}$; $\frac{1}{k(k+2)} = \frac{1}{2}\left(\frac{1}{k} - \frac{1}{k+2}\right)$ (two interleaved telescopes); $\frac{k}{(k+1)!} = \frac{1}{k!} - \frac{1}{(k+1)!}$; $\frac{1}{\sqrt{k} + \sqrt{k+1}} = \sqrt{k+1} - \sqrt{k}$. Products telescope too: $\prod \frac{k+1}{k}$, $\prod\left(1 - \frac{1}{k^2}\right) = \prod\frac{(k-1)(k+1)}{k^2}$.

## On contests
One of the top-three AIME sum techniques. Recognition cue: denominators that are products of terms in arithmetic progression, or any sum the calculator-free setting makes "impossible" — impossibility usually means telescoping.`,

"arithmetico-geometric": String.raw`## Why it works
Differentiate $\sum x^k = \frac{1}{1-x}$ termwise, or avoid calculus: $S - xS$ turns the linear coefficients into a plain geometric series.

## How to use it
$\sum_{k\ge1} k x^k = \frac{x}{(1-x)^2}$ and, one more derivative up, $\sum k^2 x^k = \frac{x(1+x)}{(1-x)^3}$. Finite versions come from the same shift trick. This is the standard closed form behind expected values of geometric-type random variables.

## On contests
Expected-value problems ("expected number of flips") and sums like $\frac{1}{2} + \frac{2}{4} + \frac{3}{8} + \cdots$ appear on AMC/AIME regularly; the shift-subtract derivation is fast and safe under pressure.`,

"binets-formula": String.raw`## Why it works
The Fibonacci recurrence has characteristic equation $x^2 = x + 1$ with roots $\varphi, \psi$; matching initial conditions gives the closed form. Since $|\psi| < 1$, $F_n$ is the nearest integer to $\frac{\varphi^n}{\sqrt5}$.

## How to use it
Growth estimates and digit counts come straight from $\varphi^n$. The companion identities do the contest work: $\sum_{i\le n} F_i = F_{n+2} - 1$, $\sum F_i^2 = F_nF_{n+1}$, Cassini $F_{n-1}F_{n+1} - F_n^2 = (-1)^n$, addition $F_{m+n} = F_mF_{n+1} + F_{m-1}F_n$, and $\gcd(F_m, F_n) = F_{\gcd(m,n)}$.

## On contests
Fibonacci sums/gcds appear on AIME with the identities as intended shortcuts. Also the model for solving any linear recurrence — see the characteristic equation entry.`,

"linear-recurrence": String.raw`## Why it works
Guess $a_n = r^n$: the recurrence forces the characteristic polynomial. Distinct roots give a basis of geometric solutions; a double root $r$ contributes $nr^n$ (the limit of two merging geometrics). Initial terms pin the coefficients.

## How to use it
Recipe: write the characteristic equation, find roots, form the general solution, solve the linear system from initial values. For non-homogeneous recurrences (constant or polynomial forcing), add a particular solution of matching shape. Periodicity check: complex roots on the unit circle (like $x^2 = x - 1$ → period 6).

## On contests
Counting recursions (tilings, strings) sometimes want the closed form; more often AIME asks for a specific term mod $m$ — then skip the closed form and iterate the recurrence mod $m$, hunting for the period (Pisano-style).`,

"am-gm": String.raw`## Why it works
Two variables: $(\sqrt a - \sqrt b)^2 \ge 0$ rearranges to it. General $n$: induction, smoothing, or Jensen on the concavity of $\log$. Equality demands all terms equal — the tightness condition is the useful part.

## How to use it
Optimization recipe: to minimize a sum with a constrained product (or vice versa), split terms so that AM-GM's equality condition is achievable — sometimes that means weighting, e.g. minimize $x + \frac{2}{x}$? Fine directly; minimize $2x + \frac{3}{x^2}$: split $2x = x + x$ so the three terms $x, x, \frac{3}{x^2}$ have constant product. Always verify equality is attainable within constraints.

## On contests
AMC optimization ("minimum value of...") and AIME bounding steps. Classic instant results: $x + \frac{1}{x} \ge 2$; $\frac{a}{b} + \frac{b}{a} \ge 2$; for fixed perimeter, the square maximizes area.`,

"mean-chain": String.raw`## Why it works
Each link is Cauchy-Schwarz or AM-GM in disguise (QM ≥ AM is Cauchy with the all-ones vector; GM ≥ HM is AM-GM applied to reciprocals). All equalities hold iff all values are equal.

## How to use it
Pick the pair of means matching the given data and the target: given a sum of squares, QM-AM converts to a sum bound; given a sum of reciprocals, HM enters. The chain also settles "which is bigger" comparison questions instantly.

## On contests
AMC comparison problems and AIME bounding steps. HM's appearance: average speed over equal distances is the harmonic mean — the classic "drive there at 30, back at 60" trap (answer 40, not 45).`,

"cauchy-schwarz": String.raw`## Why it works
The quadratic $\sum (a_i t + b_i)^2 \ge 0$ in $t$ has nonpositive discriminant — that discriminant is exactly Cauchy-Schwarz. Equality iff some $t$ makes every term zero, i.e. proportional sequences.

## How to use it
Engel form (Titu) is the contest workhorse: $\sum \frac{x_i^2}{y_i} \ge \frac{(\sum x_i)^2}{\sum y_i}$ — use it whenever squares sit over positive denominators. Choosing the two sequences is the art: to bound $(\sum a_i)^2$, write $a_i = \sqrt{w_i}\cdot\frac{a_i}{\sqrt{w_i}}$ with weights suiting the constraint.

## On contests
AIME/olympiad inequality steps and clever equality-case hunting ("minimize $\frac{1}{a} + \frac{4}{b}$ given $a + b = 1$": Titu gives $\ge \frac{(1+2)^2}{1} = 9$). Also proves QM-AM and the power-mean inequalities.`,

"rearrangement": String.raw`## Why it works
Swap-argument: if two pairs are matched "out of order," swapping them increases (or ties) the sum — repeat until sorted. No convexity or positivity needed.

## How to use it
Justifies "pair the largest with the largest" intuitions rigorously; implies Chebyshev's sum inequality (average of same-sorted products ≥ product of averages). For cyclic-sum inequalities where AM-GM feels forced, rearrangement is often the honest reason.

## On contests
Mostly olympiad, but AMC-level questions about maximizing $\sum a_ib_i$ over permutations are direct applications ("assign these digits to maximize...").`,

"trivial-inequality": String.raw`## Why it works
A real square is nonnegative; sums of squares are nonnegative. That is the whole content — and the ancestor of AM-GM, Cauchy-Schwarz, and QM-AM.

## How to use it
Completing the square is its applied form: any quadratic expression's extremum, two-variable minimizations ($x^2 + y^2 \ge 2xy$ and its weighted versions), and SOS ("sum of squares") decompositions for symmetric inequalities. When a minimum is asked and calculus is unavailable, complete squares first.

## On contests
"Find the minimum of $x^2 - 6x + y^2 + 4y + 20$" — complete both squares, read the answer. Also the fastest path to $a^2 + b^2 + c^2 \ge ab + bc + ca$ (sum the three squared differences).`,

"abs-triangle-inequality": String.raw`## Why it works
Square both sides for the real/complex case, or read it geometrically: the path through the origin detour cannot be shorter than the direct one. Equality iff the terms share direction (same sign / same argument).

## How to use it
Bounding tool: $|A + B|$ splits, $|A - B|$ lower-bounds via the reverse form. In complex-number problems it converts algebraic constraints into geometric ones (locus arguments, max/min of $|z - w|$ given $|z| = r$: the answer is $|w| \pm r$).

## On contests
"Max/min of $|z - 3 - 4i|$ given $|z| = 1$" → $5 \pm 1$; distance bounds in coordinate problems; and casework elimination in absolute-value equations.`,

"log-rules": String.raw`## Why it works
Each rule is an exponent law read through the logarithm (log of product ↔ sum of exponents, etc.). $\log_b b^x = x$ and $b^{\log_b x} = x$ say the functions invert each other.

## How to use it
Contest logs are mostly about converting to a common base and hunting structure: products of logs → chain rule; sums of logs → log of product (watch for telescoping products inside). Domain discipline: arguments positive, base $\ne 1$ — extraneous solutions in log equations are the #1 trap.

## On contests
AMC 12 log problems reward converting everything to one base and substituting $u = \log x$. AIME systems (logs of $xy$, $yz$, $zx$) become linear algebra in the log variables — add and halve.`,

"change-of-base": String.raw`## Why it works
Write $a = c^{\log_c a}$, $b = c^{\log_c b}$ and compare exponents in $b^{\log_b a} = a$. The reciprocal form is the special case $c = a$.

## How to use it
Normalize all logs to one base, then the chain $\log_a b \cdot \log_b c = \log_a c$ telescopes products like $\log_2 3 \cdot \log_3 4 \cdots \log_{63} 64$ instantly. The reciprocal identity turns $\log_a b + \log_b a \ge 2$ (AM-GM) and similar symmetric forms.

## On contests
Telescoping log products are an AMC classic (that example equals $\log_2 64 = 6$). AIME layers reciprocal identities into systems — substituting $t = \log_a b$ and using $\log_b a = \frac{1}{t}$ reduces them to rational equations.`,

"log-swap-identity": String.raw`## Why it works
Take $\log_b$ of both sides: both become $(\log_b c)(\log_b a)$. Symmetry in $a$ and $c$ does the rest.

## How to use it
Rewrites awkward exponents into forms that combine: $2^{\log_3 5}$ and $5^{\log_3 2}$ are the same number, so expressions mixing both collapse. Also useful for comparing tower sizes and simplifying products of the form $a^{\log b}\cdot b^{\log a}$.

## On contests
Occasional but decisive on AMC 12/AIME — problems are engineered so that the swap makes two terms combine or cancel. If an exponent contains a log with a *different* base than its own, try swapping.`,

"exponent-laws": String.raw`## Why it works
Definitions: repeated multiplication for integer exponents, extended to rationals via roots and to negatives via reciprocals so that the addition law $a^{m+n} = a^m a^n$ stays true.

## How to use it
Contest equations want a common base: $4^x = 8^{y}$ → $2^{2x} = 2^{3y}$ → $2x = 3y$. Tower disambiguation: $a^{b^c}$ means $a^{(b^c)}$. Comparisons like $2^{300}$ vs $3^{200}$: take 100th roots ($8$ vs $9$).

## On contests
Base-matching solves most AMC exponential equations; root-taking settles size comparisons; and careful tower parsing prevents the standard misread. Combine with mod arithmetic for last-digit questions.`,

"complex-basics": String.raw`## Why it works
$i^2 = -1$ by definition; the conjugate flips the imaginary part, and $z\bar z = a^2 + b^2$ expands directly. Modulus multiplicativity is the Brahmagupta-Fibonacci identity in disguise.

## How to use it
Division = multiply by conjugate over $|z|^2$. Powers of $i$ cycle with period 4 — reduce exponents mod 4. Key reflexes: $|z|^2 = z\bar z$ (turn modulus conditions into algebra), $z + \bar z = 2\operatorname{Re}(z)$, $z - \bar z = 2i\operatorname{Im}(z)$; real ⟺ $z = \bar z$.

## On contests
"$|z| = 1$" problems: substitute $\bar z = \frac{1}{z}$ — the single most useful complex-number move on AIME. Sums of $i$-powers and conjugate-symmetric expressions are AMC 12 regulars.`,

"eulers-formula": String.raw`## Why it works
Compare Taylor series of $e^{i\theta}$, $\cos\theta$, $\sin\theta$ — or accept it as the definition of complex exponentials and verify the multiplication law via angle addition formulas (which it then re-derives, circularly but consistently).

## How to use it
Polar form makes multiplication trivial: moduli multiply, angles add. Convert to polar for any power, root, or rotation task; convert back for addition. Rotation of point $z$ about $p$ by $\theta$: $p + e^{i\theta}(z - p)$ — geometry problems become one-line computations.

## On contests
The bridge between trig and algebra on AIME: products of cosines, sums like $\sum \cos k\theta$ (real part of geometric series), and polygon-vertex computations all route through $e^{i\theta}$.`,

"de-moivre": String.raw`## Why it works
Induction on the angle-addition formulas, or immediately from $\left(e^{i\theta}\right)^n = e^{in\theta}$.

## How to use it
Forward: compute $(\cos\theta + i\sin\theta)^n$ without expanding. Backward (the richer direction): expand by binomial theorem and separate real/imaginary parts to derive multiple-angle identities — $\cos 3\theta = 4\cos^3\theta - 3\cos\theta$, $\tan n\theta$ as a rational function of $\tan\theta$, and Chebyshev-polynomial facts.

## On contests
AIME trig identities that "come from nowhere" are De Moivre expansions; also the fastest evaluation of things like $(1 + i)^{20}$ (polar: $(\sqrt2)^{20}\operatorname{cis}(5\pi) = -2^{10}$).`,

"roots-of-unity": String.raw`## Why it works
$z^n = 1$ forces $|z| = 1$ and $n\theta \equiv 0 \pmod{2\pi}$: exactly the $n$ equally spaced angles $\frac{2\pi k}{n}$. Vieta on $x^n - 1$ gives sum 0 (no $x^{n-1}$ term) and the product $(-1)^{n+1}$.

## How to use it
Factor $x^n - 1 = \prod(x - \omega^k)$ and evaluate at strategic points ($x = 1$: distance products; $x = -1$: alternating versions; $x = 2$: $2^n - 1$ factorizations). Powers of a fixed $\omega$ recycle with period $n$ — exponents live mod $n$. Sums over all roots kill everything except multiples-of-$n$ powers: the filter principle.

## On contests
AIME uses roots of unity for: polynomial evaluations at all roots (multiply the values!), symmetric sums over polygon vertices, and periodicity arguments. The regular-$n$-gon-as-$n$th-roots picture converts polygon geometry to algebra.`,

"roots-of-unity-filter": String.raw`## Why it works
For any $j \not\equiv 0 \pmod n$, the sum $\sum_{k} \omega^{jk}$ over all $n$-th roots vanishes (geometric series); for $j \equiv 0$ it is $n$. So averaging $f(\omega^j x)$ over $j$ kills all coefficients except those with exponent $\equiv r \pmod n$ after appropriate twisting.

## How to use it
To sum every $n$-th binomial coefficient: average $(1 + \omega^j)^m$ over $j$, with a phase factor $\omega^{-jr}$ selecting residue class $r$. Compute $(1 + \omega^j)$ in polar form to evaluate. The $n = 2$ case is the even/odd coefficient split; $n = 3, 4$ cover nearly all contest instances.

## On contests
"How many subsets of $\{1..2000\}$ have size divisible by 4" and "sum of $\binom{n}{k}$ over $k \equiv 1 \pmod 3$" are canonical AIME applications. Real-part extraction via $2\cos$ finishes the arithmetic.`,

"roots-unity-distance-product": String.raw`## Why it works
$\frac{x^n - 1}{x - 1} = \prod_{k=1}^{n-1}(x - \omega^k)$; letting $x \to 1$ on both sides gives $n$ on the left. Taking absolute values converts to distances; the sine form uses $|1 - e^{i\phi}| = 2\sin\frac{\phi}{2}$.

## How to use it
Any "product of distances from one vertex of a regular polygon" or "product of chord lengths" question: scale to the unit circle, apply, rescale (distances scale by $R$, so the product gains $R^{n-1}$). The sine-product corollary evaluates otherwise-hard products like $\sin 20^\circ \sin 40^\circ \sin 60^\circ \sin 80^\circ$.

## On contests
A named AIME classic ("product of the lengths of all chords from one vertex...") and the backbone of several $\prod \sin$ evaluations. Remember both the clean statement and the $2\sin\frac{\phi}{2}$ conversion.`,

"pythagorean-identities": String.raw`## Why it works
$\sin^2 + \cos^2 = 1$ is the Pythagorean theorem on the unit circle; dividing by $\cos^2$ or $\sin^2$ manufactures the other two.

## How to use it
The conversion hub: given one trig value, produce the others (watch quadrant signs). $1 + \tan^2 = \sec^2$ handles expressions mixing $\tan$ and $\sec$; substituting to a single function turns trig equations into polynomials.

## On contests
"Given $\sin\theta + \cos\theta = k$, find $\sin\theta\cos\theta$" — square and use the identity ($= \frac{k^2-1}{2}$): a permanent AMC favorite. Same squaring trick powers $\sin^3 + \cos^3$ and friends via factoring.`,

"angle-addition": String.raw`## Why it works
Geometric proof via two stacked right triangles, or instantly from $e^{i(a+b)} = e^{ia}e^{ib}$ — expand and match real/imaginary parts.

## How to use it
Everything else in trig is downstream: double/half angle, product-to-sum, shifts like $\sin(\theta + 90^\circ) = \cos\theta$. Direct use: exact values at $15^\circ, 75^\circ, 105^\circ$; combining $a\sin\theta + b\cos\theta = \sqrt{a^2+b^2}\sin(\theta + \phi)$ (the harmonic addition trick — memorize this consequence).

## On contests
Harmonic addition answers "max of $3\sin x + 4\cos x$" (= 5) instantly — high-frequency AMC. Tangent addition computes angle sums in geometry ($\arctan$ towers) and telescopes arctangent series.`,

"double-angle": String.raw`## Why it works
Set $a = b$ in the addition formulas. The three $\cos 2\theta$ forms come from substituting $\sin^2 = 1 - \cos^2$ or vice versa.

## How to use it
Choose the $\cos 2\theta$ form that eliminates what you don't want: $2\cos^2 - 1$ keeps cosines, $1 - 2\sin^2$ keeps sines. Power reduction (reading the forms backwards) linearizes $\sin^2, \cos^2$ — the standard first step on squared-trig sums. $\sin 2\theta = 2\sin\theta\cos\theta$ also runs backwards: products of sine and cosine become single sines.

## On contests
Halving/doubling cascades ($\cos\frac{\theta}{2}$ chains), the identity $\sin\theta\cos\theta = \frac{\sin 2\theta}{2}$ inside areas, and power-reduction in AIME sums. Fluency in all three $\cos 2\theta$ forms is assumed by problem writers.`,

"half-angle": String.raw`## Why it works
Solve the power-reduction forms of $\cos 2\theta$ for the half angle. The tangent versions come from quotienting and clever multiplication by conjugates.

## How to use it
Exact values at $22.5^\circ, 15^\circ, 7.5^\circ$ by repeated halving. The $\tan\frac{\theta}{2} = \frac{1-\cos\theta}{\sin\theta} = \frac{\sin\theta}{1+\cos\theta}$ forms are radical-free — prefer them in geometry (half-angle of a known triangle angle). In triangle problems: $\tan\frac{A}{2} = \frac{r}{s-a}$ connects to the incircle.

## On contests
AIME triangle-trig hybrids use $\tan\frac{A}{2} = \frac{r}{s-a}$ heavily. Nested radicals like $\sqrt{2 + \sqrt2}$ decode as $2\cos 22.5^\circ$ — see also the trig substitution method.`,

"product-sum": String.raw`## Why it works
Add/subtract pairs of angle-addition formulas: e.g. $\cos(a-b) - \cos(a+b) = 2\sin a\sin b$. The sum-to-product versions are the same equations with substituted variables $a = \frac{x+y}{2}$, $b = \frac{x-y}{2}$.

## How to use it
Products → sums to telescope or integrate mentally; sums → products to factor equations ($\sin x + \sin 3x = 0$ becomes $2\sin 2x\cos x = 0$: solvable by factors). Multiplying a trig sum by a strategic $2\sin(\frac{d}{2})$ telescopes arithmetic-progression sums — the derivation of the AP-sum formula.

## On contests
AIME telescoping sums ($\sum \sin k^\circ$, $\sum \frac{1}{\cos k^\circ \cos(k+1)^\circ}$) and factoring trig equations. When an equation has sines/cosines of different multiples of $\theta$, sum-to-product is the standard reduction.`,

"special-trig-values": String.raw`## Why it works
$\sin 15^\circ$: angle subtraction $45^\circ - 30^\circ$. The $18^\circ/36^\circ$ family: the isosceles 36-72-72 triangle's self-similarity yields the golden ratio, or solve $\sin 2\theta = \cos 3\theta$ at $\theta = 18^\circ$ as a cubic.

## How to use it
Recognize the family resemblances: anything with $\sqrt6 \pm \sqrt2$ is the $15^\circ/75^\circ$ family; anything with $\sqrt5$ is the $18^\circ/36^\circ$ (pentagon) family. Derive on demand from the two generator methods rather than memorizing all eight values.

## On contests
Pentagon problems and $15^\circ$ configurations (square + equilateral triangle) reduce to these. AIME expects the derivation skill: "compute $\cos 36^\circ - \cos 72^\circ$" ($ = \frac{1}{2}$, via golden-ratio algebra).`,

"triple-angle": String.raw`## Why it works
Compose double and single angle additions, or take real/imaginary parts of $(\cos\theta + i\sin\theta)^3$ (De Moivre).

## How to use it
$\cos 3\theta = 4\cos^3\theta - 3\cos\theta$ turns cubics with three real roots into trig equations (the "casus irreducibilis" — cubics like $4x^3 - 3x = c$ are solved by $x = \cos\frac{\arccos c}{3}$). The $\sin 3\theta$ product identity $\sin\theta\sin(60^\circ - \theta)\sin(60^\circ + \theta) = \frac{\sin 3\theta}{4}$ collapses symmetric products.

## On contests
Cubic-to-trig conversion appears in hard AMC 12/AIME algebra ($x^3 - 3x = 1$-type). The product identity computes $\sin 20^\circ \sin 40^\circ \sin 80^\circ = \frac{\sqrt3}{8}$ in one line.`,

"trig-telescoping-product": String.raw`## Why it works
$\sin 2x = 2\sin x\cos x$ rearranges to $\cos x = \frac{\sin 2x}{2\sin x}$; multiply this over the doubling chain $\theta, 2\theta, \dots, 2^{n-1}\theta$ and the sine ratios telescope.

## How to use it
Trigger: a product of cosines whose angles double each time (or can be reordered to double). Multiply and divide by $\sin$ of the smallest angle. Works with complements too: $\cos 20^\circ\cos 40^\circ\cos 80^\circ$ uses $\sin 160^\circ = \sin 20^\circ$ for the clean $\frac{1}{8}$.

## On contests
A named AIME/AMC 12 pattern; also handles products like $\prod \cos\frac{\pi}{2^k}$ and, with the substitution $x = \cos\theta$, the iterated map $x \mapsto 2x^2 - 1$.`,

"arctan-telescoping": String.raw`## Why it works
The tangent subtraction formula $\tan(A - B) = \frac{\tan A - \tan B}{1 + \tan A\tan B}$, read as a statement about arctangents (with care about branch: valid when the relevant angles stay in $(-\frac{\pi}{2}, \frac{\pi}{2})$).

## How to use it
To telescope $\sum \arctan t_n$, hunt for $a_n, b_n$ with $t_n = \frac{a_n - b_n}{1 + a_nb_n}$ — usually $a_n = n+1$, $b_n = n$ (denominator $n^2 + n + 1$) or similar consecutive pairs. Also computes specific angle sums: $\arctan 1 + \arctan 2 + \arctan 3 = \pi$ (a classic, provable by two applications).

## On contests
AIME arctangent sums are built for this; the $\arctan\frac{1}{n^2+n+1}$ family is the canonical instance. In geometry, sums of angles in rectangular grids ($\arctan$ of slopes) fall to the same formula.`,

"sin-cos-ap-sum": String.raw`## Why it works
Multiply the sum by $2\sin\frac{d}{2}$: each product-to-sum expansion telescopes, leaving only boundary terms — which reassemble into the closed form ("Dirichlet kernel" argument). Alternatively: imaginary part of the geometric series $\sum e^{i(a + kd)}$.

## How to use it
Both routes are worth knowing: the $2\sin\frac{d}{2}$ multiplication is self-contained; the complex geometric series is faster if you're fluent. Special case to remember: $\sum_{k=1}^{n-1}\sin\frac{k\pi}{n} = \cot\frac{\pi}{2n}$; and sums of cosines of equally spaced angles around a full circle vanish.

## On contests
AIME sums like $\sum_{k=1}^{35}\sin 5k^\circ$ (a known AIME problem) are direct applications. The vanishing-over-full-circle fact also short-circuits many symmetric configurations.`,

"floor-basics": String.raw`## Why it works
Definitions: $\lfloor x\rfloor$ is the greatest integer $\le x$; the fractional part is what remains. The identities follow case-by-case on whether $x$ is an integer.

## How to use it
Standard manipulations: pull integers out of floors; split $x = n + f$ and case on $f$; count integers in $[a, b]$ as $\lfloor b\rfloor - \lceil a\rceil + 1$. Equations with floors: substitute $n = \lfloor x\rfloor$, solve the resulting inequality band $n \le x < n+1$ for consistency.

## On contests
Floor equations ("solve $\lfloor x\rfloor \cdot x = 70$") and counting problems permeate AMC/AIME. The band-substitution method turns them into finite casework; also recall $\lfloor \frac{n}{ab}\rfloor = \lfloor\frac{\lfloor n/a\rfloor}{b}\rfloor$ for nested divisions.`,

"hermite-identity": String.raw`## Why it works
As $x$ increases by $\frac{1}{n}$ steps, exactly one of the shifted floors $\lfloor x + \frac{k}{n}\rfloor$ ticks up at each step — the left side $\lfloor nx\rfloor$ ticks at the same moments. Both sides are step functions with identical jumps and equal value at $x = 0$.

## How to use it
Splits $\lfloor nx \rfloor$ into pieces when summing floors of arithmetic sequences, and collapses sums like $\sum_{k=0}^{n-1}\lfloor x + \frac{k}{n}\rfloor$ on sight. Companion identity for counting: $\lfloor x\rfloor + \lfloor -x\rfloor$ is $0$ or $-1$ — useful for symmetric summations.

## On contests
AIME floor-sum problems ($\sum_k \lfloor \frac{2^k \cdot a}{b}\rfloor$-type) and Putnam-lite identities. Recognizing that a messy floor sum is Hermite-in-reverse is usually the entire problem.`,

"denesting-radicals": String.raw`## Why it works
Guess $\sqrt{a \pm \sqrt b} = \sqrt x \pm \sqrt y$; squaring gives $x + y = a$ and $4xy = b$, a sum/product system — solvable in nice closed form exactly when $a^2 - b$ is a perfect square.

## How to use it
Practical recipe: seek $x, y$ with $x + y = a$, $xy = \frac{b}{4}$ (after writing the inner term as $2\sqrt{\cdot}$). If it doesn't denest, don't force it — work with the nested form or square strategically. Trig alternative: $\sqrt{2 + 2\cos\theta} = 2\cos\frac{\theta}{2}$.

## On contests
Distances in coordinate geometry ($\sqrt{7 + 4\sqrt3} = 2 + \sqrt3$) and simplifying answers to match choices. AMC answer extraction frequently hides one denesting step.`,

"infinite-nest": String.raw`## Why it works
If the infinite expression converges to $x$, self-similarity gives an equation in $x$ (the tail equals the whole). Convergence itself: monotone + bounded for standard cases — contest problems presume it.

## How to use it
Name it, equation it, solve it, then select the root consistent with obvious bounds (positivity, size). Continued fractions give quadratics (e.g. $1 + \cfrac{1}{1 + \cdots} = \varphi$); power towers $x^{x^{\cdots}} = a$ give $x^a = a$ (converges only for $e^{-e} \le x \le e^{1/e}$ — the boundary trap behind "$\sqrt2$ tower $= 2$, not 4").

## On contests
AMC/AIME nested radicals and continued fractions are routine; the root-selection step is where errors happen. Ramanujan-style nests ($\sqrt{1 + 2\sqrt{1 + 3\sqrt{\cdots}}} = 3$) occasionally cameo — pattern-match to $(n+1)^2 = 1 + n(n+2)$.`,

"rationalizing": String.raw`## Why it works
$(\sqrt a - \sqrt b)(\sqrt a + \sqrt b) = a - b$ clears the radicals; for cube roots use the sum/difference of cubes partner.

## How to use it
Beyond cleanup: conjugates create telescopes ($\frac{1}{\sqrt k + \sqrt{k+1}} = \sqrt{k+1} - \sqrt k$), extract integer parts of surd powers (pair $(3 + \sqrt5)^n + (3 - \sqrt5)^n$, an integer, with the second term tiny — so the first is *almost* an integer), and tame limits/estimates of radical differences.

## On contests
The conjugate-pair integrality trick is a beloved AIME device ("find the fractional part of $(\sqrt3 + \sqrt2)^6$"). The telescoping-sum version appears at every level.`,

"fx-pairing": String.raw`## Why it works
Symmetric sums double-count: $\sum_k f(\frac{k}{n})$ pairs term $k$ with term $n-k$. If $f(x) + f(1-x)$ is constant, every pair contributes the same amount, so the sum is (pairs) × (constant) — no individual evaluations needed.

## How to use it
Test the pairing before anything else: compute $f(x) + f(1-x)$ (or $f(x) + f(-x)$, $f(x)f(a-x)$ for product versions) and simplify. Exponential forms $\frac{c^x}{c^x + \sqrt c}$ are engineered for it. Handle the unpaired middle term ($x = \frac{1}{2}$) separately when the count is odd.

## On contests
The $\frac{9^x}{9^x+3}$ sum is a famous AIME problem; variants recur on AMC 12. Also underlies "sum of $f$ over roots/reciprocals" and logarithm sums where $\log x$ pairs with $\log\frac{1}{x}$.`,

"trig-substitution": String.raw`## Why it works
$\cos$ and $\sin$ parametrize exactly the values in $[-1, 1]$, and the Pythagorean identity converts $\sqrt{1 - x^2}$ into $\sin\theta$ — algebraic constraints become angle identities, where doubling/halving machinery is stronger.

## How to use it
Triggers: variables bounded in $[-1,1]$ or symmetric expressions like $\sqrt{1-x^2}$ (use $x = \cos\theta$); $\sqrt{1+x^2}$ (use $x = \tan\theta$); iterations $x \mapsto 2x^2 - 1$ (cosine double angle) or $x \mapsto \frac{2x}{1-x^2}$ (tangent double angle). Systems like $x\sqrt{1-y^2} + y\sqrt{1-x^2} = 1$ become $\sin(\alpha + \beta) = 1$.

## On contests
AIME systems with mutual radicals, iterated quadratic maps asked "after 2017 steps" (angle multiplies by $2^{2017}$, reduce mod $2\pi$), and nested $\sqrt{2 + \cdots}$ evaluations. When algebra loops, parametrize by angles.`

});

// Entries added from the 2023-2025 AMC/AIME sweep.
Object.assign(window.MATH_DETAILS, {

"functional-substitution": String.raw`## Why it works
An identity that holds for all reals holds in particular for cleverly chosen ones, and each structured choice erases a variable: $(0,0)$ leaves an equation in $f(0)$ alone; $(x, 0)$ ties $f(x)$ to $f(0)$; $(x, x)$ produces doubling relations; $(x, -x)$ tests parity. A handful of substitutions usually determines the function's key values and symmetries without ever "solving" the equation.

## How to use it
Run the standard sequence in order, recording each fact before choosing the next substitution (later choices should exploit earlier facts). Watch for familiar templates: $f(a+b) + f(a-b) = 2f(a)f(b)$ is the cosine equation (solutions $\cos kx$, $\cosh kx$); $f(x+y) = f(x)f(y)$ is exponential; $f(xy) = f(x) + f(y)$ is logarithmic. Recognizing the template tells you what behavior to expect and which values are achievable.

## On contests
2023 AMC 12B #22 is the recent flagship (the cosine equation; the substitutions above give $f(0) = 1$ and evenness, which settle the answer). AMC 10/12 run functional-equation problems every couple of years — the substitution sequence, not cleverness, is nearly always the intended path.`

});

Object.assign(window.MATH_DETAILS, {

"descartes-rule-signs": String.raw`## Why it works
Each positive root forces at least one sign change (a polynomial with all-positive coefficients has none), and a careful induction on factoring out $(x - r)$ shows roots consume sign changes in pairs-preserving fashion — hence "equal or less by an even number."

## How to use it
Quick structural triage: count sign changes of $P(x)$ for positive roots, of $P(-x)$ for negative roots, and remember complex roots come in pairs to fill the gap. Zero sign changes = zero positive roots (a certainty, not a bound). Combine with the intermediate value theorem at a few points to pin the exact count.

## On contests
AMC 12 uses it to eliminate cases in "how many real solutions" problems; on AIME it prunes root-hunting before heavier tools. It never locates a root — pair it with rational root candidates or IVT for locations.`,

"finite-differences": String.raw`## Why it works
The difference operator lowers degree by exactly one: $\Delta x^k = (x+1)^k - x^k$ has degree $k-1$ with leading coefficient $k$. Iterating $k$ times leaves the constant $k! a_k$. Conversely, constant $k$-th differences force a degree-$k$ polynomial (sum the table back up).

## How to use it
Given consecutive values, build the difference triangle; extend the constant row rightward and re-sum to evaluate the polynomial anywhere. The top-left diagonal of the table gives Newton's forward form $P(n) = \sum_j \Delta^j P(0)\binom{n}{j}$ — evaluation without ever finding coefficients. Also a fast degree detector for mystery sequences.

## On contests
"A cubic satisfies $P(1) = \dots, P(4) = \dots$; find $P(6)$" — extend the table, one minute. AIME loves the binomial-basis form for polynomials constrained at consecutive integers; it also proves the sum of a degree-$k$ polynomial over $1..n$ is a degree-$(k{+}1)$ polynomial.`,

"cauchy-functional-equations": String.raw`## Why it works
For additive $f$: build from $f(1)$ over integers, then rationals ($qf(p/q) = f(p)$); regularity (continuity/monotonicity/boundedness on an interval) forces the rational-linear behavior to extend to all reals. The other three templates reduce to the additive one via logarithms and exponentials (e.g. $g = \ln f$ turns multiplicative into additive).

## How to use it
Match the template, verify the regularity hypothesis the problem provides, write the general solution with one unknown constant, and pin the constant from a given value. Watch for domain subtleties: the multiplicative forms need positivity to take logs; check $f \equiv 0$ degenerate solutions separately.

## On contests
AMC/AIME functional equations are usually a Cauchy template in light disguise (shifted argument, extra constant). Recognize, normalize (e.g. set $g(x) = f(x) - f(0)$), classify, and evaluate — a three-minute routine once the four forms are memorized.`

});

Object.assign(window.MATH_DETAILS, {

"root-transformations": String.raw`## Why it works
If $y = g(r)$ for each root $r$ of $P$, then the values $r = g^{-1}(y)$ satisfy $P(g^{-1}(y)) = 0$ — substituting the inverse transformation produces a polynomial equation in $y$ whose roots are exactly the transformed values (clear denominators as needed).

## How to use it
Standard dictionary: shift → $P(x-k)$; scale → $P(x/k)$; negate → $P(-x)$ (flips odd coefficients); reciprocate → reverse the coefficient list; square → eliminate the sign via $P(\sqrt x)P(-\sqrt x)$. After transforming, read off the new Vieta sums — that's usually the goal ("find the sum of the reciprocals of the roots": reverse and read one ratio).

## On contests
AIME asks for symmetric functions of transformed roots constantly; transforming the polynomial first is faster and safer than expanding symmetric algebra. Sums like $\sum \frac{1}{1 - r_i}$: substitute $x = 1 - \frac{1}{y}$ or evaluate $\frac{P'(1)}{P(1)}$ — both come from this viewpoint.`,

"periodic-sequences": String.raw`## Why it works
The state (the last one or two terms) determines the entire future. If the rule is a nice rational map, states often return to their starting value — and the instant a full state repeats, everything after is an exact replay, forcing eventual periodicity.

## How to use it
Compute terms exactly (fractions, not decimals) until the initial state recurs; the number of steps is the period $p$. Then $a_n$ depends only on $n \bmod p$ — but align the offset carefully, especially with a pre-period. Famous families: $a_{n+1} = \frac{1}{1-a_n}$ (period 3), Lyness's $a_{n+1} = \frac{1+a_n}{a_{n-1}}$ (period 5), and most contest-designed rules with periods 3–12.

## On contests
"Find $t_{2020}$" (2020 AIME II #6, period 5-ish after simplification) and endless AMC versions. Contest recursions asking about term two thousand-something are begging you to find a cycle — compute six to ten terms before trying anything clever.`,

"triangle-angle-identities": String.raw`## Why it works
All spring from $C = 180^\circ - A - B$: expand $\tan(A+B) = \tan(180^\circ - C) = -\tan C$ and clear denominators for the tangent identity; the cosine and sine sums follow from sum-to-product plus half-angle conversions, which is where $r$ and $R$ sneak in ($\cos$ sum) and $s$ ($\sin$ sum).

## How to use it
Two directions: (1) given trig data about a triangle's angles, convert to $r$, $R$, $s$ — the geometry; (2) given an equation like $\tan A + \tan B + \tan C = \tan A\tan B\tan C$, recognize it as the *definition* of angles summing to $180^\circ$ (used both ways on contests). The cotangent identity $\sum \cot A \cot B = 1$ pairs with the Brocard angle formula.

## On contests
AIME trig problems hand you one of these sums and expect the $1 + \frac{r}{R}$ or $\frac{s}{R}$ translation; AMC 12 uses the tangent identity to detect or exploit supplementary structure. Memorize the two headline identities, derive the rest from sum-to-product on demand.`,

"piecewise-graph-counting": String.raw`## Why it works
Each absolute value is a fold: $|f(x)|$ reflects the negative parts of the graph upward, and outer operations shift or re-fold. The resulting piecewise-linear graph has finitely many corners, and the number of solutions of $f(x) = c$ changes only when the horizontal line passes a corner height — so corner heights partition the parameter line into constant-count intervals.

## How to use it
Build the graph in layers from the inside out, tracking only corner points (locations and heights) — slopes are always $\pm 1$ times the accumulated factor. Then answer "for how many $c$ are there exactly $k$ solutions" by listing corner heights and counting crossings in each band. For two-variable versions, the same layering describes intersecting families of V-shapes.

## On contests
2021 AIME I #8 (twelve solutions of a triple-nested absolute value) and 2024 AIME I #12 (sawtooth vs sawtooth intersections) are pure applications. AMC runs simpler versions ("how many solutions does $||x-1|-1| = c$ have"). Graph first, algebra never.`,

"work-rates": String.raw`## Why it works
Work per unit time is additive when workers don't interfere: in one hour the crew completes the sum of the individual fractions of the job. Times are reciprocals of rates, which is why they combine harmonically rather than additively.

## How to use it
Normalize the job to 1, convert every actor to a rate, add or subtract (drains are negative rates), invert at the end. For "A and B together, then B leaves..." problems, track completed fractions stage by stage. Watch for the classic trap: doubling the workers halves the time only when rates are equal and independent.

## On contests
MATHCOUNTS and early-mid AMC staple (pipes, painters, printing presses). The harder variants make rates unknown and give pairwise combined times — solve the small linear system in the rates, not the times.`,

"average-speed": String.raw`## Why it works
Speed is distance over time, so the average must weight by time spent, not by distance labels. Equal distances at different speeds mean unequal times — the slower leg dominates, pulling the average below the arithmetic mean (harmonic mean $\le$ arithmetic mean, with equality only for equal speeds).

## How to use it
Never average speeds directly. Set a concrete distance (pick a convenient number like the LCM), compute each leg's time, divide total by total. The $\frac{2v_1v_2}{v_1+v_2}$ shortcut applies only to equal distances; equal *times* do give the arithmetic mean.

## On contests
A permanent AMC answer-choice trap: 45 sits among the options whenever the answer is 40. Multi-leg versions (three speeds, mixed distance/time information) all fall to total-over-total discipline.`,

"relative-motion": String.raw`## Why it works
Velocities subtract vectorially: in the reference frame of one object, the other moves at the velocity difference, turning a two-body chase into a one-body gap-closing problem. Currents and walkways add a constant drift to the still-medium velocity.

## How to use it
Chases: time = initial gap ÷ (speed difference). Meetings: gap ÷ (speed sum). Round trips in a current: upstream and downstream speeds are $v \mp c$, and the round-trip average is below $v$ (harmonic effect). Crossing a river: aim upstream so the along-stream component cancels, or land downstream and use components; the crossing time depends only on the across-stream component.

## On contests
Trains passing, hands of a clock (relative speed $5.5^\circ$/min), escalator walkers, and the 2022 AIME I river crossing. Choosing the moving frame typically halves the algebra.`,

"weighted-average": String.raw`## Why it works
The total amount of "stuff" (pure acid, points, mass) is conserved: $w_1x_1 + w_2x_2$ of it spread over $w_1 + w_2$ units gives the mean. Solving that equation for $\frac{w_1}{w_2}$ produces the seesaw rule — weights inversely proportional to distances from the mean.

## How to use it
The seesaw (alligation) form answers mixing-ratio questions in one line without variables. For dilution and replacement problems ("remove a liter, add water, repeat"), track the pure substance multiplicatively: each replacement multiplies the concentration by a fixed fraction. Averages of averages need the weights — class-average traps are exactly missing-weight errors.

## On contests
MATHCOUNTS/AMC 10 mixtures, average-score puzzles, and the harder "swap equal volumes between two jars" problems (after one swap, the two foreign concentrations are always equal — a cute invariant worth knowing).`

});

Object.assign(window.MATH_DETAILS, {

"sos-identity": String.raw`## Why it works
Expand the right side: each $(x-y)^2$ contributes $x^2 + y^2 - 2xy$, and the halved total collects exactly $x^2+y^2+z^2 - xy-yz-zx$. Being a sum of real squares, it is nonnegative and vanishes only when all pairwise differences do.

## How to use it
Three standard deployments: (1) prove $\sum x^2 \ge \sum xy$ with equality analysis; (2) crack symmetric conditions — any equation reducible to $\sum(x-y)^2 = 0$ forces all variables equal; (3) factor analysis of $x^3+y^3+z^3-3xyz = (x+y+z)\cdot\frac{1}{2}\sum(x-y)^2$, which shows the second factor's sign is fixed.

## On contests
AMC/AIME symmetric systems constantly hide the "$= 0$ forces equal" step; inequality problems use it as the base case of SOS (sum-of-squares) arguments. Worth recognizing in both directions — expanded and factored.`,

"useful-factorizations": String.raw`## Why it works
$a^4 + a^2b^2 + b^4$: add and subtract $a^2b^2$ to reach $(a^2+b^2)^2 - (ab)^2$, then difference of squares. The cube identity expands directly, or via symmetry: the left side vanishes when $a = -b$ (etc.), so $(a+b)(b+c)(c+a)$ divides it, and degree/leading-coefficient comparison fixes the factor 3.

## How to use it
$x^4 + x^2 + 1$ (and $x^8 + x^4 + 1$, iterated) show up in telescoping products and "factor this large number" problems — e.g. $n^4 + n^2 + 1 = (n^2+n+1)(n^2-n+1)$ with the bonus that $n^2 - n + 1 = (n-1)^2 + (n-1) + 1$, chaining consecutive values into telescoping fractions. The identity $(a+b)(b+c)(c+a) = (a+b+c)(ab+bc+ca) - abc$ converts products of pairwise sums into elementary symmetric data (Vieta-ready).

## On contests
The telescoping product $\prod \frac{n^4 + n^2 + 1 \text{-type factors}}{\cdots}$ is a recurring AIME construction (same family as the Sophie Germain $324$ problem). The pairwise-sum identity resolves systems giving $a+b+c$, $ab+bc+ca$, $abc$ and asking for $(a+b)(b+c)(c+a)$ in one line.`,

"factorial-telescoping": String.raw`## Why it works
$k \cdot k! = (k+1)! - k!$ is just $(k+1)! = (k+1)\cdot k!$ rearranged; summing telescopes to $(n+1)! - 1!$. The fraction version rewrites $\frac{k}{(k+1)!} = \frac{(k+1) - 1}{(k+1)!} = \frac{1}{k!} - \frac{1}{(k+1)!}$.

## How to use it
Any sum with $k \cdot k!$, $\frac{k}{(k+1)!}$, or $\frac{k-1}{k!}$ shapes telescopes immediately. Related tools: $\frac{1}{k!} - \frac{1}{(k+1)!} = \frac{k}{(k+1)!}$ read backwards, and for alternating factorial sums, pairing consecutive terms. Also the reason $1\cdot1! + 2\cdot2! + \cdots$ base-factorial representations are unique (factorial number system).

## On contests
MATHCOUNTS through AIME: "compute $\sum k \cdot k!$ mod something" and factorial-base digit questions. Recognizing the telescope converts an intimidating factorial sum into two terms.`

});

Object.assign(window.MATH_DETAILS, {

"jensens-inequality": String.raw`## Why it works
Convexity means every chord lies above the graph. The average $\frac{x_1 + \cdots + x_n}{n}$ is a point inside the interval, and the average of the values $\frac{\sum f(x_i)}{n}$ is the corresponding point on the "chord polygon" above it — so the function value at the average sits below the average of the values. Induction from the two-point definition $f(\lambda x + (1-\lambda)y) \le \lambda f(x) + (1-\lambda) f(y)$ gives the full weighted statement.

## How to use it
Check convexity with the second derivative: $f'' \ge 0$ convex (inequality as stated), $f'' \le 0$ concave (flip it). The classical specializations are worth knowing cold: $\ln$ concave gives AM–GM; $x^2$ convex gives the QM–AM step; $\frac{1}{x}$ convex on $(0,\infty)$ gives AM–HM; $\sin$ concave on $(0,\pi)$ bounds angle sums. When the constraint fixes $x_1 + \cdots + x_n$, Jensen immediately locates the extremum at "all equal" — and if the extremum is instead at an endpoint, that's the signal the relevant function was concave (or convex) the other way.

## On contests
The fastest tool for "maximize a symmetric sum of function values with a fixed sum of inputs" — trig sums over triangle angles are the archetype. On AMC/AIME it usually appears disguised: recognizing that equality-at-the-mean structure lets you guess the extremal configuration (all variables equal) and verify. Full Jensen citations are an olympiad staple, often with weights equal to side lengths or masses.`,

"schurs-inequality": String.raw`## Why it works
By symmetry assume $x \ge y \ge z$. Group the three terms as $(x - y)\big(x^t(x - z) - y^t(y - z)\big) + z^t(x - z)(y - z)$: every factor in both products is nonnegative under the ordering, so the whole sum is. This WLOG-and-group argument is the entire proof — no expansion needed.

## How to use it
Deploy the $t = 1$ expansion $x^3 + y^3 + z^3 + 3xyz \ge \sum_{\text{cyc}} xy(x + y)$ when a symmetric degree-3 inequality has the "wrong direction" for AM–GM — the $+3xyz$ on the small side is Schur's signature, and no bunching argument produces it (Muirhead can never yield it, since $(1,1,1)$ is majorized by everything). Useful normalized form: with $x + y + z = s$, $q = \sum xy$, $r = xyz$, the $t = 1$ case reads $s^3 + 9r \ge 4sq$. The $t = 2$ case handles degree-4 versions.

## On contests
An olympiad tool: it settles many symmetric three-variable inequalities that resist AM–GM/Cauchy, and the $s, q, r$ form combines cleanly with $q^2 \ge 3sr$ and friends. Recognize its equality cases — $x = y = z$ *and* the degenerate $(k, k, 0)$ — as the tell that Schur (not Muirhead) is intended.`,

"muirheads-inequality": String.raw`## Why it works
Majorization means the exponent vector $(a)$ can be reached from $(b)$ by repeatedly moving two exponents apart ($(b_i, b_j) \to (b_i + \epsilon, b_j - \epsilon)$ with $b_i \ge b_j$). Each such move is a two-variable AM–GM-style smoothing step on the symmetric sum, so the more "spread out" exponent triple dominates. In fact every Muirhead inequality is a positive combination of weighted AM–GMs.

## How to use it
Sort both exponent triples in decreasing order, then check the partial sums: $a_1 \ge b_1$, $a_1 + a_2 \ge b_1 + b_2$, $a_1 + a_2 + a_3 = b_1 + b_2 + b_3$. If all hold, $\sum_{\text{sym}}$ of the $a$-monomial dominates. Two standing warnings: it applies only to *full symmetric sums* — cyclic sums are not covered, so convert first and watch the factor of $2$ — and both sides must be homogeneous of the same degree (normalize the constraint, e.g. impose $xyz = 1$, to homogenize).

## On contests
The rigorous stamp for "bunching" steps in olympiad solutions: $(3,0,0) \succ (2,1,0) \succ (1,1,1)$ handles most degree-3 comparisons in one line. Citing Muirhead by name is standard on olympiads; on anything below that level, writing out the two or three AM–GMs it encodes is safer and just as fast. Pairs constantly with Schur, which covers exactly the direction Muirhead cannot.`

});

Object.assign(window.MATH_DETAILS, {

"sp-substitution": String.raw`## Why it works
Every symmetric polynomial in $x$ and $y$ is a polynomial in the elementary symmetric functions $s = x + y$ and $p = xy$ (the two-variable fundamental theorem of symmetric polynomials). And Vieta runs backwards: knowing $s$ and $p$ means $x$ and $y$ are exactly the roots of $t^2 - st + p = 0$ — no information is lost.

## How to use it
Convert with the ladder $x^2 + y^2 = s^2 - 2p$, $x^3 + y^3 = s^3 - 3sp$, $x^4 + y^4 = (s^2 - 2p)^2 - 2p^2$, and $(x - y)^2 = s^2 - 4p$ (the discriminant — check it's nonnegative if $x, y$ must be real). Solve the resulting system in $s, p$, then factor $t^2 - st + p$. Expressions like $\frac{1}{x} + \frac{1}{y} = \frac{s}{p}$ and $x^2y + xy^2 = sp$ convert just as fast. For three variables, the same collapse uses $e_1, e_2, e_3$ and Newton's sums.

## On contests
The intended route for nearly every symmetric system on AMC/AIME — "given $x + y$ and $x^2 + y^2$, find $x^5 + y^5$" is a pure ladder climb. Also the standard trick for $x + \frac{1}{x} = k$ chains (there $p = 1$, so the ladder needs only $s$). Recognize the trigger: the system doesn't change when $x$ and $y$ swap.`

});

Object.assign(window.MATH_DETAILS, {

"completing-the-square": String.raw`## Why it works
$x^2 + bx$ is the start of the expansion of $\left(x + \frac{b}{2}\right)^2 = x^2 + bx + \frac{b^2}{4}$. Adding and subtracting $\frac{b^2}{4}$ turns the quadratic into a perfect square plus a leftover constant, isolating $x$ inside a single squared term.

## How to use it
For $ax^2 + bx + c$, factor the $a$ out of the first two terms first. The completed form $a\left(x + \frac{b}{2a}\right)^2 + \left(c - \frac{b^2}{4a}\right)$ reads off the vertex directly and, set to zero, *is* the derivation of the quadratic formula. In two variables, completing the square in $x$ and in $y$ converts $x^2 + y^2 + Dx + Ey + F = 0$ into $(x - h)^2 + (y - k)^2 = r^2$ — center and radius at a glance — and classifies the other conics.

## On contests
The go-to for min/max of a quadratic without calculus, for finding a circle's center and radius, and for any "$x^2 + y^2 + \dots$" locus. It also rescues sums of squares: recognizing $a^2 - 2a + \dots \ge 0$ after completing the square is a standard inequality move (see the trivial inequality).`,

"absolute-value-rules": String.raw`## Why it works
$|x|$ is the distance from $x$ to $0$, so $|x - c|$ is the distance from $x$ to $c$. "Within $a$" becomes a two-sided band $-a < x - c < a$; "farther than $a$" becomes two rays. And $\sqrt{x^2} = |x|$ (not $x$) because the principal square root is never negative.

## How to use it
Turn every absolute value into a distance or a case split. $|x - c| = d$ marks the two points $c \pm d$; $|x - c| < d$ is the open interval between them. For equations, $|A| = |B| \iff A = \pm B$ (two cases). For nested absolute values, either peel from the outside via cases or graph and count (see the graphing method). The identity $\sqrt{x^2} = |x|$ prevents the classic sign error when a radical meets a square.

## On contests
Constant on MATHCOUNTS and early AMC: distance interpretations, "sum of distances" setups, and piecewise equations. The frequent trap is forgetting a branch — $|x| > a$ has two rays, and $\sqrt{x^2}$ carries a sign — so name the cases explicitly.`,

"weierstrass-substitution": String.raw`## Why it works
Writing $t = \tan\frac{\theta}{2}$ and using the double-angle formulas expresses $\sin\theta = 2\sin\frac{\theta}{2}\cos\frac{\theta}{2}$ and $\cos\theta = \cos^2\frac{\theta}{2} - \sin^2\frac{\theta}{2}$ as rational functions of $t$ after dividing through by $\cos^2\frac{\theta}{2} = \frac{1}{1 + t^2}$. Every trig function of $\theta$ becomes rational in $t$.

## How to use it
Deploy it when a trig equation or expression mixes $\sin\theta$ and $\cos\theta$ in a way that resists identities: substitute, clear denominators, and solve the resulting polynomial in $t$, then untangle $\theta$ from $t = \tan\frac{\theta}{2}$. The same algebra underlies rational parametrizations of the unit circle and the $(1 - t^2, 2t, 1 + t^2)$ Pythagorean-triple family.

## On contests
A niche but decisive olympiad tool for trig equations and for proving rational-point facts about the circle; it's the bridge between "half-angle" identities and Pythagorean triples. Rarely the fastest route on AMC/AIME, where targeted identities usually win, but unbeatable when you genuinely need to rationalize.`,

"partial-fractions": String.raw`## Why it works
A proper rational function with a factored denominator is uniquely a sum of one term per factor. For distinct linear factors the two-term split $\frac{1}{(x+a)(x+b)} = \frac{1}{b-a}\left(\frac{1}{x+a} - \frac{1}{x+b}\right)$ is the whole story; the "$\frac{1}{b-a}$" is exactly what makes the numerators match.

## How to use it
The cover-up method finds each coefficient fast: to get the weight on $\frac{1}{x+a}$, delete that factor and evaluate the rest at $x = -a$. Two big payoffs follow. Telescoping: once a summand splits into $\frac{1}{k} - \frac{1}{k+1}$ (or a wider gap), the sum collapses to its endpoints. Generating functions: decomposing $\frac{P(x)}{\prod(1 - r_i x)}$ turns a rational generating function into a sum of geometric series, giving a closed form for the coefficients (hence for linear recurrences).

## On contests
The engine behind nearly every telescoping-sum problem on AMC/AIME, and the standard method for extracting a closed-form $n$-th term from a rational generating function. Recognizing that a summand *wants* to be split is often the entire insight.`

});

Object.assign(window.MATH_DETAILS, {

"first-order-recurrence": String.raw`## Why it works
The fixed point $L$ solves $L = rL + d$, so the constant sequence $a_n \equiv L$ satisfies the recurrence exactly. Subtracting it kills the $+d$: $a_n - L = r(a_{n-1} - L)$, which is a pure geometric sequence with ratio $r$. Iterating gives $a_n - L = r^n(a_0 - L)$.

## How to use it
Compute $L = \frac{d}{1-r}$ first — it's the value the process settles at, and often it's the entire answer ("what does the concentration approach?"). Then the deviation from $L$ decays or grows by a factor of $r$ each step. If $|r| < 1$ the sequence converges to $L$ regardless of $a_0$; if $|r| > 1$ it runs away from $L$; if $r = -1$ it oscillates between two values. The degenerate case $r = 1$ has no fixed point and is just arithmetic: $a_n = a_0 + nd$.

## On contests
Everywhere: compound interest with deposits, repeated dilution or evaporation, "each round, half the players plus three leave," and expected-value recursions that reduce to one state. Recognizing "geometric plus a constant" and jumping straight to $L$ turns a multi-step simulation into two lines.`,

"solving-recurrences": String.raw`## Why it works
A linear recurrence with constant coefficients is a linear map on the space of sequences, and geometric sequences $r^n$ are its eigenvectors: substituting $a_n = r^n$ into $a_n = c_1a_{n-1} + \cdots + c_k a_{n-k}$ and dividing by $r^{n-k}$ produces exactly the characteristic polynomial. Every solution is a combination of these building blocks, so matching the $k$ initial terms pins the combination uniquely. A repeated root supplies $n r^n$ as its second independent solution.

## How to use it
Work the tree in order.
First-order linear $a_n = ra_{n-1} + d$: shift to the fixed point $L = \frac{d}{1-r}$; then $a_n - L$ is geometric.
Homogeneous linear, constant coefficients: write the characteristic polynomial, factor it. Distinct roots give $a_n = \sum A_i r_i^n$; a root of multiplicity $m$ contributes $(A_0 + A_1 n + \cdots + A_{m-1}n^{m-1})r^n$; a complex-conjugate pair $\rho e^{\pm i\phi}$ gives $\rho^n(A\cos n\phi + B\sin n\phi)$, i.e. oscillation.
Non-homogeneous $a_n = c_1a_{n-1} + \cdots + f(n)$: general solution = particular + homogeneous. Guess the particular by matching $f(n)$'s shape — constant for constant, a degree-$d$ polynomial for a degree-$d$ polynomial, $Cs^n$ for $s^n$ — and if that guess already solves the homogeneous equation, multiply it by $n$ and retry.
Non-linear: hunt for a substitution that linearizes — $b_n = \frac{1}{a_n}$ for $a_n = \frac{a_{n-1}}{1 + a_{n-1}}$, $b_n = \log a_n$ for multiplicative rules, $b_n = a_n - L$ for a shifted fixed point. Failing that, telescope, or compute terms and look for periodicity.
Always finish by fitting the constants to the initial terms and verifying one term beyond them.

## On contests
AIME rewards recognizing which branch applies within seconds: a $+d$ means fixed point, a two-term homogeneous rule means characteristic equation, an ugly rational rule usually means periodicity or a reciprocal substitution. Note that many "counting" recurrences (tilings, strings avoiding a pattern) are Fibonacci-like and yield closed forms this way — see the recursive counting method for building the recurrence in the first place.`

});

Object.assign(window.MATH_DETAILS, {

"normalization": String.raw`## Why it works
An expression is homogeneous of degree $d$ if replacing $(a, b, c)$ by $(ta, tb, tc)$ multiplies it by $t^d$; an inequality between two degree-$d$ expressions is unchanged by that scaling. So the ratio of the variables is all that matters, and you may fix any one scale-sensitive quantity — the sum, the product, or a single variable — to a convenient value. This removes one variable at no cost, because any general point can be scaled onto your normalization.

## How to use it
Check homogeneity first (both sides the same degree, degree $0$ for a pure ratio). Then pick the normalization that simplifies the most: $a + b + c = 1$ for symmetric sums, $abc = 1$ for products or when the constraint is multiplicative, or a key length $= 1$ in geometry. Solve the constrained problem, and the general case follows by scaling back. The dual move is homogenizing: given a constraint like $a + b + c = 1$, multiply lower-degree terms by the appropriate power of $(a+b+c)$ to make every term the same degree, which is exactly what lets Muirhead and Schur (which require homogeneous symmetric sums) apply to a constrained inequality.

## On contests
The standard opening move for olympiad inequalities — normalize, then apply AM–GM, Cauchy, or a bunching argument to the simpler form. On AIME it shows up as "assume the perimeter is $1$" or "set the circumradius to $1$" to strip a nuisance parameter before computing. Just confirm homogeneity before normalizing; on a non-homogeneous expression it is invalid.`

});
