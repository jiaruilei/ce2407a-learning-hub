/* Presentation of the question bank: a first-step hint for each question,
   and typed responses for calculations. Units are printed beside the input. */
(() => {
  const hints = {
    1: [
      "Ask whether more observations would change the material itself.",
      "Compute the fraction in the bin, then divide by the width.",
      "Compare the areas of the two bars.",
      "What physical effect is missing from the model?",
      "Compare a statement about these 30 loads with one about all future loads."
    ],
    2: [
      "Read the union aloud, then negate the whole statement.",
      "The overlap was included in both marginal probabilities.",
      "Can the two outcomes contribute any overlap?",
      "Try each single failure in turn: does the subsystem still work?",
      "Compare the total length of the two regions to the full span."
    ],
    3: [
      "The given condition determines the denominator.",
      "It is easier to find the chance that neither trip is delayed.",
      "Imagine 1,000 pieces. Count true flags and false flags separately.",
      "Compare the intersection with the product of the two marginal probabilities.",
      "Draw one branch for wet weather and one for dry weather."
    ],
    4: [
      "Check the units: is this an area or a height?",
      "Subtract the CDF at the greatest integer just below the interval.",
      "Subtract the square of the mean from the second moment, then restore the original units.",
      "Accumulate probability to find the median; weight all three values to find the mean.",
      "What does a change of units do to both σ and μ?"
    ],
    5: [
      "Sketch the region above the threshold before consulting a CDF.",
      "Move from the mean by the specified number of standard deviations.",
      "Find the median on the log scale, then change back to seconds.",
      "Begin with the relationship between the log variance and the squared coefficient of variation.",
      "If the maximum is below the threshold, what must be true of each day?"
    ],
    6: [
      "Count the possible positions of the one finding among the five trials.",
      "Write the outcomes required on trials one and two before the first success.",
      "Multiply the process rate by the length of joint inspected.",
      "Describe the number of arrivals before minute 15.",
      "The word homogeneous concerns how the rate behaves across equal intervals."
    ],
    7: [
      "Solve the transformation, then reject any root outside the input support.",
      "A fixed offset shifts all readings equally. Which part changes their spread?",
      "Inspect the sign of the covariance term for a difference.",
      "A marginal model concerns just one variable. What must be true of their joint model?",
      "Take logs of the ratio first, then add the independent variances."
    ],
    8: [
      "Which target would stay the same if a different set of five panels were sampled?",
      "Match the theoretical mean to the observed average, then solve for the rate.",
      "Find the three deviations from the sample mean; check the variance divisor.",
      "The precision of the average improves with the square root of the number sampled."
    ],
    9: [
      "Averaging changes the spread; the expected centre stays put.",
      "The denominator contains an estimated standard deviation from the same small sample.",
      "Distinguish the shape of the raw data from that of repeated sample means.",
      "Identify which normal-sample statistic uses the squared deviations."
    ],
    10: [
      "Find the standard error before applying the confidence multiplier.",
      "Solve the margin-of-error equation for n and check the rounding direction.",
      "Translate “fallen below” into a statement about the target parameter.",
      "Compare the p-value to the chosen significance level."
    ],
    11: [
      "Use n − 1 degrees of freedom and the ratio of variances, not standard deviations.",
      "What values of the sample variance would support the engineer’s alternative?",
      "Convert both endpoints to the units of a standard deviation.",
      "Check both the sampling assumptions and the distribution of the underlying observations."
    ],
    12: [
      "The difference between the two CDF values gives a bin probability, not a count.",
      "Start with the final number of bins; subtract one and the fitted-parameter count.",
      "Sum observed counts and expected counts separately before calculating the contribution.",
      "Large departures from expected counts increase the test statistic."
    ],
    13: [
      "Use the cross-product sum as the numerator and the input sum of squares as the denominator.",
      "Calculate the fitted value first. A residual is observed minus fitted.",
      "Find the fraction of variation left unexplained and take its complement.",
      "R² loses the sign; the slope restores that information."
    ]
  };
  // [one-based question, answer, absolute tolerance, input unit, feedback]
  const numeric = {
    1:[[2,.04,.0001,"kN⁻¹","0.04 kN⁻¹"]],
    2:[[2,.38,.0001,"probability (0–1)","0.38"],[3,.53,.0001,"probability (0–1)","0.53"]],
    3:[[1,.3,.0001,"probability (0–1)","0.30"],[2,.28,.0001,"probability (0–1)","0.28"],[5,.08,.0001,"probability (0–1)","0.08"]],
    4:[[2,.55,.0001,"probability (0–1)","0.55"],[3,3,.001,"min","3 min"]],
    5:[[2,36.58,.05,"L/s","36.58 L/s"],[3,12,.001,"s","12 s"]],
    6:[[1,.4096,.0006,"probability (0–1)","0.4096"],[2,.140625,.0006,"probability (0–1)","0.140625"],[3,2,.001,"cracks","2 cracks"]],
    7:[[2,6,.001,"mm","6 mm"],[5,.5,.0001,"log standard deviation","0.50"]],
    8:[[2,.2,.0001,"h⁻¹","0.20 h⁻¹"],[3,4,.001,"mm²","4 mm²"],[4,.2,.0001,"mm","0.20 mm"]],
    10:[[1,.98,.001,"mm","0.98 mm"],[2,25,0,"observations","25 observations"]],
    11:[[1,14.4,.01,"χ² statistic","14.4"]],
    12:[[1,90,.001,"readings","90 readings"],[2,4,0,"degrees of freedom","4"],[3,0,.0001,"χ² contribution","0"]],
    13:[[1,1.5,.001,"mm/kN","1.5 mm/kN"],[2,-.4,.001,"residual","−0.4"],[3,.76,.0001,"fraction (0–1)","0.76"],[4,-.9,.0001,"correlation","−0.90"]]
  };
  for (const c of window.CHAPTERS) {
    c.practice.forEach((q,i) => { q.hint = hints[c.id][i]; });
    for (const [i, answer, tolerance, unit, display] of numeric[c.id] || []) {
      c.practice[i-1].numeric = {answer,tolerance,unit,display};
    }
  }
})();
