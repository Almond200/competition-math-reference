// Number theory: divisibility, divisor functions, modular arithmetic, valuations, Diophantine, special topics.
window.MATH_SECTIONS = window.MATH_SECTIONS || [];

window.MATH_SECTIONS.push({
  id: "number-theory",
  group: "formulas",
  title: "Number Theory",
  blurb: "Divisibility, modular arithmetic, divisor functions, valuations, Diophantine equations, and Farey fractions.",
  subsections: [
    {
      title: "Divisibility & GCD",
      formulas: [
        {
          id: "gcd-lcm-product",
          name: "GCD × LCM",
          latex: String.raw`\gcd(a, b) \cdot \operatorname{lcm}(a, b) = ab`,
          description: String.raw`For positive integers (two variables only — fails for three). In prime factorizations, gcd takes the min exponent of each prime, lcm the max.`,
          keywords: ["gcd", "lcm", "product", "min max exponents"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "euclidean-algorithm",
          name: "Euclidean Algorithm",
          latex: String.raw`\gcd(a, b) = \gcd(b, a \bmod b)`,
          description: String.raw`Repeat until the remainder is 0. Also $\gcd(a, b) = \gcd(a - b, b)$ — useful for things like $\gcd(n^2 + 1, n + 1) = \gcd(2, n+1)$.`,
          keywords: ["euclid", "remainder", "gcd algorithm", "subtract"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "bezouts-identity",
          name: "Bézout's Identity",
          latex: String.raw`\exists\, x, y \in \mathbb{Z}: \; ax + by = \gcd(a, b)`,
          description: String.raw`$ax + by = c$ has integer solutions iff $\gcd(a,b) \mid c$. Consecutive solutions differ by $\left(\frac{b}{g}, -\frac{a}{g}\right)$.`,
          keywords: ["linear combination", "diophantine", "solvable", "integer solutions"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "extended-euclidean-algorithm",
          name: "Extended Euclidean Algorithm",
          type: "method",
          latex: String.raw`ax + by = \gcd(a, b), \qquad (x, y) = \big(y',\ x' - \lfloor a/b \rfloor\, y'\big) \text{ from } b\,x' + (a \bmod b)\,y' = \gcd(b, a \bmod b)`,
          description: String.raw`Runs the Euclidean algorithm while tracking Bézout coefficients, producing integers $x, y$ with $ax + by = \gcd(a, b)$ in the same number of steps. Back-substitute the division equations (or carry the coefficients with the recurrence above). Its main jobs: computing a modular inverse — if $\gcd(a, m) = 1$ then $ax + my = 1$ gives $a^{-1} \equiv x \pmod m$ — and solving linear Diophantine equations $ax + by = c$ by scaling the coefficients by $c/\gcd$.`,
          keywords: ["extended euclidean algorithm", "bezout coefficients", "modular inverse", "back substitution", "ax + by = gcd", "linear diophantine solution"],
          importance: "medium",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "divisibility-rules",
          name: "Divisibility Rules",
          latex: String.raw`3, 9: \text{digit sum}; \quad 11: \text{alternating digit sum}; \quad 4, 8: \text{last } 2, 3 \text{ digits}`,
          description: String.raw`For 7 and 13: use $1001 = 7 \cdot 11 \cdot 13$ — alternate sums of 3-digit blocks. A number is divisible by 6, 12, etc. iff divisible by the coprime factor pieces.`,
          keywords: ["digit sum", "divisible", "rules", "alternating", "1001"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "gcd-power-minus-one",
          name: "GCD of $a^m - 1$ and $a^n - 1$",
          latex: String.raw`\gcd(a^m - 1,\; a^n - 1) = a^{\gcd(m,n)} - 1`,
          description: String.raw`A beautiful mirror of the Euclidean algorithm in the exponents.`,
          keywords: ["powers minus one", "gcd exponents", "mersenne", "repunit"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "consecutive-coprime",
          name: "Consecutive Integers Are Coprime",
          latex: String.raw`\gcd(n, n+1) = 1`,
          description: String.raw`More generally $\gcd(n, n+k) = \gcd(n, k)$ divides $k$. Among any $k$ consecutive integers, exactly one is divisible by $k$, and their product is divisible by $k!$.`,
          keywords: ["consecutive", "coprime", "product divisible factorial", "consecutive integers are coprime", "gcd of consecutive integers", "adjacent integers coprime"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        }
      ]
    },
    {
      title: "Divisor Functions & Totient",
      formulas: [
        {
          id: "number-of-divisors",
          name: "Number of Divisors",
          latex: String.raw`n = p_1^{e_1} \cdots p_k^{e_k} \implies d(n) = (e_1 + 1)(e_2 + 1) \cdots (e_k + 1)`,
          description: String.raw`$n$ is a perfect square iff $d(n)$ is odd. To count divisors satisfying a condition, work exponent by exponent.`,
          keywords: ["tau", "count divisors", "factors", "perfect square odd"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "sum-of-divisors",
          name: "Sum of Divisors",
          latex: String.raw`\sigma(n) = \prod_{i=1}^{k} \frac{p_i^{e_i + 1} - 1}{p_i - 1} = \prod_i (1 + p_i + \cdots + p_i^{e_i})`,
          description: String.raw`Each factor is a geometric series over one prime. $n$ is perfect iff $\sigma(n) = 2n$.`,
          keywords: ["sigma", "sum of factors", "perfect number", "geometric series"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "sigma-parity",
          name: "Parity of $\\sigma(n)$",
          latex: String.raw`\sigma(n) \text{ is odd} \iff n = m^2 \text{ or } n = 2m^2`,
          description: String.raw`The sum of divisors is odd exactly when $n$ is a perfect square or twice a perfect square — the companion to "$d(n)$ is odd iff $n$ is a square." Each odd prime power $p^e$ contributes $1 + p + \cdots + p^e$, which is odd iff $e$ is even; the factor from $2^a$ is always odd, so it never affects parity.`,
          keywords: ["sigma parity", "sum of divisors odd", "square or twice a square", "divisor function parity", "odd sigma"],
          importance: "low",
          level: ["AMC12", "AIME"]
        },
        {
          id: "product-of-divisors",
          name: "Product of Divisors",
          latex: String.raw`\prod_{d \mid n} d = n^{d(n)/2}`,
          description: String.raw`Divisors pair up as $d \cdot \frac{n}{d} = n$, giving $\frac{d(n)}{2}$ pairs, so the product is $n^{d(n)/2}$. When $d(n)$ is odd — exactly when $n$ is a perfect square — the middle divisor $\sqrt{n}$ is its own partner.`,
          keywords: ["product of factors", "pairing divisors", "product of all divisors", "multiply the divisors of n", "n to the d(n)/2"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "eulers-totient",
          name: "Euler's Totient Function",
          latex: String.raw`\varphi(n) = n \prod_{p \mid n} \left(1 - \frac{1}{p}\right)`,
          description: String.raw`Counts integers in $[1, n]$ coprime to $n$. Multiplicative: $\varphi(mn) = \varphi(m)\varphi(n)$ when $\gcd(m,n) = 1$; $\varphi(p^k) = p^k - p^{k-1}$.`,
          example: String.raw`$\varphi(36) = 36\left(1 - \frac{1}{2}\right)\left(1 - \frac{1}{3}\right) = 36 \cdot \frac{1}{2} \cdot \frac{2}{3} = 12$: the twelve numbers up to 36 sharing no factor with it.`,
          keywords: ["phi", "totient", "coprime count", "multiplicative"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "totient-divisor-sum",
          name: "Gauss's Totient Sum",
          latex: String.raw`\sum_{d \mid n} \varphi(d) = n`,
          description: String.raw`Summing $\varphi$ over all divisors of $n$ gives $n$ — each $k \in [1,n]$ is counted at the divisor $d = \frac{n}{\gcd(k,n)}$.`,
          keywords: ["phi sum", "divisor sum identity", "gauss", "sum of totients over divisors", "gauss totient identity", "phi divisor sum equals n"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "mobius-inversion",
          name: "Möbius Function & Inversion",
          latex: String.raw`g(n) = \sum_{d \mid n} f(d) \iff f(n) = \sum_{d \mid n} \mu(d)\, g\!\left(\frac{n}{d}\right)`,
          description: String.raw`$\mu(n) = (-1)^k$ for squarefree $n$ with $k$ prime factors, else $0$. Powers inclusion-exclusion over primes, e.g. counting squarefree numbers or aperiodic strings.`,
          keywords: ["mobius", "inversion", "squarefree", "inclusion exclusion primes"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "multiplicative-functions",
          name: "Multiplicative Functions",
          latex: String.raw`\gcd(m, n) = 1 \implies f(mn) = f(m)f(n) \quad \text{for } f = d, \sigma, \varphi, \mu`,
          description: String.raw`Compute any of these prime power by prime power, then multiply. E.g. $d(720) = d(2^4)d(3^2)d(5) = 5 \cdot 3 \cdot 2 = 30$.`,
          keywords: ["multiplicative", "prime powers", "compute by factorization", "multiplicative function", "evaluate by prime factorization", "number-theoretic function"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "coprime-residue-sum",
          name: "Sum of Coprime Residues",
          latex: String.raw`\sum_{\substack{1 \le k \le n \\ \gcd(k, n) = 1}} k = \frac{n\,\varphi(n)}{2} \quad (n > 1)`,
          description: String.raw`Coprime residues pair up as $k \leftrightarrow n - k$, each pair summing to $n$. Also $\varphi(n)$ is even for all $n > 2$.`,
          keywords: ["sum coprime", "totatives", "pairing", "phi even"],
          importance: "lower",
          level: ["AIME"]
        },
        {
          id: "perfect-square-divisors",
          name: "Perfect-Square Divisors",
          latex: String.raw`\#\{\text{square divisors of } \textstyle\prod p_i^{e_i}\} = \prod \left(\left\lfloor \tfrac{e_i}{2} \right\rfloor + 1\right)`,
          description: String.raw`A divisor is a perfect square iff every exponent in it is even — so count the even choices $0, 2, 4, \dots$ for each prime independently. Same idea with multiples of 3 for cube divisors.`,
          example: String.raw`$720 = 2^4 \cdot 3^2 \cdot 5$: square divisors have exponents from $\{0,2,4\} \times \{0,2\} \times \{0\}$, giving $3 \cdot 2 \cdot 1 = 6$: namely $1, 4, 16, 9, 36, 144$.`,
          keywords: ["square divisors", "cube divisors", "even exponents", "count divisors condition"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "lcm-pair-counting",
          name: "Counting Pairs by LCM / GCD Conditions",
          latex: String.raw`\#\{(a,b) : \operatorname{lcm}(a,b) = \textstyle\prod p_i^{e_i}\} = \prod (2e_i + 1)`,
          description: String.raw`Work prime by prime: $\operatorname{lcm}$ fixes $\max$ of the exponents, so for each prime one of the two exponents equals $e_i$ and the other is free — $2e_i + 1$ ordered choices. The blueprint for any gcd/lcm system: convert to $\min/\max$ conditions on exponents.`,
          example: String.raw`$\operatorname{lcm}(a,b) = 72 = 2^3 3^2$: $(2 \cdot 3 + 1)(2 \cdot 2 + 1) = 35$ ordered pairs. The same per-prime max/min analysis cracks the classic AIME problem counting triples with three pairwise lcm conditions.`,
          keywords: ["lcm pairs", "gcd lcm system", "max min exponents", "ordered pairs"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "dirichlet-convolution",
          name: "Dirichlet Convolution",
          latex: String.raw`(f * g)(n) = \sum_{d \mid n} f(d)\, g\!\left(\tfrac{n}{d}\right), \qquad \mu * \mathbf{1} = \varepsilon, \qquad \varphi * \mathbf{1} = \mathrm{id}`,
          description: String.raw`The convolution $(f*g)(n) = \sum_{d\mid n} f(d)g(n/d)$ makes arithmetic functions into a commutative ring whose identity is $\varepsilon(n) = [n=1]$; the convolution of two multiplicative functions is multiplicative. Möbius inversion is just "$\mu$ is the inverse of the all-ones function $\mathbf{1}$": $g = f*\mathbf 1 \iff f = g*\mu$. Standard identities become one line — $\varphi * \mathbf 1 = \mathrm{id}$ (i.e. $\sum_{d\mid n}\varphi(d) = n$), $\sigma = \mathrm{id} * \mathbf 1$, $\tau = \mathbf 1 * \mathbf 1$ — so divisor-sum problems reduce to algebra in this ring.`,
          keywords: ["dirichlet convolution", "arithmetic functions", "mobius inversion", "multiplicative function", "divisor sum", "identity function", "convolution ring"],
          importance: "lowest",
          level: ["Olympiad"]
        }
      ]
    },
    {
      title: "Modular Arithmetic",
      formulas: [
        {
          id: "modular-basics",
          name: "Congruence Rules",
          latex: String.raw`a \equiv b \pmod m \iff m \mid (a - b); \qquad ka \equiv kb \pmod m \implies a \equiv b \pmod{m / \gcd(k, m)}`,
          description: String.raw`Congruences add, subtract, multiply, and raise to powers termwise — treat $\equiv$ almost like $=$. The one thing you cannot do is divide freely: cancelling a factor $k$ shrinks the modulus to $m/\gcd(k,m)$, so cancellation is clean only when $\gcd(k, m) = 1$ (otherwise use the modular inverse, which exists exactly then).`,
          keywords: ["modular arithmetic", "congruence", "mod rules", "cancellation", "cannot divide", "add multiply mod", "residue"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "fermats-little-theorem",
          name: "Fermat's Little Theorem",
          latex: String.raw`a^{p-1} \equiv 1 \pmod{p} \quad (p \nmid a)`,
          description: String.raw`For prime $p$. Equivalently $a^p \equiv a \pmod p$ for all $a$. The engine behind reducing huge exponents mod a prime.`,
          example: String.raw`$2^{100} \bmod 7$: since $2^6 \equiv 1$, reduce the exponent mod $6$: $100 = 6 \cdot 16 + 4$, so $2^{100} \equiv 2^4 = 16 \equiv 2 \pmod 7$.`,
          keywords: ["fermat", "prime modulus", "exponent reduction", "a to p minus 1"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "eulers-theorem",
          name: "Euler's Theorem",
          latex: String.raw`a^{\varphi(n)} \equiv 1 \pmod{n} \quad (\gcd(a, n) = 1)`,
          description: String.raw`Generalizes Fermat to composite moduli. To find last digits of $a^{big}$, reduce the exponent mod $\varphi(n)$ (when $\gcd(a,n)=1$).`,
          example: String.raw`Last two digits of $3^{100}$: $\varphi(100) = 40$, and $100 \equiv 20 \pmod{40}$, so $3^{100} \equiv 3^{20} = (3^{10})^2 = 59049^2 \equiv 49^2 = 2401 \equiv 01 \pmod{100}$.`,
          keywords: ["euler", "totient exponent", "last digits", "composite modulus"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "carmichael-function",
          name: "Carmichael Function λ(n)",
          latex: String.raw`\lambda(p^k) = \varphi(p^k) \text{ (odd } p\text{)}, \quad \lambda(2^k) = 2^{k-2} \text{ for } k \ge 3, \quad \lambda(n) = \operatorname{lcm}\left(\lambda(p_i^{a_i})\right)`,
          description: String.raw`The smallest exponent $m$ with $a^m \equiv 1 \pmod{n}$ for every $a$ coprime to $n$ — often much smaller than $\varphi(n)$, so exponents reduce further. Note $\lambda(2) = 1$, $\lambda(4) = 2$, and the lcm (not product) across prime powers.`,
          example: String.raw`$n = 1000$: $\lambda = \operatorname{lcm}(\lambda(8), \lambda(125)) = \operatorname{lcm}(2, 100) = 100$, versus $\varphi(1000) = 400$ — exponents mod $1000$ reduce mod $100$, a $4\times$ saving on power-tower problems.`,
          keywords: ["carmichael", "lambda", "universal exponent", "smaller than phi", "power towers"],
          importance: "low",
          level: ["AIME"]
        },
        {
          id: "wilsons-theorem",
          name: "Wilson's Theorem",
          latex: String.raw`(p-1)! \equiv -1 \pmod{p}`,
          description: String.raw`Holds iff $p$ is prime. Corollary for factorial-mod-prime manipulations: $(p-2)! \equiv 1 \pmod p$.`,
          example: String.raw`$p = 7$: $6! = 720 = 7 \cdot 103 - 1 \equiv -1 \pmod 7$. ✓`,
          keywords: ["wilson", "factorial mod prime", "primality", "half factorial"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "crt",
          name: "Chinese Remainder Theorem",
          type: "method",
          latex: String.raw`\begin{cases} x \equiv a_1 \pmod{n_1} \\ x \equiv a_2 \pmod{n_2} \\ \;\;\vdots \\ x \equiv a_k \pmod{n_k} \end{cases} \implies x \text{ unique} \pmod{n_1 n_2 \cdots n_k}`,
          description: String.raw`With pairwise coprime moduli, there is a unique solution mod $n_1 n_2 \cdots n_k$. Solve big-modulus problems by splitting into prime-power pieces and recombining.`,
          example: String.raw`$x \equiv 2 \pmod 3$ and $x \equiv 3 \pmod 5$: numbers that are $3 \bmod 5$ are $3, 8, 13, \dots$ — and $8 \equiv 2 \pmod 3$, so $x \equiv 8 \pmod{15}$.`,
          keywords: ["crt", "system of congruences", "coprime moduli", "unique solution"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "multiplicative-order",
          name: "Multiplicative Order",
          latex: String.raw`a^k \equiv 1 \pmod{n} \implies \operatorname{ord}_n(a) \mid k`,
          description: String.raw`The order (smallest such positive $k$) divides any exponent giving 1 — in particular $\operatorname{ord}_n(a) \mid \varphi(n)$. Cycle lengths of repeating decimals are orders of 10.`,
          keywords: ["order", "cycle length", "repeating decimal period", "divides"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "modular-inverse",
          name: "Modular Inverse",
          latex: String.raw`a \cdot a^{-1} \equiv 1 \pmod{n}`,
          description: String.raw`Exists iff $\gcd(a, n) = 1$; find it via the extended Euclidean algorithm or $a^{-1} \equiv a^{\varphi(n) - 1}$. Division mod $n$ means multiplying by an inverse.`,
          keywords: ["inverse", "division mod n", "extended euclid", "modular multiplicative inverse", "inverse modulo n", "division modulo n"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "digit-sum-mod-9",
          name: "Digit Sums mod 9 and 11",
          latex: String.raw`n \equiv S(n) \pmod{9}, \qquad n \equiv \text{alt.\ digit sum} \pmod{11}`,
          description: String.raw`Because $10 \equiv 1 \pmod 9$ and $10 \equiv -1 \pmod{11}$. "Casting out nines" checks arithmetic and cracks digit-sum puzzles.`,
          keywords: ["casting out nines", "digit sum", "alternating", "digit sum divisibility", "casting out nines", "divisibility by 9 and 3"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "squares-mod-small",
          name: "Quadratic Residues",
          latex: String.raw`x^2 \bmod 4 \in \{0, 1\}, \qquad x^2 \bmod 8 \in \{0, 1, 4\}, \qquad x^2 \bmod 9 \in \{0,1,4,7\}`,
          description: String.raw`First move for "no integer solutions" proofs: check the equation mod 4, 8, 9, or 16. Odd squares are $1 \pmod 8$.`,
          keywords: ["squares mod 4", "no solutions", "residues", "parity of squares", "small moduli"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "eulers-criterion",
          name: "Euler's Criterion",
          latex: String.raw`a^{\frac{p-1}{2}} \equiv \left(\frac{a}{p}\right) \pmod{p}`,
          description: String.raw`For odd prime $p$: the power is $+1$ if $a$ is a nonzero square mod $p$, $-1$ otherwise. $-1$ is a square mod $p$ iff $p \equiv 1 \pmod 4$.`,
          keywords: ["quadratic residue", "legendre symbol", "minus one square", "euler criterion", "quadratic residue test", "a to the (p-1)/2 mod p"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "hensel-lifting",
          name: "Hensel Lifting",
          type: "method",
          latex: String.raw`f(a) \equiv 0 \!\!\pmod{p}, \; f'(a) \not\equiv 0 \!\!\pmod{p} \implies \text{unique lift mod } p^2`,
          description: String.raw`Write $x = a + pt$ and expand: $f(a + pt) \equiv f(a) + pt\,f'(a) \pmod{p^2}$, a linear congruence in $t$. Each simple root mod $p$ lifts to exactly one root mod $p^2$ (and onward to $p^3, \dots$). The standard tool for "divisible by $p^2$" power congruences.`,
          example: String.raw`(2024 AIME I #13) $n^4 \equiv -1 \pmod{p}$ needs $8 \mid p - 1$, so the least prime is $p = 17$ (e.g. $2^4 = 16 \equiv -1$). Lifting $n = 2 + 17t$ into $n^4 \equiv -1 \pmod{289}$ gives a linear condition on $t$, and the least positive solution overall is $m = 110$.`,
          keywords: ["hensel", "lift mod p squared", "p squared divides", "linear congruence", "simple root", "lifting solutions mod p"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "last-digit-patterns",
          name: "Last Digits of Squares & Cubes mod 9",
          latex: String.raw`n^2 \bmod 10 \in \{0, 1, 4, 5, 6, 9\}, \qquad n^3 \bmod 9 \in \{0, 1, 8\}`,
          description: String.raw`Squares never end in 2, 3, 7, 8; cubes are $0, \pm 1 \pmod 9$. Quick sanity checks for "is it a perfect square/cube" and sum-of-cubes problems.`,
          keywords: ["last digit", "perfect square check", "cubes mod 9", "units digit"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "primitive-roots",
          name: "Primitive Roots",
          latex: String.raw`\text{exist mod } n \iff n \in \{1, 2, 4, p^k, 2p^k\} \; (p \text{ odd prime})`,
          description: String.raw`A primitive root $g$ has order $\varphi(n)$, so its powers hit every coprime residue. When they exist, there are $\varphi(\varphi(n))$ of them.`,
          keywords: ["generator", "order phi", "cyclic group", "primitive root count"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "quadratic-reciprocity",
          name: "Quadratic Reciprocity",
          latex: String.raw`\left(\tfrac{p}{q}\right)\left(\tfrac{q}{p}\right) = (-1)^{\frac{p-1}{2}\cdot\frac{q-1}{2}}, \quad \left(\tfrac{-1}{p}\right) = (-1)^{\frac{p-1}{2}}, \quad \left(\tfrac{2}{p}\right) = (-1)^{\frac{p^2-1}{8}}, \quad \left(\tfrac{a}{p}\right) \equiv a^{(p-1)/2}\!\pmod p`,
          description: String.raw`For odd primes $p \ne q$: the symbols agree unless both are $3 \pmod 4$. Supplements: $\left(\frac{-1}{p}\right) = (-1)^{\frac{p-1}{2}}$ and $\left(\frac{2}{p}\right) = (-1)^{\frac{p^2-1}{8}}$ (so 2 is a QR iff $p \equiv \pm 1 \bmod 8$).`,
          keywords: ["reciprocity", "legendre symbol", "is a square mod p", "quadratic reciprocity", "legendre symbol reciprocity", "law of quadratic reciprocity"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "crt-solution-counting",
          name: "Counting Solutions via CRT",
          latex: String.raw`\#\{x \bmod mn : f(x) \equiv 0\} = \#\{x \bmod m\} \cdot \#\{x \bmod n\} \quad (\gcd(m,n)=1)`,
          description: String.raw`Solution counts multiply across coprime moduli. E.g. $x^2 \equiv x \pmod{10^k}$ has $2 \cdot 2 = 4$ solutions (the "automorphic" endings $\dots 0, 1, 5, 6$).`,
          keywords: ["count solutions", "congruence", "multiply", "automorphic numbers"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "jacobi-symbol",
          name: "Jacobi Symbol",
          latex: String.raw`\left(\frac{a}{n}\right) = \prod_i \left(\frac{a}{p_i}\right)^{e_i}, \qquad \left(\frac{a}{n}\right)\!\left(\frac{b}{n}\right) = \left(\frac{ab}{n}\right), \qquad \left(\frac{m}{n}\right)\!\left(\frac{n}{m}\right) = (-1)^{\frac{m-1}{2}\frac{n-1}{2}}`,
          description: String.raw`For odd $n = \prod p_i^{e_i}$, the Jacobi symbol is the product of the Legendre symbols over $n$'s prime factors. It is fully multiplicative in the top and bottom and obeys the same reciprocity and supplementary laws as the Legendre symbol — so you can evaluate $\left(\frac{a}{p}\right)$ rapidly by flipping and reducing, with no need to factor the numbers along the way (the practical algorithm for Legendre symbols). Caveat: $\left(\frac{a}{n}\right) = 1$ does not prove $a$ is a quadratic residue mod $n$; only $-1$ certifies a non-residue.`,
          keywords: ["jacobi symbol", "generalized legendre symbol", "quadratic reciprocity", "multiplicative symbol", "odd modulus", "compute without factoring", "kronecker"],
          importance: "lowest",
          level: ["Olympiad"]
        },
        {
          id: "gauss-lemma-qr",
          name: "Gauss's Lemma (Quadratic Residues)",
          latex: String.raw`\left(\frac{a}{p}\right) = (-1)^{\mu}, \qquad \mu = \#\Big\{ 1 \le k \le \tfrac{p-1}{2} : \ (ka \bmod p) > \tfrac{p}{2} \Big\}`,
          description: String.raw`To decide whether $a$ is a quadratic residue mod an odd prime $p$, look at the least positive residues of $a, 2a, \dots, \frac{p-1}{2}a$ and count how many exceed $p/2$ (the "negative" ones); the Legendre symbol is $(-1)$ to that count $\mu$. It is the workhorse behind the proofs of quadratic reciprocity and of the supplementary law $\left(\frac{2}{p}\right) = (-1)^{(p^2-1)/8}$.`,
          keywords: ["gauss lemma", "quadratic residue", "legendre symbol", "negative least residues", "count residues", "reciprocity proof", "supplementary law"],
          importance: "lowest",
          level: ["Olympiad"]
        },
        {
          id: "freshmans-dream",
          name: "Freshman's Dream (mod p)",
          latex: String.raw`(a + b)^p \equiv a^p + b^p \pmod p, \qquad (a_1 + \cdots + a_n)^p \equiv a_1^p + \cdots + a_n^p \pmod p`,
          description: String.raw`The "mistake" that's actually true mod a prime: every middle binomial coefficient $\binom{p}{k}$ ($0 < k < p$) is divisible by $p$, so all cross terms vanish and the $p$-th power distributes over a sum. Iterating gives $(a+b)^{p^m} \equiv a^{p^m} + b^{p^m}$. It is the one-line proof of Fermat's little theorem ($n^p \equiv n$ by induction) and the reason the "Frobenius map" $x \mapsto x^p$ is a ring homomorphism in characteristic $p$.`,
          keywords: ["freshman's dream", "freshmans dream", "(a+b)^p", "binomial mod p", "frobenius endomorphism", "characteristic p", "power distributes mod p"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "power-minus-self",
          name: "Divisibility of nᵏ − n",
          latex: String.raw`6 \mid n^3 - n, \quad 30 \mid n^5 - n, \quad 42 \mid n^7 - n; \qquad p \mid n^k - n \ \text{for all } n \iff (p-1) \mid (k-1)`,
          description: String.raw`For every integer $n$, $n^k - n$ is divisible by each prime $p$ with $(p-1) \mid (k-1)$ — immediate from Fermat's little theorem, $n^p \equiv n$. Multiplying those primes gives the universal divisor: $n^3 - n$ is always a multiple of $6$, $n^5 - n$ of $30$, $n^7 - n$ of $42$, and famously $n^{13} - n$ of $2730 = 2\cdot3\cdot5\cdot7\cdot13$. (The $k=3$ case is just $n^3 - n = (n-1)n(n+1)$, three consecutive integers.)`,
          keywords: ["n^k - n", "n^3 - n divisible by 6", "n^5 - n divisible by 30", "fermat little consequence", "universal divisor", "2730", "consecutive integers"],
          importance: "low",
          level: ["AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Primes, Factorials & Valuations",
      formulas: [
        {
          id: "p-adic-valuation",
          name: "p-adic Valuation",
          latex: String.raw`v_p(mn) = v_p(m) + v_p(n), \quad v_p\!\left(\tfrac{m}{n}\right) = v_p(m) - v_p(n), \quad v_p(m+n) \ge \min\big(v_p(m), v_p(n)\big)`,
          description: String.raw`$v_p(n)$ is the exponent of the prime $p$ in $n$ (so $p^{v_p(n)} \mid n$ but $p^{v_p(n)+1} \nmid n$; write $p^k \,\|\, n$ for $v_p(n)=k$, and $v_p(0)=\infty$). It turns divisibility by powers of $p$ into ordinary addition: valuations add on products, subtract on quotients, and the sum obeys the ultrametric inequality $v_p(m+n) \ge \min(v_p(m), v_p(n))$ — with equality whenever the two valuations differ.`,
          keywords: ["p-adic valuation", "v_p", "exponent of a prime", "highest power dividing", "p^k exactly divides", "ultrametric", "non-archimedean", "valuation rules", "order of p in n"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "legendres-formula",
          name: "Legendre's Formula",
          latex: String.raw`v_p(n!) = \sum_{i=1}^{\infty} \left\lfloor \frac{n}{p^i} \right\rfloor = \frac{n - s_p(n)}{p - 1}`,
          description: String.raw`The exponent of prime $p$ in $n!$, where $s_p(n)$ is the digit sum of $n$ in base $p$. Trailing zeros of $n!$ = $v_5(n!)$.`,
          example: String.raw`Trailing zeros of $100!$: $\left\lfloor\frac{100}{5}\right\rfloor + \left\lfloor\frac{100}{25}\right\rfloor = 20 + 4 = 24$ zeros (powers of 5 are scarcer than powers of 2).`,
          keywords: ["factorial", "prime exponent", "trailing zeros", "valuation"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "vp-factorial",
          name: "Counting a Prime's Factors in $n!$",
          latex: String.raw`v_p(n!) = \left\lfloor \frac{n}{p} \right\rfloor + \left\lfloor \frac{n}{p^2} \right\rfloor + \left\lfloor \frac{n}{p^3} \right\rfloor + \cdots \quad \text{(stop when } p^k > n\text{)}`,
          description: String.raw`The hands-on procedure behind Legendre's formula: divide $n$ by $p$, then $p^2$, then $p^3$, flooring each time, and add. Each term counts one extra factor from the multiples of that power. Trailing zeros of $n!$ = the count for $p = 5$ (fives are scarcer than twos); for binomial coefficients, subtract: $v_p\binom{n}{k} = v_p(n!) - v_p(k!) - v_p((n-k)!)$.`,
          example: String.raw`How many factors of $3$ in $30!$? $\;\lfloor\frac{30}{3}\rfloor + \lfloor\frac{30}{9}\rfloor + \lfloor\frac{30}{27}\rfloor = 10 + 3 + 1 = 14$, so $3^{14} \| 30!$. And $30!$ ends in $\lfloor\frac{30}{5}\rfloor + \lfloor\frac{30}{25}\rfloor = 7$ zeros.`,
          keywords: ["factors of prime in factorial", "how many times divides factorial", "trailing zeros recipe", "divide and floor", "largest power dividing factorial"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "kummers-theorem",
          name: "Kummer's Theorem",
          latex: String.raw`v_p\binom{m+n}{m} = \#\{\text{carries when adding } m + n \text{ in base } p\}`,
          description: String.raw`The power of $p$ dividing a binomial coefficient equals the number of carries in base-$p$ addition.`,
          keywords: ["binomial coefficient", "carries", "prime power", "kummer theorem", "carries when adding in base p", "prime power dividing a binomial"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "lucas-theorem",
          name: "Lucas' Theorem",
          latex: String.raw`\binom{m}{n} \equiv \prod_{i} \binom{m_i}{n_i} \pmod{p}`,
          description: String.raw`Compare base-$p$ digits: $\binom{m}{n}$ mod $p$ is the product of digit-wise binomials. $\binom{m}{n}$ is odd iff the binary digits of $n$ are a submask of $m$'s.`,
          example: String.raw`$\binom{10}{4} \bmod 3$: in base 3, $10 = (101)_3$ and $4 = (011)_3$. Digit-wise: $\binom{1}{0}\binom{0}{1}\binom{1}{1} = 1 \cdot 0 \cdot 1 = 0$ — and indeed $3 \mid 210$.`,
          keywords: ["binomial mod p", "base p digits", "odd binomial", "pascal parity"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "lte",
          name: "Lifting the Exponent (LTE)",
          type: "method",
          latex: String.raw`v_p(a^n - b^n) = v_p(a - b) + v_p(n), \qquad v_2(a^n - b^n) = v_2(a - b) + v_2(a + b) + v_2(n) - 1`,
          description: String.raw`For odd prime $p \mid a - b$ with $p \nmid a, b$. For $p = 2$ (with $4 \mid a - b$, or adjust): $v_2(a^n - b^n) = v_2(a-b) + v_2(a+b) + v_2(n) - 1$ for even $n$.`,
          example: String.raw`Largest power of $3$ dividing $4^9 - 1$: $v_3(4^9 - 1^9) = v_3(4-1) + v_3(9) = 1 + 2 = 3$. Check: $4^9 - 1 = 262143 = 27 \cdot 9709$. ✓`,
          keywords: ["lte", "valuation of difference of powers", "largest power dividing", "lifting the exponent lemma", "v_p of a^n minus b^n", "p-adic valuation of a difference"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "primes-6k",
          name: String.raw`Primes Are $6k \pm 1$`,
          latex: String.raw`p > 3 \implies p \equiv \pm 1 \pmod{6}`,
          description: String.raw`Also $p^2 \equiv 1 \pmod{24}$ for all primes $p > 3$. Useful for quick contradiction checks and casework reduction.`,
          keywords: ["prime form", "6k plus minus 1", "24", "primes are 6k plus or minus 1", "prime form 6k+1 6k-1", "form of primes above 3"],
          importance: "medium",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "floor-multiples",
          name: "Counting Multiples",
          latex: String.raw`\#\{k \le n : d \mid k\} = \left\lfloor \frac{n}{d} \right\rfloor`,
          description: String.raw`Combine with inclusion-exclusion to count multiples of $a$ or $b$: $\lfloor n/a \rfloor + \lfloor n/b \rfloor - \lfloor n/\operatorname{lcm}(a,b) \rfloor$.`,
          keywords: ["count multiples", "floor", "inclusion exclusion", "count multiples up to n", "how many multiples", "floor division counting"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "prime-divides-binomial",
          name: "Prime Divides Its Binomial Coefficients",
          latex: String.raw`p \;\Big|\; \binom{p}{k} \quad \text{for } 0 < k < p`,
          description: String.raw`The numerator $p!$ has a factor of $p$ that nothing below can cancel. Gives the Freshman's Dream $(a+b)^p \equiv a^p + b^p \pmod p$ and a slick proof of Fermat's Little Theorem.`,
          keywords: ["binomial prime", "freshman's dream", "frobenius endomorphism", "prime divides its binomial coefficients", "p divides C(p,k)", "freshmans dream mod p"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "bertrands-postulate",
          name: "Bertrand's Postulate",
          latex: String.raw`\forall n > 1: \; \exists \text{ prime } p \text{ with } n < p < 2n`,
          description: String.raw`There is always a prime between $n$ and $2n$. Useful existence lever in olympiad arguments (e.g. a prime in the top half can't divide anything else in range).`,
          keywords: ["prime between", "chebyshev", "existence of prime", "bertrand postulate", "a prime between n and 2n", "chebyshev prime bound"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "trailing-zeros",
          name: "Trailing Zeros of $n!$",
          latex: String.raw`(\text{zeros of } n!) = v_5(n!) = \left\lfloor \tfrac{n}{5} \right\rfloor + \left\lfloor \tfrac{n}{25} \right\rfloor + \left\lfloor \tfrac{n}{125} \right\rfloor + \cdots`,
          description: String.raw`Each trailing zero is a factor of $10 = 2 \cdot 5$, and fives are scarcer than twos in a factorial, so the count is simply $v_5(n!)$ — Legendre's formula at $p = 5$. In base $b$, count the trailing zeros as the minimum over the prime-power blocks of $b$.`,
          keywords: ["trailing zeros", "factorial zeros", "how many zeros", "power of 5", "legendre"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "consecutive-product-factorial",
          name: "k Consecutive Integers (mod k!)",
          latex: String.raw`n(n+1)(n+2)\cdots(n+k-1) \equiv 0 \pmod{k!} \qquad \big(= k!\,\tbinom{n+k-1}{k}\big)`,
          description: String.raw`The product of any $k$ consecutive integers is a multiple of $k!$ — it equals $k!\binom{n+k-1}{k}$, and a binomial coefficient is always a whole number. So two consecutive integers give an even product, three give a multiple of $6$, and so on. It's the quick reason binomial coefficients like $\binom{n}{3}$ come out as integers, and a handy divisibility hammer.`,
          keywords: ["consecutive integers product", "divisible by k factorial", "binomial coefficient integer", "product of k consecutive", "n(n+1)(n+2)", "always integer"],
          importance: "low",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Diophantine & Additive",
      formulas: [
        {
          id: "chicken-mcnugget",
          name: "Chicken McNugget (Frobenius) Theorem",
          latex: String.raw`g(a,b) = ab - a - b, \qquad \#\{\text{non-representable}\} = \frac{(a-1)(b-1)}{2}`,
          description: String.raw`For coprime positive $a, b$: the largest integer not expressible as $ax + by$ with $x, y \ge 0$ is $ab - a - b$. Sylvester's count: exactly $\frac{(a-1)(b-1)}{2}$ nonnegative integers are non-representable.`,
          example: String.raw`Stamps worth $5$ and $8$: the largest amount you cannot make is $5 \cdot 8 - 5 - 8 = 27$, and $\frac{4 \cdot 7}{2} = 14$ amounts are impossible in total ($1, 2, 3, 4, 6, 7, 9, 11, 12, 14, 17, 19, 22, 27$).`,
          keywords: ["frobenius", "sylvester", "sylvester formula", "coin problem", "postage stamp", "non-representable", "coprime"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "pythagorean-triples",
          name: "Pythagorean Triple Parametrization",
          latex: String.raw`(a, b, c) = (m^2 - n^2,\; 2mn,\; m^2 + n^2)`,
          description: String.raw`All primitive triples come from coprime $m > n$ of opposite parity (scale for the rest). In any primitive triple, exactly one leg is divisible by 3, one by 4, and one side by 5.`,
          keywords: ["primitive triple", "parametrize", "m and n", "generate triples"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "pell-equation",
          name: "Pell Equations",
          latex: String.raw`x^2 - Dy^2 = 1`,
          description: String.raw`For nonsquare $D$: infinitely many solutions, all generated from the fundamental one by $(x_1 + y_1\sqrt{D})^k$. E.g. $D = 2$: $(3,2), (17,12), (99,70), \dots$ with $x_{k+1} = 3x_k + 4y_k$.`,
          keywords: ["pell", "fundamental solution", "recurrence", "sqrt approximation"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "sum-of-two-squares",
          name: "Sum of Two Squares Theorem",
          latex: String.raw`n = a^2 + b^2 \iff v_p(n) \text{ even for all } p \equiv 3 \!\!\pmod 4`,
          description: String.raw`A positive integer is a sum of two squares iff every prime factor $\equiv 3 \pmod 4$ appears to an even power. The prime case is Fermat's two-square theorem: $p \equiv 1 \pmod 4$ is a sum of two squares in exactly one way, which is what makes the general criterion constructive.`,
          keywords: ["two squares", "representable", "primes 1 mod 4", "sum of two squares theorem", "expressible as two squares", "primes 1 mod 4", "fermat two square theorem"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "thues-lemma",
          name: "Thue's Lemma",
          latex: String.raw`\gcd(a,n)=1 \implies \exists\, x,y:\; x \equiv ay \pmod{n}, \;\; 0 < |x|, |y| \le \sqrt{n}`,
          description: String.raw`A pigeonhole guarantee of a "small" solution to a congruence: for any modulus $n$ and $a$ coprime to it, some $x \equiv ay \pmod n$ has both $|x|, |y| \le \sqrt{n}$. Its famous payoff is Fermat's two-squares theorem — if $a^2 \equiv -1 \pmod p$ then $x \equiv ay$ forces $x^2 + y^2 \equiv 0 \pmod p$, and the size bound pins $x^2 + y^2 = p$.`,
          keywords: ["thue lemma", "pigeonhole congruence", "small solution", "two squares proof", "sum of two squares"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "factor-pair-counting",
          name: "Solving $xy = N$ Style Equations",
          latex: String.raw`\#\{(x, y) \in \mathbb{Z}_{>0}^2 : xy = N\} = d(N)`,
          description: String.raw`Rearrange Diophantine equations into a product of factors equal to a constant (often via SFFT), then count divisor pairs — including negative ones when allowed.`,
          keywords: ["factor pairs", "divisor counting", "sfft applications", "count factor pairs", "factor pairs of n", "divisor pair counting"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "difference-of-squares-rep",
          name: "Difference of Two Squares Representability",
          latex: String.raw`n = a^2 - b^2 \text{ solvable} \iff n \not\equiv 2 \pmod 4`,
          description: String.raw`Since $a^2 - b^2 = (a-b)(a+b)$ needs two factors of the same parity. The number of representations equals the number of such factor pairs — count divisor pairs of matching parity.`,
          keywords: ["a squared minus b squared", "representable", "factor parity", "difference of two squares representation", "which numbers are a difference of squares", "not two mod four"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "fermat-two-squares",
          name: "Fermat's Two-Square Theorem",
          type: "method",
          latex: String.raw`p \equiv 1 \!\!\pmod 4 \iff p = a^2 + b^2 \quad (p \text{ an odd prime}), \qquad \text{and } a, b \text{ are unique up to order and sign}`,
          description: String.raw`An odd prime is a sum of two squares exactly when it is $1 \bmod 4$, and then in only one way. The uniqueness is what makes it a tool rather than a curiosity: it pins down the two squares, so any configuration built from a prime that is $1 \bmod 4$ is forced. The most common disguise is a right triangle whose hypotenuse is a given prime.`,
          keywords: ["fermat two square theorem", "fermat's theorem on sums of two squares", "prime as a sum of two squares", "primes 1 mod 4", "p = a^2 + b^2", "prime hypotenuse", "unique representation as two squares", "brahmagupta fibonacci identity", "method"],
          importance: "medium",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "sum-of-three-squares",
          name: "Sums of Three and Four Squares",
          latex: String.raw`n = a^2 + b^2 + c^2 \text{ solvable} \iff n \ne 4^k(8m + 7), \qquad \text{every } n \text{ is a sum of four squares}`,
          description: String.raw`Legendre's three-square theorem rules out exactly the numbers of the form $4^k(8m+7)$ — so $7, 15, 23, 28, 31, \dots$ need four squares. Lagrange's four-square theorem then guarantees four always suffice. Companion to the two-square criterion (primes $p \equiv 1 \bmod 4$).`,
          keywords: ["three squares", "legendre three square", "lagrange four square", "sum of squares representable", "8m plus 7"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "cauchy-davenport",
          name: "Cauchy–Davenport Theorem",
          latex: String.raw`p \text{ prime},\ A, B \subseteq \mathbb{Z}_p \;\Rightarrow\; |A + B| \ge \min(p,\ |A| + |B| - 1)`,
          description: String.raw`Adding two nonempty subsets of $\mathbb{Z}_p$ (all sums $a+b$) can't shrink below $|A|+|B|-1$ unless it fills all of $\mathbb{Z}_p$. The foundational result of additive combinatorics — the mod-$p$ analogue of $|A+B| \ge |A|+|B|-1$ for sets of reals — and the base case for the Erdős–Ginzburg–Ziv theorem and other sumset bounds.`,
          keywords: ["cauchy davenport", "sumset", "additive combinatorics", "mod p subsets", "A plus B", "sum set bound"],
          importance: "lowest",
          level: ["Olympiad"]
        },
        {
          id: "erdos-ginzburg-ziv",
          name: "Erdős–Ginzburg–Ziv Theorem",
          latex: String.raw`\text{any } 2n-1 \text{ integers contain } n \text{ with sum divisible by } n`,
          description: String.raw`Among any $2n-1$ integers, some $n$ of them add to a multiple of $n$ — and $2n-1$ is sharp ($n-1$ copies each of $0$ and $1$ fail). The prime case follows from Cauchy–Davenport; the general case builds up multiplicatively. A staple "guaranteed divisible subset" existence theorem.`,
          keywords: ["erdos ginzburg ziv", "egz", "zero sum", "subset divisible by n", "2n-1 integers", "additive number theory"],
          importance: "lowest",
          level: ["Olympiad"]
        },
        {
          id: "chevalley-warning",
          name: "Chevalley–Warning Theorem",
          latex: String.raw`\sum_i \deg f_i < n \;\Rightarrow\; p \mid \#\{x \in \mathbb{F}_p^{\,n} : f_1(x) = \cdots = f_k(x) = 0\}`,
          description: String.raw`If polynomials $f_1, \dots, f_k$ over $\mathbb{F}_p$ in $n$ variables have total degree sum less than $n$, then the number of common zeros is divisible by $p$. Since the all-zero vector is already one solution when the $f_i$ have no constant term, there must be a second (nonzero) one — the classic way to prove existence of nontrivial solutions to low-degree systems mod $p$ without constructing them (e.g. EGZ, and "every graph has a small structure" arguments).`,
          keywords: ["chevalley warning", "finite field", "common zeros divisible by p", "low degree system", "nontrivial solution mod p", "existence"],
          importance: "lowest",
          level: ["Olympiad"]
        }
      ]
    },
    {
      title: "Bases, Digits & Decimals",
      formulas: [
        {
          id: "base-conversion",
          name: "Base-$b$ Representation",
          latex: String.raw`(d_k d_{k-1} \cdots d_0)_b = \sum_{i=0}^{k} d_i\, b^i`,
          description: String.raw`A number has $\lfloor \log_b n \rfloor + 1$ digits in base $b$. Convert to base $b$ by repeated division; many digit puzzles are secretly polynomial equations in $b$.`,
          keywords: ["base b", "digits", "convert", "binary", "positional"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "repeating-decimals",
          name: "Repeating Decimals to Fractions",
          latex: String.raw`0.\overline{d_1 d_2 \cdots d_k} = \frac{d_1 d_2 \cdots d_k}{\underbrace{99\cdots9}_{k}}`,
          description: String.raw`The period of $\frac{1}{n}$ (for $\gcd(n, 10) = 1$) is $\operatorname{ord}_n(10)$, which divides $\varphi(n)$. E.g. $\frac{1}{7} = 0.\overline{142857}$ with period 6.`,
          keywords: ["repeating decimal", "period", "nines", "fraction"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "terminating-decimals",
          name: "Terminating Decimals",
          latex: String.raw`\frac{m}{n} \text{ (lowest terms) terminates} \iff n = 2^a 5^b`,
          description: String.raw`A fraction's decimal expansion ends exactly when the reduced denominator has no prime factors besides 2 and 5; it then has $\max(a, b)$ decimal digits.`,
          example: String.raw`How many $\frac{k}{1000}$-style fractions terminate? All of them ($1000 = 2^3 5^3$). But $\frac{k}{120}$ terminates only when the reduced denominator drops the factor of 3 — i.e. when $3 \mid k$.`,
          keywords: ["terminating decimal", "2 and 5", "denominator", "decimal digits"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "digit-count",
          name: "Number of Digits",
          latex: String.raw`\#\text{digits of } n \text{ in base } b = \lfloor \log_b n \rfloor + 1`,
          description: String.raw`E.g. $2^{100}$ has $\lfloor 100 \log_{10} 2 \rfloor + 1 = 31$ digits. Remember $\log_{10} 2 \approx 0.3010$ and $\log_{10} 3 \approx 0.4771$.`,
          keywords: ["digits", "log", "how many digits", "leading digit"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "recognition-numbers",
          name: "Numbers Worth Recognizing",
          latex: String.raw`1001 = 7 \cdot 11 \cdot 13, \qquad 999 = 3^3 \cdot 37, \qquad 1024 = 2^{10}, \qquad 1729 = 7 \cdot 13 \cdot 19`,
          description: String.raw`The "fake primes" — products of two primes that look prime: $91 = 7 \cdot 13$, $119 = 7 \cdot 17$, $133 = 7 \cdot 19$, $143 = 11 \cdot 13$, $187 = 11 \cdot 17$, $221 = 13 \cdot 17$, $247 = 13 \cdot 19$, $323 = 17 \cdot 19$. Also: $111 = 3 \cdot 37$, powers of 2 through $2^{10} = 1024 \approx 10^3$, $7! = 5040$, $10! = 3{,}628{,}800$, and the estimates $\sqrt2 \approx 1.414$, $\sqrt3 \approx 1.732$, $\sqrt5 \approx 2.236$, $\pi \approx 3.1416$.`,
          keywords: ["1001", "fake primes", "recognize factorizations", "powers of 2", "memorize constants", "1729", "sqrt approximations"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        }
      ]
    },
    {
      title: "Special Numbers & Sequences",
      formulas: [
        {
          id: "farey-sequences",
          name: "Farey Sequences & Mediants",
          latex: String.raw`\frac{a}{b}, \frac{c}{d} \text{ Farey neighbors} \iff bc - ad = 1; \qquad \text{mediant} = \frac{a + c}{b + d}`,
          description: String.raw`$F_n$ lists reduced fractions in $[0,1]$ with denominator $\le n$ in order. The mediant of two neighbors is the first fraction to appear between them (in $F_{b+d}$). $|F_n| \approx \frac{3n^2}{\pi^2}$.`,
          example: String.raw`$\frac{1}{3}$ and $\frac{2}{5}$ are neighbors in $F_5$: $\;bc - ad = 3 \cdot 2 - 1 \cdot 5 = 1$. ✓ Their mediant $\frac{1+2}{3+5} = \frac{3}{8}$ is the very first fraction to appear between them (in $F_8$).`,
          keywords: ["farey", "mediant", "neighbors", "stern brocot", "fractions between"],
          importance: "lowest",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "wolstenholme",
          name: "Wolstenholme's Theorem",
          latex: String.raw`\binom{2p}{p} \equiv 2 \pmod{p^3} \quad (p \ge 5)`,
          description: String.raw`Equivalently $1 + \frac{1}{2} + \cdots + \frac{1}{p-1} \equiv 0 \pmod{p^2}$ as a fraction. A deep-cut tool for harmonic-sum and central-binomial congruences.`,
          keywords: ["harmonic sum mod p", "central binomial", "p cubed", "wolstenholme theorem", "harmonic sum mod p squared", "binomial 2p choose p mod p"],
          importance: "lowest",
          level: ["Olympiad"]
        },
        {
          id: "zsygmondy",
          name: "Zsygmondy's Theorem",
          latex: String.raw`a^n - b^n \text{ has a primitive prime divisor (with rare small exceptions)}`,
          description: String.raw`For coprime $a > b \ge 1$, some prime divides $a^n - b^n$ but no earlier $a^k - b^k$ — except $2^6 - 1^6 = 63$ and the $n = 2$, $a + b$ power-of-2 case. A sledgehammer for exponential Diophantine equations.`,
          keywords: ["primitive prime divisor", "new prime", "exponential diophantine", "zsygmondy theorem", "zsigmondy theorem", "primitive prime divisor"],
          importance: "lowest",
          level: ["Olympiad"]
        },
        {
          id: "fermat-numbers",
          name: "Fermat Numbers",
          latex: String.raw`F_n = 2^{2^n} + 1, \qquad F_0 F_1 \cdots F_{n-1} = F_n - 2`,
          description: String.raw`The product identity shows distinct Fermat numbers are pairwise coprime — hence infinitely many primes. Only $F_0, \dots, F_4$ ($3, 5, 17, 257, 65537$) are known to be prime.`,
          keywords: ["fermat number", "pairwise coprime", "product identity", "65537"],
          importance: "lowest",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "continued-fraction-convergents",
          name: "Continued Fraction Convergents",
          latex: String.raw`p_k q_{k-1} - p_{k-1} q_k = (-1)^{k-1}`,
          description: String.raw`Consecutive convergents $\frac{p_k}{q_k}$ of a continued fraction are Farey neighbors — the same $|bc - ad| = 1$ relation. Convergents give the best rational approximations, e.g. $\frac{22}{7}$ and $\frac{355}{113}$ for $\pi$.`,
          keywords: ["continued fraction", "convergents", "best approximation", "farey neighbors"],
          importance: "lowest",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "floor-sum-reciprocity",
          name: "Floor-Sum Reciprocity",
          latex: String.raw`\sum_{k=1}^{q-1} \left\lfloor \frac{kp}{q} \right\rfloor = \frac{(p-1)(q-1)}{2} \qquad (\gcd(p, q) = 1)`,
          description: String.raw`The floors count lattice points under the diagonal of a $p \times q$ rectangle — and by symmetry the diagonal (which hits no interior lattice point when $\gcd = 1$) splits the $(p-1)(q-1)$ interior points evenly. Equivalently $\lfloor \frac{kp}{q} \rfloor + \lfloor \frac{(q-k)p}{q} \rfloor = p - 1$ pairs terms.`,
          example: String.raw`$p = 5, q = 7$: $\lfloor\frac{5}{7}\rfloor + \lfloor\frac{10}{7}\rfloor + \cdots + \lfloor\frac{30}{7}\rfloor = 0+1+2+2+3+4 = 12 = \frac{4 \cdot 6}{2}$. ✓`,
          keywords: ["floor sum", "lattice points under line", "reciprocity", "diagonal"],
          importance: "lowest",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "lattice-points-gcd",
          name: "Lattice Points on a Segment",
          latex: String.raw`\#\{\text{lattice points strictly between } (0,0) \text{ and } (a, b)\} = \gcd(a, b) - 1, \qquad \#\{\text{grid squares crossed}\} = m + n - \gcd(m, n)`,
          description: String.raw`Pairs with Pick's Theorem for lattice-polygon problems: total boundary points on the segment including endpoints is $\gcd(a,b) + 1$.`,
          example: String.raw`From $(0,0)$ to $(9,6)$: $\gcd(9,6) = 3$, so the segment passes through $3 - 1 = 2$ interior lattice points — $(3,2)$ and $(6,4)$, the multiples of $\left(\frac{9}{3}, \frac{6}{3}\right)$.`,
          diagram: String.raw`<svg viewBox="0 0 420 305" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Segment from (0,0) to (9,6) passing through lattice points (3,2) and (6,4)">
  <g fill="var(--border-light)">
    <circle cx="30" cy="270" r="2.5"/><circle cx="70" cy="270" r="2.5"/><circle cx="110" cy="270" r="2.5"/><circle cx="150" cy="270" r="2.5"/><circle cx="190" cy="270" r="2.5"/><circle cx="230" cy="270" r="2.5"/><circle cx="270" cy="270" r="2.5"/><circle cx="310" cy="270" r="2.5"/><circle cx="350" cy="270" r="2.5"/><circle cx="390" cy="270" r="2.5"/>
    <circle cx="30" cy="230" r="2.5"/><circle cx="70" cy="230" r="2.5"/><circle cx="110" cy="230" r="2.5"/><circle cx="150" cy="230" r="2.5"/><circle cx="190" cy="230" r="2.5"/><circle cx="230" cy="230" r="2.5"/><circle cx="270" cy="230" r="2.5"/><circle cx="310" cy="230" r="2.5"/><circle cx="350" cy="230" r="2.5"/><circle cx="390" cy="230" r="2.5"/>
    <circle cx="30" cy="190" r="2.5"/><circle cx="70" cy="190" r="2.5"/><circle cx="110" cy="190" r="2.5"/><circle cx="150" cy="190" r="2.5"/><circle cx="190" cy="190" r="2.5"/><circle cx="230" cy="190" r="2.5"/><circle cx="270" cy="190" r="2.5"/><circle cx="310" cy="190" r="2.5"/><circle cx="350" cy="190" r="2.5"/><circle cx="390" cy="190" r="2.5"/>
    <circle cx="30" cy="150" r="2.5"/><circle cx="70" cy="150" r="2.5"/><circle cx="110" cy="150" r="2.5"/><circle cx="150" cy="150" r="2.5"/><circle cx="190" cy="150" r="2.5"/><circle cx="230" cy="150" r="2.5"/><circle cx="270" cy="150" r="2.5"/><circle cx="310" cy="150" r="2.5"/><circle cx="350" cy="150" r="2.5"/><circle cx="390" cy="150" r="2.5"/>
    <circle cx="30" cy="110" r="2.5"/><circle cx="70" cy="110" r="2.5"/><circle cx="110" cy="110" r="2.5"/><circle cx="150" cy="110" r="2.5"/><circle cx="190" cy="110" r="2.5"/><circle cx="230" cy="110" r="2.5"/><circle cx="270" cy="110" r="2.5"/><circle cx="310" cy="110" r="2.5"/><circle cx="350" cy="110" r="2.5"/><circle cx="390" cy="110" r="2.5"/>
    <circle cx="30" cy="70" r="2.5"/><circle cx="70" cy="70" r="2.5"/><circle cx="110" cy="70" r="2.5"/><circle cx="150" cy="70" r="2.5"/><circle cx="190" cy="70" r="2.5"/><circle cx="230" cy="70" r="2.5"/><circle cx="270" cy="70" r="2.5"/><circle cx="310" cy="70" r="2.5"/><circle cx="350" cy="70" r="2.5"/><circle cx="390" cy="70" r="2.5"/>
    <circle cx="30" cy="30" r="2.5"/><circle cx="70" cy="30" r="2.5"/><circle cx="110" cy="30" r="2.5"/><circle cx="150" cy="30" r="2.5"/><circle cx="190" cy="30" r="2.5"/><circle cx="230" cy="30" r="2.5"/><circle cx="270" cy="30" r="2.5"/><circle cx="310" cy="30" r="2.5"/><circle cx="350" cy="30" r="2.5"/><circle cx="390" cy="30" r="2.5"/>
  </g>
  <line x1="30" y1="270" x2="390" y2="30" stroke="var(--text-dim)" stroke-width="2"/>
  <circle cx="30" cy="270" r="6" fill="var(--gold)"/>
  <circle cx="390" cy="30" r="6" fill="var(--gold)"/>
  <circle cx="150" cy="190" r="5.5" fill="var(--accent)"/>
  <circle cx="270" cy="110" r="5.5" fill="var(--accent)"/>
  <text x="34" y="292" fill="var(--gold)" font-size="13">(0,0)</text>
  <text x="352" y="22" fill="var(--gold)" font-size="13">(9,6)</text>
  <text x="158" y="207" fill="var(--accent)" font-size="13">(3,2)</text>
  <text x="278" y="127" fill="var(--accent)" font-size="13">(6,4)</text>
</svg>`,
          keywords: ["lattice", "segment", "visible points", "gcd", "squares crossed by diagonal", "diagonal of grid"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "lattice-points-circle",
          name: "Lattice Points on a Circle",
          latex: String.raw`\#\{(a,b) \in \mathbb{Z}^2 : a^2 + b^2 = n\} = 4\left(d_1(n) - d_3(n)\right)`,
          description: String.raw`Counting all ordered, signed representations: $d_1$ and $d_3$ count divisors of $n$ congruent to $1$ and $3$ mod $4$. Consequence of unique factorization in the Gaussian integers; the count is $0$ exactly when some prime $\equiv 3 \pmod 4$ divides $n$ to an odd power.`,
          example: String.raw`$n = 25$: divisors $1, 5, 25$ are all $\equiv 1 \pmod 4$, so $4(3 - 0) = 12$ points — indeed $(\pm5, 0), (0, \pm5), (\pm3, \pm4), (\pm4, \pm3)$. ✓`,
          keywords: ["lattice points circle", "sum of two squares count", "representations", "gaussian integers"],
          importance: "lowest",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "gaussian-integers",
          name: "Gaussian & Eisenstein Integers",
          latex: String.raw`N(a+bi) = a^2 + b^2, \qquad N(zw) = N(z)\,N(w)`,
          description: String.raw`The ring $\mathbb{Z}[i] = \{a+bi\}$ has unique factorization, units $\pm 1, \pm i$, and a multiplicative norm $N(a+bi) = a^2+b^2$. A rational prime $p$ splits into two conjugate Gaussian primes iff $p \equiv 1 \pmod 4$ (then $p = a^2+b^2$), stays inert iff $p \equiv 3 \pmod 4$, and ramifies at $p = 2 = -i(1+i)^2$. The Eisenstein integers $\mathbb{Z}[\omega]$, $\omega = e^{2\pi i/3}$, play the same role for $a^2+ab+b^2$, with norm $N(a+b\omega) = a^2 - ab + b^2$ and primes classified mod $3$.`,
          keywords: ["gaussian integers", "eisenstein integers", "quadratic field", "quadratic integer ring", "norm", "unique factorization", "sum of two squares", "z[i]", "split inert ramified"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "pisano-periods",
          name: "Pisano Periods",
          latex: String.raw`F_n \bmod m \text{ is periodic}; \qquad \pi(2) = 3, \;\; \pi(5) = 20, \;\; \pi(10) = 60`,
          description: String.raw`The Fibonacci sequence taken modulo $m$ eventually repeats, and since the recurrence runs backward too, it repeats from the very start. The period $\pi(m)$ controls every question about $F_n \bmod m$ — the last digit of $F_n$ cycles with period $\pi(10) = 60$. To find $F_n \bmod m$, reduce the index $n$ modulo $\pi(m)$.`,
          keywords: ["pisano period", "fibonacci mod m", "last digit of fibonacci", "periodic recurrence", "cycle"],
          importance: "lowest",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "beatty-theorem",
          name: "Beatty's Theorem (Rayleigh)",
          latex: String.raw`\alpha, \beta \text{ irrational},\ \tfrac1\alpha + \tfrac1\beta = 1 \;\Rightarrow\; \{\lfloor n\alpha\rfloor\} \text{ and } \{\lfloor n\beta\rfloor\} \text{ partition } \mathbb{Z}^+`,
          description: String.raw`For irrational $\alpha, \beta > 1$ with $\frac1\alpha + \frac1\beta = 1$, the two "Beatty sequences" $\lfloor n\alpha\rfloor$ and $\lfloor n\beta\rfloor$ ($n \ge 1$) hit every positive integer exactly once between them. So a single irrational $\alpha$ generates a complementary pair of sequences that tile $\mathbb{Z}^+$ — the density argument ($\frac1\alpha + \frac1\beta = 1$ makes the densities add to $1$) is the whole idea, and it connects to floor-sum identities.`,
          keywords: ["beatty theorem", "rayleigh theorem", "beatty sequence", "complementary sequences", "partition integers", "floor n alpha", "irrational density"],
          importance: "lowest",
          level: ["Olympiad"]
        },
        {
          id: "carmichael-numbers",
          name: "Carmichael Numbers & Pseudoprimes",
          latex: String.raw`\text{composite } n \text{ with } b^{n-1} \equiv 1 \pmod n \ \forall \gcd(b,n)=1; \quad \text{Korselt: } n \text{ squarefree},\ (p-1)\mid(n-1)\ \forall p\mid n`,
          description: String.raw`A Fermat pseudoprime to base $b$ is a composite $n$ that nonetheless passes Fermat's test $b^{n-1}\equiv 1$; a Carmichael number passes it for every base coprime to $n$ — an "absolute" pseudoprime that fools the Fermat primality test entirely. Korselt's criterion characterizes them: squarefree with $(p-1)\mid(n-1)$ for each prime factor. The smallest is $561 = 3\cdot 11\cdot 17$. (Not to be confused with the Carmichael function $\lambda(n)$.)`,
          keywords: ["carmichael number", "fermat pseudoprime", "korselt criterion", "561", "absolute pseudoprime", "primality test fooled"],
          importance: "lower",
          level: ["Olympiad"]
        },
        {
          id: "base10-curiosities",
          name: "Base-10 Curiosities",
          latex: String.raw`\tfrac17 = 0.\overline{142857}, \quad 153 = 1^3+5^3+3^3, \quad 6174 = \text{Kaprekar's constant}`,
          description: String.raw`Cool-to-know decimal quirks. Cyclic number $142857$: $\frac17 = 0.\overline{142857}$, and multiplying by $1$–$6$ just rotates its digits ($2\times = 285714$, …), while $\times 7 = 999999$. Narcissistic (Armstrong) numbers equal the sum of their own digits each raised to the digit-count: $153 = 1^3+5^3+3^3$ (also $370, 371, 407$). Kaprekar's constant $6174$: take any 4-digit number (not all identical digits), subtract the ascending arrangement from the descending, and repeat — you reach $6174$ within $7$ steps and stay there. Rarely "useful," always fun.`,
          keywords: ["142857", "cyclic number", "1/7 decimal", "narcissistic number", "armstrong number", "153", "kaprekar constant", "6174", "digit curiosities", "recreational"],
          importance: "lowest",
          level: ["MATHCOUNTS"]
        }
      ]
    },
    {
      title: "Problem-Solving Methods",
      formulas: [
        {
          id: "gcd-substitution",
          name: "GCD Substitution",
          type: "method",
          latex: String.raw`d = \gcd(a, b): \quad a = dx, \; b = dy, \; \gcd(x, y) = 1, \qquad \operatorname{lcm}(a, b) = dxy`,
          description: String.raw`The opening move on any gcd/lcm problem: factor out the gcd so the remaining parts $x, y$ are coprime. Every condition simplifies — $ab = d^2xy$, $a + b = d(x+y)$, $\frac{\operatorname{lcm}}{\gcd} = xy$ — and coprimality unlocks unique-factorization arguments on $x$ and $y$ separately.`,
          keywords: ["gcd substitution", "a = dx b = dy", "coprime parts", "factor out gcd", "gcd lcm system", "method"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AIME"]
        },
        {
          id: "choose-modulus",
          name: "Choosing the Right Modulus",
          type: "method",
          latex: String.raw`\text{squares} \bmod 4 \in \{0, 1\}, \qquad \text{squares} \bmod 8 \in \{0, 1, 4\}, \qquad \text{cubes} \bmod 9 \in \{0, \pm 1\}`,
          description: String.raw`To kill an integer equation or force a case, reduce mod a modulus that collapses one side: $4$ or $8$ against squares, $9$ against cubes and digit sums, $10$ for last digits, $p$ to erase every term with a factor of $p$. If the two sides can't agree mod $m$, there are no solutions at all.`,
          keywords: ["choose modulus", "mod trick", "no integer solutions", "impossible equation", "reduce mod", "method"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "exponent-tracking",
          name: "Prime Exponent Tracking",
          type: "method",
          latex: String.raw`\gcd \to \min(e_i, f_i), \quad \operatorname{lcm} \to \max(e_i, f_i), \quad \text{product} \to e_i + f_i, \quad \text{square} \to \text{all } e_i \text{ even}`,
          description: String.raw`Every divisibility, gcd, lcm, perfect-power, and divisor-count condition is secretly a statement about prime exponents, one prime at a time. Write each number as $\prod p^{e_i}$, translate the conditions into min / max / sum / parity constraints on the exponents, and solve prime by prime — the primes never interact, so a hard multi-number condition splits into independent tiny problems.`,
          keywords: ["exponent tracking", "prime factorization method", "min max exponents", "gcd lcm exponents", "perfect power parity", "method"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "bounding-diophantine",
          name: "Bounding \& Finite Check",
          type: "method",
          latex: String.raw`\text{order the variables} \Rightarrow \text{the smallest is bounded} \Rightarrow \text{finite check}`,
          description: String.raw`For a symmetric equation in positive integers, order the variables. The smallest one is then squeezed: in $\frac{1}{x} + \frac{1}{y} + \frac{1}{z} = 1$, the largest term is at least $\frac{1}{3}$ of the total, forcing $x \le 3$. Each surviving value of $x$ reduces the problem by one variable, and the recursion terminates in a short finite check.`,
          keywords: ["bounding", "wlog ordering", "finitely many solutions", "smallest variable bound", "unit fractions", "finite check", "method"],
          importance: "medium",
          level: ["AMC12", "AIME", "Olympiad"]
        }
      ]
    }
  ]
});
