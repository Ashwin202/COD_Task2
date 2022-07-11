const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const path = require("path");
const bodyParser = require("body-parser");
var urlParser = bodyParser.urlencoded();

let tempLocation = path.join(__dirname, "views");

module.exports = (app, con) => {
  router.post("/", urlParser, (req, res) => {
    var id = req.body.id;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var username = req.body.username;
    var password = req.body.password;
    var address = req.body.address;
    var mobileno = req.body.mobileno;
    let hashpassword = bcrypt.hashSync(password, 10);
    con.query(`SELECT * FROM employee WHERE id = "${id}";`, (erro, result) => {
      if (result.length > 0) {
        res.status(200).json({ status: "User present" });
      } else {
        con.query(
          `insert into employee(id,username,password,firstname,lastname,address,mobileno)
                      values('${id}','${username}','${hashpassword}','${firstname}','${lastname}','${address}','${mobileno}')`,
          (err) => {
            console.log("try3 " + tempLocation);
            if (err) {
              console.log(err);
              res.status(200).json({
                status:
                  "Sign up isssue, Check whether you have an account or not",
              }); //duplicate key
            } else {
              console.log("success");
              res.render(path.join(tempLocation, "pages/welcome.ejs"));
            }
          }
        );
      }
    });
  });
  app.use("/register", router);
  router.get("/", (req, res) => {
    console.log("tryfinal " + tempLocation);
    res.render(path.join(tempLocation, "pages/register"));
  });
};
