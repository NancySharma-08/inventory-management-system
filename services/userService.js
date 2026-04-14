const { sql, pool } = require('../config/db');

exports.registerUser = async (userData) => {
  const connection = await pool;

  await connection.request()
    .input('Name', sql.NVarChar, userData.name)
    .input('Email', sql.NVarChar, userData.email)
    .input('Password', sql.NVarChar, userData.password)
    .input('Role', sql.NVarChar, userData.role)
    .execute('sp_RegisterUser');
};

exports.getUserByEmail = async (email) => {
  const connection = await pool;

  const result = await connection.request()
    .input('Email', sql.NVarChar, email)
    .execute('sp_GetUserByEmail');

  return result.recordset[0];
};
