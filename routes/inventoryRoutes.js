const express = require('express');
const router = express.Router();

const inventoryController = require('../controllers/inventoryController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const validateMiddleware = require('../middleware/validateMiddleware');
const { stockSchema } = require('../validators/inventoryValidator');
const cacheMiddleware = require('../middleware/cacheMiddleware');

router.post(
  '/stock-in',
  authMiddleware,
  authorizeRoles('Admin'),
  validateMiddleware(stockSchema),
  inventoryController.stockIn
);

router.post(
  '/stock-out',
  authMiddleware,
  authorizeRoles('Admin'),
  validateMiddleware(stockSchema),
  inventoryController.stockOut
);

router.get(
  '/stock/:productId',
  authMiddleware,
  authorizeRoles('Admin', 'Staff'),
  inventoryController.getCurrentStockByProductId
);

router.get(
  '/transactions/:productId',
  authMiddleware,
  authorizeRoles('Admin', 'Staff'),
  inventoryController.getInventoryTransactionsByProductId
);

router.get(
  '/summary',
  authMiddleware,
  authorizeRoles('Admin', 'Staff'),
  cacheMiddleware('inventory_summary', 120),
  inventoryController.getAllInventoryStock
);

module.exports = router;