const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    isAdmin: { type: Boolean, default: false }
  },
  {
    collection: "users"
  }
);

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      isAdmin: this.isAdmin
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

module.exports = mongoose.model("User", userSchema);
