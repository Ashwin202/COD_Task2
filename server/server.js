const express = require("express");
const passport = require("passport");

const routes = require("./routes");
const con = require("./database");
const intializePassport = require("./auth/passport_config");
intializePassport(passport);
const app = express();
var cookieParser = require("cookie-parser");
var session = require("express-session");
const { commit } = require("./database");
app.use(cookieParser());

app.set("view engine", "ejs");
// console.log(__dirname);
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    key: "Sessionkey",
    secret: "codeofduty",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
    },
  })
);
passport.use();
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log("app,use");
  console.log(req.session);
  console.log(req.user);
  next();
});

con.connect((err) => {
  if (err) return console.log("Connection Failed");
  console.log("Connected to database");
  routes(app, con);
});

app.listen(3003, () => {
  console.log("Server started");
});
