const express = require("express");
const routes = require("./routes");
const con = require("./database");

const app = express();

con.connect((err) => {
  if (err) return console.log("Connection Failed");
  console.log("Connected to database");
  routes(app, con);
});

app.listen(3000, () => {
  console.log("Server started");
});
