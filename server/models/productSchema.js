const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const { categorySchema } = require("./categorySchema");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    number: { type: Number, required: true, min: 0 }
  },
  {
    collection: "products"
  }
);

module.exports = mongoose.model("Product", productSchema);
