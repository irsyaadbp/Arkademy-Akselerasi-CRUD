const express = require("express");

const productRouter = require("./products");

const route = express.Router();

route.get("/", (req, res, next) => {
  res.json({ success: true, message: "This is api for Coffee shop apps" });
});

route.use("/products", productRouter);

route.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Wrong url, please check documentation",
  });
});

module.exports = route;
