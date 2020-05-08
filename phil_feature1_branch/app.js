const express = require("express");
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

app.listen(port);
