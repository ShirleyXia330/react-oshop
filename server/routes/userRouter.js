const express = require("express");
const router = express.Router();

const userSchema = require("../models/userSchema");

router.route("/").post((req, res) => {
  const users = new userSchema(req.body);
  users
    .save()
    .then(users => {
      res.json("New user account has been added successfully.");
    })
    .catch(error => {
      res.status(400).send("unable to save to database");
    });
});

router.route("/").get((req, res) => {
  userSchema.find((error, users) => {
    if (error) {
      console.log(error);
    } else {
      res.json(users);
    }
  });
});

module.exports = router;
