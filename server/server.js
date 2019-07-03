//npm install express nodemon body-parser cors mongoose
//cd C:\xia\study\react\oshop\server
//node server.js

//mongod

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const PORT = 4000;
const cors = require("cors");
const config = require("./db");
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");

mongoose.connect(config.DB).then(
  () => {
    console.log("Database is connected");
  },
  err => {
    console.log("Can not connect to the database" + err);
  }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);

app.listen(PORT, function() {
  console.log("Server is running on Port: ", PORT);
});
