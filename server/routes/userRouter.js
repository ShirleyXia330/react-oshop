const express = require("express");
const router = express.Router();

const userSchema = require("../models/userSchema");

router.route("/").post(async (req, res) => {
  const users = new userSchema(req.body);

  const username = await userSchema.findOne({ username: req.body.username });
  if (username)
    return res.status(400).send("This username has aleady been registered.");

  users
    .save()
    .then(user => {
      res.json(user.generateAuthToken());
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
