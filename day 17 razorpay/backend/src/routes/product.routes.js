const express = require("express");
const router = express.Router();
// const productModel = require("../models/product.model");
const productController = require("../controllers/product.controller");

router.post("/", productController.createProduct);

router.get("/get-products", productController.getProducts);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
