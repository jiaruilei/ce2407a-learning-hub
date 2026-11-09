(() => {
  const files = "https://canvas.nus.edu.sg/courses/93981/files/folder/";
  const notes = files + "Lecture%20notes";
  window.EXAM_PACK_URL = files + "Past%20year%20exam%20questions?preview=10650555";
  window.SETS = [
    {label:"Set 1 · Sets and probability", detail:"7 exercises · Model events, conditional probabilities and evidence using routes, wind and detectors.",url:"https://jiaruilei.github.io/CE2407A_Tutorial1/"},
    {label:"Set 2 · Random variables and distributions", detail:"9 exercises · Move from probability densities and flood risk to waiting times, drag, beams and columns.",url:"https://jiaruilei.github.io/CE2407A_Tutorial2/"},
    {label:"Set 3 · Estimation and hypothesis testing", detail:"6 exercises · Estimate a parameter, plan a sample, and test claims about means and variability.",url:"https://jiaruilei.github.io/CE2407A_Tutorial3/"}
  ];
  window.RESOURCES = [
    {label:"Lecture notes",detail:"Canvas · The seven numbered probability lectures. NUS course access required.",url:notes},
    {label:"Blended-learning notes",detail:"Canvas · Five video lecture packs on estimation, sampling, inference, goodness of fit and regression. NUS course access required.",url:files+"Lecture%20notes%20for%20Blended%20learning"},
    {label:"Formula list",detail:"Canvas · The course formula reference. Use it alongside the assumptions for each model. NUS course access required.",url:notes+"?preview=10625175"},
    {label:"Statistical tables",detail:"Canvas · Look up distribution values and check which tail a table reports. NUS course access required.",url:notes+"?preview=10369033"}
  ];
})();
