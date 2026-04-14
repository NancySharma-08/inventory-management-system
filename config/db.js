const sql = require('mssql/msnodesqlv8');

const config = {
  connectionString: `Driver={ODBC Driver 17 for SQL Server};Server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=yes;`
};

const pool = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("⏳ Attempting DB connection...");
    console.log('Connected to SQL Server (Windows Auth)');
    return pool;
  })
  .catch(err => {
    console.log('DB Connection Failed:', err);
  });

module.exports = {
  sql,
  pool
};
