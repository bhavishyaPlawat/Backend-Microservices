const productModel = require("../models/product.model");

async function createProduct(req, res) {
  const {
    image,
    title,
    price: { amount, currency },
    description,
    category,
  } = req.body;

  try {
    const product = await productModel.create({
      image,
      title,
      price: {
        amount,
        currency,
      },
      description,
      category,
    });
    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating product",
      error,
    });
  }
}

async function getProducts(req, res) {
  try {
    const products = await productModel.find();
    res.status(200).json({
      message: "Product fetched successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error,
    });
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    await productModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      error,
    });
  }
}

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
};
