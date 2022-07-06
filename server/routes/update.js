const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json(); //to parse json

module.exports = (app, con) => {
  router.post("/", jsonParser, (req, res) => {
    let hashpassword = bcrypt.hashSync(req.body.password, 10);
    if (bcrypt.compareSync(req.body.password, hashpassword)) {
      console.log("Password hashed and unhashed are same");
      con.query(
        `update employee
                    set password="${hashpassword}" where id="${req.body.id}"`,
        (err) => {
          if (err) return res.status(404).json({ status: err.message });
          console.log("Update successfull");
          res.json({ status: "victory" });
        }
      );
    }
  });
  app.use("/update", router);
};
