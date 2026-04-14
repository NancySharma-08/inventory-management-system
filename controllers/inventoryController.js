const inventoryService = require('../services/inventoryService');
const productService = require('../services/productService');
const { redisClient } = require('../config/redis');

const stockIn = async (req, res) => {
  try {
    const { productId, quantity, remarks } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'ProductId and quantity are required'
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be greater than 0'
      });
    }

    const product = await productService.getProductById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await inventoryService.stockIn({ productId, quantity, remarks });
    await redisClient.del('inventory_summary');

    return res.status(200).json({
      success: true,
      message: 'Stock added successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to stock in product',
      error: error.message
    });
  }
};

const stockOut = async (req, res) => {
  try {
    const { productId, quantity, remarks } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'ProductId and quantity are required'
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be greater than 0'
      });
    }

    const product = await productService.getProductById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await inventoryService.stockOut({ productId, quantity, remarks });
    await redisClient.del('inventory_summary');

    return res.status(200).json({
      success: true,
      message: 'Stock removed successfully'
    });
  } catch (error) {
    if (error.message.includes('Insufficient stock')) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to stock out product',
      error: error.message
    });
  }
};

const getCurrentStockByProductId = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await productService.getProductById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const stock = await inventoryService.getCurrentStockByProductId(productId);

    return res.status(200).json({
      success: true,
      message: 'Current stock fetched successfully',
      data: {
        productId: Number(productId),
        currentStock: stock ? stock.CurrentStock : 0
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch current stock',
      error: error.message
    });
  }
};

const getInventoryTransactionsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await productService.getProductById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const transactions = await inventoryService.getInventoryTransactionsByProductId(productId);

    return res.status(200).json({
      success: true,
      message: 'Inventory transactions fetched successfully',
      data: transactions
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch inventory transactions',
      error: error.message
    });
  }
};

const getAllInventoryStock = async (req, res) => {
  try {
    const stockList = await inventoryService.getAllInventoryStock();

    return res.status(200).json({
      success: true,
      message: 'Inventory stock summary fetched successfully',
      data: stockList
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch stock summary',
      error: error.message
    });
  }
};

module.exports = {
  stockIn,
  stockOut,
  getCurrentStockByProductId,
  getInventoryTransactionsByProductId,
  getAllInventoryStock
};