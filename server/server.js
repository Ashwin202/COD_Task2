const express = require("express");
const passport = require("passport");

const routes = require("./routes");
const con = require("./database");
const flash = require("express-flash");

const app = express();
var cookieParser = require("cookie-parser");
var session = require("express-session");
const { commit } = require("./database");
const MySQLStore = require("express-mysql-session");
app.use(cookieParser());

app.set("view engine", "ejs");
// console.log(__dirname);
app.use(express.static(__dirname + "/public"));

app.use(flash());
app.use(
  session({
    key: "Hariram",
    secret: "codeofduty",
    store: new MySQLStore({
      host: "localhost",
      user: "root",
      password: "10As2000*",
      database: "cookie",
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   console.log("app,use");
//   console.log(req.session);
//   console.log(req.user);
//   next();
// });

con.connect((err) => {
  if (err) return console.log("Connection Failed");
  console.log("Connected to database");
  routes(app, con);
});

app.listen(3003, () => {
  console.log("Server started");
});
