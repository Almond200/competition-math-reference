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
Expand $a_n(x - r_1)\cdots(x - r_n)$: the coefficient of $x^{n-k}$ collects all products of $k$ roots with sign $(-1)^k$. That is exactly the elementary symmetric polynomial $e_k$. Written out for a monic quartic $x^4+bx^3+cx^2+dx+e$, that reads $\sum r=-b$, $\sum_{i\lt j}r_ir_j=c$, $\sum r_ir_jr_k=-d$ and $\prod r=e$ — the signs simply alternate as the number of roots in each product grows.

## How to use it
Any symmetric function of the roots is expressible in the $e_k$ — power sums via Newton's identities, $\sum r_i^2 = e_1^2 - 2e_2$ directly. Cubic workhorse: for $x^3 + px^2 + qx + r$, roots sum to $-p$, pair-sum to $q$, multiply to $-r$. Also design polynomials: to shift roots by $c$, substitute $x \to x - c$; to scale by $k$, substitute $x \to \frac{x}{k}$; to invert, reverse coefficients.

## On contests
AIME's favorite polynomial tool. The root-transformation trick (build the polynomial whose roots are $r_i^2$ or $\frac{1}{r_i}$ or $r_i + 1$) converts scary questions into coefficient bookkeeping.`,

"fundamental-theorem-algebra": String.raw`## Why it works
The analytic core is that every non-constant complex polynomial has at least one root (provable via Liouville's theorem, a winding-number argument, or a minimum-modulus argument). Once you have one root $r$, divide out $(x - r)$ to drop the degree by one and repeat; after $n$ steps you have peeled off $n$ linear factors, $P(x) = a_n\prod (x - r_k)$, with exactly $n$ roots counted by multiplicity.

## How to use it
It is the license behind "a degree-$n$ polynomial has $n$ roots," which underwrites Vieta's formulas, partial fractions, and all root counting. Two corollaries do heavy lifting: a polynomial of degree $\le n$ that vanishes at $n+1$ points is identically zero (the standard way to prove a polynomial identity), and $n+1$ values pin a polynomial down uniquely (Lagrange interpolation). Over $\mathbb{R}$, pairing conjugate roots yields real linear and irreducible-quadratic factors — hence every odd-degree real polynomial has a real root.

## On contests
Usually invoked implicitly: knowing the exact root count sets up Vieta, and the "agree at enough points $\Rightarrow$ identical" corollary cracks many AIME polynomial and functional-equation problems. The conjugate-pairing consequence is a common parity/real-root argument.`,

"factor-remainder-theorem": String.raw`## Why it works
Divide $P(x)$ by $x - a$. The remainder has degree less than $1$, so it is a constant $r$, and $P(x) = (x-a)Q(x) + r$. Evaluating at $x = a$ kills the first term and leaves $r = P(a)$. The factor theorem is the case $P(a)=0$, and dividing by a degree-$k$ polynomial leaves a remainder of degree less than $k$ — which is why a quadratic divisor leaves a line, pinned down by its values at the two roots.

The integer statement is the same theorem read over $\mathbb{Z}$. Apply the factor theorem to $P(x) - P(b)$: it vanishes at $x = b$, so $P(x) - P(b) = (x-b)Q(x)$ with $Q$ having integer coefficients whenever $P$ does. Substituting $x = a$ gives $P(a) - P(b) = (a-b)Q(a)$, and $Q(a)$ is an integer, so $(a-b) \mid P(a) - P(b)$. Equivalently, expand $P(a) - P(b) = \sum c_k(a^k - b^k)$ and note every $a^k - b^k$ carries the factor $a - b$.

## How to use it
For a remainder, evaluate rather than divide. Mod a quadratic $(x-a)(x-b)$ the remainder is linear, so interpolate the line through $(a,P(a))$ and $(b,P(b))$; mod $(x-a)^2$ use $P(a) + P'(a)(x-a)$, or match coefficients. Divisibility questions reduce to evaluations at the roots of the divisor, complex ones included: $x^2+1 \mid P(x)$ exactly when $P(i) = 0$, and roots of unity handle $x^2+x+1$ and friends.

Over the integers, run the divisibility conditions as a filter. Candidate values at integer points must satisfy $(a-b) \mid P(a)-P(b)$ for every pair, which settles most "can such a polynomial exist" questions by parity alone. It also constrains fixed points and cycles: if $P(P(x)) = x$ on integers then $a-b \mid P(a)-P(b) \mid P(P(a))-P(P(b)) = a-b$, forcing $|P(a)-P(b)| = |a-b|$ — the key step in polynomial 2-cycle problems.

## On contests
Among the highest-frequency polynomial tools on AMC 12 and AIME. "Find the remainder when $x^{100}$ is divided by $x^2-3x+2$" is a pure evaluation at $1$ and $2$ followed by interpolation. The integer form shows up as "an integer polynomial takes the values $3$ and $7$ at some integers, can it take $5$ at another?" — check the differences and the answer falls out in a line.`,

"rational-root-theorem": String.raw`## Why it works
Plug $\frac{p}{q}$ (lowest terms) into the polynomial and clear denominators: every term but one is divisible by $p$ (forcing $p \mid a_0$), and every term but one by $q$ (forcing $q \mid a_n$).

## How to use it
Generates the finite candidate list for rational roots; test candidates with synthetic division (which simultaneously deflates the polynomial when a root is found). Monic integer polynomials have a sharper corollary: any rational root is an integer dividing the constant term.

## On contests
The standard opener for factoring cubics/quartics on AMC 12 and AIME. The monic corollary also proves irrationality results ("$\sqrt2$ is irrational" = rational root theorem on $x^2 - 2$).`,

"coefficient-extraction": String.raw`## Key forms
- $P(1)=\sum a_i$, $\;P(-1)=\sum(-1)^ia_i$, $\;P(0)=a_0$ — the three cheap evaluations, giving the coefficient sum, its alternating version, and the constant term
- $\frac{P(1)+P(-1)}{2}$ and $\frac{P(1)-P(-1)}{2}$ — the even-index and odd-index coefficient sums, separated by parity
- $\frac1n\sum_{j}\omega^{-jr}P(\omega^j)$ with $\omega=e^{2\pi i/n}$ — the roots-of-unity filter, picking out every $n$th coefficient

## Why it works
$P(1)$ substitutes 1 for every power of $x$, leaving the bare coefficient sum; $P(-1)$ alternates signs by parity of the exponent. Averaging keeps even-degree terms and cancels odd ones (and vice versa). This is the 2nd roots of unity filter — the general $n$-th version uses all $n$-th roots of unity.

## How to use it
Works on any polynomial you can evaluate but not expand: products like $(1 + 2x)^{10}(1 - x)^4$, compositions, generating functions. The constant term is $P(0)$; "sum of coefficients of even powers of $x$ in a two-variable polynomial" fixes the other variable and filters.

## On contests
"The sum of the coefficients of..." is a literal AMC catchphrase — answer $P(1)$, done. AIME layers it: find $P(1)$ of an implicitly defined polynomial, or combine $P(1), P(-1), P(0)$ to isolate coefficient classes.`,


"newtons-sums": String.raw`## Key forms
- $p_k=e_1p_{k-1}-e_2p_{k-2}+\cdots+(-1)^{k-1}k\,e_k$ — each power sum is determined by the earlier ones together with the elementary symmetric functions, so the whole ladder is computable from the coefficients alone
- the first few, which cover almost every contest use: $p_1=e_1$, $p_2=e_1p_1-2e_2$, $p_3=e_1p_2-e_2p_1+3e_3$, $p_4=e_1p_3-e_2p_2+e_3p_1-4e_4$
- the trailing $\pm k\,e_k$ term belongs only while $k\le n$; once $k$ exceeds the degree it disappears and the relation becomes a pure linear recursion in the previous $n$ power sums
- the ladder runs backwards too, recovering the $e_k$ from given power sums and hence reconstructing the polynomial

## Why it works
Multiply $x^n = e_1 x^{n-1} - e_2 x^{n-2} + \cdots$ (the polynomial relation each root satisfies) by $r_i^{k-n}$ and sum over roots: each power sum recurses on earlier ones. The correction term $(-1)^{k-1}k\,e_k$ for $k \le n$ accounts for the constant coefficient.

## How to use it
Read the identities straight off the ladder of key forms. The trailing $\pm k\,e_k$ term belongs only while $k \le n$; once $k \gt n$ drop it and the relation becomes a pure linear recursion in the previous $n$ power sums. They hold even when the roots are complex or unknown, since only the coefficients $e_i$ enter. Run the recursion forward for higher power sums, or backward to recover the $e_k$ from given power sums and reconstruct the polynomial.

## On contests
"Given $x + y + z$, $x^2+y^2+z^2$, $x^3+y^3+z^3$, find $x^4+y^4+z^4$" — pure Newton's sums, an AIME classic. Run it in reverse to recover $e_k$ from power sums and reconstruct the polynomial.`,

"conjugate-root-theorems": String.raw`## Why it works
Complex conjugation (or the map $\sqrt d \mapsto -\sqrt d$) is a ring homomorphism fixing the coefficients' field; applying it to $P(r) = 0$ yields $P(\bar r) = 0$. The polynomial cannot "see" which square root of $-1$ (or of $d$) it is using.

## How to use it
Root pairs come with their quadratic factors: $a \pm bi$ contributes $x^2 - 2ax + (a^2 + b^2)$; $a \pm b\sqrt d$ contributes $x^2 - 2ax + (a^2 - b^2 d)$. Minimal-degree constructions and "smallest polynomial with these roots" problems assemble these factors. Odd-degree real polynomials must have a real root (conjugates pair up the rest).

## On contests
AMC/AIME: "a cubic with rational coefficients has root $3 + \sqrt2$ and integer root..." — the conjugate is also a root, Vieta finishes. Watch the hypothesis: rational coefficients are required for the radical version.`,

"palindromic-polynomials": String.raw`## Key forms
- a palindromic polynomial has $a_i=a_{n-i}$, so its roots come in pairs $r$ and $\frac1r$ — dividing by $x^{n/2}$ groups the terms into $x^k+\frac{1}{x^k}$ and the substitution $t=x+\frac1x$ halves the degree
- the conversions needed after substituting are $x^2+\frac1{x^2}=t^2-2$ and $x^3+\frac1{x^3}=t^3-3t$
- an odd-degree palindromic polynomial always has $x=-1$ as a root, so factor that out first and apply the substitution to the even palindromic factor that remains

## Why it works
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

"lagrange-interpolation": String.raw`## Key forms
- $P(x)=\sum_i y_i\prod_{j\ne i}\frac{x-x_j}{x_i-x_j}$ — each basis term is built to equal $1$ at its own node and $0$ at every other, so the sum passes through all the data by construction
- $n$ points determine a unique polynomial of degree at most $n-1$, since two such interpolants would differ by a polynomial with $n$ roots — which is also what makes "a cubic through these five points" a contradiction

## Why it works
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

"sfft": String.raw`## Key forms
- $xy+ax+by$ is one constant short of factoring, so adding $ab$ gives $(x+b)(y+a)$ — an equation $xy+ax+by=c$ becomes $(x+b)(y+a)=c+ab$, and integer solutions are read off from the factor pairs of the right side
- when the $xy$ term carries a coefficient, multiply through first: $Axy+Bx+Cy=D$ becomes $(Ax+C)(Ay+B)=AD+BC$, keeping only the factors that make $x$ come out an integer
- the unit-fraction case is the one to recognise on sight: $\frac1x+\frac1y=\frac1n$ clears to $(x-n)(y-n)=n^2$, so the number of positive solutions is the number of divisors of $n^2$

## Why it works
$xy + ax + by$ is one constant short of factoring as $(x + b)(y + a)$; add $ab$ to both sides and it does. The same accounting explains the general case: an equation that is linear in $x$ for each fixed $y$ (and vice versa) is a hyperbola, and every hyperbola with rational asymptotes can be written as a constant product after shifting both variables.

## How to use it
Solve $xy + ax + by = c$ over integers: rewrite as $(x + b)(y + a) = c + ab$, list the factor pairs of the right side — negative ones too, unless the problem restricts to positives — and read off solutions.

When the $xy$ term carries a coefficient, multiply through before completing. From $Axy + Bx + Cy = D$, multiplying by $A$ gives $(Ax + C)(Ay + B) = AD + BC$; solve for $Ax + C$ and keep only the factors congruent to $C$ mod $A$, since $x$ must come out an integer. The same fix handles a stray constant on the wrong side.

Two standard consequences: $\frac1x + \frac1y = \frac1n$ clears to $(x-n)(y-n) = n^2$, so the number of positive solutions is the number of divisors of $n^2$; and counting lattice points on a hyperbola $xy = N$ is just counting divisors of $N$.

## On contests
The unit-fraction equation $(x-n)(y-n) = n^2$ is an AIME classic (count divisors of $n^2$). Any two-variable equation that is linear in each variable separately is SFFT bait.`,

"cubes-minus-3abc": String.raw`## Why it works
Direct expansion, or the elegant route: $a^3+b^3+c^3 - 3abc = \det$ of a circulant matrix, factoring via roots of unity. The second factor is $\frac{1}{2}[(a-b)^2 + (b-c)^2 + (c-a)^2]$, manifestly nonnegative.

## How to use it
Two directions: (1) if $a + b + c = 0$ then $a^3 + b^3 + c^3 = 3abc$ — applies to differences like $(x-y), (y-z), (z-x)$ which always sum to zero; (2) the factorization itself for Diophantine or symmetric-system problems. Also proves AM-GM for three variables.

## On contests
"$x - y$, $y - z$, $z - x$" cube sums, and systems giving $a+b+c$ and $ab+bc+ca$ and $abc$ (compute cube sums via this + Newton). The zero-sum special case is the single most reused fragment.`,

"square-of-sum": String.raw`## Why it works
Direct expansion; the general pattern is the multinomial theorem. One rearrangement is worth keeping separately: $a^2+b^2+c^2-ab-bc-ca=\tfrac12\big[(a-b)^2+(b-c)^2+(c-a)^2\big]$, which is visibly non-negative and vanishes only when $a=b=c$, so it turns a symmetric expression into an inequality with a known equality case.

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

"telescoping": String.raw`## Key forms
- if each term can be written as $f(k)-f(k+1)$, the sum collapses to $f(\text{first})-f(\text{last}+1)$ — every interior term cancels against its neighbour, so only the two ends survive
- the standard decompositions to recognise: $\frac{1}{k(k+1)}=\frac1k-\frac1{k+1}$, and more generally $\frac{1}{k(k+d)}=\frac1d\left(\frac1k-\frac1{k+d}\right)$, where a gap of $d$ leaves $d$ surviving terms at each end rather than one
- two disguised cases worth knowing: $\frac{k}{(k+1)!}=\frac{1}{k!}-\frac{1}{(k+1)!}$, and $\frac{1}{\sqrt k+\sqrt{k+1}}=\sqrt{k+1}-\sqrt k$ after rationalising
- products telescope identically, with $\prod_{k=m}^{n}\frac{f(k)}{f(k+1)}=\frac{f(m)}{f(n+1)}$

## Why it works
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
A linear recurrence with constant coefficients is a linear map on the space of sequences, and the geometric sequences $r^n$ are its eigenvectors. Substituting $a_n = r^n$ into $a_n = c_1a_{n-1} + \cdots + c_ka_{n-k}$ and dividing by $r^{n-k}$ produces exactly the characteristic polynomial, so its roots are the ratios that work. Every solution is a combination of these building blocks, and since the recurrence is determined by $k$ initial terms, matching them pins the combination uniquely.

A repeated root needs a second independent solution, and $nr^n$ supplies it — it is the limit of two geometric solutions as their ratios merge. A complex-conjugate pair $\rho e^{\pm i\phi}$ combines into the real form $\rho^n(A\cos n\phi + B\sin n\phi)$, which is why some linear recurrences oscillate rather than grow monotonically; when $\rho = 1$ and $\phi$ is a rational multiple of $\pi$, the sequence is periodic outright.

## How to use it
Write the characteristic equation, factor it, assemble the general solution from the roots, then solve the small linear system the initial terms give you. Verify one term beyond the ones you fitted — it catches almost every algebra slip.

For a non-homogeneous rule $a_n = c_1a_{n-1} + \cdots + f(n)$, the general solution is a particular solution plus the homogeneous one. Guess the particular by matching the shape of $f(n)$: a constant for a constant, a degree-$d$ polynomial for a degree-$d$ polynomial, $Cs^n$ for $s^n$. If that guess already solves the homogeneous equation, multiply it by $n$ and try again.

When the recurrence is not linear, look for a substitution that makes it so: $b_n = \frac{1}{a_n}$ turns $a_n = \frac{a_{n-1}}{1+a_{n-1}}$ into an arithmetic sequence, $b_n = \log a_n$ linearises a multiplicative rule, and $b_n = a_n - L$ handles a shifted fixed point. Failing that, telescope, or compute terms and test for periodicity — an ugly rational rule is usually periodic rather than solvable in closed form.

## On contests
Recognising the branch within seconds is what the time pressure rewards: a $+d$ on a first-order rule means shift to the fixed point, a two-term homogeneous rule means the characteristic equation, and an ugly rational rule means periodicity or a reciprocal substitution. Counting recursions (tilings, strings avoiding a pattern) are usually Fibonacci-like and yield closed forms this way, though AIME more often asks for a term modulo $m$ — in that case skip the closed form entirely and iterate the recurrence mod $m$, hunting for the cycle.`,

"am-gm": String.raw`## Why it works
Two variables: $(\sqrt a - \sqrt b)^2 \ge 0$ rearranges to it. General $n$: induction, smoothing, or Jensen on the concavity of $\log$. Equality demands all terms equal — the tightness condition is the useful part.

## How to use it
Optimization recipe: to minimize a sum with a constrained product (or vice versa), split terms so that AM-GM's equality condition is achievable — sometimes that means weighting, e.g. minimize $x + \frac{2}{x}$? Fine directly; minimize $2x + \frac{3}{x^2}$: split $2x = x + x$ so the three terms $x, x, \frac{3}{x^2}$ have constant product. Always verify equality is attainable within constraints.

## On contests
AMC optimization ("minimum value of...") and AIME bounding steps. Classic instant results: $x + \frac{1}{x} \ge 2$; $\frac{a}{b} + \frac{b}{a} \ge 2$; for fixed perimeter, the square maximizes area.`,

"mean-chain": String.raw`## Why it works
The chain is really one inequality proved three times. QM $\ge$ AM is the statement that variance is non-negative: expanding $\sum(a_i-\bar a)^2 \ge 0$ gives $\sum a_i^2 \ge n\bar a^2$, which is exactly $\text{QM}^2 \ge \text{AM}^2$. AM $\ge$ GM follows from the concavity of $\ln$. And GM $\ge$ HM is not a new fact at all — it is AM $\ge$ GM applied to the reciprocals $1/a_i$ and then flipped. Every equality case is the same: all the $a_i$ are equal.

## Full proof
Throughout, $a_1,\dots,a_n \gt 0$ and $\bar a = \frac{1}{n}\sum a_i$ denotes the arithmetic mean.

QM $\ge$ AM. Since squares are non-negative, $\sum_{i=1}^n (a_i - \bar a)^2 \ge 0$. Expanding, $\sum a_i^2 - 2\bar a\sum a_i + n\bar a^2 \ge 0$, and $\sum a_i = n\bar a$, so this is $\sum a_i^2 - n\bar a^2 \ge 0$. Dividing by $n$ gives $\frac{1}{n}\sum a_i^2 \ge \bar a^2$, and taking square roots of both non-negative sides gives $\sqrt{\frac{1}{n}\sum a_i^2} \ge \bar a$. Equality needs every $(a_i-\bar a)^2 = 0$, i.e. all $a_i$ equal. (The same conclusion follows from Cauchy-Schwarz against the all-ones vector: $\left(\sum a_i\cdot 1\right)^2 \le n\sum a_i^2$.)

AM $\ge$ GM. The function $\ln$ is concave, since $(\ln x)'' = -1/x^2 \lt 0$. Jensen's inequality for a concave function says the function of the average is at least the average of the function, so $\ln\!\left(\frac{1}{n}\sum a_i\right) \ge \frac{1}{n}\sum \ln a_i = \ln\!\left(\left(\prod a_i\right)^{1/n}\right)$. Exponentiating the increasing function $e^x$ preserves the inequality, giving $\frac{1}{n}\sum a_i \ge \left(\prod a_i\right)^{1/n}$. Jensen is an equality exactly when all inputs coincide, so again all $a_i$ must be equal.

For $n=2$ this needs no machinery: $\frac{a+b}{2}-\sqrt{ab} = \frac{(\sqrt a-\sqrt b)^2}{2} \ge 0$.

GM $\ge$ HM. Apply the AM $\ge$ GM inequality just proved to the positive numbers $1/a_1,\dots,1/a_n$: $\frac{1}{n}\sum\frac{1}{a_i} \ge \left(\prod \frac{1}{a_i}\right)^{1/n} = \frac{1}{\left(\prod a_i\right)^{1/n}}$. Both sides are positive, so taking reciprocals reverses the inequality: $\left(\prod a_i\right)^{1/n} \ge \frac{n}{\sum 1/a_i}$, which is GM $\ge$ HM. Equality transfers from the AM-GM step, so once more all $a_i$ are equal.

Chaining the three gives QM $\ge$ AM $\ge$ GM $\ge$ HM, with a single equality case: $a_1 = a_2 = \cdots = a_n$.

## How to use it
Pick the pair of means matching the given data and the target: given a sum of squares, QM-AM converts to a sum bound; given a sum of reciprocals, HM enters. The chain also settles "which is bigger" comparison questions instantly.

## On contests
AMC comparison problems and AIME bounding steps. HM's appearance: average speed over equal distances is the harmonic mean — the classic "drive there at 30, back at 60" trap (answer 40, not 45).`,

"cauchy-schwarz": String.raw`## Why it works
The quadratic $\sum (a_i t + b_i)^2 \ge 0$ in $t$ has nonpositive discriminant, and that discriminant is exactly $(\sum a_ib_i)^2-(\sum a_i^2)(\sum b_i^2)\le 0$. Equality needs some $t$ zeroing every term — i.e. the sequences proportional. Lagrange's identity makes the gap explicit: $(\sum a_i^2)(\sum b_i^2)-(\sum a_ib_i)^2=\sum_{i\lt j}(a_ib_j-a_jb_i)^2$. Geometrically the whole statement is $|\mathbf a\cdot\mathbf b|\le\lVert\mathbf a\rVert\,\lVert\mathbf b\rVert$, since the dot product carries a factor of $\cos\theta$ that never exceeds $1$ in size.

## How to use it
Choosing the two sequences is the art. To bound $(\sum a_i)^2$, split $a_i=\sqrt{w_i}\cdot\frac{a_i}{\sqrt{w_i}}$ with weights matching the constraint. Titu handles "squares over positive denominators" directly: given $a+b=1$, $\frac1a+\frac4b=\frac{1^2}{a}+\frac{2^2}{b}\ge\frac{(1+2)^2}{a+b}=9$. Tracking the proportionality equality condition usually pins the extremal point.

## On contests
The default first swing at an AIME/olympiad inequality, plus clean equality-case hunting. With the right weights it also proves the QM–AM step and the power-mean inequalities.`,

"rearrangement": String.raw`## Why it works
For sorted sequences $a_1\le\cdots\le a_n$ and $b_1\le\cdots\le b_n$, the sum $\sum a_i b_{\sigma(i)}$ over permutations $\sigma$ is largest when $\sigma$ keeps the same order and smallest when it reverses one. The proof is a swap argument: if some pair is matched out of order, exchanging the two partners changes the sum by $(a_i-a_j)(b_{\sigma(i)}-b_{\sigma(j)})$, whose sign forces the straightened pairing to be at least as large. Repeating until everything is aligned needs no convexity or positivity — just the ordering.

## How to use it
It makes "pair large with large" rigorous, and it is the honest engine behind several results: averaging the same-order and reverse-order versions gives Chebyshev's sum inequality, and it underlies many bounds that look like forced AM-GM. When a cyclic sum resists, ask whether its terms are two sorted sequences in disguise. Equality needs one sequence constant or the orders already matched.

## On contests
Mostly olympiad, but AMC/AIME "assign these values to maximize (or minimize) $\sum a_i b_i$" problems are direct: sort both lists and pair them in the same order for the maximum, opposite order for the minimum.`,

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

"bernoulli-inequality": String.raw`## Why it works
Induct on $n$: it holds at $n = 1$, and if $(1+x)^k \ge 1 + kx$ then — since $x \ge -1$ keeps $1 + x \ge 0$ — multiplying preserves the inequality: $(1+x)^{k+1} \ge (1 + kx)(1 + x) = 1 + (k+1)x + kx^2 \ge 1 + (k+1)x$. Geometrically, $y = 1 + nx$ is the tangent at $x = 0$ to the convex curve $y = (1+x)^n$, so the curve never dips below it; for real exponents it is just convexity of $t \mapsto t^n$.

## How to use it
A fast, calculus-free bound on a power: estimate compound growth, show a power clears a linear target, or sandwich limits like $\left(1 + \tfrac{1}{n}\right)^n$. Keep the flip in mind — for exponents in $[0,1]$, $(1+x)^r \le 1 + rx$ bounds roots from above. It is often the first move that turns a power into something linear before AM–GM or telescoping finishes.

## On contests
Common in estimation and bounding problems on the AMC/AIME, and a standard lemma in olympiad inequalities. Whenever you need "$(1 + \text{small})^{\text{power}}$ is at least (or at most) roughly linear," this is the tool.`,

"log-rules": String.raw`## Why it works
Each rule is an exponent law read through the logarithm (log of product ↔ sum of exponents, and so on). $\log_b b^x = x$ and $b^{\log_b x} = x$ say the two functions invert each other.

The base-power rule follows from change of base. Writing $\log_{b^m} x^n = \frac{\log_b x^n}{\log_b b^m} = \frac{n\log_b x}{m}$ shows why an exponent on the argument multiplies while an exponent on the base divides. The special case $m = n$ gives $\log_{b^k} x^k = \log_b x$: raising base and argument to the same power changes nothing.

One thing the algebra hides: $\log_b$ is increasing only when $b > 1$. For $0 < b < 1$ it is decreasing, so applying $\log_b$ to an inequality reverses it — the same trap as dividing by a negative number.

## How to use it
Contest logs are mostly about converting to a common base and hunting structure: products of logs go to the chain rule, sums of logs collapse into the log of a product (watch for a telescoping product inside), and an exponent anywhere — on the argument or on the base — comes out front via $\log_{b^m} x^n = \frac{n}{m}\log_b x$.

Domain discipline is where most marks are lost. Arguments must be positive and the base must avoid $1$, so every solution has to be checked against the original equation; extraneous roots are the single most common error in log problems. When an inequality is involved, check whether the base exceeds $1$ before deciding which way the sign goes.

## On contests
AMC 12 log problems reward converting everything to one base and substituting $u = \log x$. AIME systems (logs of $xy$, $yz$, $zx$) become linear algebra in the log variables — add and halve.`,

"change-of-base": String.raw`## Why it works
Write $a = c^{\log_c a}$, $b = c^{\log_c b}$ and compare exponents in $b^{\log_b a} = a$. The reciprocal form is the special case $c = a$.

The chain rule is change of base applied twice. Putting every factor over a common base $c$, the product $\log_a b\cdot\log_b c\cdot\log_c d$ becomes $\frac{\log b}{\log a}\cdot\frac{\log c}{\log b}\cdot\frac{\log d}{\log c}$, and each numerator cancels the next denominator — leaving $\frac{\log d}{\log a} = \log_a d$. The same cancellation runs through a chain of any length, which is why these products telescope.

## How to use it
Normalize all logs to one base, then the chain $\log_a b \cdot \log_b c = \log_a c$ telescopes products like $\log_2 3 \cdot \log_3 4 \cdots \log_{63} 64$ instantly. The reciprocal identity turns $\log_a b + \log_b a \ge 2$ (AM-GM) and similar symmetric forms.

## On contests
Telescoping log products are an AMC classic (that example equals $\log_2 64 = 6$). AIME layers reciprocal identities into systems — substituting $t = \log_a b$ and using $\log_b a = \frac{1}{t}$ reduces them to rational equations.`,

"log-swap-identity": String.raw`## Why it works
The identity is $a^{\log_b c}=c^{\log_b a}$. Take $\log_b$ of each side: the left becomes $(\log_b c)(\log_b a)$ and the right becomes $(\log_b a)(\log_b c)$ — the same product, since multiplication commutes. So the base of the power and the argument inside the exponent's logarithm can trade places.

## How to use it
It rewrites awkward exponents into forms that combine or cancel: $2^{\log_3 5}$ and $5^{\log_3 2}$ are the same number, so a sum or ratio mixing them collapses. The common-base version is $x^{\log y}=y^{\log x}$, which means a product like $x^{\log y}\cdot y^{\log x}$ is just $\bigl(x^{\log y}\bigr)^2$. Related anchors: $a^{\log_a x}=x$ and $\log_a b=\frac{1}{\log_b a}$. When an exponent hides a logarithm whose base differs from the power's base, swapping is the move.

## On contests
Occasional but decisive on AMC 12 / AIME — these problems are engineered so the swap makes two terms merge or cancel. Spot the tell (a term like $a^{\log_b c}$ with $a\ne b$) and swap to line it up with its partner.`,

"exponent-laws": String.raw`## Why it works
Definitions: repeated multiplication for integer exponents, extended to rationals via roots and to negatives via reciprocals so that the addition law $a^{m+n} = a^m a^n$ stays true. Insisting on that one law forces every other rule: division subtracts, giving $\frac{a^m}{a^n}=a^{m-n}$ and hence $a^0=1$ and $a^{-n}=\frac{1}{a^n}$; a power of a power multiplies, giving $(a^m)^n=a^{mn}$ and $(ab)^n=a^nb^n$; and a fractional exponent is a root, so $a^{m/n}=\sqrt[n]{a^m}$.

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

"roots-of-unity-filter": String.raw`## Key forms
- averaging a generating function over the $n$th roots of unity keeps only the coefficients whose index is divisible by $n$, because $\sum_j\omega^{jk}$ is $n$ when $n\mid k$ and $0$ otherwise
- with a phase factor this selects any residue class: $\sum_{k\equiv r\,(n)}[x^k]f(x)=\frac1n\sum_{j=0}^{n-1}\omega^{-jr}f(\omega^j)$
- the two cases that cover almost every contest use are $n=2$, the even/odd split giving $2^{m-1}$ each, and $n=3$, giving $\sum_{k\equiv0\,(3)}\binom mk=\frac{2^m+2\cos\frac{m\pi}{3}}{3}$

## Why it works
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

"common-angle-values": String.raw`## Why it works
The $45$-$45$-$90$ triangle (legs $1$, hypotenuse $\sqrt2$) and the $30$-$60$-$90$ triangle (sides $1, \sqrt3, 2$) give the values directly as opposite/hypotenuse and adjacent/hypotenuse. The $0^\circ$ and $90^\circ$ entries are the degenerate limits on the unit circle, where $\tan 90^\circ$ blows up (undefined).

## How to use it
Memorize the first quadrant once, then reach any angle by taking its reference angle to the $x$-axis and attaching the quadrant sign (ASTC). Know the radian conversions ($\frac{\pi}{6}, \frac{\pi}{4}, \frac{\pi}{3}$) cold — they are the default at AMC 12 / AIME level.

## On contests
Pure speed: these sit inside nearly every trig computation on the AMC, and the reference-angle-plus-sign routine handles $120^\circ, 135^\circ, 210^\circ$, and the rest without re-deriving anything.`,

"reduction-identities": String.raw`## Why it works
Everything is a unit-circle reflection. Reflecting across $y = x$ swaps coordinates, giving the cofunction pair $\sin(90^\circ - \theta) = \cos\theta$. Reflecting across the $x$-axis negates $y$ (so $\sin$ is odd) and fixes $x$ (so $\cos$ is even). Reflecting across the $y$-axis is the supplement $180^\circ - \theta$: $y$ stays, $x$ flips, so $\sin$ is preserved and $\cos$ negates.

## How to use it
Use them to collapse awkward angles to first-quadrant values before applying other identities. The cofunction rule is why the $\sin$ and $\cos$ graphs are shifts of each other; the odd/even rules drop signs inside functions; and remembering $\tan$ has period $180^\circ$ (not $360^\circ$) avoids a common off-by-a-period slip.

## On contests
Routine simplification on AMC/AIME, and the key to telescoping or symmetric trig sums where you must see that terms like $\sin\theta$ and $\sin(180^\circ - \theta)$ are equal.`,

"angle-addition": String.raw`## Why it works
Geometric proof via two stacked right triangles, or instantly from $e^{i(a+b)} = e^{ia}e^{ib}$ — expand and match real/imaginary parts.

## How to use it
Everything else in trig is downstream: double/half angle, product-to-sum, shifts like $\sin(\theta + 90^\circ) = \cos\theta$. Direct use: exact values at $15^\circ, 75^\circ, 105^\circ$; combining $a\sin\theta + b\cos\theta = \sqrt{a^2+b^2}\sin(\theta + \phi)$ (the harmonic addition trick — memorize this consequence).

## On contests
Harmonic addition answers "max of $3\sin x + 4\cos x$" (= 5) instantly — high-frequency AMC. Tangent addition computes angle sums in geometry ($\arctan$ towers) and telescopes arctangent series.`,

"double-angle": String.raw`## Why it works
Set $a = b$ in the addition formulas. The three $\cos 2\theta$ forms come from substituting $\sin^2 = 1 - \cos^2$ or vice versa. Writing everything over $t=\tan\theta$ gives the Weierstrass substitution $\sin2\theta=\frac{2t}{1+t^2}$ and $\cos2\theta=\frac{1-t^2}{1+t^2}$, which turns a trigonometric equation into a rational one in a single variable.

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

"denesting-radicals": String.raw`## Key forms
- $\sqrt{a\pm\sqrt b}=\sqrt{\frac{a+\sqrt{a^2-b}}{2}}\pm\sqrt{\frac{a-\sqrt{a^2-b}}{2}}$ — this denests into rationals exactly when $a^2-b$ is a perfect square, which is the test to run first
- in practice, match $(\sqrt x\pm\sqrt y)^2=x+y\pm2\sqrt{xy}$ instead: solve $x+y=a$ with $4xy=b$, a sum-and-product pair, giving results like $\sqrt{3+2\sqrt2}=1+\sqrt2$ in one line

## Why it works
Guess $\sqrt{a \pm \sqrt b} = \sqrt x \pm \sqrt y$; squaring gives $x + y = a$ and $4xy = b$, a sum/product system — solvable in nice closed form exactly when $a^2 - b$ is a perfect square.

## How to use it
Practical recipe: seek $x, y$ with $x + y = a$, $xy = \frac{b}{4}$ (after writing the inner term as $2\sqrt{\cdot}$). If it doesn't denest, don't force it — work with the nested form or square strategically. Trig alternative: $\sqrt{2 + 2\cos\theta} = 2\cos\frac{\theta}{2}$.

## On contests
Distances in coordinate geometry ($\sqrt{7 + 4\sqrt3} = 2 + \sqrt3$) and simplifying answers to match choices. AMC answer extraction frequently hides one denesting step.`,

"infinite-nest": String.raw`## Key forms
- name the whole expression $x$ and use its self-similarity, since the tail is a copy of the whole — $x=\sqrt{a+x}$ gives $x^2-x-a=0$, and a continued fraction $x=a+\frac1x$ gives $x^2-ax-1=0$
- power towers behave differently: $x^{x^{\cdots}}=a$ gives $x^a=a$, but the tower converges only for $e^{-e}\le x\le e^{1/e}$, which is the trap behind "the $\sqrt2$ tower equals $2$, not $4$"
- always select the root consistent with an obvious bound — positivity, or being at least as large as the first term — since the equation cannot distinguish the limit from its rejected partner

## Why it works
If the infinite expression converges to $x$, self-similarity gives an equation in $x$ (the tail equals the whole). Convergence itself: monotone + bounded for standard cases — contest problems presume it.

## How to use it
Name it, equation it, solve it, then select the root consistent with obvious bounds (positivity, size). Continued fractions give quadratics (e.g. $1 + \cfrac{1}{1 + \cdots} = \varphi$); power towers $x^{x^{\cdots}} = a$ give $x^a = a$ (converges only for $e^{-e} \le x \le e^{1/e}$ — the boundary trap behind "$\sqrt2$ tower $= 2$, not 4").

## On contests
AMC/AIME nested radicals and continued fractions are routine; the root-selection step is where errors happen. Ramanujan-style nests ($\sqrt{1 + 2\sqrt{1 + 3\sqrt{\cdots}}} = 3$) occasionally cameo — pattern-match to $(n+1)^2 = 1 + n(n+2)$.`,

"rationalizing": String.raw`## Why it works
$(\sqrt a - \sqrt b)(\sqrt a + \sqrt b) = a - b$ clears the radicals; for cube roots use the sum/difference of cubes partner.

## How to use it
Beyond cleanup: conjugates create telescopes ($\frac{1}{\sqrt k + \sqrt{k+1}} = \sqrt{k+1} - \sqrt k$), extract integer parts of surd powers (pair $(3 + \sqrt5)^n + (3 - \sqrt5)^n$, an integer, with the second term tiny — so the first is almost an integer), and tame limits/estimates of radical differences.

## On contests
The conjugate-pair integrality trick is a beloved AIME device ("find the fractional part of $(\sqrt3 + \sqrt2)^6$"). The telescoping-sum version appears at every level.`,

"fx-pairing": String.raw`## Key forms
- if $f(x)+f(1-x)$ is the same constant $c$ for every $x$, then $\sum_{k=1}^{n-1}f\!\left(\frac kn\right)=\frac{n-1}{2}\,c$ — pair the term at $k$ with the term at $n-k$ and every pair contributes $c$, so no individual value is ever computed
- test the pairing before anything else, and handle a self-paired middle term separately — at $x=\frac12$ the term pairs with itself and contributes only $\frac c2$

## Why it works
Symmetric sums double-count: $\sum_k f(\frac{k}{n})$ pairs term $k$ with term $n-k$. If $f(x) + f(1-x)$ is constant, every pair contributes the same amount, so the sum is (pairs) × (constant) — no individual evaluations needed.

## How to use it
Test the pairing before anything else: compute $f(x) + f(1-x)$ (or $f(x) + f(-x)$, $f(x)f(a-x)$ for product versions) and simplify. Exponential forms $\frac{c^x}{c^x + \sqrt c}$ are engineered for it. Handle the unpaired middle term ($x = \frac{1}{2}$) separately when the count is odd.

## On contests
The $\frac{9^x}{9^x+3}$ sum is a famous AIME problem; variants recur on AMC 12. Also underlies "sum of $f$ over roots/reciprocals" and logarithm sums where $\log x$ pairs with $\log\frac{1}{x}$.`,

"trig-substitution": String.raw`## Key forms
- match the radical to the substitution that clears it: $x=a\sin\theta$ for $\sqrt{a^2-x^2}$, $x=a\tan\theta$ for $\sqrt{a^2+x^2}$, and $x=a\sec\theta$ for $\sqrt{x^2-a^2}$ — each one turns the radical into a single trigonometric function via a Pythagorean identity
- with $x=\cos\theta$, iterating $x\mapsto2x^2-1$ becomes $\theta\mapsto2\theta$, so $n$ steps multiply the angle by $2^n$ — this is what turns "apply the map 2017 times" into reducing an angle modulo $2\pi$
- symmetric conditions often hide an angle sum: $a+b+c=abc$ is exactly $\tan A+\tan B+\tan C=\tan A\tan B\tan C$ with $A+B+C=\pi$, so setting $a=\tan A$ and so on absorbs the constraint

## Why it works
$\cos$, $\sin$, and $\tan$ parametrize the values a bounded or radical expression can take, and the Pythagorean identities turn each stubborn radical into a clean trig function — so an algebraic constraint becomes an angle identity, where doubling, tripling, and angle-sum machinery is far stronger. Solve in $\theta$, then translate back.

## How to use it
Match each radical to the substitution that clears it:

- $\sqrt{a^2 - x^2}$: put $x = a\sin\theta$ (or $a\cos\theta$), leaving $a\cos\theta$
- $\sqrt{a^2 + x^2}$: put $x = a\tan\theta$, leaving $a\sec\theta$
- $\sqrt{x^2 - a^2}$ (with $|x|\ge a$): put $x = a\sec\theta$, leaving $a\tan\theta$
- Half-angle: with $x=\cos\theta$, $\sqrt{\tfrac{1+x}{2}}=\cos\tfrac\theta2$ and $\sqrt{\tfrac{1-x}{2}}=\sin\tfrac\theta2$

For instance, with $x = \sin\theta$, $x\sqrt{1 - x^2} = \sin\theta\cos\theta = \tfrac12\sin 2\theta$, so it never exceeds $\tfrac12$.

Three other shapes give themselves away just as clearly.

- Iterations become angle multiplication — the quadratic map $x \mapsto 2x^2 - 1$ is $\cos\theta \mapsto \cos 2\theta$, so $n$ steps send $\theta \mapsto 2^n\theta$; its cousin $x \mapsto x^2 - 2$ is $2\cos\theta \mapsto 2\cos 2\theta$. The cubic $x \mapsto 4x^3 - 3x$ is $\cos\theta \mapsto \cos 3\theta$, and in general the Chebyshev polynomials satisfy $T_n(\cos\theta) = \cos n\theta$. The tangent map $x \mapsto \dfrac{2x}{1 - x^2}$ is $\tan\theta \mapsto \tan 2\theta$. Iterating $x \mapsto 2x^2 - 1$ from $x_0 = \cos 1^\circ$ gives $x_k = \cos(2^k \cdot 1^\circ)$, so you reduce $2^k$ modulo $360$ instead of squaring $k$ times.
- Angle-sum constraints — symmetric conditions often hide an angle sum. If $a + b + c = abc$, set $a = \tan A$, $b = \tan B$, $c = \tan C$ with $A + B + C = \pi$; that is exactly the identity $\tan A + \tan B + \tan C = \tan A\tan B\tan C$. If instead $ab + bc + ca = 1$, the same tangents work with $A + B + C = \tfrac\pi2$. A single $x^2 + y^2 = 1$ becomes $(x, y) = (\cos\theta, \sin\theta)$, and a system like $x\sqrt{1 - y^2} + y\sqrt{1 - x^2} = 1$ collapses to $\sin(\alpha + \beta) = 1$.
- Nested radicals, and the reverse direction — over and over, $\sqrt{2 + 2\cos\theta} = 2\cos\tfrac\theta2$, which unwinds the chain $\sqrt{2 + \sqrt{2 + \cdots}}$ (with $n$ twos) to $2\cos\dfrac{\pi}{2^{n+1}}$. Going the other way, from trig back to algebra, the Weierstrass substitution $t = \tan\tfrac\theta2$ rationalizes everything through $\sin\theta = \dfrac{2t}{1 + t^2}$ and $\cos\theta = \dfrac{1 - t^2}{1 + t^2}$.

## On contests
AIME systems with mutual radicals, iterated quadratic maps asked "after 2017 steps" (the angle multiplies by $2^{2017}$ — reduce mod $2\pi$), symmetric $a + b + c = abc$ conditions, and nested $\sqrt{2 + \cdots}$ evaluations all fall to a well-chosen angle. Rule of thumb: when the algebra loops or a radical refuses to cancel, parametrize by an angle and let the identities finish it.`

});

// Entries added from the 2023-2025 AMC/AIME sweep.
Object.assign(window.MATH_DETAILS, {

"functional-substitution": String.raw`## Key forms
- an identity holding for all reals holds for every convenient choice, and each structured substitution erases a variable: $(0,0)$ pins $f(0)$, $(x,0)$ ties $f(x)$ to constants, $(x,x)$ produces a doubling law, and $(x,-x)$ tests parity
- run them in order and record each fact before choosing the next, since later substitutions should exploit what the earlier ones established
- recognise the standard templates, which tell you what to expect: $f(x+y)=f(x)+f(y)$ is Cauchy (linear), $f(x+y)=f(x)f(y)$ is exponential, $f(xy)=f(x)+f(y)$ is logarithmic, and $f(a+b)+f(a-b)=2f(a)f(b)$ is the cosine equation

## Why it works
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

"finite-differences": String.raw`## Key forms
- the difference operator $\Delta a_n=a_{n+1}-a_n$ lowers the degree of a polynomial by exactly one, so a degree-$k$ polynomial has constant $k$-th differences, and that constant is $k!$ times the leading coefficient
- this runs both ways: constant $k$-th differences force the sequence to be a degree-$k$ polynomial, so building the difference table and extending the constant row evaluates the polynomial anywhere without ever finding its coefficients
- the table's leading diagonal gives Newton's forward form $P(n)=\sum_j\Delta^jP(0)\binom nj$, which is why the binomial basis is the natural one for polynomials constrained at consecutive integers

## Why it works
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

"root-transformations": String.raw`## Key forms
- to build the polynomial whose roots are shifted, substitute backwards: roots $r_i+k$ come from $P(x-k)$, since $x$ is a root of the new polynomial exactly when $x-k$ was a root of the old
- roots $kr_i$ come from $P\!\left(\frac xk\right)$, and roots $\frac{1}{r_i}$ come from reversing the coefficient list — the reversal works because $x^nP\!\left(\frac1x\right)$ has exactly the reciprocal roots
- once the new polynomial is written down, Vieta reads off its symmetric functions directly, which is usually the point of transforming in the first place

## Why it works
If $y = g(r)$ for each root $r$ of $P$, then the values $r = g^{-1}(y)$ satisfy $P(g^{-1}(y)) = 0$ — substituting the inverse transformation produces a polynomial equation in $y$ whose roots are exactly the transformed values (clear denominators as needed).

## How to use it
Standard dictionary: shift → $P(x-k)$; scale → $P(x/k)$; negate → $P(-x)$ (flips odd coefficients); reciprocate → reverse the coefficient list; square → eliminate the sign via $P(\sqrt x)P(-\sqrt x)$. After transforming, read off the new Vieta sums — that's usually the goal ("find the sum of the reciprocals of the roots": reverse and read one ratio).

## On contests
AIME asks for symmetric functions of transformed roots constantly; transforming the polynomial first is faster and safer than expanding symmetric algebra. Sums like $\sum \frac{1}{1 - r_i}$: substitute $x = 1 - \frac{1}{y}$ or evaluate $\frac{P'(1)}{P(1)}$ — both come from this viewpoint.`,

"periodic-sequences": String.raw`## Key forms
- $x_{n+1}=-\dfrac{1}{x_n}$ — period 2
- $x_{n+1}=\dfrac{1}{1-x_n}$ — period 3
- $x_{n+1}=\dfrac{1+x_n}{1-x_n}$ — period 4, since it is $\tan(\theta+45^\circ)$
- $a_{n+1}=\dfrac{a_n+1}{a_{n-1}}$ (Lyness) — period 5
- $a_{n+1}=a_n-a_{n-1}$ — period 6, a $60^\circ$ rotation
- $x_{n+1}=\dfrac{x_n}{x_{n-1}}$ — period 6, cycling $a,\;b,\;\frac ba,\;\frac1a,\;\frac1b,\;\frac ab$
- $x_{n+1}=\dfrac{1+x_n+x_{n-1}}{x_{n-2}}$ (Todd) — period 8, third order
- $a_{n+1}=|a_n|-a_{n-1}$ — period 9

## Why it works
The state (the last one or two terms) determines the entire future. If the rule is a nice rational map, states often return to their starting value — and the instant a full state repeats, everything after is an exact replay, forcing eventual periodicity. Each one-variable rule is a Möbius map $x\mapsto\frac{ax+b}{cx+d}$, and it cycles exactly when its matrix has finite order (conjugate to a rotation by a rational multiple of $\pi$) — e.g. $\frac{1+x}{1-x}=\tan(\theta+45^\circ)$ has period 4.

The two-term multiplicative rule is the additive one in disguise. Taking logarithms turns $x_{n+1}=\frac{x_n}{x_{n-1}}$ into $y_{n+1}=y_n-y_{n-1}$, whose characteristic equation $t^2-t+1=0$ has roots $e^{\pm i\pi/3}$ — primitive sixth roots of unity, hence period 6. Writing the cycle out confirms it: from $a,b$ the terms run $a,\,b,\,\frac ba,\,\frac1a,\,\frac1b,\,\frac ab$ and then repeat. The direction matters — $x_{n+1}=\frac{x_{n-1}}{x_n}$ gives $t^2+t-1=0$, whose roots are real and not on the unit circle, so that version is not periodic at all and its terms blow up.

Todd's equation $x_{n+1}=\frac{1+x_n+x_{n-1}}{x_{n-2}}$ is the third-order member of the same family as Lyness. It carries two independent invariants — quantities unchanged by the map — and their level sets are closed curves, which is what pins every orbit to period 8 regardless of the starting triple.

## How to use it
Compute terms exactly (fractions, not decimals) until the initial state recurs; the number of steps is the period $p$. Then $a_n$ depends only on $n \bmod p$ — but align the offset carefully, especially with a pre-period. Recognizing one of the canonical maps above hands you the period before you compute.

## On contests
"Find $t_{2020}$" (2020 AIME II #6, period 5-ish after simplification) and endless AMC versions. Contest recursions asking about term two thousand-something are begging you to find a cycle — compute six to ten terms before trying anything clever. The Lyness 5-cycle, the period-6 $a_n-a_{n-1}$ and its multiplicative twin $\frac{x_n}{x_{n-1}}$, Todd's period-8 equation, and the period-9 $|a_n|-a_{n-1}$ are the famous named cases — recognising any of them hands you the period with no computation.`,

"triangle-angle-identities": String.raw`## Why it works
All spring from $C = 180^\circ - A - B$: expand $\tan(A+B) = \tan(180^\circ - C) = -\tan C$ and clear denominators for the tangent identity; the cosine and sine sums follow from sum-to-product plus half-angle conversions, which is where $r$ and $R$ sneak in ($\cos$ sum) and $s$ ($\sin$ sum).

## How to use it
Two directions: (1) given trig data about a triangle's angles, convert to $r$, $R$, $s$ — the geometry; (2) given an equation like $\tan A + \tan B + \tan C = \tan A\tan B\tan C$, recognize it as the definition of angles summing to $180^\circ$ (used both ways on contests). The cotangent identity $\sum \cot A \cot B = 1$ pairs with the Brocard angle formula.

## On contests
AIME trig problems hand you one of these sums and expect the $1 + \frac{r}{R}$ or $\frac{s}{R}$ translation; AMC 12 uses the tangent identity to detect or exploit supplementary structure. Memorize the two headline identities, derive the rest from sum-to-product on demand.`,

"piecewise-graph-counting": String.raw`## Key forms
- the number of solutions of $f(x)=c$ is the number of times the horizontal line $y=c$ crosses the graph, so counting solutions becomes reading a picture rather than solving equations
- each absolute value folds the graph upward about the axis and each subtraction shifts it, producing a piecewise-linear graph whose slopes are always $\pm$ the accumulated factor
- the count changes only when the line passes a corner, so listing the corner heights partitions the values of $c$ into bands of constant answer — build the graph inside out, tracking only corners

## Why it works
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
Never average speeds directly. Set a concrete distance (pick a convenient number like the LCM), compute each leg's time, divide total by total. The $\frac{2v_1v_2}{v_1+v_2}$ shortcut applies only to equal distances; equal times do give the arithmetic mean.

## On contests
A permanent AMC answer-choice trap: 45 sits among the options whenever the answer is 40. Multi-leg versions (three speeds, mixed distance/time information) all fall to total-over-total discipline.`,

"relative-motion": String.raw`## Why it works
Velocities subtract vectorially: in the reference frame of one object, the other moves at the velocity difference, turning a two-body chase into a one-body gap-closing problem. Currents and walkways add a constant drift to the still-medium velocity.

A circular track is the same idea with the gap wrapping around. Two runners starting together are at the same point again exactly when the distance between them, measured along the track, has changed by a whole number of laps. Running the same way, that separation grows at $v_1 - v_2$, so the first meeting is when the faster has run exactly one lap more than the slower — not one lap total, one lap *more*. Running opposite ways the separation closes at $v_1 + v_2$, so they meet when their two distances add to one full lap. After that, meetings repeat at the same interval, and the $k$th meeting is simply $k$ times the first.

## How to use it
Chases: time = initial gap ÷ (speed difference). Meetings: gap ÷ (speed sum). Round trips in a current: upstream and downstream speeds are $v \mp c$, and the round-trip average is below $v$ (harmonic effect). Crossing a river: aim upstream so the along-stream component cancels, or land downstream and use components; the crossing time depends only on the across-stream component.

## On contests
Track problems lean on the lap rule constantly: "two runners start together and next meet after 4 minutes" fixes $v_1 - v_2$ (same way) or $v_1 + v_2$ (opposite), which is usually the missing equation. Trains passing, hands of a clock (relative speed $5.5^\circ$/min), escalator walkers, and the 2022 AIME I river crossing. Choosing the moving frame typically halves the algebra.`,

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

"pairwise-sum-product": String.raw`## Why it works
Expand $(x+y)(y+z)(z+x)$: the degree-3 terms are all six $x^2y$-type monomials plus $2xyz$. Meanwhile $(x+y+z)(xy+yz+zx)$ produces those same six monomials but with $3xyz$. Subtract one $xyz$ and they agree, so $(x+y)(y+z)(z+x) = e_1 e_2 - e_3$ in the elementary symmetric polynomials $e_1, e_2, e_3$.

## How to use it
Whenever $x+y+z$, $xy+yz+zx$, $xyz$ are known — most often as $-\frac{b}{a}, \frac{c}{a}, -\frac{d}{a}$ from a cubic's coefficients via Vieta — any product of the pairwise sums is just $e_1 e_2 - e_3$, no expansion. Read backward, it simplifies a stubborn product of three binomials into symmetric-sum arithmetic. Companion: $(x+y+z)^3 - x^3 - y^3 - z^3 = 3(x+y)(y+z)(z+x)$.

## On contests
The signature AIME setup hands you the three symmetric sums (or a cubic whose roots are $x, y, z$) and asks for $(x+y)(y+z)(z+x)$ or an equivalent product — one substitution and you are done, no messy expansion under time pressure.`,

"antisymmetric-factorization": String.raw`## Why it works
Read the expression as a polynomial in $a$. Substituting $a = b$ makes it vanish, so $(a - b)$ divides it; by the cyclic symmetry $(b - c)$ and $(c - a)$ divide it too. Their product already has degree 3, so the degree-2 sum equals that product times a constant — one test point fixes the constant to $-1$. The degree-3 sum has one degree to spare, and symmetry forces the leftover factor to be $a + b + c$.

## How to use it
Any cyclic expression that dies when two variables coincide factors as $(a-b)(b-c)(c-a)$ times a symmetric polynomial of the leftover degree; write that skeleton, then pin the coefficient with an easy substitution. This turns "factor this cyclic mess" or "show this symmetric sum vanishes" into a two-line argument.

## On contests
Common on AIME and olympiad algebra when a symmetric or cyclic quantity must be factored or shown to vanish. The sign is the classic slip — always sanity-check against $(a,b,c) = (1,2,3)$.`,

"sum-zero-identities": String.raw`## Why it works
Everything follows from the elementary symmetric values $e_1 = a+b+c = 0$, $e_2 = ab+bc+ca$, $e_3 = abc$. Squaring $a+b+c = 0$ gives $a^2+b^2+c^2 = -2e_2$. The factorization $a^3+b^3+c^3 - 3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca)$ loses its first factor, leaving $a^3+b^3+c^3 = 3abc$. Newton's sums with $e_1 = 0$ collapse to $p_k = -e_2\,p_{k-2} + e_3\,p_{k-3}$, which cranks out $p_4 = 2e_2^2$, $p_5 = -5e_2e_3$, $p_7 = 7e_2^2 e_3$ — the source of the clean power-sum ratios.

## How to use it
The instant a problem states or implies $a+b+c = 0$ — three quantities summing to zero, roots of a depressed cubic $t^3 + pt + q$, and so on — reach for $a^3+b^3+c^3 = 3abc$ and $a^2+b^2+c^2 = -2(ab+bc+ca)$; higher powers come from the recurrence. Spotting the hidden zero sum is half the work: the differences $a-b,\, b-c,\, c-a$ always sum to $0$, so this applies to them for free.

## On contests
A recurring AIME move: a symmetric system forces $a+b+c = 0$, after which the requested power sum is a one-liner. Whenever you see "$x, y, z$ with $x+y+z = 0$" or can create it, these identities are the intended shortcut.`,

"reciprocal-power-sums": String.raw`## Why it works
Multiply $s_{n-1} = x^{n-1} + x^{-(n-1)}$ by $t = x + x^{-1}$: the cross terms give $x^n + x^{-n} + x^{n-2} + x^{-(n-2)} = s_n + s_{n-2}$, so $s_n = t\,s_{n-1} - s_{n-2}$. Starting from $s_0 = 2$, $s_1 = t$, this produces $s_2 = t^2 - 2$, $s_3 = t^3 - 3t$, $s_4 = t^4 - 4t^2 + 2$, … — each $s_n$ a degree-$n$ polynomial in $t$ (the Chebyshev/Dickson polynomials).

## How to use it
Given $x + \frac{1}{x}$, climb to any $x^n + \frac{1}{x^n}$ with the two-term recurrence — no need to solve for $x$. The same machine handles $a^n + b^n$ whenever $ab = 1$ (take $t = a+b$), and $2\cos n\theta$ from $2\cos\theta$, since $x = e^{i\theta}$ makes $s_n = 2\cos n\theta$.

## On contests
A frequent AMC/AIME setup: "given $x + \frac{1}{x} = k$, find $x^n + \frac{1}{x^n}$" (or the reverse). The recurrence is faster and safer than repeated squaring/cubing, and it exposes the tie to $\cos n\theta$ that some problems turn on.`,

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
An olympiad tool: it settles many symmetric three-variable inequalities that resist AM–GM/Cauchy, and the $s, q, r$ form combines cleanly with $q^2 \ge 3sr$ and friends. Recognize its equality cases — $x = y = z$ and the degenerate $(k, k, 0)$ — as the tell that Schur (not Muirhead) is intended.`,

"muirheads-inequality": String.raw`## Why it works
Majorization means the exponent vector $(a)$ can be reached from $(b)$ by repeatedly moving two exponents apart ($(b_i, b_j) \to (b_i + \epsilon, b_j - \epsilon)$ with $b_i \ge b_j$). Each such move is a two-variable AM–GM-style smoothing step on the symmetric sum, so the more "spread out" exponent triple dominates. In fact every Muirhead inequality is a positive combination of weighted AM–GMs.

## How to use it
Sort both exponent triples in decreasing order, then check the partial sums: $a_1 \ge b_1$, $a_1 + a_2 \ge b_1 + b_2$, $a_1 + a_2 + a_3 = b_1 + b_2 + b_3$. If all hold, $\sum_{\text{sym}}$ of the $a$-monomial dominates. Two standing warnings: it applies only to full symmetric sums — cyclic sums are not covered, so convert first and watch the factor of $2$ — and both sides must be homogeneous of the same degree (normalize the constraint, e.g. impose $xyz = 1$, to homogenize).

## On contests
The rigorous stamp for "bunching" steps in olympiad solutions: $(3,0,0) \succ (2,1,0) \succ (1,1,1)$ handles most degree-3 comparisons in one line. Citing Muirhead by name is standard on olympiads; on anything below that level, writing out the two or three AM–GMs it encodes is safer and just as fast. Pairs constantly with Schur, which covers exactly the direction Muirhead cannot.`,

"maclaurin-inequality": String.raw`## Why it works
The engine is Newton's inequality $p_k^2 \ge p_{k-1}p_{k+1}$, where $p_k = e_k / \binom{n}{k}$ is the averaged $k$-th elementary symmetric polynomial. It says the sequence $p_k$ is log-concave, and it comes from the fact that $\prod_i (t + x_i)$ has all real roots — so do its derivatives (Rolle), and a real-rooted quadratic slice forces $p_k^2 \ge p_{k-1}p_{k+1}$. Chaining log-concavity and taking $k$-th roots yields Maclaurin's descending chain $p_1 \ge \sqrt{p_2} \ge \cdots \ge \sqrt[n]{p_n}$.

## How to use it
It sits between AM–GM and the heavier symmetric machinery: the two ends are exactly the AM and the GM, while the middle terms give sharper bounds when several elementary symmetric quantities appear together. In practice invoke one link — $p_1 \ge \sqrt{p_2}$ or $\sqrt{p_2} \ge \sqrt[3]{p_3}$ — to relate $\sum x_i$, $\sum x_i x_j$, and $\prod x_i$ more tightly than AM–GM allows.

## On contests
An olympiad-level refinement — rarely needed over AM–GM or Cauchy–Schwarz, but decisive on symmetric inequalities those cannot tighten. Newton's inequality also explains why a real-rooted polynomial has log-concave (hence unimodal) coefficients, a handy lemma in its own right.`

});

Object.assign(window.MATH_DETAILS, {

"sp-substitution": String.raw`## Key forms
- set $s=x+y$ and $p=xy$, and every symmetric expression in $x$ and $y$ becomes a polynomial in $s$ and $p$: $x^2+y^2=s^2-2p$, $x^3+y^3=s^3-3sp$, $(x-y)^2=s^2-4p$
- $x$ and $y$ are then the roots of $t^2-st+p=0$, so they are real exactly when $s^2\ge4p$ — the discriminant is what converts an algebra problem back into a statement about the original variables

## Why it works
Every symmetric polynomial in $x$ and $y$ is a polynomial in the elementary symmetric functions $s = x + y$ and $p = xy$ (the two-variable fundamental theorem of symmetric polynomials). And Vieta runs backwards: knowing $s$ and $p$ means $x$ and $y$ are exactly the roots of $t^2 - st + p = 0$ — no information is lost.

## How to use it
Convert with the ladder $x^2 + y^2 = s^2 - 2p$, $x^3 + y^3 = s^3 - 3sp$, $x^4 + y^4 = (s^2 - 2p)^2 - 2p^2$, and $(x - y)^2 = s^2 - 4p$ (the discriminant — check it's nonnegative if $x, y$ must be real). Solve the resulting system in $s, p$, then factor $t^2 - st + p$. Expressions like $\frac{1}{x} + \frac{1}{y} = \frac{s}{p}$ and $x^2y + xy^2 = sp$ convert just as fast. For three variables, the same collapse uses $e_1, e_2, e_3$ and Newton's sums.

## On contests
The intended route for nearly every symmetric system on AMC/AIME — "given $x + y$ and $x^2 + y^2$, find $x^5 + y^5$" is a pure ladder climb. Also the standard trick for $x + \frac{1}{x} = k$ chains (there $p = 1$, so the ladder needs only $s$). Recognize the trigger: the system doesn't change when $x$ and $y$ swap.`

});

Object.assign(window.MATH_DETAILS, {

"completing-the-square": String.raw`## Key forms
- $x^2+bx+c=\left(x+\frac b2\right)^2+c-\frac{b^2}{4}$ — since $x^2+bx$ is the start of $\left(x+\frac b2\right)^2$, adding and subtracting $\frac{b^2}{4}$ isolates $x$ inside one squared term
- with a leading coefficient, $ax^2+bx+c=a\left(x+\frac{b}{2a}\right)^2+c-\frac{b^2}{4a}$, which reads off the vertex directly and, set to zero, is the derivation of the quadratic formula
- in two variables the same move turns $x^2+y^2+Dx+Ey+F=0$ into centre-radius form, and since a completed square is never negative it is also the standard opening for a minimum or an inequality

## Why it works
$x^2 + bx$ is the start of the expansion of $\left(x + \frac{b}{2}\right)^2 = x^2 + bx + \frac{b^2}{4}$. Adding and subtracting $\frac{b^2}{4}$ turns the quadratic into a perfect square plus a leftover constant, isolating $x$ inside a single squared term.

## How to use it
For $ax^2 + bx + c$, factor the $a$ out of the first two terms first. The completed form $a\left(x + \frac{b}{2a}\right)^2 + \left(c - \frac{b^2}{4a}\right)$ reads off the vertex directly and, set to zero, is the derivation of the quadratic formula. In two variables, completing the square in $x$ and in $y$ converts $x^2 + y^2 + Dx + Ey + F = 0$ into $(x - h)^2 + (y - k)^2 = r^2$ — center and radius at a glance — and classifies the other conics.

## On contests
The go-to for min/max of a quadratic without calculus, for finding a circle's center and radius, and for any "$x^2 + y^2 + \dots$" locus. It also rescues sums of squares: recognizing $a^2 - 2a + \dots \ge 0$ after completing the square is a standard inequality move (see the trivial inequality).`,

"absolute-value-rules": String.raw`## Why it works
$|x|$ is the distance from $x$ to $0$, so $|x - c|$ is the distance from $x$ to $c$. "Within $a$" becomes a two-sided band $-a < x - c < a$; "farther than $a$" becomes two rays. And $\sqrt{x^2} = |x|$ (not $x$) because the principal square root is never negative.

## How to use it
Turn every absolute value into a distance or a case split. $|x - c| = d$ marks the two points $c \pm d$; $|x - c| < d$ is the open interval between them. For equations, $|A| = |B| \iff A = \pm B$ (two cases). For nested absolute values, either peel from the outside via cases or graph and count (see the graphing method). The identity $\sqrt{x^2} = |x|$ prevents the classic sign error when a radical meets a square.

## On contests
Constant on MATHCOUNTS and early AMC: distance interpretations, "sum of distances" setups, and piecewise equations. The frequent trap is forgetting a branch — $|x| > a$ has two rays, and $\sqrt{x^2}$ carries a sign — so name the cases explicitly.`,

"median-minimizes-abs": String.raw`## Key forms
- $\sum_i|x-a_i|$ is minimised when $x$ is a median of the $a_i$ — and when $n$ is even, every point of the whole interval between the two middle values achieves the same minimum
- the reason is a slope count: moving $x$ rightwards changes the sum at rate $\#\{a_i<x\}-\#\{a_i>x\}$, which is negative below the median and positive above it, so the minimum is exactly where the counts balance
- the contrast worth remembering is that $\sum_i(x-a_i)^2$ is minimised at the mean instead, so "which average" depends entirely on whether the penalty is absolute or squared

## Why it works
Sweep $x$ from left to right: the slope of $f(x) = \sum w_i|x - a_i|$ is (total weight of the $a_i$ below $x$) minus (total weight above). It starts at $-\sum w_i$ and jumps up by $2w_i$ as $x$ passes each $a_i$, so $f$ is convex and piecewise-linear. Its minimum is where the slope turns from negative to nonnegative — exactly where the weight below first matches the weight above, i.e. the (weighted) median. In the unweighted even-count case the slope is $0$ across the whole middle interval, so every point there ties.

## How to use it
Never differentiate an absolute-value sum — find the median. Unweighted: sort and take the middle value (or anything between the two middle ones). Weighted: accumulate weights in sorted order until you first pass half the total; a coefficient $w_i$ (or a repeated point) simply counts as weight. The minimum value is then $\sum w_i\,|{\text{median}} - a_i|$, which pairs symmetric terms cleanly. Squared distances instead give the mean — the $L^1$ versus $L^2$ distinction.

## On contests
"Find $x$ minimizing $|x-1| + |x-2| + \cdots + |x-n|$" and its coefficient-weighted cousins are recurring AMC/AIME problems — instant once you spot the median. It also settles "minimize the total distance traveled to stops on a line" word problems.`,

"weierstrass-substitution": String.raw`## Key forms
- $t=\tan\frac\theta2$ turns every trigonometric function of $\theta$ into a rational function of $t$: $\sin\theta=\frac{2t}{1+t^2}$, $\cos\theta=\frac{1-t^2}{1+t^2}$, $\tan\theta=\frac{2t}{1-t^2}$ — so a trigonometric equation becomes a polynomial one
- the same identities parametrise the unit circle rationally, which is why $(1-t^2,\,2t,\,1+t^2)$ generates every Pythagorean triple

## Why it works
Writing $t = \tan\frac{\theta}{2}$ and using the double-angle formulas expresses $\sin\theta = 2\sin\frac{\theta}{2}\cos\frac{\theta}{2}$ and $\cos\theta = \cos^2\frac{\theta}{2} - \sin^2\frac{\theta}{2}$ as rational functions of $t$ after dividing through by $\cos^2\frac{\theta}{2} = \frac{1}{1 + t^2}$. Every trig function of $\theta$ becomes rational in $t$.

## How to use it
Deploy it when a trig equation or expression mixes $\sin\theta$ and $\cos\theta$ in a way that resists identities: substitute, clear denominators, and solve the resulting polynomial in $t$, then untangle $\theta$ from $t = \tan\frac{\theta}{2}$. The same algebra underlies rational parametrizations of the unit circle and the $(1 - t^2, 2t, 1 + t^2)$ Pythagorean-triple family.

## On contests
A niche but decisive olympiad tool for trig equations and for proving rational-point facts about the circle; it's the bridge between "half-angle" identities and Pythagorean triples. Rarely the fastest route on AMC/AIME, where targeted identities usually win, but unbeatable when you genuinely need to rationalize.`,

"partial-fractions": String.raw`## Key forms
- a proper rational function with a factored denominator splits uniquely into one term per factor, and for two distinct linear factors the whole story is $\frac{1}{(x+a)(x+b)}=\frac{1}{b-a}\left(\frac{1}{x+a}-\frac{1}{x+b}\right)$
- the cover-up method finds each coefficient in one step: to get the weight on $\frac{1}{x-r}$, delete that factor and evaluate what remains at $x=r$

## Why it works
A proper rational function with a factored denominator is uniquely a sum of one term per factor. For distinct linear factors the two-term split $\frac{1}{(x+a)(x+b)} = \frac{1}{b-a}\left(\frac{1}{x+a} - \frac{1}{x+b}\right)$ is the whole story; the "$\frac{1}{b-a}$" is exactly what makes the numerators match.

## How to use it
The cover-up method finds each coefficient fast: to get the weight on $\frac{1}{x+a}$, delete that factor and evaluate the rest at $x = -a$. Two big payoffs follow. Telescoping: once a summand splits into $\frac{1}{k} - \frac{1}{k+1}$ (or a wider gap), the sum collapses to its endpoints. Generating functions: decomposing $\frac{P(x)}{\prod(1 - r_i x)}$ turns a rational generating function into a sum of geometric series, giving a closed form for the coefficients (hence for linear recurrences).

## On contests
The engine behind nearly every telescoping-sum problem on AMC/AIME, and the standard method for extracting a closed-form $n$-th term from a rational generating function. Recognizing that a summand wants to be split is often the entire insight.`

});

Object.assign(window.MATH_DETAILS, {

"first-order-recurrence": String.raw`## Why it works
The fixed point $L$ solves $L = rL + d$, so the constant sequence $a_n \equiv L$ satisfies the recurrence exactly. Subtracting it kills the $+d$: $a_n - L = r(a_{n-1} - L)$, which is a pure geometric sequence with ratio $r$. Iterating gives $a_n - L = r^n(a_0 - L)$.

## How to use it
Compute $L = \frac{d}{1-r}$ first — it's the value the process settles at, and often it's the entire answer ("what does the concentration approach?"). Then the deviation from $L$ decays or grows by a factor of $r$ each step. If $|r| < 1$ the sequence converges to $L$ regardless of $a_0$; if $|r| > 1$ it runs away from $L$; if $r = -1$ it oscillates between two values. The degenerate case $r = 1$ has no fixed point and is just arithmetic: $a_n = a_0 + nd$.

Some non-linear first-order rules become this one after a substitution. The reciprocal $b_n = \frac{1}{a_n}$ turns $a_n = \frac{a_{n-1}}{1 + a_{n-1}}$ into $b_n = b_{n-1} + 1$, an arithmetic sequence; $b_n = \log a_n$ converts a multiplicative rule $a_n = a_{n-1}^{\,c}$ into a geometric one. If a rational first-order rule resists both, compute terms and check for periodicity instead.

## On contests
Everywhere: compound interest with deposits, repeated dilution or evaporation, "each round, half the players plus three leave," and expected-value recursions that reduce to one state. Recognizing "geometric plus a constant" and jumping straight to $L$ turns a multi-step simulation into two lines.`,


"tangent-line-trick": String.raw`## Key forms
- a convex function lies above each of its tangent lines, so $f(x)\ge f(a)+f'(a)(x-a)$ — summing this linear lower bound is far easier than handling $f$ directly
- take the tangent at the equality point $a=\frac sn$: the constraint $\sum x_i=s$ makes the linear terms cancel, leaving exactly $\sum f(x_i)\ge n f\!\left(\frac sn\right)$
- the one obligation is verifying $f(x)\ge L(x)$ across the whole allowed range, and the difference almost always factors as a square over something positive, as in $\frac1x-(6-9x)=\frac{(3x-1)^2}{x}$ — if it fails anywhere, fall back to SOS or Jensen

## Why it works
A convex function lies above every one of its tangent lines: $f(x) \ge f(a) + f'(a)(x-a)$ for all $x$. Summing this over $x_1, \dots, x_n$ makes the right side $\sum f(a) + f'(a)\sum(x_i - a)$; if you take the tangent at the equality point $a = s/n$, the constraint $\sum x_i = s$ kills the linear term, leaving exactly the bound $\sum f(x_i) \ge n f(s/n)$ — with equality when all $x_i$ are equal.

## How to use it
Use it on $\sum f(x_i)$ with a fixed sum when you suspect equality at all-variables-equal. (1) Find $a = s/n$. (2) Write the tangent line $L(x) = f(a) + f'(a)(x-a)$. (3) Prove $f(x) \ge L(x)$ on the allowed range — the difference almost always factors as a perfect square times a nonnegative term, e.g. $\frac1x - (6 - 9x) = \frac{(3x-1)^2}{x}$. (4) Sum. If the tangent bound fails somewhere in the domain (common when variables can be large or the function isn't convex throughout), the trick doesn't apply and you fall back to SOS or Jensen.

## On contests
The go-to elementary weapon for symmetric-sum inequalities with a linear constraint, especially where Jensen would work but you want a self-contained proof. It reduces an olympiad inequality to a single-variable square check — clean enough to write out fully under time pressure.`

});

Object.assign(window.MATH_DETAILS, {

"holders-inequality": String.raw`## Why it works
Hölder is $\ell^p$–$\ell^q$ duality. With $\frac1p + \frac1q = 1$, apply weighted AM–GM termwise to $\frac{a_i^p}{\sum a^p}$ and $\frac{b_i^q}{\sum b^q}$ and sum: the total is $1$, which rearranges to $\sum a_i b_i \le (\sum a^p)^{1/p}(\sum b^q)^{1/q}$. The three-sequence form is the same statement with exponents $\frac13 + \frac13 + \frac13 = 1$. Any number of sequences works the same way: with weights $\lambda_j\ge0$ summing to $1$, $\prod_j\big(\sum_i a_{ij}\big)^{\lambda_j}\ge\sum_i\prod_j a_{ij}^{\lambda_j}$, which is the form to reach for when the exponents in a problem are not all equal.

## How to use it
The signature move on cyclic sums. To bound $\sum \frac{a}{b+c}$ below, pair it with two copies of $\sum a(b+c)$ so the Hölder product telescopes: $\bigl(\sum \tfrac{a}{b+c}\bigr)\bigl(\sum a(b+c)\bigr)\bigl(\sum a(b+c)\bigr) \ge (a+b+c)^3$, then bound the denominator. General recipe: choose the sequences and exponents so the right-hand cube (or $k$-th power) is exactly the quantity you want and the left factors are computable. Anywhere Cauchy–Schwarz almost works but leaves an exponent short, Hölder finishes.

## On contests
Olympiad inequalities — cyclic fractions and $\sum \frac{a^k}{\cdots}$ shapes above all. Rarely needed below olympiad level. Track the equality case (proportional sequences) to know whether your bound is tight.`,

"chebyshev-sum-inequality": String.raw`## Why it works
Sum the $n^2$ products $(a_i - a_j)(b_i - b_j) \ge 0$, each nonnegative when the sequences are sorted the same way. Expanding gives $n\sum a_i b_i - (\sum a_i)(\sum b_j) \ge 0$. Opposite ordering makes every factor flip sign, reversing the inequality.

## How to use it
Reach for it when a sum pairs two quantities that rise and fall together (or oppositely) — it's the averaged cousin of Rearrangement: $\frac1n \sum a_i b_i \ge \bigl(\frac1n\sum a_i\bigr)\bigl(\frac1n\sum b_i\bigr)$. Taking $b = a$ recovers $\sum a_i^2 \ge \frac1n(\sum a_i)^2$ (power-mean); more generally it bounds $\sum a_i f(a_i)$ for monotonic $f$.

## On contests
An olympiad tool and a clean lemma inside longer inequality chains. Always confirm the two sequences are sorted consistently first — the direction depends entirely on it.`,

"minkowski-inequality": String.raw`## Why it works
It is the triangle inequality for the norm $\|x\|_p = (\sum |x_i|^p)^{1/p}$: $\|a + b\|_p \le \|a\|_p + \|b\|_p$. For $p = 2$ this is $|\vec u| + |\vec v| \ge |\vec u + \vec v|$ — the straight path beats the bent one. The general case follows from Hölder.

## How to use it
Whenever a sum of square-root (or $p$-th-root) terms appears, read each as a vector length and add the vectors tip to tail. To minimize $\sum \sqrt{x_i^2 + y_i^2}$ with the $\sum x_i$ and $\sum y_i$ fixed, the minimum is $\sqrt{(\sum x_i)^2 + (\sum y_i)^2}$, attained when the little vectors are parallel — the algebraic version of reflecting to straighten a path. It's also the standard proof that coordinate distance satisfies the triangle inequality.

## On contests
The $p = 2$ form is an AIME-level "minimize a sum of hypotenuses" trick and shows up wherever reflection/shortest-path does; the general $\ell^p$ statement is olympiad. Equality means all vectors point the same way.`,

"karamata-inequality": String.raw`## Why it works
Each value of a convex $f$ lies above its tangent line; combining the tangent-line comparisons by Abel (summation-by-parts) with the majorization prefix-sum inequalities yields $\sum f(x_i) \ge \sum f(y_i)$. Convexity is exactly what makes the tangent slopes line up with those partial sums.

## How to use it
First establish majorization: sort both sequences in decreasing order, check that every prefix sum of $(x_i)$ is at least the corresponding prefix sum of $(y_i)$, with equal totals. Then convex $f$ gives $\sum f(x_i) \ge \sum f(y_i)$ (concave flips it). It shines when the extremum sits at an unequal, boundary configuration: $(a,b,c)$ majorizes $(\bar x,\bar x,\bar x)$ recovers Jensen, while $(a+b, 0)$ majorizing $(a, b)$ powers "smoothing" arguments.

## On contests
Olympiad inequalities, especially symmetric ones whose extremum is at a boundary rather than the center — the regime Jensen alone can't reach. Proving the majorization is the real work; the inequality is then automatic.`,

"generalized-binomial-series": String.raw`## Why it works
Taylor-expanding $(1+x)^\alpha$ gives $n$-th coefficient $\frac{\alpha(\alpha-1)\cdots(\alpha-n+1)}{n!} = \binom{\alpha}{n}$. For $\alpha = -k$, $\binom{-k}{n} = (-1)^n\binom{n+k-1}{n}$, and those signs cancel the $(-x)^n$ inside $\frac{1}{(1-x)^k}$, leaving the positive coefficients $\binom{n+k-1}{k-1}$ — the stars-and-bars count of $n$ as an ordered sum of $k$ nonnegative parts. Fractional exponents behave the same way: $\alpha=\tfrac12$ gives $\sqrt{1+x}=1+\frac x2-\frac{x^2}{8}+\cdots$, the standard route to approximating a square root by hand.

## How to use it
This is the dictionary that turns generating functions into numbers. Model unlimited repetition of $k$ item types by $\frac{1}{(1-x)^k}$ and read the $x^n$ coefficient as $\binom{n+k-1}{k-1}$. Multiply such factors (and finite pieces $\frac{1-x^{m+1}}{1-x}$ for bounded supply), expand, and extract the coefficient. Know $\frac{1}{1-x} = \sum x^n$ and $\frac{1}{(1-x)^2} = \sum (n+1)x^n$ cold.

## On contests
The engine behind AIME/olympiad generating-function counts and every "number of nonnegative integer solutions" problem — it is stars and bars, packaged to compose with other generating functions. For formal coefficient extraction, convergence never matters.`,

"cardano-cubic": String.raw`## Why it works
The substitution $x = t - \frac{b}{3a}$ kills the quadratic term, leaving $t^3 + pt + q = 0$. Setting $t = u + v$ with $3uv + p = 0$ turns it into $u^3 + v^3 = -q$ and $u^3 v^3 = -\frac{p^3}{27}$, so $u^3, v^3$ are roots of a quadratic — giving the nested cube-root expression. The term under the inner square root is (up to a constant) the discriminant $\Delta = -4p^3 - 27q^2$.

## How to use it
Depress the cubic, apply the formula, then add $-\frac{b}{3a}$ back. Read the discriminant to predict roots: $\Delta < 0$ → one real root the formula gives directly; $\Delta > 0$ → three real roots but via complex cube roots (casus irreducibilis), where the trig substitution $t = 2\sqrt{-p/3}\cos\theta$ is cleaner; $\Delta = 0$ → a repeated root. In practice, try the rational root theorem and factoring first.

## On contests
Almost never the intended path — contest cubics are designed to factor. Worth knowing it exists (and the discriminant's root count is occasionally handy), but reach for rational roots, Vieta, or a clever substitution before Cardano.`

});

Object.assign(window.MATH_DETAILS, {

"power-mean-inequality": String.raw`## Why it works
$p \mapsto M_p$ is nondecreasing because $x \mapsto x^{p/q}$ is convex for $p > q > 0$ (Jensen applied to $a_i^q$); limiting and sign arguments extend the chain through $p = 0$ (which is the geometric mean) and to negative exponents. All values equal collapses every mean to the same number — the equality case.

## How to use it
Match the two exponents to your data: $M_2 \ge M_1$ compares $\sum a_i^2$ with $(\sum a_i)^2$; $M_1 \ge M_{-1}$ is AM–HM; $M_1 \ge M_0$ is AM–GM. When a problem mixes, say, cubes and first powers, quote the general $M_p \le M_q$ ($p < q$) directly. It's often the cleanest finish after normalizing $n$ or $\sum a_i$.

## On contests
The workhorse behind "compare these symmetric sums" inequalities on AIME and olympiad — it packages the whole QM–AM–GM–HM chain into one statement. Name the specific exponent step you use.`,

"weighted-am-gm": String.raw`## Why it works
It is Jensen for the concave logarithm: $\ln\!\big(\sum w_i a_i\big) \ge \sum w_i \ln a_i = \ln\!\big(\prod a_i^{w_i}\big)$. Rational weights reduce to ordinary AM–GM by repeating terms; arbitrary weights follow by continuity.

## How to use it
Choose weights to produce the exponents you want. To bound a product $\prod a_i^{c_i}$, take weights $w_i \propto c_i$ so the weighted GM is your product and the weighted AM is a sum you control — this is how targeted bounds like $a^3 + a^3 + b^3 \ge 3a^2 b$ are proved. It also proves Young's inequality and, through it, Hölder.

## On contests
Half of olympiad inequality work is picking good weights. Equal weights (plain AM–GM) handle symmetric sums; the weighted form is what unequal exponents demand. Equality iff all $a_i$ are equal.`,

"eisenstein-criterion": String.raw`## Key forms
- $p\mid a_0,\dots,a_{n-1}$, $\;p\nmid a_n$, $\;p^2\nmid a_0$ — the three conditions to check, in that order
- substitute $x\mapsto x+1$ first when the polynomial fails as written — the shift is what makes $1+x+\cdots+x^{p-1}$ yield to the criterion

## Why it works
Reduce mod $p$: the polynomial collapses to $a_n x^n$, so any factorization mod $p$ must hand the entire $x^n$ to the two factors, forcing both constant terms to be divisible by $p$ — hence $p^2 \mid a_0$, contradicting the hypothesis. So no nontrivial integer factorization exists, and by Gauss's lemma none over $\mathbb{Q}$.

## How to use it
Look for a prime dividing every coefficient except the leading one, with $p^2 \nmid a_0$. If none appears, try a shift $x \mapsto x + c$ first: for the cyclotomic $\Phi_p(x) = 1 + x + \cdots + x^{p-1}$, substituting $x + 1$ makes $p$ Eisenstein (the middle binomial coefficients are all divisible by $p$). It only ever proves irreducibility, never the reverse.

## On contests
The standard irreducibility certificate beyond the rational root theorem — mostly olympiad, occasionally an AIME setup ruling out a factorization. Keep the shift trick in mind; the raw criterion often fails until you translate the polynomial.`,

"abel-summation": String.raw`## Why it works
Summation by parts: substitute $a_k = A_k - A_{k-1}$ and reindex, exactly mirroring $\int u\,dv = uv - \int v\,du$. The boundary term $A_n b_n$ minus the sum of $A_k$ against the forward differences $b_{k+1} - b_k$ reconstructs the original sum.

## How to use it
Use it when one factor has a clean partial sum $A_k$ (arithmetic, geometric, binomial) or the other is monotone. Sums such as $\sum k r^k$, $\sum k\binom{n}{k}$, and Dirichlet-type $\sum a_k/k$ all yield. When $b_k$ is monotone the transformed sum has one-signed terms — the mechanism behind the proofs of Chebyshev's and Karamata's inequalities and Abel's convergence test.

## On contests
An olympiad and advanced-AIME tool for sums of products, and for turning an intractable sum into a telescoping or bounded one. The trigger is spotting that one factor telescopes or is monotone.`,

"inverse-trig-identities": String.raw`## Why it works
$\arcsin x + \arccos x = \frac\pi2$ because sine and cosine are cofunctions on the principal ranges. $\arctan x + \arctan\frac1x = \pm\frac\pi2$ because the tangent of the sum blows up and the sign is set by the sign of $x$. The arctan addition formula is tangent-addition read backward, valid only while the true sum stays inside $(-\frac\pi2, \frac\pi2)$; once $xy > 1$ pushes it out, add or subtract $\pi$.

## How to use it
Pin the ranges first: $\arcsin, \arctan \in [-\frac\pi2, \frac\pi2]$ and $\arccos \in [0, \pi]$. For telescoping arctan sums, combine adjacent terms with the addition formula and watch for the $\pm\pi$ correction. For "evaluate $\arctan a + \arctan b + \arctan c$," compute the tangent, then let the ranges choose the right multiple of $\pi$.

## On contests
AMC 12 tests these ranges head-on ("what is $\arcsin(\sin 5)$?"), and AIME uses arctan telescoping. The identities are easy; the branch and range bookkeeping is where the points actually are.`

});

// Detail bodies added for dense medium-importance cards.
Object.assign(window.MATH_DETAILS, {

"sos-method": String.raw`## Key forms
- push the difference into the form $S_a(b-c)^2+S_b(c-a)^2+S_c(a-b)^2$, which is visibly non-negative once every coefficient is — this works because a symmetric expression vanishing at $a=b=c$ naturally reorganises around the squared differences
- when the coefficients are not all non-negative, the ordered test usually rescues it: assuming $a\ge b\ge c$, it suffices that $S_b\ge0$, $S_b+S_a\ge0$ and $S_b+S_c\ge0$
- the $uvw$ partner rewrites everything in $p=a+b+c$, $q=ab+bc+ca$, $r=abc$; with $p$ and $q$ fixed the expression is linear in $r$, so its extremes sit at the boundary, meaning it is enough to check the two shapes $b=c$ and $c=0$
- keep Schur's inequality $p^3+9r\ge4pq$ on hand — it is the standard closer for the residual case neither method kills

## Why it works
Any symmetric expression in $a,b,c$ can be written in $p=a+b+c$, $q=ab+bc+ca$, $r=abc$, and with $p,q$ fixed it is linear — hence monotone — in $r$. So its extreme values sit where $r$ is extremal, and that boundary is exactly where two variables are equal or one is $0$. SOS is the complementary view: a difference that vanishes at $a=b=c$ usually reorganizes into a weighted sum of $(b-c)^2,(c-a)^2,(a-b)^2$, which is visibly nonnegative when the weights are.

## How to use it
Try SOS first: expand $\text{LHS}-\text{RHS}$ and group it as $S_a(b-c)^2+S_b(c-a)^2+S_c(a-b)^2$. If every $S\ge 0$ you are done; if not, use the ordered test — assuming $a\ge b\ge c$, it suffices that $S_b\ge 0$, $S_b+S_a\ge 0$, and $S_b+S_c\ge 0$. If the grouping is ugly, switch to $uvw$: convert to $p,q,r$, fix $p,q$, and verify the inequality only at the two boundary shapes $b=c$ and $c=0$, since the extremum lives there.

## On contests
Olympiad three-variable symmetric inequalities are the home turf: many "prove for positive reals" problems fall to one clean SOS grouping or a two-case $uvw$ boundary check. Keep Schur's inequality $p^3 + 9r \ge 4pq$ on hand to close the stubborn residual case.`,

"max-product-fixed-sum": String.raw`## Why it works
For a fixed sum, AM–GM makes the product largest when the parts are equal, so the ideal part is near $e\approx 2.718$ — and among integers $3$ beats $2$. Two local swaps pin the integer rule: a $1$ is always wasteful (merging it, $1+x \to (x+1)$, raises the product), and three $2$'s lose to two $3$'s (same sum $6$, but $8\lt 9$), so never keep more than two $2$'s.

## How to use it
Write $n = 3q + r$ and read off the split: $r=0$ gives $3^q$; $r=1$ gives $4\cdot 3^{q-1}$ (trade a leftover $1$ and a $3$ for a $4$, or two $2$'s); $r=2$ gives $2\cdot 3^q$. Example: $n=11 = 3+3+3+2$ has product $54$, and $n=10=3+3+4$ gives $36$.

## On contests
"Largest product of positive integers summing to $N$" is a MATHCOUNTS/AMC staple, and the $3$'s rule answers it instantly. The same principle handles the real-number version (all parts equal) and constrained integer variants ("parts at least $2$," etc.).`,

"triangle-square-identities": String.raw`## Why it works
Use $C = \pi-(A+B)$, so $\cos C = -\cos(A+B)$. Substituting into $\cos^2 A+\cos^2 B+\cos^2 C$ and simplifying with product-to-sum collapses it to $1 - 2\cos A\cos B\cos C$ — the star identity. The tangent and cotangent twins come the same way from $A+B+C=\pi$: $\tan A+\tan B+\tan C = \tan A\tan B\tan C$ and $\cot A\cot B+\cot B\cot C+\cot C\cot A = 1$, with half-angle version $\tan\frac A2\tan\frac B2+\tan\frac B2\tan\frac C2+\tan\frac C2\tan\frac A2 = 1$.

## How to use it
When a problem hands you a symmetric combination of $\cos^2$, $\sin^2$, or $\sin\sin\cos$ of a triangle's angles, this identity is often the whole problem — solve for the missing term. The right-triangle test is fast: $\cos^2 A+\cos^2 B+\cos^2 C = 1 \iff$ one angle is $90^\circ$, since then $2\cos A\cos B\cos C = 0$.

## On contests
AIME problems that give $\cos^2$ or $\sin\sin\cos$ relations among a triangle's angles are the target: recognize the identity, then solve. Keep the half-angle twin handy for incircle/excircle setups where the angles are halved.`,

"chebyshev-polynomials": String.raw`## Why it works
Expanding $\cos n\theta$ with angle addition always yields a polynomial in $\cos\theta$ (the odd powers of $\sin\theta$ pair up), and that polynomial is $T_n$. Its recurrence $T_{n+1} = 2x\,T_n - T_{n-1}$ (with $T_0=1$, $T_1=x$) mirrors $\cos(n+1)\theta = 2\cos\theta\cos n\theta - \cos(n-1)\theta$; the second kind $U_n$, with $U_n(\cos\theta) = \frac{\sin((n+1)\theta)}{\sin\theta}$, obeys the same recurrence.

## How to use it
Two moves. First, substitute $x=\cos\theta$ to evaluate stubborn polynomials or nested cosine products: the roots $x_k = \cos\frac{(2k-1)\pi}{2n}$ give exact values and a product of cosines collapses. Second, for "make the largest value as small as possible," invoke the minimax fact: $\frac{1}{2^{n-1}}T_n$ is the monic degree-$n$ polynomial with the least maximum $|\cdot|$ on $[-1,1]$, equioscillating between $\pm\frac{1}{2^{n-1}}$.

## On contests
Iterated maps like $x\mapsto 2x^2-1$ (which is $T_2$) and multiple-angle cosine sums are the recurring AIME/olympiad uses; the minimax property answers the rarer "minimize the peak of a monic polynomial" question. Closely tied to the trig substitution $x=\cos\theta$.`,

"lagranges-identity": String.raw`## Why it works
Expand both sides. The product $\left(\sum a_i^2\right)\left(\sum b_j^2\right) = \sum_{i,j} a_i^2 b_j^2$ splits into the diagonal terms $\sum_i a_i^2 b_i^2$ and the off-diagonal $\sum_{i\ne j} a_i^2 b_j^2$. The squared dot product $\left(\sum a_i b_i\right)^2 = \sum_i a_i^2 b_i^2 + \sum_{i\ne j} a_i b_i a_j b_j$ shares the same diagonal. Subtracting, the diagonals cancel and the off-diagonal remainder pairs up: $a_i^2 b_j^2 + a_j^2 b_i^2 - 2 a_i b_i a_j b_j = (a_i b_j - a_j b_i)^2$ for each pair $i \lt j$. That is the right-hand side.

## How to use it
Because the right side is a sum of squares it is $\ge 0$, which is exactly the Cauchy–Schwarz inequality — and it pins the equality case: every $a_i b_j - a_j b_i = 0$, i.e. the sequences are proportional. It also names the "defect" in Cauchy–Schwarz precisely, useful when you need not just $\le$ but how much slack there is. In three dimensions it is the vector identity $|\mathbf a|^2 |\mathbf b|^2 - (\mathbf a\cdot\mathbf b)^2 = |\mathbf a\times\mathbf b|^2$.

## On contests
The two-term case $(a^2+b^2)(c^2+d^2) = (ac-bd)^2 + (ad+bc)^2$ is the Brahmagupta–Fibonacci identity — the workhorse for sum-of-two-squares problems and complex-number norms. The full identity itself is rarer, but it is the cleanest one-line proof of Cauchy–Schwarz and the tidiest way to argue an equality/proportionality condition.`

});

Object.assign(window.MATH_DETAILS, {

"proportion-properties": String.raw`## Why it works
If every ratio $\frac{a_i}{b_i}$ equals $k$ then $a_i=k\,b_i$, so $\sum a_i=k\sum b_i$ and the pooled ratio $\frac{a_1+\cdots}{b_1+\cdots}$ is again $k$ — that is the addendo property. Componendo, dividendo, and their combination are the same idea applied to $\frac{a+b}{a-b}$.

## How to use it
When several equal ratios (or a single proportion) appear, add numerators over denominators to collapse them to the common value in one step. Use componendo-dividendo — $\frac{a}{b}=\frac{c}{d}\Rightarrow\frac{a+b}{a-b}=\frac{c+d}{c-d}$ — to simplify sum-and-difference forms before cross-multiplying.

## On contests
A MATHCOUNTS/AMC time-saver on ratio and proportion problems; the addendo one-liner beats introducing a parameter, and componendo-dividendo tidies messy proportion equations before you solve.`,

"resultant-discriminant": String.raw`## Why it works
The resultant is the determinant of the Sylvester matrix, which is singular exactly when $f$ and $g$ share a root; equivalently $\operatorname{Res}(f,g)=a_m^{\,n}b_n^{\,m}\prod(\alpha_i-\beta_j)$ vanishes iff some $\alpha_i=\beta_j$. Taking $g=f'$ detects a repeated root, which is the discriminant.

## How to use it
Set $\operatorname{Res}(f,g)=0$ to eliminate a variable between two polynomial equations, and use $\Delta_f$ to test for or force a multiple root (tangency conditions). For a quadratic $\Delta=b^2-4ac$; for a cubic the sign of $\Delta$ counts real roots.

## On contests
Mostly olympiad and advanced algebra; the discriminant is everyday, while the resultant is the systematic elimination tool for two-variable polynomial systems where substitution gets unwieldy.`,

"smoothing-method": String.raw`## Key forms
- replace two unequal variables by their average, keeping the constraint — if this always moves the objective the same way, the extremum must sit where no such move is possible, i.e. where all variables are equal
- push a variable to the boundary instead when the objective moves the other way — convexity decides which of the two directions applies, and the extremum then sits at a boundary configuration rather than at equality

## Why it works
For a symmetric objective under a fixed constraint, moving two unequal variables toward their average (or toward a boundary) changes the objective monotonically by convexity or concavity; iterating drives every variable to be equal or extremal, so the optimum must sit there.

## How to use it
To justify "equality when all variables are equal," show each smoothing step improves the objective without violating the constraint — then the extremum is the all-equal (or boundary) configuration. This is the rigorous backbone under many AM-GM and Jensen guesses.

## On contests
An olympiad inequality technique; when a symmetric max or min "obviously" occurs at equality, smoothing (or its SOS / mixing-variables cousin) is how you prove it rather than assert it.`,

"evenly-spaced-angle-products": String.raw`## Why it works
Writing each sine as complex exponentials turns an equally spaced product into a factorization of $z^n-1$ (or $z^n+1$), which collapses to a single $\sin n\theta$; the constant $\frac{1}{2^{\,n-1}}$ is exactly what that factorization leaves behind.

## How to use it
Spot sines, cosines, or tangents at a common spacing $\frac{k\pi}{n}$ and replace the product with one term: the $n=3$ identity $\sin\theta\sin(60^\circ-\theta)\sin(60^\circ+\theta)=\frac14\sin 3\theta$ is the most common, and $\prod_{k=1}^{n-1}\sin\frac{k\pi}{n}=\frac{n}{2^{\,n-1}}$ evaluates "the product of all those sines."

## On contests
An AIME/olympiad trig gem; recognizing the equal spacing turns an intimidating product into a one-line evaluation.`,

"cot-tan-telescoping": String.raw`## Why it works
Both identities fall out of the double-angle formulas: $\cot\theta-\cot 2\theta=\csc 2\theta$ and $\tan\theta=\cot\theta-2\cot 2\theta$ each rewrite a term as a difference of the same function at $\theta$ and $2\theta$, so a sum over doubling angles cancels internally.

## How to use it
When a sum has terms like $\csc 2^{k}\theta$ or $2^{k}\tan(2^{k}\theta)$, replace each by its cotangent difference; the sum telescopes to $\cot\theta-2^{\,n}\cot(2^{\,n}\theta)$ (or the cosecant analogue), and you take a limit if it is infinite.

## On contests
A recurring AIME/olympiad "evaluate this trig sum" trick; noticing the doubling angle is the signal to telescope with cotangents.`,

"ramanujan-nested-radical": String.raw`## Why it works
A self-referential radical satisfies its own equation: $x=\sqrt{1+x}$ gives $x=\varphi$. Ramanujan's radical unrolls the identity $n+2=\sqrt{1+(n+1)(n+3)}=\sqrt{1+(n+1)\sqrt{1+(n+2)(n+4)}}$, so starting at $n=1$ the whole tower equals $3$.

## How to use it
For an infinitely repeating radical, set it equal to $x$ and solve the fixed-point equation (then check positivity and convergence). For a patterned nested radical, look for a telescoping identity like Ramanujan's that hands each layer a closed value.

## On contests
An AMC/AIME favorite for the golden-ratio radical and a classic olympiad curiosity for Ramanujan's; the "set it equal to $x$" reflex handles most cases.`,

"symmetric-polynomial-strategies": String.raw`## Key forms
- $\prod_i(a-r_i)=\frac{P(a)}{a_n}$ — any product over the roots collapses to a single evaluation of $P$, which is the highest-leverage move available
- $\prod_i(r_i^2+c^2)=\frac{P(ci)\,P(-ci)}{a_n^{2}}$ — the same identity read at complex points, since $r^2+c^2=(r-ci)(r+ci)$; the answer comes out real, which is a useful check
- $\sum_i\frac{1}{a-r_i}=\frac{P'(a)}{P(a)}$ — the logarithmic derivative, which evaluates sums of reciprocals in one step
- Newton's sums turn the $e_k$ into power sums $\sum r_i^k$ — the bridge whenever the target is a sum of powers rather than a product

## Why it works
Permuting the roots permutes the linear factors of $P$ and so leaves the coefficients alone. The theorem is the converse: anything invariant under every permutation of $r_1,\dots,r_n$ can be written, uniquely, as a polynomial in the elementary symmetric functions $e_1,\dots,e_n$. Since Vieta identifies those with the coefficients, a symmetric expression in unknown roots is already determined by data you were handed. The evaluation identities are the same fact in disguise: $P(x) = a_n\prod(x - r_i)$ is an identity in $x$, so substituting any number — real, complex, or another variable — turns a product over the roots into a single value of $P$.

## How to use it
Work down this ladder and stop at the first rung that applies.

- Is the expression symmetric? If swapping any two roots changes it, none of this applies directly — but a symmetric combination of it and its conjugates usually is (for two roots, $u+v$ and $uv$ are symmetric even when $u-v$ is not).
- Read off the $e_k$ from the coefficients with Vieta. Never solve for the roots.
- Is it a sum of powers? Use Newton's sums to climb from the $e_k$ to $p_k = \sum r_i^k$.
- Is it a product over the roots? Evaluate $P$ instead of expanding — the highest-leverage move on the list.
- Otherwise expand into the $e_k$ by hand, using the standard identities ($\sum r_i^2 = e_1^2 - 2e_2$, $\sum_{i\lt j} r_ir_j^2 + \dots = e_1e_2 - 3e_3$, and so on).

Five evaluation tricks do most of the work, and all of them are the same identity $P(x) = a_n\prod(x - r_i)$ read at a well-chosen $x$.

- Plugging a number into $P$ — any product $\prod(a - r_i)$ collapses to $P(a)/a_n$. So $\prod(1 - r_i) = P(1)/a_n$, $\prod(1 + r_i) = (-1)^n P(-1)/a_n$, and $\prod r_i = (-1)^n P(0)/a_n = e_n$. Whenever a problem asks for a product over the roots of something linear in $r_i$, this ends it in one line.
- The complex number evaluation — a quadratic in $r_i$ factors over $\mathbb{C}$, and each factor is again an evaluation. In general $r^2 + c^2 = (r - ci)(r + ci)$, so $\prod_i (r_i^2 + c^2) = \prod_i(r_i - ci)\cdot\prod_i(r_i + ci) = \frac{P(ci)\,P(-ci)}{a_n^{2}}$, the two signs from $\prod(r_i - a) = (-1)^n P(a)/a_n$ cancelling. Setting $c = 1$ recovers the familiar $\prod(r_i^2+1) = P(i)P(-i)/a_n^2$. Any quadratic in $r_i$ yields to the same move once you know its two roots: $\prod(r_i^2 - c^2) = P(c)P(-c)/a_n^2$ needs no complex numbers at all, and $\prod(r_i^2 - r_i + 1)$ goes through the primitive sixth roots of unity. When the evaluation points are complex the answer still comes out real, which is a useful check.
- Substituting to transform the roots — to work with $f(r_i)$ instead of $r_i$, build the polynomial whose roots are the $f(r_i)$ and apply everything above to it: roots $r_i + k$ come from $P(x-k)$, roots $kr_i$ from $P(x/k)$, and roots $1/r_i$ from reversing the coefficient list.
- The logarithmic derivative — differentiating $\ln P$ gives $\sum \frac{1}{x - r_i} = \frac{P'(x)}{P(x)}$, which evaluates sums of reciprocals in one step: $\sum \frac{1}{1 - r_i} = \frac{P'(1)}{P(1)}$, and $\sum \frac{1}{r_i} = -\frac{P'(0)}{P(0)} = \frac{e_{n-1}}{e_n}$.
- Roots of unity filtering — evaluating at the $n$th roots of unity and averaging isolates the coefficients whose index is divisible by $n$, the same evaluation idea aimed at coefficients rather than at roots.

## On contests
This is the organizing idea behind a large share of AIME algebra: the problem hands you a polynomial and asks for something about its roots that would be hopeless to compute directly. The tell is a symmetric expression plus ugly or irrational roots. Ask "is it symmetric?", then "is it a product?" — if it is a product, evaluate $P$ somewhere rather than expanding, and reach for $P(i)P(-i)$ the moment you see $r^2 + 1$. Olympiad use runs the other way as well, proving an integrality or divisibility claim by showing the quantity is a symmetric function of algebraic conjugates and therefore rational.`,

"even-power-sin-cos-sums": String.raw`## Why it works
Write $u=\sin^2\theta$, $v=\cos^2\theta$, so $u+v=1$. Every symmetric expression in $u$ and $v$ is then a polynomial in the single quantity $uv = \sin^2\theta\cos^2\theta = \tfrac14\sin^2 2\theta$.

Squaring the Pythagorean identity gives $u^2+v^2 = (u+v)^2 - 2uv = 1-2uv$, which is the first formula. For the cubes use $u^3+v^3 = (u+v)^3 - 3uv(u+v) = 1-3uv$, which is the second. Substituting $uv=\tfrac14\sin^2 2\theta$ turns $1-2uv$ into $1-\tfrac12\sin^2 2\theta$ and $1-3uv$ into $1-\tfrac34\sin^2 2\theta$.

That also explains the ranges. Since $0\le\sin^2 2\theta\le 1$, the first sum runs from $\tfrac12$ (at $\theta=45^\circ$, where the two terms are equal) up to $1$ (at the axes), and the second from $\tfrac14$ up to $1$.

## How to use it
The moment an expression is symmetric in $\sin^2$ and $\cos^2$, stop expanding and switch to $p = uv$. Any even-power symmetric combination collapses to a polynomial in $p$, and $p=\tfrac14\sin^2 2\theta$ converts it to a single double angle. This is the fastest route to maxima and minima: extremes occur where $\sin^2 2\theta$ is $0$ or $1$, i.e. at the axes or at $45^\circ$, so you never differentiate.

The same substitution handles differences and mixed powers: $\sin^4\theta-\cos^4\theta = (u-v)(u+v) = u-v = -\cos 2\theta$, for instance. Pushing one step further, $\sin^8\theta+\cos^8\theta = 1-\sin^2 2\theta+\tfrac18\sin^4 2\theta$, which shows the pattern does not stop at the sixth power — it just stops being a single correction term.

## On contests
A staple of AMC 12 and early AIME trigonometry, usually disguised: "find the range of", "compute the maximum of", or a constraint like $\sin^4\theta+\cos^4\theta = \tfrac58$ that you must solve for $\theta$. In that last case, $\tfrac58 = 1-\tfrac12\sin^2 2\theta$ gives $\sin^2 2\theta = \tfrac34$ immediately.`,

"cosecant-cotangent-square-sums": String.raw`## Why it works
The whole derivation rests on one identity connecting the roots of $z^n=1$ to cotangents. Let $\omega = e^{2\pi i/n}$. For $k=1,\dots,n-1$ we have $\frac{1}{1-\omega^{k}} = \frac12 + \frac{i}{2}\cot\frac{k\pi}{n}$. (To see it, factor $1-e^{i\varphi} = -2i\,e^{i\varphi/2}\sin\frac{\varphi}{2}$ and take the reciprocal.) So these $n-1$ complex numbers all share the real part $\tfrac12$, and their imaginary parts are exactly half the cotangents we want. Squaring one of them gives $\left(\frac{1}{1-\omega^{k}}\right)^{2} = \frac14 - \frac14\cot^{2}\frac{k\pi}{n} + \frac{i}{2}\cot\frac{k\pi}{n}$, so the real part of $\sum_k (1-\omega^k)^{-2}$ is $\frac{n-1}{4} - \frac14\sum_k\cot^2\frac{k\pi}{n}$. It remains to compute that sum a second way, from the polynomial itself.

The $\omega^k$ are precisely the roots of $P(z) = \frac{z^n-1}{z-1} = 1+z+\cdots+z^{n-1}$, so $\sum_k \frac{1}{z-\omega^k} = \frac{P'(z)}{P(z)}$ and $\sum_k \frac{1}{(z-\omega^k)^2} = \left(\frac{P'}{P}\right)^{2} - \frac{P''}{P}$. Evaluating at $z=1$ needs only $P(1)=n$, $P'(1)=\sum_{j=1}^{n-1} j = \frac{n(n-1)}{2}$ and $P''(1)=\sum_{j=2}^{n-1} j(j-1) = \frac{n(n-1)(n-2)}{3}$, giving $\sum_k \frac{1}{(1-\omega^k)^2} = \frac{(n-1)^2}{4} - \frac{(n-1)(n-2)}{3}$. Setting the two expressions for the real part equal and solving yields $\sum\cot^2 = \frac{(n-1)(n-2)}{3}$. Finally $\csc^2 = \cot^2+1$ adds $n-1$ to the total, and $\frac{(n-1)(n-2)}{3} + (n-1) = \frac{n^2-1}{3}$.

## How to use it
Recognise the shape first: a sum over $k=1,\dots,n-1$ of a trigonometric function of $k\pi/n$ is a sum over the nontrivial $n$th roots of unity in disguise, and the substitution above is the standard way in. The two results are worth storing as a pair, since $\csc^2 = \cot^2+1$ converts either into the other in one line and problems quote both.

The identity $\frac{1}{1-\omega^k} = \frac12+\frac{i}{2}\cot\frac{k\pi}{n}$ is the reusable part. Taking real parts of $\sum\frac{1}{1-\omega^k} = \frac{n-1}{2}$ recovers $\sum\cot\frac{k\pi}{n}=0$, and pushing the same method to fourth powers gives $\sum\csc^4$, the next sum in the family.

## On contests
Standard AIME fare whenever a problem asks for a closed form of $\sum\csc^2$ or $\sum\cot^2$ at equally spaced angles, and the engine behind several $\sum 1/\sin^2$ evaluations. The same roots-of-unity-to-cotangent bridge is how the Basel sum $\sum 1/k^2 = \pi^2/6$ is proved by elementary means, squeezing $\cot^2$ against $\csc^2$.`,

"shifted-polynomial-construction": String.raw`## Key forms
- if $f$ takes the same value $k$ at $a_1,\dots,a_m$, then $f(x)-k$ vanishes at all of them, so $f(x)=c\prod_i(x-a_i)+k$ — the values are not roots of $f$, but they are roots of the shifted polynomial
- nothing in that argument needs $k$ constant: if $f$ agrees with any polynomial $g$ at those points, then $f(x)=\left(\prod_i(x-a_i)\right)Q(x)+g(x)$, and the case of $g$ linear is exactly the remainder mod a quadratic
- degrees control what is left over, since $\deg Q=\deg f-m$: once you are given as many equal values as the degree, only the leading coefficient remains unknown and one more data point fixes it

## Why it works
It is the factor theorem applied to the right polynomial. The values themselves are not roots of $f$, so $f$ has no factorization you can read off directly. But $h(x) = f(x) - k$ has the same degree and the same leading coefficient as $f$, and $h(a_1) = \cdots = h(a_m) = 0$. Every one of those points is now a genuine root, so $h$ carries the factors $(x-a_i)$, and $f(x) = h(x) + k$ recovers the shifted form.

Nothing in that argument used the fact that $k$ is a constant. If $f$ agrees with any polynomial $g$ at $a_1,\dots,a_m$ — the same value at each point is just $g$ constant — then $h = f - g$ vanishes at all of them, so $h(x) = \left(\prod_i (x-a_i)\right)Q(x)$ and
$f(x) = \left(\prod_i (x-a_i)\right)Q(x) + g(x)$.
The two familiar cases are $g$ constant (equal values) and $g$ linear (two known values on a line), and the linear case is exactly the statement that the remainder of $f$ mod $(x-a)(x-b)$ is the line through the two data points. Degrees still control what is left: $\deg Q = \deg f - m$, so once $m$ reaches $\deg f$ the quotient is a constant and only the leading coefficient remains unknown.

Counting degrees tells you how much is left to determine. If $f$ has degree $n$ and you are handed $n$ points where it takes the same value $k$, then $g$ is a degree-$n$ polynomial with $n$ known roots, so $g(x) = c(x-a_1)\cdots(x-a_n)$ exactly, and only the leading coefficient $c$ is unknown. One further piece of data — another value, or the leading coefficient itself — finishes the job. With fewer known points than the degree, the leftover roots stay as unknowns to be carried along, which is why a cubic with two equal values is written $c(x-a)(x-b)(x-q) + k$.

## How to use it
Read the problem for repeated outputs. Whenever the same number appears twice or more on the right-hand side, subtract it and count how many roots that buys you against the degree.

- Set $g(x) = f(x) - k$ and write down $g$'s known linear factors.
- Compare $\deg f$ with the number of known roots: the shortfall is how many unknown roots you must carry.
- Restore $f(x) = c\prod(x - a_i) + k$ and use any remaining condition to solve for $c$ and the unknowns.
- Answer whatever was asked by evaluating this form, never by expanding.

When the given values are not all equal, do not give up on the method — subtract whatever polynomial does match them. Two different values $f(a) = A$, $f(b) = B$ lie on a unique line $\ell$, and $f(x) - \ell(x)$ vanishes at both points, so $f(x) = (x-a)(x-b)Q(x) + \ell(x)$; that is the remainder-mod-a-quadratic statement of the factor theorem, reached from the other direction. Three points give a unique quadratic to subtract, and so on. The trick is choosing the simplest $g$ that fits the data: if the values follow an obvious pattern, such as $f(i) = i^2$ or $f(i) = 1/i$, subtract that pattern (clearing denominators first if needed) and the roots appear.

## On contests
A recurring AIME setup: "$f$ is a cubic with $f(1) = f(3) = f(5) = 10$ and $f(0) = 4$; find $f(6)$." Subtracting $10$ gives three roots, so $f(x) = c(x-1)(x-3)(x-5) + 10$, and $f(0) = 4$ forces $c$ immediately. The tell is a list of inputs sharing one output, or a value repeated across a table. Expanding is almost always the wrong move — the shifted form answers the question directly.`,

"forced-difference-of-squares": String.raw`## Key forms
- $X^2-Y^2=(X-Y)(X+Y)$ — the shape to force; add and subtract whatever the square is missing
- compare the actual middle term with the $2XY$ a perfect square would need — the gap is exactly what you add and subtract
- $x^4+x^2+1=(x^2+1)^2-x^2$ — it factors only when that leftover is itself a square, which is why $x^4+3x^2+1$ does not
- $a^4+4b^4=(a^2+2b^2)^2-(2ab)^2$ — the Sophie Germain identity, the same move with $Y=2ab$

## Why it works
A quartic with no linear terms almost forms a perfect square. In $x^4 + x^2 + 1$ the outer terms $x^4$ and $1$ are the squares of $x^2$ and $1$, and a genuine square $(x^2+1)^2$ would need a middle term of $2x^2$. There is only $x^2$, so the expression is $(x^2+1)^2$ short by exactly $x^2$. Adding and subtracting that shortfall changes nothing but rewrites the expression as $(x^2+1)^2 - x^2$, and a difference of two squares always factors.

The same accounting explains Sophie Germain. For $a^4 + 4b^4$, the outer terms are the squares of $a^2$ and $2b^2$, and a perfect square would need the cross term $2\cdot a^2\cdot 2b^2 = 4a^2b^2$. It is missing entirely, so add and subtract it: $a^4 + 4b^4 = (a^2+2b^2)^2 - 4a^2b^2 = (a^2+2b^2)^2 - (2ab)^2$. There is nothing special about the constant $4$ — it is chosen precisely so the leftover $4a^2b^2$ is itself a perfect square, which is why $a^4 + 4b^4$ factors while $a^4 + b^4$ does not.

## How to use it
Work in three steps, and check the last one before committing.

- Identify the two outer terms as squares of $X$ and $Y$, so the target perfect square is $(X+Y)^2$.
- Compute the cross term $2XY$ the square would need, and compare it with the middle term you actually have. The difference $Z$ is what you add and subtract.
- The expression becomes $(X+Y)^2 - Z$. It factors only if $Z$ is a perfect square, so verify that before going further.

That last check is the whole method in miniature: $x^4 + x^2 + 1$ works because the shortfall is $x^2$, while $x^4 + 3x^2 + 1$ leaves a shortfall of $-x^2$, so you instead group toward $(x^2-1)^2$ and pick up $5x^2$, which is not a square — that quartic is irreducible over the rationals.

## On contests
The reflex to train is "an even-degree polynomial with a gap in the middle wants to be a difference of squares." It cracks $n^4+4$ composite problems, factors quartics that look prime, and turns many AIME algebraic-manipulation steps into one line. When a factorization is demanded and no rational root exists, this is usually what is wanted.`,

"log-substitution": String.raw`## Key forms
- set $u=\log_b x$, so $x=b^{\,u}$ — an equation built from $\log x$ by adding, multiplying and raising to powers is a polynomial in that single quantity, and naming it makes the polynomial visible
- when the bases and arguments are swapped, set $t=\log_a b$ instead, since $\log_b a=\frac1t$ turns the equation into a rational one in $t$
- convert back with $x=b^{\,u}$ and test every candidate in the original equation, because $u$ ranges over all reals while the original may require a positive argument

## Why it works
Logarithms obstruct algebra because $\log$ of a sum does not simplify, but they behave perfectly under products and powers. So an equation built from $\log x$ by adding, multiplying, and raising to powers is a polynomial in the single quantity $\log x$ — it only looks transcendental. Naming that quantity $u$ makes the underlying polynomial visible, and since $u \mapsto b^{\,u}$ is a bijection from $\mathbb{R}$ onto the positive reals, each root $u$ corresponds to exactly one candidate $x = b^{\,u}$.

The base-swap version works for the same reason. If $t = \log_a b$ then $\log_b a = \frac1t$, so an equation mixing $\log_a b$ with $\log_b a$ is a rational equation in $t$ — clearing denominators gives a polynomial, usually a quadratic.

## How to use it
Look for a repeated logarithmic block, then name it.

- Every $\log$ has the same base and argument: set $u = \log_b x$ and rewrite. Terms like $\log_b x^3$ become $3u$ and $\log_b\frac{1}{x}$ becomes $-u$, so the equation collapses to a polynomial in $u$.
- The bases and arguments are swapped: set $t = \log_a b$, replace $\log_b a$ by $\frac1t$, and clear denominators.
- The unknown appears in an exponent as well as inside a log, as in $x^{\log_b x} = c$: take $\log_b$ of both sides first, which produces $(\log_b x)^2$, then substitute.
- Several logs of different bases: convert to one base first, which usually reveals a single repeated block.

Finish in two steps that are easy to skip. Convert back with $x = b^{\,u}$ for every root, and test each candidate in the original equation — the substitution can introduce roots that violate the domain, since $u$ ranges over all reals while the original may require a positive argument or a base away from $1$.

## On contests
An AMC 12 and AIME staple: log equations are engineered so that one substitution turns them into a quadratic, and the answer is often the product or sum of the roots, which Vieta hands you in $u$ before you even convert back. If the question asks for the product of the solutions in $x$, note that $x_1x_2 = b^{\,u_1+u_2}$, so the sum of the roots in $u$ is exactly what you need. Systems of logs behave the same way — substituting one variable per log turns them into linear systems.`,

"normalization": String.raw`## Key forms
- if an expression is homogeneous, meaning $f(ta,tb,tc)=t^df(a,b,c)$, then only the ratios of the variables matter, so you may fix one scale-sensitive quantity for free — set $a+b+c=1$, or $abc=1$, or one length to $1$, whichever removes the most clutter
- the reverse move is homogenising: given a constraint, multiply the lower-degree terms by powers of it until every term has the same degree, which is what lets Muirhead and Schur apply to a constrained inequality
- check homogeneity before normalising, since on a non-homogeneous expression the scaling changes the two sides differently and the argument is simply invalid

## Why it works
An expression is homogeneous of degree $d$ if replacing $(a, b, c)$ by $(ta, tb, tc)$ multiplies it by $t^d$; an inequality between two degree-$d$ expressions is therefore unchanged by that scaling. So only the ratios of the variables carry information, and you may fix any one scale-sensitive quantity — the sum, the product, or a single variable — at a convenient value. This removes a degree of freedom at no cost, because any general point can be scaled onto your normalisation and scaled back afterwards.

## How to use it
Confirm homogeneity first: both sides the same degree, or degree $0$ for a pure ratio. Then pick the normalisation that simplifies the most — $a+b+c=1$ for symmetric sums, $abc=1$ when the constraint is multiplicative, or a key length set to $1$ in geometry. Solve the constrained problem and the general case follows by scaling.

The dual move is worth as much. Given a constraint such as $a+b+c=1$, multiply the lower-degree terms by the appropriate power of $(a+b+c)$ so that every term has the same degree; this is exactly what lets tools requiring homogeneous symmetric sums, like Muirhead and Schur, apply to a constrained inequality.

## On contests
The standard opening move for olympiad inequalities — normalise, then apply AM-GM, Cauchy, or a bunching argument to the simpler form. On AIME it appears as "assume the perimeter is $1$" or "set the circumradius to $1$" to strip a nuisance parameter before computing. The only discipline required is checking homogeneity first; applied to a non-homogeneous expression the whole argument collapses.`,

"sqrt-approximation": String.raw`## Key forms
- $\sqrt{a^2+b}\approx a+\frac{b}{2a}$ — the first-order estimate, and always an overestimate
- $\sqrt{a^2+b}\approx a+\cfrac{b}{2a+\cfrac{b}{2a}}$ — one more turn of the same recursion, typically good to four or five digits
- $a+\frac{b}{2a+1}\le\sqrt{a^2+b}\le a+\frac{b}{2a}$ — a rigorous bracket whenever $0\le b\le 2a+1$, with equality at the ends
- $x_{n+1}=\frac12\left(x_n+\frac{N}{x_n}\right)$ — the Babylonian iteration, which roughly doubles the correct digits each step

## Why it works
Set $x=\sqrt{a^2+b}$. Then $x^2-a^2=b$ factors as $(x-a)(x+a)=b$, so $x=a+\frac{b}{a+x}$ — an exact self-referential identity, not an approximation.

Everything follows from feeding that identity back into itself. Replacing the $x$ in the denominator by $a$ gives $a+\frac{b}{2a}$; replacing it instead by $a+\frac{b}{2a}$ gives $a+\cfrac{b}{2a+b/(2a)}$, and continuing forever produces the periodic continued fraction $\sqrt{a^2+b}=a+\cfrac{b}{2a+\cfrac{b}{2a+\cdots}}$.

The bracket is a two-line check. Squaring $a+\frac{b}{2a}$ gives $a^2+b+\frac{b^2}{4a^2}$, which exceeds $a^2+b$, so that side is always too big. Squaring $a+\frac{b}{2a+1}$ and comparing reduces to $b\le 2a+1$, so the lower estimate is valid exactly on that range — and both become exact at $b=0$ and $b=2a+1$, where the root is $a$ and $a+1$.

## How to use it
Pick $a=\lfloor\sqrt N\rfloor$, so $b=N-a^2$ is small, then read off whichever form the question needs. For $\sqrt{1000}$ take $a=31$ and $b=39$: the first-order value is $31+\frac{39}{62}\approx31.629$, and one more step gives $31+\frac{39}{62.629}\approx31.6227$ against a true $31.62278$.

The bracket is the form to use when a problem asks you to prove an inequality or to name the integer nearest a root, because it certifies the answer instead of merely suggesting it. Keeping $b$ genuinely small matters — the error grows like $\frac{b^3}{a^5}$, so choosing $a$ as the nearest integer rather than a convenient round number is what keeps the estimate sharp.

To compare two surds, do not approximate at all if you can avoid it: square both sides, or compare $\sqrt m-\sqrt n$ with $\frac{m-n}{\sqrt m+\sqrt n}$, which is exact and usually decides the question immediately.

## On contests
Estimation questions ("which of these is closest to $\sqrt{2024}$"), floor-of-a-root problems, and any AMC question where the answer choices are far apart and a two-second estimate eliminates four of them. It also settles the "is $\sqrt N$ closer to $a$ or $a+1$" question outright, since the midpoint corresponds to $b=a+\frac14$.`,
"double-summation": String.raw`## Key forms
- $\sum_i\sum_j a_{ij}=\sum_j\sum_i a_{ij}$ — the order never matters for a finite double sum, so sweep whichever index is easier
- $\sum_i\sum_j f(i)g(j)=\left(\sum_i f(i)\right)\left(\sum_j g(j)\right)$ — a separable summand splits into two independent one-variable sums
- $\sum_{i=1}^{n}\sum_{j=i}^{n}a_{ij}=\sum_{j=1}^{n}\sum_{i=1}^{j}a_{ij}$ — over a triangular region, swapping rewrites the inner limits rather than removing them
- $\sum_{i\ne j}a_ia_j=\left(\sum_i a_i\right)^2-\sum_i a_i^2$, so $\sum_{i\lt j}a_ia_j$ is half of it — the standard route into a symmetric pair sum
- $\sum_{n\le N}\sum_{d\mid n}f(d)=\sum_{d\le N}f(d)\left\lfloor\frac Nd\right\rfloor$ — swapping a divisor sum counts multiples instead of divisors

## Why it works
A double sum is a single sum over a set $S$ of index pairs. Addition is commutative and associative, so for a finite $S$ the total is independent of the order in which the pairs are visited — the two nested sums are just two different itineraries through the same set.

That is why swapping is always legal but the limits usually change: the inner bound describes the slice of $S$ at a fixed outer index, and slicing a triangle by rows is not the same as slicing it by columns. Writing out the region as a set, $\{(i,j):1\le i\le j\le n\}$, makes the new limits mechanical to read off.

The separable case factors because $\sum_i\sum_j f(i)g(j)=\sum_i f(i)\sum_j g(j)$, and the inner sum no longer depends on $i$, so it comes out as a constant. The pair identity is the same idea run backwards: $(\sum a_i)^2$ expands into all $n^2$ ordered pairs, and subtracting the $n$ diagonal terms $a_i^2$ leaves exactly the off-diagonal ones.

## How to use it
Before manipulating anything, write down the index region as a set of conditions. Almost every error in this area is a limit error, and almost every one is caught by checking a small case such as $n=3$ by hand.

Swap when the inner sum is hard but its transpose is easy — the classic sign is an inner limit that depends on the outer index. Swapping $\sum_{n\le N}\sum_{d\mid n}$ turns "for each $n$, list its divisors" into "for each $d$, count its multiples", which replaces a factorisation problem with a floor function.

Factor when the summand is a product of a function of $i$ and a function of $j$; recognising separability is what collapses a double sum into the product of two known series. And when the summand is symmetric, use $\sum_{i\lt j}a_ia_j=\frac12\left[(\sum a_i)^2-\sum a_i^2\right]$ rather than expanding, since the elementary symmetric functions are usually what a problem hands you.

The other direction is worth remembering too: turning a single sum into a double one by writing $i=\sum_{k=1}^{i}1$ lets you swap and re-sum, which is how $\sum i\,a_i$ becomes $\sum_k\sum_{i\ge k}a_i$ and how Abel summation is derived.

## On contests
AIME algebra and number theory both lean on this — divisor-sum swaps, sums over $i\lt j$ that reduce to $e_1$ and $p_2$, and grid sums where the summand factors. It pairs naturally with telescoping, since after a swap the inner sum is often a telescope.`,
});
