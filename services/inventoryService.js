const { sql, pool } = require('../config/db');

const stockIn = async (data) => {
  const connection = await pool;

  await connection
    .request()
    .input('ProductId', sql.Int, data.productId)
    .input('Quantity', sql.Int, data.quantity)
    .input('Remarks', sql.NVarChar(255), data.remarks || null)
    .execute('sp_StockIn');
};

const stockOut = async (data) => {
  const connection = await pool;

  await connection
    .request()
    .input('ProductId', sql.Int, data.productId)
    .input('Quantity', sql.Int, data.quantity)
    .input('Remarks', sql.NVarChar(255), data.remarks || null)
    .execute('sp_StockOut');
};

const getCurrentStockByProductId = async (productId) => {
  const connection = await pool;

  const result = await connection
    .request()
    .input('ProductId', sql.Int, productId)
    .execute('sp_GetCurrentStockByProductId');

  return result.recordset[0];
};

const getInventoryTransactionsByProductId = async (productId) => {
  const connection = await pool;

  const result = await connection
    .request()
    .input('ProductId', sql.Int, productId)
    .execute('sp_GetInventoryTransactionsByProductId');

  return result.recordset;
};

const getAllInventoryStock = async () => {
  const connection = await pool;

  const result = await connection
    .request()
    .execute('sp_GetAllInventoryStock');

  return result.recordset;
};

module.exports = {
  stockIn,
  stockOut,
  getCurrentStockByProductId,
  getInventoryTransactionsByProductId,
  getAllInventoryStock
};