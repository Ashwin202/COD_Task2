const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
var path = require("path");

var bodyParser = require("body-parser");
// var jsonParser = bodyParser.json(); //to parse json for accepting json
var urlParser = bodyParser.urlencoded(); //to parse json

let temp = path.join(__dirname, "views");

module.exports = (app, con) => {
  router.post("/", urlParser, (req, res) => {
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
          res.render(path.join(temp, "pages/welcome.ejs"));
        } else {
          res.redirect("/login");
        }
        // return res.status(500).json({ Status: "Wrong password" });
      }
    );
  });
  app.use("/login", router);
  router.get("/", (req, res) => {
    res.render(path.join(temp, "pages/index"));
  });
};

//Sameple input output
// {
//   "username": "ram",
//   "password":"ram"
// }
