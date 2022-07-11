const express = require("express");
const routes = require("./routes");
const con = require("./database");

const app = express();
var cookieParser = require("cookie-parser");
var session = require("express-session");
var passport = require("passport");
app.use(cookieParser());

app.set("view engine", "ejs");
// console.log(__dirname);
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    key: "userID",
    secret: "codeofduty",
    resave: false,
    saveUninitialized: true,
    // Cookie: {
    //   expires: 60 * 60 * 24,
    // },
  })
);
app.use(passport.initialize());
app.use(passport.session());

con.connect((err) => {
  if (err) return console.log("Connection Failed");
  console.log("Connected to database");
  routes(app, con);
});

app.listen(3001, () => {
  console.log("Server started");
});
