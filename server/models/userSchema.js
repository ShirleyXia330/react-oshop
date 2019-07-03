const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
  },
  {
    collection: "users"
  }
);

module.exports = mongoose.model("User", userSchema);
