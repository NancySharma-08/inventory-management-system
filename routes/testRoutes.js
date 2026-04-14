const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

router.get(
  '/profile',
  authMiddleware,
  authorizeRoles('Admin', 'Staff'),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: 'Protected route working',
      user: req.user
    });
  }
);

module.exports = router;