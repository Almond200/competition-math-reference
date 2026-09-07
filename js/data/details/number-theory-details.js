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
The silent workhorse — most divisor/totient computations implicitly use it. Stated problems test the warning: multiplicativity needs coprimality ($\varphi(4) \ne \varphi(2)\varphi(2)$).`,

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

"crt": String.raw`## Key forms
- a system $x\equiv a_i\pmod{n_i}$ with the moduli pairwise coprime has exactly one solution modulo $N=\prod n_i$ — existence and uniqueness together, which is what lets you split a problem into one congruence per prime power
- the constructive form is $x=\sum_i a_iN_iM_i$ with $N_i=N/n_i$ and $M_i\equiv N_i^{-1}\pmod{n_i}$, since each term is $a_i$ modulo $n_i$ and $0$ modulo every other $n_j$
- in practice it is usually faster to iterate two at a time: from $x\equiv a\pmod m$ write $x=a+mt$ and substitute into the next congruence to pin $t$

## Why it works
The map $x \mapsto (x \bmod n_1, \dots, x \bmod n_k)$ from residues mod $N=\prod n_i$ to tuples is injective (a difference divisible by all pairwise-coprime $n_i$ is divisible by their product) and both sides have $N$ elements — so it is a bijection. Every combination of remainders occurs for exactly one residue mod $N$.

## How to use it
Splitting is the everyday use: a question mod $1000$ becomes mod $8$ and mod $125$, solved separately and recombined. Counting multiplies: solutions mod $mn=$ (solutions mod $m$)$\times$(solutions mod $n$) for coprime $m,n$. If the moduli are not coprime, a solution exists iff the congruences agree on every common factor.

Iterate two at a time: from $x\equiv a\pmod m$ write $x=a+mt$ and substitute into the next congruence to pin $t$. Or use the closed form $x\equiv\sum_i a_i M_i y_i\pmod N$, where $M_i=N/n_i$ and $y_i\equiv M_i^{-1}\pmod{n_i}$ — each term is $a_i$ mod $n_i$ and $0$ mod the rest. Example: $x\equiv 2\ (3),\ 3\ (5),\ 2\ (7)$ gives $x\equiv 23\pmod{105}$.

## On contests
Everywhere in AIME number theory: last-three-digit problems, "find $x$ with these remainders," and counting solutions of polynomial congruences prime-power by prime-power. The split-solve-recombine rhythm should be automatic.`,

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

"lte": String.raw`## Key forms
- for an odd prime $p$ dividing $a-b$ but neither $a$ nor $b$, the exponent of $p$ in $a^n-b^n$ is $v_p(a-b)+v_p(n)$ — so a whole power-divisibility question reduces to two much easier valuations
- the prime $2$ is the exception and needs its own statement: for even $n$, $v_2(a^n-b^n)=v_2(a-b)+v_2(a+b)+v_2(n)-1$
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

"thues-lemma": String.raw`## Why it works
Pigeonhole. Consider the $(\lfloor\sqrt n\rfloor + 1)^2 > n$ numbers $ai - j$ for $0 \le i, j \le \lfloor\sqrt n\rfloor$. Two must be congruent mod $n$; subtracting gives $a(i_1 - i_2) \equiv (j_1 - j_2) \pmod n$ with both differences at most $\sqrt n$ in absolute value and not both zero — exactly the promised $x \equiv ay$ with $|x|, |y| \le \sqrt n$.

## How to use it
The elementary route to representation theorems. For $p \equiv 1 \pmod 4$, $-1$ is a quadratic residue, so pick $a$ with $a^2 \equiv -1$; then Thue's $x \equiv ay$ gives $x^2 \equiv a^2 y^2 \equiv -y^2$, so $p \mid x^2 + y^2$, and since $0 < x^2 + y^2 < 2p$ it equals $p$. The same move with $a^2 \equiv -2$ or $-3$ produces $x^2 + 2y^2$ and $x^2 + 3y^2$ representations.

## On contests
An olympiad tool — the standard "no Gaussian integers required" proof of Fermat's two-squares theorem, and a clean way to force a bounded solution of a modular condition into existence when a problem needs one.`,

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

"hensel-lifting": String.raw`## Key forms
- $f(a+pt)\equiv f(a)+pt\,f'(a)\pmod{p^2}$ — everything past the linear term vanishes, so the lift is linear
- $\frac{f(a)}{p}+t\,f'(a)\equiv0\pmod p$ — solve this for $t$; it has a unique solution exactly when $f'(a)\not\equiv0\pmod p$
- $f'(a)\equiv0\pmod p$ is the singular case — the lift then either fails or splits into $p$ solutions, so check the derivative before starting

## Why it works
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
For "last $k$ digits of a huge power" problems, reduce the exponent mod $\lambda(10^k)$ instead of $\varphi(10^k)$: $\lambda(1000) = 100$ versus $\varphi(1000) = 400$. For power towers, iterate down the tower with $\lambda$ at each level. Remember the special cases $\lambda(2) = 1$, $\lambda(4) = 2$ and the lcm (not product) combination rule. Since $\lambda(n)\mid\varphi(n)$ always, using $\lambda$ can only sharpen Euler's theorem, never weaken it — and the true order of any particular $a$ divides $\lambda(n)$ in turn.

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
"How many lattice points on $x^2 + y^2 = 2025$" — direct plug-in. Also the cleaner route to "in how many ways is $n$ a sum of two squares" (divide out symmetries carefully: the $4(d_1-d_3)$ count is ordered and signed).`,

"gaussian-integers": String.raw`## Why it works
$\mathbb{Z}[i]$ is a Euclidean domain — you can divide with remainder by rounding to the nearest Gaussian integer — so it has unique factorization. The norm $N(a+bi) = a^2+b^2 = (a+bi)(a-bi)$ is multiplicative because it is $|z|^2$, which turns questions about sums of two squares into questions about factorization. A rational prime $p$ behaves by whether $-1$ is a quadratic residue mod $p$: $p \equiv 1 \pmod 4$ makes $x^2 \equiv -1$ solvable, so $p \mid (x+i)(x-i)$ splits; $p \equiv 3 \pmod 4$ stays prime; and $2 = -i(1+i)^2$ ramifies.

## How to use it
Reach for $\mathbb{Z}[i]$ whenever $a^2+b^2$ appears: factor it as $(a+bi)(a-bi)$ and lean on unique factorization. This proves Fermat's two-squares theorem, powers the $4(d_1 - d_3)$ representation count, parametrizes Pythagorean triples via $(m+ni)^2$, and multiplies sums of two squares together (Brahmagupta–Fibonacci). The Eisenstein integers $\mathbb{Z}[\omega]$ do the same for $a^2+ab+b^2$ and problems with cube-root-of-unity (120°) symmetry.

## On contests
Chiefly an olympiad tool, but its consequences reach the AIME (sum-of-two-squares counts, Pythagorean-triple parametrizations). The practical takeaway: primes $\equiv 1 \pmod 4$ split (and are sums of two squares), while primes $\equiv 3 \pmod 4$ stay inert.`

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

"gcd-substitution": String.raw`## Key forms
- write $a=dx$ and $b=dy$ where $d=\gcd(a,b)$, and the quotients are automatically coprime — that is exactly what "greatest" means, and it is why every condition on the pair simplifies afterwards
- coprimality makes the derived quantities immediate: $\operatorname{lcm}(a,b)=dxy$, hence $ab=\gcd\cdot\operatorname{lcm}$, and $a+b=d(x+y)$
- given the gcd and lcm, the pairs $(x,y)$ are the coprime factorisations of $\frac{\operatorname{lcm}}{\gcd}$, and there are $2^{\omega}$ ordered ones since each prime's whole block must go entirely to $x$ or entirely to $y$

## Why it works
Dividing $a$ and $b$ by their gcd leaves quotients with no common factor — that's what "greatest" means. Everything about the pair then splits cleanly: $\operatorname{lcm}(a,b) = dxy$ because $x$ and $y$ share nothing, $ab = d^2xy = \gcd \cdot \operatorname{lcm}$ falls out immediately, and any equation in $a, b$ becomes an equation in $d$ and the coprime pair $(x, y)$.

## How to use it
Write $a = dx$, $b = dy$ the moment a problem mentions gcd or lcm — before doing anything else. Given $\gcd$ and $\operatorname{lcm}$, the pairs $(x, y)$ are the coprime factorizations of $\frac{\operatorname{lcm}}{\gcd}$, and there are exactly $2^{\omega}$ ordered ones ($\omega$ = number of distinct primes of $\frac{\operatorname{lcm}}{\gcd}$), since each prime's whole block goes entirely to $x$ or entirely to $y$. Sum conditions like $a + b = d(x + y)$ hand you a factor of the sum for free.

## On contests
The standard opener for "gcd + lcm + one more condition" problems at every level: count the pairs, minimize the sum, match a given product. MATHCOUNTS uses it with concrete numbers; AIME versions layer it with divisor counting — after substituting, everything reduces to prime-block bookkeeping on $xy$.`,

"choose-modulus": String.raw`## Key forms
- powers occupy very few residues, which is what makes a well-chosen modulus decisive: squares are $0,1$ mod $4$ and $0,1,4$ mod $8$; cubes are $0,\pm1$ mod $9$; fourth powers are $0,1$ mod $16$
- a true equation over the integers stays true modulo every $m$, so if the two sides can never agree modulo some $m$, the equation has no solutions at all — this is how "prove no solutions exist" problems are usually killed
- match the modulus to the exponents present, and remember the other outcome: a forced residue that does not kill the equation still kills cases, as when $x$ must be even and you substitute $x=2x'$ and descend

## Why it works
A true equation over the integers stays true mod every $m$. Residue classes of powers are sparse — squares hit only $\{0,1\}$ mod 4 and $\{0,1,4\}$ mod 8, cubes only $\{0, \pm1\}$ mod 9, fourth powers only $\{0,1\}$ mod 16 — so a well-chosen modulus can make one side land in a set the other side never touches.

## How to use it
Match the modulus to the exponents present: squares → mod 4 or 8, cubes → mod 9 (or 7), fourth powers → mod 16, digit information → mod 9 or 11, last digits → mod 10, factorials beyond $p!$ → mod $p$ (they vanish). Check the finitely many residues of each side; an empty intersection kills the equation, a forced residue kills cases (e.g. "$x$ must be even — write $x = 2x'$ and descend").

## On contests
The first thing to try on "show no solutions exist" and on narrowing AIME Diophantine searches. Also the engine behind parity arguments — mod 2 is the simplest instance. If mod 4, 8, 9, and 16 all fail to break the equation, switch tools: size/bounding arguments or factoring usually take over.`,

"digit-manipulation": String.raw`## Key forms
- write the number as its place-value polynomial, $\overline{abc}=100a+10b+c$, which turns a digit condition into an ordinary equation in the digits
- a number plus its reversal always factors through $11$ and a number minus its reversal through $9$: $\overline{ab}+\overline{ba}=11(a+b)$ and $\overline{ab}-\overline{ba}=9(a-b)$, while for three digits $\overline{abc}-\overline{cba}=99(a-c)$ drops the middle digit entirely
- the bounds do most of the work, since $1\le a\le9$ and $0\le b,c\le9$ leave only a handful of candidates once one digit is isolated

## Why it works
Base-10 notation is the polynomial $\overline{abc} = 100a + 10b + c$. Reversal identities follow at once: $\overline{ab} + \overline{ba} = 11(a+b)$ and $\overline{ab} - \overline{ba} = 9(a - b)$, which is why digit-reversal problems always run through 9 and 11.

## How to use it
Name the digits, translate the condition into an equation, and exploit the brutal bounds $1 \le a \le 9$, $0 \le b \le 9$ — most digit equations have only a handful of solutions once you isolate a digit. For three digits, $\overline{abc} - \overline{cba} = 99(a - c)$: the middle digit vanishes. Divisibility conditions convert via mod 9 (digit sum) and mod 11 (alternating sum).

## On contests
A MATHCOUNTS and early-AMC staple: "a number equals $k$ times its digit sum," reversal differences, digits forming arithmetic sequences. The layered AMC version runs the same translation in another base $b$ — same polynomial, different radix, and comparing representations across bases gives systems in the digits.`,

"squeeze-between-squares": String.raw`## Key forms
- if $n^2<N<(n+1)^2$ for some integer $n$, then $N$ cannot be a perfect square — consecutive squares are $2n+1$ apart, so a large expression trapped strictly between two of them is disqualified outright
- guess the near-root and prove both inequalities: for a quartic try $(n^2+an+b)^2$ for small $b$, check small cases by hand since the squeeze usually only starts from some $n_0$, and read the boundary cases as the actual solutions

## Why it works
Perfect squares are spaced increasingly far apart — the gap between $n^2$ and $(n+1)^2$ is $2n + 1$. Any integer trapped strictly inside such a gap cannot be a square, and every integer $N$ in $[n^2, (n+1)^2)$ has $\lfloor \sqrt N \rfloor = n$ exactly.

## How to use it
Given a polynomial-like expression suspected of never being square, guess the near-root — for $n^4 + 2n^3 + \dots$ try $(n^2 + n + c)^2$ for small $c$ — and verify strict inequalities on both sides. Two subtleties: check small cases separately (the squeeze often starts only from some $n_0$), and when the expression can equal the boundary square, those become exactly the solution cases. The same template works for cubes and for trapping between $k(k+1)$-type products.

## On contests
The closer for "find all $n$ making this a perfect square" — squeeze for large $n$, hand-check the small survivors. AIME also uses the floor version directly: computing $\lfloor \sqrt{N} \rfloor$ for messy $N$ means finding which consecutive squares bracket it.`

});

Object.assign(window.MATH_DETAILS, {

"vieta-jumping": String.raw`## Key forms
- if a symmetric condition is quadratic in each variable separately, fixing the others makes the remaining one a root of a quadratic, and Vieta hands you the second root for free: $a'=kb-a$ from the sum, and $a'=\frac{b^2-N}{a}$ from the product
- the two expressions do different jobs — the sum shows $a'$ is an integer, and the product controls its sign and size
- start from the solution minimising $a+b$ and jump: either the new solution is smaller, contradicting minimality, or you land on a degenerate case whose evaluation reveals what the constant must be

## Why it works
If a symmetric condition is quadratic in each variable separately, then fixing all but one variable makes the remaining one a root of a quadratic — and Vieta hands you the other root for free: $a' = kb - a = \frac{b^2 - N}{a}$, automatically an integer (from the sum) and with controllable sign and size (from the product). Starting from a minimal solution, the jump must either exit the allowed region — a contradiction — or hit a boundary case that pins down the constant.

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

"exponent-tracking": String.raw`## Key forms
- a positive integer is exactly its vector of prime exponents, and distinct primes never interact — so a condition on the whole number splits into one independent condition per prime
- the operations translate directly: $\gcd$ takes the coordinatewise minimum, $\operatorname{lcm}$ the maximum, multiplication adds exponents, and divisibility is the inequality $e_p(a)\le e_p(b)$ at every prime
- being a perfect $k$-th power means $k$ divides every exponent, and $d(n)=\prod(e_p+1)$ — so power questions and divisor counts are also just exponent bookkeeping

## Why it works
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

"bounding-diophantine": String.raw`## Key forms
- order the variables $x\le y\le z$ — among $k$ terms summing to $S$ the largest is at least $\frac Sk$, which caps the smallest variable
- two inequalities pin it: $S\le\frac{k}{x}$ from above and $\frac1x\lt S$ from below leave only a handful of values to test
- fix that value, substitute, and recurse on one fewer variable — then restore all permutations at the end

## Why it works
In a symmetric equation, ordering the variables costs nothing (multiply the count by the permutations at the end) but gains a lot: the smallest variable now carries the largest share of any sum of decreasing terms. That share is at least $\frac{1}{k}$ of the total across $k$ variables, which pins the smallest variable inside a tiny range. Fixing it reduces the problem by one variable, and the recursion bottoms out in finitely many checks.

## How to use it
State the WLOG ordering explicitly, then bound the extreme variable by comparing it against the total: for $\frac1x + \frac1y + \frac1z = 1$ with $x \le y \le z$, we get $1 \le \frac{3}{x}$ so $x \le 3$, and $\frac1x < 1$ so $x \ge 2$. Enumerate each surviving value, substitute, and repeat on the smaller equation — often the two-variable step factors via SFFT. Finally, restore all permutations of each unordered solution. The same tactic bounds variables in $xyz = x + y + z$ and in equations where one side grows much faster than the other (compare growth rates to cap the exponent, then finite-check).

## On contests
The standard finisher for unit-fraction (Egyptian fraction) problems and small symmetric Diophantine systems on AIME and olympiads. It is the size-based complement to the modular approach: use a modulus to prove no solutions exist, and bounding to prove only finitely many do — then list them.`

});

Object.assign(window.MATH_DETAILS, {

"modular-basics": String.raw`## Why it works
$a \equiv b \pmod m$ means $m$ divides $a - b$, i.e. $a$ and $b$ leave the same remainder. Since divisibility survives adding, subtracting, and multiplying the differences, so do congruences: if $a \equiv b$ and $c \equiv d$, then $a \pm c \equiv b \pm d$ and $ac \equiv bd$, hence $a^k \equiv b^k$. Division is the exception because $m \mid k(a-b)$ does not force $m \mid (a-b)$ unless $k$ and $m$ share no factor.

## How to use it
Reduce early and often — replace any number by its remainder before multiplying, to keep values small. The rule that trips people up is cancellation: from $ka \equiv kb \pmod m$ you get $a \equiv b \pmod{m / \gcd(k, m)}$, not mod $m$. So $6x \equiv 6y \pmod{15}$ only gives $x \equiv y \pmod 5$. When $\gcd(k, m) = 1$ the cancellation is clean and, equivalently, $k$ has a modular inverse you can multiply by. When it isn't $1$, either shrink the modulus as above or split into cases.

## On contests
The foundation under every modular problem — last-digit and remainder questions on MATHCOUNTS, and the setup for Fermat, Euler, and CRT on AMC/AIME. The single most common error is illegal division; the fix is always to track what $\gcd(k, m)$ does to the modulus.`

});

Object.assign(window.MATH_DETAILS, {

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
A Fermat pseudoprime slips past $b^{n-1} \equiv 1 \pmod n$ despite being composite. Korselt's criterion pins down the ones that fool every coprime base: $n$ must be squarefree with $(p-1) \mid (n-1)$ for each prime $p \mid n$ — then by CRT the congruence holds for all bases. The smallest such $n$ is $561 = 3 \cdot 11 \cdot 17$ (and $2,10,16$ all divide $560$).

## How to use it
To test a candidate, check squarefreeness and the divisibility $(p-1)\mid(n-1)$ over its prime factors. The takeaway for primality: the Fermat test is not conclusive — Carmichael numbers are exactly its blind spot, which is why stronger tests (Miller–Rabin) are used.

## On contests
Olympiad number theory and "why the Fermat test fails" discussions. Keep it distinct from the Carmichael function $\lambda(n)$ — same name, unrelated object.`

});

Object.assign(window.MATH_DETAILS, {

"extended-euclidean-algorithm": String.raw`## Key forms
- the Euclidean algorithm runs on $\gcd(a,b)=\gcd(b,\,a\bmod b)$; the extended version also tracks how each remainder is built from $a$ and $b$, producing Bézout's $\gcd(a,b)=ax+by$
- the Bézout coefficient is exactly the modular inverse: if $\gcd(a,b)=1$ then $ax+by=1$ gives $ax\equiv1\pmod b$, so $x\equiv a^{-1}$
- the same coefficients settle solvability: $ax\equiv c\pmod b$ has a solution exactly when $\gcd(a,b)\mid c$, and then it has exactly $\gcd(a,b)$ solutions modulo $b$

## Why it works
Each remainder in the Euclidean algorithm is an integer combination of the original $a$ and $b$: $r_i = r_{i-2} - \lfloor r_{i-2}/r_{i-1}\rfloor\, r_{i-1}$. Back-substituting these equations from the last nonzero remainder (the gcd) upward expresses $\gcd(a,b)$ as $ax + by$; the forward recurrence $(x, y) = (y', x' - \lfloor a/b\rfloor y')$ carries the same bookkeeping in one pass.

## How to use it
For a modular inverse $a^{-1} \bmod m$: run the algorithm on $(a, m)$; when the gcd is $1$, the coefficient of $a$, reduced mod $m$, is the inverse. To solve $ax + by = c$: find $g = \gcd(a,b)$ with coefficients $(x_0, y_0)$ — solvable iff $g \mid c$ — then $(x, y) = \frac{c}{g}(x_0, y_0)$, with the general solution adding $t\left(\frac{b}{g}, -\frac{a}{g}\right)$. On paper the back-substitution chain (or a coefficient table) is quickest.

## On contests
The workhorse behind modular inverses on AIME and olympiad, and the constructive companion to Bézout's identity — reach for it whenever you need an actual $(x, y)$, not just their existence. CRT reconstruction and solving $ax \equiv c \pmod m$ both rely on it.`

});

// Detail body added for a dense medium-importance card.
Object.assign(window.MATH_DETAILS, {

"periodicity-mod-m": String.raw`## Key forms
- a term's residue depends only on a finite amount of state — one residue for a power, or the last $k$ residues for an order-$k$ recurrence — so by pigeonhole the state must eventually repeat, and once it does the sequence cycles forever
- find where the repeat begins and the period $T$, then reduce the index: $a_N\equiv a_{\,n_0+((N-n_0)\bmod T)}\pmod m$
- for a pure power with $\gcd(a,m)=1$ the cycle starts immediately and $T$ is the multiplicative order of $a$, which divides $\varphi(m)$; watch for a pre-period when the gcd is not $1$, since the first terms then sit outside the cycle

## Why it works
A term's residue depends only on a finite piece of state: one residue for a power $a^n \bmod m$, or the tuple of the last $k$ residues for an order-$k$ linear recurrence. There are only finitely many such states (at most $m$, or $m^k$), so by pigeonhole the state must eventually recur — and once it does, the sequence cycles forever with some period $T$ (after a possible pre-period, if the step map is not reversible mod $m$).

## How to use it
List residues from the start until a state repeats, noting where the repeat begins ($n_0$) and the period $T$; then $a_N \equiv a_{\,n_0 + ((N-n_0)\bmod T)} \pmod m$. For a pure power with $\gcd(a,m)=1$ the cycle starts immediately and $T$ is the multiplicative order of $a$; for a linear recurrence, $T$ is the period of its state vector (the Pisano period for Fibonacci). Speed things up with Euler's theorem, or with CRT — the period mod $m$ is the lcm of the periods mod each prime power.

## On contests
"Last digits of $7^{2024}$," "$F_{2015}\bmod 1000$," and "the far-out term of a recurrence mod $m$" are the standard AIME appearances: find the short cycle, reduce the index, done. Watch for a pre-period when $\gcd(a,m)\ne 1$ — the first term may sit outside the cycle.`,

"sigma-parity": String.raw`## Why it works
$\sigma$ is multiplicative, so $\sigma(n)$ is odd iff every prime-power factor contributes an odd amount. For an odd prime $p$, the factor $1 + p + \cdots + p^e$ is a sum of $e+1$ odd terms, so it is odd iff $e+1$ is odd, i.e. $e$ is even. The factor from $2^a$ is $1 + 2 + \cdots + 2^a = 2^{a+1}-1$, which is always odd and never affects the parity. So $\sigma(n)$ is odd exactly when every odd prime appears to an even power — meaning the odd part of $n$ is a perfect square. Writing $n = 2^a m^2$ ($m$ odd), that happens for any $a$, and $2^a m^2$ is itself a square when $a$ is even and twice a square when $a$ is odd. Hence $\sigma(n)$ odd $\iff n$ is a square or twice a square.

## On contests
It is the fast filter for "$\sigma(n)$ is odd/even" and a clean parity handle on sum-of-divisors problems — the same shape as the better-known $d(n)$ odd $\iff n$ a perfect square (there the count of divisors, not their sum, forces the pairing). Combined with $\sigma$ being multiplicative, it also settles parity of $\sigma$ for products quickly.`

});

Object.assign(window.MATH_DETAILS, {

"dirichlet-convolution": String.raw`## Why it works
Grouping divisors as $d\cdot\frac{n}{d}=n$ makes $*$ commutative and associative with identity $\varepsilon(n)=[n=1]$, and on prime powers the convolution of two multiplicative functions stays multiplicative — so any such identity reduces to one prime at a time. Möbius inversion is exactly the statement that $\mu$ is the $*$-inverse of $\mathbf 1$.

## How to use it
Recognize a divisor sum $\sum_{d\mid n} f(d)g(n/d)$ as a convolution and factor it over primes, or invert $g=f*\mathbf 1$ into $f=g*\mu$ to peel a summatory function back to its summand. Keep the staples handy: $\mu*\mathbf 1=\varepsilon$, $\varphi*\mathbf 1=\mathrm{id}$, $\mathrm{id}*\mathbf 1=\sigma$.

## On contests
Olympiad and advanced number theory; it is the clean framework for manipulating multiplicative functions and for any Möbius-inversion problem, replacing ad hoc divisor-sum algebra.`,

"jacobi-symbol": String.raw`## Why it works
Defining $\left(\frac{a}{n}\right)=\prod\left(\frac{a}{p_i}\right)^{e_i}$ inherits full multiplicativity in both arguments from the Legendre symbol, and for odd $n$ quadratic reciprocity plus the $-1$ and $2$ supplements all survive — so the symbol can be flipped and reduced without ever factoring $n$.

## How to use it
Evaluate $\left(\frac{a}{p}\right)$ fast by treating it as a Jacobi symbol: reduce the top mod the bottom, extract $2$'s with the supplement, flip by reciprocity, and repeat, exactly like a Euclidean algorithm. Caution: for composite $n$ a value of $+1$ does not prove $a$ is a residue — only $-1$ is conclusive.

## On contests
An AIME-adjacent to olympiad computational tool; it is the practical way to decide quadratic residues quickly, and its lone pitfall (composite $+1$) is a favorite trap.`,

"gauss-lemma-qr": String.raw`## Why it works
The least residues of $a,2a,\dots,\frac{p-1}{2}a$ are, up to sign, a permutation of $1,\dots,\frac{p-1}{2}$; multiplying them and comparing with $\left(\frac{p-1}{2}\right)!$ leaves one factor of $-1$ for each residue that exceeded $p/2$, so $\left(\frac{a}{p}\right)=(-1)^{\mu}$.

## How to use it
Count $\mu$, the number of "folded-over" multiples, to read a Legendre symbol directly — cleanest for small fixed $a$, where it produces the closed formulas for $\left(\frac{2}{p}\right)$ and $\left(\frac{-1}{p}\right)$, and as the engine inside a reciprocity proof.

## On contests
Olympiad number theory; less a shortcut than the standard lemma for proving quadratic reciprocity and the supplementary laws from first principles.`,

"freshmans-dream": String.raw`## Why it works
Each middle coefficient $\binom{p}{k}$ with $0\lt k\lt p$ carries a factor of $p$ that the denominator cannot cancel, so mod $p$ every cross term dies and $(a+b)^p\equiv a^p+b^p$. Iterating raises the exponent to $p^m$; this is precisely the Frobenius map $x\mapsto x^p$.

## How to use it
Collapse $p$-th powers of sums mod $p$, prove Fermat's little theorem by induction ($n^p\equiv n$), and factor over $\mathbb F_p$ (for instance $x^p-x=\prod_{a}(x-a)$). It is the reason $\binom{p}{k}\equiv 0$ shows up so often.

## On contests
A recurring olympiad and AIME lemma; whenever a prime exponent meets a sum taken modulo that prime, this is the simplification to reach for.`,

"power-minus-self": String.raw`## Why it works
Fermat's little theorem gives $n^p\equiv n\pmod p$, and more generally $n^k\equiv n\pmod p$ for every $n$ exactly when $(p-1)\mid(k-1)$ (then $n^{k-1}\equiv 1$ for $\gcd(n,p)=1$, and both sides vanish when $p\mid n$). Multiplying all such primes gives the universal modulus.

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
When the $f_i$ over $\mathbb F_p$ have degrees summing below the number of variables, the zero count is divisible by $p$; and if the $f_i$ have no constant term then $x=0$ is a zero, so a nonzero zero must also exist. That existence step is the usual payoff (e.g. the Erdős–Ginzburg–Ziv theorem).

## On contests
Olympiad number theory and combinatorics; it is the standard nonconstructive tool for "show a nontrivial solution exists mod $p$" and for divisibility of solution counts.`,

"cryptarithms": String.raw`## Key forms
- translate the letters into place value first, so $\overline{ABC}$ becomes $100A+10B+C$ and the puzzle turns into a small system of equations in the digits
- work right to left, tracking the carry, which in an addition can only be $0$ or $1$ — that single bound is what makes the search finite rather than a guess-and-check over $10!$ assignments
- the leading column pins the largest letters: two three-digit numbers total under $2000$, so a four-letter answer must start with $1$; combine that with distinct digits, no leading zero, and a digit-sum check mod $9$ to prune before any casework

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
Unique factorization makes $v_p$ additive — the power of $p$ in a product is the sum of the powers, exactly like a logarithm for a single prime. The ultrametric bound holds because $p^{\min}$ divides both terms; when the two valuations differ, the smaller power survives the sum uncancelled, forcing equality there. Divisibility statements translate the same way: $v_p(\gcd(m,n))$ is the minimum of the two valuations and $v_p(\operatorname{lcm}(m,n))$ the maximum, and for factorials Legendre's formula gives $v_p(n!)=\sum_{i\ge1}\lfloor n/p^i\rfloor$.

## How to use it
Take $v_p$ of both sides of a divisibility statement or equation to turn it into linear arithmetic on exponents: $p^k \mid N \iff v_p(N)\ge k$, a perfect square needs every $v_p$ even, and "how many factors of $p$" becomes a sum. The equality case of the ultrametric bound is exactly the engine behind Lifting the Exponent.

## On contests
The backbone of AIME and olympiad prime-power problems, and the language in which LTE, Legendre's formula, and Kummer's theorem are all phrased — reach for it whenever only the power of one prime matters.`,

"fermat-two-squares": String.raw`## Key forms
- $p\equiv1\pmod 4\iff p=a^2+b^2$ for an odd prime $p$ — and the pair $\{a,b\}$ is unique
- $p\equiv3\pmod4\Rightarrow p\ne a^2+b^2$ — the ruling-out direction, since squares are $0$ or $1$ mod $4$ so a sum of two is never $3$
- test $p-b^2$ for squareness with $b\le\sqrt{p/2}$ — uniqueness means the first hit is the whole answer, so the search never needs to continue
- a prime hypotenuse $p=m^2+n^2$ gives exactly one right triangle, with legs $m^2-n^2$ and $2mn$ — uniqueness of the representation forces uniqueness of the triangle

## Why it works
One direction is a two-line parity argument: every square is $0$ or $1$ modulo $4$, so a sum of two squares is $0$, $1$ or $2$ mod $4$ and never $3$. That disposes of every prime $p\equiv3\pmod4$ immediately.

The other direction is the real theorem. Since $p\equiv1\pmod4$, the congruence $x^2\equiv-1\pmod p$ is solvable, so $p$ divides $x^2+1$ for some $x$. Thue's lemma then produces integers $a,b$ with $0\lt a,b\lt\sqrt p$ and $a\equiv xb\pmod p$, whence $p\mid a^2+b^2$; but $0\lt a^2+b^2\lt2p$ forces $a^2+b^2=p$ exactly.

Uniqueness is cleanest in the Gaussian integers. There $p=a^2+b^2$ factors as $(a+bi)(a-bi)$, and $\mathbb{Z}[i]$ has unique factorisation, so a prime $p\equiv1\pmod4$ splits into exactly one conjugate pair of Gaussian primes — leaving no freedom in $\{a,b\}$ beyond order and sign.

## How to use it
Read "$1$ mod $4$" as a licence to write the prime as a sum of two squares, and "$3$ mod $4$" as an instant impossibility proof. Combined with the multiplication identity, this extends to composites: a product of primes that are all $1$ mod $4$ is a sum of two squares, and each additional such prime factor doubles the number of essentially different representations.

The application worth watching for is a right triangle whose hypotenuse is given to be a prime. If a problem says the hypotenuse is a prime $p$, then a triangle exists only when $p\equiv1\pmod4$, and then $p=m^2+n^2$ has exactly one solution, so the triangle is completely determined: the legs are $m^2-n^2$ and $2mn$. For $p=13=3^2+2^2$ that forces legs $5$ and $12$; for $p=61=6^2+5^2$ it forces $11$ and $60$. A prime hypotenuse that is $3$ mod $4$ — like $7$, $11$ or $19$ — admits no such triangle at all, which turns "find all right triangles with hypotenuse $p$" into a one-line answer.

To find $a$ and $b$ for a specific prime, just test $p-b^2$ for squareness with $b$ running up to $\sqrt{p/2}$; uniqueness means the first hit is the only one.

## On contests
It is the engine behind Pythagorean-triple problems with a prime hypotenuse, and behind "how many ways can $N$ be written as a sum of two squares" once $N$ is factored. AIME uses it in disguise more often than by name — any time a prime that is $1$ mod $4$ appears alongside a sum of squares, this theorem is the reason the configuration is rigid.`,
});
