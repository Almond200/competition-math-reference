// Number theory: divisibility, divisor functions, modular arithmetic, valuations, Diophantine, special topics.
window.MATH_SECTIONS = window.MATH_SECTIONS || [];

window.MATH_SECTIONS.push({
  id: "number-theory",
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
          keywords: ["consecutive", "coprime", "product divisible factorial"],
          importance: "high",
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
          id: "product-of-divisors",
          name: "Product of Divisors",
          latex: String.raw`\prod_{d \mid n} d = n^{d(n)/2}`,
          description: String.raw`Divisors pair up as $d \cdot \frac{n}{d} = n$, giving $\frac{d(n)}{2}$ pairs.`,
          keywords: ["product of factors", "pairing divisors"],
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
          keywords: ["phi sum", "divisor sum identity", "gauss"],
          importance: "low",
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
          keywords: ["multiplicative", "prime powers", "compute by factorization"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "coprime-residue-sum",
          name: "Sum of Coprime Residues",
          latex: String.raw`\sum_{\substack{1 \le k \le n \\ \gcd(k, n) = 1}} k = \frac{n\,\varphi(n)}{2} \quad (n > 1)`,
          description: String.raw`Coprime residues pair up as $k \leftrightarrow n - k$, each pair summing to $n$. Also $\varphi(n)$ is even for all $n > 2$.`,
          keywords: ["sum coprime", "totatives", "pairing", "phi even"],
          importance: "low",
          level: ["AIME"]
        },
        {
          id: "perfect-square-divisors",
          name: "Perfect-Square (and Cube) Divisors",
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
        }
      ]
    },
    {
      title: "Modular Arithmetic",
      formulas: [
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
          keywords: ["inverse", "division mod n", "extended euclid"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "digit-sum-mod-9",
          name: "Digit Sums mod 9 and 11",
          latex: String.raw`n \equiv S(n) \pmod{9}, \qquad n \equiv \text{alt.\ digit sum} \pmod{11}`,
          description: String.raw`Because $10 \equiv 1 \pmod 9$ and $10 \equiv -1 \pmod{11}$. "Casting out nines" checks arithmetic and cracks digit-sum puzzles.`,
          keywords: ["casting out nines", "digit sum", "alternating"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "squares-mod-small",
          name: "Quadratic Residues (Small Moduli)",
          latex: String.raw`x^2 \bmod 4 \in \{0, 1\}, \qquad x^2 \bmod 8 \in \{0, 1, 4\}, \qquad x^2 \bmod 9 \in \{0,1,4,7\}`,
          description: String.raw`First move for "no integer solutions" proofs: check the equation mod 4, 8, 9, or 16. Odd squares are $1 \pmod 8$.`,
          keywords: ["squares mod 4", "no solutions", "residues", "parity of squares"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "eulers-criterion",
          name: "Euler's Criterion",
          latex: String.raw`a^{\frac{p-1}{2}} \equiv \left(\frac{a}{p}\right) \pmod{p}`,
          description: String.raw`For odd prime $p$: the power is $+1$ if $a$ is a nonzero square mod $p$, $-1$ otherwise. $-1$ is a square mod $p$ iff $p \equiv 1 \pmod 4$.`,
          keywords: ["quadratic residue", "legendre symbol", "minus one square"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "hensel-lifting",
          name: "Lifting Solutions mod $p$ to mod $p^2$ (Hensel)",
          latex: String.raw`f(a) \equiv 0 \!\!\pmod{p}, \; f'(a) \not\equiv 0 \!\!\pmod{p} \implies \text{unique lift mod } p^2`,
          description: String.raw`Write $x = a + pt$ and expand: $f(a + pt) \equiv f(a) + pt\,f'(a) \pmod{p^2}$, a linear congruence in $t$. Each simple root mod $p$ lifts to exactly one root mod $p^2$ (and onward to $p^3, \dots$). The standard tool for "divisible by $p^2$" power congruences.`,
          example: String.raw`(2024 AIME I #13) $n^4 \equiv -1 \pmod{p}$ needs $8 \mid p - 1$, so the least prime is $p = 17$ (e.g. $2^4 = 16 \equiv -1$). Lifting $n = 2 + 17t$ into $n^4 \equiv -1 \pmod{289}$ gives a linear condition on $t$, and the least positive solution overall is $m = 110$.`,
          keywords: ["hensel", "lift mod p squared", "p squared divides", "linear congruence", "simple root"],
          importance: "low",
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
          latex: String.raw`\left(\frac{p}{q}\right)\left(\frac{q}{p}\right) = (-1)^{\frac{p-1}{2} \cdot \frac{q-1}{2}}, \qquad \left(\tfrac{-1}{p}\right) = (-1)^{\frac{p-1}{2}}, \qquad \left(\tfrac{2}{p}\right) = (-1)^{\frac{p^2 - 1}{8}}`,
          description: String.raw`For odd primes $p \ne q$: the symbols agree unless both are $3 \pmod 4$. Supplements: $\left(\frac{-1}{p}\right) = (-1)^{\frac{p-1}{2}}$ and $\left(\frac{2}{p}\right) = (-1)^{\frac{p^2-1}{8}}$ (so 2 is a QR iff $p \equiv \pm 1 \bmod 8$).`,
          keywords: ["reciprocity", "legendre symbol", "is a square mod p"],
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
        }
      ]
    },
    {
      title: "Primes, Factorials & Valuations",
      formulas: [
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
          name: "Counting a Prime's Factors in n! (Worked Recipe)",
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
          keywords: ["binomial coefficient", "carries", "prime power"],
          importance: "low",
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
          latex: String.raw`v_p(a^n - b^n) = v_p(a - b) + v_p(n), \qquad v_2(a^n - b^n) = v_2(a - b) + v_2(a + b) + v_2(n) - 1`,
          description: String.raw`For odd prime $p \mid a - b$ with $p \nmid a, b$. For $p = 2$ (with $4 \mid a - b$, or adjust): $v_2(a^n - b^n) = v_2(a-b) + v_2(a+b) + v_2(n) - 1$ for even $n$.`,
          example: String.raw`Largest power of $3$ dividing $4^9 - 1$: $v_3(4^9 - 1^9) = v_3(4-1) + v_3(9) = 1 + 2 = 3$. Check: $4^9 - 1 = 262143 = 27 \cdot 9709$. ✓`,
          keywords: ["lte", "valuation of difference of powers", "largest power dividing"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "primes-6k",
          name: "Primes Are $6k \pm 1$",
          latex: String.raw`p > 3 \implies p \equiv \pm 1 \pmod{6}`,
          description: String.raw`Also $p^2 \equiv 1 \pmod{24}$ for all primes $p > 3$. Useful for quick contradiction checks and casework reduction.`,
          keywords: ["prime form", "6k plus minus 1", "24"],
          importance: "medium",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "floor-multiples",
          name: "Counting Multiples",
          latex: String.raw`\#\{k \le n : d \mid k\} = \left\lfloor \frac{n}{d} \right\rfloor`,
          description: String.raw`Combine with inclusion-exclusion to count multiples of $a$ or $b$: $\lfloor n/a \rfloor + \lfloor n/b \rfloor - \lfloor n/\operatorname{lcm}(a,b) \rfloor$.`,
          keywords: ["count multiples", "floor", "inclusion exclusion"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "prime-divides-binomial",
          name: "Prime Divides Its Binomial Coefficients",
          latex: String.raw`p \;\Big|\; \binom{p}{k} \quad \text{for } 0 < k < p`,
          description: String.raw`The numerator $p!$ has a factor of $p$ that nothing below can cancel. Gives the Freshman's Dream $(a+b)^p \equiv a^p + b^p \pmod p$ and a slick proof of Fermat's Little Theorem.`,
          keywords: ["binomial prime", "freshman's dream", "frobenius endomorphism"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "bertrands-postulate",
          name: "Bertrand's Postulate",
          latex: String.raw`\forall n > 1: \; \exists \text{ prime } p \text{ with } n < p < 2n`,
          description: String.raw`There is always a prime between $n$ and $2n$. Useful existence lever in olympiad arguments (e.g. a prime in the top half can't divide anything else in range).`,
          keywords: ["prime between", "chebyshev", "existence of prime"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        }
      ]
    },
    {
      title: "Diophantine Equations",
      formulas: [
        {
          id: "chicken-mcnugget",
          name: "Chicken McNugget (Frobenius) Theorem",
          latex: String.raw`\text{largest non-representable} = ab - a - b`,
          description: String.raw`For coprime positive $a, b$: the largest integer not expressible as $ax + by$ with $x, y \ge 0$. Exactly $\frac{(a-1)(b-1)}{2}$ values are non-representable.`,
          example: String.raw`Stamps worth $5$ and $8$: the largest amount you cannot make is $5 \cdot 8 - 5 - 8 = 27$, and $\frac{4 \cdot 7}{2} = 14$ amounts are impossible in total ($1, 2, 3, 4, 6, 7, 9, 11, 12, 14, 17, 19, 22, 27$).`,
          keywords: ["frobenius", "postage stamp", "non-representable", "coprime"],
          importance: "medium",
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
          description: String.raw`A positive integer is a sum of two squares iff every prime factor $\equiv 3 \pmod 4$ appears to an even power. Primes $p \equiv 1 \pmod 4$ are sums of two squares (Fermat).`,
          keywords: ["two squares", "representable", "primes 1 mod 4"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "factor-pair-counting",
          name: "Solving $xy = N$ Style Equations",
          latex: String.raw`\#\{(x, y) \in \mathbb{Z}_{>0}^2 : xy = N\} = d(N)`,
          description: String.raw`Rearrange Diophantine equations into a product of factors equal to a constant (often via SFFT), then count divisor pairs — including negative ones when allowed.`,
          keywords: ["factor pairs", "divisor counting", "sfft applications"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "difference-of-squares-rep",
          name: "Difference of Two Squares Representability",
          latex: String.raw`n = a^2 - b^2 \text{ solvable} \iff n \not\equiv 2 \pmod 4`,
          description: String.raw`Since $a^2 - b^2 = (a-b)(a+b)$ needs two factors of the same parity. The number of representations equals the number of such factor pairs — count divisor pairs of matching parity.`,
          keywords: ["a squared minus b squared", "representable", "factor parity"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Special Topics",
      formulas: [
        {
          id: "farey-sequences",
          name: "Farey Sequences & Mediants",
          latex: String.raw`\frac{a}{b}, \frac{c}{d} \text{ Farey neighbors} \iff bc - ad = 1; \qquad \text{mediant} = \frac{a + c}{b + d}`,
          description: String.raw`$F_n$ lists reduced fractions in $[0,1]$ with denominator $\le n$ in order. The mediant of two neighbors is the first fraction to appear between them (in $F_{b+d}$). $|F_n| \approx \frac{3n^2}{\pi^2}$.`,
          example: String.raw`$\frac{1}{3}$ and $\frac{2}{5}$ are neighbors in $F_5$: $\;bc - ad = 3 \cdot 2 - 1 \cdot 5 = 1$. ✓ Their mediant $\frac{1+2}{3+5} = \frac{3}{8}$ is the very first fraction to appear between them (in $F_8$).`,
          keywords: ["farey", "mediant", "neighbors", "stern brocot", "fractions between"],
          importance: "low",
          level: ["AIME", "Olympiad"]
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
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
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
          id: "wolstenholme",
          name: "Wolstenholme's Theorem",
          latex: String.raw`\binom{2p}{p} \equiv 2 \pmod{p^3} \quad (p \ge 5)`,
          description: String.raw`Equivalently $1 + \frac{1}{2} + \cdots + \frac{1}{p-1} \equiv 0 \pmod{p^2}$ as a fraction. A deep-cut tool for harmonic-sum and central-binomial congruences.`,
          keywords: ["harmonic sum mod p", "central binomial", "p cubed"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "zsygmondy",
          name: "Zsygmondy's Theorem",
          latex: String.raw`a^n - b^n \text{ has a primitive prime divisor (with rare exceptions)}`,
          description: String.raw`For coprime $a > b \ge 1$, some prime divides $a^n - b^n$ but no earlier $a^k - b^k$ — except $2^6 - 1^6 = 63$ and the $n = 2$, $a + b$ power-of-2 case. A sledgehammer for exponential Diophantine equations.`,
          keywords: ["primitive prime divisor", "new prime", "exponential diophantine"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "fermat-numbers",
          name: "Fermat Numbers",
          latex: String.raw`F_n = 2^{2^n} + 1, \qquad F_0 F_1 \cdots F_{n-1} = F_n - 2`,
          description: String.raw`The product identity shows distinct Fermat numbers are pairwise coprime — hence infinitely many primes. Only $F_0, \dots, F_4$ ($3, 5, 17, 257, 65537$) are known to be prime.`,
          keywords: ["fermat number", "pairwise coprime", "product identity", "65537"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "continued-fraction-convergents",
          name: "Continued Fraction Convergents",
          latex: String.raw`p_k q_{k-1} - p_{k-1} q_k = (-1)^{k-1}`,
          description: String.raw`Consecutive convergents $\frac{p_k}{q_k}$ of a continued fraction are Farey neighbors — the same $|bc - ad| = 1$ relation. Convergents give the best rational approximations, e.g. $\frac{22}{7}$ and $\frac{355}{113}$ for $\pi$.`,
          keywords: ["continued fraction", "convergents", "best approximation", "farey neighbors"],
          importance: "low",
          level: ["AIME", "Olympiad"]
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
          id: "floor-sum-reciprocity",
          name: "Floor-Sum Reciprocity",
          latex: String.raw`\sum_{k=1}^{q-1} \left\lfloor \frac{kp}{q} \right\rfloor = \frac{(p-1)(q-1)}{2} \qquad (\gcd(p, q) = 1)`,
          description: String.raw`The floors count lattice points under the diagonal of a $p \times q$ rectangle — and by symmetry the diagonal (which hits no interior lattice point when $\gcd = 1$) splits the $(p-1)(q-1)$ interior points evenly. Equivalently $\lfloor \frac{kp}{q} \rfloor + \lfloor \frac{(q-k)p}{q} \rfloor = p - 1$ pairs terms.`,
          example: String.raw`$p = 5, q = 7$: $\lfloor\frac{5}{7}\rfloor + \lfloor\frac{10}{7}\rfloor + \cdots + \lfloor\frac{30}{7}\rfloor = 0+1+2+2+3+4 = 12 = \frac{4 \cdot 6}{2}$. ✓`,
          keywords: ["floor sum", "lattice points under line", "reciprocity", "diagonal"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "lattice-points-circle",
          name: "Lattice Points on a Circle",
          latex: String.raw`\#\{(a,b) \in \mathbb{Z}^2 : a^2 + b^2 = n\} = 4\left(d_1(n) - d_3(n)\right)`,
          description: String.raw`Counting all ordered, signed representations: $d_1$ and $d_3$ count divisors of $n$ congruent to $1$ and $3$ mod $4$. Consequence of unique factorization in the Gaussian integers; the count is $0$ exactly when some prime $\equiv 3 \pmod 4$ divides $n$ to an odd power.`,
          example: String.raw`$n = 25$: divisors $1, 5, 25$ are all $\equiv 1 \pmod 4$, so $4(3 - 0) = 12$ points — indeed $(\pm5, 0), (0, \pm5), (\pm3, \pm4), (\pm4, \pm3)$. ✓`,
          keywords: ["lattice points circle", "sum of two squares count", "representations", "gaussian integers"],
          importance: "low",
          level: ["AIME", "Olympiad"]
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
      title: "Problem-Solving Methods",
      formulas: [
        {
          id: "gcd-substitution",
          name: "GCD Substitution: $a = dx$, $b = dy$",
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
          id: "digit-manipulation",
          name: "Digit Manipulation: $\overline{ab} = 10a + b$",
          type: "method",
          latex: String.raw`\overline{ab} = 10a + b, \qquad \overline{ab} + \overline{ba} = 11(a + b), \qquad \overline{ab} - \overline{ba} = 9(a - b)`,
          description: String.raw`Write digit conditions as equations in the digits themselves ($\overline{abc} = 100a + 10b + c$), then solve the tiny Diophantine system with the bounds $1 \le a \le 9$, $0 \le b, c \le 9$. Reversal sums always factor through $11$; reversal differences through $9$.`,
          keywords: ["digits", "two digit number", "reversed digits", "10a plus b", "digit equation", "method"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "squeeze-between-squares",
          name: "Squeezing Between Consecutive Powers",
          type: "method",
          latex: String.raw`n^2 < N < (n+1)^2 \implies N \text{ is not a perfect square, and } \lfloor \sqrt{N} \rfloor = n`,
          description: String.raw`To show an expression is never a perfect square (or cube), trap it strictly between consecutive squares of a well-chosen $n$ — usually the obvious near-square-root, like $n^2 + n$ for a quartic. The same squeeze pins down integer parts of roots exactly.`,
          keywords: ["between consecutive squares", "not a perfect square", "bounding", "squeeze", "floor of sqrt", "method"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "vieta-jumping",
          name: "Vieta Jumping (Root Flipping)",
          type: "method",
          latex: String.raw`x^2 - kbx + (b^2 - N) = 0 \text{ has roots } a, \; a' = kb - a = \frac{b^2 - N}{a}`,
          description: String.raw`For a symmetric Diophantine condition quadratic in each variable: fix the constant, view one variable as the unknown, and use Vieta to flip a solution $(a, b)$ to a smaller one $(b, kb - a)$. Take a minimal solution and jump — either you contradict minimality, or you land on a degenerate base case that reveals the constant. Infinite descent, run through quadratics.`,
          keywords: ["vieta jumping", "root flipping", "infinite descent", "minimal solution", "symmetric diophantine", "method"],
          importance: "low",
          level: ["Olympiad"]
        }
      ]
    }
  ]
});
