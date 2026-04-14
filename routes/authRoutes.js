const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateMiddleware = require('../middleware/validateMiddleware');
const { registerSchema, loginSchema } = require('../validators/authValidator');

router.post('/register', validateMiddleware(registerSchema), authController.register);
router.post('/login', validateMiddleware(loginSchema), authController.login);

module.exports = router;
