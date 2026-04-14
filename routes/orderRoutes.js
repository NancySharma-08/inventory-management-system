const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const validateMiddleware = require('../middleware/validateMiddleware');
const { createOrderSchema } = require('../validators/orderValidator');

router.post(
  '/',
  authMiddleware,
  authorizeRoles('Admin', 'Staff'),
  validateMiddleware(createOrderSchema),
  orderController.createOrder
);

router.get(
  '/',
  authMiddleware,
  authorizeRoles('Admin', 'Staff'),
  orderController.getAllOrders
);

router.get(
  '/:id',
  authMiddleware,
  authorizeRoles('Admin', 'Staff'),
  orderController.getOrderById
);

module.exports = router;