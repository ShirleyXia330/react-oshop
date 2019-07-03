const express = require("express");
const router = express.Router();

const categorySchema = require("../models/categorySchema");

router.route("/").get((req, res) => {
  categorySchema.find((error, categories) => {
    if (error) {
      console.log(error);
    } else {
      res.json(categories);
    }
  });
});

module.exports = router;
