const express = require("express");
const router = express.Router();

const cartSchema = require("../models/cartSchema");

router.route("/").post((req, res) => {
  const cart = new cartSchema(req.body);
  cart
    .save()
    .then(() => res.json(req.body))
    .catch(error => {
      res.status(400).send("Fail to create a cart");
      console.log(error);
    });
});

router.route("/:id").put((req, res) => {
  cartSchema
    .findOneAndUpdate({ id: req.params.id }, req.body)
    .then(() => {
      res.json(req.body);
    })
    .catch(error => {
      res.status(400).send("Unable to save to database");
      console.log(error);
    });
});

router.route("/:id").get((req, res) => {
  cartSchema.find({ id: req.params.id }, (error, cart) => {
    if (error) {
      res.status(404).send("The cart with the given ID cannot be found.");
      console.log(error);
    } else {
      res.json(cart);
    }
  });
});

module.exports = router;
