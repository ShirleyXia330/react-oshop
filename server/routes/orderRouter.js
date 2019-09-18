const express = require("express");
const router = express.Router();

const orderSchema = require("../models/orderSchema");

router.route("/").post((req, res) => {
  const order = new orderSchema(req.body);
  order
    .save()
    .then(() => res.json(req.body))
    .catch(error => {
      res.status(400).send("Fail to create an order");
      console.log(error);
    });
});

router.route("/").get((req, res) => {
  orderSchema.find((error, orders) => {
    if (error) {
      console.log(error);
    } else {
      res.json(orders);
    }
  });
});

router.route("/:id").get(async (req, res) => {
  const orders = await orderSchema.find({ userId: req.params.id });
  if (orders.length === 0)
    return res.status(400).send("You don't have any order.");

  res.json(orders);
});

module.exports = router;
