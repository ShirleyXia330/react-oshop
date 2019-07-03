const express = require("express");
const router = express.Router();

const productSchema = require("../models/productSchema");

router.route("/add").post(function(req, res) {
  const products = new productSchema(req.body);
  products
    .save()
    .then(products => {
      res.json("New product has been added successfully.");
    })
    .catch(error => {
      res.status(400).send("unable to save to database");
    });
});

router.route("/").get((req, res) => {
  productSchema.find((error, products) => {
    if (error) {
      console.log(error);
    } else {
      res.json(products);
    }
  });
});

module.exports = router;
