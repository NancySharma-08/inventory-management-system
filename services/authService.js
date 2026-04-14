const { sql, pool } = require('../config/db');

const getUserByEmail = async (email) => {
  const connection = await pool;

  const result = await connection
    .request()
    .input('Email', sql.NVarChar(100), email)
    .execute('sp_GetUserByEmail');

  return result.recordset[0];
};

module.exports = {
  getUserByEmail
};