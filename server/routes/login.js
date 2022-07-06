const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json(); //to parse json

module.exports = (app, con) => {
  router.post("/", jsonParser, (req, res) => {
    con.query(
      `select username,password from employee where username="${req.body.username}"`,
      (err, result) => {
        if (err) throw err;
        if (result.length == 0)
          return res.status(500).json({ Status: "Not a user" });
        if (bcrypt.compareSync(req.body.password, result[0].password))
          // if (result[0].password == req.body.password)
          return res.status(200).json({ Status: "login successfull" });
        return res.status(500).json({ Status: "Wrong password" });
      }
    );
  });
  app.use("/login", router);
};

//Sameple input output
// {
//   "username": "ram",
//   "password":"ram"
// }
