const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");

const datasets = require("./datasets");
const questions = datasets.fiveQuestions;
const slide1 = datasets.slides.safety;

let quizIndex = 0;
let slideIndex = 0;

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
let firstQuestion = {
  id: 1,
  question: "Which is not a transmission method of the Coronavirus?",
  answer: "Cellular network signals",
  options: [
    "Direct contact with infected persons",
    "Contact with contaminated surfaces",
    "Cellular network signals",
    "Contact with infected respiratory droplets, as exhaled by an infected person",
  ],
};
app.get("/quiz", (req, res) => {
  quizIndex = 0;
  res.render("pages/quiz", questions[0]);
});

// from 2537 week 3 package
app.get("/nextQuestion", (req, res) => {
  ++quizIndex;
  // console.log(quizIndex);
  // currently selecting the final answer does nothing, may make it submit the quiz
  if (quizIndex >= questions.length) {
    res.render("pages/quizScore");
  } else {
    res.json(questions[quizIndex]);
  }
});

app.get("/quizScore", (req, res) => {
  res.render("pages/quizScore");
});

app.get("/slideList", (req, res) => {
  res.render("pages/slideList");
});

app.get("/slides/slide1", (req, res) => {
  slideIndex = 0;
  res.render("pages/slides/slide1", slide1[0]);
});

app.get("/nextSlide", (req, res) => {
  if (slideIndex < slide1.length - 1) {
    ++slideIndex;
  }
  res.json(slide1[slideIndex]);
});

app.get("/prevSlide", (req, res) => {
  if (slideIndex > 0) {
    --slideIndex;
  }
  res.json(slide1[slideIndex]);
});

app.listen(port, console.log(`server is running at ${port}`));
