const express = require("express");
const router = express.Router();

const productSchema = require("../models/productSchema");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/", [auth], (req, res) => {
  const products = new productSchema(req.body);
  products
    .save()
    .then(() => {
      res.json("New product has been added successfully.");
    })
    .catch(() => {
      res.status(400).send("Unable to save to database");
    });
});

router.put("/:id", [auth], (req, res) => {
  productSchema
    .findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json("The product has been updated successfully.");
    })
    .catch(() => {
      res.status(400).send("Unable to save to database");
    });
});

router.delete("/:id", [auth, admin], (req, res) => {
  productSchema
    .findByIdAndDelete(req.params.id)
    .then(product => {
      if (!product)
        return res.status(404).send("This product has been deleted.");

      res.json(product);
    })
    .catch(() => {
      res.status(404).send("The product with the given ID cannot be found.");
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
