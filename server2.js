var express = require("express");
var app = express();
var path = require("path");

// set the view engine to ejs
// app.set("views", path.join(__dirname, "views"));
let temp = path.join(__dirname, "views");
console.log(temp);
app.set("view engine", "ejs");

// use res.render to load up an ejs view file

// index page
app.get("/", function (req, res) {
  res.render(path.join(temp, "pages/index"));
});

// about page
app.get("/about", function (req, res) {
  res.render("server/views/pages/about");
});

app.listen(8097);
console.log("Server is listening on port 8080");
