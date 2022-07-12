const express = require("express");
const router = express.Router();
const LocalStrategy = require("passport-local").Strategy;
const app = express();
const mysql = require("mysql");
var path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
var session = require("express-session");
var MySQLStore = require("express-mysql-session");
const con = require("../database");
const passport = require("passport");
var urlParser = bodyParser.urlencoded({ extended: true });
let temp = path.join(__dirname, "views");
console.log(__dirname);

module.exports = (app, con) => {
  const verifyCallback = (username, password, done) => {
    console.log("1");
    console.log(username);
    con.query(
      `select username,password from employee where username="${username}"`,
      (err, result) => {
        if (err) {
          return done(err);
        }
        if (result.length == 0) {
          done(null, false);
        }
        user = {
          username: result[0].username,
          password: result[0].password,
        };
        console.log(user);
        if (bcrypt.compareSync(password, result[0].password)) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    );
  };

  const strategy = new LocalStrategy(verifyCallback);
  passport.use(strategy);

  passport.serializeUser((user, done) => {
    console.log("2");
    // console.log(user);
    console.log("Inside serialise");
    done(null, user.username); //Error why!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // console.log(user.username);
  });

  passport.deserializeUser(function (user_name, done) {
    console.log("Inside deserialise" + user_name);
    con.query(
      `select * from employee where username = "${[user_name]}"`, // check with blog
      function (error, result) {
        done(null, result[0]);
        console.log("Passport des");
        console.log(result[0]);
      }
    );
  });

  function isAuth(req, res, next) {
    console.log("3");
    if (req.isAuthenticated()) {
      next();
      res.render(path.join(temp, "welcome.ejs"));
      console.log("isAuth");
    } else {
      res.redirect("/login");
    }
  }

  router.get("/login", (req, res) => {
    res.render(path.join(temp, "pages/index"));
  });

  router.get("/", isAuth, (req, res) => {
    res.render(path.join(temp, "pages/index"));
    console.log("router.get");
  });

  router.post(
    "/login",
    urlParser,
    passport.authenticate("local", { failureRedirect: "/login" }),
    function (req, res) {
      console.log(req.body.username);
    }
  );
  app.use("/", router);
};

// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var session = require("express-session");
// var bodyParser = require("body-parser");
// var passport = require("passport");

// const intializePassport = require("./auth/passport_config");

// // var jsonParser = bodyParser.json(); //to parse json for accepting json
//to parse json

// let temp = path.join(__dirname, "views");

// module.exports = (app, con) => {
//   router.post(
//     "/login",
//     passport.authenticate("local", {
//       successRedirect: path.join(temp, "pages/welcome.ejs"),
//       failureRedirect: "/login",
//       failureMessage: true,
//     }),
//     urlParser,
//     (req, res) => {
//       var username = req.body.username;

//       con.query(
//         `select username,password from employee where username="${req.body.username}"`,
//         (err, result) => {
//           if (err) throw err;
//           if (result.length == 0)
//             return res.status(500).json({ Status: "Not a user" });
//           if (bcrypt.compareSync(req.body.password, result[0].password)) {
//             const user_id = result[0].username;
//             // console.log("user details " + JSON.stringify(result[0].username));
//             // console.log(result[0]);

//             req.login(user_id, (err) => {
//               // login session will create a cookie and session for the user
//               if (err) {
//                 res.status(200).json({ Status: "user_id login error" });
//               }
//             }); //login function will be on passport
//             // if (result[0].password == req.body.password) without bcrypt
//             // return res.status(200).json({ Status: "login successfull" }); with bcrypt
//             // req.session.loggedin = true;
//             // req.session.username = username;

//             // console.log(req.session.username);
//             res.render(path.join(temp, "pages/welcome.ejs"));
//           } else {
//             res.redirect("/login");
//           }
//           // return res.status(500).json({ Status: "Wrong password" });
//         }
//       );
//     }
//   );

//   // router.get("/login", (req, res) => {
//   //   res.render(path.join(temp, "pages/index"));
//   // });

//   router.get("/login", (req, res) => {
//     // console.log("login status" + req.session.loggedin);
//     if (req.session.loggedin) {
//       //   // Output username
//       res.render(path.join(temp, "pages/welcome.ejs"));
//       // res.redirect("/");
//     } else {
//       res.render(path.join(temp, "pages/index"));
//     }
//   });
//   app.use("/", router);
// };

// //Sameple input output
// // {
// //   "username": "ram",
// //   "password":"ram"
// // }
