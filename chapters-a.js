/* Original study activities. The source links open the corresponding NUS Canvas notes. */
(() => {
  const canvas = "https://canvas.nus.edu.sg/courses/93981/files/folder/Lecture%20notes?preview=";
  const set1 = "https://jiaruilei.github.io/CE2407A_Tutorial1/?question=q";
  const q = (prompt, options, correct, explain) => ({prompt, options, correct, explain});
  (window.CHAPTERS ||= []).push(
    {
      id: 1, section: "Lecture notes", title: "Engineering uncertainty",
      summary: "What does a spread of measurements tell you, and which part of that uncertainty could another test reduce?",
      goals: ["Distinguish natural variability from uncertainty in a model or estimate.", "Build a density histogram and read probability from its area.", "Explain how uncertainty changes a design or inspection decision."],
      ideas: [
        {name: "Variability and knowledge", text: "Two intact cores from the same site can differ because the material varies (aleatory uncertainty). Uncertainty about the site mean from having tested only a few cores is statistical; an imperfect soil model introduces another source of epistemic uncertainty."},
        {name: "Frequency becomes density", formula: "hᵢ = nᵢ / (n × Δxᵢ)", text: "For bin i, divide its count nᵢ by the sample size n and the bin width Δxᵢ. Height has inverse measurement units. Area hᵢ × Δxᵢ is the fraction of observations in that bin. This matters when widths differ."},
        {name: "From a plot to a decision", text: "A design threshold singles out a tail of the distribution. A bell-shaped centre alone tells you little about a rare tail when the sample is small. Record where the samples came from before treating their frequencies as representative."}
      ],
      example: {prompt: "A lab tests 40 cores. Eight strengths lie between 30 and 32 MPa, and ten lie between 32 and 36 MPa. Which bin is taller on a density histogram?", steps: ["The first bin contains 8/40 = 0.20 of the sample across 2 MPa. Its height is 0.10 MPa⁻¹.", "The second contains 10/40 = 0.25 across 4 MPa. Its height is 0.0625 MPa⁻¹.", "The first bar is taller. The second has the larger area and contains more cores."]},
      pitfall: "A histogram bar height is not always a probability. For a density histogram, multiply by the bin width.",
      activity: {prompt: "A contractor tests 20 more cores from the same population. Should the individual strengths now be less variable?", answer: "No. A representative larger sample can estimate the population properties more precisely. It does not make the material itself more uniform."},
      next: "Use events and sets to turn a phrase such as “at least one limit is exceeded” into an unambiguous calculation.",
      tutorials: [], source:{ref: "01", label:"Lecture 1 · Introduction",url:canvas+"10172906"},
      practice: [
        q("Identical test procedures give different strengths at different positions in a heterogeneous slab. What does the physical variation illustrate?",["Aleatory variability","Uncertainty about the sample mean only","An arithmetic error","A guaranteed change in the design threshold"],0,"The material varies across space even if testing is exact. More data can reveal that variation without eliminating it."),
        q("A 5 kN-wide bin contains 12 of 60 tests. What is its density height?",["0.20 kN⁻¹","1.0 kN⁻¹","0.04 kN⁻¹","2.4 kN⁻¹"],2,"Its area is 12/60 = 0.20. Divide by 5 kN to get 0.04 kN⁻¹."),
        q("Adjacent density bars have widths 1 and 3 mm and equal heights. Which contains the greater sample fraction?",["The narrower one","The wider one","They contain equal fractions","Neither has any observations"],1,"Area is height times width. The second bin contains three times the sample fraction of the first."),
        q("A drainage model neglects blockage at the inlet. Which action directly addresses that source of uncertainty?",["Narrow the bins used to show the output","Round the design flow to more decimals","Treat the omitted effect as exactly zero","Measure blockages and check a model that includes them"],3,"The limitation is in the representation of the system. Observations and a revised model test the missing mechanism."),
        q("No loads in a sample of 30 exceed the design limit. Which conclusion is justified?",["Failure is impossible","The observed exceedance fraction is zero; the population probability can still be positive","The design has exactly a 1/30 chance of failure","The probability model must be normal"],1,"Zero observed exceedances is a sample statement. Rare events can be missed in a finite sample.")
      ]
    },
    {
      id:2, section:"Lecture notes", title:"Events and probability",
      summary:"Translate an engineering failure rule into a sample space, a union, an intersection or a complement.",
      goals:["Specify an event and its sample space.", "Use the addition rule without double-counting an overlap.", "Use De Morgan’s rules to switch between a failure event and its complement."],
      ideas:[
        {name:"Name the event first",text:"An outcome is one possible result; an event is a set of outcomes. Define the observation and time window. Counting favourable outcomes only works directly when the elementary outcomes are equally likely."},
        {name:"Account for overlap",formula:"P(A ∪ B) = P(A) + P(B) − P(A ∩ B)",text:"The union means at least one event occurs. Adding the two probabilities counts the intersection twice. If A and B cannot both occur, their intersection is empty."},
        {name:"Read the complement aloud",formula:"(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ",text:"“Neither fails” means that both survive. In a series system that requires both components to work, system failure is the union of the component failures. No independence assumption is needed to identify the events."}
      ],
      example:{prompt:"On a randomly selected day a pump trips with probability 0.12, a valve jams with probability 0.08, and both occur with probability 0.03. Find the chance of exactly one incident.",steps:["At least one: 0.12 + 0.08 − 0.03 = 0.17.","Exactly one excludes the simultaneous incidents: 0.17 − 0.03 = 0.14.","Check by disjoint cases: pump alone 0.09 plus valve alone 0.05 gives 0.14."]},
      pitfall:"“Or” usually includes the overlap. “Exactly one” excludes it. Sketch the two regions before choosing the arithmetic.",
      activity:{prompt:"Two pumps provide redundancy: either pump alone can meet demand. Let A and B mean that the respective pumps fail. What is the system failure event? Does defining it require independence?",answer:"System failure is A ∩ B, because both pumps must fail. Independence is unnecessary to specify the event; multiplying P(A) by P(B) to calculate its probability would require it."},
      next:"Conditioning changes the reference population. That is how we update failure probabilities after a warning.",
      tutorials:[{label:"Set 1 · Q1: alternative routes",url:set1+"1"},{label:"Set 1 · Q2: wind events",url:set1+"2"},{label:"Set 1 · Q3: power plant",url:set1+"3"}],source:{ref: "02", label:"Lecture 2 · Probability (1)",url:canvas+"10172907"},
      practice:[
        q("If A means excessive deflection and B means cracking, what does (A ∪ B)ᶜ mean?",["Neither limit is reached","Only A occurs","At least one occurs","Both occur"],0,"Taking the complement of “at least one” leaves exactly those outcomes with neither event."),
        q("P(A)=0.30, P(B)=0.20 and P(A ∩ B)=0.12. Find P(A ∪ B).",["0.50","0.62","0.38","0.06"],2,"The union is 0.30 + 0.20 − 0.12 = 0.38."),
        q("Two mutually exclusive inspection outcomes have probabilities 0.22 and 0.31. What is the probability of either outcome?",["0.0682","0.53","0.47","Cannot be calculated without independence"],1,"Mutual exclusion makes the overlap zero, so the union is 0.22 + 0.31 = 0.53."),
        q("A subsystem needs both its controller and its power supply to operate. If C and S are their failures, what is subsystem failure?",["C ∩ S only","Cᶜ ∪ Sᶜ","(C ∪ S)ᶜ","C ∪ S"],3,"Either loss stops operation, including the case in which both fail."),
        q("A load point is uniform over a 6 m beam. What is the probability that it is in the first or last metre?",["1/6","1/3","1/2","2/3"],1,"The two non-overlapping end regions cover 2 m of a uniform 6 m span. Their probability is 2/6.")
      ]
    },
    {
      id:3,section:"Lecture notes",title:"Conditional probability and Bayes",
      summary:"Use a test result or a change of operating conditions to update the probability of an event.",
      goals:["Compute conditional probabilities and apply the multiplication rule.", "Distinguish independence from mutually exclusive events.", "Build a complete event tree and use Bayes’ theorem to reverse a conditional probability."],
      ideas:[
        {name:"Restrict the reference set",formula:"P(A | B) = P(A ∩ B) / P(B),  P(B) > 0",text:"Once B is known, only outcomes inside B count. The multiplication rule follows: P(A ∩ B) = P(A | B)P(B)."},
        {name:"Independence is a testable assumption",formula:"P(A ∩ B) = P(A)P(B)",text:"If both events have positive probability, independence means learning that one occurred leaves the probability of the other unchanged. Mutually exclusive events with positive probabilities cannot be independent."},
        {name:"Total probability and Bayes",formula:"P(Hⱼ | E) = P(E | Hⱼ)P(Hⱼ) / Σᵢ P(E | Hᵢ)P(Hᵢ)",text:"The hypotheses Hᵢ must be disjoint and cover all possibilities. Multiply along each branch to obtain its joint probability. Sum branches leading to evidence E for the denominator; E must have positive probability."}
      ],
      example:{prompt:"Twenty per cent of anchors come from line B and the rest from line A. The defect rates are 8% for B and 2% for A. A randomly selected anchor is defective. How likely is it to be from B?",steps:["B contributes 0.20 × 0.08 = 0.016 to the overall defect probability.","A contributes 0.80 × 0.02 = 0.016. The overall defect probability is 0.032.","Of the defective anchors, the fraction from B is 0.016/0.032 = 0.50. The 8% defect rate has a different denominator."]},
      pitfall:"A test’s sensitivity, P(+ | defect), is not the chance that a flagged item is defective. The latter also depends on prevalence and false alarms.",
      activity:{prompt:"Keep the two defect rates in the example fixed, but let line B supply only 10% of the anchors. Predict the direction of the update, then calculate P(B | defect).",answer:"Line B supplies fewer anchors, so its share of the defects falls. Its defect branch is 0.10 × 0.08 = 0.008; the other is 0.90 × 0.02 = 0.018. The posterior is 0.008/0.026 ≈ 30.8%."},
      next:"A random variable assigns a number to each outcome. A probability distribution collects those numerical outcomes and their probabilities.",
      tutorials:[{label:"Set 1 · Q4: pollution",url:set1+"4"},{label:"Set 1 · Q5: pavement",url:set1+"5"},{label:"Set 1 · Q6: earthquakes and liquefaction",url:set1+"6"},{label:"Set 1 · Q7: detectors",url:set1+"7"}],source:{ref: "03", label:"Lecture 3 · Probability (2)",url:canvas+"10172908"},
      practice:[
        q("A warning occurs on 20% of days. Heavy inflow and a warning occur together on 6% of days. Find P(heavy inflow | warning).",["0.012","0.26","0.30","0.80"],2,"Among warning days the heavy-inflow share is 0.06/0.20 = 0.30."),
        q("Independent trips have delay probabilities 0.10 and 0.20. What is the probability that at least one is delayed?",["0.28","0.30","0.02","0.72"],0,"The probability of no delay is 0.90 × 0.80 = 0.72; its complement is 0.28."),
        q("A sensor flags 90% of defects and 10% of sound pieces. If 5% of pieces are defective, what fraction of flagged pieces are defective?",["90%","4.5%","50%","About 32%"],3,"Defective flags account for 0.05 × 0.90 = 0.045 of pieces. All flags account for 0.045 + 0.95 × 0.10 = 0.14, giving 0.045/0.14 ≈ 0.321."),
        q("Two events have positive probabilities and cannot both occur. What follows?",["They are independent","They are not independent","Their union has probability one","Each must have probability one half"],1,"Their joint probability is zero, whereas the product of their two positive probabilities is positive."),
        q("A site is dry 75% of days and wet otherwise. A stoppage occurs on 4% of dry days and 20% of wet days. Find the overall stoppage probability.",["0.12","0.24","0.08","0.008"],2,"Weight both conditional rates by the chance of their weather state: 0.75 × 0.04 + 0.25 × 0.20 = 0.08.")
      ]
    }
  );
})();
