const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: { type: String, required: true }
  },
  {
    collection: "categories"
  }
);

module.exports = mongoose.model("Category", categorySchema);
