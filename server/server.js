const express = require("express");
const routes = require("./routes");
const con = require("./database");

const app = express();
app.set("view engine", "ejs");
console.log(__dirname);
app.use(express.static(__dirname + "/public"));

con.connect((err) => {
  if (err) return console.log("Connection Failed");
  console.log("Connected to database");
  routes(app, con);
});

app.listen(1234, () => {
  console.log("Server started");
});
