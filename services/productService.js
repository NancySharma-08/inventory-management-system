const { sql, pool } = require('../config/db');

const addProduct = async (productData) => {
  const connection = await pool;

  await connection
    .request()
    .input('Name', sql.NVarChar(150), productData.name)
    .input('Description', sql.NVarChar(500), productData.description || null)
    .input('Price', sql.Decimal(10, 2), productData.price)
    .execute('sp_AddProduct');
};

const getAllProducts = async () => {
  const connection = await pool;

  const result = await connection
    .request()
    .execute('sp_GetAllProducts');

  return result.recordset;
};

const getProductById = async (id) => {
  const connection = await pool;

  const result = await connection
    .request()
    .input('Id', sql.Int, id)
    .execute('sp_GetProductById');

  return result.recordset[0];
};

const updateProduct = async (id, productData) => {
  const connection = await pool;

  await connection
    .request()
    .input('Id', sql.Int, id)
    .input('Name', sql.NVarChar(150), productData.name)
    .input('Description', sql.NVarChar(500), productData.description || null)
    .input('Price', sql.Decimal(10, 2), productData.price)
    .execute('sp_UpdateProduct');
};

const deleteProduct = async (id) => {
  const connection = await pool;

  await connection
    .request()
    .input('Id', sql.Int, id)
    .execute('sp_DeleteProduct');
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};