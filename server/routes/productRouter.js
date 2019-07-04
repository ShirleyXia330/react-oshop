const express = require("express");
const router = express.Router();

const productSchema = require("../models/productSchema");

router.route("/").post((req, res) => {
  const products = new productSchema(req.body);
  products
    .save()
    .then(() => {
      res.json("New product has been added successfully.");
    })
    .catch(error => {
      res.status(400).send("Unable to save to database");
    });
});

router.route("/:id").put(async (req, res) => {
  const product = await productSchema
    .findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json("The product has been updated successfully.");
    })
    .catch(error => {
      res.status(400).send("Unable to save to database");
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

router.route("/:id").get((req, res) => {
  productSchema.findById(req.params.id, (error, product) => {
    if (error) {
      res.status(404).send("The product with the given ID cannot be found.");
    } else {
      res.json(product);
    }
  });
});

module.exports = router;
