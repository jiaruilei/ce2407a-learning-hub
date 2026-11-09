# CE2407A Learning Hub

[Open the learning hub](https://jiaruilei.github.io/ce2407a-learning-hub/)

A revision companion for **CE2407A Uncertainty Analysis for Engineers**, based on the AY 2026/27 Semester 1 materials. Students can work through an engineering example, practise a calculation, check their reasoning and return to the relevant notes on Canvas.

## Topics and practice

| Topics | What to practise | Source |
| --- | --- | --- |
| 1–3 | Engineering uncertainty, events, conditional probability and Bayes | Lecture notes 1–3 |
| 4–7 | Random variables; normal and lognormal distributions; binomial, geometric, Poisson and exponential distributions; functions of random variables | Lecture notes 4–7 |
| 8–9 | Point estimates and sampling distributions | Blended-learning L1–L2 |
| 10–11 | Confidence intervals and tests for a mean or a variance | Blended-learning L3 |
| 12–13 | Goodness of fit and simple linear regression | Blended-learning L4–L5 |

The link in the upper-right corner of each topic card opens its Canvas lecture pack. Lecture Notes 01–07 follow the numbered PDFs. The blended-learning packs use their Canvas labels L1–L5; both inference topics link to L3, *Statistical inferences*.

Each of the 13 topics includes a worked example, a guided question, common mistakes and a short self-check with explanations. The 59 original questions include 28 typed calculations and 31 multiple-choice questions. Each has an optional hint. Students can resume practice in the same browser and retry missed questions.

The existing digital tutorials remain independent applications. Open a full set below or use a question link from the corresponding topic:

- [Set 1: Sets and probability](https://jiaruilei.github.io/CE2407A_Tutorial1/) — 7 exercises.
- [Set 2: Random variables and distributions](https://jiaruilei.github.io/CE2407A_Tutorial2/) — 9 exercises.
- [Set 3: Estimation and hypothesis testing](https://jiaruilei.github.io/CE2407A_Tutorial3/) — 6 exercises.

## Sources and privacy

The course sequence was checked against [Lecture notes](https://canvas.nus.edu.sg/courses/93981/files/folder/Lecture%20notes) and [Lecture notes for Blended learning](https://canvas.nus.edu.sg/courses/93981/files/folder/Lecture%20notes%20for%20Blended%20learning) in the current Canvas course. Topic pages link back to the individual packs. Those links require course access. This repository contains original study material and diagrams; the lecture PDFs, project files, assessments and student records remain outside it. Consult Canvas for official course and assessment instructions.

The hub follows the review and practice format of the [CE2134 Learning Hub](https://github.com/jiaruilei/ce2134-learning-hub). It uses a new masthead and graphics drawn for uncertainty analysis. Hub progress is stored in the learner’s browser. No accounts, grades or analytics are collected by the hub. Separate linked sites have their own behaviour.

## Run and maintain

This is a static HTML, CSS and JavaScript site with no package installation or build step. Open `index.html` or serve the repository root with `python -m http.server 8000 --bind 127.0.0.1`. For GitHub Pages, publish the repository root on `main`.

Topic content lives in `chapters-a.js` (1–3), `chapters-b.js` (4–7) and `chapters-c.js` (8–13). The hints, numeric units and accepted tolerances in `practice-format.js` must match the question order in those files. Update shared resource links in `resources.js`. When updating for another semester, check the current Canvas folder and file IDs: the hub's topic numbering is distinct from the five blended pack numbers.
