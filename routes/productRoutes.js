const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const validateMiddleware = require('../middleware/validateMiddleware');
const { productSchema } = require('../validators/productValidator');
const cacheMiddleware = require('../middleware/cacheMiddleware');

router.post(
  '/',
  authMiddleware,
  authorizeRoles('Admin'),
  validateMiddleware(productSchema),
  productController.addProduct
);

router.get(
  '/',
  authMiddleware,
  authorizeRoles('Admin', 'Staff'),
  cacheMiddleware('products_list', 120),
  productController.getAllProducts
);

router.get(
  '/:id',
  authMiddleware,
  authorizeRoles('Admin', 'Staff'),
  productController.getProductById
);

router.put(
  '/:id',
  authMiddleware,
  authorizeRoles('Admin'),
  validateMiddleware(productSchema),
  productController.updateProduct
);

router.delete(
  '/:id',
  authMiddleware,
  authorizeRoles('Admin'),
  productController.deleteProduct
);

module.exports = router;