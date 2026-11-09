// Lectures 4–7. Tutorial links open the corresponding question in Set 2.
(window.CHAPTERS ||= []).push(
  {
    id: 4,
    title: "Random variables",
    section: "Lecture notes",
    summary: "Describe a count with probability masses or a measurement with a density. Use the cumulative distribution to read off probabilities, and moments to describe centre, spread and shape.",
    goals: [
      "Choose a PMF or PDF from the quantity being observed.",
      "Recover interval probabilities from a CDF, including the correct endpoints.",
      "Calculate and interpret a mean, standard deviation and coefficient of variation."
    ],
    ideas: [
      {name: "Mass and density", text: "For a discrete variable X, p(x) assigns probability to each possible value. For a continuous X, f(x) assigns density. Specify the support, the set of possible values. The masses must sum to one or the density must integrate to one over that support.", formula: "p(x) = P(X = x)     ·     P(a < X ≤ b) = ∫ₐᵇ f(x) dx for continuous X"},
      {name: "Read a cumulative distribution", text: "F(x) accumulates all probability up to x. It starts at zero, never decreases and approaches one. A jump at x has size P(X = x). For a continuous distribution there is no jump.", formula: "F(x) = P(X ≤ x)     ·     P(a < X ≤ b) = F(b) − F(a)"},
      {name: "Centre and spread", text: "Expectation weights each value by its probability. For continuous X, integrate x f(x) over the support. A median m has at least half the probability at or below it and at least half at or above it. A mode maximises mass or density. Standard deviation σ has the units of X. For positive means, the coefficient of variation δ measures relative spread.", formula: "μ = E[X]     ·     σ² = E[X²] − μ²     ·     δ = σ/μ"},
      {name: "Skewness", text: "The standardised third central moment records asymmetry. A long upper tail typically gives a positive value. Symmetry implies zero skewness when the moment exists, but knowing skewness is zero cannot establish symmetry.", formula: "Skewness = E[(X − μ)³] / σ³, for σ > 0"}
    ],
    example: {
      prompt: "A crew records X, the number of drains that need clearing on a visit. Its model gives probabilities 0.50, 0.35 and 0.15 for counts 0, 1 and 2. How often is there work, and how variable is the count?",
      steps: [
        "The masses sum to 1. A visit involves work whenever X ≥ 1, so P(X ≥ 1) = 1 − P(X = 0) = 0.50.",
        "The mean count is μ = 0 × 0.50 + 1 × 0.35 + 2 × 0.15 = 0.65 drains per visit.",
        "The second moment uses squared counts, giving E[X²] = 0 + 0.35 + 4 × 0.15 = 0.95.",
        "Var(X) = 0.95 − 0.65² = 0.5275. The standard deviation is √0.5275 ≈ 0.726 drains. An average of 0.65 is compatible with every observed count being an integer."
      ]
    },
    pitfall: "A PDF value has units of inverse measurement. For a continuous variable, the probability of one exact value is zero even where the density is high.",
    activity: {
      prompt: "Delay X has density f(x) = 2x for 0 ≤ x ≤ 1 minute and zero elsewhere, with x expressed in minutes. What fraction of delays exceed half a minute?",
      answer: "Integrating the density gives F(x) = x² within the support. The fraction is 1 − F(0.5) = 0.75. The rising density places more probability in the second half of the interval."
    },
    next: "Use these same CDF and moment ideas with the named normal and lognormal models in Lecture 5.",
    practice: [
      {prompt: "A sensor reports a continuous displacement X. Its density at 3 mm is 1.2 per mm. What does this tell you?", options: ["P(X = 3 mm) is 1.2.", "The density can be valid. An interval probability requires area under the curve.", "All values above 3 mm are impossible.", "The total area under the density exceeds one."], correct: 1, explain: "Density can exceed one in the chosen units. Validity depends on nonnegative density and unit total area."},
      {prompt: "An integer count has F(1) = 0.35 and F(3) = 0.90. What is P(2 ≤ X ≤ 3)?", options: ["0.35", "0.90", "0.65", "0.55"], correct: 3, explain: "Subtract P(X ≤ 1) from P(X ≤ 3). Since X is integer, the remaining outcomes are 2 and 3."},
      {prompt: "A delay has E[X] = 4 min and E[X²] = 25 min². What is its standard deviation?", options: ["3 min", "9 min", "5 min", "21 min"], correct: 0, explain: "The variance is 25 − 4² = 9 min². Its square root is 3 min."},
      {prompt: "A repair-time distribution puts probability 0.51 at 1 hour, 0.39 at 2 hours and 0.10 at 20 hours. Which pair gives the median and mean?", options: ["2 h and 3.29 h", "1 h and 2 h", "1 h and 3.29 h", "2 h and 1 h"], correct: 2, explain: "The CDF has already crossed 0.5 at 1 hour. The long jobs pull the weighted mean up to 0.51 + 0.78 + 2.00 = 3.29 h."},
      {prompt: "A positive length is converted from metres to millimetres. What happens to its coefficient of variation?", options: ["It grows by 1000.", "It stays the same.", "It shrinks by 1000.", "It grows by 1,000,000."], correct: 1, explain: "Both mean and standard deviation are multiplied by 1000, so their ratio is unchanged."}
    ],
    tutorials: [
      {label: "Set 2 Q1 · Contractor bids", url: "https://jiaruilei.github.io/CE2407A_Tutorial2/?question=q1"},
      {label: "Set 2 Q2 · Density and moments", url: "https://jiaruilei.github.io/CE2407A_Tutorial2/?question=q2"}
    ],
    source: {ref: "04", label: "Lecture 4 · Random variables", url: "https://canvas.nus.edu.sg/courses/93981/files/folder/Lecture%20notes?preview=10331143"}
  },
  {
    id: 5,
    title: "Normal and lognormal distributions",
    section: "Lecture notes",
    summary: "Translate a design threshold into a standard normal score, or work backwards from an allowable probability to a design value. For a lognormal quantity, do the calculation on the log scale.",
    goals: [
      "Choose the appropriate measurement scale for a normal or lognormal model.",
      "Calculate a tail probability or percentile using the standard normal CDF.",
      "Convert a lognormal variable’s arithmetic mean and COV into its log parameters."
    ],
    ideas: [
      {name: "Standard normal probabilities", text: "For a normal measurement X with mean μ and standard deviation σ > 0, standardise x to get z. The standard normal CDF Φ gives the probability below that value. Taking its complement gives an exceedance probability.", formula: "z = (x − μ)/σ     ·     P(X ≤ x) = Φ(z)     ·     P(X > x) = 1 − Φ(z)"},
      {name: "Design percentiles", text: "The p-quantile xₚ has probability p below it. An allowable exceedance probability α corresponds to p = 1 − α. With zₚ the standard normal p-quantile, convert back to engineering units.", formula: "zₚ = Φ⁻¹(p)     ·     xₚ = μ + σzₚ for normal X"},
      {name: "Positive, skewed measurements", text: "For lognormal X, the natural logarithm of its numerical value in fixed units is normal. λ is the mean of ln X and ζ > 0 is its standard deviation. Pick units before taking logs and retain them when converting back.", formula: "F(x) = Φ((ln x − λ)/ζ) for x > 0     ·     xₚ = exp(λ + ζzₚ)"},
      {name: "Convert arithmetic moments", text: "Use arithmetic mean μ and coefficient of variation δ = σ/μ to recover the log parameters. The median is exp(λ). A lognormal mean exceeds the median because the upper tail pulls the average upward.", formula: "ζ² = ln(1 + δ²)     ·     λ = ln μ − ζ²/2     ·     μ = exp(λ + ζ²/2)"}
    ],
    example: {
      prompt: "Filter service life X is lognormal with arithmetic mean 100 days and standard deviation 25 days. When should a crew replace a filter if the model should put only 10% of lifetimes below the replacement age?",
      steps: [
        "An early failure corresponds to X ≤ x. We need the lower 10th percentile, so use z₀.₁₀ ≈ −1.282.",
        "In days, δ = 25/100 = 0.25, ζ² = ln(1 + 0.25²) ≈ 0.06062 and ζ ≈ 0.2462.",
        "The log mean is λ = ln(100) − 0.06062/2 ≈ 4.5749.",
        "The replacement age is exp(4.5749 − 1.282 × 0.2462) ≈ 70.8 days. A whole-day schedule meeting the target would replace the filter at 70 days."
      ]
    },
    pitfall: "A standard normal table usually reports lower-tail probabilities. Before reading it, write the event, mark which tail it occupies and convert an upper tail to its complement.",
    activity: {
      prompt: "Single-day demand is normal with mean 12 ML and standard deviation 2 ML. If the daily values are independent, what is the chance that demand exceeds 16 ML on at least one of three days?",
      answer: "The daily probability of staying within capacity is Φ(2) ≈ 0.97725. All three days stay within capacity with probability 0.97725³. At least one exceeds it with probability 1 − 0.97725³ ≈ 0.0667."
    },
    next: "Lecture 6 connects counts and waiting times to the process that produces them.",
    practice: [
      {prompt: "A load is normal with mean 80 kN and standard deviation 10 kN. Which expression gives the probability that it exceeds 95 kN?", options: ["Φ(1.5)", "1 − Φ(0.15)", "1 − Φ(1.5)", "Φ(9.5)"], correct: 2, explain: "The threshold is 1.5 standard deviations above the mean. Exceedance is the upper tail."},
      {prompt: "Normal daily flow has mean 30 L/s and SD 4 L/s. Which capacity is exceeded on about 5% of days? Use z₀.₉₅ = 1.645.", options: ["36.58 L/s", "23.42 L/s", "31.65 L/s", "34.00 L/s"], correct: 0, explain: "Use the upper 95th percentile, 30 + 1.645 × 4 = 36.58 L/s."},
      {prompt: "For a lognormal travel time expressed in seconds, λ = ln 12 and ζ = 0.30. What is the median time?", options: ["0.30 s", "ln 12 s", "12 exp(0.30²/2) s", "12 s"], correct: 3, explain: "The normal log variable has median λ. Undoing the natural log gives exp(λ) = 12 seconds."},
      {prompt: "A lognormal strength has arithmetic mean 50 MPa and COV 0.20. Which expression gives the standard deviation of ln X?", options: ["ln(50)", "√ln(1 + 0.20²)", "ln(1 + 0.20)", "50 × 0.20"], correct: 1, explain: "The exact log variance is ln(1 + δ²). Take the square root to get the log standard deviation."},
      {prompt: "Two independent daily measurements have the same continuous CDF F. Which expression gives P(max(X₁, X₂) ≤ a)?", options: ["2F(a)", "1 − F(a)²", "F(a)²", "2[1 − F(a)]"], correct: 2, explain: "Both measurements must be at or below a. Independence allows multiplication of their two common probabilities."}
    ],
    tutorials: [
      {label: "Set 2 Q3 · Airport capacity", url: "https://jiaruilei.github.io/CE2407A_Tutorial2/?question=q3"},
      {label: "Set 2 Q4 · Annual flood risk", url: "https://jiaruilei.github.io/CE2407A_Tutorial2/?question=q4"}
    ],
    source: {ref: "05", label: "Lecture 5 · Distribution (1)", url: "https://canvas.nus.edu.sg/courses/93981/files/folder/Lecture%20notes?preview=10331144"}
  },
  {
    id: 6,
    title: "Counts and waiting times",
    section: "Lecture notes",
    summary: "Match the model to two choices. Does the process run in trials or continuously in time or distance? Are you counting occurrences or waiting for the first one?",
    goals: [
      "Choose between binomial, geometric, Poisson and exponential distributions.",
      "Convert an event rate into an expected count over a stated exposure.",
      "Relate the probability of no occurrences to the distribution of the first waiting time."
    ],
    ideas: [
      {name: "Fixed number of trials", text: "In a Bernoulli sequence each trial gives success or failure, trials are independent and success probability p stays constant. Over n trials the success count X is binomial. The coefficient C(n,k) counts arrangements with k successes.", formula: "P(X = k) = C(n,k) pᵏ (1 − p)ⁿ⁻ᵏ     ·     E[X] = np     ·     Var(X) = np(1 − p)"},
      {name: "Trials to the first occurrence", text: "In the same sequence, let K count trials up to and including the first success. Its support starts at 1. With 0 < p ≤ 1, the first success at trial k requires k − 1 earlier failures.", formula: "P(K = k) = (1 − p)ᵏ⁻¹p     ·     P(K > n) = (1 − p)ⁿ     ·     E[K] = 1/p"},
      {name: "Count over an exposure", text: "A homogeneous Poisson process has a constant rate ν, independent counts in disjoint intervals and negligible chance of multiple arrivals in a sufficiently short interval relative to its length. For an exposure t, m = νt is the expected count. Match the units of ν and t.", formula: "P(N(t) = k) = exp(−m) mᵏ/k!     ·     E[N(t)] = Var(N(t)) = m"},
      {name: "Continuous wait to the first occurrence", text: "For that same Poisson process, the wait T exceeds t exactly when no event occurs during exposure t. This yields the exponential waiting-time distribution. Its mean 1/ν has units of time or distance.", formula: "P(T > t) = exp(−νt)     ·     F(t) = 1 − exp(−νt) for t ≥ 0     ·     E[T] = 1/ν"}
    ],
    example: {
      prompt: "Service calls to a pump station follow a homogeneous Poisson process at 0.30 calls per hour. Find the chance of two calls in four hours, and the chance that the first call comes after four hours.",
      steps: [
        "The four-hour mean count is m = 0.30 × 4 = 1.2. This is the Poisson parameter for the whole interval.",
        "Exactly two calls have probability exp(−1.2) × 1.2² / 2! ≈ 0.2169.",
        "The first call comes after four hours if the four-hour count is zero. P(T > 4) = exp(−1.2) ≈ 0.3012.",
        "Thus the chance of at least one call within four hours is 1 − 0.3012 = 0.6988. The mean waiting time is 1/0.30 ≈ 3.33 hours."
      ]
    },
    pitfall: "A return period is a mean waiting time. Even if the return period is 20 years, an event can occur in consecutive years or be absent for much longer.",
    activity: {
      prompt: "Assume independent years with constant probability 0.05 of an annual flood threshold being exceeded. Over four years, what is the chance of at least one exceedance? What is the chance the first is in year 4?",
      answer: "The first question counts any nonzero number: 1 − 0.95⁴ ≈ 0.1855. The second specifies the order: three years without an exceedance followed by an exceedance, giving 0.95³ × 0.05 ≈ 0.0429."
    },
    next: "Lecture 7 shows how to obtain the distribution of a response calculated from uncertain inputs.",
    practice: [
      {prompt: "Each of five independent inspections has probability 0.20 of finding a defect. What is the probability of exactly one finding?", options: ["0.20⁵", "1 − 0.80⁵", "0.80⁴ × 0.20", "5 × 0.20 × 0.80⁴"], correct: 3, explain: "There are five possible positions for the inspection that finds a defect. Each sequence has probability 0.20 × 0.80⁴."},
      {prompt: "An inspection succeeds independently with probability 0.25 on each trial. What is the probability that success comes for the first time on trial 3?", options: ["0.75² × 0.25", "0.25³", "1 − 0.75³", "3 × 0.75² × 0.25"], correct: 0, explain: "The order is fixed: failure, failure, success. No combinatorial factor is needed."},
      {prompt: "Cracks form a homogeneous Poisson process along a joint at 0.8 cracks per metre. What is the expected count over 2.5 metres?", options: ["0.32", "0.8", "2.0", "3.125"], correct: 2, explain: "The rate times length is 0.8 × 2.5 = 2.0 cracks. The Poisson parameter changes with exposure."},
      {prompt: "With homogeneous Poisson arrivals, which event has exactly the same probability as waiting more than 15 minutes for the first arrival?", options: ["At most one arrival in 15 minutes", "Zero arrivals in the first 15 minutes", "One arrival at minute 15", "Two arrivals after minute 15"], correct: 1, explain: "If there have been no arrivals in the first 15 minutes, the waiting time extends beyond that interval."},
      {prompt: "Over a day, the service-call rate rises sharply during storms and stays low in dry periods. Which assumption of a single homogeneous Poisson model needs checking first?", options: ["That the event count can be zero", "That events occur at known times", "That every day contains one call", "That the event rate is constant over time"], correct: 3, explain: "The observed change in rate conflicts directly with the constant-rate assumption. Rates specific to weather conditions may be needed."}
    ],
    tutorials: [
      {label: "Set 2 Q5 · Stations and fuel range", url: "https://jiaruilei.github.io/CE2407A_Tutorial2/?question=q5"},
      {label: "Set 2 Q6 · Lock cycle and waiting", url: "https://jiaruilei.github.io/CE2407A_Tutorial2/?question=q6"}
    ],
    source: {ref: "06", label: "Lecture 6 · Distribution (2)", url: "https://canvas.nus.edu.sg/courses/93981/files/folder/Lecture%20notes?preview=10381762"}
  },
  {
    id: 7,
    title: "Functions of random variables",
    section: "Lecture notes",
    summary: "Calculate the uncertainty in a response such as total load, drag or a safety margin. The way inputs vary together matters whenever the response combines them.",
    goals: [
      "Find the support and density of a transformed variable from its inverse branches.",
      "Propagate means, variances and correlation through a linear combination.",
      "Use a normal margin or a lognormal ratio to express a probability of failure."
    ],
    ideas: [
      {name: "Transform a single input", text: "For Y = g(X), first map the support of X to the possible values of Y. For a smooth continuous transformation, find every inverse solution xᵢ of g(xᵢ) = y in the input support. Their density contributions add. For a discrete X, add the masses at all inputs that map to y.", formula: "fᵧ(y) = Σᵢ fₓ(xᵢ) |dxᵢ/dy| at regular values y"},
      {name: "Propagate a linear combination", text: "For Y = aX + bW + c, mean and variance follow from the coefficients and covariance whenever the moments exist. Standard deviations σₓ and σw and the correlation ρ specify the covariance. Positive covariance increases the variance of a sum but reduces the variance of a difference.", formula: "E[Y] = aμₓ + bμw + c     ·     Var(Y) = a²σₓ² + b²σw² + 2abρσₓσw"},
      {name: "Normal safety margin", text: "Let R denote resistance and S the applied load in the same units. Under joint normality the margin G = R − S is normal. A negative margin is failure. The mean and variance formulas apply more broadly, but a probability from Φ requires a normal margin.", formula: "μɢ = μᵣ − μₛ     ·     σɢ² = σᵣ² + σₛ² − 2 Cov(R,S)     ·     P(G < 0) = Φ(−μɢ/σɢ) for σɢ > 0"},
      {name: "Products and quotients", text: "For positive inputs with jointly normal logarithms, log a product or quotient to turn it into a linear combination. For independent lognormal R and S, ln(R/S) is normal. Its mean subtracts the two log means and its variance adds their log variances.", formula: "ln(R/S) = ln R − ln S     ·     R < S exactly when ln(R/S) < 0"}
    ],
    example: {
      prompt: "Two jointly normal line loads X and W have means 18 and 12 kN/m, standard deviations 3 and 2 kN/m and correlation 0.50. A support is rated for a total of 38 kN/m. How often does the combined load exceed that rating?",
      steps: [
        "For Y = X + W, the mean total is 18 + 12 = 30 kN/m.",
        "The covariance is 0.50 × 3 × 2 = 3 (kN/m)². Var(Y) = 3² + 2² + 2 × 3 = 19 (kN/m)².",
        "Joint normality makes Y normal, with standard deviation √19 ≈ 4.36 kN/m. The rating lies (38 − 30)/√19 ≈ 1.84 standard deviations above the mean.",
        "P(Y > 38) = 1 − Φ(8/√19) ≈ 0.0332. Assuming independence would omit the positive covariance and understate this upper-tail risk."
      ]
    },
    pitfall: "Zero correlation rules out linear association but does not generally imply independence. Likewise, two normal marginal distributions alone do not establish that their sum is normal.",
    activity: {
      prompt: "X is uniform on [−1, 1] and Y = X². How often is Y ≤ 0.25? Which original values contribute to that probability?",
      answer: "The event X² ≤ 0.25 is −0.5 ≤ X ≤ 0.5. It covers length 1 in an interval of length 2, so the probability is 0.5. For 0 < y < 1, both x = −√y and x = √y contribute to the density of Y."
    },
    next: "Compare the transformed-variable and reliability questions in Tutorial Set 2, then check your distribution choice before calculating.",
    practice: [
      {prompt: "Speed X is nonnegative and drag is Y = 4X². For y > 0, which input can contribute to fᵧ(y)?", options: ["Only x = √y/2", "Both x = √y/2 and x = −√y/2", "Only x = 4√y", "Every x ≤ √y"], correct: 0, explain: "Solving 4x² = y gives two algebraic roots. Only the positive root lies in the speed’s support."},
      {prompt: "A displacement X has SD 3 mm. An instrument reports Y = 10 − 2X in consistent units. What is the SD of Y?", options: ["−6 mm", "4 mm", "12 mm", "6 mm"], correct: 3, explain: "Adding a constant leaves spread unchanged. The standard deviation scales by the absolute value of the multiplier, |−2| × 3 = 6."},
      {prompt: "Resistance R and load S have fixed means and standard deviations. What happens to Var(R − S) as their correlation increases?", options: ["It increases.", "It decreases.", "It stays constant.", "It equals Var(R) − Var(S)."], correct: 1, explain: "The covariance term is subtracted twice in the variance of a difference. Positive co-movement makes the difference vary less."},
      {prompt: "An engineer knows only that two loads each have a normal marginal distribution. What additional condition is sufficient for their sum to be normal?", options: ["Their means are equal.", "They have the same units.", "They are jointly normal.", "They have positive correlation."], correct: 2, explain: "Jointly normal variables have normal linear combinations. The marginal forms alone do not specify how the loads depend on each other."},
      {prompt: "Independent lognormal R and S have log standard deviations 0.3 and 0.4. What is the standard deviation of ln(R/S)?", options: ["0.1", "0.25", "0.7", "0.5"], correct: 3, explain: "The independent log variances add for a difference. The log standard deviation is √(0.3² + 0.4²) = 0.5."}
    ],
    tutorials: [
      {label: "Set 2 Q7 · Velocity to drag force", url: "https://jiaruilei.github.io/CE2407A_Tutorial2/?question=q7"},
      {label: "Set 2 Q8 · Beam reliability", url: "https://jiaruilei.github.io/CE2407A_Tutorial2/?question=q8"},
      {label: "Set 2 Q9 · Column sizing", url: "https://jiaruilei.github.io/CE2407A_Tutorial2/?question=q9"}
    ],
    source: {ref: "07", label: "Lecture 7 · Functions of random variables", url: "https://canvas.nus.edu.sg/courses/93981/files/folder/Lecture%20notes?preview=10381765"}
  }
);
