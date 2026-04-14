const { sql, pool } = require('../config/db');

const getLowStockReport = async (threshold) => {
  const connection = await pool;

  const result = await connection
    .request()
    .input('Threshold', sql.Int, threshold)
    .execute('sp_GetLowStockReport');

  return result.recordset;
};

const getInventorySummaryReport = async () => {
  const connection = await pool;

  const result = await connection
    .request()
    .execute('sp_GetInventorySummaryReport');

  return result.recordset;
};

const getOrderSummaryReport = async () => {
  const connection = await pool;

  const result = await connection
    .request()
    .execute('sp_GetOrderSummaryReport');

  return result.recordset;
};

const getSalesSummaryReport = async () => {
  const connection = await pool;

  const result = await connection
    .request()
    .execute('sp_GetSalesSummaryReport');

  return result.recordset[0];
};

module.exports = {
  getLowStockReport,
  getInventorySummaryReport,
  getOrderSummaryReport,
  getSalesSummaryReport
};