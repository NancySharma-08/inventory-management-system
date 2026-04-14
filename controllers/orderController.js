const orderService = require('../services/orderService');
const productService = require('../services/productService');
const inventoryService = require('../services/inventoryService');

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Items array is required'
      });
    }

    let totalAmount = 0;
    const preparedItems = [];

    for (const item of items) {
      const { productId, quantity } = item;

      if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Each item must have valid productId and quantity'
        });
      }

      const product = await productService.getProductById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found for productId ${productId}`
        });
      }

      const stock = await inventoryService.getCurrentStockByProductId(productId);
      const currentStock = stock ? stock.CurrentStock : 0;

      if (currentStock < quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for productId ${productId}`
        });
      }

      const price = Number(product.Price);
      const subtotal = price * quantity;
      totalAmount += subtotal;

      preparedItems.push({
        productId,
        quantity,
        price,
        subtotal
      });
    }

    const userId = req.user.id;
    const orderId = await orderService.createOrder(userId, totalAmount);

    for (const item of preparedItems) {
      await orderService.addOrderItem({
        orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal
      });

      await inventoryService.stockOut({
        productId: item.productId,
        quantity: item.quantity,
        remarks: `Stock deducted for Order ID ${orderId}`
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        orderId,
        totalAmount
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();

    return res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: orders
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderService.getOrderById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const items = await orderService.getOrderItemsByOrderId(id);

    return res.status(200).json({
      success: true,
      message: 'Order fetched successfully',
      data: {
        order,
        items
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById
};