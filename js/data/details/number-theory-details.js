// Extended detail-page write-ups for Number Theory, keyed by formula id.
window.MATH_DETAILS = window.MATH_DETAILS || {};

Object.assign(window.MATH_DETAILS, {

"gcd-lcm-product": String.raw`
## Why it works
The gcd and the lcm are both built one prime at a time, and for each prime they share out the two exponents exactly.

Write $a$ and $b$ over the same primes, allowing an exponent of $0$: $a = \prod p^{e_p}$ and $b = \prod p^{f_p}$. A number divides both exactly when its exponent of each prime is at most $\min(e_p, f_p)$, so $\gcd(a, b) = \prod p^{\min(e_p, f_p)}$. A number is a multiple of both exactly when its exponent of each prime is at least $\max(e_p, f_p)$, so $\operatorname{lcm}(a, b) = \prod p^{\max(e_p, f_p)}$.

With two numbers, one exponent is the minimum and the other is the maximum, so $\min(e_p, f_p) + \max(e_p, f_p) = e_p + f_p$. Multiplying over all primes gives $$\gcd(a, b) \cdot \operatorname{lcm}(a, b) = \prod p^{e_p + f_p} = ab.$$

{{figure:exponents}}

With three numbers the count breaks: the minimum and maximum of three exponents leave out the middle one. For $2$, $4$ and $8$ the gcd is $2$ and the lcm is $8$, whose product is $16$, not $2 \cdot 4 \cdot 8 = 64$.

## How to use it
Given any three of $a$, $b$, the gcd and the lcm, the fourth follows: since $\gcd(8, 12) = 4$, $\operatorname{lcm}(8, 12) = \frac{8 \cdot 12}{4} = 24$.

To count pairs, pull the gcd out first. If $\gcd(a, b) = 6$ and $\operatorname{lcm}(a, b) = 210$, write $a = 6m$ and $b = 6n$ with $\gcd(m, n) = 1$. Then $$\operatorname{lcm}(a, b) = 6mn = 210, \qquad mn = 35.$$ Since $m$ and $n$ share no prime, each prime of $35$ goes entirely to one of them, which gives $2^2 = 4$ ordered pairs, $(m, n) = (1, 35), (5, 7), (7, 5), (35, 1)$. In general a number with $k$ distinct prime factors splits into $2^k$ ordered coprime pairs.

Harder conditions are handled the same way, one prime at a time, with the exponents of each prime treated as a separate small problem.

## On contests
Ten problems here, nine of them AIME, and two solved by it alone. The AIME form is a count of pairs or triples: conditions on gcds and lcms become conditions on exponents, handled prime by prime, often alongside [[exponent-tracking|tracking exponents]]. The identity itself is the AMC form. The common error is applying it to three numbers.
`,

"euclidean-algorithm": String.raw`
## Why it works
Replacing $a$ by $a - qb$ keeps exactly the same common divisors, so it keeps the gcd, while the numbers shrink until the answer can be read off.

If $d$ divides both $a$ and $b$, it divides $a - qb$ for any integer $q$. Conversely, if $d$ divides both $b$ and $a - qb$, it divides $(a - qb) + qb = a$. So the pairs $(a, b)$ and $(b, a - qb)$ have exactly the same common divisors, and in particular the same greatest one. Choosing $q$ so that $a - qb$ is the remainder $r$, with $0 \le r \lt b$, gives $$\gcd(a, b) = \gcd(b, r).$$

Each step replaces the pair with a smaller one, because the remainder is less than $b$, so the process must stop, and it stops when a remainder is $0$. The last pair is $(d, 0)$, and $\gcd(d, 0) = d$, so the last nonzero remainder is the gcd.

A rectangle shows the same steps. Cut as many $b \times b$ squares as possible off an $a \times b$ rectangle; what is left is a $b \times r$ strip, and cutting squares off that strip is the next step. The last square size fills its strip exactly, and every earlier piece is made of squares and strips that it fills too, so it measures both $a$ and $b$.

{{figure:tiling}}

## How to use it
For numbers, run the divisions: $$\gcd(252, 105) = \gcd(105, 42) = \gcd(42, 21) = \gcd(21, 0) = 21.$$

For expressions, the power is that any multiple of one may be subtracted from the other. For $\gcd(2n + 1, 5n + 2)$, subtract twice the first from the second to get $\gcd(2n + 1, n)$, then twice that from the first to get $\gcd(1, n) = 1$. So $\frac{2n + 1}{5n + 2}$ is always in lowest terms.

When the reduction ends at a constant instead, the gcd can only be a divisor of that constant. $\gcd(n + 3, n^2 + 7) = \gcd(n + 3, 16)$, because $n^2 + 7 = (n + 3)(n - 3) + 16$, so the two share a factor exactly when $n + 3$ is even, that is, when $n$ is odd.

Running the steps backwards writes the gcd as a combination. From $252 = 2 \cdot 105 + 42$ and $105 = 2 \cdot 42 + 21$, substitute upward: $$21 = 105 - 2 \cdot 42 = 105 - 2(252 - 2 \cdot 105) = 5 \cdot 105 - 2 \cdot 252.$$ That is [[bezouts-identity|Bézout's identity]] made concrete.

## On contests
Eleven problems here, nine of them AIME, and two solved by it alone. The recurring type asks for how many $n$ a fraction $\frac{f(n)}{g(n)}$ is not in lowest terms: run the algorithm on the expressions, find the constant it ends at, and count the $n$ that share a factor with it. It also appears next to [[modular-basics|modular arithmetic]], since $\gcd(a, m) = 1$ is exactly the condition for $a$ to have an inverse mod $m$.
`,

"bezouts-identity": String.raw`## Why it works
The set of integer combinations $ax + by$ is closed under subtraction, so it consists of all multiples of its least positive element — which must be $\gcd(a,b)$ (it divides both; both divide into it via the [[euclidean-algorithm|Euclidean algorithm]] run backwards).

## How to use it
Solvability test for $ax + by = c$: check $\gcd(a,b) \mid c$. One solution comes from back-substituting the Euclidean algorithm; all others differ by multiples of $\left(\frac{b}{g}, -\frac{a}{g}\right)$. Nonnegative-solution questions layer the Chicken McNugget bound on top.

## On contests
Word problems ("stamps of 5¢ and 8¢..."), constructing modular inverses (solve $ax \equiv 1$), and existence arguments. The "consecutive solutions differ by $\frac{b}{g}$" fact answers "smallest positive $x$" questions.`,

"divisibility-rules": String.raw`
## Why it works
A number is a sum of its digits times powers of $10$, so its remainder depends only on the remainders of those powers, and for small moduli those remainders are very simple.

The two most useful facts are $$10 \equiv 1 \pmod 9, \qquad 10 \equiv -1 \pmod{11}.$$ The first makes every power of $10$ equal to $1$ mod $9$, so a number and its digit sum leave the same remainder mod $9$, and therefore mod $3$. The second makes the powers of $10$ alternate between $1$ and $-1$ mod $11$, so a number leaves the same remainder mod $11$ as the alternating sum of its digits, taken from the right.

Since $100$ is divisible by $4$ and $1000$ by $8$, everything but the last two or three digits is a multiple of $4$ or $8$.

For example, $8712 = 8 \cdot 1000 + 7 \cdot 100 + 1 \cdot 10 + 2$. Its digit sum is $18$, a multiple of $9$, and its alternating sum from the right is $2 - 1 + 7 - 8 = 0$, a multiple of $11$, so $8712$ is divisible by both.

The rule for $11$ is the first of a family. Reading the digits in blocks of $k$ from the right writes the number in base $10^k$, and $$10^k \equiv -1 \pmod{10^k + 1},$$ so the blocks alternate in sign: two-digit blocks for $101$, three-digit blocks for $1001 = 7 \cdot 11 \cdot 13$, four-digit blocks for $10001 = 73 \cdot 137$.

{{figure:blocks}}

Plain block sums do the same for $10^k - 1$, where $10^k \equiv 1$: two-digit blocks give the remainder mod $99$, and three-digit blocks the remainder mod $999 = 27 \cdot 37$, which is the quick test for $37$. Every factor of the modulus inherits its rule, which is how $1001$ tests for $7$ and $13$.

## How to use it
For a composite modulus, [[crt|split it into coprime pieces]] and test each: divisible by $72$ means divisible by $8$, checked on the last three digits, and by $9$, checked on the digit sum. In a missing-digit puzzle each rule becomes a linear condition on the unknown digits, which usually leaves one or two possibilities.

The digit sum gives the remainder itself, which makes it a check on arithmetic, called casting out nines. Since $n \equiv s(n) \pmod 9$ for every $n$, a product must satisfy $s(ab) \equiv s(a)\,s(b) \pmod 9$, and a computed product that fails this is wrong.

Summing the digits again and again ends at a single digit, the digital root, $$1 + \big((n - 1) \bmod 9\big) \quad \text{for } n \ge 1,$$ so any question about repeated digit sums is a question about $n \bmod 9$. How the digit sum drops when numbers are added is counted by [[digit-sum-carries|carries]].

The $1001$ factorization explains a classic: a six-digit number of the form $\overline{abcabc}$ equals $\overline{abc} \cdot 1001$, so it is always divisible by $7$, $11$ and $13$.

## On contests
Seven problems here, six of them AIME, four solved by it alone; two others split into [[casework-method|cases]] on the possible digits, and one counts multiples in a range. MATHCOUNTS and AMC 10 use the rules for missing-digit puzzles, AIME for conditions on numbers built from digit patterns, and the remainder mod $9$ can cut a search down to one candidate in nine.
`,

"gcd-power-minus-one": String.raw`## Why it works
The [[euclidean-algorithm|Euclidean algorithm]] lifts to exponents: $\gcd(a^m - 1, a^n - 1) = \gcd(a^{m - n} - 1 \cdot a^n\ldots)$ — concretely, $a^m - 1 \bmod (a^n - 1) = a^{m \bmod n} - 1$, so the exponent undergoes the Euclidean algorithm.

## How to use it
Immediate answers to gcds of repunits and Mersenne-type numbers: $\gcd(2^{100} - 1, 2^{36} - 1) = 2^{\gcd(100,36)} - 1 = 2^4 - 1 = 15$. Also the divisibility criterion $a^m - 1 \mid a^n - 1 \iff m \mid n$.

## On contests
AIME gcd problems with huge exponents are this identity verbatim. Repunit versions (all-1s numbers in base 10) follow with $a = 10$: $\gcd(R_m, R_n) = R_{\gcd(m,n)}$.`,

"consecutive-coprime": String.raw`## Why it works
Any common divisor of $n$ and $n+1$ divides their difference, 1. More generally a common divisor of $n$ and $n + k$ divides $k$.

## How to use it
Coprimality for free: factors of consecutive integers never interact, so $n(n+1)$ being a perfect square forces both factors to be squares (impossible for $n \ge 1$), and similar "spread the primes" arguments. The $k!$ divisibility of $k$ consecutive integers' product is binomial-coefficient integrality.

## On contests
Underpins many "product of consecutive integers is never a power" and simplification arguments; the $\gcd(n, n+k) \mid k$ form limits [[casework-method|casework]] in fraction-reduction problems.`,

"number-of-divisors": String.raw`
## Why it works
A divisor is built by choosing, separately for each prime, how many copies of it to use, and the numbers of choices multiply.

Take $360 = 2^3 \cdot 3^2 \cdot 5$. A divisor of $360$ can use only the primes $2$, $3$ and $5$, and it cannot use more copies of any prime than $360$ has, so it is $$2^a3^b5^c \quad \text{with} \quad 0 \le a \le 3, \ \ 0 \le b \le 2, \ \ 0 \le c \le 1.$$ Every such choice does divide $360$, and different choices give different numbers. So the divisors of $360$ match up exactly with the choices of $(a, b, c)$, and there are $4 \cdot 3 \cdot 2 = 24$ of them.

Each prime offers one more choice than its exponent because leaving the prime out, exponent $0$, is a choice too. That is where every $+1$ comes from.

The perfect-square fact is the same picture read differently. The count $$(e_1 + 1)(e_2 + 1)\cdots(e_k + 1)$$ is odd only if every factor is odd, which means every exponent $e_i$ is even, which is exactly what it means for $n$ to be a perfect square. Pairing gives a second view: divisors come in pairs $m$ and $\frac{n}{m}$, and the only divisor that is its own partner is $\sqrt{n}$.

## Full proof
Let $n = p_1^{e_1}\cdots p_k^{e_k}$ with the $p_i$ distinct primes. If $m$ divides $n$, every prime dividing $m$ also divides $n$, so $m = p_1^{f_1}\cdots p_k^{f_k}$ for some $f_i \ge 0$. Since $n = m \cdot \frac{n}{m}$ and prime factorization is unique, the exponent of $p_i$ in $n$ is $f_i$ plus the exponent of $p_i$ in $\frac{n}{m}$, so $f_i \le e_i$.

Conversely, if $0 \le f_i \le e_i$ for every $i$, then $\frac{n}{m} = p_1^{e_1 - f_1}\cdots p_k^{e_k - f_k}$ is a whole number, so $m$ divides $n$.

So the rule $(f_1, \ldots, f_k) \mapsto p_1^{f_1}\cdots p_k^{f_k}$ reaches every divisor, and it never sends two different exponent lists to the same number, because factorizations are unique. The divisors are therefore counted by the exponent lists. The $i$th exponent takes one of the $e_i + 1$ values $0, 1, \ldots, e_i$, independently of the others, so by the multiplication principle there are $(e_1 + 1)\cdots(e_k + 1)$ lists.

## How to use it
The skill contests test is running the formula backwards. To find the numbers with exactly $12$ divisors, write $12$ as a product of factors that are each at least $2$: $12$, $6 \cdot 2$, $4 \cdot 3$ and $3 \cdot 2 \cdot 2$. Each product is a list of values of $e_i + 1$, so the numbers with $12$ divisors are exactly those of the forms $p^{11}$, $p^5q$, $p^3q^2$ and $p^2qr$, with $p$, $q$ and $r$ distinct primes.

The formula turns a question about a number into a question about its exponents, which is the whole reason it matters. "How many divisors" needs no divisors listed, and "the smallest number with exactly $k$ divisors" becomes a search over the exponent patterns for $k$, giving the largest exponents to the smallest primes. For $k = 12$ the candidates are $2^{11}$, $2^5 \cdot 3$, $2^3 \cdot 3^2$ and $2^2 \cdot 3 \cdot 5$, and the smallest is $60$.

## On contests
Among the most-tested number-theory facts at every level, and self-contained in 4 of its 32 problems. Its partners are [[modular-basics|modular arithmetic]] and [[casework-method|casework]] (3 each), the usual shape being a divisibility condition that cuts the exponent patterns before the count is taken.

Three shapes recur: smallest number with exactly $k$ divisors, the locker-door problem and its relatives (the answer is always the squares, by the odd-divisor fact above), and divisor-counting a factorial, which needs [[legendres-formula|Legendre's formula]] first to get the exponents.
`,

"sum-of-divisors": String.raw`## Why it works
Expand the product $\prod_i(1 + p_i + \cdots + p_i^{e_i})$: choosing one term from each factor generates every divisor exactly once. Each factor is a [[geometric-series|geometric series]].

## How to use it
Compute prime-power by prime-power. For "sum of even divisors" or "sum of divisors divisible by 3": factor out the forced part ($2 \cdot \sigma(\text{odd part})$-style manipulations). Sum of reciprocals of divisors: $\frac{\sigma(n)}{n}$ — a neat quotient worth knowing.

## On contests
AIME asks for $\sigma$ of specific large factorizations and for sums over restricted divisor classes — always reduce to modified geometric-series products.`,

"product-of-divisors": String.raw`
## Why it works
Pair each divisor with its partner and multiply the pairs.

The map $d \mapsto \frac nd$ sends divisors to divisors and undoes itself, so the divisors listed in the order $\frac nd$ are the same divisors again. Multiplying the two lists term by term, $$\left(\prod_{d \mid n} d\right)^2 = \prod_{d \mid n} d \cdot \frac nd = n^{d(n)},$$ so the product is $n^{d(n)/2}$. Squaring first avoids any special case: for a perfect square, $\sqrt n$ is paired with itself, and the formula still holds.

## How to use it
Count the divisors with [[number-of-divisors|the divisor-count formula]], then halve that for the exponent. For $42 = 2 \cdot 3 \cdot 7$ there are $8$ divisors, so their product is $42^4$.

Problems usually run it backwards. The product of the proper divisors, all but $n$ itself, is $n^{d(n)/2 - 1}$, so for $n \gt 1$ $$n^{d(n)/2 - 1} = n \iff d(n) = 4,$$ which means $n = pq$ or $n = p^3$. Logarithms turn the product into a sum: the logarithms of all the divisors add up to $\frac{d(n)}{2}\log n$.

## On contests
Three problems here, two AIME and one AMC 10, none solved by it alone. Typical questions add the logarithms of all the divisors, which is the logarithm of their product, run the formula backwards to $d(n) = 4$ from a condition on the proper divisors, or ask only for a digit of the product.`,

"eulers-totient": String.raw`
## Why it works
Removing the multiples of each prime factor of $n$ leaves exactly the numbers coprime to $n$, and for different primes the removals are independent.

For a prime power it is a direct count. Among $1, 2, \ldots, p^k$, the numbers that share a factor with $p^k$ are the multiples of $p$, and there are $p^{k-1}$ of them, so $$\varphi(p^k) = p^k - p^{k-1} = p^k\left(1 - \frac1p\right).$$

For other $n$, the [[crt|Chinese remainder theorem]] matches each residue mod $mn$ with a pair of residues mod $m$ and mod $n$, and a number is coprime to $mn$ exactly when it is coprime to both. So for coprime $m$ and $n$, $\varphi(mn) = \varphi(m)\varphi(n)$, and multiplying the prime-power values gives $$\varphi(n) = n\prod_{p \mid n}\left(1 - \frac1p\right).$$ The same product comes out of [[pie|inclusion-exclusion]] on the multiples of each prime.

## How to use it
Factor $n$, then multiply $n$ by $1 - \frac1p$ for each distinct prime; the exponents matter only through $n$ itself. For $1000 = 2^3 \cdot 5^3$, $$\varphi(1000) = 1000 \cdot \frac12 \cdot \frac45 = 400.$$

Two facts make good checks: $\varphi(n)$ is even for $n \gt 2$, because $k$ and $n - k$ are coprime to $n$ together, and $\sum_{d \mid n}\varphi(d) = n$.

Inverse questions, such as for which $n$ is $\varphi(n) = 12$, are bounded [[casework-method|casework]]: every prime $p$ dividing $n$ has $p - 1$ dividing $\varphi(n)$, which leaves only a few primes to try.

## On contests
Three problems here, all AIME, one solved by it alone. Typical questions count the fractions in lowest terms whose numerator and denominator add to a given $n$, which is $\frac{\varphi(n)}{2}$, count star polygons by the step sizes coprime to the number of points, or add up the [[coprime-residue-sum|coprime residues]] below a bound.`,

"totient-divisor-sum": String.raw`## Why it works
Classify $k \in \{1..n\}$ by $g = \gcd(k, n)$: the $k$ with $\gcd(k,n) = g$ correspond bijectively to reduced residues mod $\frac{n}{g}$, so there are $\varphi(\frac{n}{g})$ of them. Summing the class sizes over all divisors gives $n$.

## How to use it
The classification idea (group by gcd) is itself the tool: sums like $\sum_{k=1}^{n} \gcd(k, n)$ evaluate as $\sum_{d\mid n} d\,\varphi(\frac{n}{d})$. Also the standard lemma when counting fractions with bounded denominators (Farey counts).

## On contests
AIME gcd-sum problems are exactly this regrouping. Knowing the identity signals the decomposition even when the final formula isn't quoted.`,

"mobius-inversion": String.raw`## Why it works
The key lemma: $\sum_{d \mid n}\mu(d)$ is 1 for $n = 1$ and 0 otherwise (choose a prime and pair subsets with/without it — signs cancel). Inversion is then a double-sum swap.

## How to use it
Contest-level use is almost always the lemma in inclusion-exclusion clothing: count objects with gcd exactly 1 by counting multiples ("gcd divisible by $d$") and combining with $\mu(d)$ signs — squarefree counts, coprime pair counts, primitive (aperiodic) strings and necklaces.

## On contests
"How many of $1..10^6$ are squarefree," "count coprime pairs," "aperiodic binary strings of length 12" — all $\mu$-weighted sums over divisors. Recognize inclusion-exclusion over primes and reach for $\mu$ notation to organize it.`,

"multiplicative-functions": String.raw`## Why it works
[[crt|CRT]]: for coprime $m, n$, residues mod $mn$ pair with residue pairs mod $m$ and $n$, and the relevant structures (divisors, coprime residues) factor along the pairing.

## How to use it
License to compute prime-power by prime-power: evaluate $f(p^e)$ for each prime power in the factorization, multiply. Also a proof pattern: to verify an identity between multiplicative functions, check it on prime powers only.

## On contests
The silent workhorse — most divisor/totient computations implicitly use it. Stated problems test the warning: multiplicativity needs coprimality ($\varphi(4) \ne \varphi(2)\varphi(2)$).`,

"coprime-residue-sum": String.raw`## Why it works
If $\gcd(k, n) = 1$ then $\gcd(n - k, n) = 1$: totatives pair off summing to $n$ each, and there are $\frac{\varphi(n)}{2}$ pairs for $n > 2$ (no self-pairing since $\gcd(\frac{n}{2}, n) > 1$).

## How to use it
Instant evaluation of totative sums, and the pairing idea generalizes: sums of any symmetric function over totatives can exploit $k \leftrightarrow n - k$. Average totative is $\frac{n}{2}$ — occasionally the slicker phrasing.

## On contests
Appears inside AIME fraction-sum problems (sum of all reduced $\frac{k}{n}$ equals $\frac{\varphi(n)}{2}$) and as a lemma in bigger counting arguments.`,

"perfect-square-divisors": String.raw`
## Why it works
A divisor of $n$ is $\prod p_i^{f_i}$ with $0 \le f_i \le e_i$, and it is a perfect square exactly when every $f_i$ is even, since its square root is then $\prod p_i^{f_i/2}$.

The even numbers from $0$ to $e_i$ are $0, 2, \ldots, 2\left\lfloor \frac{e_i}{2} \right\rfloor$, which is $\left\lfloor \frac{e_i}{2} \right\rfloor + 1$ choices, and the choices for different primes are independent, so $$\#\{\text{square divisors}\} = \prod_i \left(\left\lfloor \frac{e_i}{2} \right\rfloor + 1\right).$$

## How to use it
Factor first; for a factorial, [[legendres-formula|Legendre's formula]] gives the exponents. For $12! = 2^{10} \cdot 3^5 \cdot 5^2 \cdot 7 \cdot 11$, $$6 \cdot 3 \cdot 2 \cdot 1 \cdot 1 = 36$$ divisors are perfect squares. The divisors that are not squares follow by [[complementary-counting|complementary counting]], $d(n)$ minus this.

A related question asks what to multiply by to make a square. Every prime at an odd power must be fixed, so the smallest multiplier is the product of those primes: for $12!$ it is $3 \cdot 7 \cdot 11 = 231$.

## On contests
Three problems here, two AIME and one AMC 10, one solved by it alone. Typical questions clear the odd exponents to make a quotient or a product a perfect square, count the $m$ with $m^2$ dividing a given number, or track which primes of a product of factorials sit at odd powers.`,

"lcm-pair-counting": String.raw`## Why it works
Fix a prime $p$ with target exponent $e$: the pair's exponents $(x, y)$ must satisfy $\max(x,y) = e$, giving $2e + 1$ ordered choices ($x = e$ with $y$ free, or symmetric, minus the double count). Primes act independently.

## How to use it
The general method outranks the formula: translate every gcd/lcm condition into per-prime min/max conditions on exponent tuples, count tuples per prime, multiply. Systems (three variables, three pairwise lcms) become small combinatorial counts per prime. It is the counting form of [[gcd-lcm-product|gcd–lcm product]]: the identity $\min + \max = e + f$ is what lets each prime be handled independently.

## On contests
The AIME classic "how many ordered triples have $[x,y] = 1000$, $[y,z] = 2000$, $[z,x] = 2000$" is solved exactly this way (answer 70). Any lcm-constrained counting should trigger the per-prime reflex.`,

"fermats-little-theorem": String.raw`
## Why it works
Multiplying by $a$ just reorders the nonzero remainders mod $p$, and comparing the product of the remainders before and after gives the theorem.

The numbers $a, 2a, \ldots, (p - 1)a$ are all nonzero mod $p$, because the prime $p$ divides neither factor, and they are all different, because $ia \equiv ja$ would mean $p \mid (i - j)a$ and so $p \mid i - j$, which forces $i = j$. So they are $1, 2, \ldots, p - 1$ in some order.

{{figure:shuffle}}

Multiplying each list together, $a^{p-1}(p - 1)! \equiv (p - 1)! \pmod p$. The factorial is not divisible by $p$, so it can be cancelled, which leaves $a^{p-1} \equiv 1$. Multiplying by $a$ gives $a^p \equiv a$, and that form also holds when $p \mid a$, since then both sides are $0$. Another proof inducts on $a$ using the [[freshmans-dream|freshman's dream]] $(x + 1)^p \equiv x^p + 1$.

## How to use it
Reduce the exponent mod $p - 1$ when the base is coprime to $p$: for $2^{100} \bmod 7$, $100 \equiv 4 \pmod 6$, so the answer is $2^4 = 16 \equiv 2$. The true period can be shorter than $p - 1$, and here $2^3 \equiv 1$ already; that period, the [[multiplicative-order|multiplicative order]], always divides $p - 1$.

For towers, reduce level by level: the top exponent matters mod $p - 1$, so the exponent above it matters mod $\varphi(p - 1)$ by [[eulers-theorem|Euler's theorem]], and so on down. For a composite modulus, split it into prime powers, work in each, and recombine with [[crt|the Chinese remainder theorem]]; for mod $1000$, work mod $8$ and mod $125$.

## On contests
Seven problems here, all AIME, none by it alone; three continue into the [[multiplicative-order|multiplicative order]], the exact period that divides $p - 1$, and two combine it with the [[binomial-theorem|binomial theorem]] to expand a power before reducing it. Watch the hypothesis $p \nmid a$, and use $a^p \equiv a$ when unsure.
`,

"eulers-theorem": String.raw`
## Why it works
Multiplying by $a$ shuffles the residues that are coprime to $n$, and comparing their product before and after the shuffle gives the theorem.

Let $r_1, \ldots, r_k$ be the $k = \varphi(n)$ residues coprime to $n$. The numbers $ar_1, \ldots, ar_k$ are also coprime to $n$, and they are all different mod $n$, since $ar_i \equiv ar_j$ would let us cancel the invertible $a$. So they are the same residues in a new order, and $$a^k\,r_1 \cdots r_k \equiv r_1 \cdots r_k \pmod n.$$ The product $r_1 \cdots r_k$ is coprime to $n$, so it cancels, leaving $a^{\varphi(n)} \equiv 1$. For a prime $n$ this is exactly [[fermats-little-theorem|Fermat's argument]].

## How to use it
Reduce the exponent modulo $\varphi(n)$, but only when $\gcd(a, n) = 1$. For the last two digits of $3^{100}$, $\varphi(100) = 40$, so $3^{100} \equiv 3^{20}$, and $$3^{20} = (3^{10})^2 \equiv 49^2 = 2401 \equiv 1 \pmod{100}.$$

When $a$ shares a factor with $n$, as for the last digits of $4^{100}$, split the modulus with [[crt|the Chinese remainder theorem]] into a part sharing factors with $a$, where the powers quickly become $0$, and a coprime part, where Euler applies. For the last three digits, working mod $8$ and mod $125$, with $\varphi(125) = 100$, is usually cleaner than mod $1000$ directly.

## On contests
Four problems here, split between AMC and AIME, none by it alone; two combine it with [[crt|the Chinese remainder theorem]], its standard partner for last-digit questions. A tower of exponents reduces down a chain of $\varphi$ values, $1000 \to 400 \to 160 \to \cdots$, one level at a time.
`,

"wilsons-theorem": String.raw`## Why it works
In the product $(p-1)!$, every residue pairs with its inverse and cancels to 1 — except the self-inverse ones, $1$ and $p - 1$, whose product is $-1$. Compositeness converse: a shared factor makes $(n-1)! \equiv 0$ (for $n > 4$).

## How to use it
Factorial congruences mod primes: shift with $(p-2)! \equiv 1$, $(p-3)! \equiv \frac{p-1}{2}\cdot$(adjust), and split $(p-1)!$ into halves to get $\left(\frac{p-1}{2}\right)!^2 \equiv (-1)^{\frac{p+1}{2}}$ — the source of square roots of $-1$ mod $p \equiv 1 \pmod 4$.

## On contests
AIME factorial-remainder problems and slick primality observations. The half-factorial corollary explicitly constructs $x$ with $x^2 \equiv -1$, which some problems require.`,

"crt": String.raw`
## Why it works
Coprime moduli measure independent things, so knowing the remainders modulo each of them pins down the remainder modulo their product, and every combination of remainders actually happens.

Take the moduli $3$ and $5$. Each of the numbers $0$ to $14$ leaves a pair of remainders, one modulo $3$ and one modulo $5$. Two different numbers in that range cannot leave the same pair: if they did, their difference would be divisible by both $3$ and $5$, $$3 \mid a - b \ \text{ and } \ 5 \mid a - b \quad \Longrightarrow \quad 15 \mid a - b,$$ which is impossible for two different numbers less than $15$ apart.

So the $15$ numbers give $15$ different pairs, and since there are exactly $3 \cdot 5 = 15$ possible pairs, every pair occurs exactly once. That is the theorem for $3$ and $5$: each system has exactly one solution modulo $15$.

The same count works for any pairwise coprime moduli, because a number divisible by each of them is divisible by their product. Coprimality is exactly what that step needs. Modulo $4$ and $6$ the numbers $0$ and $12$ leave the same remainders, and the system $$x \equiv 1 \pmod 4, \qquad x \equiv 2 \pmod 6$$ has no solution at all, since the first makes $x$ odd and the second makes it even.

## Full proof
Let $N = n_1n_2\cdots n_k$ with the $n_i$ pairwise coprime.

Uniqueness. If $x$ and $y$ both solve the system, then every $n_i$ divides $x - y$. Since the $n_i$ are pairwise coprime, their least common multiple is their product $N$, so $N$ divides $x - y$ and $x \equiv y \pmod N$.

Existence, by construction. Let $N_i = \frac{N}{n_i}$, which is coprime to $n_i$, so it has an inverse $M_i$ modulo $n_i$. Then $x = \sum_i a_iN_iM_i$ solves the system: modulo $n_i$, every term except the $i$th contains the factor $n_i$ and vanishes, while the $i$th term is $a_i \cdot N_iM_i \equiv a_i \cdot 1 = a_i$.

## How to use it
Splitting is the everyday use: a question modulo $1000$ becomes one modulo $8$ and one modulo $125$, answered separately and recombined. Counts multiply too: for coprime $m$ and $n$, the number of solutions of a congruence modulo $mn$ is the number modulo $m$ times the number modulo $n$.

To recombine, it is usually fastest to work two congruences at a time: from $x \equiv a \pmod m$ write $x = a + mt$, substitute into the next congruence, and solve for $t$.

For $x \equiv 2 \pmod 3$ and $x \equiv 3 \pmod 5$, $x = 2 + 3t$ needs $3t \equiv 1 \pmod 5$, so $t \equiv 2$ and $x \equiv 8 \pmod{15}$; adding $x \equiv 2 \pmod 7$ then gives $x \equiv 23 \pmod{105}$.

The closed form from the full proof, $x = \sum_i a_iN_iM_i$, does it in one step when there are many moduli.

## On contests
The standard move for "find the remainder modulo a composite", and the reason prime-power analysis is the default first step in olympiad number theory. Of the 17 problems tagged here, 16 are AIME and 3 need nothing else; its partners are [[modular-basics|the congruence rules]] (3) and [[eulers-theorem|Euler's theorem]] (2), which do the work inside each prime-power piece before the theorem recombines them. Splitting modulo $1000$ into $8$ and $125$ is the most common instance.
`,

"multiplicative-order": String.raw`
## Why it works
The powers of $a$ modulo $n$ repeat with period exactly the order $d$, so $a^m \equiv 1$ happens exactly when $m$ is a multiple of $d$.

Write $m = qd + r$ with $0 \le r \lt d$. Then $a^m = (a^d)^qa^r \equiv a^r$, and since $d$ is the smallest positive exponent giving $1$, $a^r \equiv 1$ only when $r = 0$. So $a^m \equiv 1$ exactly when $d \mid m$. By [[eulers-theorem|Euler's theorem]] $a^{\varphi(n)} \equiv 1$, so $d$ divides $\varphi(n)$.

There is also a picture of why the order divides $\varphi(n)$: multiplying by $a$ splits the $\varphi(n)$ residues coprime to $n$ into cycles, and every cycle has the same length $d$.

{{figure:cycles}}

## How to use it
To find an order, test only the divisors of $\varphi(n)$, from small to large. For $2$ modulo $7$, $\varphi(7) = 6$, and $2^1 = 2$, $2^2 = 4$, $2^3 = 8 \equiv 1$, so the order is $3$.

Exponents can then be reduced modulo the order: $a^i \equiv a^j$ exactly when $i \equiv j \pmod d$. Questions like "the smallest $k$ with $n \mid a^k - 1$" and "the period of $\frac1n$" are order computations. For orders modulo prime powers, such as that of $2$ modulo $3^m$, the [[lte|lifting the exponent lemma]] takes over.

## On contests
Five problems here, all AIME, none by it alone; three pair it with [[fermats-little-theorem|Fermat's little theorem]], which supplies an exponent the order must divide. AIME favors fractions $\frac1n$ with a prescribed period and divisibility chains like $2^k \equiv 1 \pmod{3^m}$.
`,

"modular-inverse": String.raw`## Why it works
[[bezouts-identity|Bézout]]: $\gcd(a, n) = 1$ gives $ax + ny = 1$, i.e. $ax \equiv 1$. Uniqueness mod $n$ follows from cancellation.

## How to use it
Small moduli: hunt by inspection or add the modulus to the numerator until divisible. Larger: extended Euclid, or Euler's $a^{\varphi(n)-1}$. Every "division" in modular arithmetic is multiplication by an inverse — needed for [[crt|CRT]] recombination, solving linear congruences, and evaluating fractions like $\frac{1}{2} \pmod p$ (which means $\frac{p+1}{2}$).

## On contests
Ubiquitous supporting skill: binomial coefficients mod $p$, linear congruence solving, and AIME answers defined as $m n^{-1}$ mod a prime. Fast small-case fluency matters more than the theory.`,


"squares-mod-small": String.raw`## Why it works
Square all residues: mod 4 the squares of $0,1,2,3$ are $0,1,0,1$; mod 8 odd squares are $(2k+1)^2 = 4k(k+1) + 1 \equiv 1$ (since $k(k+1)$ is even); mod 9 and 16 by the same enumeration.

## How to use it
First move on any "show no solutions" Diophantine: reduce mod 4, 8, 9, or 16 and compare residue menus. Sums of squares: $a^2 + b^2 \not\equiv 3 \pmod 4$; three odd squares can't sum to $\equiv 6 \pmod 8$; etc. Also fixes parities: $x^2 \equiv 1 \pmod 8$ for odd $x$ is remarkably often the key.

## On contests
AMC/AIME impossibility questions and digit puzzles ("can $\overline{abc}$ be a perfect square if..."). Squares end in $\{0,1,4,5,6,9\}$ and mod-4 analysis kills most wrong candidates fast.`,

"eulers-criterion": String.raw`## Why it works
The multiplicative group mod $p$ is cyclic of order $p-1$: writing $a = g^k$, $a^{\frac{p-1}{2}} = g^{k\frac{p-1}{2}} = (\pm1)$ according to the parity of $k$ — even $k$ means square.

## How to use it
Decides quadratic residuosity by one modular exponentiation. The headline corollary: $-1$ is a QR mod $p$ iff $p \equiv 1 \pmod 4$ — equivalently, $p \mid x^2 + 1$ has solutions only for such $p$ (and 2). Similar criteria: $2$ is a QR iff $p \equiv \pm1 \pmod 8$. It is the computational test behind [[squares-mod-small|quadratic residues]], and [[gauss-lemma-qr|Gauss's lemma]] is the counting proof of the same fact.

## On contests
Divisibility problems about $x^2 + 1$ (its odd prime factors are all $\equiv 1 \bmod 4$ — a strong structural fact), and residue-existence questions on AIME. Full reciprocity is rarely needed; these special cases usually suffice.`,

"last-digit-patterns": String.raw`## Why it works
Units digits multiply independently of the rest of the number, and each digit's powers cycle: 2, 3, 7, 8 with period 4; 4, 9 with period 2; 0, 1, 5, 6 fixed. Period 4 divides all of them.

## How to use it
Reduce the exponent mod 4 (careful: exponent $\equiv 0$ means use the 4th power's digit, not the 0th). For last TWO digits, switch to mod 100 machinery (Euler/[[crt|CRT]]). Squares end only in 0,1,4,5,6,9; that filter plus cycles answers most units-digit questions.

## On contests
MATHCOUNTS/AMC 10 staple ("units digit of $7^{2027}$"), and the entry point to the harder mod-100/mod-1000 AIME versions.`,

"primitive-roots": String.raw`## Why it works
The units mod $n$ form a cyclic group exactly for $n=1,2,4,p^k,2p^k$ (odd prime $p$) — the structure theorem. A primitive root $g$ is a generator: its powers $g^0,\dots,g^{\varphi(n)-1}$ run through all units, the number of primitive roots is $\varphi(\varphi(n))$, and the order of any element divides $\varphi(n)$ with a primitive root hitting the maximum.

## How to use it
Convert multiplicative questions to additive ones — counting $k$-th powers, solving $x^k\equiv a$, products or sums over all residues. Worked case mod $7$ with $g=3$ (powers $3,2,6,4,5,1$): the cubes have $\gcd(3,6)=3$, so there are $\frac{6}{3}=2$ cubic residues, namely $g^0=1$ and $g^3=6$.

Fixing $g$ turns multiplication into addition of exponents (the "index," a discrete log): $a=g^{\operatorname{ind}a}$, so $xy$ maps to $\operatorname{ind}x+\operatorname{ind}y\pmod{\varphi(n)}$. For $k$-th powers modulo a prime $p$, with $d=\gcd(k,p-1)$:

- Number of primitive roots: $\varphi(\varphi(n))$
- Number of $k$-th power residues: $\frac{p-1}{d}$
- $x^k\equiv a\pmod p$ is solvable iff $a^{(p-1)/d}\equiv1\pmod p$
- When solvable, it has exactly $d$ solutions

## On contests
AIME problems counting solutions of $x^k\equiv1$, asking for products over all residues, or exploiting that orders divide $p-1$ lean on this cyclic structure — usually implicitly.`,

"quadratic-reciprocity": String.raw`## Why it works
Deep — Gauss gave eight proofs, the classic elementary one counting lattice points in a rectangle. Take it as a tool: for distinct odd primes, $\left(\frac{p}{q}\right)$ and $\left(\frac{q}{p}\right)$ are equal unless both are $\equiv 3\pmod 4$, in which case they differ by a sign.

## How to use it
Evaluate a Legendre symbol like a gcd: factor the top, pull out $-1$ and $2$ with the supplements, flip the odd-prime factors (sign per reciprocity), reduce mod the bottom, repeat. Worked: $\left(\frac{30}{53}\right)=\left(\frac{2}{53}\right)\left(\frac{3}{53}\right)\left(\frac{5}{53}\right)$. Since $53\equiv5\bmod8$, $\left(\frac{2}{53}\right)=-1$; and $53\equiv1\bmod4$ so flips carry no sign: $\left(\frac{3}{53}\right)=\left(\frac{53}{3}\right)=\left(\frac{2}{3}\right)=-1$ and $\left(\frac{5}{53}\right)=\left(\frac{53}{5}\right)=\left(\frac{3}{5}\right)=-1$. Product $-1$: $30$ is a non-residue mod $53$.

## On contests
Rare on AIME (the supplements cover most needs) but decisive when a problem asks which primes divide values of a quadratic, or whether $x^2\equiv a$ is solvable. Knowing the two supplements cold is the practical takeaway.`,

"crt-solution-counting": String.raw`## Why it works
[[crt|CRT]]'s bijection respects polynomial equations: $f(x) \equiv 0 \pmod{mn}$ (coprime $m, n$) holds iff it holds mod $m$ and mod $n$ separately, and solutions pair off. So solution counts multiply.

## How to use it
Count solutions of a congruence mod each prime power in the modulus, multiply. E.g. $x^2 \equiv 1 \pmod{105}$: two solutions mod each of 3, 5, 7 → $2^3 = 8$ total. Explains why $x^2 \equiv 1$ can have many roots mod composites — non-fields allow it.

## On contests
"How many $x$ mod $n$ satisfy $x^2 \equiv x$" (idempotents: $2^{\#\text{prime factors}}$) and similar counts appear on AIME; the multiply-across-prime-powers reflex is the whole technique.`,

"legendres-formula": String.raw`
## Why it works
Each multiple of $p$ up to $n$ contributes one factor of $p$, each multiple of $p^2$ contributes one more, and so on, and the sum counts them level by level.

The exponent of $p$ in $n!$ is the total of the exponents of $p$ in $1, 2, \ldots, n$. Picture each $k$ with a stack of dots, one for each factor of $p$ in $k$, and count the dots by rows instead of by columns.

The first row has a dot over every multiple of $p$, and there are $\left\lfloor\frac np\right\rfloor$ of them; the second row has a dot over every multiple of $p^2$, and there are $\left\lfloor\frac n{p^2}\right\rfloor$; and so on. Every factor of $p$ is counted exactly once.

{{figure:dots}}

The digit-sum form comes from writing $n$ in base $p$. Each floor $\left\lfloor \frac n{p^i}\right\rfloor$ is $n$ with its last $i$ base-$p$ digits removed, and adding these up digit by digit gives $\frac{n - s_p(n)}{p - 1}$.

## How to use it
For the largest power of $3$ dividing $100!$: $$\left\lfloor \tfrac{100}{3} \right\rfloor + \left\lfloor \tfrac{100}{9} \right\rfloor + \left\lfloor \tfrac{100}{27} \right\rfloor + \left\lfloor \tfrac{100}{81} \right\rfloor = 33 + 11 + 3 + 1 = 48.$$ Trailing zeros of $n!$ are $v_5(n!)$, because each zero needs a $2$ and a $5$ and fives are the scarcer factor; $100!$ ends in $20 + 4 = 24$ zeros.

For binomial coefficients, subtract: $$v_p\binom nk = v_p(n!) - v_p(k!) - v_p((n - k)!),$$ which also equals the number of carries when adding $k$ and $n - k$ in base $p$, [[kummers-theorem|Kummer's theorem]]. The digit-sum form answers a question like "for which $n$ is $v_2(n!) = n - 1$" at once: exactly when $s_2(n) = 1$, that is, when $n$ is a power of $2$.

Inverse questions use the jumps in the sum, which is larger than $1$ at multiples of $p^2$. $v_5(124!) = 28$ but $v_5(125!) = 31$, so no factorial ends in exactly $29$ or $30$ zeros.

## On contests
Seven problems here, six of them AIME, two solved by it alone; two more are [[trailing-zeros|trailing-zero counts]], and two apply it to a binomial coefficient that came out of a [[permutations-combinations|counting]] problem.
`,

"kummers-theorem": String.raw`## Why it works
Write the subtraction $n = k + (n-k)$ in base $p$: each carry in the addition corresponds to one factor of $p$ surviving in $\binom{n}{k}$ — provable by applying [[legendres-formula|Legendre's]] digit-sum form to all three factorials.

## How to use it
When Legendre-subtraction is messy, count carries instead: $v_2\binom{2n}{n}$ = number of 1s in binary $n$ (adding $n + n$ carries at every 1-bit). Divisibility questions about central binomials and [[catalan-numbers|Catalan numbers]] route through this.

## On contests
"For how many $n \le 1000$ is $\binom{2n}{n}$ odd" — never, for $n \ge 1$ (always a carry); "$\binom{2n}{n}$ not divisible by 4" — $n$ a power of 2. These carry-counting one-liners appear on AIME and Putnam-lite sets.`,

"lucas-theorem": String.raw`## Why it works
$(1+x)^{p^i} \equiv 1 + x^{p^i} \pmod p$ ([[freshmans-dream|freshman's dream]]); expanding $(1+x)^m$ over the base-$p$ digits of $m$ and matching coefficients digit-wise gives the product formula.

## How to use it
$\binom{m}{n} \bmod p$: write both in base $p$, multiply digit binomials (any digit of $n$ exceeding $m$'s gives 0). Parity special case: $\binom{m}{n}$ odd iff $n$'s binary 1s sit inside $m$'s — so row $m$ of Pascal's triangle has $2^{s_2(m)}$ odd entries.

## On contests
Pascal-parity questions (Sierpinski patterns), "how many $\binom{2027}{k}$ are divisible by small prime," and fast binomial-mod-p evaluations on AIME. For prime-power moduli, combine with more careful tools — Lucas alone is mod $p$ only.`,

"lte": String.raw`## Key forms
- for an odd prime $p$ dividing $a-b$ but neither $a$ nor $b$, the exponent of $p$ in $a^n-b^n$ is $v_p(a-b)+v_p(n)$ — so a whole power-divisibility question reduces to two much easier valuations
- the prime $2$ is the exception and needs its own statement: for even $n$, $v_2(a^n-b^n)=v_2(a-b)+v_2(a+b)+v_2(n)-1$ — applying the odd-prime form at $p=2$ is the standard way this result is misused
- check the hypotheses before applying it, since $p\mid a-b$ and $p\nmid a$ are exactly what make the proof work — the formula is simply false without them

## Why it works
Factor $a^n - b^n = (a-b)(a^{n-1} + a^{n-2}b + \cdots + b^{n-1})$. When an odd prime $p \mid a-b$ with $p\nmid a,b$, each of the $n$ terms of the second factor is $\equiv a^{n-1}\pmod p$, so that factor is $\equiv n\,a^{n-1}$ and a careful induction on $v_p(n)$ adds exactly $v_p(n)$. The $p=2$ statements differ because the units mod $2^k$ are not cyclic.

## How to use it
Check the hypotheses first — misapplying the $p=2$ formula is the classic error. Then read the valuation off in one line: the power of $3$ dividing $4^{729}-1$ is $v_3(4-1)+v_3(729)=1+6=7$. LTE is also the engine behind order-lifting: if $d=\operatorname{ord}_p(a)$ and $p^s\,\|\,a^d-1$, then $\operatorname{ord}_{p^k}(a)=d\cdot p^{\max(0,\,k-s)}$.

## On contests
"Largest power of $p$ dividing $a^n\pm b^n$," "find $n$ so $2^n\,\|\,13^{1024}-1$," and zero-of-valuation Diophantine steps collapse to LTE — an AIME/olympiad staple once the conditions are checked.`,

"primes-6k": String.raw`## Why it works
Mod 6, the classes $0, 2, 3, 4$ are divisible by 2 or 3 — only $\pm 1$ remain available for primes above 3. $p^2 \equiv 1 \pmod{24}$: check $\pm1, \pm5, \pm7, \pm11$ mod 24, or note $p^2 - 1 = (p-1)(p+1)$ is a product of consecutive evens around a multiple of 3.

## How to use it
[[casework-method|Casework]] reducer: any argument over primes $> 3$ needs only two residue classes. The $24 \mid p^2 - 1$ fact resolves divisibility questions about prime squares instantly.

## On contests
"$p^2 - 1$ is always divisible by..." (24) is a direct AMC question; twin-prime and prime-gap puzzles use the $6k \pm 1$ frame to structure search and proof alike.`,

"floor-multiples": String.raw`
## Why it works
The multiples of $d$ are evenly spaced, one in every block of $d$ consecutive numbers, so counting them is division.

The multiples of $d$ up to $n$ are $d, 2d, 3d, \ldots, kd$, where $k$ is the largest whole number with $kd \le n$, and there are exactly $k$ of them. The condition $kd \le n$ says $k \le \frac nd$, so the largest such whole number is $\left\lfloor \frac nd \right\rfloor$. For $n = 100$ and $d = 7$, $\frac{100}{7}$ is about $14.3$, and indeed $$7 \cdot 14 = 98 \le 100 \lt 105 = 7 \cdot 15.$$

The numbers divisible by both $a$ and $b$ are exactly the multiples of $\operatorname{lcm}(a, b)$, which is why that term appears when [[pie|inclusion-exclusion]] corrects the double count in "divisible by $a$ or $b$".

## How to use it
Combine with inclusion-exclusion for unions ("divisible by 3 or 5"), complements ("divisible by neither"), and exact conditions ("by 6 but not 9"). This plus [[legendres-formula|Legendre]] covers most "how many numbers up to $N$..." questions. Ranges: count up to $b$, subtract count up to $a - 1$.

## On contests
Constant at MATHCOUNTS and AMC level, with 12 problems tagged here, 3 of them solved by it alone and 3 more with [[casework-method|casework]] on top. It is also the counting engine inside [[legendres-formula|Legendre's formula]], totient computations and AIME lattice problems.
`,

"prime-divides-binomial": String.raw`## Why it works
$\binom{p}{k} = \frac{p!}{k!(p-k)!}$: the numerator has one factor of $p$, and for $0 \lt  k \lt  p$ neither factorial below can cancel it.

## How to use it
Immediate consequence: the [[freshmans-dream|freshman's dream]] $(x + y)^p \equiv x^p + y^p \pmod p$ — the middle terms vanish. That powers induction proofs of [[fermats-little-theorem|Fermat's little theorem]] and digit-based expansions (Lucas). Also $\binom{p^k}{j} \equiv 0 \pmod p$ for $0 \lt  j \lt  p^k$.

## On contests
Appears as a lemma constantly: binomial expansions mod $p$, showing $p \mid 2^p - 2$, and prime-detection via Pascal's triangle rows (row $p$ is all multiples of $p$ inside).`,

"bertrands-postulate": String.raw`## Why it works
Proved by Chebyshev via binomial-coefficient estimates (Erdős's elementary proof analyzes prime factors of $\binom{2n}{n}$). For contest purposes: cite it.

## How to use it
Guarantees a prime in $(n, 2n)$ — enough for existence arguments ("some prime divides exactly one term"), bounding constructions, and showing $n!$ is never a perfect power for $n \ge 2$ (a prime in $(\frac{n}{2}, n]$ appears to the first power).

## On contests
Olympiad-leaning, but AIME-adjacent problems about primes in ranges or factorial factorizations sometimes want exactly this guarantee.`,

"chicken-mcnugget": String.raw`
## Why it works
Sort the amounts by their remainder mod $a$. Adding an $a$ keeps an amount in its class, so once a class contains one amount that can be made, every larger amount in that class can be made too.

The smallest amount that can be made in each class uses no $a$ at all, so it is one of $0, b, 2b, \ldots, (a - 1)b$. These leave different remainders mod $a$, because $a$ and $b$ are coprime, so there is exactly one in each class.

{{figure:grid}}

The class that starts last begins at $(a - 1)b$, and the amount just before it in that class, $$(a - 1)b - a = ab - a - b,$$ is the largest one that cannot be made. Every class has started by then, so nothing larger is impossible.

For the count, pair each amount $n$ from $0$ to $ab - a - b$ with $ab - a - b - n$. Exactly one of each pair can be made, and there are $\frac{(a - 1)(b - 1)}{2}$ pairs.

## How to use it
Check that $\gcd(a, b) = 1$ first. Otherwise only multiples of the gcd can ever be made, and the theorem applies after dividing through, as [[bezouts-identity|Bézout's identity]] explains.

To decide which amounts can be made, work one residue class at a time modulo the smaller denomination, as in the figure. With three or more denominations there is no closed formula, and the same class-by-class picture, done by hand, is the way in.

## On contests
Three problems here, two AIME and one AMC 12, none solved by it alone. Typical questions reduce a coin problem to two coprime denominations after a parity or divisibility step, count the attainable values in a bounded range, or run the theorem backwards, finding the denominations that leave a given largest impossible amount.`,

"pythagorean-triples": String.raw`## Why it works
A primitive triple has odd hypotenuse and one even leg; factoring the [[pythagorean-theorem|Pythagorean relation]] as $b^2 = c^2 - a^2 = (c-a)(c+a)$ with the two factors coprime-up-to-2 forces both to be (twice) squares — yielding the $m, n$ parametrization. Geometrically: rational points on the unit circle via lines through $(-1, 0)$.

## How to use it
Generate: coprime $m > n$, opposite parity. Structural facts for problems: exactly one leg divisible by 3, one by 4, one side by 5; area divisible by 6; inradius $r = n(m - n)\cdot$(scaling) — and for [[right-triangle-inradius|ANY right triangle with integer sides]], $r$ is an integer.

## On contests
"How many right triangles with leg 15" (factor $15^2 = (c-b)(c+b)$), perimeter/area matching problems, and AIME counting of triples with a fixed element — all flow from the parametrization or the difference-of-squares factoring.`,

"pell-equation": String.raw`## Why it works
Units in $\mathbb{Z}[\sqrt D]$: if $(x_1, y_1)$ is the smallest solution, every solution is a power $(x_1 + y_1\sqrt D)^k$ because norms multiply ($N(u) = x^2 - Dy^2$ is multiplicative). Continued fractions of $\sqrt D$ find the fundamental solution.

## How to use it
From the fundamental solution, generate the rest by expanding $(x_1 + y_1\sqrt D)^k$ or by the recurrence $x_{k+1} = x_1x_k + Dy_1y_k$, $y_{k+1} = x_1y_k + y_1x_k$. Solutions grow exponentially — "the next solution after..." questions want exactly one multiplication.

## On contests
AIME problems about near-square pairs ($x^2 - 2y^2 = \pm1$-adjacent: triangular-square numbers, "$n$ and $\frac{n+1}{2}$ both squares") reduce to Pell orbits. Recognize the quadratic-in-two-variables-equals-constant shape and hunt the smallest solution by hand.`,

"sum-of-two-squares": String.raw`## Why it works
Primes $\equiv 1 \pmod 4$ split as $a^2 + b^2$ (via $x^2 \equiv -1$ existing and descent, or Gaussian integers); primes $\equiv 3 \pmod 4$ are inert and must pair up; the [[brahmagupta-fibonacci|Brahmagupta-Fibonacci identity]] multiplies representations together.

## How to use it
Check the factorization: odd powers of any prime $\equiv 3 \pmod 4$ ⟹ not representable. The count of representations (ordered, with signs) is $4(d_1(n) - d_3(n))$ — divisors $\equiv 1$ minus $\equiv 3$ mod 4 — which counts lattice points on the circle $x^2 + y^2 = n$.

## On contests
"Which of these is a sum of two squares," lattice points on circles (AIME), and representation-count problems. The multiplicative structure (build reps from prime reps) computes explicit decompositions fast.`,

"thues-lemma": String.raw`## Why it works
Pigeonhole. Consider the $(\lfloor\sqrt n\rfloor + 1)^2 > n$ numbers $ai - j$ for $0 \le i, j \le \lfloor\sqrt n\rfloor$. Two must be congruent mod $n$; subtracting gives $a(i_1 - i_2) \equiv (j_1 - j_2) \pmod n$ with both differences at most $\sqrt n$ in absolute value and not both zero — exactly the promised $x \equiv ay$ with $|x|, |y| \le \sqrt n$.

## How to use it
The elementary route to representation theorems. For $p \equiv 1 \pmod 4$, $-1$ is a quadratic residue, so pick $a$ with $a^2 \equiv -1$; then Thue's $x \equiv ay$ gives $x^2 \equiv a^2 y^2 \equiv -y^2$, so $p \mid x^2 + y^2$, and since $0 \lt  x^2 + y^2 \lt  2p$ it equals $p$. The same move with $a^2 \equiv -2$ or $-3$ produces $x^2 + 2y^2$ and $x^2 + 3y^2$ representations. The proof is a [[pigeonhole|pigeonhole argument]] on the roughly $p$ pairs $(x,y)$ in a box of side $\sqrt p$.

## On contests
An olympiad tool — the standard "no Gaussian integers required" proof of [[fermat-two-squares|Fermat's two-squares theorem]], and a clean way to force a bounded solution of a modular condition into existence when a problem needs one.`,

"factor-pair-counting": String.raw`
## Why it works
Once an equation reads $AB = N$ with $A$ and $B$ integers, choosing $A$ decides $B$, so the solutions correspond exactly to the divisors of $N$.

Take $xy = 36$ in positive integers. For each divisor $x$ of $36$ there is exactly one $y$, namely $\frac{36}{x}$, and every solution has $x$ a divisor. So the ordered solutions are counted by the divisors: $d(36) = 9$. Unordered pairs $\{x, y\}$ are half as many, except that the pair $6 \cdot 6$ is its own mirror image, so there are $$\frac{d(36) + 1}{2} = \frac{9 + 1}{2} = 5.$$

The same holds after a substitution. If an equation can be rearranged into $$(x - a)(y - b) = N,$$ then $x - a$ and $y - b$ form an integer factor pair of $N$, and each pair gives back exactly one solution $(x, y)$. The count is $d(N)$ positive pairs, or $2d(N)$ if negative factors are allowed, before any filter is applied.

## How to use it
The whole idea is to stop solving and start counting. An equation in two unknowns has no general method, but once it is rearranged into (something)(something) $= N$, every solution corresponds to a factorization of $N$, and the number of factorizations is just [[number-of-divisors|the divisor count]]. A problem with no obvious method becomes a problem with a formula.

The pipeline is fixed. Force a product with [[sfft|SFFT]] or direct factoring, count the divisor pairs of the constant, then filter. The filtering is where the marks are, and there are only three filters worth remembering.

- Positivity: do the negative factor pairs give valid variables?
- Ordering: unordered pairs number $\frac{d(N)}{2}$, except when $N$ is a perfect square, where the pair $\sqrt N \cdot \sqrt N$ has no partner and the count is $\frac{d(N) + 1}{2}$.
- Parity: when the variables force both factors to have the same parity, as they do for [[difference-of-squares|a difference of squares]], the pairs of opposite parity are discarded.

That parity filter is why this card and the difference of squares travel together: $n = (a - b)(a + b)$ is precisely this pipeline with a parity constraint attached.

## On contests
Almost never alone — 2 of 24 — and its constant companion is [[difference-of-squares|the difference of squares]] (6 problems), which is the step that manufactures the product in the first place.

The evergreen is "how many ordered pairs solve $\frac1x+\frac1y=\frac1{12}$": rearranged it is $(x-12)(y-12)=144$, so the count is $d(144)=15$ positive pairs plus the negative-side analysis. Every problem of this family is the same three steps with a different constant, and the difficulty lives entirely in the filters.
`,

"difference-of-squares-rep": String.raw`
## Why it works
Every representation is a factorization into two factors of the same parity, and every such factorization is a representation.

The factors $a - b$ and $a + b$ differ by $2b$, an even number, so they are both odd or both even. If both are odd, $n$ is odd; if both are even, $n$ is a multiple of $4$. So an $n$ that is $2 \bmod 4$ has no representation. Conversely, if $n = st$ with $s \le t$ of the same parity, then $$a = \frac{s + t}{2}, \qquad b = \frac{t - s}{2}$$ are whole numbers with $a^2 - b^2 = st = n$. Every odd $n$ works with $s = 1$ and $t = n$, and every multiple of $4$ with $s = 2$ and $t = \frac n2$.

## How to use it
$40$ is a multiple of $4$, so it is a difference of squares: the pair $4 \cdot 10$ gives $a = 7$ and $b = 3$, and $7^2 - 3^2 = 40$. $42$ is $2 \bmod 4$, so it is not.

To count representations, count the factor pairs of matching parity. For odd $n$ every factor pair works, so there are $\lceil \frac{d(n)}{2} \rceil$ representations, counting $b = 0$ when $n$ is a square. Equations like $x^2 - y^2 = k$ are solved the same way, by listing factor pairs of $k$, which is the [[difference-of-squares|difference of squares factoring]] at work.

## On contests
Four problems here, mostly AMC, one solved by it alone and three combined with [[difference-of-squares|the difference of squares factoring]] itself. "How many numbers up to $N$ are differences of two squares" and "in how many ways" are the two recurring questions, and both come down to the parity condition and factor pairs.
`,

"farey-sequences": String.raw`## Why it works
The determinant condition $bc - ad = 1$ says consecutive Farey fractions form a unimodular pair — no lattice point strictly between their vectors ([[picks-theorem|Pick's theorem]] on the empty triangle). The mediant is the lattice vector sum, the unique "next" fraction between them.

## How to use it
Best-approximation problems: the fraction with smallest denominator between two given fractions is found by mediant descent (Stern-Brocot search). Neighbor condition answers "which fractions are adjacent to $\frac{a}{b}$": solve $bc - ad = 1$. Counting: $|F_n| = 1 + \sum_{k\le n}\varphi(k)$.

## On contests
AIME problems on fractions with bounded denominators ("smallest denominator between..."), and the hidden structure in ford-circle/mediant configurations. The unimodular determinant is the fact to reach for.`,

"repeating-decimals": String.raw`
## Why it works
Multiplying by $10^k$ shifts a repeating block of length $k$ one whole block to the left, so subtracting the original number cancels the entire infinite tail.

If $x = 0.\overline{d_1 \ldots d_k}$, then $10^kx = d_1 \ldots d_k.\overline{d_1 \ldots d_k}$, and subtracting gives $$(10^k - 1)x = d_1 \ldots d_k,$$ the block read as a whole number. So $x$ is the block over $10^k - 1$, which is $k$ nines. The same fact is a [[geometric-series|geometric series]] with ratio $10^{-k}$.

In the long division of $1$ by $n$, each step multiplies the current remainder by $10$ and reduces it mod $n$, and the digit written down depends only on that remainder. So the digits repeat as soon as a remainder repeats, and for $n$ coprime to $10$ the remainder first returns to $1$ after $\operatorname{ord}_n(10)$ steps.

{{figure:division}}

## How to use it
Convert in either direction by counting digits: $0.\overline{57} = \frac{57}{99} = \frac{19}{33}$, and $$0.1\overline{6} = \frac1{10}\left(1 + 0.\overline{6}\right) = \frac1{10} \cdot \frac53 = \frac16.$$ Factors of $2$ and $5$ in a denominator create the digits before the repeat; the rest of the denominator sets the period.

Period questions are [[multiplicative-order|order computations]]: the period of $\frac1{49}$ is $\operatorname{ord}_{49}(10) = 42$, and the period always divides $\varphi(n)$. Every fraction $\frac{k}{999}$ has a three-digit repeating block, and $999 = 27 \cdot 37$, so counting numbers of the form $0.\overline{abc}$ comes down to the divisors of $999$.

## On contests
Five problems here, all AIME, one solved by it alone; two are counts over fractions $\frac{k}{999}$ in lowest terms, handled with [[pie|inclusion-exclusion]] on the prime factors $3$ and $37$. AIME also builds problems on the period of $\frac1n$ and on the digit sums of repeating blocks.
`,

"terminating-decimals": String.raw`## Why it works
Terminating with $k$ decimals means $10^k \cdot \frac{m}{n}$ is an integer, i.e. $n \mid 10^k$ — so $n$'s primes are only 2 and 5, and $k = \max(a, b)$ suffices.

## How to use it
Reduce the fraction FIRST — $\frac{3}{6}$ terminates. Counting problems ("how many $\frac{1}{n}$ for $n \le 100$ terminate") count numbers of the form $2^a5^b$. Mixed pre-period/period structure: factors of 2, 5 give the pre-period length, the rest gives the period.

## On contests
AMC counting questions and AIME hybrids ("$\frac{k}{2020}$ terminates for how many $k$" — depends on cancellation against the 101). The reduce-first trap is the tested subtlety.`,

"base-conversion": String.raw`
## Why it works
A base-$b$ numeral counts in bundles: $d_0$ ones, $d_1$ bundles of $b$, $d_2$ bundles of $b^2$, and so on, never with $b$ or more of any one size, since $b$ bundles of one size would make a single bundle of the next size up.

That rule is what makes the representation unique, and it is also how you find it. Dividing $n$ by $b$ leaves a remainder between $0$ and $b - 1$, and that remainder is the number of ones, $d_0$, because everything else is a multiple of $b$. The quotient counts the bundles of $b$, and dividing it by $b$ again gives $d_1$ as the remainder. Repeating until the quotient is $0$ produces the digits from right to left.

For $200$ in base $7$: $$200 = 28 \cdot 7 + 4, \qquad 28 = 4 \cdot 7 + 0, \qquad 4 = 0 \cdot 7 + 4,$$ and reading the remainders from the bottom up, $200 = 404_7$.

Converting the other way is just evaluating the polynomial, and the number of digits comes from the size of the leading power: a number with $k + 1$ digits satisfies $b^k \le n \lt b^{k+1}$, so $k = \lfloor \log_b n \rfloor$.

## Full proof
Existence is the division process above. Each step divides the current quotient by $b$, so the quotients strictly decrease and eventually reach $0$, and reassembling $n = q_1b + d_0 = (q_2b + d_1)b + d_0 = \cdots$ gives $n = \sum_i d_ib^i$ with every $d_i$ between $0$ and $b - 1$.

For uniqueness, suppose $\sum_i d_ib^i = \sum_i e_ib^i$ with every digit in $\{0, 1, \ldots, b - 1\}$. Reducing both sides modulo $b$ gives $d_0 \equiv e_0 \pmod b$, and two digits that are congruent modulo $b$ and both lie between $0$ and $b - 1$ must be equal. Subtracting $d_0$ from both sides and dividing by $b$ leaves the same situation one place to the left, so $d_1 = e_1$, and repeating shows every digit agrees.

## How to use it
Digit conditions in an unknown base become polynomial equations. "$\overline{121}_b$ is a perfect square" says that $$\overline{121}_b = b^2 + 2b + 1 = (b + 1)^2$$ is a square, which is true in every base $b \ge 3$, while "$\overline{abc}_b$ equals some given number" is usually a quadratic in $b$.

A few structural facts are worth having ready: $b^k$ is a $1$ followed by $k$ zeros, $b^k - 1$ is $k$ copies of the top digit $b - 1$, and a number whose digits are all equal is that digit times a repunit $\overline{11\cdots1}_b$.

What base problems really ask is for an equation to be read two ways. A digit string is a polynomial in the base, so a condition on digits is a polynomial condition on $b$, usually a quadratic, while the digits themselves are held to $0 \le d \lt b$. Those two facts together make the problem finite: the polynomial gives candidates and the digit bounds eliminate almost all of them.

## On contests
Alone in 4 of its 27 problems; the standing partner is [[casework-method|casework]] (6), because the digit bounds produce a small number of cases and someone has to check them. The recurring shapes are "in what base does this digit string equal that square" and palindromes that survive a change of base. Binary and ternary carry their own uses: base two for subset weights, and balanced ternary for weighing problems where a weight may go on either pan.
`,

"lattice-points-gcd": String.raw`
## Why it works
The segment is made of $\gcd(a, b)$ equal steps, each the smallest lattice vector in its direction.

Let $g = \gcd(a, b)$. The vector $\left(\frac ag, \frac bg\right)$ has coordinates with no common factor, and the segment is $g$ copies of it laid end to end, so it passes through the $g - 1$ lattice points between the copies. There are no others: a lattice point $t(a, b)$ with $0 \lt t \lt 1$ needs $ta$ and $tb$ both to be integers, which forces $t$ to be a multiple of $\frac1g$.

For the squares, the diagonal of an $m \times n$ grid crosses $m - 1$ inner vertical lines and $n - 1$ inner horizontal lines, and each crossing takes it into a new square. At each of the $g - 1$ interior lattice points it crosses one of each at once and enters only one new square, so it visits $$1 + (m - 1) + (n - 1) - (g - 1) = m + n - g$$ squares.

{{figure:squares}}

## How to use it
For [[picks-theorem|Pick's theorem]], count boundary points edge by edge: an edge from $(x_1, y_1)$ to $(x_2, y_2)$ contributes $\gcd(|x_2 - x_1|, |y_2 - y_1|)$ points, counting one endpoint, so adding over the edges counts each vertex once. The segment from $(0, 0)$ to $(9, 6)$ is three steps of $(3, 2)$, so it has $2$ interior lattice points.

A lattice point $(a, b)$ is visible from the origin, with no lattice point in between, exactly when $\gcd(a, b) = 1$. In three dimensions, inclusion-exclusion gives the number of unit cubes the diagonal of an $a \times b \times c$ box passes through: $$a + b + c - \gcd(a, b) - \gcd(b, c) - \gcd(c, a) + \gcd(a, b, c).$$

## On contests
Five problems here, four of them AIME, none by it alone; three split the count into [[casework-method|cases]] by the value of the gcd. The recurring shapes are a diagonal crossing grid squares, lattice points on a segment or on a polygon's boundary, and the points of a grid visible from the origin.
`,

"wolstenholme": String.raw`## Why it works
Pair the fractions $\frac{1}{k} + \frac{1}{p-k} = \frac{p}{k(p-k)}$: the harmonic sum mod $p^2$ reduces to $p\sum\frac{1}{k(p-k)}$, and the remaining sum vanishes mod $p$ by symmetry of inverses. The binomial form follows by expansion.

## How to use it
Cite for harmonic-number congruences: $H_{p-1} \equiv 0 \pmod{p^2}$ (numerator divisible by $p^2$), and $\binom{2p}{p} \equiv 2 \pmod{p^3}$ for $p \ge 5$. The weaker mod-$p$ statements are provable by the pairing trick alone — learn the pairing, cite the strengthening.

## On contests
"Show the numerator of $1 + \frac{1}{2} + \cdots + \frac{1}{p-1}$ is divisible by $p$" appears in olympiad training; the $p^2$ version and binomial form are recognition facts for hard AIME/olympiad number theory.`,

"zsygmondy": String.raw`## Why it works
Deep (cyclotomic polynomial analysis). The content: $a^n - b^n$ almost always has a prime factor dividing no earlier $a^k - b^k$ — a "new" prime at every exponent, with the two listed exceptions.

## How to use it
A sledgehammer for exponential Diophantine equations: if a problem claims $a^n - b^n$ has only certain prime factors for large $n$, Zsygmondy usually contradicts it. Check the exceptions first: $2^6 - 1 = 63$ and $n = 2$ with $a + b$ a power of 2.

## On contests
Olympiad tool ("find all $n$ such that $2^n - 1$ divides..."). AIME rarely needs it, but recognizing when a smaller tool (orders, [[lte|LTE]]) suffices vs. when Zsygmondy is the honest reason marks mature problem-solving.`,

"fermat-numbers": String.raw`## Why it works
$F_n = 2^{2^n} + 1$: the product identity $F_0F_1\cdots F_{n-1} = F_n - 2$ follows by telescoping $(2^{2^k} - 1)(2^{2^k} + 1) = 2^{2^{k+1}} - 1$. Any common divisor of two Fermat numbers divides 2 — but all are odd, so they are pairwise coprime.

## How to use it
Pairwise coprimality gives infinitude of primes (each $F_n$ owns new primes). Structure facts: $2^m + 1$ can be prime only when $m$ is a power of 2 (else factor via odd-exponent sum); known Fermat primes are 3, 5, 17, 257, 65537 — and constructible polygons come from products of these.

## On contests
Factoring $2^{32} - 1 = 3 \cdot 5 \cdot 17 \cdot 257 \cdot 65537$ via the telescoping product is a beloved AMC/AIME move; coprimality arguments and "when is $2^m + 1$ prime" reasoning recur.`,

"continued-fraction-convergents": String.raw`## Why it works
Convergents $\frac{p_k}{q_k}$ satisfy the recurrence $p_k = a_kp_{k-1} + p_{k-2}$ (same for $q$), and the determinant identity $p_kq_{k-1} - p_{k-1}q_k = (-1)^{k-1}$ follows by induction — each step is a unimodular [[matrix-multiplication|matrix multiplication]].

## How to use it
Best rational approximations with bounded denominator are convergents — the tool for "closest fraction to $\pi$ with denominator under 100" questions. The determinant identity gives instant solutions to $ax - by = \pm1$ ([[bezouts-identity|Bézout]] via continued fractions), and consecutive convergents are Farey neighbors.

## On contests
Approximation problems and Pell-equation fundamentals ($\sqrt D$'s continued fraction finds the fundamental solution). Also underlies Stern-Brocot/mediant search arguments on AIME-level fraction problems.`,

"digit-count": String.raw`
## Why it works
$n$ has $d$ digits exactly when $10^{d-1} \le n \lt 10^d$, and taking logarithms turns that into $d - 1 \le \log_{10} n \lt d$. So $d - 1$ is the whole-number part of $\log_{10} n$, which is the formula; in base $b$ the same argument uses powers of $b$.

The fractional part of the logarithm decides the leading digits. If $\log_{10} n = k + f$ with $0 \le f \lt 1$, then $$n = 10^f \cdot 10^k,$$ and $10^f$, a number between $1$ and $10$, is $n$ with its decimal point moved.

## How to use it
For $2^{100}$, $\log_{10} 2^{100} = 100\log_{10} 2 \approx 30.103$, so it has $31$ digits, and since $10^{0.103} \approx 1.27$, it begins $1.27\ldots$, with leading digit $1$. Memorize $\log_{10} 2 \approx 0.30103$ and $\log_{10} 3 \approx 0.47712$; with $\log_{10} 5 = 1 - \log_{10} 2$ they cover most questions.

Leading-digit questions about a sequence of powers become questions about the [[floor-basics|fractional parts]] of multiples of a logarithm: $2^k$ starts with $1$ exactly when the fractional part of $k\log_{10} 2$ is less than $\log_{10} 2$.

## On contests
Four problems here, mostly AMC, three solved by it alone; the fourth works through [[log-rules|logarithm rules]] first. "How many digits does $5^{2027}$ have" and "how many powers of $2$ below $2^{1000}$ start with a $7$" are the classic forms.
`

});

// Entries added from the 2023-2025 AMC/AIME sweep.
Object.assign(window.MATH_DETAILS, {

"hensel-lifting": String.raw`
## Key forms
- $f(a+pt)\equiv f(a)+pt\,f'(a)\pmod{p^2}$ — everything past the linear term vanishes, so the lift is linear
- $\frac{f(a)}{p}+t\,f'(a)\equiv0\pmod p$ — solve this for $t$; it has a unique solution exactly when $f'(a)\not\equiv0\pmod p$
- $f'(a)\equiv0\pmod p$ is the singular case — the root then lifts to all $p$ values of $t$ or to none, so check the derivative first

## Why it works
Expanding around the known root, every term past the linear one carries a factor of $p^2$, so modulo $p^2$ the problem is linear.

For a polynomial with integer coefficients, Taylor's formula gives $$f(a + pt) = f(a) + pt\,f'(a) + p^2(\cdots),$$ with integers hidden in the dots. Since $p$ divides $f(a)$, the condition $f(a + pt) \equiv 0 \pmod{p^2}$ divides through by $p$ to $$\frac{f(a)}{p} + t\,f'(a) \equiv 0 \pmod p,$$ a linear congruence in $t$ with exactly one solution when $p$ does not divide $f'(a)$. Repeating the step with $p^3$, $p^4, \ldots$ lifts the root as far as needed.

## How to use it
Solve modulo $p$ first, then lift each root one power at a time, substituting $x = a + pt$ and keeping only the terms linear in $t$; the [[binomial-theorem|binomial theorem]] does the expansion for powers.

For $x^k \equiv -1$ with $k$ a power of $2$, first decide which primes allow a solution modulo $p$ at all: a solution has order exactly $2k$ modulo $p$, so $2k$ must divide $p - 1$, by [[multiplicative-order|multiplicative orders]]. Then lift.

When $f'(a) \equiv 0 \pmod p$ the root is singular: it lifts to all $p$ values of $t$ if $p^2$ divides $f(a)$, and to none otherwise.

## On contests
Two problems here, both AIME, neither solved by it alone. Typical questions solve a cube or fourth-power congruence modulo a prime power by splitting with the [[crt|Chinese remainder theorem]] and lifting one power at a time, or study a sequence that stabilizes modulo powers of $2$ through multiplicative orders.
`

});

Object.assign(window.MATH_DETAILS, {

"carmichael-function": String.raw`## Why it works
The multiplicative group mod $p^k$ is cyclic for odd $p$ (so $\lambda = \varphi$ there), but mod $2^k$ ($k \ge 3$) it is a product of a group of order 2 and a cyclic group of order $2^{k-2}$ — whence the smaller exponent. [[crt|CRT]] splits the group mod $n$ into the prime-power pieces, and the universal exponent of a product is the lcm of the pieces' exponents.

## How to use it
For "last $k$ digits of a huge power" problems, reduce the exponent mod $\lambda(10^k)$ instead of $\varphi(10^k)$: $\lambda(1000) = 100$ versus $\varphi(1000) = 400$. For power towers, iterate down the tower with $\lambda$ at each level. Remember the special cases $\lambda(2) = 1$, $\lambda(4) = 2$ and the lcm (not product) combination rule. Since $\lambda(n)\mid\varphi(n)$ always, using $\lambda$ can only sharpen [[eulers-theorem|Euler's theorem]], never weaken it — and the true order of any particular $a$ divides $\lambda(n)$ in turn.

## On contests
AIME tower-of-exponents problems reward $\lambda$ heavily — a $4\times$ smaller modulus at each level compounds. Euler's theorem is never wrong, just slower; $\lambda$ is the sharp version of the same idea.`

});

Object.assign(window.MATH_DETAILS, {

"floor-sum-reciprocity": String.raw`## Why it works
$\lfloor \frac{kp}{q} \rfloor$ counts lattice points $(k, j)$ with $1 \le j \le \frac{kp}{q}$ — the points strictly below the diagonal of the $q \times p$ rectangle in column $k$. Coprimality keeps the diagonal off the lattice, and the $180^\circ$ symmetry of the rectangle pairs each interior point below the diagonal with one above, splitting $(p-1)(q-1)$ evenly.

## How to use it
Evaluate floor sums over a full period instantly; for partial ranges, pair $k$ with $q - k$ using $\lfloor \frac{kp}{q} \rfloor + \lfloor \frac{(q-k)p}{q} \rfloor = p - 1$. The lattice-counting viewpoint generalizes: sums of floors = points under a line, so Pick-style arguments and symmetry both apply.

## On contests
AIME floor-sum problems (often dressed as "sum of remainders": $\sum (kp \bmod q)$ converts via $kp = q\lfloor \cdot \rfloor + \text{rem}$). Also the key lemma inside [[eisenstein-criterion|Eisenstein's]] proof of [[quadratic-reciprocity|quadratic reciprocity]] — the same pairing, one level deeper.`

});

Object.assign(window.MATH_DETAILS, {

"lattice-points-circle": String.raw`## Why it works
In the Gaussian integers $\mathbb{Z}[i]$, $a^2 + b^2 = (a+bi)(a-bi)$, and unique factorization sorts primes into split ($p \equiv 1 \bmod 4$, contributing choices), inert ($p \equiv 3$, demanding even exponents), and ramified ($2$). Counting the factorization choices yields $4(d_1 - d_3)$, the 4 being unit rotations $\pm1, \pm i$.

## How to use it
Count representations without finding them: compute $d_1(n) - d_3(n)$ over the divisors. Practical shortcuts: powers of split primes give $e+1$ essentially-different representations; any prime $\equiv 3 \pmod 4$ to an odd power kills everything; factors of 2 and squares of inert primes just scale existing points.

## On contests
"How many lattice points on $x^2 + y^2 = 2025$" — direct plug-in. Also the cleaner route to "in how many ways is $n$ a sum of two squares" (divide out symmetries carefully: the $4(d_1-d_3)$ count is ordered and signed).`,

"gaussian-integers": String.raw`## Why it works
$\mathbb{Z}[i]$ is a Euclidean domain — you can divide with remainder by rounding to the nearest Gaussian integer — so it has unique factorization. The norm $N(a+bi) = a^2+b^2 = (a+bi)(a-bi)$ is multiplicative because it is $|z|^2$, which turns questions about sums of two squares into questions about factorization. A rational prime $p$ behaves by whether $-1$ is a quadratic residue mod $p$: $p \equiv 1 \pmod 4$ makes $x^2 \equiv -1$ solvable, so $p \mid (x+i)(x-i)$ splits; $p \equiv 3 \pmod 4$ stays prime; and $2 = -i(1+i)^2$ ramifies.

## How to use it
Reach for $\mathbb{Z}[i]$ whenever $a^2+b^2$ appears: factor it as $(a+bi)(a-bi)$ and lean on unique factorization. This proves [[fermat-two-squares|Fermat's two-squares theorem]], powers the $4(d_1 - d_3)$ representation count, parametrizes Pythagorean triples via $(m+ni)^2$, and multiplies sums of two squares together (Brahmagupta–Fibonacci). The [[eisenstein-criterion|Eisenstein]] integers $\mathbb{Z}[\omega]$ do the same for $a^2+ab+b^2$ and problems with cube-root-of-unity (120°) symmetry.

## On contests
Chiefly an olympiad tool, but its consequences reach the AIME (sum-of-two-squares counts, Pythagorean-triple parametrizations). The practical takeaway: primes $\equiv 1 \pmod 4$ split (and are sums of two squares), while primes $\equiv 3 \pmod 4$ stay inert.`

});

Object.assign(window.MATH_DETAILS, {

"vp-factorial": String.raw`
## Why it works
Each multiple of $p$ contributes one factor, each multiple of $p^2$ one more, and so on, so counting multiples power by power counts every factor exactly once.

Among $1, 2, \ldots, n$ there are $\lfloor \frac np \rfloor$ multiples of $p$, each contributing at least one factor of $p$. The $\lfloor \frac n{p^2} \rfloor$ multiples of $p^2$ contribute a second factor, the multiples of $p^3$ a third, and so on. A number divisible by exactly $p^e$ is counted in the first $e$ terms and no others, so the sum is the total. [[legendres-formula|Legendre's formula]] has a picture of this count and a closed form.

## How to use it
Each quotient is the previous quotient divided by $p$ and rounded down, so the computation is a short chain. For the zeros at the end of $2025!$: $$2025 \to 405 \to 81 \to 16 \to 3,$$ and $405 + 81 + 16 + 3 = 505$. Fives are counted rather than twos because fives are the scarcer factor.

To test whether $p^k$ divides $n!$, compare $k$ with the sum. For a binomial coefficient, compute the sums for $n!$, $k!$ and $(n - k)!$ and subtract; the result is also the number of carries when $k$ and $n - k$ are added in base $p$, which is [[kummers-theorem|Kummer's theorem]].

## On contests
Five problems here, mostly AMC, three solved by it alone; two pair it with [[uniform-overcount|division by a uniform overcount]], where a count arrives as a ratio of factorials whose prime powers must be compared. "How many zeros does $n!$ end in" and "the largest $k$ with $7^k \mid 100!$" appear at every level from MATHCOUNTS to AIME.
`

});

Object.assign(window.MATH_DETAILS, {

"recognition-numbers": String.raw`
## Why it works
There is no theorem here, only the reason these particular numbers keep appearing.

Divisibility by $2$, $3$ and $5$ can be seen at a glance, so a number that passes those tests looks prime. A composite number that passes them has all its prime factors at least $7$, and the products of two primes from $7$ to $19$ are the ones that turn up most. Knowing those few products means $221$ or $323$ never slows you down.

$1001 = 7 \cdot 11 \cdot 13$ is behind a whole family of tricks. Repeating a three-digit block multiplies it by $1001$, $$\overline{abcabc} = \overline{abc} \cdot 1001 = \overline{abc} \cdot 7 \cdot 11 \cdot 13,$$ so every such six-digit number is divisible by $7$, $11$ and $13$. And $2^{10} = 1024$ is so close to $10^3$ that it converts between powers of $2$ and powers of $10$ with an error under $3\%$.

## How to use it
To factor a three-digit number, test $7$, $11$, $13$, $17$ and $19$ after the obvious small primes. A number below $529 = 23^2$ that passes all of them is prime, since a composite one would need two prime factors of at least $23$.

The family built on repeated digit patterns cracks numbers like $111111 = 111 \cdot 1001$: $111 = 3 \cdot 37$, $999 = 3^3 \cdot 37$, $10101 = 3 \cdot 7 \cdot 13 \cdot 37$, and $101 \cdot 9901 = 1000001$.

One power is worth knowing for last digits: $$7^4 = 2401 \equiv 1 \pmod{100},$$ so the last two digits of $7, 7^2, 7^3, 7^4, \ldots$ run $07, 49, 43, 01$ and repeat every four. [[eulers-theorem|Euler's theorem]] only promises a repeat every $40$ steps; $7$ has [[multiplicative-order|order]] $4$ modulo $100$. So $7^{2025}$ ends in $07$, because $2025$ is one more than a multiple of $4$.

For estimates, $\log_{10} 2 \approx 0.301$ and $\log_{10} 3 \approx 0.477$ settle digit counts and size comparisons, and the square-root values settle which answer choice a messy expression is closest to.

## On contests
Four problems here, all solved by it alone, and really two, each shared between the AMC 10 and AMC 12. They reward recognizing products like $101 \cdot 9901 = 1000001$ and $99 \cdot 10101 = 999999$, or $10 \cdot 9 \cdot 8 = 720 = 6!$, instead of multiplying out. AIME answers often need a quick factorization such as $221$ or $299 = 13 \cdot 23$, and AMC estimates lean on $2^{10} \approx 10^3$.`

});

Object.assign(window.MATH_DETAILS, {

"gcd-substitution": String.raw`## Key forms
- write $a=dx$ and $b=dy$ where $d=\gcd(a,b)$, and the quotients are automatically coprime — that is exactly what "greatest" means, and it is why every condition on the pair simplifies afterwards
- coprimality makes the derived quantities immediate: $\operatorname{lcm}(a,b)=dxy$, hence $ab=\gcd\cdot\operatorname{lcm}$, and $a+b=d(x+y)$ — every relation simplifies at once, which is why this is the opening move rather than a later step
- given the gcd and lcm, the pairs $(x,y)$ are the coprime factorisations of $\frac{\operatorname{lcm}}{\gcd}$, and there are $2^{\omega}$ ordered ones since each prime's whole block must go entirely to $x$ or entirely to $y$ — counting the prime factors is all the work, since each one goes wholly to $x$ or wholly to $y$

## Why it works
Dividing $a$ and $b$ by their gcd leaves quotients with no common factor — that's what "greatest" means. Everything about the pair then splits cleanly: $\operatorname{lcm}(a,b) = dxy$ because $x$ and $y$ share nothing, $ab = d^2xy = \gcd \cdot \operatorname{lcm}$ falls out immediately, and any equation in $a, b$ becomes an equation in $d$ and the coprime pair $(x, y)$.

## How to use it
Write $a = dx$, $b = dy$ the moment a problem mentions gcd or lcm — before doing anything else. Given $\gcd$ and $\operatorname{lcm}$, the pairs $(x, y)$ are the coprime factorizations of $\frac{\operatorname{lcm}}{\gcd}$, and there are exactly $2^{\omega}$ ordered ones ($\omega$ = number of distinct primes of $\frac{\operatorname{lcm}}{\gcd}$), since each prime's whole block goes entirely to $x$ or entirely to $y$. Sum conditions like $a + b = d(x + y)$ hand you a factor of the sum for free. It is the working form of [[gcd-lcm-product|gcd–lcm product]]: reducing a pair to coprime cofactors is what the identity licenses.

## On contests
The standard opener for "gcd + lcm + one more condition" problems at every level: count the pairs, minimize the sum, match a given product. MATHCOUNTS uses it with concrete numbers; AIME versions layer it with divisor counting — after substituting, everything reduces to prime-block bookkeeping on $xy$.`,

"choose-modulus": String.raw`## Key forms
- powers occupy very few residues, which is what makes a well-chosen modulus decisive: squares are $0,1$ mod $4$ and $0,1,4$ mod $8$; cubes are $0,\pm1$ mod $9$; fourth powers are $0,1$ mod $16$ — the sparseness is the point, since a modulus where one side simply cannot land finishes the problem outright
- a true equation over the integers stays true modulo every $m$, so if the two sides can never agree modulo some $m$, the equation has no solutions at all — this is how "prove no solutions exist" problems are usually killed
- match the modulus to the exponents present, and remember the other outcome: a forced residue that does not kill the equation still kills cases, as when $x$ must be even and you substitute $x=2x'$ and descend — a non-fatal residue is still progress, because it narrows the cases you have left to check

## Why it works
A true equation over the integers stays true mod every $m$. Residue classes of powers are sparse — squares hit only $\{0,1\}$ mod 4 and $\{0,1,4\}$ mod 8, cubes only $\{0, \pm1\}$ mod 9, fourth powers only $\{0,1\}$ mod 16 — so a well-chosen modulus can make one side land in a set the other side never touches.

## How to use it
Match the modulus to the exponents present: squares → mod 4 or 8, cubes → mod 9 (or 7), fourth powers → mod 16, digit information → mod 9 or 11, last digits → mod 10, factorials beyond $p!$ → mod $p$ (they vanish). Check the finitely many residues of each side; an empty intersection kills the equation, a forced residue kills cases (e.g. "$x$ must be even — write $x = 2x'$ and descend").

## On contests
The first thing to try on "show no solutions exist" and on narrowing AIME Diophantine searches. Also the engine behind parity arguments — mod 2 is the simplest instance. If mod 4, 8, 9, and 16 all fail to break the equation, switch tools: size/bounding arguments or factoring usually take over.`,

"digit-manipulation": String.raw`## Key forms
- write the number as its place-value polynomial, $\overline{abc}=100a+10b+c$, which turns a digit condition into an ordinary equation in the digits — once it is an equation the digit constraints are just bounds, and the problem stops being about digits
- a number plus its reversal always factors through $11$ and a number minus its reversal through $9$: $\overline{ab}+\overline{ba}=11(a+b)$ and $\overline{ab}-\overline{ba}=9(a-b)$, while for three digits $\overline{abc}-\overline{cba}=99(a-c)$ drops the middle digit entirely — spotting the factor immediately is usually the intended shortcut
- the bounds do most of the work, since $1\le a\le9$ and $0\le b,c\le9$ leave only a handful of candidates once one digit is pinned, so isolate a digit before starting any [[casework-method|casework]]

## Why it works
Base-10 notation is the polynomial $\overline{abc} = 100a + 10b + c$. Reversal identities follow at once: $\overline{ab} + \overline{ba} = 11(a+b)$ and $\overline{ab} - \overline{ba} = 9(a - b)$, which is why digit-reversal problems always run through 9 and 11.

## How to use it
Name the digits, translate the condition into an equation, and exploit the brutal bounds $1 \le a \le 9$, $0 \le b \le 9$ — most digit equations have only a handful of solutions once you isolate a digit. For three digits, $\overline{abc} - \overline{cba} = 99(a - c)$: the middle digit vanishes. Divisibility conditions convert via mod 9 (digit sum) and mod 11 (alternating sum).

## On contests
A MATHCOUNTS and early-AMC staple: "a number equals $k$ times its digit sum," reversal differences, digits forming arithmetic sequences. The layered AMC version runs the same translation in another base $b$ — same polynomial, different radix, and comparing representations across bases gives systems in the digits.`,

"squeeze-between-squares": String.raw`## Key forms
- if $n^2\lt N\lt (n+1)^2$ for some integer $n$, then $N$ cannot be a perfect square — consecutive squares are $2n+1$ apart, so a large expression trapped strictly between two of them is disqualified outright
- guess the near-root and prove both inequalities: for a quartic try $(n^2+an+b)^2$ for small $b$, check small cases by hand since the squeeze usually only starts from some $n_0$, and read the boundary cases as the actual solutions — small cases must be checked separately, since the squeeze usually fails for the first few $n$

## Why it works
Perfect squares are spaced increasingly far apart — the gap between $n^2$ and $(n+1)^2$ is $2n + 1$. Any integer trapped strictly inside such a gap cannot be a square, and every integer $N$ in $[n^2, (n+1)^2)$ has $\lfloor \sqrt N \rfloor = n$ exactly.

## How to use it
Given a polynomial-like expression suspected of never being square, guess the near-root — for $n^4 + 2n^3 + \dots$ try $(n^2 + n + c)^2$ for small $c$ — and verify strict inequalities on both sides. Two subtleties: check small cases separately (the squeeze often starts only from some $n_0$), and when the expression can equal the boundary square, those become exactly the solution cases. The same template works for cubes and for trapping between $k(k+1)$-type products.

## On contests
The closer for "find all $n$ making this a perfect square" — squeeze for large $n$, hand-check the small survivors. AIME also uses the floor version directly: computing $\lfloor \sqrt{N} \rfloor$ for messy $N$ means finding which consecutive squares bracket it.`

});

Object.assign(window.MATH_DETAILS, {

"vieta-jumping": String.raw`## Key forms
- if a symmetric condition is quadratic in each variable separately, fixing the others makes the remaining one a root of a quadratic, and [[vietas-general|Vieta]] hands you the second root for free: $a'=kb-a$ from the sum, and $a'=\frac{b^2-N}{a}$ from the product, which is the entire engine of the descent
- the two expressions do different jobs — the sum shows $a'$ is an integer, and the product controls its sign and size
- start from the solution minimizing $a+b$ and jump: either the new solution is smaller, contradicting minimality, or you land on a degenerate case whose evaluation reveals what the constant must be — both outcomes are useful, since the contradiction proves impossibility and the degenerate case gives the answer

## Why it works
If a symmetric condition is quadratic in each variable separately, then fixing all but one variable makes the remaining one a root of a quadratic — and Vieta hands you the other root for free: $a' = kb - a = \frac{b^2 - N}{a}$, automatically an integer (from the sum) and with controllable sign and size (from the product). Starting from a minimal solution, the jump must either exit the allowed region — a contradiction — or hit a boundary case that pins down the constant.

## How to use it
The ritual: (1) suppose the quantity $k$ is an integer and take a solution $(a, b)$ with $a + b$ minimal, WLOG $a \ge b$; (2) treat the condition as a quadratic in $a$ and name the second root $a'$ via Vieta's sum and product; (3) show $a'$ is an integer, nonnegative, and smaller than $a$; (4) minimality forces the degenerate case ($a' = 0$ or $a' = b$), and evaluating there reveals what $k$ must be. The product form of $a'$ gives the size bound; the sum form gives integrality.

## On contests
Purely an olympiad weapon: its best-known result is that $\frac{a^2+b^2}{ab+1}$ is a perfect square whenever it is an integer, and it settles many divisibility problems of the shape $xy \mid x^2 + y^2 + c$. Recognize the trigger: a symmetric fraction of quadratics asserted to be a positive integer. Below olympiad level it never appears; it's here so the pattern is recognizable when self-studying.`

});

Object.assign(window.MATH_DETAILS, {

"trailing-zeros": String.raw`## Why it works
A trailing zero is a factor of $10 = 2 \cdot 5$, so the number of them is $\min(v_2(n!), v_5(n!))$. In any factorial there are always more factors of $2$ than of $5$ (every other number is even, only every fifth is a multiple of $5$), so the minimum is always $v_5(n!)$ — [[legendres-formula|Legendre's formula]] with $p = 5$.

## How to use it
Sum $\left\lfloor \frac{n}{5} \right\rfloor + \left\lfloor \frac{n}{25} \right\rfloor + \left\lfloor \frac{n}{125} \right\rfloor + \cdots$ until the terms hit zero. For trailing zeros in another base $b$, factor $b = \prod p_i^{a_i}$, compute $\left\lfloor \frac{v_{p_i}(n!)}{a_i} \right\rfloor$ for each prime, and take the minimum — e.g. base $12 = 2^2 \cdot 3$ is limited by whichever of $\lfloor v_2/2 \rfloor$, $v_3$ is smaller.

## On contests
A perennial MATHCOUNTS and early-AMC item ("how many zeros does $100!$ end in?"), and a building block inside harder valuation problems. The base-$b$ generalization and the reverse question ("for which $n$ does $n!$ end in exactly $k$ zeros?", which can have $0$ or $5$ answers) are the standard twists.`,

"pisano-periods": String.raw`## Why it works
A Fibonacci term mod $m$ is determined by the pair $(F_{n-1}, F_n) \bmod m$, and there are only $m^2$ possible pairs, so the sequence of pairs must eventually repeat. Because the recurrence $F_{n-1} = F_{n+1} - F_n$ runs backward as cleanly as forward, the repetition can't start late — it cycles from the very beginning, giving a pure period $\pi(m)$.

## How to use it
To find $F_n \bmod m$, compute the period $\pi(m)$ (list terms mod $m$ until $0, 1$ reappears), then reduce the index: $F_n \equiv F_{n \bmod \pi(m)}$. Handy values: $\pi(10) = 60$ governs last digits, $\pi(2) = 3$ (parity: even every third term), $\pi(5) = 20$. For composite $m$, $\pi$ is the lcm of the periods of its prime-power factors. It is the Fibonacci case of periodicity in a recursive sequence, and of periodicity mod $m$ generally.

## On contests
An olympiad and hard-AIME tool for "last digit of $F_{2024}$" or "for which $n$ is $F_n$ divisible by $m$" questions. The key recognitions: last digits cycle with period $60$, and divisibility of $F_n$ by $m$ is itself periodic in $n$.`,

"exponent-tracking": String.raw`
## Key forms
- $\gcd \to \min$, $\operatorname{lcm} \to \max$, product $\to$ sum — the operations, applied to the exponent of each prime separately
- $a \mid b \iff e_p(a) \le e_p(b)$ at every prime $p$ — divisibility is an inequality between exponents
- $k$th power $\iff k \mid e_p$ at every prime, and $d(n) = \alt{\prod_p (e_p + 1)}{(e_2 + 1)(e_3 + 1)(e_5 + 1)\cdots}$ — powers and divisor counts are exponent bookkeeping too

## Why it works
A positive integer is completely described by its prime exponents, and the common operations act on each prime's exponent separately.

By unique factorization, $n = \prod_p p^{e_p}$ in exactly one way, so the list of exponents is the number. Multiplying two numbers adds their exponents prime by prime, since $p^ep^f = p^{e+f}$.

A common divisor can use at most the smaller of the two exponents at each prime, and the greatest one uses exactly that; the least common multiple, symmetrically, needs the larger. With $a = \prod_p p^{e_p}$ and $b = \prod_p p^{f_p}$, $$\gcd(a, b) = \prod_p p^{\min(e_p, f_p)}, \qquad \operatorname{lcm}(a, b) = \prod_p p^{\max(e_p, f_p)}.$$ And $a$ divides $b$ exactly when $\frac ba$ has no negative exponent, that is, when $a$'s exponent is at most $b$'s at every prime.

None of these rules mixes two different primes, and that independence is the whole point. A condition on several numbers becomes one small condition per prime, each can be solved alone, and when counting, the numbers of choices at different primes multiply.

## How to use it
Write each unknown as $\prod p^{e_i}$ and rewrite every hypothesis as a per-prime constraint: gcd/lcm become $\min$/$\max$ equations, "is a perfect square" becomes "all exponents even," a divisibility becomes an inequality. Solve each prime's tiny problem separately and multiply the counts.

For "count the pairs/triples with these gcd and lcm" problems, each prime contributes a small independent factor, usually $2$ (which of the two numbers holds the maximum) or a short [[casework-method|casework]], and the answer is their product.

Working one prime at a time is what makes [[gcd-lcm-product|gcd–lcm product]] and the lcm pair counts fall out, since min and max are decided independently per prime.

## On contests
The standard AIME approach to gcd and lcm counting and to "how many divisors of $N$ satisfy …", with 12 problems tagged here; [[casework-method|casework]] joins in 4, usually for the cases at a single prime. The reflex to build: the moment a problem mixes gcd, lcm, products or powers, switch to exponent lists and work one prime at a time.
`

});

Object.assign(window.MATH_DETAILS, {

"sum-of-three-squares": String.raw`## Why it works
Squares are $0, 1, 4 \pmod 8$, so three of them can total at most a limited set of residues — and $7 \bmod 8$ is unreachable. If $n \equiv 7 \pmod 8$ fails, so does $4n$: any representation of $4n$ must have all three squares even (since a sum of three squares $\equiv 0 \bmod 4$ forces all even), and dividing by $4$ would produce a representation of $n$. That descent generates the whole excluded family $4^k(8m+7)$. Legendre's theorem says these are the only failures, and Lagrange's four-square theorem then covers them with one extra square.

## How to use it
To test $n$: strip factors of $4$ repeatedly, then check whether what remains is $\equiv 7 \pmod 8$. If yes, three squares are impossible and four are needed; otherwise three suffice. Remember zero counts as a square, so "three squares" includes representations that really use one or two. Pair this with the two-square criterion (a positive integer is a sum of two squares iff every prime $\equiv 3 \pmod 4$ appears to an even power) to know exactly how many squares a given $n$ requires.

## On contests
Mostly an olympiad-level classification tool and a fast way to rule out cases in a Diophantine problem. The mod-8 argument itself — squares are $0, 1, 4 \bmod 8$ — is far more broadly useful than the theorem, and is worth reaching for whenever an equation mixes three squares.`,

"bounding-diophantine": String.raw`
## Key forms
- order the variables $x\le y\le z$ — among $k$ terms summing to $S$ the largest is at least $\frac Sk$, which caps the smallest variable
- two inequalities pin it: $S\le\frac{k}{x}$ from above and $\frac1x\lt S$ from below leave only a handful of values to test — ordering the variables first is what makes the upper bound tight enough to be finite
- fix that value, substitute, and recurse on one fewer variable — then restore all permutations at the end

## Why it works
An equation in positive integers has infinitely many candidates to try but often only finitely many that can possibly work, and bounding is the argument that shrinks the first set down to the second.

Take $\frac1x + \frac1y + \frac1z = 1$. The equation does not change when the variables are swapped, so you may assume $x \le y \le z$ and restore the other orders at the end.

Then $\frac1x \ge \frac1y \ge \frac1z$, so $\frac1x$ is the largest of three terms that add to $1$, and the largest of three numbers is at least their average: $$\frac1x \ge \frac13, \qquad x \le 3.$$ From the other side, $\frac1x \lt 1$ because the other two terms are positive, so $x \ge 2$. Only $x = 2$ and $x = 3$ survive.

Each survivor leaves an equation in fewer variables, and the same argument applies again. With $x = 2$ the rest is $$\frac1y + \frac1z = \frac12$$ with $y \le z$, so $\frac1y \ge \frac14$ and $\frac1y \lt \frac12$, leaving $y = 3$ or $y = 4$. The whole search is a handful of cases, and every solution has been found, because every solution had to pass through one of them.

Ordering is what makes the bound strong enough. Without it, any one of the variables could be the large one, and none of them is individually capped.

## How to use it
State the WLOG ordering explicitly, then bound the extreme variable by comparing it against the total: for $\frac1x + \frac1y + \frac1z = 1$ with $x \le y \le z$, we get $$1 = \frac1x + \frac1y + \frac1z \le \frac3x,$$ so $x \le 3$, and $\frac1x \lt 1$ so $x \ge 2$.

Enumerate each surviving value, substitute, and repeat on the smaller equation; often the two-variable step factors via [[sfft|SFFT]]. Finally, restore all permutations of each unordered solution. The same tactic bounds variables in $xyz = x + y + z$ and in equations where one side grows much faster than the other (compare growth rates to cap the exponent, then finite-check).

What the method buys is worth stating plainly: it converts an unbounded search into a finite one. Before bounding, an equation in three positive integers has infinitely many candidates and no way to check them; after bounding the largest variable, there are a handful, and a handful can simply be listed. Nothing clever happens after that step, which is why the bound is the whole solution rather than the start of one.

## On contests
The standard finisher for unit-fraction (Egyptian fraction) problems and small symmetric Diophantine systems on AIME and olympiads. It is unusually self-contained — 11 of its 39 problems need nothing else, which puts it inside the library's ten most self-sufficient cards — because once the bound is found the rest is enumeration.

It is the size-based complement to the modular approach, and the two divide the work cleanly: use [[modular-basics|a modulus]] to prove no solutions exist, and bounding to prove only finitely many do, then list them. When a problem resists both, it usually wants them together — a modulus to cut the residues, then a bound to cap what survives.
`

});

Object.assign(window.MATH_DETAILS, {

"modular-basics": String.raw`
## Why it works
A congruence is a statement about a difference, $a \equiv b \pmod m$ meaning that $m$ divides $a - b$, and divisibility of differences survives adding and multiplying.

Suppose $a \equiv b$ and $c \equiv d \pmod m$, so $m$ divides both $a - b$ and $c - d$. Then $$(a + c) - (b + d) = (a - b) + (c - d)$$ is a sum of multiples of $m$, so $a + c \equiv b + d$, and subtraction works the same way.

For products, $$ac - bd = a(c - d) + d(a - b),$$ again a sum of multiples of $m$, so $ac \equiv bd$; applying that repeatedly gives $a^k \equiv b^k$.

Division is where it stops. That $m$ divides $k(a - b)$ does not force $m$ to divide $a - b$ when $k$ and $m$ share a factor: $6 \cdot 5 \equiv 6 \cdot 0 \pmod{15}$, since $15$ divides $30$, but $5 \not\equiv 0 \pmod{15}$.

Division is still possible, just not by everything. If $x \equiv a$ and $y \equiv b \pmod m$ and $\gcd(b, m) = 1$, then $$\frac xy \equiv ab^{-1} \pmod m,$$ where $b^{-1}$ denotes [[modular-inverse|the modular inverse]] of $b$. Dividing by $b$ is multiplying by $b^{-1}$, and the only hypothesis is that $b$ and $m$ share no factor. What fails is dividing by something that shares a factor with the modulus, and that failure is the cancellation rule below rather than a ban.

Exponents are the genuine exception to "treat $\equiv$ like $=$". Bases reduce freely: $x \equiv a$ gives $x^k \equiv a^k$. Exponents do not. From $k \equiv j \pmod m$ you may not conclude $a^k \equiv a^j \pmod m$; the exponent reduces modulo $\varphi(m)$, not modulo $m$, and only when $\gcd(a, m) = 1$.

Take $3^{14} \pmod{10}$, whose true value is $9$. Reducing the exponent modulo $10$ would give $3^4 \equiv 1$, which is wrong; reducing it modulo $\varphi(10) = 4$ is right: $$3^{14} = \left(3^4\right)^3 \cdot 3^2 \equiv 1^3 \cdot 9 = 9 \pmod{10}.$$ The base $3$ is coprime to $10$, which is what licenses the second reduction. That is [[eulers-theorem|Euler's theorem]], with [[fermats-little-theorem|Fermat]] as the prime case.

## Full proof
Cancellation. Let $g = \gcd(k, m)$ and suppose $ka \equiv kb \pmod m$, so $m$ divides $k(a - b)$. Dividing through by $g$, the number $\frac mg$ divides $\frac kg(a - b)$. The numbers $\frac mg$ and $\frac kg$ share no factor, since $g$ was the greatest common factor of $m$ and $k$, so by [[euclids-lemma|Euclid's lemma]] $\frac mg$ divides $a - b$. That is $a \equiv b \pmod{\frac mg}$, and when $g = 1$ it is ordinary cancellation modulo $m$.

Inverses. If $\gcd(b, m) = 1$, [[bezouts-identity|Bézout's identity]] gives integers $u$ and $v$ with $bu + mv = 1$, so $bu \equiv 1 \pmod m$ and $u$ is an inverse of $b$. Conversely, if $bu \equiv 1 \pmod m$ then $bu - 1$ is a multiple of $m$, so any common factor of $b$ and $m$ divides $1$. The inverse therefore exists exactly when $\gcd(b, m) = 1$.

## How to use it
Reduce early and often: replace any number by its remainder before multiplying, to keep values small. The rule that trips people up is cancellation: from $ka \equiv kb \pmod m$ you get $$a \equiv b \pmod{\frac{m}{\gcd(k, m)}},$$ not mod $m$. So $6x \equiv 6y \pmod{15}$ only gives $x \equiv y \pmod 5$.

When $\gcd(k, m) = 1$ the cancellation is clean and, equivalently, $k$ has a [[modular-inverse|modular inverse]] you can multiply by. When it is not $1$, either shrink the modulus as above or split into cases.

Beyond the mechanics, the reason to reach for a modulus at all is that it is the cheapest way to prove something is impossible. An equation that survives every algebraic attack often dies instantly mod 3, 4, 8 or 9, because those moduli have very few squares: $$x^2 \equiv 0, 1 \pmod 4, \qquad x^2 \equiv 0, 1, 4 \pmod 8,$$ so any equation forcing a square to be $3 \bmod 4$ has no solutions at all and the search stops before it starts.

That is the payoff: not computing a remainder, but replacing an infinite search with a finite check on residues.

It is also the standard way to shrink a problem. Reducing a variable mod $m$ replaces infinitely many cases with $m$ of them, which is why this card is almost always followed by [[casework-method|casework]]: the modulus produces the cases, and the casework closes them.

## On contests
The foundation under every modular problem — last-digit and remainder questions on MATHCOUNTS, and the setup for [[fermats-little-theorem|Fermat]], Euler, and [[crt|CRT]] on AMC/AIME. The pairing is very consistent: [[casework-method|casework]] shares 12 of the 61 problems tagged here, more than double any other partner, and only six use the modulus alone.

The single most common error is illegal division; the fix is always to track what $\gcd(k, m)$ does to the modulus.
`

});

Object.assign(window.MATH_DETAILS, {

"zeckendorf-theorem": String.raw`## Why it works
Greedily subtracting the largest Fibonacci number $\le n$ can never leave a remainder that needs two adjacent Fibonaccis, because $F_k+F_{k-1}=F_{k+1}$ would merge them into a larger term — which gives both existence and uniqueness of the non-consecutive representation.

## How to use it
The greedy algorithm is both the construction and the proof: taking the largest Fibonacci number at each step automatically leaves a remainder smaller than the previous term's predecessor, which is exactly the non-consecutive condition.

The representation is a bijection between integers and binary strings with no two adjacent $1$s, which ties the count to the Fibonacci tiling count — and explains why exactly $F_{n+2}$ integers have representations using only the first $n$ Fibonacci numbers.

Contest uses are usually about that uniqueness: showing a Fibonacci-sum representation is forced, or converting between an integer and its Fibonacci digits.

## On contests
Occasional AIME and olympiad appearances (Fibonacci representations, Wythoff and [[beatty-theorem|Beatty]] problems); the greedy algorithm together with uniqueness is essentially the whole toolkit.`,

"beatty-theorem": String.raw`## Why it works
The count of Beatty terms $\lfloor n\alpha\rfloor \le N$ is about $N/\alpha$, and similarly $N/\beta$ for the other sequence. Since $\frac1\alpha + \frac1\beta = 1$, the two counts add to $N$ for every $N$ — and irrationality prevents any collision — so together they hit each integer exactly once.

## How to use it
Given one irrational $\alpha > 1$, its partner is $\beta = \frac{\alpha}{\alpha - 1}$, and $\lfloor n\alpha\rfloor, \lfloor n\beta\rfloor$ tile $\mathbb{Z}^+$. Use it to prove two floor-sequences are complementary, or to answer "which set does $k$ fall in." It connects to floor-sum identities and to Wythoff's game (whose losing positions are the Beatty sequences for $\varphi$ and $\varphi^2$).

## On contests
Olympiad number theory / combinatorics — the "these two sequences partition the integers" gem. The density check $\frac1\alpha + \frac1\beta = 1$ is the whole idea.`,

"cauchy-davenport": String.raw`## Why it works
Working in $\mathbb{Z}_p$ (a field, so no zero divisors), a polynomial or transform argument shows the sumset $A + B$ cannot be too small: if it were smaller than $|A| + |B| - 1$ without filling $\mathbb{Z}_p$, a counting/degree contradiction appears. Primality is essential — for composite moduli subgroups let sumsets stay small.

## How to use it
It lower-bounds $|A + B|$ for subsets of $\mathbb{Z}_p$: repeatedly adding sets grows the sumset by $|A_i| - 1$ each step until it saturates at $p$. This is the base for showing certain sums hit every residue, and the springboard to Erdős–Ginzburg–Ziv and other additive results.

## On contests
Olympiad additive number theory. Remember the bound $\min(p, |A| + |B| - 1)$ and that it needs a prime modulus.`,

"erdos-ginzburg-ziv": String.raw`## Why it works
For prime $n = p$, iterate Cauchy–Davenport: pair up residues so their sumset grows to cover $0$, producing $p$ elements summing to $0 \bmod p$. The general $n$ follows multiplicatively from the prime case. The bound $2n - 1$ is sharp — $n-1$ zeros and $n-1$ ones have no $n$-subset summing to $0 \bmod n$.

## How to use it
Whenever you need "some $n$ of these have sum divisible by $n$," you only need $2n - 1$ integers to guarantee it. Useful in partition and divisibility-existence problems, often after reducing residues mod $n$.

## On contests
Olympiad number theory / combinatorics, the canonical zero-sum theorem. Pair it with Cauchy–Davenport (its engine) and remember the sharp count $2n - 1$.`,

"carmichael-numbers": String.raw`## Why it works
A [[fermat-numbers|Fermat pseudoprime]] slips past $b^{n-1} \equiv 1 \pmod n$ despite being composite. Korselt's criterion pins down the ones that fool every coprime base: $n$ must be squarefree with $(p-1) \mid (n-1)$ for each prime $p \mid n$ — then by [[crt|CRT]] the congruence holds for all bases. The smallest such $n$ is $561 = 3 \cdot 11 \cdot 17$ (and $2,10,16$ all divide $560$).

## How to use it
To test a candidate, check squarefreeness and the divisibility $(p-1)\mid(n-1)$ over its prime factors. The takeaway for primality: the Fermat test is not conclusive — Carmichael numbers are exactly its blind spot, which is why stronger tests (Miller–Rabin) are used.

## On contests
Olympiad number theory and "why the Fermat test fails" discussions. Keep it distinct from the Carmichael function $\lambda(n)$ — same name, unrelated object.`

});

Object.assign(window.MATH_DETAILS, {

"extended-euclidean-algorithm": String.raw`## Key forms
- the [[euclidean-algorithm|Euclidean algorithm]] runs on $\gcd(a,b)=\gcd(b,\,a\bmod b)$; the extended version also tracks how each remainder is built from $a$ and $b$, producing [[bezouts-identity|Bézout's identity]] $\gcd(a,b)=ax+by$ — the tracking costs nothing extra, so run the extended version by default
- the Bézout coefficient is exactly the [[modular-inverse|modular inverse]]: if $\gcd(a,b)=1$ then $ax+by=1$ gives $ax\equiv1\pmod b$, so $x\equiv a^{-1}$ — this is how an inverse is computed by hand when the modulus is too large to guess
- the same coefficients settle solvability: $ax\equiv c\pmod b$ has a solution exactly when $\gcd(a,b)\mid c$, and then it has exactly $\gcd(a,b)$ solutions modulo $b$ — check the divisibility first, since it decides whether to look for solutions at all

## Why it works
Each remainder in the Euclidean algorithm is an integer combination of the original $a$ and $b$: $r_i = r_{i-2} - \lfloor r_{i-2}/r_{i-1}\rfloor\, r_{i-1}$. Back-substituting these equations from the last nonzero remainder (the gcd) upward expresses $\gcd(a,b)$ as $ax + by$; the forward recurrence $(x, y) = (y', x' - \lfloor a/b\rfloor y')$ carries the same bookkeeping in one pass.

## How to use it
For a modular inverse $a^{-1} \bmod m$: run the algorithm on $(a, m)$; when the gcd is $1$, the coefficient of $a$, reduced mod $m$, is the inverse. To solve $ax + by = c$: find $g = \gcd(a,b)$ with coefficients $(x_0, y_0)$ — solvable iff $g \mid c$ — then $(x, y) = \frac{c}{g}(x_0, y_0)$, with the general solution adding $t\left(\frac{b}{g}, -\frac{a}{g}\right)$. On paper the back-substitution chain (or a coefficient table) is quickest.

## On contests
The workhorse behind modular inverses on AIME and olympiad, and the constructive companion to Bézout's identity — reach for it whenever you need an actual $(x, y)$, not just their existence. [[crt|CRT]] reconstruction and solving $ax \equiv c \pmod m$ both rely on it.`

});

// Detail body added for a dense medium-importance card.
Object.assign(window.MATH_DETAILS, {

"periodicity-mod-m": String.raw`
## Key forms
- finitely many states — one residue for a power, or the last $k$ residues for an order-$k$ recurrence, so by [[pigeonhole|pigeonhole]] the state eventually repeats
- $a_N \equiv a_{\,n_0 + ((N - n_0) \bmod T)} \pmod m$ — reduce the index once the cycle start $n_0$ and period $T$ are known
- $T = \operatorname{ord}_m(a)$ for $a^n$ with $\gcd(a, m) = 1$ — the [[multiplicative-order|multiplicative order]], which divides $\varphi(m)$, so only the divisors of $\varphi(m)$ need checking

## Why it works
Each term's remainder depends only on a finite amount of information, and anything drawn from a finite supply must eventually repeat.

For a power, $a^{n+1} \bmod m$ is determined by $a^n \bmod m$ alone, since it is that residue times $a$, reduced. There are only $m$ possible residues, so among the first $m + 1$ terms two must be equal, by [[pigeonhole|the pigeonhole principle]]. Once a residue repeats, everything after it repeats too, because each term is computed from the one before by the same rule.

For a recurrence that uses the last $k$ terms, the same argument applies to the list of the last $k$ residues, of which there are at most $m^k$.

The repeat need not start at the beginning. Modulo $100$ the powers of $2$ run $$2, 4, 8, 16, 32, 64, 28, 56, 12, 24, 48, 96, 92, 84, 68, 36, 72, 44, 88, 76, 52, 4, \ldots,$$ and the first return is to $4$, not $2$: the term $2$ sits in a pre-period outside the cycle.

That happens when the step cannot be run backwards, as when $a$ shares a factor with $m$. When $\gcd(a, m) = 1$ it can, since $a$ has an inverse modulo $m$, and then the cycle starts at the very first term.

## How to use it
List residues from the start until a state repeats, noting where the repeat begins ($n_0$) and the period $T$; then $$a_N \equiv a_{\,n_0 + ((N-n_0)\bmod T)} \pmod m.$$

For a pure power with $\gcd(a,m)=1$ the cycle starts immediately and $T$ is the multiplicative order of $a$; for a linear recurrence, $T$ is the period of its state vector (the Pisano period for Fibonacci). Speed things up with [[eulers-theorem|Euler's theorem]], or with [[crt|CRT]], since the period mod $m$ is the lcm of the periods mod each prime power.

## On contests
"Last digits of $7^{2024}$", "$F_{2015} \bmod 1000$" and "the far-out term of a recurrence modulo $m$" are the standard appearances; 13 of the 15 problems tagged here are AIME, and [[casework-method|casework]] joins in 4, usually to treat the terms of one cycle separately. Watch for a pre-period when the base shares a factor with the modulus.
`,

"sigma-parity": String.raw`## Why it works
$\sigma$ is multiplicative, so $\sigma(n)$ is odd iff every prime-power factor contributes an odd amount. For an odd prime $p$, the factor $1 + p + \cdots + p^e$ is a sum of $e+1$ odd terms, so it is odd iff $e+1$ is odd, i.e. $e$ is even. The factor from $2^a$ is $1 + 2 + \cdots + 2^a = 2^{a+1}-1$, which is always odd and never affects the parity. So $\sigma(n)$ is odd exactly when every odd prime appears to an even power — meaning the odd part of $n$ is a perfect square. Writing $n = 2^a m^2$ ($m$ odd), that happens for any $a$, and $2^a m^2$ is itself a square when $a$ is even and twice a square when $a$ is odd. Hence $\sigma(n)$ odd $\iff n$ is a square or twice a square.

## How to use it
Test the shape, do not compute the sum. Strip the factors of $2$ from $n$; if what remains is a perfect square then $\sigma(n)$ is odd, and otherwise it is even. Read backwards, the same criterion generates the candidates: if a problem needs $\sigma(n)$ odd, $n$ must be $m^2$ or $2m^2$, which is a far smaller search than the divisors themselves. For a product, apply it to each factor separately, since $\sigma$ is multiplicative and the parities multiply.

## On contests
It is the fast filter for "$\sigma(n)$ is odd/even" and a clean parity handle on sum-of-divisors problems — the same shape as the better-known $d(n)$ odd $\iff n$ a perfect square (there the count of divisors, not their sum, forces the pairing). Combined with $\sigma$ being multiplicative, it also settles parity of $\sigma$ for products quickly.`

});

Object.assign(window.MATH_DETAILS, {

"dirichlet-convolution": String.raw`## Why it works
Grouping divisors as $d\cdot\frac{n}{d}=n$ makes $*$ commutative and associative with identity $\varepsilon(n)=[n=1]$, and on prime powers the convolution of two [[multiplicative-functions|multiplicative functions]] stays multiplicative — so any such identity reduces to one prime at a time. Möbius inversion is exactly the statement that $\mu$ is the $*$-inverse of $\mathbf 1$.

## How to use it
Recognize a divisor sum $\sum_{d\mid n} f(d)g(n/d)$ as a convolution and factor it over primes, or invert $g=f*\mathbf 1$ into $f=g*\mu$ to peel a summatory function back to its summand. Keep the staples handy: $\mu*\mathbf 1=\varepsilon$, $\varphi*\mathbf 1=\mathrm{id}$, $\mathrm{id}*\mathbf 1=\sigma$.

## On contests
Olympiad and advanced number theory; it is the clean framework for manipulating multiplicative functions and for any Möbius-inversion problem, replacing ad hoc divisor-sum algebra.`,

"jacobi-symbol": String.raw`## Why it works
Defining $\left(\frac{a}{n}\right)=\prod\left(\frac{a}{p_i}\right)^{e_i}$ inherits full multiplicativity in both arguments from the Legendre symbol, and for odd $n$ [[quadratic-reciprocity|quadratic reciprocity]] plus the $-1$ and $2$ supplements all survive — so the symbol can be flipped and reduced without ever factoring $n$.

## How to use it
Evaluate $\left(\frac{a}{p}\right)$ fast by treating it as a Jacobi symbol: reduce the top mod the bottom, extract $2$'s with the supplement, flip by reciprocity, and repeat, exactly like a [[euclidean-algorithm|Euclidean algorithm]]. Caution: for composite $n$ a value of $+1$ does not prove $a$ is a residue — only $-1$ is conclusive.

## On contests
An AIME-adjacent to olympiad computational tool; it is the practical way to decide [[squares-mod-small|quadratic residues]] quickly, and its lone pitfall (composite $+1$) is a favorite trap.`,

"gauss-lemma-qr": String.raw`## Why it works
The least residues of $a,2a,\dots,\frac{p-1}{2}a$ are, up to sign, a permutation of $1,\dots,\frac{p-1}{2}$; multiplying them and comparing with $\left(\frac{p-1}{2}\right)!$ leaves one factor of $-1$ for each residue that exceeded $p/2$, so $\left(\frac{a}{p}\right)=(-1)^{\mu}$.

## How to use it
Count $\mu$, the number of "folded-over" multiples, to read a Legendre symbol directly — cleanest for small fixed $a$, where it produces the closed formulas for $\left(\frac{2}{p}\right)$ and $\left(\frac{-1}{p}\right)$, and as the engine inside a reciprocity proof. Extending the symbol to composite lower arguments gives the [[jacobi-symbol|Jacobi symbol]], which is what makes the reciprocity flip practical to run by hand.

## On contests
Olympiad number theory; less a shortcut than the standard lemma for proving [[quadratic-reciprocity|quadratic reciprocity]] and the supplementary laws from first principles.`,

"freshmans-dream": String.raw`## Why it works
Each middle coefficient $\binom{p}{k}$ with $0\lt k\lt p$ carries a factor of $p$ that the denominator cannot cancel, so mod $p$ every cross term dies and $(a+b)^p\equiv a^p+b^p$. Iterating raises the exponent to $p^m$; this is precisely the Frobenius map $x\mapsto x^p$.

## How to use it
Collapse $p$-th powers of sums mod $p$, prove [[fermats-little-theorem|Fermat's little theorem]] by induction ($n^p\equiv n$), and factor over $\mathbb F_p$ (for instance $x^p-x=\prod_{a}(x-a)$). It is the reason $\binom{p}{k}\equiv 0$ shows up so often.

## On contests
A recurring olympiad and AIME lemma; whenever a prime exponent meets a sum taken modulo that prime, this is the simplification to reach for.`,

"power-minus-self": String.raw`## Why it works
[[fermats-little-theorem|Fermat's little theorem]] gives $n^p\equiv n\pmod p$, and more generally $n^k\equiv n\pmod p$ for every $n$ exactly when $(p-1)\mid(k-1)$ (then $n^{k-1}\equiv 1$ for $\gcd(n,p)=1$, and both sides vanish when $p\mid n$). Multiplying all such primes gives the universal modulus.

## How to use it
To find the largest $m$ dividing $n^k-n$ for all $n$, list the primes $p$ with $(p-1)\mid(k-1)$ and multiply them (each once). So $n^3-n$ is always divisible by $6$, $n^5-n$ by $30$, $n^7-n$ by $42$, and $n^{13}-n$ by $2730$.

## On contests
A classic AMC/AIME divisibility fact; "$n^k-n$ is divisible by ___ for all $n$" turns immediately into the $(p-1)\mid(k-1)$ prime hunt.`,

"consecutive-product-factorial": String.raw`## Why it works
The product of $k$ consecutive integers equals $k!\binom{n+k-1}{k}$, and binomial coefficients are integers, so $k!$ always divides it. Concretely, among any $k$ consecutive integers one is a multiple of $k$, one of $k-1$, and so on down.

## How to use it
Invoke it to prove products divisible and binomial-type expressions integral: two consecutive integers give an even product, three a multiple of $6$, and $k$ a multiple of $k!$. It also bounds the prime valuations of factorials and falling factorials.

## On contests
A staple divisibility and parity tool from MATHCOUNTS through AIME; "the product of $k$ consecutive integers is divisible by $k!$" resolves many "show this is an integer / is divisible" problems in a line.`,

"chevalley-warning": String.raw`## Why it works
Summing the indicator of the common zero set over $\mathbb F_p^{\,n}$ and using that $\sum_{x\in\mathbb F_p}x^t\equiv 0$ unless $(p-1)\mid t$, the degree bound $\sum\deg f_i\lt n$ forces that sum to vanish mod $p$ — so the number of common zeros is a multiple of $p$.

## How to use it
When the $f_i$ over $\mathbb F_p$ have degrees summing below the number of variables, the zero count is divisible by $p$; and if the $f_i$ have no constant term then $x=0$ is a zero, so a nonzero zero must also exist. That existence step is the usual payoff (e.g. the [[erdos-ginzburg-ziv|Erdős–Ginzburg–Ziv theorem]]).

## On contests
Olympiad number theory and combinatorics; it is the standard nonconstructive tool for "show a nontrivial solution exists mod $p$" and for divisibility of solution counts.`,

"cryptarithms": String.raw`## Key forms
- translate the letters into place value first, so $\overline{ABC}$ becomes $100A+10B+C$ and the puzzle turns into a small system of equations in the digits — once it is a system of equations the puzzle stops being a search and becomes algebra
- work right to left, tracking the carry, which in an addition can only be $0$ or $1$ — that single bound is what makes the search finite rather than a guess-and-check over $10!$ assignments
- the leading column pins the largest letters: two three-digit numbers total under $2000$, so a four-letter answer must start with $1$; combine that with distinct digits, no leading zero, and a digit-sum check mod $9$ to prune before any [[casework-method|casework]] — start at the column with the most constraint, never at the left-hand end by habit

## Why it works
Column addition carries only $0$ or $1$ into the next column, so the columns form a tight chain of modular constraints; the distinctness of the ten letters and the no-leading-zero rule prune the branches fast.

## How to use it
Work right to left tracking each column's carry. The leading column pins the largest letters — a sum of two three-digit numbers can carry at most $1$, so any new leading digit is $1$. Use the digit-sum-mod-$9$ check globally and eliminate impossible letters early rather than guessing.

## On contests
A MATHCOUNTS and early-AMC staple (and a recreational classic); disciplined column-carry reasoning, not trial and error, is what makes them quick.`,

"base10-curiosities": String.raw`## Why it works
The cyclic run of $142857$ is just the six-digit repeating block of $\frac17$ — $10$ is a primitive root mod $7$, so the period is full and multiplying by $1$–$6$ rotates the digits. Narcissistic numbers and Kaprekar's routine are finite digit-map facts you can check directly.

The repunit family explains most of the rest. A string of $n$ ones is $\frac{10^n-1}{9}$, which is why $\frac19=0.\overline{1}$, $\frac1{99}=0.\overline{01}$ and $\frac1{999}=0.\overline{001}$, and why squaring a repunit of length $n\le9$ gives the palindrome $123\ldots n\ldots321$. The $1089$ trick is the same base-ten bookkeeping: reversing a three-digit number and subtracting always leaves a multiple of $99$, and adding that result to its own reverse always gives $1089$ — whose ninefold, $9801$, is itself reversed.

## How to use it
Recognize $142857$ (with $\frac27,\dots,\frac67$ as its rotations, and $\times 7=999999$) on sight, and remember that Kaprekar's routine on a four-digit number with non-identical digits reaches $6174$ within a few steps. These are recall aids, not deep theorems.

## On contests
Light MATHCOUNTS / trivia territory, but occasionally an AMC problem rewards spotting the $142857$ cycle or a repeating-decimal period — worth carrying as instant recall.`

});

Object.assign(window.MATH_DETAILS, {

"p-adic-valuation": String.raw`## Why it works
Unique factorization makes $v_p$ additive — the power of $p$ in a product is the sum of the powers, exactly like a logarithm for a single prime. The ultrametric bound holds because $p^{\min}$ divides both terms; when the two valuations differ, the smaller power survives the sum uncancelled, forcing equality there. Divisibility statements translate the same way: $v_p(\gcd(m,n))$ is the minimum of the two valuations and $v_p(\operatorname{lcm}(m,n))$ the maximum, and for factorials [[legendres-formula|Legendre's formula]] gives $v_p(n!)=\sum_{i\ge1}\lfloor n/p^i\rfloor$.

## How to use it
Take $v_p$ of both sides of a divisibility statement or equation to turn it into linear arithmetic on exponents: $p^k \mid N \iff v_p(N)\ge k$, a perfect square needs every $v_p$ even, and "how many factors of $p$" becomes a sum. The equality case of the ultrametric bound is exactly the engine behind [[lte|Lifting the Exponent]].

## On contests
The backbone of AIME and olympiad prime-power problems, and the language in which LTE, Legendre's formula, and [[kummers-theorem|Kummer's theorem]] are all phrased — reach for it whenever only the power of one prime matters.`,

"fermat-two-squares": String.raw`## Key forms
- $p\equiv1\pmod 4\iff p=a^2+b^2$ for an odd prime $p$ — and the pair $\{a,b\}$ is unique
- $p\equiv3\pmod4\Rightarrow p\ne a^2+b^2$ — the ruling-out direction, since squares are $0$ or $1$ mod $4$ so a sum of two is never $3$
- test $p-b^2$ for squareness with $b\le\sqrt{p/2}$ — uniqueness means the first hit is the whole answer, so the search never needs to continue
- a prime hypotenuse $p=m^2+n^2$ gives exactly one right triangle, with legs $m^2-n^2$ and $2mn$ — uniqueness of the representation forces uniqueness of the triangle

## Why it works
One direction is a two-line parity argument: every square is $0$ or $1$ modulo $4$, so a sum of two squares is $0$, $1$ or $2$ mod $4$ and never $3$. That disposes of every prime $p\equiv3\pmod4$ immediately.

The other direction is the real theorem. Since $p\equiv1\pmod4$, the congruence $x^2\equiv-1\pmod p$ is solvable, so $p$ divides $x^2+1$ for some $x$. [[thues-lemma|Thue's lemma]] then produces integers $a,b$ with $0\lt a,b\lt\sqrt p$ and $a\equiv xb\pmod p$, whence $p\mid a^2+b^2$; but $0\lt a^2+b^2\lt2p$ forces $a^2+b^2=p$ exactly.

Uniqueness is cleanest in the Gaussian integers. There $p=a^2+b^2$ factors as $(a+bi)(a-bi)$, and $\mathbb{Z}[i]$ has unique factorisation, so a prime $p\equiv1\pmod4$ splits into exactly one conjugate pair of Gaussian primes — leaving no freedom in $\{a,b\}$ beyond order and sign.

## How to use it
Read "$1$ mod $4$" as a licence to write the prime as a sum of two squares, and "$3$ mod $4$" as an instant impossibility proof. Combined with the multiplication identity, this extends to composites: a product of primes that are all $1$ mod $4$ is a sum of two squares, and each additional such prime factor doubles the number of essentially different representations.

The application worth watching for is a right triangle whose hypotenuse is given to be a prime. If a problem says the hypotenuse is a prime $p$, then a triangle exists only when $p\equiv1\pmod4$, and then $p=m^2+n^2$ has exactly one solution, so the triangle is completely determined: the legs are $m^2-n^2$ and $2mn$. For $p=13=3^2+2^2$ that forces legs $5$ and $12$; for $p=61=6^2+5^2$ it forces $11$ and $60$. A prime hypotenuse that is $3$ mod $4$ — like $7$, $11$ or $19$ — admits no such triangle at all, which turns "find all right triangles with hypotenuse $p$" into a one-line answer.

To find $a$ and $b$ for a specific prime, just test $p-b^2$ for squareness with $b$ running up to $\sqrt{p/2}$; uniqueness means the first hit is the only one.

## On contests
It is the engine behind Pythagorean-triple problems with a prime hypotenuse, and behind "how many ways can $N$ be written as a sum of two squares" once $N$ is factored. AIME uses it in disguise more often than by name — any time a prime that is $1$ mod $4$ appears alongside a sum of squares, this theorem is the reason the configuration is rigid.`,

"euclids-lemma": String.raw`## Why it works
From [[bezouts-identity|Bezout's identity]] there are integers with $ax + by = 1$ whenever $\gcd(a,b) = 1$. Multiplying through by $n$ gives $anx + bny = n$, and $b$ divides both terms on the left, the first because $b \mid an$ was assumed. So $b \mid n$. The prime statement is the special case: if $p \nmid a$ then $\gcd(p,a) = 1$, so $p \mid ab$ forces $p \mid b$.

## How to use it
Reach for it whenever a divisibility has to survive a cancellation. If $\frac{an}{b}$ is an integer and $b$ shares no factor with $a$, then $b \mid n$, and that is usually the step pinning a variable to a multiple of something.

It is also what makes lowest terms rigid. Once a rational is written as $\frac pq$ with $\gcd(p,q) = 1$, knowing $q \mid kp$ forces $q \mid k$, so a denominator cannot be quietly absorbed elsewhere. When the gcd is not yet $1$, apply [[gcd-substitution|gcd substitution]] first: pull the common factor out, and what remains is coprime by construction.

## On contests
The invisible step in a large share of AIME number theory, rarely mentioned in a solution even when it is doing the work. It is why $\frac{13n}{6}$ being an integer forces $6 \mid n$, and it is the step on which unique factorization itself rests, since without it a prime could split its divisibility across two composite factors.`,

"digit-sum-carries": String.raw`
## Why it works
Adding two digits in a column either stays below ten or does not. When it does not, the column keeps the sum minus ten and hands one unit to the next column, so the digit sum loses $10$ and gains $1$, a net drop of $9$. Each carry contributes that independently: $$s(a + b) = s(a) + s(b) - 9c.$$

In base $b$ the same accounting gives a drop of $b - 1$. It is also why $n \equiv s(n) \pmod 9$: every correction is a multiple of $9$, which is why [[divisibility-rules|digit sums work mod 9]].

## How to use it
Use it in whichever direction is short. Forwards it predicts a digit sum without doing the addition; backwards it counts the carries, $$c = \frac{s(a) + s(b) - s(a + b)}{9},$$ which is often the real question in disguise.

"No carrying required" is the most common phrasing. Read column by column it says each column adds to at most $9$, so the digits in different places are chosen independently and the count is a product.

When a number is added to itself, a column carries exactly when its digit is $5$ or more, so $s(2n) = 2s(n) - 9 \cdot \#\{\text{digits} \ge 5\}$.

## On contests
Three problems here, all AIME, none solved by it alone. Typical questions count pairs that add to a given number without carrying, one independent choice per column; find which values $|s(x + 2) - s(x)|$ can take, $2$ and then $9n - 2$; or require a fixed number of carries when a given number is added. The carry count also drives [[kummers-theorem|Kummer's theorem]], where it gives the power of a prime dividing a binomial coefficient.`,



});
