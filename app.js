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

app.get("/quiz", (req, res) => {
  res.render("pages/quiz");
});

app.get("/quizScore", (req, res) => {
  res.render("pages/quizScore");
});

app.listen(port, console.log(`server is running at ${port}`));
