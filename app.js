const dotenv = require('dotenv');
dotenv.config();

require('./config/db');

const { connectRedis } = require('./config/redis');
connectRedis();

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');
const productRoutes = require('./routes/productRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reportRoutes = require('./routes/reportRoutes');

const loggerMiddleware = require('./middleware/loggerMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(loggerMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Inventory Management API is running 🚀'
  });
});

app.use(errorMiddleware);

module.exports = app;