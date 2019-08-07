const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var itemSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  numberInStock: { type: Number, required: true, min: 0 },
  imageUrl: { type: String },

  numberInCart: { type: Number, required: true, min: 0 }
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
