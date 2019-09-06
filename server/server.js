//npm install express nodemon body-parser cors mongoose bcryptjs config jsonwebtoken
//cd C:\Users\study\react\oshop\server
//node server.js

//mongod

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("config");
const port = config.get("port");

const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");
const authRouter = require("./routes/authRouter");
const cartRouter = require("./routes/cartRouter");
const orderRouter = require("./routes/orderRouter");

mongoose
  .connect(config.get("db"), {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(
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
app.use("/auth", authRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);

app.listen(port, function() {
  console.log("Server is running on Port: ", port);
});
