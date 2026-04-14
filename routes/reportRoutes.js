const express = require('express');
const router = express.Router();

const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// Usually reports are for Admin only
router.get(
  '/low-stock',
  authMiddleware,
  authorizeRoles('Admin'),
  reportController.getLowStockReport
);

router.get(
  '/inventory-summary',
  authMiddleware,
  authorizeRoles('Admin'),
  reportController.getInventorySummaryReport
);

router.get(
  '/order-summary',
  authMiddleware,
  authorizeRoles('Admin'),
  reportController.getOrderSummaryReport
);

router.get(
  '/sales-summary',
  authMiddleware,
  authorizeRoles('Admin'),
  reportController.getSalesSummaryReport
);

module.exports = router;