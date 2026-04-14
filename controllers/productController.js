const productService = require('../services/productService');
const { redisClient } = require('../config/redis');
//const { sendSuccess, sendError } = require('../utils/responseHandler');

const addProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name and price are required'
      });
    }

    await productService.addProduct({ name, description, price });
    await redisClient.del('products_list');

    return res.status(201).json({
      success: true,
      message: 'Product added successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add product',
      error: error.message
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();

    return res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: products
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const existingProduct = await productService.getProductById(id);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name and price are required'
      });
    }

    await productService.updateProduct(id, { name, description, price });
    await redisClient.del('products_list');

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await productService.getProductById(id);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await productService.deleteProduct(id);
    await redisClient.del('products_list');

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message
    });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};