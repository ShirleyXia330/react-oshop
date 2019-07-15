const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const userSchema = require("../models/userSchema");

router.route("/").post(async (req, res) => {
  const username = await userSchema.findOne({ username: req.body.username });
  if (!username) return res.status(400).send("Invalid username or password..");

  // const password = await bcrypt.compare(req.body.password, username.password);
  const password = req.body.password === username.password;
  // console.log(req.body.password, username.password);
  if (!password) return res.status(400).send("Invalid username or password.");

  res.send(username.generateAuthToken());
});

module.exports = router;

// router.post('/', async (req, res) => {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     let user = await User.findOne({ email: req.body.email });
//     if (!user) return res.status(400).send('Invalid email or password.');

//     const validPassword = await bcrypt.compare(req.body.password, user.password);
//     if (!validPassword) return res.status(400).send('Invalid email or password.');

//     const token = user.generateAuthToken();
//     res.send(token);
//   });
