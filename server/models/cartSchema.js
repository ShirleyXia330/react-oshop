const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var itemSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  number: { type: Number, required: true, min: 0 },

  numberInCart: { type: Number, required: true }
});

const cartSchema = new Schema(
  {
    id: { type: String, required: true },
    items: [itemSchema]
  },
  {
    collection: "carts"
  }
);

module.exports = mongoose.model("Cart", cartSchema);
