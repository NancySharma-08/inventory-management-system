const { sql, pool } = require('../config/db');

const createOrder = async (userId, totalAmount) => {
  const connection = await pool;

  const result = await connection
    .request()
    .input('UserId', sql.Int, userId)
    .input('TotalAmount', sql.Decimal(10, 2), totalAmount)
    .execute('sp_CreateOrder');

  return result.recordset[0].OrderId;
};

const addOrderItem = async (item) => {
  const connection = await pool;

  await connection
    .request()
    .input('OrderId', sql.Int, item.orderId)
    .input('ProductId', sql.Int, item.productId)
    .input('Quantity', sql.Int, item.quantity)
    .input('Price', sql.Decimal(10, 2), item.price)
    .input('Subtotal', sql.Decimal(10, 2), item.subtotal)
    .execute('sp_AddOrderItem');
};

const getAllOrders = async () => {
  const connection = await pool;

  const result = await connection
    .request()
    .execute('sp_GetAllOrders');

  return result.recordset;
};

const getOrderById = async (orderId) => {
  const connection = await pool;

  const result = await connection
    .request()
    .input('OrderId', sql.Int, orderId)
    .execute('sp_GetOrderById');

  return result.recordset[0];
};

const getOrderItemsByOrderId = async (orderId) => {
  const connection = await pool;

  const result = await connection
    .request()
    .input('OrderId', sql.Int, orderId)
    .execute('sp_GetOrderItemsByOrderId');

  return result.recordset;
};

module.exports = {
  createOrder,
  addOrderItem,
  getAllOrders,
  getOrderById,
  getOrderItemsByOrderId
};