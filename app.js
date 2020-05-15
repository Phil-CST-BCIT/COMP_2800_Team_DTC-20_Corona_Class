const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");

const datasets = require("./datasets");
const questions = datasets.fiveQuestions;
const slide1 = datasets.slides.safety;

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
  question: 'Which is not a transmission method of the Coronavirus?',
  answer: 'Cellular network signals',
  options: ['Direct contact with infected persons', 'Contact with contaminated surfaces', 'Cellular network signals', 'Contact with infected respiratory droplets, as exhaled by an infected person']
};
app.get("/quiz", (req, res) => {
  quizIndex = 0;
  res.render("pages/quiz", questions[0]);
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

app.listen(port, console.log(`server is running at ${port}`));
