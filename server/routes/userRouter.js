const express = require("express");
const router = express.Router();
const _ = require("lodash");

const userSchema = require("../models/userSchema");

router.route("/").post(async (req, res) => {
  const users = new userSchema(req.body);

  const username = await userSchema.findOne({ username: req.body.username });
  if (username)
    return res.status(400).send("This username has aleady been registered.");

  users
    .save()
    .then(user => {
      const token = user.generateAuthToken();
      res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .json(_.pick(user, ["_id", "username", "email"]));
    })
    .catch(error => {
      res.status(400).send("Unable to save to database");
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
