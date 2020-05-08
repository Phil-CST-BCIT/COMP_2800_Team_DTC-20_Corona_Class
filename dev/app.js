const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const app = express();
const port = 8080;

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/graph", (req, res) => {
  res.render("pages/graph");
});

app.get("/index", (req, res) => {
  res.render("pages/index");
});

app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.get("/signUp", (req, res) => {
  res.render("pages/signUp");
});

app.get("/aboutUs", (req, res) => {
  res.render("pages/aboutUs");
});

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.listen(port);
