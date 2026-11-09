// Original revision examples and questions. Probabilities use lower-tail quantiles.
(window.CHAPTERS ||= []).push(
  {
    id: 8,
    title: "Point estimation",
    section: "Blended learning",
    source: { ref: "L1", label: "Blended L1 · Point estimation", url: "https://canvas.nus.edu.sg/courses/93981/files/folder/Lecture%20notes%20for%20Blended%20learning?preview=10491764" },
    summary: "Use a sample to estimate a physical quantity or a parameter in a probability model. The units of the estimate provide a quick check on the algebra.",
    goals: [
      "Distinguish the population parameter, its estimator and the observed estimate.",
      "Match a sample moment to its theoretical counterpart and solve for a model parameter.",
      "Calculate the sample variance and the estimated standard error of a sample mean."
    ],
    ideas: [
      { name: "Parameter and estimate", text: "The population mean μ is a fixed, usually unknown quantity. The sample mean X̄ varies from sample to sample. Once measurements are available, their average x̄ is the observed estimate." },
      { name: "Method of moments", text: "For a model with one unknown parameter θ, write its theoretical mean as a function of θ and set it equal to the sample mean. Two unknown parameters generally require two independent moment equations.", formula: "Eθ[X] = x̄" },
      { name: "Spread and precision", text: "For n independent observations from one population with finite variance, s² estimates the variance of individual measurements. The estimated standard error describes the variation of the sample mean over repeated samples.", formula: "s² = Σ(xᵢ − x̄)² / (n − 1)     SE(X̄) ≈ s / √n" }
    ],
    example: {
      prompt: "A sensor runs for 8, 12, 16 and 12 days between successive resets. Assume independent exponential waiting times with constant rate λ. Estimate the reset rate.",
      steps: [
        "The exponential model gives E[T] = 1/λ days. The four waits have sample mean (8 + 12 + 16 + 12)/4 = 12 days.",
        "Match the first moment: 1/λ̂ = 12 days, so λ̂ = 1/12 ≈ 0.0833 resets per day.",
        "The fitted rate corresponds to about 2.5 resets per 30 days on average. The count in any particular month can differ."
      ]
    },
    pitfall: "If the sample variance is supplied, the divisor n − 1 is ordinarily already included. Take its square root once to recover the sample standard deviation.",
    activity: { prompt: "A second sensor has twice the mean waiting time of the first. What happens to the estimated exponential rate?", answer: "It halves, from 1/12 to 1/24 resets per day. Mean waiting time and rate are reciprocals in this model." },
    next: "Continue to sampling distributions to see how a point estimate varies across repeated samples.",
    practice: [
      { prompt: "A contractor weighs five precast panels. Which quantity is a population parameter?", options: ["The mean of the five measured masses", "The mean mass of all panels from this production process", "The largest of the five masses", "The range of the five masses"], correct: 1, explain: "The process-wide mean refers to the population. Each of the other quantities depends on the five panels selected." },
      { prompt: "An exponential model has mean 1/λ. The observed mean repair duration is 5 hours. What is the moment estimate of λ?", options: ["5 per hour", "25 per hour", "0.20 per hour", "0.04 per hour"], correct: 2, explain: "Set 1/λ̂ = 5 hours and invert. The estimate is 0.20 repairs per hour." },
      { prompt: "Three penetration depths are 3, 5 and 7 mm. What is the unbiased sample variance?", options: ["4 mm²", "2 mm²", "8/3 mm²", "8 mm²"], correct: 0, explain: "The mean is 5 mm. The squared deviations sum to 4 + 0 + 4 = 8 mm². Dividing by 3 − 1 gives 4 mm²." },
      { prompt: "Sixteen independent diameter measurements have sample standard deviation 0.8 mm. What is the estimated standard error of their mean?", options: ["0.05 mm", "0.64 mm", "0.80 mm", "0.20 mm"], correct: 3, explain: "Divide the standard deviation by √16 = 4. The estimated standard error is 0.8/4 = 0.20 mm." }
    ],
    tutorials: [{ label: "Set 3 · Q1 · Fit a model to wave heights", url: "https://jiaruilei.github.io/CE2407A_Tutorial3/?question=q1" }]
  },
  {
    id: 9,
    title: "Sampling distributions",
    section: "Blended learning",
    source: { ref: "L2", label: "Blended L2 · Sampling distributions", url: "https://canvas.nus.edu.sg/courses/93981/files/folder/Lecture%20notes%20for%20Blended%20learning?preview=10491765" },
    summary: "Imagine repeating the same sampling procedure many times. The distribution of the resulting statistic tells you how much an estimate can fluctuate.",
    goals: [
      "Calculate the mean and standard error of a sample mean.",
      "Choose a normal or Student’s t reference distribution and identify when it is exact.",
      "Recognise the chi-square statistic associated with sample variance."
    ],
    ideas: [
      { name: "Averages over repeated samples", text: "For n independent observations drawn from the same population with mean μ and finite standard deviation σ, the sample mean has mean μ. Its standard error is smaller than σ by a factor of √n.", formula: "E[X̄] = μ     SD(X̄) = σ / √n" },
      { name: "Normal and Student’s t", text: "Under independent normal sampling, standardising X̄ with known σ gives a standard normal variable. Replacing σ with the sample standard deviation S gives a Student’s t variable with n − 1 degrees of freedom. For non-normal data, the central limit theorem can justify a normal approximation to X̄ as n increases.", formula: "Z = (X̄ − μ) / (σ/√n)     T = (X̄ − μ) / (S/√n)" },
      { name: "Sampling variation in a variance", text: "If the observations are independent and normally distributed, the scaled sample variance has a chi-square distribution. Here S² is the sample variance with divisor n − 1.", formula: "(n − 1)S² / σ² ∼ χ² with n − 1 degrees of freedom" }
    ],
    example: {
      prompt: "Individual anchor pull-out loads are independent and normal with mean 80 kN and standard deviation 12 kN. What is the probability that the mean of nine loads is below 74 kN?",
      steps: [
        "The sample mean has the same centre, 80 kN, and a standard error of 12/√9 = 4 kN.",
        "Standardise the threshold for the mean: z = (74 − 80)/4 = −1.5.",
        "The standard normal lower-tail probability Φ(−1.5) is about 0.0668. About 6.7% of such groups of nine would average below 74 kN."
      ]
    },
    pitfall: "Check which quantity the question measures. An individual anchor in the example has standard deviation 12 kN. The average of nine has standard deviation 4 kN.",
    activity: { prompt: "How many anchors would reduce the standard error from 4 kN to 2 kN?", answer: "Use 36 anchors. The target requires 12/√n = 2, so √n = 6. Halving the standard error requires four times the sample size." },
    next: "Continue to inference for means to turn a sampling distribution into a confidence interval or test.",
    practice: [
      { prompt: "A normal population has mean 60 and standard deviation 10. What are the mean and standard error of the average of 25 independent observations?", options: ["60 and 10", "12 and 2", "60 and 2", "60 and 0.4"], correct: 2, explain: "The centre remains 60 and the standard error becomes 10/√25 = 2." },
      { prompt: "Eight independent specimens come from a normal population with unknown σ. Which reference distribution describes (X̄ − μ)/(S/√8) exactly?", options: ["Normal with 7 degrees of freedom", "Student’s t with 7 degrees of freedom", "Student’s t with 8 degrees of freedom", "Chi-square with 7 degrees of freedom"], correct: 1, explain: "Estimating σ by S gives a Student’s t statistic. Its degrees of freedom are 8 − 1 = 7." },
      { prompt: "What does the central limit theorem tell you about an increasing number of independent observations from the same skewed population with finite variance?", options: ["Each observation becomes normal", "The sample standard deviation approaches zero", "The skewed population changes shape", "The distribution of the standardised mean approaches normal"], correct: 3, explain: "The theorem describes the standardised average across repeated samples. The original population may remain skewed." },
      { prompt: "For 10 independent observations from a normal population, (n − 1)S²/σ² follows which distribution?", options: ["Chi-square with 9 degrees of freedom", "Chi-square with 10 degrees of freedom", "Student’s t with 9 degrees of freedom", "Standard normal"], correct: 0, explain: "The variance pivot uses n − 1 independent deviations about the estimated mean, giving 9 degrees of freedom." }
    ],
    tutorials: [{ label: "Set 3 · Q3 · Compare normal and t intervals", url: "https://jiaruilei.github.io/CE2407A_Tutorial3/?question=q3" }]
  },
  {
    id: 10,
    title: "Inference for a mean",
    section: "Blended learning",
    source: { ref: "L3", label: "Blended L3 · Statistical inferences", url: "https://canvas.nus.edu.sg/courses/93981/files/folder/Lecture%20notes%20for%20Blended%20learning?preview=10491766" },
    summary: "Estimate a population mean with a confidence interval, or test an engineering claim by measuring the discrepancy in standard errors.",
    goals: [
      "Build a confidence interval using the appropriate reference distribution.",
      "Determine a sample size for a target precision when σ is known.",
      "Set the alternative and rejection tail from the engineering question."
    ],
    ideas: [
      { name: "Confidence interval", text: "For an independent normal sample with unknown σ, use the t critical value for n − 1 degrees of freedom. Here t* is the lower-tail quantile at 1 − α/2 for a two-sided interval with confidence 1 − α. With known σ, use z* and σ instead.", formula: "x̄ ± t* s/√n" },
      { name: "One-sided confidence limit", text: "A minimum capacity claim calls for a lower limit. With the same normal-sample assumptions, put all of α in one tail. In the lecture’s upper-tail table, use the column α for a one-sided limit and α/2 for a two-sided interval.", formula: "Lower limit = x̄ − t* s/√n, with P(T > t*) = α" },
      { name: "Precision before sampling", text: "With known σ, choose n to achieve a two-sided normal interval with half-width at most E. Round the calculated sample size upward to meet the target.", formula: "n ≥ (z* σ / E)²" },
      { name: "Test and direction", text: "Write the null value μ₀ and alternative before inspecting the result. An alternative μ > μ₀ uses the upper tail, μ < μ₀ uses the lower tail, and μ ≠ μ₀ uses both. Type I error means rejecting a true null. Type II error means failing to reject a false null.", formula: "t = (x̄ − μ₀) / (s/√n)" }
    ],
    example: {
      prompt: "Sixteen independent core strengths from a normal population average 31.0 MPa with sample standard deviation 2.4 MPa. Estimate the mean with a two-sided 95% confidence interval.",
      steps: [
        "The population standard deviation is unknown. Use Student’s t with 15 degrees of freedom. The 0.975 quantile is 2.131.",
        "The estimated standard error is 2.4/√16 = 0.60 MPa. The margin of error is 2.131 × 0.60 ≈ 1.28 MPa.",
        "The interval is 31.0 ± 1.28, or about 29.72 to 32.28 MPa. Under repeated sampling, about 95% of intervals constructed by this method would contain the population mean."
      ]
    },
    pitfall: "A confidence interval for the mean describes uncertainty about a population average. Predicting the strength of one future core also requires accounting for variation between cores.",
    activity: { prompt: "Using the example, would the corresponding two-sided 5% test reject a claimed population mean of 33 MPa?", answer: "Yes. The claimed 33 MPa falls outside the 95% interval. Equivalently, t = (31 − 33)/0.60 = −3.33, below the critical value −2.131." },
    next: "Continue to inference for a variance when the specification concerns consistency or spread.",
    practice: [
      { prompt: "A normal population has known σ = 3 mm. For n = 36 and z* = 1.96, what is the margin of error of a 95% interval for μ?", options: ["0.98 mm", "1.96 mm", "0.16 mm", "5.88 mm"], correct: 0, explain: "The standard error is 3/6 = 0.5 mm. Multiplying by 1.96 gives 0.98 mm." },
      { prompt: "With known σ = 5 kN, z* = 1.96 and desired margin of error 2 kN, what is the minimum n?", options: ["24", "5", "25", "49"], correct: 2, explain: "The calculation gives (1.96 × 5/2)² = 24.01. Round up to 25 to keep the margin within 2 kN." },
      { prompt: "A client wants evidence that the mean queue time has fallen below 6 minutes. Which alternative is appropriate?", options: ["μ > 6", "μ < 6", "μ ≠ 6", "σ < 6"], correct: 1, explain: "The claim concerns a decrease in the population mean, so the rejection region is in the lower tail." },
      { prompt: "A two-sided 5% test of H₀: μ = 50 gives p = 0.12. Which conclusion follows?", options: ["The probability H₀ is true is 0.12", "Reject H₀ because 0.12 is small", "The probability H₀ is false is 0.88", "The sample provides insufficient evidence against H₀ at 5%"], correct: 3, explain: "The p-value exceeds α = 0.05. The test fails to reject the null. A p-value is calculated assuming the null and does not give the probability that the null is true." }
    ],
    tutorials: [
      { label: "Set 3 · Q2 · Plan the sample size", url: "https://jiaruilei.github.io/CE2407A_Tutorial3/?question=q2" },
      { label: "Set 3 · Q3 · Pile capacity interval", url: "https://jiaruilei.github.io/CE2407A_Tutorial3/?question=q3" },
      { label: "Set 3 · Q4 · Test a mean wave period", url: "https://jiaruilei.github.io/CE2407A_Tutorial3/?question=q4" }
    ]
  },
  {
    id: 11,
    title: "Inference for a variance",
    section: "Blended learning",
    source: { ref: "L3", label: "Blended L3 · Statistical inferences", url: "https://canvas.nus.edu.sg/courses/93981/files/folder/Lecture%20notes%20for%20Blended%20learning?preview=10491766" },
    summary: "A production line can meet its target mean while delivering an inconsistent product. Use a sample variance to assess the variability of a normal population.",
    goals: [
      "Distinguish a specification for standard deviation from one for variance.",
      "Test a claim about variability using a chi-square statistic.",
      "Build an interval for variance and convert its endpoints to standard deviations."
    ],
    ideas: [
      { name: "One variance", text: "For independent observations from a normal population, the sample variance S² with divisor n − 1 has a known scaled distribution. Under the null, σ₀² is the reference variance and ν = n − 1 is the degrees of freedom.", formula: "Q = (n − 1)S² / σ₀²     Q ∼ χ²(ν) under H₀" },
      { name: "Select a tail", text: "If the concern is excessive variability, use an upper-tailed test because larger sample variances give larger Q. A target of reduced variability calls for the lower tail. A two-sided alternative divides α across the two tails." },
      { name: "Interval for variance", text: "Write qₚ for the lower-tail p quantile of χ²(ν). For a two-sided confidence level 1 − α, the larger quantile divides the lower endpoint. Take the square root of each endpoint for an interval in standard deviation units.", formula: "[(n − 1)s²/q₁₋α⁄₂, (n − 1)s²/qα⁄₂]" }
    ],
    example: {
      prompt: "A line is set to deliver fasteners with diameter standard deviation 0.30 mm. Sixteen independent measurements from a normal process have sample standard deviation 0.45 mm. Is there evidence of excessive variability at 5%?",
      steps: [
        "Use the boundary value H₀: σ = 0.30 mm and H₁: σ > 0.30 mm. There are 16 − 1 = 15 degrees of freedom.",
        "The statistic is Q = 15 × 0.45²/0.30² = 33.75. Both variances are in mm², so Q has no units.",
        "The upper 5% cutoff is the 0.95 lower-tail quantile, approximately 25.00. Since 33.75 exceeds 25.00, the sample supports increased variability."
      ]
    },
    pitfall: "Chi-square critical values are asymmetric. Read the table’s tail heading before choosing a cutoff, and square any standard deviations before using the variance formula.",
    activity: { prompt: "If the measured standard deviation were 0.30 mm instead, would the upper-tailed test reject at 5%?", answer: "No. Q would be 15 × 0.30²/0.30² = 15, below the upper cutoff of 25.00." },
    next: "Continue to goodness of fit to assess the shape of a model using grouped observations.",
    practice: [
      { prompt: "A normal sample of 11 thicknesses has s = 0.60 mm. Under H₀: σ = 0.50 mm, what is Q?", options: ["12.0", "14.4", "15.84", "6.94"], correct: 1, explain: "There are 10 degrees of freedom. The statistic is 10 × 0.60²/0.50² = 14.4." },
      { prompt: "An engineer tests whether process variability has decreased below a specified level. Where is the rejection region?", options: ["Upper chi-square tail", "Both t tails", "Lower chi-square tail", "Upper normal tail"], correct: 2, explain: "A lower sample variance produces a smaller Q. An unusually small Q supports a decrease." },
      { prompt: "A confidence interval for σ² is [0.16, 0.81] mm². What is the matching interval for σ?", options: ["[0.40, 0.90] mm", "[0.08, 0.405] mm", "[0.0256, 0.6561] mm", "[0.16, 0.81] mm"], correct: 0, explain: "Take the positive square roots of both endpoints. The resulting units are millimetres." },
      { prompt: "Which assumption gives the exact chi-square distribution for this one-sample variance test?", options: ["The population variance must be known", "At least 30 observations suffice for every population", "The sample mean must be zero", "The observations are independent draws from one normal population"], correct: 3, explain: "The variance pivot has the stated chi-square distribution under independent normal sampling. Strong non-normality can distort the test." }
    ],
    tutorials: [
      { label: "Set 3 · Q5 · Test variability in bus arrivals", url: "https://jiaruilei.github.io/CE2407A_Tutorial3/?question=q5" },
      { label: "Set 3 · Q6 · Battery-life variation", url: "https://jiaruilei.github.io/CE2407A_Tutorial3/?question=q6" }
    ]
  },
  {
    id: 12,
    title: "Goodness of fit",
    section: "Blended learning",
    source: { ref: "L4", label: "Blended L4 · Goodness of fit test", url: "https://canvas.nus.edu.sg/courses/93981/files/folder/Lecture%20notes%20for%20Blended%20learning?preview=10491767" },
    summary: "Compare observed counts with the frequencies predicted by a proposed probability model. A poor fit appears as discrepancies that are large relative to the expected counts.",
    goals: [
      "Convert model probabilities into expected frequencies, including the end tails.",
      "Pool sparse categories and compute a chi-square goodness-of-fit statistic.",
      "Adjust the degrees of freedom when parameters were estimated from the same data."
    ],
    ideas: [
      { name: "Probability to expected frequency", text: "Place every observation in one of a set of disjoint, exhaustive bins. For a continuous model with CDF F, the bin from a to b has probability F(b) − F(a). Include all model mass in the first and last bins.", formula: "pᵢ = P(X in bin i)     Eᵢ = n pᵢ" },
      { name: "A discrete tail bin", text: "If T counts independent trials up to the first event and each trial has event probability p, T is geometric. With p = 0.25, a final bin labelled ‘5 or more’ requires four initial trials without the event. Its probability is 0.75⁴ ≈ 0.316, so 100 observations give an expected count of about 31.6.", formula: "P(T ≥ k) = (1 − p)ᵏ⁻¹" },
      { name: "Compare like counts", text: "Use observed and expected counts for the same bins. Merge sparse adjoining bins when needed and add both their observed and expected counts. The chi-square approximation requires sufficiently large expected counts.", formula: "Q = Σ (Oᵢ − Eᵢ)² / Eᵢ" },
      { name: "Degrees of freedom", text: "For k bins after pooling and m model parameters estimated from the sample, the usual reference has k − 1 − m degrees of freedom. Parameters fixed before seeing this sample do not use degrees of freedom. Large Q gives evidence against the proposed model.", formula: "ν = k − 1 − m" }
    ],
    example: {
      prompt: "A drainage model predicts fixed probabilities 0.10, 0.20, 0.40 and 0.30 for four flow bands. Independent observations on 100 events give counts 12, 16, 38 and 34. Do the data contradict the model at 5%?",
      steps: [
        "Expected counts are 10, 20, 40 and 30. They add to 100 and are large enough to use the usual chi-square approximation.",
        "Calculate Q = 2²/10 + (−4)²/20 + (−2)²/40 + 4²/30 = 0.40 + 0.80 + 0.10 + 0.533 ≈ 1.83.",
        "There are 4 − 1 − 0 = 3 degrees of freedom. The upper 5% critical value is 7.815. The data provide insufficient evidence to reject the specified probabilities."
      ]
    },
    pitfall: "The denominator in each contribution is the expected count. After pooling bins, recompute the contribution from their combined counts.",
    activity: { prompt: "Which flow band contributes the most to the example’s statistic? The second and fourth bands each miss by four observations.", answer: "The second band contributes 16/20 = 0.80. The fourth contributes 16/30 ≈ 0.53. The same absolute error weighs more when the expected count is smaller." },
    next: "Continue to regression to model how an engineering response changes with a measured input.",
    practice: [
      { prompt: "For a continuous model, F(8) = 0.20 and F(12) = 0.65. Among 200 independent readings, how many are expected in (8, 12]?", options: ["40", "130", "170", "90"], correct: 3, explain: "The bin probability is 0.65 − 0.20 = 0.45. Multiplying by 200 gives 90." },
      { prompt: "A normal distribution’s mean and standard deviation are fitted to the sample. After pooling there are seven bins. What degrees of freedom apply?", options: ["6", "5", "4", "7"], correct: 2, explain: "With k = 7 and m = 2 fitted parameters, ν = 7 − 1 − 2 = 4." },
      { prompt: "Two adjacent tail bins have observed counts 1 and 7 and expected counts 2 and 6. What is their contribution after pooling?", options: ["0", "0.67", "1", "8"], correct: 0, explain: "The new observed and expected counts are both 8. The combined contribution is (8 − 8)²/8 = 0." },
      { prompt: "The observed Q is 10.2 and the upper 5% cutoff is 9.49. Which interpretation is justified?", options: ["The model is true with probability 0.05", "The observed counts give evidence against the model at 5%", "The distribution is proven false", "An even smaller Q would give stronger evidence against the model"], correct: 1, explain: "The summed discrepancy exceeds the upper-tail cutoff. The test provides evidence of lack of fit at the chosen significance level." }
    ],
    tutorials: []
  },
  {
    id: 13,
    title: "Regression analysis",
    section: "Blended learning",
    source: { ref: "L5", label: "Blended L5 · Regression analysis", url: "https://canvas.nus.edu.sg/courses/93981/files/folder/Lecture%20notes%20for%20Blended%20learning?preview=10491768" },
    summary: "Fit a line to paired measurements, use it to predict the mean response, and check how much of the observed variation the line explains.",
    goals: [
      "Calculate and interpret the least-squares slope and intercept, including their units.",
      "Use residuals and R² to describe the fit of a line.",
      "Distinguish the direction of correlation from the fraction of variation explained."
    ],
    ideas: [
      { name: "Read the scatterplot", text: "Plot the response on the vertical axis and the input on the horizontal axis. Look for the direction of association, curvature, clusters and unusual points. A single straight line is a sensible starting model if the centre of the response follows an approximately straight path through the observed range." },
      { name: "Least-squares line", text: "For paired values (xᵢ, yᵢ), centre each variable at its sample mean. Define Sxx = Σ(xᵢ − x̄)² and Sxy = Σ(xᵢ − x̄)(yᵢ − ȳ). When x varies, the following line minimises the sum of squared vertical residuals.", formula: "ŷ = a + bx     b = Sxy/Sxx     a = ȳ − bx̄" },
      { name: "Residual and explained variation", text: "A residual is measured minus fitted response. For a least-squares line with intercept and nonconstant y, compare the total squared residuals (RSS) with total variation Syy = Σ(yᵢ − ȳ)². Inspect residuals for curvature or changes in spread that a single R² may conceal.", formula: "eᵢ = yᵢ − ŷᵢ     R² = 1 − RSS/Syy" },
      { name: "Correlation", text: "Pearson’s correlation r is dimensionless. It measures linear association when both variables vary. For simple linear regression with an intercept, r shares the slope’s sign and r² = R². The slope itself has units of response per unit of input.", formula: "r = Sxy / √(Sxx Syy)" }
    ],
    example: {
      prompt: "A displacement gauge reads 1, 2 and 4 mm at applied loads of 0, 2 and 4 kN respectively. Fit a line and predict the reading at 3 kN.",
      steps: [
        "The mean load is 2 kN and the mean reading is 7/3 mm. The centred loads are −2, 0, 2. Hence Sxx = 8 kN² and Sxy = 6 kN·mm.",
        "The slope is 6/8 = 0.75 mm/kN and the intercept is 7/3 − 0.75 × 2 = 5/6 mm. The fitted reading at 3 kN is 5/6 + 0.75 × 3 ≈ 3.08 mm.",
        "At 2 kN the line predicts 7/3 mm. The residual is 2 − 7/3 = −1/3 mm, so this gauge reading lies below the fitted line."
      ]
    },
    pitfall: "A high R² over a measured range gives little guidance about behaviour far beyond it. The prediction at 3 kN is an interpolation between the minimum and maximum measured loads.",
    activity: { prompt: "The fitted line in the example predicts 8.33 mm at 10 kN. Why should this prediction receive extra scrutiny?", answer: "Ten kN is outside the 0–4 kN calibration range. The data do not show whether the gauge keeps a linear response at that higher load." },
    next: "Revisit model selection, uncertainty and goodness of fit when judging whether a prediction is suitable for an engineering decision.",
    practice: [
      { prompt: "A calibration has Sxy = 18 kN·mm and Sxx = 12 kN². What is the fitted slope for displacement on load?", options: ["0.67 kN/mm", "1.5 mm/kN", "6 mm", "216 kN³·mm"], correct: 1, explain: "b = Sxy/Sxx = 18/12 = 1.5 mm per kN. The units follow from the fitted response and input." },
      { prompt: "A fitted line is ŷ = 3 + 0.4x. At x = 5 the observed y is 4.6. What is the residual?", options: ["+0.4", "−0.6", "+5.0", "−0.4"], correct: 3, explain: "The fitted value is 3 + 0.4 × 5 = 5. The residual is observed minus fitted, 4.6 − 5 = −0.4." },
      { prompt: "For a least-squares line with intercept, RSS = 12 and Syy = 50. What fraction of observed response variation is explained?", options: ["0.76", "0.24", "0.12", "0.38"], correct: 0, explain: "R² = 1 − 12/50 = 0.76. The line accounts for 76% of the measured variation in y about its mean." },
      { prompt: "A simple linear regression with an intercept has R² = 0.81 and a negative slope. What is Pearson’s r?", options: ["+0.81", "−0.81", "−0.90", "+0.90"], correct: 2, explain: "In this setting r² = 0.81, so |r| = 0.90. The negative slope determines the negative sign." }
    ],
    tutorials: []
  }
);
