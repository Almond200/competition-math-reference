// Extended detail-page write-ups for Algebra, keyed by formula id.
window.MATH_DETAILS = window.MATH_DETAILS || {};

Object.assign(window.MATH_DETAILS, {

"quadratic-formula": String.raw`
## Why it works
Completing the square turns any quadratic into a square equal to a number, and a square equal to a number is solved by taking a square root.

Divide $ax^2 + bx + c = 0$ by $a$, which is allowed because $a \ne 0$, to get $x^2 + \frac bax + \frac ca = 0$. The first two terms are almost a perfect square: $$\left(x + \frac{b}{2a}\right)^2 = x^2 + \frac bax + \frac{b^2}{4a^2},$$ which is short only the constant $\frac{b^2}{4a^2}$.

Adding that constant to both sides and moving $\frac ca$ across gives $$\left(x + \frac{b}{2a}\right)^2 = \frac{b^2}{4a^2} - \frac ca = \frac{b^2 - 4ac}{4a^2}.$$ Taking square roots, $x + \frac{b}{2a} = \pm\frac{\sqrt{b^2 - 4ac}}{2a}$, and subtracting $\frac{b}{2a}$ gives the formula.

{{figure:complete-square}}

The figure shows where the name comes from. The expression $x^2 + px$ is a square of side $x$ with two strips, $x$ by $\frac p2$, attached along two sides. Filling the missing corner, a square of area $\frac{p^2}{4}$, completes a square of side $x + \frac p2$. In the derivation above, $p = \frac ba$.

The discriminant is the numerator on the right-hand side. A square of a real number cannot be negative, so real solutions need $b^2 - 4ac \ge 0$; when it is $0$ both signs give the same root, and when it is positive they give two different ones.

## How to use it
Before grinding through the formula, look for a shortcut. If the quadratic factors, the roots are immediate, and if the question asks only for the sum or product of the roots, [[vietas-quadratic|Vieta's formulas]] give them straight from the coefficients: $$r_1 + r_2 = -\frac ba, \qquad r_1r_2 = \frac ca.$$

What makes the discriminant worth more than the formula is that it answers questions without solving anything. Whether the roots are real, equal, rational or integers is decided by $\Delta$ alone, so a question about the nature of the roots never needs the roots, and an integrality question becomes "when is $\Delta$ a perfect square", which is a Diophantine problem rather than an algebraic one.

[[tangency-condition|Tangency]] is the same idea: a line touches a parabola exactly when substituting one into the other gives a quadratic with $\Delta = 0$.

## On contests
Almost never alone — 3 of its 32 problems — because it is the step that finishes a setup rather than the setup itself. Its partners say what those setups are: [[pythagorean-theorem|Pythagoras]] (4 problems), [[similar-figures-ratios|similar triangles]] (3) and [[coordinate-bash|coordinates]] (3), all geometry that reduces to one quadratic in one unknown.

Two shapes recur. "For how many integer $k$ does this quadratic have rational roots" is perfect-square discriminant analysis. And tangency is $\Delta=0$: substituting a line into a circle or parabola and setting the discriminant to zero settles contact problems with no calculus, which is why [[tangency-condition|unique solution implies tangency]] is the same idea under another name.
`,

"vietas-quadratic": String.raw`
## Why it works
A quadratic with roots $r$ and $s$ is $a(x - r)(x - s)$, and multiplying that out shows the sum and the product of the roots sitting in the coefficients.

Expand: $$a(x - r)(x - s) = ax^2 - a(r + s)x + ars.$$ Matching this with $ax^2 + bx + c$ term by term gives $-a(r + s) = b$ and $ars = c$, so $r + s = -\frac ba$ and $rs = \frac ca$. The factored form exists for every quadratic once complex roots are allowed, so the formulas hold whether the roots are real or not. The same expansion at higher degree gives [[vietas-general|Vieta's formulas in general]].

The reverse direction is the same identity read the other way. If two numbers have sum $p$ and product $q$, then $(x - r)(x - s) = x^2 - px + q$, so they are exactly the two roots of that quadratic.

## How to use it
Compute symmetric expressions of roots without finding the roots: $r^2 + s^2 = (r+s)^2 - 2rs$, $\frac{1}{r} + \frac{1}{s} = \frac{r+s}{rs}$, $|r - s| = \frac{\sqrt{\Delta}}{|a|}$, the [[quadratic-formula|discriminant]] again. Also in reverse: numbers with known sum $s$ and product $p$ are roots of $x^2 - sx + p = 0$.

## On contests
Constant at AMC level and a routine step on AIME: 14 problems are tagged here, 2 of them solved by it alone, and its partners are scattered, because it is the step that turns roots into coefficients inside many different setups, from [[log-substitution|log substitutions]] to [[casework-method|casework]]. The reverse direction cracks systems like $x + y = 7$, $xy = 12$ instantly. For power sums of the roots beyond the second, [[newtons-sums|Newton's sums]] take over.
`,

"vietas-general": String.raw`
## Why it works
A polynomial with roots $r_1, \ldots, r_n$ can be written as $a_n(x - r_1)(x - r_2)\cdots(x - r_n)$, and multiplying that product out shows exactly which combination of the roots lands in front of each power of $x$.

Try degree two first. $(x - r)(x - s) = x^2 - (r + s)x + rs$, so the middle coefficient is minus the sum of the roots and the constant is their product. Degree three follows the same pattern, $$(x - r)(x - s)(x - t) = x^3 - (r + s + t)x^2 + (rs + rt + st)x - rst.$$ The signs alternate because each root enters with a minus sign attached, and a product of $k$ roots carries $k$ of them.

When the leading coefficient is not $1$, divide by it first. The polynomial $$x^n + \frac{a_{n-1}}{a_n}x^{n-1} + \cdots + \frac{a_0}{a_n}$$ has the same roots, which is why every formula is a coefficient divided by $a_n$.

## Full proof
Over the complex numbers every polynomial of degree $n$ has $n$ roots counted with multiplicity, by [[fundamental-theorem-algebra|the fundamental theorem of algebra]], so $a_nx^n + \cdots + a_0 = a_n(x - r_1)\cdots(x - r_n)$.

Expand the right-hand side. Each term of the expansion is made by choosing, from every one of the $n$ brackets, either its $x$ or its $-r_i$, and multiplying the choices together. A choice that takes $-r_i$ from the brackets in a set $S$ of size $k$, and $x$ from the other $n - k$, contributes $(-1)^k\left(\prod_{i \in S} r_i\right)x^{n-k}$.

Collecting every choice with the same $k$, the coefficient of $x^{n-k}$ is $(-1)^k e_k$, where $e_k$ is the sum of $\prod_{i \in S} r_i$ over all $\binom{n}{k}$ sets $S$ of size $k$.

Comparing the coefficients of $x^{n-k}$ on the two sides gives $a_{n-k} = (-1)^k a_n e_k$, that is, $e_k = (-1)^k\frac{a_{n-k}}{a_n}$. The cases $k = 1$, $k = 2$ and $k = n$ are the sum, the sum of pairwise products, and the product.

For a monic quartic $x^4 + bx^3 + cx^2 + dx + e$ this reads $\sum r_i = -b$, $\sum_{i \lt j} r_ir_j = c$, $\sum_{i \lt j \lt \ell} r_ir_jr_\ell = -d$ and $r_1r_2r_3r_4 = e$.

## How to use it
Any symmetric expression in the roots can be rebuilt from the $e_k$. The two used most are $$\sum r_i^2 = e_1^2 - 2e_2, \qquad \sum \frac{1}{r_i} = \frac{e_{n-1}}{e_n}.$$ The first comes from squaring the sum of the roots and removing the cross terms, and the second from putting the reciprocals over the common denominator $r_1r_2\cdots r_n$. For higher powers, [[newtons-sums|Newton's sums]] do the bookkeeping.

The point of the relations is that they give you the roots' symmetric functions without the roots, and for most questions that is all you need. A question about $\sum r_i$, $\sum r_i r_j$ or $\prod r_i$ is answered by reading coefficients; a question about $\sum r_i^2$ or $\sum \frac1{r_i}$ becomes one of those after one identity. Solving the polynomial is not just unnecessary, it is usually impossible, which is the real reason the tool exists.

When the expression is not symmetric, transform the polynomial instead, so that the question becomes a symmetric one about new roots. If $p$ has roots $r_i$, then the polynomials $$p(x - c), \qquad p\left(\tfrac{x}{k}\right), \qquad x^np\left(\tfrac{1}{x}\right)$$ have roots $r_i + c$, $kr_i$ and $\frac{1}{r_i}$; the last is $p$ with its coefficients reversed, and needs no root to be $0$. Building the polynomial for the new roots turns a hard question about the old ones into coefficient bookkeeping.

## On contests
AIME's favorite polynomial tool, and rarely alone: 3 of 31. Its most frequent companion is [[conjugate-root-theorems|the conjugate root theorems]] (5 problems), which is the standard pairing, since the conjugate rule pins down which roots must occur together and Vieta then converts that structure into coefficients.

The trigger is a question about the roots that never asks for a root. Whenever that happens, stop trying to factor and start writing symmetric functions; [[newtons-sums|Newton's sums]] take over once the powers climb past the second.
`,

"fundamental-theorem-algebra": String.raw`## Why it works
The analytic core is that every non-constant complex polynomial has at least one root (provable via Liouville's theorem, a winding-number argument, or a minimum-modulus argument). Once you have one root $r$, divide out $(x - r)$ to drop the degree by one and repeat; after $n$ steps you have peeled off $n$ linear factors, $P(x) = a_n\prod (x - r_k)$, with exactly $n$ roots counted by multiplicity.

## How to use it
It is the license behind "a degree-$n$ polynomial has $n$ roots," which underwrites [[vietas-general|Vieta's formulas]], partial fractions, and all root counting. Two corollaries do heavy lifting: a polynomial of degree $\le n$ that vanishes at $n+1$ points is identically zero (the standard way to prove a polynomial identity), and $n+1$ values pin a polynomial down uniquely ([[lagrange-interpolation|Lagrange interpolation]]). Over $\mathbb{R}$, pairing conjugate roots yields real linear and irreducible-quadratic factors — hence every odd-degree real polynomial has a real root.

## On contests
Usually invoked implicitly: knowing the exact root count sets up Vieta, and the "agree at enough points $\Rightarrow$ identical" corollary cracks many AIME polynomial and functional-equation problems. The conjugate-pairing consequence is a common parity/real-root argument.`,

"factor-remainder-theorem": String.raw`
## Why it works
Divide $P(x)$ by $x - a$. The remainder has degree less than $1$, so it is a constant $r$, and $$P(x) = (x - a)Q(x) + r.$$ Evaluating at $x = a$ kills the first term and leaves $r = P(a)$. The factor theorem is the case $P(a)=0$, and dividing by a degree-$k$ polynomial leaves a remainder of degree less than $k$, which is why a quadratic divisor leaves a line, pinned down by its values at the two roots.

The integer statement is the same theorem read over $\mathbb{Z}$. Apply the factor theorem to $P(x) - P(b)$: it vanishes at $x = b$, so $P(x) - P(b) = (x-b)Q(x)$ with $Q$ having integer coefficients whenever $P$ does. Substituting $x = a$ gives $$P(a) - P(b) = (a - b)Q(a),$$ and $Q(a)$ is an integer, so $(a-b) \mid P(a) - P(b)$. Equivalently, expand $P(a) - P(b) = \sum c_k(a^k - b^k)$ and note every $a^k - b^k$ carries the factor $a - b$.

## How to use it
For a remainder, evaluate rather than divide. Mod a quadratic $(x-a)(x-b)$ the remainder is linear, so interpolate the line through $(a,P(a))$ and $(b,P(b))$; mod $(x-a)^2$ use $P(a) + P'(a)(x-a)$, or match coefficients. Divisibility questions reduce to evaluations at the roots of the divisor, complex ones included: $x^2+1 \mid P(x)$ exactly when $P(i) = 0$, and [[roots-of-unity|roots of unity]] handle $x^2+x+1$ and friends.

Over the integers, run the divisibility conditions as a filter. Candidate values at integer points must satisfy $$a - b \mid P(a) - P(b)$$ for every pair of integers, which settles most "can such a polynomial exist" questions by parity alone. It also constrains fixed points and cycles: if $P(P(x)) = x$ on integers then $a-b \mid P(a)-P(b) \mid P(P(a))-P(P(b)) = a-b$, forcing $|P(a)-P(b)| = |a-b|$, which is the key step in polynomial 2-cycle problems.

## On contests
A high-frequency polynomial tool on AMC 12 and AIME: 14 problems are tagged here, 4 of them solved by it alone. "Find the remainder when $x^{100}$ is divided by $x^2 - 3x + 2$" is a pure evaluation at $1$ and $2$ followed by drawing the line through the two values. The integer form shows up as "an integer polynomial takes the values $3$ and $7$ at some integers; can it take $5$ at another?", where checking the differences settles the answer in a line.
`,

"rational-root-theorem": String.raw`
## Why it works
Substitute the root and clear the denominators; then every term but one is a multiple of $p$, and every term but one is a multiple of $q$.

Let $a_nx^n + \cdots + a_1x + a_0$ have the root $\frac pq$ with $\gcd(p, q) = 1$. Multiplying the equation by $q^n$ gives $$a_np^n + a_{n-1}p^{n-1}q + \cdots + a_1pq^{n-1} + a_0q^n = 0.$$

Every term except the last contains a factor of $p$, so $p$ divides $a_0q^n$. Since $p$ shares no factor with $q$, it shares none with $q^n$, so $p$ divides $a_0$. In the same way every term except the first contains a factor of $q$, so $q$ divides $a_np^n$, and therefore $q$ divides $a_n$.

## How to use it
List the candidates $\pm\frac pq$, test them, and divide out each root as you find it. For $2x^3 - 3x^2 - 11x + 6$ the candidates are $\pm1, \pm2, \pm3, \pm6, \pm\frac12, \pm\frac32$. Testing finds $x = 3$, since $54 - 27 - 33 + 6 = 0$, and dividing by $x - 3$ leaves a quadratic that factors: $$2x^3 - 3x^2 - 11x + 6 = (x - 3)(2x - 1)(x + 2).$$

Synthetic division tests a candidate and divides at the same time. Try the small candidates first, and use signs or a rough sketch to skip the hopeless ones.

The monic case also proves irrationality. The only candidates for $x^2 - 2$ are $\pm1$ and $\pm2$, and none is a root, so $\sqrt2$ is irrational.

## On contests
Three problems here, all AIME, none solved by it alone: it usually factors a cubic that another method has produced, such as the equation a [[sp-substitution|symmetric substitution]] reduces a system to, or the equation for the ratio of a geometric series. Try the candidates with small denominators first, since contest cubics are built to have a rational root.`,

"coefficient-extraction": String.raw`
## Why it works
Evaluating a polynomial at a number weights each coefficient by a power of that number, so a well-chosen point makes the weights collapse: $$P(1) = a_0 + a_1 + a_2 + \cdots, \qquad P(-1) = a_0 - a_1 + a_2 - \cdots.$$

Adding and subtracting those cancels one parity at a time: $$\frac{P(1) + P(-1)}{2} = a_0 + a_2 + a_4 + \cdots, \qquad \frac{P(1) - P(-1)}{2} = a_1 + a_3 + a_5 + \cdots.$$ At $x = 0$ every weight but the first vanishes, leaving $a_0$.

## How to use it
Evaluate the polynomial in whatever form the problem gives it, a product, a power or a composition, and never expand it. For $(1 + 2x)^{10}(1 - x)^4$ the coefficient sum is $3^{10} \cdot 0^4 = 0$, and the constant term is $1$.

For every third or every fourth coefficient, replace $\pm 1$ by the cube or fourth roots of unity, which is the [[roots-of-unity-filter|roots of unity filter]]. In a polynomial of two variables, fix the other variable first. A [[generating-function-method|generating function]] read this way counts all its objects at once, since $G(1)$ adds up every coefficient.

## On contests
Two problems here, one AIME and one AMC 10, one solved by it alone. The AMC version combines it with the [[binomial-theorem|binomial theorem]], and the AIME version asks for the sum of the absolute values of the coefficients, which one evaluation at $x = -1$ produces once the sign of every coefficient is known.
`,


"newtons-sums": String.raw`
## Key forms
- $p_k=e_1p_{k-1}-e_2p_{k-2}+\cdots+(-1)^{k-1}k\,e_k$ — each power sum comes from the earlier ones and the coefficients, so the whole ladder is computable from the polynomial alone
- $p_1=e_1$, $p_2=e_1p_1-2e_2$, $p_3=e_1p_2-e_2p_1+3e_3$ — the first rungs, which cover almost every contest use
- past the degree $n$, the $k\,e_k$ term disappears — the relation becomes a pure recursion in the previous $n$ power sums, and forgetting to drop the term is the common error
- run backwards, power sums give the $e_k$ — and so the polynomial whose roots they are

## Why it works
Every root satisfies the polynomial, so multiplying that equation by a power of the root and adding over all the roots relates the power sums to each other.

Take a cubic with roots $r$, $s$, $t$ and $e_1 = r + s + t$, $e_2 = rs + st + tr$, $e_3 = rst$. Each root satisfies $$x^3 = e_1x^2 - e_2x + e_3.$$ Multiplying by $x^{k-3}$ and adding over the three roots gives, for $k \ge 3$, $$p_k = e_1p_{k-1} - e_2p_{k-2} + e_3p_{k-3},$$ with $p_0 = 3$, because each root contributes $1$. At $k = 3$ the last term is $3e_3$, the source of the $k\,e_k$ in the general ladder.

Below the degree the same shape holds: $p_1 = e_1$, and squaring the sum of the roots gives $p_2 = e_1^2 - 2e_2 = e_1p_1 - 2e_2$. Only the coefficients enter, so the ladder works just as well when the roots are complex.

## How to use it
Read $e_1, e_2, \ldots$ off the coefficients with [[vietas-general|Vieta's formulas]], minding the alternating signs, then climb one power at a time. For $x^3 - 6x^2 + 11x - 6$, with $e_1 = 6$, $e_2 = 11$ and $e_3 = 6$, $$p_1 = 6, \qquad p_2 = 36 - 22 = 14, \qquad p_3 = 6 \cdot 14 - 11 \cdot 6 + 18 = 36.$$ The roots are $1$, $2$, $3$, and indeed $1 + 8 + 27 = 36$.

Past the degree drop the $k\,e_k$ term, so the relation becomes a pure recursion in the previous $n$ power sums.

The ladder also runs backwards: given $p_1$, $p_2$, $p_3$ for three numbers, solve for $e_1$, $e_2$, $e_3$, and the numbers are the roots of $t^3 - e_1t^2 + e_2t - e_3$.

## On contests
Three problems here, all AIME, none solved by it alone, and two pair it with Vieta's formulas. The classic form gives $x + y + z$, $x^2 + y^2 + z^2$ and $x^3 + y^3 + z^3$ and asks for $x^4 + y^4 + z^4$. Harder versions reduce one polynomial modulo another so that only low power sums of the roots are needed, or ask for a symmetric sum over the roots of a polynomial that cannot be solved.`,

"conjugate-root-theorems": String.raw`
## Why it works
Replacing $i$ by $-i$ everywhere respects addition and multiplication and leaves real numbers alone, so it turns a true equation with real coefficients into another true equation.

If $P(r) = 0$, conjugate both sides. Conjugation respects sums and products, and it leaves the real coefficients of $P$ unchanged, so the left side becomes $P(\bar r)$ and the right side stays $0$. So $\bar r$ is a root too. The polynomial cannot tell which square root of $-1$ it is using.

{{figure:mirror}}

The radical version works the same way with the map $\sqrt d \mapsto -\sqrt d$ on numbers $x + y\sqrt d$ with $x$ and $y$ rational. It respects sums and products, because $\sqrt d$ and $-\sqrt d$ have the same square, and it leaves rational numbers fixed, so it sends roots of a rational polynomial to roots.

## How to use it
Each pair comes with its quadratic factor: $a \pm bi$ gives $x^2 - 2ax + (a^2 + b^2)$, and $a \pm b\sqrt d$ gives $x^2 - 2ax + (a^2 - b^2d)$. A rational cubic with root $2 + \sqrt3$ therefore has the factor $x^2 - 4x + 1$, and its third root follows from [[vietas-general|Vieta's formulas]].

Two consequences come up. A real polynomial of odd degree has a real root, since its non-real roots pair off. And the hypothesis matters: $x - \sqrt2$ has the root $\sqrt2$ but not $-\sqrt2$, because its coefficients are not rational.

## On contests
Five problems here, all AIME, and every one of them finishes with [[vietas-general|Vieta's formulas]]: the conjugate supplies the missing root, and Vieta turns the roots into the coefficients the problem asks about.
`,

"palindromic-polynomials": String.raw`## Key forms
- a palindromic polynomial has $a_i=a_{n-i}$, so its roots come in pairs $r$ and $\frac1r$ — dividing by $x^{n/2}$ groups the terms into $x^k+\frac{1}{x^k}$ and the substitution $t=x+\frac1x$ halves the degree
- the conversions needed after substituting are $x^2+\frac1{x^2}=t^2-2$ and $x^3+\frac1{x^3}=t^3-3t$ — worth memorizing, since rederiving them mid-problem is where the sign errors come from
- an odd-degree palindromic polynomial always has $x=-1$ as a root, so factor that out first and apply the substitution to the even palindromic factor that remains — factor it out first or the substitution will not close, because the degree must be even

## Why it works
Reversing coefficients corresponds to $x \mapsto \frac{1}{x}$ (times $x^n$), so a palindromic polynomial satisfies $P(x) = x^n P(\frac{1}{x})$ — roots come in reciprocal pairs. Dividing by $x^{n/2}$ symmetrizes, and everything becomes a polynomial in $y = x + \frac{1}{x}$ via $x^2 + \frac{1}{x^2} = y^2 - 2$, $x^3 + \frac{1}{x^3} = y^3 - 3y$.

## How to use it
Even degree $2m$: divide by $x^m$, substitute, halve the degree. Odd degree: $x = -1$ is always a root — factor it out first. Anti-palindromic (signs flip): $x = 1$ is a root. Applications beyond solving: products of roots in reciprocal pairs multiply to 1, simplifying [[vietas-general|Vieta]] computations.

## On contests
Quartic equations on AMC 12/AIME with symmetric coefficients are begging for this — it converts them to quadratics. The substitution powers $x + \frac{1}{x} = 2\cos\theta$ connections too (roots on the unit circle).`,

"vertex-form": String.raw`
## Why it works
Completing the square separates the part that varies from the part that does not: $$ax^2 + bx + c = a\left(x + \frac{b}{2a}\right)^2 + c - \frac{b^2}{4a}.$$

The square is never negative and is zero only at $x = -\frac{b}{2a}$. So when $a \gt 0$ the expression is smallest there, with value $c - \frac{b^2}{4a}$, and when $a \lt 0$ it is largest there. The square also takes the same value at $-\frac{b}{2a} + t$ and at $-\frac{b}{2a} - t$, which is the symmetry the figure at the top shows.

## How to use it
For an optimization, write the quantity as a quadratic in one variable and read off the vertex. That is why [[max-product-fixed-sum|a fixed sum has its largest product in the middle]]: $x(s - x)$ is a downward parabola with its vertex at $x = \frac s2$. If the variable is restricted to a range that misses the vertex, the extreme value is at the endpoint nearer to it, as in the example.

The symmetry is used even more than the extremum. Two points at the same height put the axis halfway between them, and the roots are such a pair, so they average to $-\frac{b}{2a}$, as [[vietas-quadratic|Vieta's formulas]] also say.

{{figure:symmetry}}

So a parabola known to pass through $(p, k)$ and $(q, k)$ has its axis at $x = \frac{p + q}{2}$ before any coefficient is found, which often turns a system of conditions into one equation.

## On contests
Two problems here, both AIME, one solved by it alone; the other adds [[casework-method|casework]] on where the vertex falls relative to the allowed range. On the AMC 10 it drives maximum-area and maximum-revenue questions, which are quadratics in disguise.
`,

"lagrange-interpolation": String.raw`## Key forms
- $P(x)=\alt{\sum_i y_i\prod_{j\ne i}\frac{x-x_j}{x_i-x_j}}{y_1\frac{(x-x_2)\cdots(x-x_n)}{(x_1-x_2)\cdots(x_1-x_n)}+\cdots+y_n\frac{(x-x_1)\cdots(x-x_{n-1})}{(x_n-x_1)\cdots(x_n-x_{n-1})}}$ — each basis term is built to equal $1$ at its own node and $0$ at every other, so the sum passes through all the data by construction
- $n$ points determine a unique polynomial of degree at most $n-1$, since two such interpolants would differ by a polynomial with $n$ roots — which is also what makes "a cubic through these five points" a contradiction

## Why it works
Each basis term $\prod_{j\ne i}\frac{x - x_j}{x_i - x_j}$ is engineered to equal 1 at $x_i$ and 0 at every other node; the sum therefore hits all the data. Uniqueness: two degree-$\le n{-}1$ interpolants differ by a polynomial with $n$ roots, hence zero.

## How to use it
Rarely expand fully — evaluate at the one point you need. [[finite-differences|Finite differences]] are the discrete shortcut: for integer nodes, a degree-$n$ polynomial has constant $n$-th differences, so extend the difference table instead of building basis polynomials. Also useful conceptually: $n$ points determine a degree-$\le n{-}1$ polynomial, so "a cubic passes through these five points" is a contradiction machine.

## On contests
AIME: "$P$ has degree 3 with $P(k) = \frac{1}{k}$ for $k = 1..4$; find $P(5)$" — consider $xP(x) - 1$, which has known roots (the slicker cousin of interpolation). Both the direct formula and the auxiliary-polynomial trick belong in the toolkit.`,

"difference-of-squares": String.raw`
## Why it works
Multiply out the product and the middle terms cancel: $(a - b)(a + b) = a^2 + ab - ab - b^2 = a^2 - b^2$.

The figure at the top shows why the answer has that shape. Cut a $b \times b$ corner out of an $a \times a$ square; the L-shaped piece left over has area $a^2 - b^2$, and it can be cut and rearranged into a rectangle $a + b$ long and $a - b$ wide.

The cube versions expand the same way, with more cancellation: $$(a - b)(a^2 + ab + b^2) = a^3 + a^2b + ab^2 - a^2b - ab^2 - b^3 = a^3 - b^3.$$ Replacing $b$ by $-b$ turns this into $a^3 + b^3 = (a + b)(a^2 - ab + b^2)$.

All three are cases of one pattern. As a polynomial in $a$, $a^n - b^n$ is zero when $a = b$, so it always has the factor $a - b$; and for odd $n$, $a^n + b^n$ is zero when $a = -b$, so it has the factor $a + b$. That is why a sum of two cubes factors but a sum of two squares does not.

## How to use it
The identity does one thing everywhere it appears: it converts a subtraction into a product, and a product is something you can count, cancel or bound. Everything below is that conversion wearing different clothes.

Against a Diophantine equation it turns solving into counting. Writing $$n = a^2 - b^2 = (a - b)(a + b)$$ means every representation is a factorization of $n$, so the question stops being "which squares differ by $n$" and becomes "how many factor pairs does $n$ have", which is why this card and [[factor-pair-counting|factor-pair counting]] appear together more than either does with anything else.

The one filter that matters: $a - b$ and $a + b$ always have the same parity, so an $n \equiv 2 \pmod 4$ has no representations at all.

Against a radical it clears the denominator, since $(\sqrt a - \sqrt b)(\sqrt a + \sqrt b) = a - b$ leaves no radical behind; that is all [[rationalizing|rationalizing]] is.

Against a product it telescopes. Multiplying the chain by $1 - x$ collapses it completely, $$(1 - x)(1 + x)(1 + x^2)(1 + x^4)\cdots(1 + x^{2^{k-1}}) = 1 - x^{2^k},$$ because each factor is the conjugate the previous step was waiting for. Recognizing a chain of that shape is worth more than the formula, since the collapse is total rather than partial.

And against arithmetic it is a shortcut: $51 \cdot 49 = 2500 - 1$, and more usefully $a^2 - b^2$ with $a$ and $b$ close together is small, which is often the bound a problem needs.

## On contests
Rarely the whole problem — three of the 42 tagged here stand alone — because it is a move rather than a result. Its standing partner is [[factor-pair-counting|factor-pair counting]] (6 problems): factor first, then count the pairs and filter by parity and sign. The next most common partner is [[arithmetic-series|an arithmetic series]] (4), where pairing consecutive terms produces differences of squares that cancel down the list.

The trigger to train is "one less than a power". Anything of the form $2^{32}-1$, $10^4-1$ or $n^2-1$ should be factored before it is thought about, and the [[sophie-germain|Sophie Germain]] identity is the same instinct applied to $a^4+4b^4$, which is a difference of squares once you add and subtract $4a^2b^2$.
`,

"an-minus-bn": String.raw`## Why it works
The geometric-series identity: multiply $(a - b)$ by the sum $a^{n-1} + a^{n-2}b + \cdots + b^{n-1}$ and everything telescopes. For odd $n$, substitute $-b$ to get the $a^n + b^n$ version.

## How to use it
Divisibility engine: $a - b \mid a^n - b^n$ always; $a + b \mid a^n + b^n$ for odd $n$; and $a^m - 1 \mid a^n - 1$ iff $m \mid n$. Factoring numbers like $2^{15} - 1$: factor the exponent's divisor chain. Combined with [[lte|LTE]] it computes exact prime powers.

## On contests
"Find the largest prime factor of $3^{12} - 1$"-type problems: factor via exponent divisors ($3^6-1$, $3^4-1$, $3^3-1$, cyclotomic pieces). Mersenne-flavored AIME number theory leans on $m \mid n \iff 2^m - 1 \mid 2^n - 1$.`,

"sophie-germain": String.raw`## Why it works
$a^4 + 4b^4 = (a^2 + 2b^2)^2 - (2ab)^2$ — add and subtract $4a^2b^2$ to complete the square, then [[difference-of-squares|difference of squares]].

## How to use it
Trigger: fourth powers with coefficient 4 (or rewritable to it, e.g. $4^{n} = 4 \cdot 4^{n-1}$ makes $k^4 + 4^n$ eligible when $n$ is odd... check parity carefully). Each factor is $\ge 2$ for $a, b \ge 1$ except tiny cases — hence compositeness proofs.

## On contests
"Show $n^4 + 4$ is never prime for $n > 1$" and "compute $\frac{(10^4+324)(22^4+324)\cdots}{(4^4+324)(16^4+324)\cdots}$" (with $324 = 4 \cdot 3^4$, the factors telescope) — the latter is a famous AIME problem pattern.`,

"largest-term-ratio": String.raw`## Key forms
- $\dfrac{a_{k+1}}{a_k} \ge 1 \iff$ still climbing — the peak is the last $k$ where this holds, so one inequality replaces evaluating every term
- $\dfrac{\binom{n}{k+1}}{\binom{n}{k}} = \dfrac{n-k}{k+1}$ — the reason binomial terms are the standard target: the factorials cancel completely
- with a weight, $\dfrac{a_{k+1}}{a_k} = \dfrac{n-k}{k+1}\cdot r$ for terms $\binom{n}{k}r^k$ — solve $\frac{(n-k)r}{k+1} = 1$ and take the floor

## Why it works
A sequence of positive terms is unimodal exactly when its consecutive ratio is decreasing and crosses $1$ once. For binomial-type terms the ratio $\frac{n-k}{k+1}r$ falls steadily in $k$, so it starts above $1$ and ends below it, and the crossing point is the peak. Nothing has to be computed at full size, which matters when the terms themselves are astronomically large.

## How to use it
Write $\frac{a_{k+1}}{a_k}$, cancel, set it $\ge 1$ and solve for $k$; the answer is the largest integer satisfying it. Check whether the ratio equals $1$ exactly, since then two adjacent terms tie for the maximum. The same test decides where a term is largest in absolute value for an alternating sequence, once signs are stripped.

## On contests
The standard AIME shape is "which term of $\binom{n}{k}r^k$ is largest", where evaluating is hopeless and the ratio is a one-line computation. It also settles where a [[binomial-probability|binomial probability]] peaks, which is the mode of the distribution.`,

"sfft": String.raw`
## Key forms
- $xy + ax + by + ab = (x + b)(y + a)$ — add $ab$ to both sides, then read solutions off the factor pairs of $c + ab$
- $(Ax + C)(Ay + B) = AD + BC$ — the form of $Axy + Bx + Cy = D$ after multiplying through by $A$
- $\frac1x + \frac1y = \frac1n \iff (x - n)(y - n) = n^2$ — so the positive solutions number [[number-of-divisors|the divisors]] of $n^2$

## Why it works
The expression $xy + ax + by$ is the product $(x + b)(y + a)$ with its constant term missing, so adding that constant completes the product.

Multiply out $(x + b)(y + a) = xy + ax + by + ab$. The first three terms are exactly the left side of the equation, so adding $ab$ to both sides of $xy + ax + by = c$ turns it into $$(x + b)(y + a) = c + ab.$$ With integer unknowns, $x + b$ and $y + a$ are integers whose product is the known number $c + ab$, so they form a factor pair, and each factor pair gives back one solution.

When the $xy$ term has a coefficient $A$, the product needs it on both factors. Multiplying $Axy + Bx + Cy = D$ through by $A$ gives $A^2xy + ABx + ACy = AD$, and the left side is $(Ax + C)(Ay + B)$ minus $BC$, so the equation becomes $$(Ax + C)(Ay + B) = AD + BC.$$ Only the factor pairs that make $x$ and $y$ whole numbers count.

## How to use it
List the factor pairs of the right side, negative ones included unless the problem restricts to positive integers, and read off each solution; then apply whatever bounds the problem imposes. For $xy + 2x + 5y = 30$, adding $10$ gives $(x + 5)(y + 2) = 40$, and positive $x$ and $y$ need $x + 5 \ge 6$ and $y + 2 \ge 3$, which leaves only $8 \cdot 5$ and $10 \cdot 4$, so $(x, y) = (3, 3)$ or $(5, 2)$.

Two standard consequences are worth knowing on sight. The unit-fraction equation $\frac1x + \frac1y = \frac1n$ clears to $(x - n)(y - n) = n^2$, so its positive solutions are counted by the divisors of $n^2$. And counting lattice points on the hyperbola $xy = N$ is just [[factor-pair-counting|counting factor pairs]] of $N$.

## On contests
An AIME staple, 12 of the 14 problems tagged here, and rarely alone (2), since the factoring only sets up the count. The unit-fraction equation, with its answer "the number of divisors of $n^2$", is the classic, and any two-variable equation that is linear in each variable separately is SFFT bait.
`,

"cubes-minus-3abc": String.raw`## Why it works
Direct expansion, or the elegant route: $a^3+b^3+c^3 - 3abc = \det$ of a circulant matrix, factoring via [[roots-of-unity|roots of unity]]. The second factor is $\frac{1}{2}[(a-b)^2 + (b-c)^2 + (c-a)^2]$, manifestly nonnegative.

## How to use it
Two directions: (1) if $a + b + c = 0$ then $a^3 + b^3 + c^3 = 3abc$ — applies to differences like $(x-y), (y-z), (z-x)$ which always sum to zero; (2) the factorization itself for Diophantine or symmetric-system problems. Also proves AM-GM for three variables.

## On contests
"$x - y$, $y - z$, $z - x$" cube sums, and systems giving $a+b+c$ and $ab+bc+ca$ and $abc$ (compute cube sums via this + [[newtons-sums|Newton]]). The zero-sum special case is the single most reused fragment.`,

"square-of-sum": String.raw`
## Why it works
Multiplying a sum by itself pairs every term with every term, so each square appears once and each product of two different terms appears twice, once in each order.

Write $(a + b + c)^2 = (a + b + c)(a + b + c)$ and multiply every term of the first bracket by every term of the second, which gives nine products. Three of them pair a term with itself: $a^2$, $b^2$ and $c^2$. The other six pair two different terms, and each pair shows up twice, as $ab$ and $ba$, as $bc$ and $cb$, and as $ca$ and $ac$. So the square is $$a^2 + b^2 + c^2 + 2(ab + bc + ca).$$

The figure at the top is the two-term version: a square of side $a + b$ splits into the squares $a^2$ and $b^2$ and two $ab$ rectangles.

The two-variable relatives come from adding and subtracting $(a + b)^2 = a^2 + 2ab + b^2$ and $(a - b)^2 = a^2 - 2ab + b^2$: the cross terms cancel in the sum, and the squares cancel in the difference. And the cross term of $\left(x + \frac1x\right)^2$ is $2 \cdot x \cdot \frac1x = 2$, so $$\left(x + \frac1x\right)^2 = x^2 + 2 + \frac{1}{x^2}.$$

One rearrangement is worth keeping separately: $$a^2 + b^2 + c^2 - ab - bc - ca = \frac12\left[(a - b)^2 + (b - c)^2 + (c - a)^2\right].$$ The right side is visibly never negative and is zero only when $a = b = c$, so it turns a symmetric expression into an inequality with a known equality case.

## How to use it
The three-variable identity converts among $a + b + c$, $ab + bc + ca$ and $a^2 + b^2 + c^2$: given $a + b + c = 6$ and $ab + bc + ca = 11$, the sum of the squares is $36 - 22 = 14$, with no need to find $a$, $b$ and $c$.

For $x + \frac1x$, square and cube to climb. If $y = x + \frac1x$, then $x^2 + \frac{1}{x^2} = y^2 - 2$ and $x^3 + \frac{1}{x^3} = y^3 - 3y$, and higher powers follow by multiplying neighbors, since $$\left(x^n + \frac{1}{x^n}\right)\left(x + \frac1x\right) = \left(x^{n+1} + \frac{1}{x^{n+1}}\right) + \left(x^{n-1} + \frac{1}{x^{n-1}}\right).$$

## On contests
A permanent AMC fixture in two shapes: "given $\sum a$ and $\sum a^2$, find $\sum ab$", and climbing the powers of $x + \frac1x$ one step at a time. Of the 16 problems tagged here only 2 need nothing else; the identity usually serves another setup, such as a box whose [[space-diagonal|space diagonal]] and edge sum are given (3 problems), where $(a + b + c)^2$ links the two.
`,

"binomial-theorem": String.raw`
## Why it works
Multiplying out $(x + y)^n$ means choosing $x$ or $y$ from each of the $n$ brackets, and $\binom nk$ counts the ways to choose $y$ exactly $k$ times.

Write $(x + y)^n = (x + y)(x + y)\cdots(x + y)$ with $n$ brackets. Each term of the expansion is built by picking one of the two letters from every bracket and multiplying the picks. A term that picks $y$ from $k$ brackets and $x$ from the other $n - k$ is $x^{n-k}y^k$, and there is one such term for every choice of which $k$ brackets supply the $y$. There are $\binom nk$ of those choices, so after collecting like terms the coefficient of $x^{n-k}y^k$ is $\binom nk$: $$(x + y)^n = \sum_{k=0}^{n} \binom nk x^{n-k}y^k.$$

The same picture explains Pascal's triangle. Split off one bracket: $(x + y)^n = (x + y)^{n-1}(x + y)$. A term $x^{n-k}y^k$ either takes its last $y$ from the final bracket, leaving $k - 1$ of them among the first $n - 1$ brackets, or takes the $x$ there, leaving all $k$ among the first $n - 1$. So $$\binom nk = \binom{n-1}{k-1} + \binom{n-1}{k}:$$ each entry is the sum of the two above it.

{{figure:pascal}}

## How to use it
Coefficient extraction is the everyday use, and substitution extends it: the coefficient of $x^2$ in $(2x - 3)^5$ is $\binom52 \cdot 2^2 \cdot (-3)^3$, read off by treating $2x$ and $-3$ as the two terms.

For remainders, write the base next to a round number: $9^{100} = (10 - 1)^{100}$, and modulo $1000$ every term containing $10^3$ or more vanishes, leaving only three terms to compute. For a small $\epsilon$, $(1 + \epsilon)^n \approx 1 + n\epsilon$ is just the first two terms of the expansion.

## On contests
Spread across many problem types rather than tied to one: 2 of the 19 problems tagged here use it alone, and no partner appears more than twice. The recurring shapes are last-digit and remainder questions such as $9^{100} \bmod 1000$, coefficient hunts in products of binomials, and sums of binomial coefficients that collapse under a clever substitution. It is also the bridge between algebra and counting, since every $\binom nk$ in an expansion is a count of choices.
`,

"brahmagupta-fibonacci": String.raw`## Why it works
$|z|^2|w|^2 = |zw|^2$ for complex numbers $z = a+bi$, $w = c+di$ — expand both sides. The two sign choices come from $zw$ and $z\bar w$.

## How to use it
Closure tool: products of sums-of-two-squares are sums of two squares, with an explicit recipe for the representation. Run it forward to build representations (e.g. $65 = 5 \cdot 13 = (1^2+2^2)(2^2+3^2)$ gives both $1^2+8^2$ and $4^2+7^2$) or cite it for existence.

## On contests
AIME problems asking for numbers expressible as $a^2 + b^2$ in multiple ways lean on the two sign choices producing distinct representations. Also the algebraic heart of counting lattice points on circles.`,

"arithmetic-series": String.raw`
## Why it works
Write the sum forwards and backwards, one line above the other, and every column adds up to the same number.

Write $S = a_1 + a_2 + \cdots + a_n$, and underneath it the same sum reversed, $S = a_n + a_{n-1} + \cdots + a_1$. Add the two lines column by column. Moving one column to the right raises the top term by $d$ and lowers the bottom term by $d$, so every column has the same total as the first one, $a_1 + a_n$. There are $n$ columns, so $2S = n(a_1 + a_n)$, and halving gives the formula.

{{figure:two-staircases}}

The figure is the same argument in blocks: two copies of the staircase, one turned upside down, fit together into a rectangle $n$ columns wide and $a_1 + a_n$ tall, so one staircase is half of it. It also shows why the sum is the number of terms times the average term. The terms are spread evenly around the average of the two ends, so the amounts above it exactly make up for the amounts below.

Writing the sum twice also avoids a worry that pairing first with last runs into, a middle term left over when $n$ is odd. The doubled sum works for every $n$.

The term formula is the same bookkeeping. Getting from $a_1$ to $a_n$ takes $n - 1$ steps of size $d$, so $a_n = a_1 + (n-1)d$, and solving that for $n$ gives the term count $\frac{a_n - a_1}{d} + 1$.

## How to use it
Think of it as count times average, not as a formula: $$\text{sum} = \text{number of terms} \times \text{average term}.$$ That reading survives where the formula does not: any list symmetric about its middle has sum equal to its length times its middle value, so the same one-line computation handles a set of residues, a run of consecutive integers, or the terms of a symmetric sum that is not arithmetic at all.

It converts a sum into a product, which is what makes it useful inside other problems rather than as an answer. A sum over an unknown-length run becomes $n$ times an average, so an equation about a total becomes an equation about $n$, and since $n$ must be a positive integer, a single divisibility or bounding step often finishes what looked like a two-unknown problem.

Two places to be careful, and they cause most of the errors. Counting the terms is the fencepost problem: a run from $a$ to $b$ by $d$ has $\frac{b-a}{d}+1$ terms, and the $+1$ is missed constantly. And when the last term is unknown, use $$S_n = \frac n2\left(2a_1 + (n - 1)d\right)$$ rather than solving for it first, which keeps one unknown instead of introducing a second.

## On contests
Everywhere and often alone — 13 of the 55 problems tagged here need nothing else, among the highest of any card in the library. Its usual partner is [[geometric-series|a geometric series]] (6 problems), in problems built to contrast the two.

The disguises are what to train. A sum of a residue class ("all multiples of 7 under 500") is an arithmetic series with $d=7$; interior-angle sums are one with $d=180^\circ$; and the sums of consecutive blocks of an arithmetic sequence form another arithmetic sequence, which is how a problem hides one inside itself. In each case naming it converts the whole computation to a single multiplication.
`,

"geometric-series": String.raw`
## Why it works
Multiplying the sum by $r$ shifts every term over by one place, so subtracting the two makes almost everything cancel.

Write $S = a + ar + ar^2 + \cdots + ar^{n-1}$. Then $rS = ar + ar^2 + \cdots + ar^{n-1} + ar^n$: the same terms moved one place along, with a new term at the end and the first term missing. Subtracting, every term except those two cancels, so $S - rS = a - ar^n$. That is $S(1 - r) = a(1 - r^n)$, and dividing by $1 - r$, which is allowed when $r \ne 1$, gives $$S = a\,\frac{1 - r^n}{1 - r}.$$

For the infinite sum, let $n$ grow. When $|r| \lt 1$ the powers $r^n$ shrink toward $0$, so the finite sums approach $$\frac{a}{1 - r},$$ and that limit is what the infinite sum means. When $|r| \ge 1$ the terms do not shrink, and the sums never settle down. The figure at the top is the case $a = \frac12$, $r = \frac12$: each piece is half of what is left, the pieces fill the whole square, and $\frac{1/2}{1 - 1/2} = 1$.

When $r = 1$ the formula does not apply, but it is not needed either: all $n$ terms equal $a$, and the sum is $na$.

## How to use it
Learn the derivation rather than the formula. Multiplying the sum by $r$ and subtracting shifts every term onto its neighbor so that all but two cancel, $$S - rS = a - ar^n,$$ and that single move is reusable: it is also what closes an [[arithmetico-geometric|arithmetico-geometric]] sum, what turns a repeating decimal into a fraction, and what solves a first-order recurrence. The formula is just the move applied once.

The reason it matters so often is that it converts an infinite process into a number. A ball bouncing forever, a fractal dissected forever, a game that might go on forever: each is unbounded in time and finite in total, and the series is what makes that finite total computable. Self-similarity is the tell. Whenever a figure or a process contains a scaled copy of itself, the ratio of the copy is $r$ and the problem is already solved.

Two habits prevent the usual errors. Confirm $|r| \lt 1$ before summing an infinite series, because a problem that fails this is usually testing exactly that. And when only some terms are wanted, re-index rather than filter: every other term of a series with ratio $r$ is itself geometric with ratio $r^2$, $$a + ar^2 + ar^4 + \cdots = \frac{a}{1 - r^2},$$ so splitting by parity gives two clean series instead of one awkward one.

## On contests
Unusually self-sufficient for a tool this common: it is the whole solution in 9 of the 42 problems tagged here. When it has a partner it is [[arithmetic-series|an arithmetic series]] (6 problems), typically a problem that hands you one of each and asks for them to be combined or compared.

The recurring shapes are worth recognizing before any algebra: the total distance of an infinite bounce, the shaded area of a fractal dissection, the probability that a repeated trial first succeeds on turn $k$, and a repeating decimal. All four are the same sum with different nouns.
`,

"power-sums": String.raw`
## Why it works
The sum of the first $n$ integers comes from pairing, and each higher sum comes from a telescoping sum that trades it for the lower ones.

Pairing: write $1 + 2 + \cdots + n$ forwards and backwards and add term by term. Each of the $n$ pairs adds to $n + 1$, so twice the sum is $n(n + 1)$.

Squares: add up $(k + 1)^3 - k^3 = 3k^2 + 3k + 1$ for $k = 1$ to $n$. The left side telescopes to $(n + 1)^3 - 1$, and the right side is $3\sum k^2 + \frac{3n(n + 1)}{2} + n$. Solving, $$3\sum k^2 = (n + 1)^3 - (n + 1) - \frac{3n(n + 1)}{2} = \frac{n(n + 1)(2n + 1)}{2},$$ so $\sum k^2 = \frac{n(n + 1)(2n + 1)}{6}$. The same step with $(k + 1)^4 - k^4$ gives the cubes.

The cube formula also has a picture. A square of side $1 + 2 + \cdots + n$ splits into L-shaped bands, and the $k$th band lies between the squares of sides $\frac{(k - 1)k}{2}$ and $\frac{k(k + 1)}{2}$. Its area is the difference of their squares, which factors as $k \cdot k^2 = k^3$. The bands fill the square, so $1^3 + 2^3 + \cdots + n^3 = (1 + 2 + \cdots + n)^2$.

{{figure:cubes}}

## How to use it
Any polynomial summed over $k = 1$ to $n$ reduces to these formulas plus $\sum 1 = n$: expand, sum term by term, and simplify. For example $$\sum_{k=1}^{n} k(k + 1) = \sum k^2 + \sum k = \frac{n(n + 1)(n + 2)}{3}.$$

Every formula here starts at $k = 1$, so a sum that starts anywhere else needs the prefix subtracted first: $$\sum_{k=a}^{b} f(k) = \sum_{k=1}^{b} f(k) - \sum_{k=1}^{a-1} f(k).$$ The piece removed ends at $a - 1$, not $a$; using $a$ silently drops the $k = a$ term. The same care applies to the odd and even sums, whose last terms are $2n - 1$ and $2n$, so "the even numbers up to $100$" means $n = 50$.

## On contests
Eight problems here, six AIME and two AMC 12, none by it alone and each with a different partner, since a closed-form sum is usually one step inside a larger count: [[rectangles-in-grid|rectangles in a grid]], or a divisibility condition on $\frac{n(n + 1)}{2}$ settled with [[crt|the Chinese remainder theorem]]. The identity $\sum k^3 = \left(\sum k\right)^2$ is sometimes tested directly.
`,

"telescoping": String.raw`
## Key forms
- $\alt{\sum_{k=m}^{n}\left(f(k) - f(k+1)\right)}{\big(f(m) - f(m+1)\big) + \big(f(m+1) - f(m+2)\big) + \cdots + \big(f(n) - f(n+1)\big)} = f(m) - f(n+1)$ — only the two ends survive
- $\frac{1}{(x+a)(x+b)} = \frac{1}{b-a}\left(\frac{1}{x+a} - \frac{1}{x+b}\right)$ — the two-factor partial fraction split
- cover-up — the weight on $\frac{1}{x - r}$ is what remains after deleting that factor, evaluated at $x = r$
- $\frac{1}{k(k+d)} = \frac1d\left(\frac1k - \frac1{k+d}\right)$ — a gap of $d$ leaves $d$ surviving terms at each end
- $\frac{k}{(k+1)!} = \frac{1}{k!} - \frac{1}{(k+1)!}$ and $\frac{1}{\sqrt k + \sqrt{k+1}} = \sqrt{k+1} - \sqrt k$ — two differences in disguise
- $\alt{\prod_{k=m}^{n}\frac{f(k)}{f(k+1)}}{\frac{f(m)}{f(m+1)}\cdot\frac{f(m+1)}{f(m+2)}\cdots\frac{f(n)}{f(n+1)}} = \frac{f(m)}{f(n+1)}$ — products telescope with division in place of subtraction

## Why it works
When each term is a difference of consecutive values of one function, adding the terms makes every intermediate value appear once with a plus sign and once with a minus sign, and those cancel.

Write the sum out: $$\sum_{k=1}^{n}\left(f(k) - f(k+1)\right) = \left(f(1) - f(2)\right) + \left(f(2) - f(3)\right) + \cdots + \left(f(n) - f(n+1)\right).$$ The $-f(2)$ in the first term cancels the $+f(2)$ in the second, the $-f(3)$ cancels the next one, and so on down the line. Only $f(1)$ at the start and $-f(n+1)$ at the end have no partner, so the sum is $f(1) - f(n+1)$.

Partial fractions are how a term is put into that shape. The split $$\frac{1}{(x+a)(x+b)} = \frac{1}{b-a}\left(\frac{1}{x+a} - \frac{1}{x+b}\right)$$ can be checked by putting the right side over a common denominator: the numerator becomes $(x + b) - (x + a) = b - a$, which the factor $\frac{1}{b-a}$ in front cancels.

With $a = 0$ and $b = 1$ this is $\frac{1}{k(k+1)} = \frac1k - \frac1{k+1}$, exactly $f(k) - f(k+1)$ for $f(k) = \frac1k$, so $\sum_{k=1}^{99}\frac{1}{k(k+1)} = 1 - \frac{1}{100}$.

When the gap between the two factors is $d$ instead of $1$, each piece cancels against a term $d$ places away, and $d$ terms survive at each end instead of one.

## How to use it
Split first, then look for the collapse. The cover-up method finds each partial-fraction coefficient fast: to get the weight on $\frac{1}{x+a}$, delete that factor and evaluate what remains at $x = -a$.

Interleaved telescopes are common: $$\frac{1}{k(k+2)} = \frac12\left(\frac1k - \frac1{k+2}\right)$$ cancels odd terms against odd and even against even, leaving two terms at each end.

Products telescope the same way, as in $$\prod_{k=2}^{n}\left(1 - \frac{1}{k^2}\right) = \prod_{k=2}^{n}\frac{(k-1)(k+1)}{k \cdot k},$$ which splits into two telescoping products and equals $\frac{n+1}{2n}$.

The other payoff is [[generating-function-method|generating functions]]. Decomposing $\frac{P(x)}{\prod(1 - r_ix)}$ turns a rational generating function into a sum of [[geometric-series|geometric series]], so the coefficient of $x^n$ becomes a sum of $r_i^n$ terms. That is the generating-function proof of the closed form for a linear recurrence.

## On contests
A standard AIME finisher, with 21 tagged problems here, 20 of them AIME, and 3 solved by the collapse alone. Its partners are spread thin, a [[difference-of-squares|difference of squares]], a [[linear-recurrence|recurrence]], [[product-sum|product-to-sum]] or [[log-rules|log rules]] in 2 problems each, because each of those is a way of producing the $f(k) - f(k+1)$ shape.

The recognition cue is a denominator made of factors in arithmetic progression, or any long sum that the no-calculator setting makes look impossible: impossible usually means telescoping.
`,

"arithmetico-geometric": String.raw`## Why it works
Differentiate $\sum x^k = \frac{1}{1-x}$ termwise, or avoid calculus: $S - xS$ turns the linear coefficients into a plain [[geometric-series|geometric series]].

## How to use it
$\sum_{k\ge1} k x^k = \frac{x}{(1-x)^2}$ and, one more derivative up, $\sum k^2 x^k = \frac{x(1+x)}{(1-x)^3}$. Finite versions come from the same shift trick. This is the standard closed form behind expected values of geometric-type random variables.

## On contests
Expected-value problems ("expected number of flips") and sums like $\frac{1}{2} + \frac{2}{4} + \frac{3}{8} + \cdots$ appear on AMC/AIME regularly; the shift-subtract derivation is fast and safe under pressure.`,

"binets-formula": String.raw`
## Why it works
A geometric sequence $r^n$ satisfies the Fibonacci rule exactly when $r^2 = r + 1$, and the combination of the two such sequences that fits the first two terms is the whole sequence.

Putting $r^n$ into $F_{n+1} = F_n + F_{n-1}$ and dividing by $r^{n-1}$ gives $r^2 = r + 1$, with roots $\varphi$ and $\psi$. The rule is linear, so $A\varphi^n + B\psi^n$ satisfies it for any constants, and matching $F_0 = 0$ and $F_1 = 1$ gives $A = -B = \frac1{\sqrt5}$. This is the general method for [[linear-recurrence|linear recurrences]].

The identities come from the recurrence itself. Since $F_i = F_{i+2} - F_{i+1}$, the sum $F_1 + \cdots + F_n$ [[telescoping|telescopes]] to $F_{n+2} - F_2 = F_{n+2} - 1$.

## How to use it
For a single far-out term or its size, use the closed form: $F_n$ is the nearest integer to $\frac{\varphi^n}{\sqrt5}$, so it has roughly $0.209n$ digits, since $\log_{10}\varphi \approx 0.209$.

For sums, products and divisibility, use the identities instead: $$F_1 + \cdots + F_n = F_{n+2} - 1, \qquad F_1^2 + \cdots + F_n^2 = F_nF_{n+1},$$ together with Cassini's $F_{n-1}F_{n+1} - F_n^2 = (-1)^n$, the addition rule $F_{m+n} = F_mF_{n+1} + F_{m-1}F_n$, and $\gcd(F_m, F_n) = F_{\gcd(m, n)}$. For example $F_1 + \cdots + F_8 = F_{10} - 1 = 54$, and $\gcd(F_{12}, F_{18}) = F_6 = 8$.

## On contests
Four problems here, split between AMC and AIME, none by it alone; two continue into [[linear-recurrence|linear recurrences]] in general. Fibonacci sums and gcds appear on AIME with the identities as the intended shortcuts.
`,

"linear-recurrence": String.raw`
## Why it works
Geometric sequences are the building blocks: substituting $a_n = r^n$ turns the recurrence into an equation for $r$, and any combination of the geometric sequences that work also works.

Put $a_n = r^n$ into $a_n = c_1a_{n-1} + \cdots + c_ka_{n-k}$ and divide by $r^{n-k}$. The result is $$r^k = c_1r^{k-1} + \cdots + c_k,$$ the characteristic equation, so its roots are exactly the ratios whose geometric sequences obey the rule.

The rule is linear, meaning that a sum of solutions, or a multiple of one, is again a solution, so $\sum_i A_ir_i^{\,n}$ works for any constants $A_i$. With $k$ distinct roots there are $k$ constants, just enough to match the $k$ initial terms, and since those initial terms determine the whole sequence, the matching combination is the sequence.

For $a_n = a_{n-1} + 2a_{n-2}$ the characteristic equation is $x^2 = x + 2$, with roots $2$ and $-1$, so $$a_n = A \cdot 2^n + B(-1)^n.$$

A repeated root leaves one constant short, and $nr^n$ supplies the missing solution: it is what two geometric solutions look like in the limit as their ratios merge. A complex-conjugate pair $\rho e^{\pm i\phi}$ combines into the real form $$\rho^n(A\cos n\phi + B\sin n\phi),$$ which is why some linear recurrences oscillate instead of growing steadily; when $\rho = 1$ and $\phi$ is a rational multiple of $\pi$, the sequence is periodic.

## How to use it
Write the characteristic equation, factor it, assemble the general solution from the roots, then solve the small linear system the initial terms give you. Check one term beyond the ones you fitted; it catches almost every algebra slip.

For a rule with an extra term, $a_n = c_1a_{n-1} + \cdots + f(n)$, the general solution is one particular solution plus the solution of the rule without $f(n)$. Guess the particular solution by matching the shape of $f(n)$: a constant for a constant, a degree-$d$ polynomial for a degree-$d$ polynomial, $Cs^n$ for $s^n$. If that guess already solves the rule without $f(n)$, multiply it by $n$ and try again.

When the recurrence is not linear, look for a substitution that makes it so. With $b_n = \frac{1}{a_n}$, $$a_n = \frac{a_{n-1}}{1 + a_{n-1}} \quad \text{becomes} \quad b_n = b_{n-1} + 1,$$ an [[arithmetic-series|arithmetic sequence]]; $b_n = \log a_n$ linearizes a multiplicative rule, and $b_n = a_n - L$ handles a shifted fixed point. Failing that, telescope, or compute terms and test for periodicity: an ugly rational rule is usually periodic rather than solvable in closed form.

## On contests
Recognizing the branch within seconds is what the time pressure rewards: a $+d$ on a first-order rule means shifting to the fixed point, a two-term rule with no extra term means the characteristic equation, and an ugly rational rule means periodicity or a reciprocal substitution.

Of the 13 problems tagged here only 1 needs nothing else, with [[telescoping|telescoping]] and [[binets-formula|Binet's formula]] the usual partners (2 each).

Counting recursions, such as tilings and strings avoiding a pattern, are usually Fibonacci-like and yield closed forms this way, though AIME more often asks for a term modulo $m$, and then the right move is to skip the closed form and iterate the recurrence modulo $m$, hunting for the cycle.
`,

"am-gm": String.raw`
## Why it works
For two numbers, the gap between the arithmetic and geometric means is a perfect square, so it can never be negative.

$$\frac{a + b}{2} - \sqrt{ab} = \frac{(\sqrt a - \sqrt b)^2}{2} \ge 0,$$ and the square is zero only when $a = b$. The same fact has a picture: four $a \times b$ rectangles fit inside a square of side $a + b$ with a square hole of side $a - b$ left over, so $(a + b)^2 \ge 4ab$.

{{figure:pinwheel}}

For $n$ numbers, a smoothing argument gives the general case. Let $m$ be their mean. If the numbers are not all equal to $m$, one of them, $x$, is above $m$ and another, $y$, is below. Replace $x$ by $m$ and $y$ by $x + y - m$.

The sum does not change, and the product goes up, because $$m(x + y - m) - xy = (x - m)(m - y) \gt 0.$$ Each step makes one more number equal to $m$, so after at most $n$ steps all of them equal $m$, and the product has only grown, to $m^n$. The original product was therefore at most $m^n$, which is the inequality. It also follows from [[jensens-inequality|Jensen's inequality]] for the concave function $\log x$.

## How to use it
To minimize a sum whose terms have a constant product, or maximize a product with a constant sum, arrange the terms so that the equality case can happen. For example $$x + \frac{16}{x} \ge 2\sqrt{16} = 8,$$ with equality at $x = 4$.

When the product is not constant, split terms until it is: for $2x + \frac{3}{x^2}$, write $2x$ as $x + x$, so the three terms $x$, $x$ and $\frac3{x^2}$ have product $3$: $$x + x + \frac3{x^2} \ge 3\sqrt[3]{x \cdot x \cdot \frac{3}{x^2}} = 3\sqrt[3]3,$$ reached when $x = \frac3{x^2}$, that is, $x = \sqrt[3]3$.

Always check that the equality case is allowed by the constraints; if it is not, the bound is true but it is not the answer. Instant consequences worth knowing: $x + \frac1x \ge 2$ for $x \gt 0$, $\frac ab + \frac ba \ge 2$, and among rectangles with a given perimeter the square has the largest area.

## On contests
Six problems here, four of them AIME, and four solved by it alone, which is typical: once the right split is found, the inequality is the whole solution. AMC uses it for "minimum value of" questions and AIME for bounding steps. When the terms carry weights or squares, [[cauchy-schwarz|Cauchy–Schwarz]] is often the better tool.
`,

"mean-chain": String.raw`## Why it works
The chain is really one inequality proved three times. QM $\ge$ AM is the statement that variance is non-negative: expanding $\sum(a_i-\bar a)^2 \ge 0$ gives $\sum a_i^2 \ge n\bar a^2$, which is exactly $\text{QM}^2 \ge \text{AM}^2$. AM $\ge$ GM follows from the concavity of $\ln$. And GM $\ge$ HM is not a new fact at all — it is AM $\ge$ GM applied to the reciprocals $1/a_i$ and then flipped. Every equality case is the same: all the $a_i$ are equal.

## Full proof
Throughout, $a_1,\dots,a_n \gt 0$ and $\bar a = \frac{1}{n}\sum a_i$ denotes the arithmetic mean.

QM $\ge$ AM. Since squares are non-negative, $\sum_{i=1}^n (a_i - \bar a)^2 \ge 0$. Expanding, $\sum a_i^2 - 2\bar a\sum a_i + n\bar a^2 \ge 0$, and $\sum a_i = n\bar a$, so this is $\sum a_i^2 - n\bar a^2 \ge 0$. Dividing by $n$ gives $\frac{1}{n}\sum a_i^2 \ge \bar a^2$, and taking square roots of both non-negative sides gives $\sqrt{\frac{1}{n}\sum a_i^2} \ge \bar a$. Equality needs every $(a_i-\bar a)^2 = 0$, i.e. all $a_i$ equal. (The same conclusion follows from Cauchy-Schwarz against the all-ones vector: $\left(\sum a_i\cdot 1\right)^2 \le n\sum a_i^2$.)

AM $\ge$ GM. The function $\ln$ is concave, since $(\ln x)'' = -1/x^2 \lt 0$. [[jensens-inequality|Jensen's inequality]] for a concave function says the function of the average is at least the average of the function, so $\ln\!\left(\frac{1}{n}\sum a_i\right) \ge \frac{1}{n}\sum \ln a_i = \ln\!\left(\left(\prod a_i\right)^{1/n}\right)$. Exponentiating the increasing function $e^x$ preserves the inequality, giving $\frac{1}{n}\sum a_i \ge \left(\prod a_i\right)^{1/n}$. Jensen is an equality exactly when all inputs coincide, so again all $a_i$ must be equal.

For $n=2$ this needs no machinery: $\frac{a+b}{2}-\sqrt{ab} = \frac{(\sqrt a-\sqrt b)^2}{2} \ge 0$.

GM $\ge$ HM. Apply the AM $\ge$ GM inequality just proved to the positive numbers $1/a_1,\dots,1/a_n$: $\frac{1}{n}\sum\frac{1}{a_i} \ge \left(\prod \frac{1}{a_i}\right)^{1/n} = \frac{1}{\left(\prod a_i\right)^{1/n}}$. Both sides are positive, so taking reciprocals reverses the inequality: $\left(\prod a_i\right)^{1/n} \ge \frac{n}{\sum 1/a_i}$, which is GM $\ge$ HM. Equality transfers from the AM-GM step, so once more all $a_i$ are equal.

Chaining the three gives QM $\ge$ AM $\ge$ GM $\ge$ HM, with a single equality case: $a_1 = a_2 = \cdots = a_n$.

## How to use it
Pick the pair of means matching the given data and the target: given a sum of squares, QM-AM converts to a sum bound; given a sum of reciprocals, HM enters. The chain also settles "which is bigger" comparison questions instantly.

## On contests
AMC comparison problems and AIME bounding steps. HM's appearance: [[average-speed|average speed]] over equal distances is the harmonic mean — the classic "drive there at 30, back at 60" trap (answer 40, not 45).`,

"cauchy-schwarz": String.raw`
## Key forms
- $\alt{\left(\sum a_ib_i\right)^2 \le \left(\sum a_i^2\right)\left(\sum b_i^2\right)}{(a_1b_1 + \cdots + a_nb_n)^2 \le (a_1^2 + \cdots + a_n^2)(b_1^2 + \cdots + b_n^2)}$ — the plain form, with equality exactly when the two sequences are proportional
- $\alt{\sum \dfrac{x_i^2}{y_i} \ge \dfrac{\left(\sum x_i\right)^2}{\sum y_i}}{\dfrac{x_1^2}{y_1} + \cdots + \dfrac{x_n^2}{y_n} \ge \dfrac{(x_1 + \cdots + x_n)^2}{y_1 + \cdots + y_n}}$ — Titu's lemma, also called the Engel form; the one to reach for whenever squares sit over positive denominators
- $|\mathbf a \cdot \mathbf b| \le \lVert\mathbf a\rVert\,\lVert\mathbf b\rVert$ — the vector reading, which makes it obvious: the dot product carries a $\cos\theta$ that never exceeds $1$
- $a_i = \sqrt{w_i}\cdot\dfrac{a_i}{\sqrt{w_i}}$ — the weighting trick: split each term this way before applying it to get a weighted version for free

## Why it works
A quadratic that is never negative cannot have two real roots, and that is the whole inequality.

For every real $t$, $$\sum_i (a_it + b_i)^2 = \left(\sum a_i^2\right)t^2 + 2\left(\sum a_ib_i\right)t + \sum b_i^2 \ge 0.$$ A quadratic that never dips below zero has discriminant at most $0$, and here the discriminant is $4\left(\sum a_ib_i\right)^2 - 4\left(\sum a_i^2\right)\left(\sum b_i^2\right)$, which gives the inequality. Equality needs a $t$ that makes every $a_it + b_i$ zero, which means the sequences are proportional.

[[lagranges-identity|Lagrange's identity]] writes the gap as a sum of squares, which proves the inequality a second way. Geometrically the statement is $|\mathbf a \cdot \mathbf b| \le \lVert\mathbf a\rVert\,\lVert\mathbf b\rVert$, since the [[vector-dot-product|dot product]] carries a factor $\cos\theta$, which is never more than $1$ in size.

Titu's lemma is the plain form with $a_i = \frac{x_i}{\sqrt{y_i}}$ and $b_i = \sqrt{y_i}$: then $\sum a_ib_i = \sum x_i$, and the inequality reads $\left(\sum x_i\right)^2 \le \left(\sum \frac{x_i^2}{y_i}\right)\left(\sum y_i\right)$.

## How to use it
Choosing the two sequences is the art. To bound a linear sum under a constraint on squares, pair it with the constraint: $$(x + 2y + 2z)^2 \le (1^2 + 2^2 + 2^2)(x^2 + y^2 + z^2),$$ so if $x^2 + y^2 + z^2 = 1$ the sum is at most $3$, reached at $(x, y, z) = \left(\frac13, \frac23, \frac23\right)$, where the two sequences are proportional.

Titu's lemma handles squares over positive denominators directly. Given $a + b = 1$, $$\frac1a + \frac4b = \frac{1^2}{a} + \frac{2^2}{b} \ge \frac{(1 + 2)^2}{a + b} = 9,$$ with equality when $\frac1a = \frac2b$, that is, at $a = \frac13$ and $b = \frac23$. Tracking the equality case is what locates the extreme point.

## On contests
Three problems here, two AIME and one AMC 12, one solved by it alone. The model AIME use is a pair of constraints that combine into exactly the equality case of the Engel form, which forces the variables to be proportional and so pins every one of them down. It is the default first attempt on an olympiad inequality, and with the weights $b_i = 1$ it proves that the quadratic mean is at least the arithmetic mean.`,

"rearrangement": String.raw`## Why it works
For sorted sequences $a_1\le\cdots\le a_n$ and $b_1\le\cdots\le b_n$, the sum $\sum a_i b_{\sigma(i)}$ over permutations $\sigma$ is largest when $\sigma$ keeps the same order and smallest when it reverses one. The proof is a swap argument: if some pair is matched out of order, exchanging the two partners changes the sum by $(a_i-a_j)(b_{\sigma(i)}-b_{\sigma(j)})$, whose sign forces the straightened pairing to be at least as large. Repeating until everything is aligned needs no convexity or positivity — just the ordering.

## How to use it
It makes "pair large with large" rigorous, and it is the honest engine behind several results: averaging the same-order and reverse-order versions gives [[chebyshev-sum-inequality|Chebyshev's sum inequality]], and it underlies many bounds that look like forced AM-GM. When a cyclic sum resists, ask whether its terms are two sorted sequences in disguise. Equality needs one sequence constant or the orders already matched.

## On contests
Mostly olympiad, but AMC/AIME "assign these values to maximize (or minimize) $\sum a_i b_i$" problems are direct: sort both lists and pair them in the same order for the maximum, opposite order for the minimum.`,

"trivial-inequality": String.raw`
## Why it works
A real number and its negative have the same square, and the square of a positive number is positive, so $x^2 \ge 0$ for every real $x$, with equality exactly at $x = 0$. A sum of squares is therefore nonnegative too, and it is zero only when every square is.

Applied to a difference, it gives the two-variable form $$(a - b)^2 \ge 0 \iff a^2 + b^2 \ge 2ab,$$ with equality exactly when $a = b$. Adding the three such inequalities for the pairs from $a$, $b$, $c$ and halving gives $$a^2 + b^2 + c^2 - ab - bc - ca = \tfrac12\left[(a - b)^2 + (b - c)^2 + (c - a)^2\right] \ge 0.$$

The two-variable form with $a = \sqrt x$ and $b = \sqrt y$ is already [[am-gm|AM-GM]] for two numbers, and [[cauchy-schwarz|Cauchy–Schwarz]] and [[mean-chain|the mean inequalities]] are sums of such squares.

## How to use it
For an expression in several variables, [[completing-the-square|complete the square]] in each variable and read off the constant left over: $$x^2 - 6x + y^2 + 4y + 20 = (x - 3)^2 + (y + 2)^2 + 7 \ge 7,$$ with equality at $(3, -2)$.

When a product or a cross term is in the way, look for a hidden square. $a^2 + b^2 \ge 2ab$ bounds a product by a sum of squares, and $\frac{x}{y} + \frac{y}{x} \ge 2$ for positive $x$ and $y$ is $\left(\sqrt{x/y} - \sqrt{y/x}\right)^2 \ge 0$. Writing a symmetric expression as a sum of squares is the [[sos-method|SOS method]].

The equality case matters as much as the bound: every square must vanish at once, which finds the point where the minimum occurs and confirms that it is actually reached.

## On contests
Two problems here, both AIME, one solved by it alone; the other completes the square first. Minimization questions in two or three free variables usually end as a sum of squares plus a constant, and the equality case gives the point where the minimum occurs.
`,

"abs-triangle-inequality": String.raw`## Why it works
Square both sides for the real/complex case, or read it geometrically: the path through the origin detour cannot be shorter than the direct one. Equality iff the terms share direction (same sign / same argument).

## How to use it
Bounding tool: $|A + B|$ splits, $|A - B|$ lower-bounds via the reverse form. In complex-number problems it converts algebraic constraints into geometric ones (locus arguments, max/min of $|z - w|$ given $|z| = r$: the answer is $|w| \pm r$).

## On contests
"Max/min of $|z - 3 - 4i|$ given $|z| = 1$" → $5 \pm 1$; distance bounds in coordinate problems; and [[casework-method|casework]] elimination in absolute-value equations.`,

"bernoulli-inequality": String.raw`## Why it works
Induct on $n$: it holds at $n = 1$, and if $(1+x)^k \ge 1 + kx$ then — since $x \ge -1$ keeps $1 + x \ge 0$ — multiplying preserves the inequality: $(1+x)^{k+1} \ge (1 + kx)(1 + x) = 1 + (k+1)x + kx^2 \ge 1 + (k+1)x$. Geometrically, $y = 1 + nx$ is the tangent at $x = 0$ to the convex curve $y = (1+x)^n$, so the curve never dips below it; for real exponents it is just convexity of $t \mapsto t^n$.

## How to use it
A fast, calculus-free bound on a power: estimate compound growth, show a power clears a linear target, or sandwich limits like $\left(1 + \tfrac{1}{n}\right)^n$. Keep the flip in mind — for exponents in $[0,1]$, $(1+x)^r \le 1 + rx$ bounds roots from above. It is often the first move that turns a power into something linear before AM–GM or telescoping finishes.

## On contests
Common in estimation and bounding problems on the AMC/AIME, and a standard lemma in olympiad inequalities. Whenever you need "$(1 + \text{small})^{\text{power}}$ is at least (or at most) roughly linear," this is the tool.`,

"log-rules": String.raw`
## Why it works
A logarithm is an exponent, so every log rule is an exponent law read backwards.

Write $x = b^p$ and $y = b^q$, so that $\log_b x = p$ and $\log_b y = q$. Multiplying, $xy = b^pb^q = b^{p+q}$, so $\log_b(xy) = p + q = \log_b x + \log_b y$: adding exponents is adding logs. Dividing instead gives $\frac xy = b^{p-q}$, which is the quotient rule. Raising to a power gives $x^n = (b^p)^n = b^{np}$, so $\log_b x^n = np = n\log_b x$.

The two identities $\log_b b^p = p$ and $b^{\log_b x} = x$ just say that taking a power and taking a log undo each other. That is what the graphs show: $y = b^x$ and $y = \log_b x$ are mirror images across the line $y = x$.

{{figure:mirror}}

A power on the base divides instead of multiplying. By [[change-of-base|change of base]], $$\log_{b^m} x^n = \frac{\log_b x^n}{\log_b b^m} = \frac{n\log_b x}{m},$$ so an exponent on the argument multiplies and an exponent on the base divides. The special case $m = n$ gives $\log_{b^k} x^k = \log_b x$: raising base and argument to the same power changes nothing.

One thing the algebra hides: $\log_b$ is increasing only when $b \gt 1$. For $0 \lt b \lt 1$ it is decreasing, so applying $\log_b$ to both sides of an inequality reverses it, the same trap as dividing by a negative number.

## How to use it
Contest logs are mostly about converting to a common base and hunting structure: products of logs go to the chain rule, sums of logs collapse into the log of a product (watch for a telescoping product inside), and an exponent anywhere, on the argument or on the base, comes out front via $$\log_{b^m} x^n = \frac{n}{m}\log_b x.$$

Domain discipline is where most marks are lost. Arguments must be positive and the base must avoid $1$, so every solution has to be checked against the original equation; extraneous roots are the single most common error in log problems. When an inequality is involved, check whether the base exceeds $1$ before deciding which way the sign goes.

The reason all of this pays is that logs turn multiplication into addition, so a problem that is nonlinear in $x$ is linear in $\log x$. That is the conversion to look for: substituting $u=\log x$ does not simplify the algebra so much as change its type, and a system that looked intractable becomes a linear system you can solve by adding and halving.

## On contests
Almost never alone, 3 of the 45 problems tagged here, and its inseparable partner is [[change-of-base|change of base]] (11 problems), because the first move in nearly every log problem is putting everything over one base so the rules can apply at all.

Two shapes recur. On AMC 12, convert to a common base and substitute $u = \log x$. On AIME, a system in $\log(xy)$, $\log(yz)$ and $\log(zx)$ is linear algebra in three log variables: adding all three and halving gives $\log(xyz)$, and each individual variable follows by subtraction. Recognizing that shape is the entire problem.
`,

"change-of-base": String.raw`
## Key forms
- $\log_a b \cdot \log_b c = \log_a c$ — the two-term chain, the case that actually turns up; the three-term version in the box is the same idea extended
- $\log_a b = \dfrac{1}{\log_b a}$ — inverting the base inverts the logarithm, which is what lets you flip an awkward base
- $\log_a b + \log_b a \ge 2$ for $a, b > 1$ — immediate from $t + \frac1t \ge 2$, and a standard way these appear inside an inequality

## Why it works
A logarithm asks what power of the base gives the number, and writing both the number and the base in terms of a common base $c$ answers that question by division.

Let $\log_b a = t$, so $b^t = a$. Take $\log_c$ of both sides: $\log_c(b^t) = \log_c a$, and by the power rule this is $t\log_c b = \log_c a$. Dividing, $t = \frac{\log_c a}{\log_c b}$. Choosing $c = a$ makes the numerator $1$, which is the reciprocal rule $\log_b a = \frac{1}{\log_a b}$.

The chain rule is the same formula applied to every factor at once. Over a common base, $$\log_a b \cdot \log_b c \cdot \log_c d = \frac{\log b}{\log a} \cdot \frac{\log c}{\log b} \cdot \frac{\log d}{\log c},$$ and each numerator cancels the next denominator, leaving $\frac{\log d}{\log a} = \log_a d$. The same cancellation runs through a chain of any length, which is why these products [[telescoping|telescope]].

## How to use it
Normalize every logarithm to one base first; after that the chain rule collapses products like $\log_2 3 \cdot \log_3 4 \cdots \log_{63} 64$ to $\log_2 64 = 6$ at once. The reciprocal rule handles symmetric pairs: with $t = \log_a b$, the expression $\log_a b + \log_b a$ is $t + \frac1t$, which is at least $2$ when $a, b \gt 1$ by [[am-gm|AM-GM]], and a system in $\log_a b$ and $\log_b a$ becomes a rational equation in $t$.

## On contests
Almost always paired with [[log-rules|the log rules]], in 11 of the 15 problems tagged here and alone in none, because changing base is the step that makes the other rules usable. Telescoping log products are an AMC classic, and AIME layers the reciprocal rule into systems, where substituting $t = \log_a b$ and $\log_b a = \frac1t$ reduces them to rational equations.
`,

"log-swap-identity": String.raw`## Why it works
The identity is $a^{\log_b c}=c^{\log_b a}$. Take $\log_b$ of each side: the left becomes $(\log_b c)(\log_b a)$ and the right becomes $(\log_b a)(\log_b c)$ — the same product, since multiplication commutes. So the base of the power and the argument inside the exponent's logarithm can trade places.

## How to use it
It rewrites awkward exponents into forms that combine or cancel: $2^{\log_3 5}$ and $5^{\log_3 2}$ are the same number, so a sum or ratio mixing them collapses. The common-base version is $x^{\log y}=y^{\log x}$, which means a product like $x^{\log y}\cdot y^{\log x}$ is just $\bigl(x^{\log y}\bigr)^2$. Related anchors: $a^{\log_a x}=x$ and $\log_a b=\frac{1}{\log_b a}$. When an exponent hides a logarithm whose base differs from the power's base, swapping is the move.

## On contests
Occasional but decisive on AMC 12 / AIME — these problems are engineered so the swap makes two terms merge or cancel. Spot the tell (a term like $a^{\log_b c}$ with $a\ne b$) and swap to line it up with its partner.`,

"exponent-laws": String.raw`
## Why it works
For whole-number exponents the laws are counting: $a^m$ is $m$ factors of $a$, so $a^m \cdot a^n$ has $m + n$ factors, and $(a^m)^n$ is $n$ groups of $m$ factors.

Zero, negative and fractional exponents are then defined so that the addition law keeps working. Since $a^m \cdot a^0$ must be $a^m$, $a^0 = 1$. Since $a^n \cdot a^{-n}$ must be $a^0 = 1$, $a^{-n} = \frac1{a^n}$. And since $\left(a^{1/n}\right)^n$ must be $a$, the power $a^{1/n}$ is the $n$th root of $a$, so $a^{m/n} = \sqrt[n]{a^m}$.

## How to use it
Put everything over a common base and compare exponents: $4^x = 8$ becomes $2^{2x} = 2^3$, so $x = \frac32$. To compare sizes, take the same root of both sides: $$2^{300} = 8^{100} \lt 9^{100} = 3^{200}.$$ When the exponents share no convenient factor, take [[log-rules|logarithms]] instead.

Read towers from the top down: $2^{3^2} = 2^9 = 512$, while $(2^3)^2 = 64$. And a law like $(ab)^n = a^nb^n$ has no counterpart for sums: $(a + b)^n$ needs the [[binomial-theorem|binomial theorem]].

## On contests
Four problems here, split between AMC and AIME, one solved by it alone; two continue into [[log-rules|logarithms]], which are the exponent laws read in reverse. Base matching solves most AMC exponential equations, and taking a common root settles size comparisons.
`,

"complex-basics": String.raw`
## Why it works
Every rule comes from treating $i$ as an ordinary symbol and replacing $i^2$ by $-1$ wherever it appears.

Multiply a number by its conjugate: $$(a + bi)(a - bi) = a^2 - abi + abi - b^2i^2 = a^2 + b^2.$$ The imaginary parts cancel and $-b^2i^2$ becomes $+b^2$, leaving a real number, the square of the distance from $0$ to the point $(a, b)$. That is why $z\bar z = |z|^2$, and why multiplying the top and bottom of a fraction by the conjugate of the bottom makes the bottom real: $\frac1z = \frac{\bar z}{z\bar z} = \frac{\bar z}{|z|^2}$.

The powers of $i$ cycle because each step multiplies by $i$ once more: $i^1 = i$, $i^2 = -1$, $i^3 = -i$ and $i^4 = 1$, and then $i^5 = i$ starts the cycle over. So $i^n$ depends only on $n$ modulo $4$.

Moduli multiply because conjugation respects products, $\overline{zw} = \bar z\,\bar w$, which you can check by expanding both sides. Then $$|zw|^2 = zw\,\overline{zw} = z\bar z\,w\bar w = |z|^2|w|^2.$$ Written out in real numbers this is the [[brahmagupta-fibonacci|Brahmagupta–Fibonacci identity]], $(a^2 + b^2)(c^2 + d^2) = (ac - bd)^2 + (ad + bc)^2$.

## How to use it
Division means multiplying the top and bottom by the conjugate of the bottom, which turns the denominator into the real number $|z|^2$. Powers of $i$ reduce by taking the exponent modulo $4$. And modulus conditions become algebra through $$|z|^2 = z\bar z, \qquad z + \bar z = 2\operatorname{Re}(z), \qquad z - \bar z = 2i\operatorname{Im}(z);$$ in particular $z$ is real exactly when $z = \bar z$.

The reason to move a problem into the complex plane is that it collapses two coordinates into one number, so a pair of real equations becomes a single complex one and geometric operations become arithmetic. Translation is addition, rotation is multiplication by a number of modulus $1$, and reflection in the real axis is conjugation. A configuration that needed coordinates and trigonometry becomes algebra in one variable.

{{figure:plane}}

The single most useful consequence is that on the unit circle $\bar z = \frac1z$. Conjugates are usually the obstruction in a complex computation, and that substitution removes them entirely, turning an expression that mixes $z$ and $\bar z$ into a rational function of $z$ alone.

## On contests
Alone in 3 of its 26 problems; its usual partner is [[roots-of-unity|roots of unity]] (3), where the unit-circle substitution is exactly what the problem is built around.

The recurring shapes are $|z|=1$ problems solved by $\bar z = 1/z$, sums of powers of $i$ that cycle with period four, and any rotation by $90^\circ$ — which is multiplication by $i$ and nothing more, making [[rotation-90|the coordinate rotation]] a special case of this card.
`,

"eulers-formula": String.raw`## Why it works
Compare Taylor series of $e^{i\theta}$, $\cos\theta$, $\sin\theta$ — or accept it as the definition of complex exponentials and verify the multiplication law via [[angle-addition|angle addition]] formulas (which it then re-derives, circularly but consistently).

## How to use it
Polar form makes multiplication trivial: moduli multiply, angles add. Convert to polar for any power, root, or rotation task; convert back for addition. Rotation of point $z$ about $p$ by $\theta$: $p + e^{i\theta}(z - p)$ — geometry problems become one-line computations.

## On contests
The bridge between trig and algebra on AIME: products of cosines, sums like $\sum \cos k\theta$ (real part of [[geometric-series|geometric series]]), and polygon-vertex computations all route through $e^{i\theta}$.`,

"de-moivre": String.raw`
## Why it works
Multiplying complex numbers multiplies their lengths and adds their angles, so multiplying a number of length $1$ by itself $n$ times adds its angle to itself $n$ times.

The key step is a product of two such numbers. Using $i^2 = -1$, $$(\cos\alpha + i\sin\alpha)(\cos\beta + i\sin\beta) = (\cos\alpha\cos\beta - \sin\alpha\sin\beta) + i(\sin\alpha\cos\beta + \cos\alpha\sin\beta).$$ The two brackets are exactly [[angle-addition|the angle-addition formulas]], so the product is $\cos(\alpha + \beta) + i\sin(\alpha + \beta)$: the angles add.

Now apply that repeatedly. Each further factor of $\cos\theta + i\sin\theta$ adds $\theta$ to the angle, so after $n$ factors the angle is $n\theta$, which is the theorem for every positive integer $n$. For negative $n$, the reciprocal of $\cos\theta + i\sin\theta$ is its conjugate $\cos(-\theta) + i\sin(-\theta)$, so the theorem holds for every integer $n$.

With [[eulers-formula|Euler's formula]] $e^{i\theta} = \cos\theta + i\sin\theta$ it is simply the exponent law $\left(e^{i\theta}\right)^n = e^{in\theta}$.

## How to use it
Forward, it computes powers without expanding: write the base in polar form, raise the modulus to the $n$th power and multiply the angle by $n$. For $(1 + i)^{20}$, the modulus is $\sqrt2$ and the angle $45^\circ$, and $900^\circ$ is $180^\circ$ plus full turns: $$(1 + i)^{20} = \left(\sqrt2\right)^{20}\left(\cos 900^\circ + i\sin 900^\circ\right) = -2^{10}.$$

Backward is the richer direction. Expand $(\cos\theta + i\sin\theta)^3$ with [[binomial-theorem|the binomial theorem]] and match the real part with $\cos 3\theta$: the real part is $\cos^3\theta - 3\cos\theta\sin^2\theta$, and replacing $\sin^2\theta$ by $1 - \cos^2\theta$ gives $$\cos 3\theta = 4\cos^3\theta - 3\cos\theta.$$ The same move gives $\tan n\theta$ as a rational function of $\tan\theta$.

## On contests
Never the whole problem, none of the 17 tagged here, and most often paired with [[roots-of-unity|roots of unity]] (6 problems), since the $n$th roots of unity are exactly the numbers whose angles De Moivre multiplies back to a full turn. AIME trig identities that seem to come from nowhere are usually De Moivre expansions, and it is also the fastest way to evaluate a large power of a complex number such as $(1 + i)^{20}$.
`,

"roots-of-unity": String.raw`
## Why it works
A root of $z^n = 1$ must have length $1$, and its angle must come back to a whole number of turns after $n$ steps, which leaves exactly $n$ equally spaced points.

Write $z = r(\cos\theta + i\sin\theta)$. By [[de-moivre|De Moivre's theorem]], $z^n$ has length $r^n$ and angle $n\theta$. For $z^n = 1$ the length must be $1$, so $r = 1$, and the angle $n\theta$ must be a whole number of turns, $2\pi k$, so $$\theta = \frac{2\pi k}{n}.$$ The values $k = 0, 1, \ldots, n - 1$ give $n$ different points, and every other $k$ repeats one of them, as the figure at the top shows.

Since $x^n - 1$ has degree $n$ and these are $n$ distinct roots, they are all of its roots, and $$x^n - 1 = \prod_{k=0}^{n-1}(x - \omega^k).$$ [[vietas-general|Vieta's formulas]] then read their sum from the missing $x^{n-1}$ term, which gives $0$ when $n \gt 1$, and their product from the constant term, $(-1)^n \cdot (-1) = (-1)^{n+1}$. The zero sum has a picture too: the points are balanced around the center, so their average is the center.

## How to use it
Evaluate the factorization at a chosen point to turn a product over the roots into a number. Dividing out the factor $x - 1$ leaves $1 + x + \cdots + x^{n-1} = \prod_{k=1}^{n-1}(x - \omega^k)$, and at $x = 1$ this gives $\prod_{k=1}^{n-1}(1 - \omega^k) = n$: the product of the distances from one vertex of the polygon to all the others is $n$. Evaluating at $x = -1$ gives the alternating versions.

Powers of a fixed root recycle with period $n$, so exponents live modulo $n$. And summing $\omega^{jk}$ over all $k$ gives $n$ when $n$ divides $j$ and $0$ otherwise, which is [[roots-of-unity-filter|the filter]] that picks out every $n$th coefficient of a polynomial.

## On contests
An AIME staple, with 17 problems tagged here and only 1 solved by the roots alone; the usual partner is [[de-moivre|De Moivre's theorem]] (6 problems), which locates the roots in the first place. The recurring uses are evaluating a polynomial at every root and multiplying the values, symmetric sums over the vertices of a regular polygon, and periodicity arguments. Seeing the regular $n$-gon as the $n$th roots converts polygon geometry into algebra.
`,

"roots-of-unity-filter": String.raw`
## Key forms
- $\frac1n\alt{\sum_{j=0}^{n-1} f(\omega^j)}{\left(f(1) + f(\omega) + \cdots + f(\omega^{n-1})\right)}$ — averaging a [[generating-function-method|generating function]] over the $n$th [[roots-of-unity|roots of unity]] keeps exactly the coefficients whose index is divisible by $n$
- $\alt{\sum_{k\equiv r\,(n)}[x^k]f(x)=\frac1n\sum_{j=0}^{n-1}\omega^{-jr}f(\omega^j)}{[x^r]f + [x^{r+n}]f + [x^{r+2n}]f + \cdots = \frac1n\left(f(1) + \omega^{-r}f(\omega) + \cdots + \omega^{-(n-1)r}f(\omega^{n-1})\right)}$ — the phase factor $\omega^{-jr}$ selects any residue class, the form to write when the problem names a specific remainder
- $\frac{f(1) + f(-1)}{2}$ and $\frac{f(1) + f(\omega) + f(\omega^2)}{3}$ — the cases $n = 2$ and $n = 3$, which cover almost every contest use

## Why it works
The filter rests on one fact: the powers of a root of unity average to $1$ or to $0$.

With $\omega = e^{2\pi i/n}$, the numbers $1, \omega^k, \omega^{2k}, \ldots, \omega^{(n-1)k}$ form a [[geometric-series|geometric series]] with ratio $\omega^k$. If $n$ divides $k$, every term is $1$ and the average is $1$. Otherwise the ratio is not $1$, and the sum is $$\frac{1 - \omega^{nk}}{1 - \omega^k} = 0,$$ because $\omega^{nk} = 1$.

Now average $f(x) = \sum_k a_kx^k$ over the $n$ roots. Exchanging the two sums, $$\frac1n\sum_{j=0}^{n-1} f(\omega^j) = \sum_k a_k \cdot \frac1n\sum_{j=0}^{n-1}\omega^{jk},$$ and the inner average is $1$ when $n \mid k$ and $0$ otherwise, so only those coefficients survive. To keep the class $k \equiv r$ instead, multiply by $\omega^{-jr}$ first, which shifts every exponent down by $r$.

## How to use it
Write the count as the coefficients of a generating function first. Subsets of size $k$ are the coefficient of $x^k$ in $(1 + x)^m$, and subsets with sum $k$ are the coefficient of $x^k$ in $\prod_i(1 + x^{i})$. Then average over the roots of unity and evaluate each value in [[eulers-formula|polar form]].

For every third binomial coefficient, $$\sum_{3 \mid k}\binom mk = \frac{(1 + 1)^m + (1 + \omega)^m + (1 + \omega^2)^m}{3},$$ and since $1 + \omega$ and $1 + \omega^2$ are $e^{\pm i\pi/3}$, the last two terms add to $2\cos\frac{m\pi}{3}$.

The case $n = 2$ needs only $f(1)$ and $f(-1)$, as in the example, and $n = 4$ uses $\pm1$ and $\pm i$. Most contest problems are one of these three.

## On contests
Four problems here, two AIME, one AMC 12 and one AMC 10, one solved by it alone. The typical question counts subsets whose sum is divisible by $3$, filtering $\prod(1 + x^k)$ at the cube roots of unity; harder ones read a multisection as a reduction modulo $x^n - 1$ and finish with [[fermats-little-theorem|Fermat's little theorem]]. The simplest case, $n = 2$, is a count by parity.`,

"roots-unity-distance-product": String.raw`
## Why it works
Dividing $x^n - 1$ by $x - 1$ leaves a polynomial whose roots are exactly the other $n - 1$ roots of unity, so it factors over them: $$\frac{x^n - 1}{x - 1} = 1 + x + \cdots + x^{n-1} = (x - \omega)(x - \omega^2)\cdots(x - \omega^{n-1}).$$

At $x = 1$ the middle expression is a sum of $n$ ones, so $(1 - \omega)(1 - \omega^2)\cdots(1 - \omega^{n-1}) = n$. The division happens before the substitution, so no limit is needed, and taking absolute values turns each factor into a distance.

Each factor is a chord of the unit circle. The points $1$ and $\omega^k$ are separated by the central angle $\frac{2k\pi}{n}$, and the radius bisecting that angle cuts the chord into two halves of length $\sin\frac{k\pi}{n}$, so $$|1 - \omega^k| = 2\sin\frac{k\pi}{n}.$$

{{figure:chord}}

Multiplying the $n - 1$ chords gives $2^{n-1}\sin\frac{\pi}{n}\sin\frac{2\pi}{n}\cdots\sin\frac{(n-1)\pi}{n} = n$, which is the sine product.

## How to use it
Scale to the unit circle first. On a circle of radius $R$ every chord is $R$ times as long, so the product of the distances from one vertex of a regular $n$-gon to the other $n - 1$ vertices is $nR^{n-1}$, as in the example.

For products of sines at equally spaced angles, pair $\sin\frac{k\pi}{n}$ with $\sin\frac{(n-k)\pi}{n}$, which is equal to it, and take a square root. With $n = 9$ every factor appears twice, so $$\sin 20^\circ \sin 40^\circ \sin 60^\circ \sin 80^\circ = \sqrt{\frac{9}{2^8}} = \frac{3}{16}.$$

When the point is on the circle but not at a vertex, the product depends on where it is, which is [[ngon-vertex-distance-product|the product from a general point]]; other spacings of sines and cosines are on [[evenly-spaced-angle-products|evenly spaced angle products]].

## On contests
Three problems here, all AIME, none solved by it alone. The factors $1 - \omega^k$ come from a polynomial whose roots are roots of unity, or appear as chord lengths in a regular polygon, and the product is finished with [[de-moivre|De Moivre's theorem]] or a [[double-angle|double-angle]] identity that simplifies what it leaves.
`,

"pythagorean-identities": String.raw`
## Why it works
The point at angle $\theta$ on the unit circle is $(\cos\theta, \sin\theta)$, and its distance from the center is $1$, so the [[pythagorean-theorem|Pythagorean theorem]] gives $\cos^2\theta + \sin^2\theta = 1$.

Dividing that equation by $\cos^2\theta$, where it is not zero, gives $1 + \tan^2\theta = \sec^2\theta$; dividing by $\sin^2\theta$ gives $\cot^2\theta + 1 = \csc^2\theta$. The second identity can also be seen directly: extending the radius to the tangent line $x = 1$ makes a right triangle with legs $1$ and $\tan\theta$ and hypotenuse $\sec\theta$.

{{figure:unit-circle}}

## How to use it
Given one value, get the others, choosing signs by the quadrant: if $\sin\theta = \frac35$ and $\theta$ is acute, then $\cos\theta = \sqrt{1 - \frac{9}{25}} = \frac45$ and $\tan\theta = \frac34$. To solve an equation with several functions, replace them all by one: $2\sin^2\theta = 3\cos\theta$ becomes $2 - 2\cos^2\theta = 3\cos\theta$, a quadratic in $\cos\theta$.

The squaring trick is a favorite. If $\sin\theta + \cos\theta = k$, squaring gives $1 + 2\sin\theta\cos\theta = k^2$, so $\sin\theta\cos\theta = \frac{k^2 - 1}{2}$. From the sum and product, expressions such as $\sin^3\theta + \cos^3\theta$ follow by factoring.

## On contests
Six problems here, five of them AIME, one solved by it alone; two combine it with [[log-rules|logarithm rules]], in problems that give logarithms of $\sin x$ and $\cos x$. The sum-and-product squaring trick is a permanent AMC favorite.
`,

"common-angle-values": String.raw`## Why it works
The [[special-right-triangles|two special right triangles]] — legs $1$ with hypotenuse $\sqrt2$, and sides $1, \sqrt3, 2$ — give the values directly as opposite/hypotenuse and adjacent/hypotenuse. The $0^\circ$ and $90^\circ$ entries are the degenerate limits on the unit circle, where $\tan 90^\circ$ blows up (undefined).

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

"angle-addition": String.raw`
## Why it works
Turning by angle $a$ and then by angle $b$ is the same as turning by $a + b$, and writing that out in coordinates is the formula.

With complex numbers the computation is one line. The point at angle $\theta$ on the unit circle is $\cos\theta + i\sin\theta$, and multiplying by it turns the plane by $\theta$, so $$\cos(a + b) + i\sin(a + b) = (\cos a + i\sin a)(\cos b + i\sin b).$$ Expanding the right side with $i^2 = -1$ gives $$(\cos a\cos b - \sin a\sin b) + i(\sin a\cos b + \cos a\sin b),$$ and matching real and imaginary parts gives both formulas at once.

Without complex numbers, draw it. Put a right triangle $OQP$ with hypotenuse $OP = 1$ and angle $b$ at $O$ so that its leg $OQ = \cos b$ lies along the line at angle $a$ above the axis. Then $P$ is at angle $a + b$, so its height is $\sin(a + b)$. That height splits at the level of $Q$: $Q$ is $\cos b$ along a line at angle $a$, so it is $\sin a\cos b$ high, and the leg $QP = \sin b$ is tilted at angle $a$ from vertical, so it climbs a further $\cos a\sin b$.

{{figure:stacked}}

The difference formulas follow by replacing $b$ with $-b$, using $\cos(-b) = \cos b$ and $\sin(-b) = -\sin b$. Dividing the sine formula by the cosine formula, then dividing the top and bottom by $\cos a\cos b$, gives the tangent formula.

## How to use it
Nearly everything else in trigonometry is downstream. [[double-angle|Double angle]] is the case $a = b$, half angle is double angle read backwards, and shifts like $\sin(\theta + 90^\circ) = \cos\theta$ are the case $b = 90^\circ$. Used directly, the formulas give exact values at $15^\circ$, $75^\circ$ and $105^\circ$ as sums and differences of $30^\circ$, $45^\circ$ and $60^\circ$.

Read backwards, they collapse a combination of sine and cosine into one wave, which is [[harmonic-addition|harmonic addition]]; its maximum is $\sqrt{a^2 + b^2}$.

## On contests
An AIME and AMC 12 tool, with 16 problems tagged here and 2 that need nothing else. Its usual partners are [[trig-substitution|trigonometric substitution]] (3 problems), where a substitution turns an algebraic sum into an angle sum, and [[chord-length|chord lengths]] (2). The tangent form computes angle sums in geometry, such as the angle between two lines from their slopes, and it telescopes arctangent series.
`,

"harmonic-addition": String.raw`## Why it works
Expand the right-hand side by [[angle-addition|angle addition]]: $R\sin(\theta+\varphi) = (R\cos\varphi)\sin\theta + (R\sin\varphi)\cos\theta$. Matching coefficients forces $R\cos\varphi = a$ and $R\sin\varphi = b$, so $a^2+b^2 = R^2$ and $\tan\varphi = \frac{b}{a}$. The pair $(a,b)$ is just the point $(R,\varphi)$ in [[eulers-formula|polar form]], which is why the amplitude is a hypotenuse.

## How to use it
Read it as a range statement. Since $\sin$ covers $[-1,1]$, the expression covers $[-R,R]$, so the maximum is $\sqrt{a^2+b^2}$ and the minimum its negative, with no calculus and no critical points. "Max of $3\sin x + 4\cos x$" is $5$ on sight. It also solves equations of the form $a\sin\theta + b\cos\theta = c$, which has a solution exactly when $|c| \le \sqrt{a^2+b^2}$, and it is the reason a sum of two sinusoids of the same frequency is another sinusoid of that frequency. Use the cosine form $R\cos(\theta-\varphi)$ when the phase is more natural measured from the cosine.

## On contests
A high-frequency AMC 12 and AIME shape whenever a trigonometric expression must be bounded, and the usual disguise is a problem that never mentions trigonometry: maximizing $3x+4y$ on the circle $x^2+y^2=1$ is the same statement, with $\sqrt{a^2+b^2}$ playing the role [[cauchy-schwarz|Cauchy-Schwarz]] plays in the algebraic phrasing. Watch the quadrant — $\tan\varphi = \frac ba$ alone does not distinguish $\varphi$ from $\varphi + 180^\circ$, and the signs of $a$ and $b$ are what settle it.`,

"double-angle": String.raw`
## Why it works
Doubling an angle is adding it to itself, so each formula is an [[angle-addition|angle addition formula]] with the two angles equal.

Put $\alpha = \beta = \theta$ into $$\sin(\alpha + \beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta$$ and into its companions for cosine and tangent. Each one collapses: $$\sin 2\theta = 2\sin\theta\cos\theta, \qquad \cos 2\theta = \cos^2\theta - \sin^2\theta, \qquad \tan 2\theta = \frac{2\tan\theta}{1 - \tan^2\theta}.$$

The sine formula can also be seen directly. Take an isosceles triangle with two sides of length $1$ and the angle $2\theta$ between them, for $\theta$ below $90^\circ$. By [[trig-area|the sine area formula]] its area is $\frac12\sin 2\theta$.

The altitude from the apex cuts it into two right triangles, each with hypotenuse $1$ and angle $\theta$ at the apex, so each has legs $\cos\theta$ and $\sin\theta$. The triangle's base is then $2\sin\theta$ and its height $\cos\theta$, and its area is $\frac12 \cdot 2\sin\theta \cdot \cos\theta$. The two areas are equal, which is $\sin 2\theta = 2\sin\theta\cos\theta$.

{{figure:isosceles}}

The other two forms of $\cos 2\theta$ come from $\sin^2\theta + \cos^2\theta = 1$. Replacing $\sin^2\theta$ by $1 - \cos^2\theta$ gives $2\cos^2\theta - 1$, and replacing $\cos^2\theta$ by $1 - \sin^2\theta$ gives $1 - 2\sin^2\theta$. Solving each of these for the square gives the power-reduction formulas.

Finally, dividing $\sin 2\theta$ and $\cos 2\theta$ by $\cos^2\theta + \sin^2\theta$, which equals $1$, and then dividing top and bottom by $\cos^2\theta$ writes both in $t = \tan\theta$: $\sin 2\theta = \frac{2t}{1 + t^2}$ and $\cos 2\theta = \frac{1 - t^2}{1 + t^2}$. This is the [[weierstrass-substitution|Weierstrass substitution]], which turns a trigonometric equation into a rational one in a single variable.

## How to use it
Choose the $\cos 2\theta$ form that removes what you do not want: $2\cos^2\theta - 1$ keeps cosines and $1 - 2\sin^2\theta$ keeps sines. From $\cos\theta = \frac35$, for instance, $$\cos 2\theta = 2 \cdot \frac{9}{25} - 1 = -\frac{7}{25}$$ without ever finding $\sin\theta$.

Read backwards, the formulas lower powers. Power reduction turns $\sin^2\theta$ and $\cos^2\theta$ into first powers of $\cos 2\theta$, the usual first step on a sum of squared sines or cosines, and $\sin\theta\cos\theta = \frac12\sin 2\theta$ turns a product into a single sine, which is how it appears inside area formulas.

Halving works the same way in reverse: $\cos\theta = 2\cos^2\frac\theta2 - 1$ gives $\cos\frac\theta2$ from $\cos\theta$ up to sign, which is how chains of half angles are unwound.

## On contests
Eleven problems here, ten of them AIME, and one solved by it alone. It usually converts an angle the figure gives into the doubled or halved angle another formula needs, next to the [[law-of-cosines|law of cosines]], a [[chord-length|chord length]] or an [[inradius-area|inradius]] computation. Watch for an angle bisector or an inscribed angle, both of which put an angle and its double in the same figure. Power reduction appears in AIME sums of squared trigonometric values.
`,

"half-angle": String.raw`
## Why it works
They are the double angle formulas with $\theta$ in place of $2\theta$, solved for the half angle.

From $\cos\theta = 1 - 2\sin^2\frac\theta2$ and $\cos\theta = 2\cos^2\frac\theta2 - 1$, solving for the squares gives the first two formulas. For the tangent, divide $\sin\theta = 2\sin\frac\theta2\cos\frac\theta2$ by $1 + \cos\theta = 2\cos^2\frac\theta2$: $$\frac{\sin\theta}{1 + \cos\theta} = \frac{2\sin\frac\theta2\cos\frac\theta2}{2\cos^2\frac\theta2} = \tan\frac\theta2.$$

The tangent form also has a picture. On the unit circle, the angle at $(-1, 0)$ that looks at the arc from $(1, 0)$ to $(\cos\theta, \sin\theta)$ is $\frac\theta2$, by the [[inscribed-angle-theorem|inscribed angle theorem]], and the line from $(-1, 0)$ to that point has slope $\frac{\sin\theta}{1 + \cos\theta}$.

{{figure:inscribed}}

## How to use it
Repeated halving gives exact values: $$\cos 22.5^\circ = \sqrt{\frac{1 + \cos 45^\circ}{2}} = \frac{\sqrt{2 + \sqrt2}}{2}.$$ Read backwards, a nested radical like $\sqrt{2 + \sqrt2}$ is $2\cos 22.5^\circ$, which is the idea behind [[trig-substitution|trigonometric substitution]]. Choose the sign of each square root by the quadrant of $\frac\theta2$.

In triangle problems prefer the radical-free tangent forms. The incircle gives $\tan\frac A2 = \frac{r}{s - a}$, because the incenter, the vertex $A$ and the point where the incircle touches $AB$ form a right triangle with legs $r$ and $s - a$; [[half-angle-tangent-identity|the half-angle tangent identity]] develops this.

## On contests
Five problems here, split between AMC and AIME, none by it alone; two use [[tangent-facts|tangent lengths]] with the incircle form above, and two follow the [[law-of-cosines|law of cosines]], which produces $\cos\theta$ when the problem needs the half angle.
`,

"product-sum": String.raw`
## Why it works
Adding or subtracting two angle addition formulas cancels half the terms, and what is left is a product on one side and a sum on the other.

For example, $\cos(a - b) = \cos a\cos b + \sin a\sin b$ and $\cos(a + b) = \cos a\cos b - \sin a\sin b$. Subtracting the second from the first leaves $$\cos(a - b) - \cos(a + b) = 2\sin a\sin b,$$ and adding them gives $2\cos a\cos b$. The sine formulas pair up the same way.

Setting $x = a + b$ and $y = a - b$, so that $a = \frac{x + y}{2}$ and $b = \frac{x - y}{2}$, turns each product-to-sum formula into a sum-to-product one. The sum-to-product formulas also have a picture: the midpoint of the chord between two points of the unit circle has coordinates that are the averages of theirs.

{{figure:midpoint}}

## How to use it
Turn products into sums to make a series telescope. Multiplying $\sin\theta + \sin 2\theta + \cdots + \sin n\theta$ by $2\sin\frac\theta2$ turns each term into a difference of two cosines, and the sum collapses to two terms; that is the derivation of [[sin-cos-ap-sum|the sum of sines in arithmetic progression]].

Turn sums into products to solve equations: $\sin x + \sin 3x = 0$ becomes $2\sin 2x\cos x = 0$, which splits into $\sin 2x = 0$ or $\cos x = 0$. A single product can also be evaluated directly: $$\sin 75^\circ \sin 15^\circ = \frac12(\cos 60^\circ - \cos 90^\circ) = \frac14.$$

## On contests
Six problems here, all AIME, none by it alone: two feed a [[telescoping|telescoping sum]] such as $\sum \sin k^\circ$, and two simplify a [[law-of-cosines|law of cosines]] computation involving several angles. When an equation mixes sines or cosines of different multiples of $\theta$, sum-to-product is the standard first step.
`,

"special-trig-values": String.raw`## Why it works
$\sin 15^\circ$: angle subtraction $45^\circ - 30^\circ$. The $18^\circ/36^\circ$ family: the isosceles 36-72-72 triangle's self-similarity yields the [[golden-ratio-pentagon|golden ratio]], or solve $\sin 2\theta = \cos 3\theta$ at $\theta = 18^\circ$ as a cubic.

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
Multiply the sum by $2\sin\frac{d}{2}$: each product-to-sum expansion telescopes, leaving only boundary terms — which reassemble into the closed form ("Dirichlet kernel" argument). Alternatively: imaginary part of the [[geometric-series|geometric series]] $\sum e^{i(a + kd)}$.

## How to use it
Both routes are worth knowing: the $2\sin\frac{d}{2}$ multiplication is self-contained; the complex geometric series is faster if you're fluent. Special case to remember: $\sum_{k=1}^{n-1}\sin\frac{k\pi}{n} = \cot\frac{\pi}{2n}$; and sums of cosines of equally spaced angles around a full circle vanish.

## On contests
AIME sums like $\sum_{k=1}^{35}\sin 5k^\circ$ (a known AIME problem) are direct applications. The vanishing-over-full-circle fact also short-circuits many symmetric configurations.`,

"floor-basics": String.raw`
## Why it works
Every real number sits in exactly one gap between consecutive integers, and the floor records which gap it is in.

For any real $x$ there is exactly one integer $n$ with $$n \le x \lt n + 1,$$ because the intervals $[n, n + 1)$ cover the number line without overlapping. That $n$ is $\lfloor x \rfloor$, and then $\{x\} = x - n$ is at least $0$ and less than $1$. The figure at the top shows the two pieces: the floor jumps up by $1$ at each integer, while the fractional part climbs from $0$ and resets there.

The identities follow from this one fact. Adding an integer $n$ to $x$ moves it into the gap $n$ places along, so $$\lfloor x + n \rfloor = \lfloor x \rfloor + n.$$ If $x$ is not an integer, it lies strictly inside a gap, $m \lt x \lt m + 1$, so $-m - 1 \lt -x \lt -m$ and $\lfloor -x \rfloor = -m - 1$; the two floors add to $-1$. If $x$ is an integer, both floors are exact and add to $0$.

Counting multiples is the same idea. The multiples of $d$ up to $n$ are $d, 2d, \ldots, kd$, where $k$ is the largest integer with $kd \le n$, that is, the largest integer at most $\frac nd$, which is $\left\lfloor \frac nd \right\rfloor$.

## Full proof
The nested-division rule $$\left\lfloor \frac{x}{ab} \right\rfloor = \left\lfloor \frac{\lfloor x/a \rfloor}{b} \right\rfloor$$ holds for every real $x$ and all positive integers $a$ and $b$.

Let $q = \lfloor x/a \rfloor$, so that $qa \le x \lt (q + 1)a$, and let $Q = \lfloor q/b \rfloor$, so that $Qb \le q \le Qb + b - 1$, the upper bound holding because $q$ is an integer. Then $x \ge qa \ge Qab$, and $x \lt (q + 1)a \le (Qb + b)a = (Q + 1)ab$. So $Qab \le x \lt (Q + 1)ab$, which says exactly that $\left\lfloor \frac{x}{ab} \right\rfloor = Q$.

## How to use it
To solve an equation with a floor in it, write $$x = n + f, \qquad n = \lfloor x \rfloor, \quad 0 \le f \lt 1,$$ with $n$ an integer. That converts one equation in a real unknown into an equation about an integer plus an inequality, and the inequality is what makes the search finite: a floor equation over the reals has no method until it becomes a small number of integer cases.

For $\lfloor x \rfloor = \frac x2 + 1$, substituting gives $f = n - 2$, and $0 \le f \lt 1$ forces $n = 2$, so $x = 2$ is the only solution.

Integers pull straight out of floors, and the number of integers in an interval $[a, b]$ is $$\lfloor b \rfloor - \lceil a \rceil + 1.$$ When a floor sits inside a sum, split the range into the stretches where the floor is constant; on each stretch it is a single integer, and the sum becomes a short list of products.

## On contests
Floor equations and floor-counting problems permeate AMC and AIME, and the card stands alone in 6 of its 31 problems. When it does not, the partner is [[casework-method|casework]] (4 problems) — which is the method, not a coincidence: the band substitution produces the cases and casework closes them.

Two facts pay for themselves. Counting multiples of $d$ up to $n$ is $\lfloor n/d \rfloor$, which turns most floor-counting into divisor arithmetic. And nested division collapses: $$\lfloor \frac{n}{ab}\rfloor = \lfloor\frac{\lfloor n/a\rfloor}{b}\rfloor,$$ so repeated halving or repeated division never needs to be unwound.
`,

"hermite-identity": String.raw`## Why it works
As $x$ increases by $\frac{1}{n}$ steps, exactly one of the shifted floors $\lfloor x + \frac{k}{n}\rfloor$ ticks up at each step — the left side $\lfloor nx\rfloor$ ticks at the same moments. Both sides are step functions with identical jumps and equal value at $x = 0$.

## How to use it
Splits $\lfloor nx \rfloor$ into pieces when summing floors of arithmetic sequences, and collapses sums like $\sum_{k=0}^{n-1}\lfloor x + \frac{k}{n}\rfloor$ on sight. Companion identity for counting: $\lfloor x\rfloor + \lfloor -x\rfloor$ is $0$ or $-1$ — useful for symmetric summations.

## On contests
AIME floor-sum problems ($\sum_k \lfloor \frac{2^k \cdot a}{b}\rfloor$-type) and Putnam-lite identities. Recognizing that a messy floor sum is Hermite-in-reverse is usually the entire problem.`,

"denesting-radicals": String.raw`
## Key forms
- $\sqrt{a\pm\sqrt b}=\sqrt{\frac{a+\sqrt{a^2-b}}{2}}\pm\sqrt{\frac{a-\sqrt{a^2-b}}{2}}$ — this denests into rationals exactly when $a^2-b$ is a perfect square, which is the test to run first
- in practice, match $(\sqrt x\pm\sqrt y)^2=x+y\pm2\sqrt{xy}$ instead: solve $x+y=a$ with $4xy=b$, a sum-and-product pair, giving results like $\sqrt{3+2\sqrt2}=1+\sqrt2$ in one line — faster than the general formula, and it shows at once when denesting is impossible
- $\sqrt{2+2\cos\theta}=2\cos\frac\theta2$ for $0\le\theta\le\pi$ — the trigonometric way out for radicals that do not denest, such as $\sqrt{2+\sqrt2}=2\cos22.5^\circ$

## Why it works
Denesting is [[square-of-sum|the square of a sum]] run backwards.

If $\sqrt{a + \sqrt b} = \sqrt x + \sqrt y$, squaring gives $$a + \sqrt b = x + y + 2\sqrt{xy}.$$ With $\sqrt b$ irrational and $x$, $y$ rational, the rational parts and the root parts must match separately, so $x + y = a$ and $4xy = b$. The minus sign works the same way, with $x \ge y$.

A sum and a product make $x$ and $y$ the two roots of $$t^2 - at + \tfrac b4 = 0,$$ whose discriminant is $a^2 - b$. The roots are rational exactly when that is a perfect square, which is the test, and solving the quadratic gives the general formula in Key forms.

## How to use it
In practice, skip the formula. Write the inner term as $2\sqrt{\,\cdot\,}$ and look for two numbers with the right sum and product. For $\sqrt{5 + 2\sqrt6}$ you want sum $5$ and product $6$, which is $2$ and $3$: $$\sqrt{5 + 2\sqrt6} = \sqrt2 + \sqrt3.$$ For $\sqrt{7 + 4\sqrt3} = \sqrt{7 + 2\sqrt{12}}$ you want sum $7$ and product $12$, giving $2 + \sqrt3$.

If no pair works, the radical does not denest; keep the nested form, or square the whole expression instead. Some that do not denest still simplify with trigonometry, since $2 + 2\cos\theta = 4\cos^2\frac\theta2$.

The same matching works for bigger radicands. To take the square root of an expression with several surds, assume it is the square of something like $a\sqrt2 + b\sqrt3 + c\sqrt5$ and match the cross terms.

## On contests
Four problems here, three AIME and one AMC 10, none solved by it alone. The denesting is usually a middle step: a base such as $11 + 4\sqrt7$ turns out to be the perfect square $(\sqrt7 + 2)^2$ before something like a [[an-minus-bn|difference of cubes]] finishes, or a radicand with several surds is matched to the square of a sum. It also turns up when simplifying distances and when matching a final answer to the choices.`,

"infinite-nest": String.raw`## Key forms
- name the whole expression $x$ and use its self-similarity, since the tail is a copy of the whole — $x=\sqrt{a+x}$ gives $x^2-x-a=0$, and a continued fraction $x=a+\frac1x$ gives $x^2-ax-1=0$
- power towers behave differently: $x^{x^{\cdots}}=a$ gives $x^a=a$, but the tower converges only for $e^{-e}\le x\le e^{1/e}$, which is the trap behind "the $\sqrt2$ tower equals $2$, not $4$" — check convergence before solving, since the algebra happily produces a value the tower never reaches
- always select the root consistent with an obvious bound — positivity, or being at least as large as the first term — since the equation cannot distinguish the limit from its rejected partner

## Why it works
If the infinite expression converges to $x$, self-similarity gives an equation in $x$ (the tail equals the whole). Convergence itself: monotone + bounded for standard cases — contest problems presume it.

## How to use it
Name it, equation it, solve it, then select the root consistent with obvious bounds (positivity, size). Continued fractions give quadratics (e.g. $1 + \cfrac{1}{1 + \cdots} = \varphi$); power towers $x^{x^{\cdots}} = a$ give $x^a = a$ (converges only for $e^{-e} \le x \le e^{1/e}$ — the boundary trap behind "$\sqrt2$ tower $= 2$, not 4").

## On contests
AMC/AIME nested radicals and continued fractions are routine; the root-selection step is where errors happen. Ramanujan-style nests ($\sqrt{1 + 2\sqrt{1 + 3\sqrt{\cdots}}} = 3$) occasionally cameo — pattern-match to $(n+1)^2 = 1 + n(n+2)$.`,

"rationalizing": String.raw`
## Why it works
Multiplying a sum of two square roots by their difference squares each root away: $$(\sqrt a + \sqrt b)(\sqrt a - \sqrt b) = a - b.$$ So multiplying the top and bottom of $\frac1{\sqrt a + \sqrt b}$ by $\sqrt a - \sqrt b$ leaves $a - b$ in the denominator. When the numbers under the roots differ by $1$, the denominator is $1$ and the fraction becomes a plain difference, which is why sums of such fractions [[telescoping|telescope]].

For the integrality trick, expand $(a + \sqrt b)^n$ and $(a - \sqrt b)^n$ with the [[binomial-theorem|binomial theorem]]. The terms with an odd power of $\sqrt b$ have opposite signs in the two expansions and cancel when the two are added, and the terms with an even power are integers. So the sum is an integer.

## How to use it
$\frac1{\sqrt5 - 2} = \frac{\sqrt5 + 2}{5 - 4} = \sqrt5 + 2$, and a telescoping sum collapses to its ends: $$\sum_{k=1}^{99}\frac1{\sqrt k + \sqrt{k + 1}} = \sqrt{100} - \sqrt1 = 9.$$

For the fractional part of a power like $(3 + \sqrt5)^n$: the conjugate $3 - \sqrt5$ lies between $0$ and $1$, so its $n$th power is small, and the two powers add to an integer $N$. So $(3 + \sqrt5)^n$ sits just below $N$, and its fractional part is $1 - (3 - \sqrt5)^n$.

## On contests
Four problems here, all AIME, none by it alone; two lean on the [[difference-of-squares|difference of squares]] that the conjugate is built from. The conjugate-pair integrality trick is a favorite AIME device, as in "find the [[floor-basics|fractional part]] of $(\sqrt3 + \sqrt2)^6$", and telescoping radical sums appear at every level.

## Key forms
- $\frac1{\sqrt a + \sqrt b} = \frac{\sqrt a - \sqrt b}{a - b}$ — multiply the top and bottom by the conjugate
- $\frac1{\sqrt[3]a - \sqrt[3]b} = \frac{\sqrt[3]{a^2} + \sqrt[3]{ab} + \sqrt[3]{b^2}}{a - b}$ — cube roots use the difference of cubes instead
- $\frac1{\sqrt k + \sqrt{k + 1}} = \sqrt{k + 1} - \sqrt k$ — a sum of these telescopes
- $(a + \sqrt b)^n + (a - \sqrt b)^n$ — an integer for integers $a$ and $b$, the conjugate-pair trick
`,

"fx-pairing": String.raw`
## Key forms
- if $f(x)+f(1-x)=c$ for every $x$, then $\alt{\sum_{k=1}^{n-1}f\!\left(\frac kn\right)}{f\!\left(\frac1n\right)+f\!\left(\frac2n\right)+\cdots+f\!\left(\frac{n-1}n\right)}=\frac{n-1}{2}\,c$ — pair the term at $k$ with the term at $n-k$, and no single value is ever computed
- a self-paired middle term, at $x=\frac12$, contributes $\frac c2$ — the count above already includes it

## Why it works
A sum whose arguments are symmetric can be written twice, once forwards and once backwards, and adding the two copies pairs each term with its mirror image.

If $f(x) + f(1 - x) = c$ for every $x$, then pairing the term at $\frac kn$ with the term at $\frac{n-k}{n}$ gives $$2\sum_{k=1}^{n-1} f\!\left(\frac kn\right) = (n - 1)\,c,$$ so the sum is $\frac{(n-1)c}{2}$, with no single term ever evaluated. A middle term at $x = \frac12$ pairs with itself and is counted correctly by the same formula.

## How to use it
Test the pairing before anything else: compute $f(x) + f(1 - x)$, or $f(x) + f(-x)$, or $f(x)f(a - x)$ for a product, and simplify. Exponential forms are built for it: $$\frac{c^x}{c^x + \sqrt c} + \frac{c^{1-x}}{c^{1-x} + \sqrt c} = 1.$$

Other natural pairings are $\sin^2 k^\circ$ with $\sin^2(90 - k)^\circ = \cos^2 k^\circ$, which add to $1$; a repeating decimal with its nines complement; and $\log x$ with $\log\frac1x$.

## On contests
Three problems here, two AIME and one AMC 12, none solved by it alone. The shapes are an average of $\sin^2$ over whole degrees, repeating decimals paired with their nines complements, and an equation whose denominators are symmetric about a center, where substituting the center simplifies everything.
`,

"trig-substitution": String.raw`
## Key forms
- $x = a\sin\theta$, $a\tan\theta$ or $a\sec\theta$ — clears $\sqrt{a^2 - x^2}$, $\sqrt{a^2 + x^2}$ or $\sqrt{x^2 - a^2}$ through a Pythagorean identity
- $x = \cos\theta$ in the map $x \mapsto 2x^2 - 1$ — the map becomes $\theta \mapsto 2\theta$, so $n$ steps multiply the angle by $2^n$
- $a = \tan A$, $b = \tan B$, $c = \tan C$ — turns $a + b + c = abc$ into $A + B + C = \pi$, and $ab + bc + ca = 1$ into $A + B + C = \frac\pi2$

## Why it works
An algebraic expression is hard when a radical refuses to simplify or a recursion refuses to close; the same expression written in an angle is governed by identities that do both.

The radicals clear because each substitution matches a Pythagorean identity. With $x = a\sin\theta$, $$\sqrt{a^2 - x^2} = a\sqrt{1 - \sin^2\theta} = a\cos\theta$$ for $\theta$ between $-90^\circ$ and $90^\circ$, where the cosine is not negative; the tangent and secant cases use $1 + \tan^2\theta = \sec^2\theta$ the same way.

Iterations close because the double-angle formula $\cos 2\theta = 2\cos^2\theta - 1$ has the same shape as $x \mapsto 2x^2 - 1$: if $x = \cos\theta$, one step gives $\cos 2\theta$ and $n$ steps give $\cos(2^n\theta)$. Symmetric conditions become angle sums through identities such as $$\tan A + \tan B + \tan C = \tan A\tan B\tan C \quad \text{when } A + B + C = \pi.$$

## How to use it
Match each radical to the substitution that clears it, keeping $\theta$ in a range where the root stays positive. With $x = \sin\theta$, for example, $$x\sqrt{1 - x^2} = \sin\theta\cos\theta = \tfrac12\sin 2\theta,$$ so it never exceeds $\frac12$.

For an iteration, recognize the map. $x \mapsto 2x^2 - 1$ is $\cos\theta \mapsto \cos 2\theta$, $x \mapsto x^2 - 2$ is $2\cos\theta \mapsto 2\cos 2\theta$, $x \mapsto 4x^3 - 3x$ is $\cos\theta \mapsto \cos 3\theta$, and $x \mapsto \frac{2x}{1 - x^2}$ is $\tan\theta \mapsto \tan 2\theta$; in general the [[chebyshev-polynomials|Chebyshev polynomials]] satisfy $T_n(\cos\theta) = \cos n\theta$. A thousand steps then become one multiplication of an angle, reduced modulo $360^\circ$.

Nested radicals unwind the same way, since $\sqrt{2 + 2\cos\theta} = 2\cos\frac\theta2$, as in the example. Going from trigonometry back to algebra is the [[weierstrass-substitution|Weierstrass substitution]].

## On contests
Three problems here, all AIME, none solved by it alone, and all three finish with the [[angle-addition|angle addition]] formulas. The shapes are a recursion that becomes a rotation once each term is written as a sine, a system of mutual radicals in which each equation becomes the sine of a sum, and a maximization in which one angle parametrizes a whole family of figures.
`

});

// Entries added from the 2023-2025 AMC/AIME sweep.
Object.assign(window.MATH_DETAILS, {

"functional-substitution": String.raw`
## Key forms
- $(x, y) = (0, 0)$ — pins down $f(0)$, usually to one or two possible values
- $y = 0$ — ties $f(x)$ to $f(0)$ and other constants
- $y = x$ and $y = -x$ — give a doubling law, and show whether $f$ is even or odd
- $f(x + y) = f(x) + f(y)$, $f(x + y) = f(x)f(y)$, $f(xy) = f(x) + f(y)$ — Cauchy's linear, exponential and logarithmic forms, whose continuous solutions are $cx$, $a^x$ and $\log_a x$
- $f(a + b) + f(a - b) = 2f(a)f(b)$ — the cosine equation, with continuous solutions $\cos kx$ and $\cosh kx$ besides $0$

## Why it works
An equation that holds for all inputs holds in particular for the inputs you choose, and a well-chosen input makes terms coincide or vanish until only one unknown value is left.

Take the cosine equation $$f(a + b) + f(a - b) = 2f(a)f(b).$$ Putting $a = b = 0$ gives $2f(0) = 2f(0)^2$, so $f(0) = 0$ or $f(0) = 1$. If $f(0) = 0$, putting $b = 0$ gives $2f(a) = 2f(a)f(0) = 0$ for every $a$, so $f$ is identically zero. Otherwise $f(0) = 1$, and putting $a = 0$ gives $f(b) + f(-b) = 2f(b)$, so $f(-b) = f(b)$ and $f$ is even. Three substitutions have fixed $f(0)$ and the symmetry of $f$ without solving anything.

Each substitution is chosen either to make two terms equal, as $a = b$ does, or to make an argument zero, where the value is already known. The order matters because later choices use what earlier ones established: here, evenness only appears once $f(0) = 1$ is known.

## How to use it
Run the standard sequence, $(0, 0)$, then $(x, 0)$, then $(x, x)$ and $(x, -x)$, then $(x, 1)$ if $f(1)$ is given, and write down each fact as it appears. When the equation has a product $f(x)f(y)$, look early for an input where $f$ is $0$ or $1$, since those collapse the right side.

Guess the answer's form from the template, then use the substitutions to confirm it and find its constants; the problem usually asks for a value like $f(2)$ or the number of possible functions, not a full solution. If a substitution only rearranges the equation without removing anything, it is the wrong one: the aim is always to remove a variable.

## On contests
Nine problems here, six of them AIME and three AMC 12, and four solved by it alone. The cosine equation above is a recurring AMC 12 shape, where the substitutions give $f(0) = 1$ and evenness, which settle the answer. On AIME the equation is often tied to polynomials, and [[vietas-general|Vieta's formulas]] or the [[factor-remainder-theorem|factor theorem]] finish the job once the substitutions have produced enough values.`

});

Object.assign(window.MATH_DETAILS, {

"descartes-rule-signs": String.raw`## Why it works
Each positive root forces at least one sign change (a polynomial with all-positive coefficients has none), and a careful induction on factoring out $(x - r)$ shows roots consume sign changes in pairs-preserving fashion — hence "equal or less by an even number."

## How to use it
Quick structural triage: count sign changes of $P(x)$ for positive roots, of $P(-x)$ for negative roots, and remember complex roots come in pairs to fill the gap. Zero sign changes = zero positive roots (a certainty, not a bound). Combine with the intermediate value theorem at a few points to pin the exact count.

## On contests
AMC 12 uses it to eliminate cases in "how many real solutions" problems; on AIME it prunes root-hunting before heavier tools. It never locates a root — pair it with rational root candidates or IVT for locations.`,

"finite-differences": String.raw`
## Key forms
- the difference operator $\Delta a_n=a_{n+1}-a_n$ lowers the degree of a polynomial by exactly one, so a degree-$k$ polynomial has constant $k$-th differences, and that constant is $k!$ times the leading coefficient — the degree drop is what makes the table terminate, and where it terminates is the degree
- this runs both ways: constant $k$-th differences force the sequence to be a degree-$k$ polynomial, so building the difference table and extending the constant row evaluates the polynomial anywhere without ever finding its coefficients — the converse is the useful half, since it identifies a polynomial from data alone
- the table's leading diagonal gives Newton's forward form $P(n)=\alt{\sum_j\Delta^jP(0)\binom nj}{P(0)+\Delta P(0)\binom n1+\Delta^2P(0)\binom n2+\cdots}$, which is why the binomial basis is the natural one for polynomials constrained at consecutive integers — worth knowing because it interpolates without solving any linear system

## Why it works
Each difference lowers the degree by exactly one, so after $k$ differences only a constant is left.

For the top term, the binomial theorem gives $$(x + 1)^k - x^k = kx^{k-1} + (\text{lower terms}),$$ so $\Delta$ of a degree-$k$ polynomial has degree $k - 1$, with its leading coefficient multiplied by $k$. Doing this $k$ times leaves the constant $k!\,a_k$, where $a_k$ is the leading coefficient.

{{figure:table}}

Conversely, the table can be rebuilt from its left edge. Moving one step right in any row adds the entry below, so a shift is $1 + \Delta$, and $n$ shifts expand by the binomial theorem into Newton's forward formula, $$a_n = \sum_j \binom nj \Delta^j a_0.$$ If row $k$ is constant, every row below it is zero and the sum stops at $j = k$. Since $\binom nj$ is a polynomial in $n$ of degree $j$, the sequence is a polynomial of degree $k$.

## How to use it
Given consecutive values, build the table until a row is constant; the number of differencing steps it takes is the degree. To get more values, extend the constant row and add back up each diagonal, as in the figure. To get a formula, read the left edge into Newton's formula.

The values must be at equally spaced inputs. If the inputs skip, as with $P(1)$, $P(2)$, $P(4)$, the table does not apply directly; use [[lagrange-interpolation|Lagrange interpolation]] instead.

The table is also a quick test for a hidden polynomial. Sums, products of two arithmetic sequences, and counts that grow with a parameter often turn out to have constant second or third differences, and that one observation replaces a page of algebra.

## On contests
Four problems here, all AIME, two solved by it alone. The usual move is to spot a hidden polynomial: the term-by-term product of two [[arithmetic-series|arithmetic sequences]] is a quadratic, so three given terms extend by constant second differences, and some problems state the second differences outright. The converse also explains why a sum of a degree-$k$ polynomial over $1, \dots, n$ is a polynomial of degree $k + 1$: its differences are the degree-$k$ polynomial.`,

"cauchy-functional-equations": String.raw`## Why it works
For additive $f$: build from $f(1)$ over integers, then rationals ($qf(p/q) = f(p)$); regularity (continuity/monotonicity/boundedness on an interval) forces the rational-linear behavior to extend to all reals. The other three templates reduce to the additive one via logarithms and exponentials (e.g. $g = \ln f$ turns multiplicative into additive).

## How to use it
Match the template, verify the regularity hypothesis the problem provides, write the general solution with one unknown constant, and pin the constant from a given value. Watch for domain subtleties: the multiplicative forms need positivity to take logs; check $f \equiv 0$ degenerate solutions separately.

## On contests
AMC/AIME functional equations are usually a Cauchy template in light disguise (shifted argument, extra constant). Recognize, normalize (e.g. set $g(x) = f(x) - f(0)$), classify, and evaluate — a three-minute routine once the four forms are memorized.`

});

Object.assign(window.MATH_DETAILS, {

"root-transformations": String.raw`## Key forms
- to build the polynomial whose roots are shifted, substitute backwards: roots $r_i+k$ come from $P(x-k)$, since $x$ is a root of the new polynomial exactly when $x-k$ was a root of the old — substitute the inverse map, not the map, which is the step most often done backwards
- roots $kr_i$ come from $P\!\left(\frac xk\right)$, and roots $\frac{1}{r_i}$ come from reversing the coefficient list — the reversal works because $x^nP\!\left(\frac1x\right)$ has exactly the reciprocal roots
- once the new polynomial is written down, [[vietas-general|Vieta]] reads off its symmetric functions directly, which is usually the point of transforming in the first place — the transformation is worth doing purely to make Vieta answer the question directly

## Why it works
If $y = g(r)$ for each root $r$ of $P$, then the values $r = g^{-1}(y)$ satisfy $P(g^{-1}(y)) = 0$ — substituting the inverse transformation produces a polynomial equation in $y$ whose roots are exactly the transformed values (clear denominators as needed).

## How to use it
Standard dictionary: shift → $P(x-k)$; scale → $P(x/k)$; negate → $P(-x)$ (flips odd coefficients); reciprocate → reverse the coefficient list; square → eliminate the sign via $P(\sqrt x)P(-\sqrt x)$. After transforming, read off the new Vieta sums — that's usually the goal ("find the sum of the reciprocals of the roots": reverse and read one ratio).

## On contests
AIME asks for symmetric functions of transformed roots constantly; transforming the polynomial first is faster and safer than expanding symmetric algebra. Sums like $\sum \frac{1}{1 - r_i}$: substitute $x = 1 - \frac{1}{y}$ or evaluate $\frac{P'(1)}{P(1)}$ — both come from this viewpoint.`,

"periodic-sequences": String.raw`
## Key forms
- $x_{n+1}=-\dfrac{1}{x_n}$ — period 2
- $x_{n+1}=\dfrac{1}{1-x_n}$ — period 3
- $x_{n+1}=\dfrac{1+x_n}{1-x_n}$ — period 4, since it is $\tan(\theta+45^\circ)$
- $a_{n+1}=\dfrac{a_n+1}{a_{n-1}}$ (Lyness) — period 5
- $a_{n+1}=a_n-a_{n-1}$ — period 6, a $60^\circ$ rotation
- $x_{n+1}=\dfrac{x_n}{x_{n-1}}$ — period 6, cycling $a,\;b,\;\frac ba,\;\frac1a,\;\frac1b,\;\frac ab$
- $x_{n+1}=\dfrac{1+x_n+x_{n-1}}{x_{n-2}}$ (Todd) — period 8, third order
- $a_{n+1}=|a_n|-a_{n-1}$ — period 9

## Why it works
A recursion's next term depends only on the last few terms, so the moment those few terms repeat, everything after them repeats too.

Call the terms the rule needs the state. For $x_{n+1} = \frac{1}{1 - x_n}$ the state is the single last term, and starting from $2$ it runs $$2 \to -1 \to \tfrac12 \to 2.$$ The state is back where it began after three steps, and because each step depends only on the current state, the next three steps are the same three steps again, forever. The period is $3$.

{{figure:cycle}}

Which rules cycle can often be seen in advance. A one-variable rule $x \mapsto \frac{ax + b}{cx + d}$ is a Möbius map, and it cycles when repeating it some number of times gives back the identity, which happens when it acts like a rotation by a rational fraction of a turn. For example $\frac{1 + x}{1 - x}$ turns $\tan\theta$ into $\tan(\theta + 45^\circ)$, $$\frac{1 + \tan\theta}{1 - \tan\theta} = \tan(\theta + 45^\circ),$$ so four steps add $180^\circ$ and return every value: period $4$.

Linear rules are decided by their characteristic roots. $a_{n+1} = a_n - a_{n-1}$ has $t^2 - t + 1 = 0$, whose roots $e^{\pm i\pi/3}$ are primitive sixth [[roots-of-unity|roots of unity]], hence period $6$.

The multiplicative rule $x_{n+1} = \frac{x_n}{x_{n-1}}$ is the same rule after taking logarithms, and its cycle is $$a, \ b, \ \tfrac ba, \ \tfrac1a, \ \tfrac1b, \ \tfrac ab.$$ Reversing it to $x_{n+1} = \frac{x_{n-1}}{x_n}$ changes the equation to $t^2 + t - 1 = 0$, whose roots are real and not on the unit circle, and that version is not periodic at all.

The longer named cycles, Lyness's period $5$ and Todd's period $8$, come from quantities the rule leaves unchanged; the proofs are beyond contest level, and on a contest the period is simply found by computing.

## How to use it
Compute terms exactly, as fractions and not decimals, until the starting state reappears; the number of steps is the period $p$. With a two-term rule the state is a pair, so wait for the first two terms to come back together, not just one value. Then the $n$th term depends only on $n \bmod p$. Align the offset carefully: if $a_1$ starts the cycle, $$a_n = a_r, \qquad r \equiv n \pmod p, \quad 1 \le r \le p.$$

Watch for a pre-period, a few terms before the cycle starts, and count the cycle from where it actually begins. Recognizing one of the rules in the key forms hands you the period before you compute anything.

A recursion taken mod $m$ is also eventually periodic, because it has only finitely many possible states. The Fibonacci case has its own name, the [[pisano-periods|Pisano periods]], and the general method is [[periodicity-mod-m|hunting the cycle]] mod $m$.

## On contests
Nine problems here, eight of them AIME, three solved by it alone. A rational recursion in the last two terms often hides a Lyness-type cycle of period $5$, and there are many AMC versions. A contest recursion asking about a term numbered in the thousands is asking you to find a cycle: compute six to ten terms before trying anything clever.`,

"triangle-angle-identities": String.raw`## Why it works
All spring from $C = 180^\circ - A - B$: expand $\tan(A+B) = \tan(180^\circ - C) = -\tan C$ and clear denominators for the tangent identity; the cosine and sine sums follow from sum-to-product plus half-angle conversions, which is where $r$ and $R$ sneak in ($\cos$ sum) and $s$ ($\sin$ sum).

## How to use it
Two directions: (1) given trig data about a triangle's angles, convert to $r$, $R$, $s$ — the geometry; (2) given an equation like $\tan A + \tan B + \tan C = \tan A\tan B\tan C$, recognize it as the definition of angles summing to $180^\circ$ (used both ways on contests). The cotangent identity $\sum \cot A \cot B = 1$ pairs with [[brocard-angle|the Brocard angle]] formula.

## On contests
AIME trig problems hand you one of these sums and expect the $1 + \frac{r}{R}$ or $\frac{s}{R}$ translation; AMC 12 uses the tangent identity to detect or exploit supplementary structure. Memorize the two headline identities, derive the rest from sum-to-product on demand.`,

"piecewise-graph-counting": String.raw`
## Key forms
- the number of solutions of $f(x)=c$ is the number of times the horizontal line $y=c$ crosses the graph, so counting solutions becomes reading a picture rather than solving equations — counting crossings replaces solving entirely, which is the whole reason to draw rather than compute
- each absolute value folds the graph upward about the axis and each subtraction shifts it, producing a piecewise-linear graph whose slopes are always $\pm$ the accumulated factor — apply the folds from the innermost bar outward, marking a corner at each root
- the count changes only when the line passes a corner, so listing the corner heights partitions the values of $c$ into bands of constant answer — build the graph inside out, tracking only corners

## Why it works
Each solution of $f(x) = c$ is a point where the graph of $f$ is at height $c$, so solutions and crossings are the same thing.

For absolute values the graph is easy to build. Taking $|g(x)|$ reflects the parts of the graph of $g$ below the axis up above it, a fold, and subtracting a constant shifts everything down. Each step keeps the graph made of straight pieces, so the finished graph is a chain of segments with finitely many corners.

{{figure:folds}}

Between two consecutive corner heights, a horizontal line crosses the same pieces, so the number of solutions is constant there. It can change only at a corner height, which is why listing the corners answers every question about the count.

## How to use it
Build the graph from the inside out, keeping track only of the corners: where they are and how high. For $||x| - 2| = c$, the V of $|x|$ is lowered by $2$ and folded up, which makes a W with valleys at height $0$ and a peak at height $2$. So there are $4$ solutions for $0 \lt c \lt 2$, $3$ at $c = 2$, and $2$ when $c = 0$ or $c \gt 2$.

The same idea counts intersections of two graphs, such as two sawtooth curves: draw both and count crossings piece by piece. For what a single absolute value does to a graph, see [[abs-value-graphing|the transformation rules]].

## On contests
Six problems here, all AIME, one solved by it alone; the others combine the picture with [[floor-basics|floors]], logarithms or [[casework-method|casework]]. Typical questions count the solutions of a nested absolute-value equation or the crossings of two sawtooth curves, and AMC runs simpler versions. Graph first; the algebra is usually unnecessary.`,

"work-rates": String.raw`
## Why it works
When workers do not get in each other's way, the work they do in an hour adds up, and time is the reciprocal of rate.

A pipe that fills a pool in $4$ hours fills $\frac14$ of it each hour, and one that takes $6$ hours fills $\frac16$. Together they fill $\frac14 + \frac16 = \frac5{12}$ per hour, so the whole pool takes $\frac{12}{5}$ hours. Adding or averaging the times would be wrong, because time is not the quantity that adds.

{{figure:rates}}

For two workers, $\frac1a + \frac1b = \frac{a + b}{ab}$, so together they take $\frac{ab}{a + b}$ hours, which is half the [[mean-chain|harmonic mean]] of their two times.

## How to use it
Call the job $1$, convert every worker to a rate, add or subtract, and invert at the end. For a job done in stages, such as two workers together for a while and then one alone, track the fraction completed in each stage and set the fractions' total equal to $1$.

The harder versions leave the rates unknown and give combined times for pairs: A and B take $x$ hours, B and C take $y$, and so on. Each is a linear equation in the rates, so solve for the rates rather than for the times.

## On contests
Five problems here, four of them AIME, and four solved by it alone: once every worker is a rate, the problem is a small linear system. MATHCOUNTS and early AMC use the simple versions with pipes and painters.
`,

"average-speed": String.raw`
## Why it works
An average speed has to reproduce the whole trip: covering the total distance at that one speed must take the total time, which forces total distance over total time.

That weights each speed by the time spent at it. Over equal distances $d$ at speeds $v_1$ and $v_2$ the times are $\frac d{v_1}$ and $\frac d{v_2}$, so $$v_{\text{avg}} = \frac{2d}{\frac{d}{v_1} + \frac{d}{v_2}} = \frac{2v_1v_2}{v_1 + v_2}.$$ More time is spent at the slower speed, so it counts for more, and the result is below the arithmetic mean unless the two speeds are equal.

## How to use it
Never average the speeds directly. Pick a convenient distance, such as a common multiple of the speeds, find each leg's time, and divide total by total. For $30$ mph out and $60$ mph back over $60$ miles each way, the legs take $2$ hours and $1$ hour, so $$v_{\text{avg}} = \frac{60 + 60}{2 + 1} = 40 \text{ mph}.$$

The harmonic-mean shortcut applies only to equal distances. Equal times give the ordinary arithmetic mean instead, and anything else needs the full total over total.

## On contests
Three problems here, two AMC 12 and one AIME, two solved by it alone. On the AMC it is an answer-choice trap, with $45$ among the options whenever the answer is $40$. A common version misses a target time by the same margin at two speeds, late at one and early at the other, which makes the right speed their harmonic mean. For trips with several legs, see [[multi-leg-rates|multi-leg rates]].`,

"relative-motion": String.raw`
## Why it works
Only the distance between two movers decides when they meet, and that distance changes at the difference of their velocities.

On a line, put one object at $x_1 = a_1 + v_1t$ and the other at $x_2 = a_2 + v_2t$. The gap $x_2 - x_1 = (a_2 - a_1) + (v_2 - v_1)t$ changes at the constant rate $v_2 - v_1$.

Moving toward each other, the velocities have opposite signs and the gap shrinks at the sum of the speeds; moving the same way, it shrinks at their difference. Either way the time to meet is the starting gap divided by that rate, exactly as if one object stood still and the other moved at the combined speed.

{{figure:frames}}

A current or a moving walkway adds the same drift to everything in it. It changes speeds measured from the ground, but not the speeds of two objects in it relative to each other.

A circular track is the same idea with the gap wrapping around. Two runners starting together are at the same point again exactly when the distance between them, measured along the track, has changed by a whole number of laps.

Running the same way, that separation grows at $v_1 - v_2$, so the first meeting is when the faster has run exactly one lap more than the slower. Running opposite ways, it grows at $v_1 + v_2$, so they meet when their two distances add to one full lap. After that, meetings repeat at the same interval, and the $k$th meeting comes at $k$ times the first.

## How to use it
Chases: the time is the starting gap divided by the difference of speeds. Head-on meetings: the gap divided by the sum.

In a current of speed $c$, a boat with still-water speed $v$ goes $v - c$ upstream and $v + c$ downstream, so a round trip averages less than $v$, because the slow leg takes longer. With $v = 5$ and $c = 3$ km/h over $8$ km each way, the trip takes $$\frac{8}{5 - 3} + \frac{8}{5 + 3} = 4 + 1 = 5 \text{ hours},$$ so $16$ km in $5$ hours averages $3.2$ km/h rather than $5$.

Crossing a river, split the velocity into components. The across-stream component alone decides how long the crossing takes, and the along-stream component, the boat's own plus the current's, decides where it lands. To land straight across, aim upstream so the two along-stream parts cancel.

Clock hands are a circular track too. The minute hand gains $6 - \frac12 = 5.5$ degrees per minute on the hour hand, so they coincide every $\frac{360}{5.5} = \frac{720}{11}$ minutes.

## On contests
Ten problems here, and eight of them solved by it alone: once the right frame is chosen, there is usually nothing left to do. Track problems lean on the lap rule, since "two runners start together and next meet after $4$ minutes" fixes $v_1 - v_2$ or $v_1 + v_2$, which is usually the missing equation. Trains passing, clock hands, escalator walkers and river crossings are the other regulars.
`,

"weighted-average": String.raw`
## Why it works
An average is a total divided by a count, and mixing two groups adds their totals and adds their counts.

A group of $w_1$ items averaging $x_1$ contains a total of $w_1x_1$: that many points, grams of acid, or miles. Pour in a second group of $w_2$ items with total $w_2x_2$. Nothing is lost, so the combined total is $w_1x_1 + w_2x_2$, spread over $w_1 + w_2$ items, and dividing gives the average: $$\bar x = \frac{w_1x_1 + w_2x_2}{w_1 + w_2}.$$ That is why averages of averages go wrong without the weights: class averages of $80$ and $90$ combine to $85$ only if the two classes are the same size.

Rearranging gives the seesaw rule. Clearing the denominator, $w_1\bar x + w_2\bar x = w_1x_1 + w_2x_2$, so $$w_1(\bar x - x_1) = w_2(x_2 - \bar x).$$ Picture the two values as weights on a seesaw balanced at $\bar x$: each weight times its distance from the balance point is the same on both sides. So the heavier group sits closer, and $\frac{w_1}{w_2} = \frac{x_2 - \bar x}{\bar x - x_1}$.

{{figure:seesaw}}

## How to use it
The seesaw form answers mixing-ratio questions in one line, without variables. For dilution and replacement problems, "remove a liter, add water, repeat", track the pure substance multiplicatively: each replacement multiplies the concentration by the same fraction, the share of the container that was kept. And whenever averages are combined, find the weights first; the class-average traps are exactly missing-weight errors.

## On contests
Unusually self-contained: 15 of the 20 problems tagged here need nothing else, most of them AMC. The shapes are mixtures of two concentrations, combined averages of groups, and average-score puzzles where one added score shifts the mean. A harder classic swaps equal volumes between two jars; after the swap, the amount of each liquid that has ended up in the other jar is always the same, an invariant worth knowing because it makes the question free.
`

});

Object.assign(window.MATH_DETAILS, {

"sos-identity": String.raw`## Why it works
Expand the right side: each $(x-y)^2$ contributes $x^2 + y^2 - 2xy$, and the halved total collects exactly $x^2+y^2+z^2 - xy-yz-zx$. Being a sum of real squares, it is nonnegative and vanishes only when all pairwise differences do.

## How to use it
Three standard deployments: (1) prove $\sum x^2 \ge \sum xy$ with equality analysis; (2) crack symmetric conditions — any equation reducible to $\sum(x-y)^2 = 0$ forces all variables equal; (3) factor analysis of $x^3+y^3+z^3-3xyz = (x+y+z)\cdot\frac{1}{2}\sum(x-y)^2$, which shows the second factor's sign is fixed.

## On contests
AMC/AIME symmetric systems constantly hide the "$= 0$ forces equal" step; inequality problems use it as the base case of [[sos-method|SOS]] (sum-of-squares) arguments. Worth recognizing in both directions — expanded and factored.`,

"useful-factorizations": String.raw`## Why it works
$a^4 + a^2b^2 + b^4$: add and subtract $a^2b^2$ to reach $(a^2+b^2)^2 - (ab)^2$, then [[difference-of-squares|difference of squares]]. The cube identity expands directly, or via symmetry: the left side vanishes when $a = -b$ (etc.), so $(a+b)(b+c)(c+a)$ divides it, and degree/leading-coefficient comparison fixes the factor 3.

## How to use it
$x^4 + x^2 + 1$ (and $x^8 + x^4 + 1$, iterated) show up in telescoping products and "factor this large number" problems — e.g. $n^4 + n^2 + 1 = (n^2+n+1)(n^2-n+1)$ with the bonus that $n^2 - n + 1 = (n-1)^2 + (n-1) + 1$, chaining consecutive values into telescoping fractions. The identity $(a+b)(b+c)(c+a) = (a+b+c)(ab+bc+ca) - abc$ converts products of pairwise sums into elementary symmetric data (Vieta-ready).

## On contests
The telescoping product $\prod \frac{n^4 + n^2 + 1 \text{-type factors}}{\cdots}$ is a recurring AIME construction (same family as the Sophie Germain $324$ problem). The pairwise-sum identity resolves systems giving $a+b+c$, $ab+bc+ca$, $abc$ and asking for $(a+b)(b+c)(c+a)$ in one line.`,

"pairwise-sum-product": String.raw`## Why it works
Expand $(x+y)(y+z)(z+x)$: the degree-3 terms are all six $x^2y$-type monomials plus $2xyz$. Meanwhile $(x+y+z)(xy+yz+zx)$ produces those same six monomials but with $3xyz$. Subtract one $xyz$ and they agree, so $(x+y)(y+z)(z+x) = e_1 e_2 - e_3$ in the elementary symmetric polynomials $e_1, e_2, e_3$.

## How to use it
Whenever $x+y+z$, $xy+yz+zx$, $xyz$ are known — most often as $-\frac{b}{a}, \frac{c}{a}, -\frac{d}{a}$ from a cubic's coefficients via [[vietas-general|Vieta]] — any product of the pairwise sums is just $e_1 e_2 - e_3$, no expansion. Read backward, it simplifies a stubborn product of three binomials into symmetric-sum arithmetic. Companion: $(x+y+z)^3 - x^3 - y^3 - z^3 = 3(x+y)(y+z)(z+x)$.

## On contests
The signature AIME setup hands you the three symmetric sums (or a cubic whose roots are $x, y, z$) and asks for $(x+y)(y+z)(z+x)$ or an equivalent product — one substitution and you are done, no messy expansion under time pressure.`,

"antisymmetric-factorization": String.raw`## Why it works
Read the expression as a polynomial in $a$. Substituting $a = b$ makes it vanish, so $(a - b)$ divides it; by the cyclic symmetry $(b - c)$ and $(c - a)$ divide it too. Their product already has degree 3, so the degree-2 sum equals that product times a constant — one test point fixes the constant to $-1$. The degree-3 sum has one degree to spare, and symmetry forces the leftover factor to be $a + b + c$.

## How to use it
Any cyclic expression that dies when two variables coincide factors as $(a-b)(b-c)(c-a)$ times a symmetric polynomial of the leftover degree; write that skeleton, then pin the coefficient with an easy substitution. This turns "factor this cyclic mess" or "show this symmetric sum vanishes" into a two-line argument.

## On contests
Common on AIME and olympiad algebra when a symmetric or cyclic quantity must be factored or shown to vanish. The sign is the classic slip — always sanity-check against $(a,b,c) = (1,2,3)$.`,

"sum-zero-identities": String.raw`
## Key forms
- $a^3+b^3+c^3 - 3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca)$ — the parent factorization; setting the first factor to zero is what makes the whole card work
- $p_k = -e_2\,p_{k-2} + e_3\,p_{k-3}$ — with $e_1 = 0$ Newton's sums collapse to this, and every higher power sum follows from it
- $p_5 = -5e_2e_3$, $p_7 = 7e_2^2e_3$ — the clean consequences, and the source of the power-sum ratios these problems ask for

## Why it works
Everything follows from the elementary symmetric values $e_1 = a + b + c = 0$, $e_2 = ab + bc + ca$ and $e_3 = abc$.

Squaring $a + b + c = 0$ gives $a^2 + b^2 + c^2 + 2e_2 = 0$, which is the square identity. For cubes, the factorization $$a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)$$ has a first factor of $0$, so $a^3 + b^3 + c^3 = 3abc$.

Higher powers come from [[newtons-sums|Newton's sums]]. Each of $a$, $b$, $c$ is a root of $t^3 + e_2t - e_3$, so $t^3 = -e_2t + e_3$; multiplying by $t^{k-3}$ and adding over the three roots gives $$p_k = -e_2\,p_{k-2} + e_3\,p_{k-3},$$ where $p_k = a^k + b^k + c^k$. Starting from $p_0 = 3$, $p_1 = 0$ and $p_2 = -2e_2$, it produces $p_4 = 2e_2^2$, $p_5 = -5e_2e_3$ and $p_7 = 7e_2^2e_3$.

## How to use it
The moment a problem states or implies $a + b + c = 0$, reach for the cube and square identities, and get higher powers from the recurrence.

The zero sum is often hidden. The roots of a cubic with no $x^2$ term sum to $0$ by [[vietas-general|Vieta's formulas]], and the differences of any three numbers always sum to $0$, so for all $a$, $b$, $c$, $$(a - b)^3 + (b - c)^3 + (c - a)^3 = 3(a - b)(b - c)(c - a).$$ A shift creates one too: if $x + y + z = 3m$, then $x - m$, $y - m$ and $z - m$ sum to $0$.

## On contests
Three problems here, all AIME, none solved by it alone. The usual trigger is a cubic with no $x^2$ term, whose roots sum to $0$, so sums like $(r + s)^3 + (s + t)^3 + (t + r)^3$ collapse to $-3rst$. Others create the zero sum by shifting all three variables by their average, or force it from a symmetry of the problem.`,

"reciprocal-power-sums": String.raw`## Key forms
- $s_n = t\,s_{n-1} - s_{n-2}$ with $s_0 = 2$, $s_1 = t$ — the recurrence that generates every power at once, so nothing beyond $t$ is ever needed
- $s_4 = t^4 - 4t^2 + 2$ — the next one after the two in the box, worth having ready
- $s_n = 2\cos n\theta$ when $x = e^{i\theta}$ — on the unit circle these are the [[chebyshev-polynomials|Chebyshev polynomials]], which is why the recurrence looks like theirs

## Why it works
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
Deploy the $t = 1$ expansion $x^3 + y^3 + z^3 + 3xyz \ge \sum_{\text{cyc}} xy(x + y)$ when a symmetric degree-3 inequality has the "wrong direction" for AM–GM — the $+3xyz$ on the small side is Schur's signature, and no bunching argument produces it ([[muirheads-inequality|Muirhead]] can never yield it, since $(1,1,1)$ is majorized by everything). Useful normalized form: with $x + y + z = s$, $q = \sum xy$, $r = xyz$, the $t = 1$ case reads $s^3 + 9r \ge 4sq$. The $t = 2$ case handles degree-4 versions.

## On contests
An olympiad tool: it settles many symmetric three-variable inequalities that resist AM–GM/Cauchy, and the $s, q, r$ form combines cleanly with $q^2 \ge 3sr$ and friends. Recognize its equality cases — $x = y = z$ and the degenerate $(k, k, 0)$ — as the tell that Schur (not Muirhead) is intended.`,

"muirheads-inequality": String.raw`## Why it works
[[karamata-inequality|Majorization]] means the exponent vector $(a)$ can be reached from $(b)$ by repeatedly moving two exponents apart ($(b_i, b_j) \to (b_i + \epsilon, b_j - \epsilon)$ with $b_i \ge b_j$). Each such move is a two-variable AM–GM-style smoothing step on the symmetric sum, so the more "spread out" exponent triple dominates. In fact every Muirhead inequality is a positive combination of weighted AM–GMs.

## How to use it
Sort both exponent triples in decreasing order, then check the partial sums: $a_1 \ge b_1$, $a_1 + a_2 \ge b_1 + b_2$, $a_1 + a_2 + a_3 = b_1 + b_2 + b_3$. If all hold, $\sum_{\text{sym}}$ of the $a$-monomial dominates. Two standing warnings: it applies only to full symmetric sums — cyclic sums are not covered, so convert first and watch the factor of $2$ — and both sides must be homogeneous of the same degree (normalize the constraint, e.g. impose $xyz = 1$, to homogenize).

## On contests
The rigorous stamp for "bunching" steps in olympiad solutions: $(3,0,0) \succ (2,1,0) \succ (1,1,1)$ handles most degree-3 comparisons in one line. Citing Muirhead by name is standard on olympiads; on anything below that level, writing out the two or three AM–GMs it encodes is safer and just as fast. Pairs constantly with [[schurs-inequality|Schur]], which covers exactly the direction Muirhead cannot.`,

"maclaurin-inequality": String.raw`## Why it works
The engine is Newton's inequality $p_k^2 \ge p_{k-1}p_{k+1}$, where $p_k = e_k / \binom{n}{k}$ is the averaged $k$-th elementary symmetric polynomial. It says the sequence $p_k$ is log-concave, and it comes from the fact that $\prod_i (t + x_i)$ has all real roots — so do its derivatives (Rolle), and a real-rooted quadratic slice forces $p_k^2 \ge p_{k-1}p_{k+1}$. Chaining log-concavity and taking $k$-th roots yields Maclaurin's descending chain $p_1 \ge \sqrt{p_2} \ge \cdots \ge \sqrt[n]{p_n}$.

## How to use it
It sits between AM–GM and the heavier symmetric machinery: the two ends are exactly the AM and the GM, while the middle terms give sharper bounds when several elementary symmetric quantities appear together. In practice invoke one link — $p_1 \ge \sqrt{p_2}$ or $\sqrt{p_2} \ge \sqrt[3]{p_3}$ — to relate $\sum x_i$, $\sum x_i x_j$, and $\prod x_i$ more tightly than AM–GM allows.

## On contests
An olympiad-level refinement — rarely needed over AM–GM or Cauchy–Schwarz, but decisive on symmetric inequalities those cannot tighten. Newton's inequality also explains why a real-rooted polynomial has log-concave (hence unimodal) coefficients, a handy lemma in its own right.`

});

Object.assign(window.MATH_DETAILS, {

"sp-substitution": String.raw`
## Key forms
- $x^2 + y^2 = s^2 - 2p$, $x^3 + y^3 = s^3 - 3sp$ — the first rungs of the ladder of power sums
- $(x - y)^2 = s^2 - 4p$ — the discriminant, which decides whether $x$ and $y$ are real
- $t^2 - st + p = 0$ — the quadratic whose roots are $x$ and $y$, recovering them at the end
- $\frac1x + \frac1y = \frac sp$, $x^2y + xy^2 = sp$ — other symmetric expressions that convert in one step

## Why it works
An expression that does not change when $x$ and $y$ are swapped depends only on the pair $\{x, y\}$, and the pair is completely determined by its sum and its product.

That second fact is [[vietas-general|Vieta's formulas]] in reverse: $x$ and $y$ are exactly the roots of $(t - x)(t - y) = t^2 - st + p$, so knowing $s$ and $p$ pins down the pair, and nothing is lost by the substitution.

The first fact, that every symmetric polynomial is a polynomial in $s$ and $p$, is the two-variable case of the [[symmetric-polynomial-strategies|fundamental theorem on symmetric polynomials]]. In practice it comes from a ladder: expanding the product on the right shows $$x^n + y^n = s\,(x^{n-1} + y^{n-1}) - p\,(x^{n-2} + y^{n-2}),$$ so each power sum is $s$ times the previous one minus $p$ times the one before. That gives $x^2 + y^2 = s^2 - 2p$, then $x^3 + y^3 = s(s^2 - 2p) - ps = s^3 - 3sp$, and so on.

## How to use it
Rewrite the system in $s$ and $p$, solve it, then recover $x$ and $y$ from $t^2 - st + p = 0$. For $x + y = 5$ and $x^2 + y^2 = 13$: $s = 5$ and $s^2 - 2p = 13$ give $p = 6$, and $t^2 - 5t + 6 = 0$ has roots $2$ and $3$.

If $x$ and $y$ must be real, check $s^2 \ge 4p$ at the end; a solution in $s$ and $p$ that fails it gives complex $x$ and $y$. A chain like $x + \frac1x = k$ is the case $p = 1$, where the whole ladder runs on $s$ alone: $x^2 + \frac1{x^2} = k^2 - 2$. For three variables, use $e_1, e_2, e_3$ and [[newtons-sums|Newton's sums]].

## On contests
Seven problems here, six of them AIME, one solved by it alone; the others use it inside a larger computation, from [[linear-recurrence|recurrences]] for power sums to trigonometric systems. The trigger is a system or expression that does not change when the variables are swapped: "given $x + y$ and $x^2 + y^2$, find $x^5 + y^5$" is a pure ladder climb.
`

});

Object.assign(window.MATH_DETAILS, {

"completing-the-square": String.raw`
## Key forms
- $x^2 + bx + c = \left(x + \frac b2\right)^2 + c - \frac{b^2}{4}$ — add and subtract the square of half the $x$ coefficient
- $ax^2 + bx + c = a\left(x + \frac{b}{2a}\right)^2 + c - \frac{b^2}{4a}$ — vertex at $x = -\frac{b}{2a}$; set to zero, this is the quadratic formula
- $\left(x + \frac D2\right)^2 + \left(y + \frac E2\right)^2 = \frac{D^2 + E^2}{4} - F$ — the circle $x^2 + y^2 + Dx + Ey + F = 0$, center and radius in view
- $(2n + b)^2 - (2m)^2 = b^2 - 4c$ — the equation $n^2 + bn + c = m^2$ after multiplying by $4$, ready to factor

## Why it works
The expression $x^2 + bx$ is a perfect square with one piece missing, and adding that piece and subtracting it again leaves the value unchanged.

Expanding $\left(x + \frac b2\right)^2$ gives $x^2 + bx + \frac{b^2}{4}$, so $x^2 + bx$ is that square minus $\frac{b^2}{4}$. Therefore $$x^2 + bx + c = \left(x + \frac b2\right)^2 + \left(c - \frac{b^2}{4}\right).$$ The [[quadratic-formula|quadratic formula card]] draws this as area: $x^2 + bx$ is a square with two strips of width $\frac b2$ attached, missing a corner of area $\frac{b^2}{4}$.

The payoff is that $x$ now sits inside a single square. A square is never negative and is zero only when its inside is zero, so $\left(x + \frac b2\right)^2 + k$ is at least $k$, with equality only at $x = -\frac b2$. That is the minimum, found with no calculus, and $\left(-\frac b2, k\right)$ is the vertex of the parabola.

With a leading coefficient, factor it out first: $$ax^2 + bx + c = a\left(x^2 + \frac ba x\right) + c = a\left(x + \frac{b}{2a}\right)^2 + c - \frac{b^2}{4a}.$$ If $a \gt 0$ the constant is a minimum and if $a \lt 0$ it is a maximum. Setting the expression to zero and taking square roots gives $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$.

## How to use it
Halve the coefficient of $x$, square it, and add and subtract that amount. For $x^2 - 6x + 11$, half of $-6$ is $-3$, so $x^2 - 6x + 11 = (x - 3)^2 - 9 + 11 = (x - 3)^2 + 2$, whose smallest value is $2$, at $x = 3$.

{{figure:minimum}}

In two variables, complete the square in $x$ and in $y$ separately. $x^2 + y^2 - 4x + 6y - 3 = 0$ becomes $(x - 2)^2 + (y + 3)^2 = 16$, a circle with center $(2, -3)$ and radius $4$.

It also opens inequalities: $a^2 - 2ab + 2b^2$ is $(a - b)^2 + b^2$, visibly nonnegative, and the [[trivial-inequality|trivial inequality]] finishes the argument. In number theory it turns "$n^2 + bn + c$ is a perfect square $m^2$" into a [[difference-of-squares|difference of squares]]: multiplying by $4$ gives $(2n + b)^2 - (2m)^2 = b^2 - 4c$, and the left side factors.

## On contests
Eleven problems here, ten of them AIME, and one solved by it alone. The most common use is number-theoretic rather than algebraic: completing the square turns "$n^2 + bn + c$ is a perfect square" into a [[difference-of-squares|difference of squares]] equal to a constant, and then [[factor-pair-counting|factor pairs]] or [[bounding-diophantine|bounding]] finish it. The algebraic uses, minimum values and circle centers, are routine at AMC level.
`,

"abs-value-relations": String.raw`
## Key forms
- $f(|x|, |y|)$ — solve in the first quadrant, where the bars vanish, then reflect into the other three
- $|x| + |y| \le c$ — a square standing on a corner, with diagonals $2c$ along the axes; $\max(|x|, |y|) \le c$ is the same square, untilted
- $\bigl||x| - h\bigr|$ — an inner shift places the copies at $\pm h$: $\bigl||x| - 1\bigr| + \bigl||y| - 1\bigr| \le 1$ is four unit diamonds centered at $(\pm1, \pm1)$
- $|x - y|$ — a mixed term adds its own fold line $y = x$, so the plane splits into six sectors instead of four
- $|x| + |y| + |x - y| = c$ — a centrally symmetric hexagon: $2\max(|x|, |y|)$ where $x$ and $y$ share a sign, $2(|x| + |y|)$ where they do not

## Why it works
Each bar is a mirror: a relation with $|x|$ in place of $x$ cannot tell $x$ from $-x$, so its graph is its own reflection across the $y$-axis, and bars on both variables make it symmetric across both axes.

That is why the first quadrant is enough. There $|x| = x$ and $|y| = y$, so the bars disappear and what is left is an ordinary relation. For $|x| + |y| \le c$ it is the triangle under $x + y = c$, and reflecting it across both axes gives four triangles that make a square standing on its corner.

Nested bars work from the outside in: the outer bars say reflect, and the inner expression says what to reflect, so $$\bigl||x| - 1\bigr| + \bigl||y| - 1\bigr| \le 1$$ is the diamond $|x - 1| + |y - 1| \le 1$ in the first quadrant, copied into the other three.

A mixed term like $|x - y|$ is not a reflection across an axis, and here the general principle takes over. An absolute value is linear on each side of the line where its inside is zero, so the zero sets of all the bars are fold lines, and between them the relation is linear.

For $|x| + |y| + |x - y|$ the fold lines are $x = 0$, $y = 0$ and $y = x$, which cut the plane into six sectors. Working out the expression in each gives $$2\max(|x|, |y|) \ \text{(same signs)}, \qquad 2(|x| + |y|) \ \text{(opposite signs)},$$ so the level set $= c$ is a hexagon with one side per sector.

At $c = 2$ its vertices are $(1, 0), (1, 1), (0, 1), (-1, 0), (-1, -1), (0, -1)$, and its area is $3$.

One symmetry always survives: replacing $(x, y)$ by $(-x, -y)$ changes none of $|x|$, $|y|$ and $|x - y|$, so the figure is centrally symmetric. This hexagon is in fact [[zonogon-minkowski|a zonogon]], the sum of the segments to $(1, 0)$, $(0, 1)$ and $(1, 1)$.

## How to use it
Draw first, in three moves.

- Strip to the first quadrant, graph what remains, then reflect.
- With nested bars, work from the inside out: the innermost expression is the base shape, the shift says where its center goes, and each outer bar doubles the number of mirrored copies.
- When a mixed term appears, draw its zero line as an extra fold and work sector by sector.

Once the picture is drawn, get any area or lattice count from it, as a number of copies of a known shape or one row at a time, rather than by [[casework-method|casework]] on signs, which for nested bars produces sixteen branches where the symmetry produces four identical pictures. Check whether the copies overlap before multiplying.

For what a single bar does to the graph of a function of one variable, see [[abs-value-graphing|the transformation rules]]; for the algebra of one bar on the number line, [[absolute-value-rules|the absolute value rules]].

## On contests
Nine problems here, split across AMC 10, AMC 12 and AIME, one solved by it alone; the others pair the region with an area, often involving a [[circle-basics|circle]], or with a [[basic-probability|probability]] that a random point lands in it. The tell is bars around both variables, or bars nested inside a shift: the moment you see either, stop splitting into cases and start reflecting.
`,

"absolute-value-identities": String.raw`## Key forms
- $|ab|=|a||b|$, $\left|\frac ab\right|=\frac{|a|}{|b|}$, $|a^n|=|a|^n$ — absolute value is multiplicative
- $|ax+b|=|a|\left|x+\frac ba\right|$ — the factoring move, and the one worth drilling
- $|a|^2=a^2$ and $\sqrt{a^2}=|a|$ — the pair that lets you square bars away and get them back
- $|a+b|$ obeys no identity, only the triangle inequality

## Why it works
Every one of these follows from $|t|=\pm t$ by checking signs, but the shorter reason is that $|t|$ is the distance from $t$ to $0$, and scaling a number by $a$ scales its distance from $0$ by $|a|$. Multiplication stretches the number line, so absolute value passes through it; addition slides one point relative to another, so it does not, and the most that survives is $|a+b|\le|a|+|b|$.

The factoring identity is the multiplicative rule read backwards. Since $ax+b=a\left(x+\frac ba\right)$, taking absolute values gives $|a|\left|x+\frac ba\right|$ directly.

## How to use it
Use it to turn any linear expression inside bars into a distance, which is the form every absolute-value equation and inequality wants to be in. $|3x-12|=3|x-4|$, so $|3x-12|\lt 6$ is "within $2$ of $4$", giving $2\lt x\lt 6$ with no casework.

Watch the sign of the coefficient. The factor outside is $|a|$, not $a$: $|-2x+4|=2|x-2|$, and writing $-2|x-2|$ makes a non-negative quantity negative. Squaring is the other reliable move, since $|a|=|b|$ and $a^2=b^2$ say the same thing, which clears bars from both sides of an equation at once.

## On contests
Most often a setup step rather than the answer: pulling the coefficient out converts a messy $|ax+b|$ into a distance and the problem becomes a picture on the number line. Nested bars are the AMC version, and they unfold from the inside using these same rules — see [[abs-value-graphing|graphing nested absolute values]] when the count of solutions is what is wanted.`,

"absolute-value-rules": String.raw`
## Why it works
Distance from $c$ is the same in both directions, which is why every absolute value condition is symmetric about $c$.

$|x - c| \lt d$ says $x$ is less than $d$ away from $c$, so it lies strictly between $c - d$ and $c + d$. $|x - c| \gt d$ says it is more than $d$ away, so it lies beyond one end or the other. And $\sqrt{x^2} = |x|$ because the square root symbol means the nonnegative root, while $x$ itself may be negative.

{{figure:number-line}}

## How to use it
Turn each absolute value into a distance or into two cases. To solve $|2x - 1| \lt 5$, divide by $2$ to get $\left|x - \frac12\right| \lt \frac52$: $x$ is within $\frac52$ of $\frac12$, so $-2 \lt x \lt 3$. For an equation $|A| = |B|$, solve $A = B$ and $A = -B$ separately.

The usual trap is a forgotten branch: $|x| \gt a$ has two rays, and $\sqrt{x^2}$ carries a sign. For nested absolute values, peel them from the outside by cases or graph and count, as in [[piecewise-graph-counting|counting solutions by graphing]]; with two variables, [[abs-value-relations|absolute value relations]] are graphed by symmetry.

## On contests
Five problems here, mostly AMC, two solved by it alone; two others move on to [[abs-value-relations|regions in the plane]]. Distance readings, sums of distances and piecewise equations are the common forms on MATHCOUNTS and early AMC.
`,

"median-minimizes-abs": String.raw`## Key forms
- $\alt{\sum_i|x-a_i|}{|x-a_1|+\cdots+|x-a_n|}$ is minimized when $x$ is a median of the $a_i$ — and when $n$ is even, every point of the whole interval between the two middle values achieves the same minimum
- the reason is a slope count: moving $x$ rightwards changes the sum at rate $\#\{a_i\lt x\}-\#\{a_i>x\}$, which is negative below the median and positive above it, so the minimum is exactly where the counts balance — the slope argument also shows why an even count ties across the whole middle interval
- the contrast worth remembering is that $\alt{\sum_i(x-a_i)^2}{(x-a_1)^2+\cdots+(x-a_n)^2}$ is minimized at the mean instead — which average you want depends entirely on whether the penalty is absolute or squared

## Why it works
Sweep $x$ from left to right: the slope of $f(x) = \sum w_i|x - a_i|$ is (total weight of the $a_i$ below $x$) minus (total weight above). It starts at $-\sum w_i$ and jumps up by $2w_i$ as $x$ passes each $a_i$, so $f$ is convex and piecewise-linear. Its minimum is where the slope turns from negative to nonnegative — exactly where the weight below first matches the weight above, i.e. the (weighted) median. In the unweighted even-count case the slope is $0$ across the whole middle interval, so every point there ties.

## How to use it
Never differentiate an absolute-value sum — find the median. Unweighted: sort and take the middle value (or anything between the two middle ones). Weighted: accumulate weights in sorted order until you first pass half the total; a coefficient $w_i$ (or a repeated point) simply counts as weight. The minimum value is then $\sum w_i\,|{\text{median}} - a_i|$, which pairs symmetric terms cleanly. Squared distances instead give the mean — the $L^1$ versus $L^2$ distinction.

## On contests
"Find $x$ minimizing $|x-1| + |x-2| + \cdots + |x-n|$" and its coefficient-weighted cousins are recurring AMC/AIME problems — instant once you spot the median. It also settles "minimize the total distance traveled to stops on a line" word problems.`,

"weierstrass-substitution": String.raw`## Key forms
- $t=\tan\frac\theta2$ turns every trigonometric function of $\theta$ into a rational function of $t$: $\sin\theta=\frac{2t}{1+t^2}$, $\cos\theta=\frac{1-t^2}{1+t^2}$, $\tan\theta=\frac{2t}{1-t^2}$ — so a trigonometric equation becomes a polynomial one
- the same identities parametrise the unit circle rationally, which is why $(1-t^2,\,2t,\,1+t^2)$ generates every Pythagorean triple — which is why the substitution and Pythagorean triples are the same fact wearing different clothes

## Why it works
Writing $t = \tan\frac{\theta}{2}$ and using the double-angle formulas expresses $\sin\theta = 2\sin\frac{\theta}{2}\cos\frac{\theta}{2}$ and $\cos\theta = \cos^2\frac{\theta}{2} - \sin^2\frac{\theta}{2}$ as rational functions of $t$ after dividing through by $\cos^2\frac{\theta}{2} = \frac{1}{1 + t^2}$. Every trig function of $\theta$ becomes rational in $t$.

## How to use it
Deploy it when a trig equation or expression mixes $\sin\theta$ and $\cos\theta$ in a way that resists identities: substitute, clear denominators, and solve the resulting polynomial in $t$, then untangle $\theta$ from $t = \tan\frac{\theta}{2}$. The same algebra underlies rational parametrizations of the unit circle and the $(1 - t^2, 2t, 1 + t^2)$ Pythagorean-triple family.

## On contests
A niche but decisive olympiad tool for trig equations and for proving rational-point facts about the circle; it's the bridge between "half-angle" identities and Pythagorean triples. Rarely the fastest route on AMC/AIME, where targeted identities usually win, but unbeatable when you genuinely need to rationalize.`,



"tangent-line-trick": String.raw`## Key forms
- a convex function lies above each of its tangent lines, so $f(x)\ge f(a)+f'(a)(x-a)$ — summing this linear lower bound is far easier than handling $f$ directly
- take the tangent at the equality point $a=\frac sn$: the constraint $\alt{\sum x_i}{x_1+\cdots+x_n}=s$ makes the linear terms cancel, leaving exactly $\alt{\sum f(x_i)}{f(x_1)+\cdots+f(x_n)}\ge n f\!\left(\frac sn\right)$ — it only works for convex $f$, so verify convexity on the actual range before trusting the bound
- the one obligation is verifying $f(x)\ge L(x)$ across the whole allowed range, and the difference almost always factors as a square over something positive, as in $\frac1x-(6-9x)=\frac{(3x-1)^2}{x}$ — if it fails anywhere, fall back to [[sos-method|SOS]] or [[jensens-inequality|Jensen]]

## Why it works
A convex function lies above every one of its tangent lines: $f(x) \ge f(a) + f'(a)(x-a)$ for all $x$. Summing this over $x_1, \dots, x_n$ makes the right side $\sum f(a) + f'(a)\sum(x_i - a)$; if you take the tangent at the equality point $a = s/n$, the constraint $\sum x_i = s$ kills the linear term, leaving exactly the bound $\sum f(x_i) \ge n f(s/n)$ — with equality when all $x_i$ are equal.

## How to use it
Use it on $\sum f(x_i)$ with a fixed sum when you suspect equality at all-variables-equal. (1) Find $a = s/n$. (2) Write the tangent line $L(x) = f(a) + f'(a)(x-a)$. (3) Prove $f(x) \ge L(x)$ on the allowed range — the difference almost always factors as a perfect square times a nonnegative term, e.g. $\frac1x - (6 - 9x) = \frac{(3x-1)^2}{x}$. (4) Sum. If the tangent bound fails somewhere in the domain (common when variables can be large or the function isn't convex throughout), the trick doesn't apply and you fall back to SOS or Jensen.

## On contests
The go-to elementary weapon for symmetric-sum inequalities with a linear constraint, especially where Jensen would work but you want a self-contained proof. It reduces an olympiad inequality to a single-variable square check — clean enough to write out fully under time pressure.`

});

Object.assign(window.MATH_DETAILS, {

"holders-inequality": String.raw`## Why it works
Hölder is $\ell^p$–$\ell^q$ duality. With $\frac1p + \frac1q = 1$, apply [[weighted-am-gm|weighted AM–GM]] termwise to $\frac{a_i^p}{\sum a^p}$ and $\frac{b_i^q}{\sum b^q}$ and sum: the total is $1$, which rearranges to $\sum a_i b_i \le (\sum a^p)^{1/p}(\sum b^q)^{1/q}$. The three-sequence form is the same statement with exponents $\frac13 + \frac13 + \frac13 = 1$. Any number of sequences works the same way: with weights $\lambda_j\ge0$ summing to $1$, $\prod_j\big(\sum_i a_{ij}\big)^{\lambda_j}\ge\sum_i\prod_j a_{ij}^{\lambda_j}$, which is the form to reach for when the exponents in a problem are not all equal.

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
It is the triangle inequality for the norm $\|x\|_p = (\sum |x_i|^p)^{1/p}$: $\|a + b\|_p \le \|a\|_p + \|b\|_p$. For $p = 2$ this is $|\vec u| + |\vec v| \ge |\vec u + \vec v|$ — the straight path beats the bent one. The general case follows from [[holders-inequality|Hölder]].

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
This is the dictionary that turns [[generating-function-method|generating functions]] into numbers. Model unlimited repetition of $k$ item types by $\frac{1}{(1-x)^k}$ and read the $x^n$ coefficient as $\binom{n+k-1}{k-1}$. Multiply such factors (and finite pieces $\frac{1-x^{m+1}}{1-x}$ for bounded supply), expand, and extract the coefficient. Know $\frac{1}{1-x} = \sum x^n$ and $\frac{1}{(1-x)^2} = \sum (n+1)x^n$ cold.

## On contests
The engine behind AIME/olympiad generating-function counts and every "number of nonnegative integer solutions" problem — it is [[stars-and-bars|stars and bars]], packaged to compose with other generating functions. For formal coefficient extraction, convergence never matters.`,

"cardano-cubic": String.raw`## Why it works
The substitution $x = t - \frac{b}{3a}$ kills the quadratic term, leaving $t^3 + pt + q = 0$. Setting $t = u + v$ with $3uv + p = 0$ turns it into $u^3 + v^3 = -q$ and $u^3 v^3 = -\frac{p^3}{27}$, so $u^3, v^3$ are roots of a quadratic — giving the nested cube-root expression. The term under the inner square root is (up to a constant) the discriminant $\Delta = -4p^3 - 27q^2$.

## How to use it
Depress the cubic, apply the formula, then add $-\frac{b}{3a}$ back. Read the discriminant to predict roots: $\Delta \lt  0$ → one real root the formula gives directly; $\Delta > 0$ → three real roots but via complex cube roots (casus irreducibilis), where the trig substitution $t = 2\sqrt{-p/3}\cos\theta$ is cleaner; $\Delta = 0$ → a repeated root. In practice, try the [[rational-root-theorem|rational root theorem]] and factoring first.

## On contests
Almost never the intended path — contest cubics are designed to factor. Worth knowing it exists (and the discriminant's root count is occasionally handy), but reach for rational roots, [[vietas-general|Vieta]], or a clever substitution before Cardano.`

});

Object.assign(window.MATH_DETAILS, {

"power-mean-inequality": String.raw`## Why it works
$p \mapsto M_p$ is nondecreasing because $x \mapsto x^{p/q}$ is convex for $p > q > 0$ (Jensen applied to $a_i^q$); limiting and sign arguments extend the chain through $p = 0$ (which is the geometric mean) and to negative exponents. All values equal collapses every mean to the same number — the equality case.

## How to use it
Match the two exponents to your data: $M_2 \ge M_1$ compares $\sum a_i^2$ with $(\sum a_i)^2$; $M_1 \ge M_{-1}$ is AM–HM; $M_1 \ge M_0$ is AM–GM. When a problem mixes, say, cubes and first powers, quote the general $M_p \le M_q$ ($p \lt  q$) directly. It's often the cleanest finish after normalizing $n$ or $\sum a_i$.

## On contests
The workhorse behind "compare these symmetric sums" inequalities on AIME and olympiad — it packages the whole [[mean-chain|QM–AM–GM–HM chain]] into one statement. Name the specific exponent step you use.`,

"weighted-am-gm": String.raw`## Why it works
It is Jensen for the concave logarithm: $\ln\!\big(\sum w_i a_i\big) \ge \sum w_i \ln a_i = \ln\!\big(\prod a_i^{w_i}\big)$. Rational weights reduce to ordinary AM–GM by repeating terms; arbitrary weights follow by continuity.

## How to use it
Choose weights to produce the exponents you want. To bound a product $\prod a_i^{c_i}$, take weights $w_i \propto c_i$ so the weighted GM is your product and the weighted AM is a sum you control — this is how targeted bounds like $a^3 + a^3 + b^3 \ge 3a^2 b$ are proved. It also proves Young's inequality and, through it, [[holders-inequality|Hölder]].

## On contests
Half of olympiad inequality work is picking good weights. Equal weights (plain AM–GM) handle symmetric sums; the weighted form is what unequal exponents demand. Equality iff all $a_i$ are equal.`,

"eisenstein-criterion": String.raw`## Why it works
If a prime $p$ divides every coefficient except the leading one and $p^2$ does not divide the constant term, reducing a hypothetical factorisation mod $p$ forces both factors to be powers of $x$ times a unit. Their constant terms would then both be divisible by $p$, making the product's constant term divisible by $p^2$, which contradicts the hypothesis. So no factorisation into lower-degree rational polynomials exists.

## How to use it
Check the three conditions in order: $p\mid a_0,\dots,a_{n-1}$, then $p\nmid a_n$, then $p^2\nmid a_0$. If no prime works as written, try a shift $x\mapsto x+c$ first, since irreducibility is unchanged by it. For the cyclotomic $\Phi_p(x)=1+x+\cdots+x^{p-1}$, substituting $x+1$ makes $p$ Eisenstein, because the middle binomial coefficients are all divisible by $p$. The criterion only ever proves irreducibility, never the reverse: failing it says nothing.

## On contests
Rare below olympiad level, and when it appears the polynomial is usually cyclotomic or one shift away from it. Worth knowing mainly so that "show this is irreducible over $\mathbb{Q}$" has a first move.`,

"abel-summation": String.raw`## Why it works
Summation by parts: substitute $a_k = A_k - A_{k-1}$ and reindex, exactly mirroring $\int u\,dv = uv - \int v\,du$. The boundary term $A_n b_n$ minus the sum of $A_k$ against the forward differences $b_{k+1} - b_k$ reconstructs the original sum.

## How to use it
Use it when one factor has a clean partial sum $A_k$ (arithmetic, geometric, binomial) or the other is monotone. Sums such as $\sum k r^k$, $\sum k\binom{n}{k}$, and Dirichlet-type $\sum a_k/k$ all yield. When $b_k$ is monotone the transformed sum has one-signed terms — the mechanism behind the proofs of [[chebyshev-sum-inequality|Chebyshev's]] and [[karamata-inequality|Karamata's]] inequalities and Abel's convergence test.

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
- push the difference into the form $S_a(b-c)^2+S_b(c-a)^2+S_c(a-b)^2$, which is visibly non-negative once every coefficient is — this works because a symmetric expression vanishing at $a=b=c$ naturally reorganizes around the squared differences
- when the coefficients are not all non-negative, the ordered test usually rescues it: assuming $a\ge b\ge c$, it suffices that $S_b\ge0$, $S_b+S_a\ge0$ and $S_b+S_c\ge0$ — ordering the variables is the standard rescue, and it is usually enough
- the $uvw$ partner rewrites everything in $p=a+b+c$, $q=ab+bc+ca$, $r=abc$; with $p$ and $q$ fixed the expression is linear in $r$, so its extremes sit at the boundary, meaning it is enough to check the two shapes $b=c$ and $c=0$ — linearity in $r$ means the extremes sit at the boundary, which is where two variables become equal
- keep [[schurs-inequality|Schur's inequality]] $p^3+9r\ge4pq$ on hand — it is the standard closer for the residual case neither method kills

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
Expanding $\cos n\theta$ with [[angle-addition|angle addition]] always yields a polynomial in $\cos\theta$ (the odd powers of $\sin\theta$ pair up), and that polynomial is $T_n$. Its recurrence $T_{n+1} = 2x\,T_n - T_{n-1}$ (with $T_0=1$, $T_1=x$) mirrors $\cos(n+1)\theta = 2\cos\theta\cos n\theta - \cos(n-1)\theta$; the second kind $U_n$, with $U_n(\cos\theta) = \frac{\sin((n+1)\theta)}{\sin\theta}$, obeys the same recurrence.

## How to use it
Two moves. First, substitute $x=\cos\theta$ to evaluate stubborn polynomials or nested cosine products: the roots $x_k = \cos\frac{(2k-1)\pi}{2n}$ give exact values and a product of cosines collapses. Second, for "make the largest value as small as possible," invoke the minimax fact: $\frac{1}{2^{n-1}}T_n$ is the monic degree-$n$ polynomial with the least maximum $|\cdot|$ on $[-1,1]$, equioscillating between $\pm\frac{1}{2^{n-1}}$.

## On contests
Iterated maps like $x\mapsto 2x^2-1$ (which is $T_2$) and multiple-angle [[even-power-sin-cos-sums|cosine sums]] are the recurring AIME/olympiad uses; the minimax property answers the rarer "minimize the peak of a monic polynomial" question. Closely tied to the trig substitution $x=\cos\theta$.`,

"lagranges-identity": String.raw`## Why it works
Expand both sides. The product $\left(\sum a_i^2\right)\left(\sum b_j^2\right) = \sum_{i,j} a_i^2 b_j^2$ splits into the diagonal terms $\sum_i a_i^2 b_i^2$ and the off-diagonal $\sum_{i\ne j} a_i^2 b_j^2$. The squared [[vector-dot-product|dot product]] $\left(\sum a_i b_i\right)^2 = \sum_i a_i^2 b_i^2 + \sum_{i\ne j} a_i b_i a_j b_j$ shares the same diagonal. Subtracting, the diagonals cancel and the off-diagonal remainder pairs up: $a_i^2 b_j^2 + a_j^2 b_i^2 - 2 a_i b_i a_j b_j = (a_i b_j - a_j b_i)^2$ for each pair $i \lt j$. That is the right-hand side.

## How to use it
Because the right side is a sum of squares it is $\ge 0$, which is exactly the [[cauchy-schwarz|Cauchy–Schwarz inequality]] — and it pins the equality case: every $a_i b_j - a_j b_i = 0$, i.e. the sequences are proportional. It also names the "defect" in Cauchy–Schwarz precisely, useful when you need not just $\le$ but how much slack there is. In three dimensions it is the vector identity $|\mathbf a|^2 |\mathbf b|^2 - (\mathbf a\cdot\mathbf b)^2 = |\mathbf a\times\mathbf b|^2$.

## On contests
The two-term case $(a^2+b^2)(c^2+d^2) = (ac-bd)^2 + (ad+bc)^2$ is the [[brahmagupta-fibonacci|Brahmagupta–Fibonacci identity]] — the workhorse for sum-of-two-squares problems and complex-number norms. The full identity itself is rarer, but it is the cleanest one-line proof of Cauchy–Schwarz and the tidiest way to argue an equality/proportionality condition.`,

"abs-value-graphing": String.raw`## Key forms
- $f(|x|)$ — delete the graph for $x\lt 0$ and replace it with the mirror image of the $x\ge0$ half, so the result is always even and symmetric about the $y$-axis
- $|f(x)|$ — leave the domain untouched and reflect every part below the $x$-axis up over it, so the graph never goes negative and develops a corner at each root of $f$
- $|y|=f(x)$ — reflect the graph across the $x$-axis and keep both copies, which is the one case that stops being a function
- if $f(x)=f(-x)$, solve on $x\ge0$ and double the answer count, subtracting one when $x=0$ is itself a solution — the same reduction works in $y$ when $f(y)=f(-y)$
- $f(x-h)$ shifts right by $h$ and $f(x)+k$ shifts up by $k$ — inside the function moves the graph along $x$ and in the opposite direction to the sign, outside moves it along $y$ in the same direction as the sign
- $a\,f(x)$ stretches vertically by $a$ while fixing the $x$-axis, and $f(bx)$ compresses horizontally by $b$ while fixing the $y$-axis — a vertical stretch leaves every root where it was, which is why corners on the axis do not move
- apply the transformations from the innermost bracket outward, since $2\bigl||x-5|-5\bigr|$ is the shift, then the drop, then the fold, then the stretch, and doing them in any other order gives a different graph

## Why it works
Bars around the input and bars around the output act on different axes. Replacing $x$ by $|x|$ changes which input is fed to $f$, and since $|x|$ and $|-x|$ agree, the two halves of the domain receive identical values, which is exactly a mirror across the $y$-axis. Replacing $f$ by $|f|$ changes the output after $f$ has done its work, and negating a negative output is a reflection across the $x$-axis applied only where the graph was below it. Because each bar is a single geometric operation, a nested expression is just those operations composed from the inside out.

## How to use it
Peel from the innermost bar. Sketch the plain function first, then apply one transformation per bar: mirror for a bar on the input, fold for a bar on the output. Corners appear exactly where the folded part meets the axis, which is at the roots of whatever sat inside the bars, so those roots are the points to mark.

For "how many solutions does $||x|-a|=b$ have" questions, do not solve. Draw the left side, draw the horizontal line $y=b$, and count crossings, since the shape of the folded graph makes the count obvious as $b$ varies. When both variables carry bars the picture stops being a graph and becomes a region, which is a different job: see [[abs-value-relations|the two-variable case]] for the symmetry that graphs those regions without splitting into sign cases.

## On contests
A recurring AMC and AIME setup, usually phrased as a count of solutions or as the area enclosed by an absolute-value equation. The count questions are decided entirely by how many times a horizontal line meets a folded graph. The area questions need the shapes a bar cuts out of the plane instead; the two together cover the topic, and the same problem often wants one of each.`,

"first-order-recurrence": String.raw`
## Why it works
The fixed point is the one value the recurrence leaves alone: solving $L = rL + d$ gives $L = \frac{d}{1 - r}$. Subtracting $L = rL + d$ from $a_n = ra_{n-1} + d$ removes the constant, $$a_n - L = r(a_{n-1} - L), \qquad \text{so} \qquad a_n - L = r^n(a_0 - L).$$

That subtraction is the whole content: $d$ disappears into the change of origin, and what is left is a [[geometric-series|geometric sequence]] of gaps from $L$. It also predicts the behaviour without any computation.

{{figure:gaps}}

So $a_n$ approaches $L$ when $|r| \lt 1$, runs away when $|r| \gt 1$, and alternates around $L$ when $r$ is negative.

The excluded case is $r = 1$, where $x \mapsto x + d$ has no fixed point at all; there the recurrence is an [[arithmetic-series|arithmetic sequence]], $a_n = a_0 + nd$.

## How to use it
Three steps, in order: solve $L = rL + d$, write $a_n = r^n(a_0 - L) + L$, and read off what the question wants, a specific term, the limit $L$, or the step at which a threshold is crossed, which is a logarithm away.

Recognize the shape in words, since it is rarely written as a recurrence. "Each year the population grows by $8\%$ and $500$ more arrive" is $r = 1.08$ and $d = 500$. "Half the liquid in a $6$-litre tank is removed and replaced with $3$ litres of water", tracking the water, is $r = \frac12$ and $d = 3$. Interest with a fixed deposit and repeated dilution are the same recurrence.

Two checks prevent the usual errors: rule out $r = 1$ before dividing by $1 - r$, and confirm whether the sequence starts at $a_0$ or $a_1$, since the exponent in $r^n$ shifts with it.

## On contests
Two problems here, one AIME and one AMC 12, neither solved by it alone: one pairs it with a [[states-recursion-prob|recursion on states]] for a probability, the other with [[periodicity-mod-m|periodicity]] modulo $m$. At MATHCOUNTS and on the AMC it appears in disguise as a mixture, interest or population question, and the fixed point is usually the number being asked for. Any process described as repeating forever and asked to settle calls for solving $L = rL + d$ first.
`

});

Object.assign(window.MATH_DETAILS, {

"proportion-properties": String.raw`
## Why it works
Equal ratios all hide the same multiplier, and once each numerator is written as that multiplier times its denominator, every rule is one line of algebra.

If $\frac{a_i}{b_i} = k$ for every $i$, then $a_i = kb_i$. Adding, $a_1 + \cdots + a_n = k(b_1 + \cdots + b_n)$, so the pooled fraction $\frac{a_1 + \cdots + a_n}{b_1 + \cdots + b_n}$ is again $k$. Scaling each pair first changes nothing, since $w_ia_i = k(w_ib_i)$ as well.

For a single proportion $\frac ab = \frac cd = k$, write $a = kb$ and $c = kd$. Then $\frac{a + b}{b} = k + 1 = \frac{c + d}{d}$, which is componendo, and $\frac{a - b}{b} = k - 1 = \frac{c - d}{d}$, which is dividendo. Dividing the first by the second gives $$\frac{a + b}{a - b} = \frac{k + 1}{k - 1} = \frac{c + d}{c - d},$$ provided $k \ne 1$ so that nothing is divided by zero.

## How to use it
When several equal ratios (or a single proportion) appear, add numerators over denominators to collapse them to the common value in one step. Use componendo-dividendo — $$\frac{a}{b}=\frac{c}{d}\Rightarrow\frac{a+b}{a-b}=\frac{c+d}{c-d}$$ — to simplify sum-and-difference forms before cross-multiplying.

## On contests
A MATHCOUNTS and AMC time-saver, and nearly always the whole solution when it applies: 16 of the 19 problems tagged here need nothing else. The addendo one-liner beats introducing a parameter, and componendo-dividendo tidies a messy proportion equation before you solve it.
`,

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
To justify "equality when all variables are equal," show each smoothing step improves the objective without violating the constraint — then the extremum is the all-equal (or boundary) configuration. This is the rigorous backbone under many [[am-gm|AM-GM]] and [[jensens-inequality|Jensen]] guesses.

## On contests
An olympiad inequality technique; when a symmetric max or min "obviously" occurs at equality, smoothing (or its [[sos-method|SOS]] / mixing-variables cousin) is how you prove it rather than assert it.`,

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

"symmetric-polynomial-strategies": String.raw`
## Key forms
- $\alt{\prod_i(a-r_i)}{(a-r_1)\cdots(a-r_n)}=\frac{P(a)}{a_n}$ — any product over the roots collapses to a single evaluation of $P$, which is the highest-leverage move available
- $\alt{\prod_i(r_i^2+c^2)}{(r_1^2+c^2)\cdots(r_n^2+c^2)}=\frac{P(ci)\,P(-ci)}{a_n^{2}}$ — the same identity read at complex points, since $r^2+c^2=(r-ci)(r+ci)$; the answer comes out real, which is a useful check
- $\alt{\sum_i\frac{1}{a-r_i}}{\frac{1}{a-r_1}+\cdots+\frac{1}{a-r_n}}=\frac{P'(a)}{P(a)}$ — the logarithmic derivative, which evaluates sums of reciprocals in one step
- [[newtons-sums|Newton's sums]] turn the $e_k$ into power sums $\alt{\sum r_i^k}{r_1^k+\cdots+r_n^k}$ — the bridge whenever the target is a sum of powers rather than a product

## Why it works
Permuting the roots does not change the polynomial, so anything built from its coefficients is symmetric in the roots. The theorem is the converse: every symmetric polynomial in $r_1, \ldots, r_n$ is a polynomial in the elementary symmetric sums $e_1, \ldots, e_n$, which [[vietas-general|Vieta's formulas]] identify with the coefficients.

The evaluation identities come from the factored form. $P(x) = a_n\prod(x - r_i)$ holds for every $x$, so substituting any number, real or complex, turns a product over the roots into a single value of $P$. For example $r^2 + 1 = (r - i)(r + i)$, so $$\prod_i\left(r_i^2 + 1\right) = \frac{P(i)\,P(-i)}{a_n^2}.$$

## How to use it
Work down a short ladder and stop at the first rung that applies.

- Check that the expression is symmetric; if swapping two roots changes it, pair it with its partner to make a symmetric combination.
- Read the elementary symmetric sums off the coefficients, and never solve for the roots.
- For a sum of powers, climb from the $e_k$ with [[newtons-sums|Newton's sums]].
- For a product over the roots, evaluate $P$ instead of expanding.
- Otherwise expand into the $e_k$ by hand, as in $\sum r_i^2 = e_1^2 - 2e_2$.

For $r, s, t$ the roots of $x^3 - 2x + 5$, the product $(r^2 + 1)(s^2 + 1)(t^2 + 1)$ is $P(i)P(-i) = (5 - 3i)(5 + 3i) = 34$, and no root is ever found. Sums of reciprocals use the logarithmic derivative, $\sum \frac1{a - r_i} = \frac{P'(a)}{P(a)}$.

## On contests
Five problems here, four of them AIME, one solved by it alone; two finish with [[vietas-general|Vieta's formulas]] directly. The tell is a symmetric expression in roots that would be hopeless to find: ask whether it is symmetric, then whether it is a product, and reach for $P(i)P(-i)$ the moment you see $r^2 + 1$.
`,

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
Recognize the shape first: a sum over $k=1,\dots,n-1$ of a trigonometric function of $k\pi/n$ is a sum over the nontrivial $n$th [[roots-of-unity|roots of unity]] in disguise, and the substitution above is the standard way in. The two results are worth storing as a pair, since $\csc^2 = \cot^2+1$ converts either into the other in one line and problems quote both.

The identity $\frac{1}{1-\omega^k} = \frac12+\frac{i}{2}\cot\frac{k\pi}{n}$ is the reusable part. Taking real parts of $\sum\frac{1}{1-\omega^k} = \frac{n-1}{2}$ recovers $\sum\cot\frac{k\pi}{n}=0$, and pushing the same method to fourth powers gives $\sum\csc^4$, the next sum in the family.

## On contests
Standard AIME fare whenever a problem asks for a closed form of $\sum\csc^2$ or $\sum\cot^2$ at equally spaced angles, and the engine behind several $\sum 1/\sin^2$ evaluations. The same roots-of-unity-to-cotangent bridge is how the Basel sum $\sum 1/k^2 = \pi^2/6$ is proved by elementary means, squeezing $\cot^2$ against $\csc^2$.`,

"shifted-polynomial-construction": String.raw`
## Key forms
- $f(a_i) = k$ for $i = 1, \ldots, m$ — then $f(x) = \alt{\left(\prod_i (x - a_i)\right)}{(x - a_1)\cdots(x - a_m)}Q(x) + k$, since $f - k$ has the $a_i$ as roots
- $f(a_i) = g(a_i)$ for a simpler polynomial $g$ — then $f(x) = \alt{\left(\prod_i (x - a_i)\right)}{(x - a_1)\cdots(x - a_m)}Q(x) + g(x)$; $g$ linear is the remainder on division by a quadratic
- $\deg Q = \deg f - m$ — when $m$ equals the degree, only the leading coefficient is left to find

## Why it works
It is the [[factor-remainder-theorem|factor theorem]] applied to the right polynomial. The given points are not roots of $f$, but they are roots of $h(x) = f(x) - k$, which has the same degree and leading coefficient as $f$. So $h$ carries the factors $(x - a_i)$, and $f(x) = h(x) + k$.

Nothing there used the fact that $k$ is a constant. If $f$ agrees with a polynomial $g$ at the points $a_i$, then $f - g$ vanishes at all of them, so $$f(x) - g(x) = (x - a_1)\cdots(x - a_m)\,Q(x).$$ Two values on a line give $g$ linear, which is the statement that the remainder of $f$ on division by $(x - a)(x - b)$ is the line through the two data points.

Degrees count what is left: $\deg Q = \deg f - m$. When $m$ reaches the degree of $f$, $Q$ is a constant, and one more piece of data, another value or the leading coefficient, finishes the job.

## How to use it
Read the problem for repeated outputs, then subtract.

- Set $h(x) = f(x) - k$ and write down its known linear factors.
- Compare $\deg f$ with the number of known roots; the shortfall is how many unknown roots to carry.
- Restore $f(x) = c\prod(x - a_i) + k$ and use the remaining conditions to find the unknowns.
- Answer by evaluating this form, never by expanding.

When the values follow a pattern instead of repeating, subtract the pattern: if $f(i) = i^2$ for several $i$, work with $f(x) - x^2$, and if $f(i) = \frac1i$, clear the denominator and work with $xf(x) - 1$.

## On contests
Three problems here, all AIME, none solved by it alone. The shapes are a polynomial agreeing with a line at two points, so that subtracting the line leaves a product of integers to bound; a cubic whose six given values of $\pm 12$ must split into two groups of equal outputs; and a minimum value that forces $f(x) - n$ to be a perfect square.
`,

"forced-difference-of-squares": String.raw`## Key forms
- $X^2-Y^2=(X-Y)(X+Y)$ — the shape to force; add and subtract whatever the square is missing
- compare the actual middle term with the $2XY$ a perfect square would need — the gap is exactly what you add and subtract
- $x^4+x^2+1=(x^2+1)^2-x^2$ — it factors only when that leftover is itself a square, which is why $x^4+3x^2+1$ does not
- $a^4+4b^4=(a^2+2b^2)^2-(2ab)^2$ — the [[sophie-germain|Sophie Germain identity]], the same move with $Y=2ab$

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
The reflex to train is "an even-degree polynomial with a gap in the middle wants to be a [[difference-of-squares|difference of squares]]." It cracks $n^4+4$ composite problems, factors quartics that look prime, and turns many AIME algebraic-manipulation steps into one line. When a factorization is demanded and no rational root exists, this is usually what is wanted.`,

"log-substitution": String.raw`
## Key forms
- set $u=\log_b x$, so $x=b^{\,u}$ — an equation built from $\log x$ by adding, multiplying and raising to powers is a polynomial in that single quantity, and naming it makes the polynomial visible
- when bases and arguments are swapped, set $t=\log_a b$ instead, since $\log_b a=\frac1t$ — the equation becomes rational in one unknown instead of having two
- convert back with $x=b^{\,u}$ and test every candidate in the original equation — $u$ ranges over all reals while the original may require a positive argument, so the check is not optional

## Why it works
Logarithms obstruct algebra because the logarithm of a sum does not simplify, but they behave perfectly under products and powers. So an equation built from $\log x$ by adding, multiplying and raising to powers is a polynomial in the single quantity $\log x$; it only looks transcendental.

Naming that quantity $u$ makes the polynomial visible. The map $u \mapsto b^{\,u}$ takes the real numbers one-to-one onto the positive reals, so each root $u$ gives exactly one candidate $x = b^{\,u}$.

The base-swap version works the same way. If $t = \log_a b$, then $$\log_b a = \frac{1}{\log_a b} = \frac1t,$$ so an equation mixing the two is a rational equation in $t$, and clearing denominators gives a polynomial, usually a quadratic.

## How to use it
Look for a repeated logarithmic block, then name it.

- Every $\log$ has the same base and argument: set $u = \log_b x$ and rewrite. Terms like $\log_b x^3$ become $3u$ and $\log_b\frac{1}{x}$ becomes $-u$, so the equation collapses to a polynomial in $u$.
- The bases and arguments are swapped: set $t = \log_a b$, replace $\log_b a$ by $\frac1t$, and clear denominators.
- The unknown appears in an exponent as well as inside a log, as in $x^{\log_b x} = c$: take $\log_b$ of both sides first, which produces $(\log_b x)^2$, then substitute.
- Several logs of different bases: convert to one base first, which usually reveals a single repeated block.

Finish with the two steps that are easy to skip: convert back with $x = b^{\,u}$ for every root, and test each candidate in the original equation, since the substitution can produce roots that violate the domain.

## On contests
Three problems here, two AIME and one AMC 12, none solved by it alone. The common shapes are an equation that becomes a quadratic in $u$ after a change of base, and a system that one variable per logarithm turns into a [[symmetric-linear-system|symmetric linear system]]. When the question asks for the product of the solutions, $$x_1x_2 = b^{\,u_1 + u_2},$$ so the sum of the roots in $u$, from [[vietas-quadratic|Vieta's formulas]], is all that is needed.`,

"normalization": String.raw`## Key forms
- $f(ta,tb,tc)=t^d f(a,b,c)$ — the definition of homogeneous of degree $d$; when it holds, only the ratios of the variables matter
- normalize: fix one scale-sensitive quantity for free, setting $a+b+c=1$, or $abc=1$, or one length to $1$, whichever removes the most clutter — pick whichever constraint kills the most clutter, since all of them are equally valid
- homogenize: replace each constant by the constraint raised to the power that levels the degrees, so $\frac13$ under $a+b+c=1$ becomes $\frac13(a+b+c)^2$ in a degree-$2$ inequality — this is what makes [[muirheads-inequality|Muirhead]] and [[schurs-inequality|Schur]] available, since both require every term to share a degree
- check homogeneity before normalizing — on a non-homogeneous expression the scaling changes the two sides differently and the argument is simply invalid

## Why it works
An expression is homogeneous of degree $d$ if replacing $(a, b, c)$ by $(ta, tb, tc)$ multiplies it by $t^d$, so an inequality between two degree-$d$ expressions is unchanged by that scaling. Only the ratios of the variables carry information, and you may fix any one scale-sensitive quantity at a convenient value. Nothing is lost, because any general point can be scaled onto your normalization and scaled back afterwards.

Homogenizing runs the same logic backwards. A constrained inequality is not homogeneous, since its constant terms have degree $0$ while its variable terms do not, and that mismatch is exactly what blocks the standard machinery. Substituting the constraint for $1$ raises those constants to the right degree without changing their value, and the result is an unconstrained homogeneous inequality that means the same thing.

## How to use it
Confirm homogeneity first: both sides the same degree, or degree $0$ for a pure ratio. Then pick the normalization that simplifies the most, $a+b+c=1$ for symmetric sums, $abc=1$ when the constraint is multiplicative, or a key length set to $1$ in geometry. Solve the constrained problem and the general case follows by scaling.

To homogenize, find the degree you want every term to have, then multiply each lower-degree term by the constraint raised to the difference. Under $a+b+c=1$ a degree-$2$ target turns $\frac13$ into $\frac13(a+b+c)^2$, a constant $1$ into $(a+b+c)^2$, and a linear term $a$ into $a(a+b+c)$. Once every term matches in degree, Muirhead, Schur and bunching all become available, and the constraint can be forgotten entirely.

## On contests
The standard opening move for olympiad inequalities: normalize, then apply [[am-gm|AM-GM]], Cauchy, or a bunching argument to the simpler form; or homogenize, then compare exponent sequences directly. On AIME it appears as "assume the perimeter is $1$" or "set the circumradius to $1$" to strip a nuisance parameter before computing. The only discipline required is checking homogeneity first, since applied to a non-homogeneous expression the whole argument collapses.`,

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
"double-summation": String.raw`## Why it works
A finite double sum is a sum over a set of index pairs, and nothing about that set cares which index you sweep first. So the order of the two summation signs is free, and every manipulation below is really a re-description of the same region of pairs. Swapping is worth doing whenever the inner limits depend on the outer index, because the transposed region often has constant limits instead.

## How to use it
Before manipulating anything, write down the index region as a set of conditions. Almost every error in this area is a limit error, and almost every one is caught by checking a small case such as $n=3$ by hand.

The identities worth recognizing on sight:

- $\sum_i\sum_j a_{ij}=\sum_j\sum_i a_{ij}$ — the order never matters for a finite double sum, so sweep whichever index is easier
- $\sum_i\sum_j f(i)g(j)=\left(\sum_i f(i)\right)\left(\sum_j g(j)\right)$ — a separable summand splits into two independent one-variable sums
- $\sum_{i=1}^{n}\sum_{j=i}^{n}a_{ij}=\sum_{j=1}^{n}\sum_{i=1}^{j}a_{ij}$ — over a triangular region, swapping rewrites the inner limits rather than removing them
- $\sum_{i\ne j}a_ia_j=\left(\sum_i a_i\right)^2-\sum_i a_i^2$, so $\sum_{i\lt j}a_ia_j$ is half of it — the standard route into a symmetric pair sum
- $\sum_{n\le N}\sum_{d\mid n}f(d)=\sum_{d\le N}f(d)\left\lfloor\frac Nd\right\rfloor$ — swapping a divisor sum counts multiples instead of divisors

Swap when the inner sum is hard but its transpose is easy, and the classic sign of that is an inner limit depending on the outer index. Swapping $\sum_{n\le N}\sum_{d\mid n}$ turns "for each $n$, list its divisors" into "for each $d$, count its multiples", which replaces a factorisation problem with a floor function. Factor when the summand is a product of a function of $i$ and a function of $j$, since recognizing separability is what collapses a double sum into the product of two known series.

## On contests
Any AIME sum with two indices is worth reading twice: once as written, once transposed. Divisor sums, symmetric pair sums such as $\sum_{i\lt j}a_ia_j$, and lattice-point counts are the three places this pays off most often.`,

"triangular-numbers": String.raw`
## Why it works
Writing the sum forwards and backwards pairs its ends: $1$ with $n$, $2$ with $n - 1$, and so on, $n$ pairs each adding to $n + 1$, so twice the sum is $n(n + 1)$. Choosing two of $n + 1$ objects gives the same count, $\binom{n + 1}{2}$.

Two staircases, of heights $1$ to $n - 1$ and $1$ to $n$, interlock exactly into an $n \times n$ square, which is $T_{n-1} + T_n = n^2$.

{{figure:staircases}}

For the test, multiply $T = \frac{n(n + 1)}{2}$ by $8$ and add $1$: $$8T + 1 = 4n^2 + 4n + 1 = (2n + 1)^2.$$ So a triangular number always gives an odd square, and an odd square $(2n + 1)^2$ always comes from $T_n$.

## How to use it
Recognize the shape rather than the formula: any count of pairs, handshakes or unordered choices of two is triangular, as on [[handshakes-diagonals|the handshakes card]].

To test a number, check whether $8T + 1$ is an odd square and read off $n = \frac{\sqrt{8T + 1} - 1}{2}$. For $5050$, $8 \cdot 5050 + 1 = 40401 = 201^2$, so it is $T_{100}$; for $5051$, $40409$ falls strictly between $201^2$ and $202^2$, so it is not triangular.

A sequence whose second differences are constantly $1$ is $T_n$ plus a linear term, so fit that form rather than solving for three unknown coefficients.

## On contests
Four problems here, split between AMC and AIME, one solved by it alone; two combine it with [[modular-basics|modular arithmetic]]. Sums of the first $n$ integers turn up constantly inside larger arguments; the general sum is on [[arithmetic-series|the arithmetic series card]], and [[power-sums|the power sums]] carry squares and cubes.
`,

"multi-leg-rates": String.raw`
## Key forms
- $\alt{\sum_i d_i}{d_1 + \cdots + d_k} = D, \quad \alt{\sum_i \frac{d_i}{v_i}}{\frac{d_1}{v_1} + \cdots + \frac{d_k}{v_k}} = T$ — distances add and times add; speeds never do
- $\frac{x}{v_1} + \frac{D-x}{v_2} = T$ — one trip of length $D$ with a single unknown leg $x$
- $T_A = T_B$ — two travelers over one route, subtracted so the shared length cancels
- $v_1 t + v_2 t = D$ — a meeting, written as two distances closing a gap in a common time
- $\frac{2v_1v_2}{v_1+v_2}$ — out and back, the reason the average comes out harmonic

## Why it works
Rate times time equals distance holds on any stretch where the speed is constant, so a journey at changing speeds has to be cut where the speed changes.

Over leg $i$ the time spent is $\frac{d_i}{v_i}$. The legs follow one another without overlapping, so their times add to the total time, and their distances add to the total distance for the same reason.

Speeds do not add, and they do not even average in the obvious way: the speed over the whole trip is total distance over total time, which is [[average-speed|average speed]].

## How to use it
Name the legs first, before writing any equation, and give each one a distance and a speed even if one of them is the unknown. Two relations then come almost for free: the distances total $D$ and the times total $T$.

When two people cover the same route, write the total-time equation for each and subtract. Everything they have in common, usually the route length, drops out, which is faster than solving either equation alone.

Watch for a leg whose distance is stated as a fraction of the whole, since that turns the distance equation into an identity and leaves the time equation carrying all the information.

## On contests
Four problems here, all AIME, three solved by it alone: races with several stages, cyclists who stop for breaks, and travelers who take turns on one vehicle. The same shape covers walked then jogged, or rowed upstream and back. Sometimes one leg runs diagonally across a rectangle, and the [[pythagorean-theorem|Pythagorean theorem]] supplies its length.

Three neighbors are close enough to confuse: [[average-speed|average speed]] is only total distance over total time, [[work-rates|combined work rates]] is simultaneous effort where rates genuinely do add, and [[relative-motion|relative motion]] is about closing speeds.
`,




"determinant-basics": String.raw`## Why it works
The determinant is the one function of the rows that is linear in each row, flips sign when two rows swap, and gives $1$ on the identity. Those three demands pin it down completely, and every formula for it follows: $ad - bc$ for a $2 \times 2$, Sarrus for a $3 \times 3$, [[cofactor-expansion|cofactor expansion]] in general. Sign-flipping on a swap forces the value to vanish when two rows are equal, and linearity then extends that to any dependent set, which is why $\det = 0$ means exactly that one row is a combination of the others.

## How to use it
Reach for the properties before the formula. Row operations of the add-a-multiple kind cost nothing, so use them to manufacture zeros and then expand along the sparsest row. Remember $\det(AB) = \det A \cdot \det B$, which turns a product you cannot compute into two you can, and $\det(A^{\top}) = \det A$, which lets any row argument be run on columns instead. Sarrus's rule is a $3 \times 3$ accident and does not generalize; trying to extend the diagonal pattern to $4 \times 4$ is a standard and silent error.

## On contests
Determinants are not on the AMC or AIME syllabus, yet this library invokes one on eight cards, and a tridiagonal matrix whose determinant is asked for outright is a recurring AIME shape. There the determinant is never the difficulty, only the notation the difficulty arrives in, and the actual work is turning it into a recurrence. The other common sighting is quieter, since [[shoelace-formula|the shoelace formula]] and [[cross-product-area|the cross product]] are both determinants wearing other names.`,

"determinant-geometric": String.raw`## Why it works
Area is linear in each edge of a parallelogram and reverses sign when the two edges swap roles, which is the same short list of demands that defines the determinant, so the two must agree. Reading it that way makes the collinearity test obvious rather than memorized: three points span a triangle of zero area exactly when they lie on one line, and the determinant of the two edge vectors is twice that area. One dimension up, the $3 \times 3$ determinant is the signed volume of the parallelepiped, so it vanishes exactly when four points are coplanar.

## How to use it
Use the sign, not just the size. A positive value means $A$, $B$, $C$ run counterclockwise, which is how a convex-hull or orientation argument is actually carried out, and taking absolute values too early throws that away. For the collinearity of three points, expanding $\det = 0$ gives a linear relation in the coordinates and is usually cleaner than equating two slopes, since it never needs a vertical-line case. The area-scaling reading is the missing sentence on [[affine-transformations|affine transformations]], which says a linear map multiplies every area by one constant: that constant is $\lvert \det \rvert$.

## On contests
This is the card behind two things AIME asks constantly. [[shoelace-formula|Shoelace]] is this determinant summed around a polygon, and some problems turn on the parity or divisibility of $x_1y_2 - x_2y_1$ rather than on any area at all. The collinearity test is the quieter use, and it is worth reaching for whenever a problem says three points are collinear and you would otherwise write two slope equations.`,

"matrix-multiplication": String.raw`## Why it works
A matrix is a linear map written in coordinates, and the product is what you get by doing one map after the other: entry $(i,j)$ of $AB$ asks where basis vector $j$ goes under $B$ and then reads off coordinate $i$ after $A$. Composition of maps is associative, so matrix multiplication is, and it is not commutative for the same reason rotating then reflecting differs from reflecting then rotating. The sum over the intermediate index $k$ is the whole content of the definition.

## How to use it
The counting reading is the one worth having on sight. If $A$ is an adjacency matrix, $(A^n)_{ij}$ counts walks of length $n$ from $i$ to $j$, because the sum over $k$ is precisely "choose where the walk stood one step earlier". That is the engine inside [[transfer-matrix-method|the transfer matrix method]], and it converts a tiling or no-two-adjacent count into a matrix power. To evaluate that power, do not multiply $n$ times: either square repeatedly, or use [[eigenvalues-characteristic|the eigenvalues]] to get a closed form.

## On contests
Matrices themselves are essentially never asked for on the AMC or AIME. They appear as the machinery under a counting card, which is why the useful fact is not how to multiply two matrices but what a matrix power means. If a problem gives a small state machine and asks for long-run counts, the matrix is available, but so is the linear recurrence it produces, and [[linear-recurrence|solving the recurrence]] is usually the shorter road.`,

"cramers-rule": String.raw`## Why it works
Replace column $i$ of $A$ by $\mathbf{b} = \sum_j x_j (\text{column } j)$ and expand using linearity in that column. Every term except the $j = i$ one has a repeated column and so contributes zero, leaving $\det A_i = x_i \det A$. The rule is therefore not a separate theorem, just [[determinant-basics|column linearity]] applied once.

## How to use it
It earns its keep when a problem asks for one unknown out of three and you would otherwise eliminate the other two. Writing the single quotient is faster and far less error-prone than two rounds of substitution. It is also the cleanest statement of solvability: $\det A \ne 0$ gives exactly one solution, and $\det A = 0$ gives none or infinitely many, with the two cases separated by whether $\mathbf{b}$ respects the same dependence the rows do. For a system that is symmetric rather than generic, do not use this at all, since [[symmetric-linear-system|adding all the equations]] is a line of work instead of a page.

## On contests
Roughly eighteen problems in this library's database solve a system somewhere in the middle of a solution, and almost none of them need a general method, because contest systems are small and usually structured. Treat Cramer as the fallback when the structure genuinely is not there, and check for the symmetric shape first.`,

"eigenvalues-characteristic": String.raw`## Why it works
$A\mathbf{v} = \lambda\mathbf{v}$ with $\mathbf{v} \ne \mathbf{0}$ says $(A - \lambda I)$ kills a nonzero vector, so its rows are dependent and its determinant vanishes. Expanding $\det(A - \lambda I)$ gives a degree-$n$ polynomial in $\lambda$ whose roots are exactly the eigenvalues. [[vietas-general|Vieta's formulas]] on that polynomial then hand you the two identities worth memorizing, since the coefficient of $\lambda^{n-1}$ is the trace and the constant term is the determinant.

## How to use it
Use eigenvalues when you need $A^n$, not when you need $A$. If $A = PDP^{-1}$ with $D$ diagonal then $A^n = PD^nP^{-1}$, so each eigenvalue is simply raised to the $n$, and the entries of $A^n$ become a fixed combination of $\lambda_1^n, \ldots, \lambda_k^n$. That is the same shape as the closed form of [[linear-recurrence|a linear recurrence]], and it is not a coincidence: the characteristic polynomial of the transfer matrix is the characteristic equation of the recurrence.

## On contests
Olympiad-adjacent only, and it appears in this library as the machinery two cards already lean on. [[matrix-tree-theorem|The matrix-tree theorem]] states the spanning-tree count as a product of Laplacian eigenvalues, and [[transfer-matrix-method|the transfer matrix]] gets its recurrence from $\det(xI - M) = 0$. If you are reading either of those, this is the card that makes the sentence mean something.`,

"symmetric-linear-system": String.raw`
## Key forms
- $x_i + S = c_i$ for each $i$ — add all $n$ to get $(n+1)S = \alt{\sum c_i}{c_1 + \cdots + c_n}$, then $x_i = c_i - S$
- $2x_i - S = c_i$ for each $i$ — the same move with a different multiple: adding gives $(2 - n)S = \alt{\sum c_i}{c_1 + \cdots + c_n}$
- $x_{i+1} = f(x_i)$ cyclically — compose $f$ around the loop and solve $f^{(n)}(x_1) = x_1$
- the total is all that is asked — stop at $S$ and never find the individual variables

## Why it works
When the equations treat the variables alike, the total $S = \sum x_i$ is easier to find than any single variable.

With three equations, the three extra variables add up to one more copy of the total: $$(x_1 + S) + (x_2 + S) + (x_3 + S) = (x_1 + x_2 + x_3) + 3S = 4S.$$

In general, adding all $n$ equations of the form $x_i + S = c_i$ puts every variable into the left side $n + 1$ times: once in each of the $n$ copies of $S$, and once more as its own extra term. So the sum reads $$(n + 1)S = c_1 + c_2 + \cdots + c_n,$$ which gives $S$. Each original equation then says $x_i = c_i - S$. The symmetry has done the elimination for you.

A cyclic system is solvable for a different reason: it closes. Substituting forward writes every variable in terms of $x_1$, and after going around the loop the last equation is one equation in $x_1$ alone.

## How to use it
The trigger is a system you are reluctant to start, because every equation looks like the others with the indices rotated. Add them all before doing anything else and see what the left side becomes.

The equations need not have the form $x_i + S$ exactly. Anything that adds up to a multiple of the total works, such as $2x_i - S$ or $S - x_i$, and if only the total is asked for you can stop there. The variables can also be in disguise, as logarithms, reciprocals or squares that become linear after a substitution.

For a cyclic system, substitute around the loop instead. Both moves fail quickly when they fail, so trying the addition costs one line.

## On contests
Four problems here, three AIME and one AMC 10, none solved by it alone. The clean model is five equations, each the total plus one variable, with right sides forming a [[geometric-series|geometric series]], where adding everything gives the total at once.

The same move hides behind [[log-substitution|logarithms]], which become symmetric once each logarithm is named, and behind reciprocal squares, as when three distances in a box turn into a symmetric system in $\frac1{l^2}$, $\frac1{w^2}$ and $\frac1{h^2}$. A cyclic system, with each equation tying one unknown to the next, closes by substituting around the loop.`,

"cofactor-expansion": String.raw`## Why it works
[[determinant-basics|Linearity in a row]] lets you split that row into its individual entries, and each piece leaves a determinant with a single nonzero entry in that row. Moving that entry to the corner by $i + j - 2$ adjacent swaps produces the sign $(-1)^{i+j}$, and what remains is the minor $M_{ij}$ with row $i$ and column $j$ deleted. Every row and every column gives the same answer, which is what makes the choice of expansion line free.

## How to use it
Choose the row or column with the most zeros, since each zero deletes an entire minor unevaluated. If none has enough, manufacture them first: adding a multiple of one row to another leaves the determinant unchanged, so you can clear a row down to a single entry at no cost. For an indexed family of matrices the expansion is a derivation rather than an arithmetic step, since expanding $D_n$ along its first row leaves $D_{n-1}$ and, from the one off-diagonal term, $D_{n-2}$, converting the determinant into [[linear-recurrence|a linear recurrence]].

## Key forms
- one sparse row — expand there directly, ignoring every zero entry
- a dense matrix — clear a row with row operations first, then expand
- a banded family $D_n$ — expand along the first row to get $D_n = aD_{n-1} - bD_{n-2}$
- a block-triangular matrix — the determinant is the product of the diagonal blocks

## On contests
A tridiagonal matrix is the whole use case: constant entries $a$ down the diagonal and $b$, $c$ on the two off-diagonals, and a question about its determinant $D_n$. Expanding along the first row gives the recurrence $D_n = aD_{n-1} - bc\,D_{n-2}$, and from there it is a recurrence problem, often with [[geometric-series|a geometric series]] at the end, and the determinant never appears again. That is the pattern to expect: the expansion is the doorway out of matrix notation, not the substance of the problem.`,

});
