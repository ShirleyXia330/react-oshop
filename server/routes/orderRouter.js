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

module.exports = router;
