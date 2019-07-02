const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for ServerPort
const ServerPort = new Schema(
  {
    username: {
      type: String
    },
    password: {
      type: String
    }
  },
  {
    collection: "ServerPort"
  }
);

module.exports = mongoose.model("ServerPort", ServerPort);
