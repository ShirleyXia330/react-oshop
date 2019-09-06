const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const { productSchema } = require("./productSchema");

const orderSchema = new Schema(
  {
    datePlaced: { type: Date, required: true },
    shipping: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true }
    },
    // items: [{ type: productSchema }]
    items: [
      {
        category: { type: String, required: true },
        imageUrl: { type: String },
        name: { type: String, required: true },
        numberInCart: { type: Number, required: true, min: 0 },
        numberInStock: { type: Number, required: true, min: 0 },
        price: { type: Number, required: true, min: 0 }
      }
    ]
  },
  {
    collection: "orders"
  }
);

module.exports = mongoose.model("Order", orderSchema);
