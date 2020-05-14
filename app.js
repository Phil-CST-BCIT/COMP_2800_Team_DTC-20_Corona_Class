const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/index", (req, res) => {
  res.render("pages/index");
});

app.get("/graph", (req, res) => {
  res.render("pages/graph");
});

app.get("/aboutUs", (req, res) => {
  res.render("pages/aboutUs");
});

app.get("/slideList", (req, res) => {
  res.render("pages/slideList");
});

app.get("/quizStart", (req, res) => {
  res.render("pages/quizStart");
});

// for quiz page
let qPool = [
  {
      id: 1,
      question: 'Which is not a transmission method of the Coronavirus?',
      answer: 'Cellular network signals',
      options: ['Direct contact with infected persons', 'Contact with contaminated surfaces', 'Cellular network signals', 'Contact with infected respiratory droplets, as exhaled by an infected person']
  },
  {
      id: 2,
      question: 'When are non-medical masks most effective at slowing the spread of COVID-19?',
      answer: 'When used by infected persons around uninfected',
      options: ['When used by uninfected persons in public places', 'When used by uninfected persons around infected', 'Masks are ineffective at slowing the spread', 'When used by infected persons around uninfected']
  },
  {
      id: 3,
      question: 'Which is NOT a symptom of the Coronavirus?',
      answer: 'Numbness in limbs',
      options: ['Fever', 'Fatigue', 'Headaches', 'Numbness in limbs']
  }
];

let firstQuestion = {
  question: 'Which is not a transmission method of the Coronavirus?',
  answer: 'Cellular network signals',
  options: ['Direct contact with infected persons', 'Contact with contaminated surfaces', 'Cellular network signals', 'Contact with infected respiratory droplets, as exhaled by an infected person']
};
app.get("/quiz", (req, res) => {
  quizIndex = 0;
  res.render("pages/quiz", firstQuestion);
});

// from 2537 week 3 package
let quizIndex = 0;
app.get('/nextQuestion', (req,res) => {

  ++quizIndex; 

  if (quizIndex >= qPool.length) {
      res.render("pages/quizScore");
  }
  else {
    res.json(qPool[quizIndex]);
  }
});

app.get("/quizScore", (req, res) => {
  res.render("pages/quizScore");
});

app.get("/slideList", (req, res) => {
  res.render("pages/slideList");
});

app.get("/slides/slide1", (req, res) => {
  res.render("pages/slides/slide1");
});

app.listen(port, console.log(`server is running at ${port}`));
