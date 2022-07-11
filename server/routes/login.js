const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var bodyParser = require("body-parser");
var passport = require("passport");

// var jsonParser = bodyParser.json(); //to parse json for accepting json
var urlParser = bodyParser.urlencoded(); //to parse json

let temp = path.join(__dirname, "views");

module.exports = (app, con) => {
  // app.use(
  //   session({
  //     key: "userID",
  //     secret: "codeofduty",
  //     resave: false,
  //     saveUninitialized: false,
  //     // Cookie: {
  //     //   expires: 60 * 60 * 24,
  //     // },
  //   })
  // );
  router.post("/login", urlParser, (req, res) => {
    var username = req.body.username;
    console.log("try " + username);
    console.log("try " + req.body.password);

    con.query(
      `select username,password from employee where username="${req.body.username}"`,
      (err, result) => {
        if (err) throw err;
        if (result.length == 0)
          return res.status(500).json({ Status: "Not a user" });
        if (bcrypt.compareSync(req.body.password, result[0].password)) {
          // if (result[0].password == req.body.password) without bcrypt
          // return res.status(200).json({ Status: "login successfull" }); with bcrypt
          req.session.loggedin = true;
          req.session.username = username;
          const user_id = username;
          console.log(req.session.username);
          res.render(path.join(temp, "pages/welcome.ejs"));
        } else {
          res.redirect("/login");
        }
        // return res.status(500).json({ Status: "Wrong password" });
      }
    );
  });

  passport.serializeUser(function (user_id, done) {
    done(null, user_id);
  });

  passport.deserializeUser(function (user_id, done) {
    {
      done(null, user_id);
    }
  });

  // router.get("/login", (req, res) => {
  //   res.render(path.join(temp, "pages/index"));
  // });

  router.get("/login", (req, res) => {
    console.log(req.session.loggedin);
    if (req.session.loggedin) {
      //   // Output username
      res.render(path.join(temp, "pages/welcome.ejs"));
      // res.redirect("/");
    } else {
      res.render(path.join(temp, "pages/index"));
    }
  });
  app.use("/", router);
};

//Sameple input output
// {
//   "username": "ram",
//   "password":"ram"
// }
