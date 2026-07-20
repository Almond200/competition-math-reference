// Extended detail-page write-ups for Number Theory, keyed by formula id.
window.MATH_DETAILS = window.MATH_DETAILS || {};

Object.assign(window.MATH_DETAILS, {

"gcd-lcm-product": String.raw`## Why it works
Prime by prime: gcd takes $\min(e, f)$ of the exponents and lcm takes $\max(e, f)$, and $\min + \max = e + f$ always. Summed over all primes, that is $\gcd \cdot \operatorname{lcm} = ab$.

## How to use it
Given any three of $a, b, \gcd, \operatorname{lcm}$, find the fourth. For systems ("$\gcd = 6$, $\operatorname{lcm} = 210$, how many pairs?"), write $a = 6m$, $b = 6n$ with $\gcd(m,n) = 1$ and $mn = 35$ — count coprime factorizations, i.e. $2^{\#\text{prime factors}}$ ordered pairs.

## On contests
The pair-counting pattern is an AMC/AIME regular. Warning it fails for three numbers: $\gcd \cdot \operatorname{lcm} \ne abc$ in general — the min/max identity doesn't extend.`,

"euclidean-algorithm": String.raw`## Why it works
Any common divisor of $a$ and $b$ divides $a - qb$, and conversely — so the divisor set (hence the gcd) is preserved when replacing $a$ by $a \bmod b$. Repeating strictly shrinks the numbers until one divides the other.

## How to use it
Numeric gcds fast; but the contest power is symbolic: $\gcd(f(n), g(n))$ for polynomials reduces by polynomial subtraction — e.g. $\gcd(2n+1, 5n+2) = \gcd(2n+1, n) = \gcd(1, n) = 1$. Any linear combination step preserves the gcd.

## On contests
"For how many $n$ is $\frac{f(n)}{g(n)}$ reducible" is a recurring AMC/AIME type: run symbolic Euclid to find the only possible common divisors, then count $n$ hitting them.`,

"bezouts-identity": String.raw`## Why it works
The set of integer combinations $ax + by$ is closed under subtraction, so it consists of all multiples of its least positive element — which must be $\gcd(a,b)$ (it divides both; both divide into it via the Euclidean algorithm run backwards).

## How to use it
Solvability test for $ax + by = c$: check $\gcd(a,b) \mid c$. One solution comes from back-substituting the Euclidean algorithm; all others differ by multiples of $\left(\frac{b}{g}, -\frac{a}{g}\right)$. Nonnegative-solution questions layer the Chicken McNugget bound on top.

## On contests
Word problems ("stamps of 5¢ and 8¢..."), constructing modular inverses (solve $ax \equiv 1$), and existence arguments. The "consecutive solutions differ by $\frac{b}{g}$" fact answers "smallest positive $x$" questions.`,

"divisibility-rules": String.raw`## Why it works
All are congruences of powers of 10: $10 \equiv 1 \pmod{3, 9}$ (digit sums), $10 \equiv -1 \pmod{11}$ (alternating sums), $10^k \equiv 0 \pmod{2^k, 5^k}$ (last $k$ digits), and $1000 \equiv -1 \pmod{7, 11, 13}$ (3-digit block alternation, since $1001 = 7 \cdot 11 \cdot 13$).

## How to use it
Composite moduli split into coprime pieces: divisible by 72 ⟺ by 8 and by 9 (check separately — last three digits and digit sum). For unknown-digit puzzles, the rules become linear equations in the digits.

## On contests
"Find digit $d$ so that $\overline{12d34}$ is divisible by 11"-type problems at MATHCOUNTS/AMC 10; the $1001$ factorization powers slicker problems ($\overline{abcabc} = abc \cdot 1001$ is divisible by 7, 11, 13 — a classic).`,

"gcd-power-minus-one": String.raw`## Why it works
The Euclidean algorithm lifts to exponents: $\gcd(a^m - 1, a^n - 1) = \gcd(a^{m - n} - 1 \cdot a^n\ldots)$ — concretely, $a^m - 1 \bmod (a^n - 1) = a^{m \bmod n} - 1$, so the exponent undergoes the Euclidean algorithm.

## How to use it
Immediate answers to gcds of repunits and Mersenne-type numbers: $\gcd(2^{100} - 1, 2^{36} - 1) = 2^{\gcd(100,36)} - 1 = 2^4 - 1 = 15$. Also the divisibility criterion $a^m - 1 \mid a^n - 1 \iff m \mid n$.

## On contests
AIME gcd problems with huge exponents are this identity verbatim. Repunit versions (all-1s numbers in base 10) follow with $a = 10$: $\gcd(R_m, R_n) = R_{\gcd(m,n)}$.`,

"consecutive-coprime": String.raw`## Why it works
Any common divisor of $n$ and $n+1$ divides their difference, 1. More generally a common divisor of $n$ and $n + k$ divides $k$.

## How to use it
Coprimality for free: factors of consecutive integers never interact, so $n(n+1)$ being a perfect square forces both factors to be squares (impossible for $n \ge 1$), and similar "spread the primes" arguments. The $k!$ divisibility of $k$ consecutive integers' product is binomial-coefficient integrality.

## On contests
Underpins many "product of consecutive integers is never a power" and simplification arguments; the $\gcd(n, n+k) \mid k$ form limits casework in fraction-reduction problems.`,

"number-of-divisors": String.raw`## Why it works
A divisor chooses an exponent $0..e_i$ independently for each prime — multiply the $(e_i + 1)$ choice counts.

## How to use it
Reverse-engineering is the contest skill: which $n$ have exactly 12 divisors? Factor 12 into factors each $\ge 2$ ($12 = 12, 6\cdot2, 4\cdot3, 3\cdot2\cdot2$) and translate to exponent patterns ($p^{11}, p^5q, p^3q^2, p^2qr$), then minimize/count as asked. Odd $d(n)$ ⟺ perfect square (divisors pair except $\sqrt n$).

## On contests
"Smallest number with exactly $k$ divisors," locker-door problems (squares!), and divisor-counting of factorials (exponents via Legendre first). Among the most-tested NT facts at every level.`,

"sum-of-divisors": String.raw`## Why it works
Expand the product $\prod_i(1 + p_i + \cdots + p_i^{e_i})$: choosing one term from each factor generates every divisor exactly once. Each factor is a geometric series.

## How to use it
Compute prime-power by prime-power. For "sum of even divisors" or "sum of divisors divisible by 3": factor out the forced part ($2 \cdot \sigma(\text{odd part})$-style manipulations). Sum of reciprocals of divisors: $\frac{\sigma(n)}{n}$ — a neat quotient worth knowing.

## On contests
AIME asks for $\sigma$ of specific large factorizations and for sums over restricted divisor classes — always reduce to modified geometric-series products.`,

"product-of-divisors": String.raw`## Why it works
Pair each divisor $d$ with $\frac{n}{d}$; each pair multiplies to $n$, and there are $\frac{d(n)}{2}$ pairs (for square $n$, the middle divisor $\sqrt n$ contributes the half-power consistently).

## How to use it
Logarithmic viewpoint helps: the exponent of each prime in the product is $\frac{e_i \cdot d(n)}{2}$. Problems giving "the product of all divisors is $10^{60}$" reverse to constrain $n$ and $d(n)$ jointly.

## On contests
AMC/AIME reverse problems ("product of divisors equals $n^k$ — find possibilities") test whether you can run $n^{d(n)/2}$ backwards. Answer sanity: the product is always a power of $n$, possibly half-integer exponent.`,

"eulers-totient": String.raw`## Why it works
Inclusion-exclusion over the prime divisors, which factors neatly into $n\prod(1 - \frac{1}{p})$; or multiplicativity (CRT gives a bijection of coprime residues) plus the easy prime-power count $p^k - p^{k-1}$.

## How to use it
Compute via the product over distinct primes — exponents only matter through the leading $n$. It counts: fractions $\frac{k}{n}$ in lowest terms, generators of cyclic groups, and reduced residues (the things Euler's theorem exponentiates over). $\varphi$ is even for $n > 2$; $\sum_{d \mid n}\varphi(d) = n$.

## On contests
Direct computation, counting reduced fractions (AIME: "how many $\frac{k}{2010}$ are reduced"), and as the exponent in Euler's theorem for last-digit problems. Also "for how many $n$ is $\varphi(n) = 12$"-type inverse questions — bounded casework over possible prime factors.`,

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
CRT: for coprime $m, n$, residues mod $mn$ pair with residue pairs mod $m$ and $n$, and the relevant structures (divisors, coprime residues) factor along the pairing.

## How to use it
License to compute prime-power by prime-power: evaluate $f(p^e)$ for each prime power in the factorization, multiply. Also a proof pattern: to verify an identity between multiplicative functions, check it on prime powers only.

## On contests
The silent workhorse — most divisor/totient computations implicitly use it. Stated problems test the *warning*: multiplicativity needs coprimality ($\varphi(4) \ne \varphi(2)\varphi(2)$).`,

"coprime-residue-sum": String.raw`## Why it works
If $\gcd(k, n) = 1$ then $\gcd(n - k, n) = 1$: totatives pair off summing to $n$ each, and there are $\frac{\varphi(n)}{2}$ pairs for $n > 2$ (no self-pairing since $\gcd(\frac{n}{2}, n) > 1$).

## How to use it
Instant evaluation of totative sums, and the pairing idea generalizes: sums of any symmetric function over totatives can exploit $k \leftrightarrow n - k$. Average totative is $\frac{n}{2}$ — occasionally the slicker phrasing.

## On contests
Appears inside AIME fraction-sum problems (sum of all reduced $\frac{k}{n}$ equals $\frac{\varphi(n)}{2}$) and as a lemma in bigger counting arguments.`,

"perfect-square-divisors": String.raw`## Why it works
A divisor $\prod p_i^{f_i}$ is a perfect square iff every $f_i$ is even; the even choices in $0..e_i$ number $\lfloor\frac{e_i}{2}\rfloor + 1$. Independence across primes multiplies the counts.

## How to use it
Same template for cubes ($\lfloor\frac{e_i}{3}\rfloor + 1$) and for "divisors that are $k$-th powers." Combined with complementary counting: divisors that are NOT perfect squares = $d(n) -$ this. For divisors of $n^2$ less than $n$ but not dividing $n$: use the symmetry of $d(n^2)$ around $n$ — a famous AIME configuration.

## On contests
"How many perfect square divisors does $12!$ have" (Legendre for exponents first, then this) is a canonical AIME problem shape.`,

"lcm-pair-counting": String.raw`## Why it works
Fix a prime $p$ with target exponent $e$: the pair's exponents $(x, y)$ must satisfy $\max(x,y) = e$, giving $2e + 1$ ordered choices ($x = e$ with $y$ free, or symmetric, minus the double count). Primes act independently.

## How to use it
The general method outranks the formula: translate every gcd/lcm condition into per-prime min/max conditions on exponent tuples, count tuples per prime, multiply. Systems (three variables, three pairwise lcms) become small combinatorial counts per prime.

## On contests
The AIME classic "how many ordered triples have $[x,y] = 1000$, $[y,z] = 2000$, $[z,x] = 2000$" is solved exactly this way (answer 70). Any lcm-constrained counting should trigger the per-prime reflex.`,

"fermats-little-theorem": String.raw`## Why it works
The multiples $a, 2a, \dots, (p-1)a$ are a permutation of $1, \dots, p-1$ mod $p$ (multiplication by $a$ is invertible); multiply both lists and cancel $(p-1)!$. Alternatively induct with the freshman's dream $(x+1)^p \equiv x^p + 1$.

## How to use it
Reduce exponents mod $p - 1$ when the base is coprime to $p$. For huge towers, iterate: the exponent itself reduces mod $p-1$, its exponent mod $\varphi(p-1)$, and so on down the tower.

## On contests
Remainders of $a^{\text{huge}}$ mod a prime — bread and butter from AMC 10 up. Combine with CRT for composite moduli (mod 1000 = mod 8 and mod 125). Watch the hypothesis $p \nmid a$; use $a^p \equiv a$ when unsure.`,

"eulers-theorem": String.raw`## Why it works
Same permutation argument as Fermat, run over the $\varphi(n)$ reduced residues: multiplying them all by $a$ permutes them, and cancellation leaves $a^{\varphi(n)} \equiv 1$.

## How to use it
Exponent reduction mod $\varphi(n)$ — but only when $\gcd(a, n) = 1$. When it isn't (e.g. last digits of $4^{100}$), split the modulus by CRT into the part sharing factors with $a$ (where powers stabilize quickly) and the coprime part (where Euler applies).

## On contests
"Last two/three digits" is the biggest use: $\varphi(100) = 40$, $\varphi(1000) = 400$, though CRT into mod 8 and mod 125 (with $\varphi(125) = 100$) is usually cleaner. Tower problems reduce down the $\varphi$ chain: $1000 \to 400 \to 160 \to \ldots$`,

"wilsons-theorem": String.raw`## Why it works
In the product $(p-1)!$, every residue pairs with its inverse and cancels to 1 — except the self-inverse ones, $1$ and $p - 1$, whose product is $-1$. Compositeness converse: a shared factor makes $(n-1)! \equiv 0$ (for $n > 4$).

## How to use it
Factorial congruences mod primes: shift with $(p-2)! \equiv 1$, $(p-3)! \equiv \frac{p-1}{2}\cdot$(adjust), and split $(p-1)!$ into halves to get $\left(\frac{p-1}{2}\right)!^2 \equiv (-1)^{\frac{p+1}{2}}$ — the source of square roots of $-1$ mod $p \equiv 1 \pmod 4$.

## On contests
AIME factorial-remainder problems and slick primality observations. The half-factorial corollary explicitly constructs $x$ with $x^2 \equiv -1$, which some problems require.`,

"crt": String.raw`## Why it works
The map $x \mapsto (x \bmod n_1, \dots, x \bmod n_k)$ between residues mod $\prod n_i$ and tuples is injective (a difference divisible by all coprime $n_i$ is divisible by the product), and both sides have equal size — so it is a bijection.

## How to use it
Solving: iterate two at a time — from $x \equiv a \pmod m$, write $x = a + mt$ and reduce mod the next modulus. Splitting: any question mod 1000 becomes mod 8 + mod 125; recombine at the end. Counting: solutions mod $mn$ = (solutions mod $m$) × (solutions mod $n$).

## On contests
Everywhere in AIME number theory: last-three-digit problems, "find $x$ with these remainders," and counting solutions of polynomial congruences. The split-solve-recombine rhythm should be automatic.`,

"multiplicative-order": String.raw`## Why it works
The powers of $a$ mod $n$ cycle; if $a^k \equiv 1$ but $d = \operatorname{ord}(a) \nmid k$, then $a^{\gcd(d,k)} \equiv 1$ with $\gcd(d, k) < d$, contradicting minimality. Hence orders divide every annihilating exponent — including $\varphi(n)$.

## How to use it
To find an order: it divides $\varphi(n)$, so test only divisors of $\varphi(n)$. Repeating decimal periods = $\operatorname{ord}_n(10)$. "Smallest $k$ with $a^k \equiv 1$" and "when does $n \mid a^k - 1$ first" are order computations; $a^i \equiv a^j \iff i \equiv j \pmod{\operatorname{ord}}$.

## On contests
Period-of-decimal problems (AIME loves $\frac{1}{n}$ with prescribed period), cycle lengths of power sequences, and divisibility chains like $2^n \equiv 1 \pmod{3^k}$ (orders modulo prime powers, stepping stone to LTE).`,

"modular-inverse": String.raw`## Why it works
Bézout: $\gcd(a, n) = 1$ gives $ax + ny = 1$, i.e. $ax \equiv 1$. Uniqueness mod $n$ follows from cancellation.

## How to use it
Small moduli: hunt by inspection or add the modulus to the numerator until divisible. Larger: extended Euclid, or Euler's $a^{\varphi(n)-1}$. Every "division" in modular arithmetic is multiplication by an inverse — needed for CRT recombination, solving linear congruences, and evaluating fractions like $\frac{1}{2} \pmod p$ (which means $\frac{p+1}{2}$).

## On contests
Ubiquitous supporting skill: binomial coefficients mod $p$, linear congruence solving, and AIME answers defined as $m n^{-1}$ mod a prime. Fast small-case fluency matters more than the theory.`,

"digit-sum-mod-9": String.raw`## Why it works
$10 \equiv 1 \pmod 9$ makes every power of 10 congruent to 1, so a number is congruent to its digit sum; $10 \equiv -1 \pmod{11}$ alternates the signs.

## How to use it
Casting out nines: verify arithmetic, find missing digits, and reduce enormous numbers (digit-sum repeatedly = value mod 9, with 9 written for 0 when the number is nonzero). The "digital root" of $n$ is $1 + (n-1 \bmod 9)$.

## On contests
"Sum the digits, then sum again..." iterated-digit-sum problems are pure mod 9. Also quick sanity checks that eliminate answer choices on AMC — a habit worth building.`,

"squares-mod-small": String.raw`## Why it works
Square all residues: mod 4 the squares of $0,1,2,3$ are $0,1,0,1$; mod 8 odd squares are $(2k+1)^2 = 4k(k+1) + 1 \equiv 1$ (since $k(k+1)$ is even); mod 9 and 16 by the same enumeration.

## How to use it
First move on any "show no solutions" Diophantine: reduce mod 4, 8, 9, or 16 and compare residue menus. Sums of squares: $a^2 + b^2 \not\equiv 3 \pmod 4$; three odd squares can't sum to $\equiv 6 \pmod 8$; etc. Also fixes parities: $x^2 \equiv 1 \pmod 8$ for odd $x$ is remarkably often the key.

## On contests
AMC/AIME impossibility questions and digit puzzles ("can $\overline{abc}$ be a perfect square if..."). Squares end in $\{0,1,4,5,6,9\}$ and mod-4 analysis kills most wrong candidates fast.`,

"eulers-criterion": String.raw`## Why it works
The multiplicative group mod $p$ is cyclic of order $p-1$: writing $a = g^k$, $a^{\frac{p-1}{2}} = g^{k\frac{p-1}{2}} = (\pm1)$ according to the parity of $k$ — even $k$ means square.

## How to use it
Decides quadratic residuosity by one modular exponentiation. The headline corollary: $-1$ is a QR mod $p$ iff $p \equiv 1 \pmod 4$ — equivalently, $p \mid x^2 + 1$ has solutions only for such $p$ (and 2). Similar criteria: $2$ is a QR iff $p \equiv \pm1 \pmod 8$.

## On contests
Divisibility problems about $x^2 + 1$ (its odd prime factors are all $\equiv 1 \bmod 4$ — a strong structural fact), and residue-existence questions on AIME. Full reciprocity is rarely needed; these special cases usually suffice.`,

"last-digit-patterns": String.raw`## Why it works
Units digits multiply independently of the rest of the number, and each digit's powers cycle: 2, 3, 7, 8 with period 4; 4, 9 with period 2; 0, 1, 5, 6 fixed. Period 4 divides all of them.

## How to use it
Reduce the exponent mod 4 (careful: exponent $\equiv 0$ means use the 4th power's digit, not the 0th). For last TWO digits, switch to mod 100 machinery (Euler/CRT). Squares end only in 0,1,4,5,6,9; that filter plus cycles answers most units-digit questions.

## On contests
MATHCOUNTS/AMC 10 staple ("units digit of $7^{2027}$"), and the entry point to the harder mod-100/mod-1000 AIME versions.`,

"primitive-roots": String.raw`## Why it works
The multiplicative group mod $n$ is cyclic exactly for $n = 1, 2, 4, p^k, 2p^k$ (odd $p$) — the standard structure theorem. A generator $g$ has all $\varphi(n)$ residues among its powers; generators number $\varphi(\varphi(n))$.

## How to use it
With a primitive root, multiplicative problems become additive in the exponent ("discrete log"): counting $k$-th power residues ($\frac{p-1}{\gcd(k, p-1)}$ of them), solving $x^k \equiv a$, and summing over all residues. The existence for prime moduli is the usable core.

## On contests
AIME problems counting solutions of $x^k \equiv 1$ or asking for products over all residues use the cyclic structure implicitly. Also explains why orders divide $p - 1$ and when maximal order is achieved.`,

"quadratic-reciprocity": String.raw`## Why it works
Deep — Gauss gave eight proofs; lattice-point counting in a rectangle is the classic elementary route. Take it as a tool: the symbols $\left(\frac{p}{q}\right)$ and $\left(\frac{q}{p}\right)$ agree unless both primes are $\equiv 3 \pmod 4$.

## How to use it
Flip-and-reduce like a gcd computation: $\left(\frac{q}{p}\right)$ flips to $\left(\frac{p}{q}\right)$ (sign per the rule), then reduce the top mod the bottom; supplement with $\left(\frac{-1}{p}\right) = (-1)^{\frac{p-1}{2}}$ and $\left(\frac{2}{p}\right) = (-1)^{\frac{p^2-1}{8}}$.

## On contests
Rare on AIME (the supplements cover most needs) but decisive when a problem asks which primes divide values of a quadratic. Knowing the two supplements cold is the practical takeaway.`,

"crt-solution-counting": String.raw`## Why it works
CRT's bijection respects polynomial equations: $f(x) \equiv 0 \pmod{mn}$ (coprime $m, n$) holds iff it holds mod $m$ and mod $n$ separately, and solutions pair off. So solution counts multiply.

## How to use it
Count solutions of a congruence mod each prime power in the modulus, multiply. E.g. $x^2 \equiv 1 \pmod{105}$: two solutions mod each of 3, 5, 7 → $2^3 = 8$ total. Explains why $x^2 \equiv 1$ can have many roots mod composites — non-fields allow it.

## On contests
"How many $x$ mod $n$ satisfy $x^2 \equiv x$" (idempotents: $2^{\#\text{prime factors}}$) and similar counts appear on AIME; the multiply-across-prime-powers reflex is the whole technique.`,

"legendres-formula": String.raw`## Why it works
Count multiples: $\lfloor\frac{n}{p}\rfloor$ numbers up to $n$ contribute at least one factor $p$, $\lfloor\frac{n}{p^2}\rfloor$ contribute a second, and so on — the sum counts every factor exactly once. The digit-sum form comes from summing the base-$p$ representation across the floors.

## How to use it
Trailing zeros of $n!$ = $v_5(n!)$ (5s are scarcer than 2s). For binomial coefficients, subtract: $v_p\binom{n}{k} = v_p(n!) - v_p(k!) - v_p((n-k)!)$, or count carries (Kummer). The digit-sum form $\frac{n - s_p(n)}{p-1}$ answers "for which $n$ is $v_2(n!) = n - 1$" (powers of 2) instantly.

## On contests
"How many zeros does $2027!$ end in," "largest $k$ with $3^k \mid 100!$" — pure Legendre, constant AMC/AIME presence. Inverse problems ("$v_5(n!) = 31$ — find $n$, or show impossible") use the jump structure of the sum.`,

"kummers-theorem": String.raw`## Why it works
Write the subtraction $n = k + (n-k)$ in base $p$: each carry in the addition corresponds to one factor of $p$ surviving in $\binom{n}{k}$ — provable by applying Legendre's digit-sum form to all three factorials.

## How to use it
When Legendre-subtraction is messy, count carries instead: $v_2\binom{2n}{n}$ = number of 1s in binary $n$ (adding $n + n$ carries at every 1-bit). Divisibility questions about central binomials and Catalan numbers route through this.

## On contests
"For how many $n \le 1000$ is $\binom{2n}{n}$ odd" — never, for $n \ge 1$ (always a carry); "$\binom{2n}{n}$ not divisible by 4" — $n$ a power of 2. These carry-counting one-liners appear on AIME and Putnam-lite sets.`,

"lucas-theorem": String.raw`## Why it works
$(1+x)^{p^i} \equiv 1 + x^{p^i} \pmod p$ (freshman's dream); expanding $(1+x)^m$ over the base-$p$ digits of $m$ and matching coefficients digit-wise gives the product formula.

## How to use it
$\binom{m}{n} \bmod p$: write both in base $p$, multiply digit binomials (any digit of $n$ exceeding $m$'s gives 0). Parity special case: $\binom{m}{n}$ odd iff $n$'s binary 1s sit inside $m$'s — so row $m$ of Pascal's triangle has $2^{s_2(m)}$ odd entries.

## On contests
Pascal-parity questions (Sierpinski patterns), "how many $\binom{2027}{k}$ are divisible by small prime," and fast binomial-mod-p evaluations on AIME. For prime-power moduli, combine with more careful tools — Lucas alone is mod $p$ only.`,

"lte": String.raw`## Why it works
Factor $a^n - b^n = (a-b)(a^{n-1} + \cdots + b^{n-1})$: when $p \mid a - b$, each of the $n$ terms of the second factor is $\equiv a^{n-1} \pmod p$, so the factor contributes $v_p(n)$'s worth via a careful induction. The $p = 2$ anomaly comes from $-1$ being a square-ish unit mod 4.

## How to use it
Checklist before applying: odd $p$, $p \mid a - b$, $p \nmid a,b$. Then $v_p(a^n - b^n) = v_p(a-b) + v_p(n)$; for $a^n + b^n$ use odd $n$ with $p \mid a + b$. The $p = 2$ case has its own formula — misapplying it is the classic error.

## On contests
"Largest power of 3 dividing $4^{729} - 1$," "find $n$ so $2^n \| 13^{1024} - 1$" — AIME-level valuation problems collapse to one line. Also the structural tool behind order-lifting (order of $a$ mod $p^k$).`,

"primes-6k": String.raw`## Why it works
Mod 6, the classes $0, 2, 3, 4$ are divisible by 2 or 3 — only $\pm 1$ remain available for primes above 3. $p^2 \equiv 1 \pmod{24}$: check $\pm1, \pm5, \pm7, \pm11$ mod 24, or note $p^2 - 1 = (p-1)(p+1)$ is a product of consecutive evens around a multiple of 3.

## How to use it
Casework reducer: any argument over primes $> 3$ needs only two residue classes. The $24 \mid p^2 - 1$ fact resolves divisibility questions about prime squares instantly.

## On contests
"$p^2 - 1$ is always divisible by..." (24) is a direct AMC question; twin-prime and prime-gap puzzles use the $6k \pm 1$ frame to structure search and proof alike.`,

"floor-multiples": String.raw`## Why it works
The multiples of $d$ up to $n$ are $d, 2d, \dots, \lfloor\frac{n}{d}\rfloor d$ — counting them is dividing and flooring.

## How to use it
Combine with inclusion-exclusion for unions ("divisible by 3 or 5"), complements ("divisible by neither"), and exact conditions ("by 6 but not 9"). This plus Legendre covers most "how many numbers up to $N$..." questions. Ranges: count up to $b$, subtract count up to $a - 1$.

## On contests
Constant MATHCOUNTS/AMC presence, and the counting engine inside Legendre's formula, totient computations, and AIME lattice problems.`,

"prime-divides-binomial": String.raw`## Why it works
$\binom{p}{k} = \frac{p!}{k!(p-k)!}$: the numerator has one factor of $p$, and for $0 < k < p$ neither factorial below can cancel it.

## How to use it
Immediate consequence: the freshman's dream $(x + y)^p \equiv x^p + y^p \pmod p$ — the middle terms vanish. That powers induction proofs of Fermat's little theorem and digit-based expansions (Lucas). Also $\binom{p^k}{j} \equiv 0 \pmod p$ for $0 < j < p^k$.

## On contests
Appears as a lemma constantly: binomial expansions mod $p$, showing $p \mid 2^p - 2$, and prime-detection via Pascal's triangle rows (row $p$ is all multiples of $p$ inside).`,

"bertrands-postulate": String.raw`## Why it works
Proved by Chebyshev via binomial-coefficient estimates (Erdős's elementary proof analyzes prime factors of $\binom{2n}{n}$). For contest purposes: cite it.

## How to use it
Guarantees a prime in $(n, 2n)$ — enough for existence arguments ("some prime divides exactly one term"), bounding constructions, and showing $n!$ is never a perfect power for $n \ge 2$ (a prime in $(\frac{n}{2}, n]$ appears to the first power).

## On contests
Olympiad-leaning, but AIME-adjacent problems about primes in ranges or factorial factorizations sometimes want exactly this guarantee.`,

"chicken-mcnugget": String.raw`## Why it works
The numbers $ax + by$ with $x, y \ge 0$ hit every residue class mod $a$ starting from its smallest representative $by_r$; the largest gap is just below the largest smallest-representative, which computes to $ab - a - b$. Symmetry pairs representable $n$ with non-representable $ab - a - b - n$, giving the $\frac{(a-1)(b-1)}{2}$ count.

## How to use it
Requires $\gcd(a, b) = 1$ (otherwise only multiples of the gcd are ever representable — reduce first). For "which amounts exactly," work residue-by-residue mod the smaller number. Three denominations have no closed form — expect direct analysis.

## On contests
Coin/stamp problems on AMC 10/12 and AIME ("largest impossible score"). The symmetric pairing and the count of non-representables are both tested; remember both halves.`,

"pythagorean-triples": String.raw`## Why it works
A primitive triple has odd hypotenuse and one even leg; factoring $b^2 = c^2 - a^2 = (c-a)(c+a)$ with the two factors coprime-up-to-2 forces both to be (twice) squares — yielding the $m, n$ parametrization. Geometrically: rational points on the unit circle via lines through $(-1, 0)$.

## How to use it
Generate: coprime $m > n$, opposite parity. Structural facts for problems: exactly one leg divisible by 3, one by 4, one side by 5; area divisible by 6; inradius $r = n(m - n)\cdot$(scaling) — and for ANY right triangle with integer sides, $r$ is an integer.

## On contests
"How many right triangles with leg 15" (factor $15^2 = (c-b)(c+b)$), perimeter/area matching problems, and AIME counting of triples with a fixed element — all flow from the parametrization or the difference-of-squares factoring.`,

"pell-equation": String.raw`## Why it works
Units in $\mathbb{Z}[\sqrt D]$: if $(x_1, y_1)$ is the smallest solution, every solution is a power $(x_1 + y_1\sqrt D)^k$ because norms multiply ($N(u) = x^2 - Dy^2$ is multiplicative). Continued fractions of $\sqrt D$ find the fundamental solution.

## How to use it
From the fundamental solution, generate the rest by expanding $(x_1 + y_1\sqrt D)^k$ or by the recurrence $x_{k+1} = x_1x_k + Dy_1y_k$, $y_{k+1} = x_1y_k + y_1x_k$. Solutions grow exponentially — "the next solution after..." questions want exactly one multiplication.

## On contests
AIME problems about near-square pairs ($x^2 - 2y^2 = \pm1$-adjacent: triangular-square numbers, "$n$ and $\frac{n+1}{2}$ both squares") reduce to Pell orbits. Recognize the quadratic-in-two-variables-equals-constant shape and hunt the smallest solution by hand.`,

"sum-of-two-squares": String.raw`## Why it works
Primes $\equiv 1 \pmod 4$ split as $a^2 + b^2$ (via $x^2 \equiv -1$ existing and descent, or Gaussian integers); primes $\equiv 3 \pmod 4$ are inert and must pair up; the Brahmagupta-Fibonacci identity multiplies representations together.

## How to use it
Check the factorization: odd powers of any prime $\equiv 3 \pmod 4$ ⟹ not representable. The count of representations (ordered, with signs) is $4(d_1(n) - d_3(n))$ — divisors $\equiv 1$ minus $\equiv 3$ mod 4 — which counts lattice points on the circle $x^2 + y^2 = n$.

## On contests
"Which of these is a sum of two squares," lattice points on circles (AIME), and representation-count problems. The multiplicative structure (build reps from prime reps) computes explicit decompositions fast.`,

"factor-pair-counting": String.raw`## Why it works
Every representation of the equation in the form (linear factor)(linear factor) = constant corresponds to a divisor pair of the constant — and divisor pairs are counted by $d(N)$, adjusted for signs and symmetry.

## How to use it
Standard pipeline: SFFT (or direct factoring) → count divisor pairs of the right-hand constant → filter by constraints (positivity, ordering, parity — both factors must have matching parity when the variables demand it). Negative divisor pairs count when variables may be negative.

## On contests
"How many ordered pairs solve $\frac{1}{x} + \frac{1}{y} = \frac{1}{12}$" ($(x-12)(y-12) = 144$: $d(144) = 15$ positive pairs, plus negative-side analysis) — an AIME evergreen. The parity/positivity filtering is where care is needed.`,

"difference-of-squares-rep": String.raw`## Why it works
$n = (a-b)(a+b)$: the two factors have the same parity, so $n$ must be odd (both odd) or divisible by 4 (both even). Conversely, any valid factorization $n = st$ with $s \equiv t \pmod 2$ gives $a = \frac{s+t}{2}$, $b = \frac{t-s}{2}$.

## How to use it
Representable iff $n \not\equiv 2 \pmod 4$. Count representations by counting same-parity factor pairs — for odd $n$, that is $\lceil \frac{d(n)}{2}\rceil$ (unordered, allowing $b = 0$ when square). Each representation is a factorization; problems asking "in how many ways" are divisor counts.

## On contests
AMC "which numbers are differences of squares" and AIME counting versions. Also a Diophantine workhorse: equations like $x^2 - y^2 = k$ enumerate instantly through factor pairs.`,

"farey-sequences": String.raw`## Why it works
The determinant condition $bc - ad = 1$ says consecutive Farey fractions form a unimodular pair — no lattice point strictly between their vectors (Pick's theorem on the empty triangle). The mediant is the lattice vector sum, the unique "next" fraction between them.

## How to use it
Best-approximation problems: the fraction with smallest denominator between two given fractions is found by mediant descent (Stern-Brocot search). Neighbor condition answers "which fractions are adjacent to $\frac{a}{b}$": solve $bc - ad = 1$. Counting: $|F_n| = 1 + \sum_{k\le n}\varphi(k)$.

## On contests
AIME problems on fractions with bounded denominators ("smallest denominator between..."), and the hidden structure in ford-circle/mediant configurations. The unimodular determinant is the fact to reach for.`,

"repeating-decimals": String.raw`## Why it works
A purely repeating block of length $k$ is a geometric series with ratio $10^{-k}$, summing to $\frac{\text{block}}{10^k - 1}$ — the string of $k$ nines. Period = order of 10 mod the reduced denominator (after stripping factors of 2 and 5, which cause pre-period).

## How to use it
Convert either direction fluently: $0.\overline{57} = \frac{57}{99} = \frac{19}{33}$; mixed forms shift by powers of 10. Period questions are order computations: period of $\frac{1}{7^2}$ is $\operatorname{ord}_{49}(10) = 42$. Cyclic-number phenomena ($142857$) come from full-period primes.

## On contests
AIME regularly builds problems on $\frac{1}{n}$ periods, digit sums of repeating blocks, and "$0.\overline{abc}$ with distinct digits" enumerations over $\frac{k}{999} = \frac{k}{27 \cdot 37}$.`,

"terminating-decimals": String.raw`## Why it works
Terminating with $k$ decimals means $10^k \cdot \frac{m}{n}$ is an integer, i.e. $n \mid 10^k$ — so $n$'s primes are only 2 and 5, and $k = \max(a, b)$ suffices.

## How to use it
Reduce the fraction FIRST — $\frac{3}{6}$ terminates. Counting problems ("how many $\frac{1}{n}$ for $n \le 100$ terminate") count numbers of the form $2^a5^b$. Mixed pre-period/period structure: factors of 2, 5 give the pre-period length, the rest gives the period.

## On contests
AMC counting questions and AIME hybrids ("$\frac{k}{2020}$ terminates for how many $k$" — depends on cancellation against the 101). The reduce-first trap is the tested subtlety.`,

"base-conversion": String.raw`## Why it works
Positional notation is a polynomial in the base; conversion is evaluation (to base 10) or repeated division with remainders (from base 10 — the remainders are the digits, least significant first).

## How to use it
Digit-condition problems become polynomial equations in $b$ ("$\overline{abc}_b = $ something" → quadratic in $b$). Useful structural facts: $b^k$ is 1 followed by $k$ zeros; $b^k - 1$ is $k$ copies of the top digit; numbers with all digits equal factor as digit × repunit.

## On contests
"In what base does $x^2 = \overline{XYZ}$" and palindrome-across-bases problems (AMC/AIME staples). Also binary/ternary tricks: Zeckendorf-like digit arguments, base-2 for subset weights, base-3 for balanced ternary (weights problems).`,

"lattice-points-gcd": String.raw`## Why it works
Parametrize the segment: interior lattice points occur at parameter values $\frac{j}{g}$ with $g = \gcd(a, b)$ — the direction vector $\frac{(a, b)}{g}$ is the primitive step, taken $g$ times.

## How to use it
Boundary counts for Pick's theorem: each polygon edge contributes $\gcd(|\Delta x|, |\Delta y|)$ lattice points (counting one endpoint). "Visible from the origin" = primitive vectors = $\gcd = 1$, connecting to totient counts and the $\frac{6}{\pi^2}$ density.

## On contests
Diagonal-through-grid problems ("how many unit squares does the diagonal of an $m \times n$ rectangle cross": $m + n - \gcd(m,n)$ — same primitive-step idea) and every Pick's theorem application.`,

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
Olympiad tool ("find all $n$ such that $2^n - 1$ divides..."). AIME rarely needs it, but recognizing when a smaller tool (orders, LTE) suffices vs. when Zsygmondy is the honest reason marks mature problem-solving.`,

"fermat-numbers": String.raw`## Why it works
$F_n = 2^{2^n} + 1$: the product identity $F_0F_1\cdots F_{n-1} = F_n - 2$ follows by telescoping $(2^{2^k} - 1)(2^{2^k} + 1) = 2^{2^{k+1}} - 1$. Any common divisor of two Fermat numbers divides 2 — but all are odd, so they are pairwise coprime.

## How to use it
Pairwise coprimality gives infinitude of primes (each $F_n$ owns new primes). Structure facts: $2^m + 1$ can be prime only when $m$ is a power of 2 (else factor via odd-exponent sum); known Fermat primes are 3, 5, 17, 257, 65537 — and constructible polygons come from products of these.

## On contests
Factoring $2^{32} - 1 = 3 \cdot 5 \cdot 17 \cdot 257 \cdot 65537$ via the telescoping product is a beloved AMC/AIME move; coprimality arguments and "when is $2^m + 1$ prime" reasoning recur.`,

"continued-fraction-convergents": String.raw`## Why it works
Convergents $\frac{p_k}{q_k}$ satisfy the recurrence $p_k = a_kp_{k-1} + p_{k-2}$ (same for $q$), and the determinant identity $p_kq_{k-1} - p_{k-1}q_k = (-1)^{k-1}$ follows by induction — each step is a unimodular matrix multiplication.

## How to use it
Best rational approximations with bounded denominator are convergents — the tool for "closest fraction to $\pi$ with denominator under 100" questions. The determinant identity gives instant solutions to $ax - by = \pm1$ (Bézout via continued fractions), and consecutive convergents are Farey neighbors.

## On contests
Approximation problems and Pell-equation fundamentals ($\sqrt D$'s continued fraction finds the fundamental solution). Also underlies Stern-Brocot/mediant search arguments on AIME-level fraction problems.`,

"digit-count": String.raw`## Why it works
$n$ has $d$ digits iff $10^{d-1} \le n < 10^d$; taking $\log_{10}$ gives $d = \lfloor\log_{10} n\rfloor + 1$. Same in any base with $\log_b$.

## How to use it
Digit counts of huge numbers via logs: $2^{100}$ has $\lfloor 100\log_{10}2\rfloor + 1 = 31$ digits ($\log_{10}2 \approx 0.30103$ — memorize it, plus $\log_{10}3 \approx 0.47712$). Leading digits come from the fractional part of the log (e.g. $10^{0.0103} \approx 1.02$ → leading digit 1).

## On contests
"How many digits does $5^{2027}$ have," "how many powers of 2 have leading digit 7 below $2^{1000}$" — AMC 12/AIME logarithm problems. The pair $\log 2, \log 3$ generates enough to evaluate most such questions.`

});

// Entries added from the 2023-2025 AMC/AIME sweep.
Object.assign(window.MATH_DETAILS, {

"hensel-lifting": String.raw`## Why it works
Taylor-expand around the known root: $f(a + pt) = f(a) + pt f'(a) + p^2(\cdots)$. Modulo $p^2$ the tail vanishes, and since $p \mid f(a)$, the condition $f(a+pt) \equiv 0 \pmod{p^2}$ is the linear congruence $\frac{f(a)}{p} + t f'(a) \equiv 0 \pmod p$ — uniquely solvable for $t$ exactly when $f'(a) \not\equiv 0$.

## How to use it
To solve $f(x) \equiv 0 \pmod{p^2}$: solve mod $p$ first, then lift each simple root by substituting $x = a + pt$ and expanding with the binomial theorem (only linear terms in $t$ survive). Iterate for higher powers. For $x^k \equiv -1$ type problems, first decide which primes admit solutions mod $p$ at all (order conditions: $2k \mid p - 1$), then lift.

## On contests
2024 AIME I #13 is the model: $n^4 \equiv -1 \pmod{p^2}$ requires $8 \mid p-1$ (least $p = 17$), and lifting the root $n \equiv 2$ from mod 17 to mod 289 gives $m = 110$. Older AIME problems about "$a_n$ stabilizing mod $2^n$" (2023 AIME II #15) run the same lifting logic through powers of 2.`

});

Object.assign(window.MATH_DETAILS, {

"carmichael-function": String.raw`## Why it works
The multiplicative group mod $p^k$ is cyclic for odd $p$ (so $\lambda = \varphi$ there), but mod $2^k$ ($k \ge 3$) it is a product of a group of order 2 and a cyclic group of order $2^{k-2}$ — whence the smaller exponent. CRT splits the group mod $n$ into the prime-power pieces, and the universal exponent of a product is the lcm of the pieces' exponents.

## How to use it
For "last $k$ digits of a huge power" problems, reduce the exponent mod $\lambda(10^k)$ instead of $\varphi(10^k)$: $\lambda(1000) = 100$ versus $\varphi(1000) = 400$. For power towers, iterate down the tower with $\lambda$ at each level. Remember the special cases $\lambda(2) = 1$, $\lambda(4) = 2$ and the lcm (not product) combination rule.

## On contests
AIME tower-of-exponents problems reward $\lambda$ heavily — a $4\times$ smaller modulus at each level compounds. Euler's theorem is never wrong, just slower; $\lambda$ is the sharp version of the same idea.`

});

Object.assign(window.MATH_DETAILS, {

"floor-sum-reciprocity": String.raw`## Why it works
$\lfloor \frac{kp}{q} \rfloor$ counts lattice points $(k, j)$ with $1 \le j \le \frac{kp}{q}$ — the points strictly below the diagonal of the $q \times p$ rectangle in column $k$. Coprimality keeps the diagonal off the lattice, and the $180^\circ$ symmetry of the rectangle pairs each interior point below the diagonal with one above, splitting $(p-1)(q-1)$ evenly.

## How to use it
Evaluate floor sums over a full period instantly; for partial ranges, pair $k$ with $q - k$ using $\lfloor \frac{kp}{q} \rfloor + \lfloor \frac{(q-k)p}{q} \rfloor = p - 1$. The lattice-counting viewpoint generalizes: sums of floors = points under a line, so Pick-style arguments and symmetry both apply.

## On contests
AIME floor-sum problems (often dressed as "sum of remainders": $\sum (kp \bmod q)$ converts via $kp = q\lfloor \cdot \rfloor + \text{rem}$). Also the key lemma inside Eisenstein's proof of quadratic reciprocity — the same pairing, one level deeper.`

});

Object.assign(window.MATH_DETAILS, {

"lattice-points-circle": String.raw`## Why it works
In the Gaussian integers $\mathbb{Z}[i]$, $a^2 + b^2 = (a+bi)(a-bi)$, and unique factorization sorts primes into split ($p \equiv 1 \bmod 4$, contributing choices), inert ($p \equiv 3$, demanding even exponents), and ramified ($2$). Counting the factorization choices yields $4(d_1 - d_3)$, the 4 being unit rotations $\pm1, \pm i$.

## How to use it
Count representations without finding them: compute $d_1(n) - d_3(n)$ over the divisors. Practical shortcuts: powers of split primes give $e+1$ essentially-different representations; any prime $\equiv 3 \pmod 4$ to an odd power kills everything; factors of 2 and squares of inert primes just scale existing points.

## On contests
"How many lattice points on $x^2 + y^2 = 2025$" — direct plug-in. Also the cleaner route to "in how many ways is $n$ a sum of two squares" (divide out symmetries carefully: the $4(d_1-d_3)$ count is ordered and signed).`

});

Object.assign(window.MATH_DETAILS, {

"vp-factorial": String.raw`## Why it works
Among $1, 2, \dots, n$ there are $\lfloor \frac{n}{p} \rfloor$ multiples of $p$, each contributing at least one factor; the multiples of $p^2$ contribute a second (already counted once, so add them again); and so on. Each number ends up counted exactly as many times as its own power of $p$ — no double counting, no misses.

## How to use it
Run the divisions mechanically and stop as soon as $p^k$ exceeds $n$ — usually three or four terms. Standard applications: trailing zeros of $n!$ (use $p = 5$), "does $p^k$ divide $n!$" (compare with the sum), and prime powers in binomial coefficients (compute for all three factorials and subtract, or count base-$p$ carries via Kummer). For huge $n$, the digit-sum shortcut $v_p(n!) = \frac{n - s_p(n)}{p-1}$ on Legendre's page skips the divisions entirely.

## On contests
"How many zeros does $2025!$ end in" and "find the largest $k$ with $7^k \mid 100!$" appear from MATHCOUNTS through AIME, and the subtraction version handles every "is $\binom{n}{k}$ divisible by $p$" question. This is the computational recipe; see Legendre's Formula for the closed form and theory.`

});

Object.assign(window.MATH_DETAILS, {

"recognition-numbers": String.raw`## Why it works
Nothing deep — pure pattern recognition. The fake primes are products of two primes between 7 and 19, which is exactly the range trial division by 2, 3, 5 misses; $1001 = 7 \cdot 11 \cdot 13$ explains why $\overline{abcabc} = \overline{abc} \cdot 1001$ is always divisible by 7, 11, and 13; and $2^{10} \approx 10^3$ converts between binary and decimal scales.

## How to use it
Factor-check any three-digit number by testing 7, 11, 13, 17, 19 after the obvious small primes — the fake-prime list is what those tests catch. The repunit family ($111 = 3 \cdot 37$, $999 = 27 \cdot 37$, $10101 = 3 \cdot 7 \cdot 13 \cdot 37$) cracks repeated-digit numbers. The root and log estimates ($\sqrt2, \sqrt3, \sqrt5$, $\log_{10} 2 \approx 0.301$, $\log_{10} 3 \approx 0.477$) settle size-comparison and digit-count questions without computation.

## On contests
Answer-extraction speed: AIME answers frequently require factoring numbers like $221$ or $299 = 13 \cdot 23$ under time pressure, and AMC estimation problems lean on $2^{10} \approx 10^3$. Thirty seconds of memorization repays itself on nearly every contest.`

});

Object.assign(window.MATH_DETAILS, {

"gcd-substitution": String.raw`## Why it works
Dividing $a$ and $b$ by their gcd leaves quotients with no common factor — that's what "greatest" means. Everything about the pair then splits cleanly: $\operatorname{lcm}(a,b) = dxy$ because $x$ and $y$ share nothing, $ab = d^2xy = \gcd \cdot \operatorname{lcm}$ falls out immediately, and any equation in $a, b$ becomes an equation in $d$ and the coprime pair $(x, y)$.

## How to use it
Write $a = dx$, $b = dy$ the moment a problem mentions gcd or lcm — before doing anything else. Given $\gcd$ and $\operatorname{lcm}$, the pairs $(x, y)$ are the coprime factorizations of $\frac{\operatorname{lcm}}{\gcd}$, and there are exactly $2^{\omega}$ ordered ones ($\omega$ = number of distinct primes of $\frac{\operatorname{lcm}}{\gcd}$), since each prime's whole block goes entirely to $x$ or entirely to $y$. Sum conditions like $a + b = d(x + y)$ hand you a factor of the sum for free.

## On contests
The standard opener for "gcd + lcm + one more condition" problems at every level: count the pairs, minimize the sum, match a given product. MATHCOUNTS uses it with concrete numbers; AIME versions layer it with divisor counting — after substituting, everything reduces to prime-block bookkeeping on $xy$.`,

"choose-modulus": String.raw`## Why it works
A true equation over the integers stays true mod every $m$. Residue classes of powers are sparse — squares hit only $\{0,1\}$ mod 4 and $\{0,1,4\}$ mod 8, cubes only $\{0, \pm1\}$ mod 9, fourth powers only $\{0,1\}$ mod 16 — so a well-chosen modulus can make one side land in a set the other side never touches.

## How to use it
Match the modulus to the exponents present: squares → mod 4 or 8, cubes → mod 9 (or 7), fourth powers → mod 16, digit information → mod 9 or 11, last digits → mod 10, factorials beyond $p!$ → mod $p$ (they vanish). Check the finitely many residues of each side; an empty intersection kills the equation, a forced residue kills cases (e.g. "$x$ must be even — write $x = 2x'$ and descend").

## On contests
The first thing to try on "show no solutions exist" and on narrowing AIME Diophantine searches. Also the engine behind parity arguments — mod 2 is the simplest instance. If mod 4, 8, 9, and 16 all fail to break the equation, switch tools: size/bounding arguments or factoring usually take over.`,

"digit-manipulation": String.raw`## Why it works
Base-10 notation *is* the polynomial $\overline{abc} = 100a + 10b + c$. Reversal identities follow at once: $\overline{ab} + \overline{ba} = 11(a+b)$ and $\overline{ab} - \overline{ba} = 9(a - b)$, which is why digit-reversal problems always run through 9 and 11.

## How to use it
Name the digits, translate the condition into an equation, and exploit the brutal bounds $1 \le a \le 9$, $0 \le b \le 9$ — most digit equations have only a handful of solutions once you isolate a digit. For three digits, $\overline{abc} - \overline{cba} = 99(a - c)$: the middle digit vanishes. Divisibility conditions convert via mod 9 (digit sum) and mod 11 (alternating sum).

## On contests
A MATHCOUNTS and early-AMC staple: "a number equals $k$ times its digit sum," reversal differences, digits forming arithmetic sequences. The layered AMC version runs the same translation in another base $b$ — same polynomial, different radix, and comparing representations across bases gives systems in the digits.`,

"squeeze-between-squares": String.raw`## Why it works
Perfect squares are spaced increasingly far apart — the gap between $n^2$ and $(n+1)^2$ is $2n + 1$. Any integer trapped strictly inside such a gap cannot be a square, and every integer $N$ in $[n^2, (n+1)^2)$ has $\lfloor \sqrt N \rfloor = n$ exactly.

## How to use it
Given a polynomial-like expression suspected of never being square, guess the near-root — for $n^4 + 2n^3 + \dots$ try $(n^2 + n + c)^2$ for small $c$ — and verify strict inequalities on both sides. Two subtleties: check small cases separately (the squeeze often starts only from some $n_0$), and when the expression *can* equal the boundary square, those become exactly the solution cases. The same template works for cubes and for trapping between $k(k+1)$-type products.

## On contests
The closer for "find all $n$ making this a perfect square" — squeeze for large $n$, hand-check the small survivors. AIME also uses the floor version directly: computing $\lfloor \sqrt{N} \rfloor$ for messy $N$ means finding which consecutive squares bracket it.`

});

Object.assign(window.MATH_DETAILS, {

"vieta-jumping": String.raw`## Why it works
If a symmetric condition is quadratic in each variable separately, then fixing all but one variable makes the remaining one a root of a quadratic — and Vieta hands you the *other* root for free: $a' = kb - a = \frac{b^2 - N}{a}$, automatically an integer (from the sum) and with controllable sign and size (from the product). Starting from a minimal solution, the jump must either exit the allowed region — a contradiction — or hit a boundary case that pins down the constant.

## How to use it
The ritual: (1) suppose the quantity $k$ is an integer and take a solution $(a, b)$ with $a + b$ minimal, WLOG $a \ge b$; (2) treat the condition as a quadratic in $a$ and name the second root $a'$ via Vieta's sum and product; (3) show $a'$ is an integer, nonnegative, and smaller than $a$; (4) minimality forces the degenerate case ($a' = 0$ or $a' = b$), and evaluating there reveals what $k$ must be. The product form of $a'$ gives the size bound; the sum form gives integrality.

## On contests
Purely an olympiad weapon — the famous IMO 1988 Problem 6 ($\frac{a^2+b^2}{ab+1}$ is always a perfect square) is its coronation, and it has settled many divisibility problems of the shape $xy \mid x^2 + y^2 + c$ since. Recognize the trigger: a symmetric fraction of quadratics asserted to be a positive integer. Below olympiad level it never appears; it's here so the pattern is recognizable when self-studying.`

});

Object.assign(window.MATH_DETAILS, {

"trailing-zeros": String.raw`## Why it works
A trailing zero is a factor of $10 = 2 \cdot 5$, so the number of them is $\min(v_2(n!), v_5(n!))$. In any factorial there are always more factors of $2$ than of $5$ (every other number is even, only every fifth is a multiple of $5$), so the minimum is always $v_5(n!)$ — Legendre's formula with $p = 5$.

## How to use it
Sum $\left\lfloor \frac{n}{5} \right\rfloor + \left\lfloor \frac{n}{25} \right\rfloor + \left\lfloor \frac{n}{125} \right\rfloor + \cdots$ until the terms hit zero. For trailing zeros in another base $b$, factor $b = \prod p_i^{a_i}$, compute $\left\lfloor \frac{v_{p_i}(n!)}{a_i} \right\rfloor$ for each prime, and take the minimum — e.g. base $12 = 2^2 \cdot 3$ is limited by whichever of $\lfloor v_2/2 \rfloor$, $v_3$ is smaller.

## On contests
A perennial MATHCOUNTS and early-AMC item ("how many zeros does $100!$ end in?"), and a building block inside harder valuation problems. The base-$b$ generalization and the reverse question ("for which $n$ does $n!$ end in exactly $k$ zeros?", which can have $0$ or $5$ answers) are the standard twists.`,

"pisano-periods": String.raw`## Why it works
A Fibonacci term mod $m$ is determined by the pair $(F_{n-1}, F_n) \bmod m$, and there are only $m^2$ possible pairs, so the sequence of pairs must eventually repeat. Because the recurrence $F_{n-1} = F_{n+1} - F_n$ runs backward as cleanly as forward, the repetition can't start late — it cycles from the very beginning, giving a pure period $\pi(m)$.

## How to use it
To find $F_n \bmod m$, compute the period $\pi(m)$ (list terms mod $m$ until $0, 1$ reappears), then reduce the index: $F_n \equiv F_{n \bmod \pi(m)}$. Handy values: $\pi(10) = 60$ governs last digits, $\pi(2) = 3$ (parity: even every third term), $\pi(5) = 20$. For composite $m$, $\pi$ is the lcm of the periods of its prime-power factors.

## On contests
An olympiad and hard-AIME tool for "last digit of $F_{2024}$" or "for which $n$ is $F_n$ divisible by $m$" questions. The key recognitions: last digits cycle with period $60$, and divisibility of $F_n$ by $m$ is itself periodic in $n$.`,

"exponent-tracking": String.raw`## Why it works
By unique factorization, a positive integer is exactly its vector of prime exponents. Multiplication adds these vectors, gcd takes the coordinatewise minimum, lcm the maximum, a perfect $k$-th power means every coordinate is divisible by $k$, and $d(n)$ multiplies the $(e_i + 1)$. Crucially, distinct primes never interact — so a condition on the whole number decomposes into one independent condition per prime.

## How to use it
Write each unknown as $\prod p^{e_i}$ and rewrite every hypothesis as a per-prime constraint: gcd/lcm become $\min$/$\max$ equations, "is a perfect square" becomes "all exponents even," a divisibility becomes an inequality. Solve each prime's tiny problem separately and multiply the counts. For "count the pairs/triples with these gcd and lcm" problems, each prime contributes a small independent factor — usually $2$ (which of two numbers holds the max) or a short casework — and the answer is their product.

## On contests
The standard AIME approach to gcd/lcm counting and to "how many divisors of $N$ satisfy ...". It also settles perfect-power questions (make all exponents divisible by $k$) and divisor-count problems. The reflex: the moment a problem mixes gcd, lcm, products, or powers, switch to exponent vectors and work one prime at a time.`

});

Object.assign(window.MATH_DETAILS, {

"sum-of-three-squares": String.raw`## Why it works
Squares are $0, 1, 4 \pmod 8$, so three of them can total at most a limited set of residues — and $7 \bmod 8$ is unreachable. If $n \equiv 7 \pmod 8$ fails, so does $4n$: any representation of $4n$ must have all three squares even (since a sum of three squares $\equiv 0 \bmod 4$ forces all even), and dividing by $4$ would produce a representation of $n$. That descent generates the whole excluded family $4^k(8m+7)$. Legendre's theorem says these are the only failures, and Lagrange's four-square theorem then covers them with one extra square.

## How to use it
To test $n$: strip factors of $4$ repeatedly, then check whether what remains is $\equiv 7 \pmod 8$. If yes, three squares are impossible and four are needed; otherwise three suffice. Remember zero counts as a square, so "three squares" includes representations that really use one or two. Pair this with the two-square criterion (a positive integer is a sum of two squares iff every prime $\equiv 3 \pmod 4$ appears to an even power) to know exactly how many squares a given $n$ requires.

## On contests
Mostly an olympiad-level classification tool and a fast way to rule out cases in a Diophantine problem. The mod-8 argument itself — squares are $0, 1, 4 \bmod 8$ — is far more broadly useful than the theorem, and is worth reaching for whenever an equation mixes three squares.`,

"bounding-diophantine": String.raw`## Why it works
In a symmetric equation, ordering the variables costs nothing (multiply the count by the permutations at the end) but gains a lot: the smallest variable now carries the largest share of any sum of decreasing terms. That share is at least $\frac{1}{k}$ of the total across $k$ variables, which pins the smallest variable inside a tiny range. Fixing it reduces the problem by one variable, and the recursion bottoms out in finitely many checks.

## How to use it
State the WLOG ordering explicitly, then bound the extreme variable by comparing it against the total: for $\frac1x + \frac1y + \frac1z = 1$ with $x \le y \le z$, we get $1 \le \frac{3}{x}$ so $x \le 3$, and $\frac1x < 1$ so $x \ge 2$. Enumerate each surviving value, substitute, and repeat on the smaller equation — often the two-variable step factors via SFFT. Finally, restore all permutations of each unordered solution. The same tactic bounds variables in $xyz = x + y + z$ and in equations where one side grows much faster than the other (compare growth rates to cap the exponent, then finite-check).

## On contests
The standard finisher for unit-fraction (Egyptian fraction) problems and small symmetric Diophantine systems on AIME and olympiads. It is the size-based complement to the modular approach: use a modulus to prove no solutions exist, and bounding to prove only finitely many do — then list them.`

});
