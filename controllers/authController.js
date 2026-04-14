const bcrypt = require('bcryptjs');
const authService = require('../services/authService');
const generateToken = require('../utils/generateToken');
const userService = require('../services/userService');

// Keep your existing register function here
const register = async (req, res) => {
  try {
    // your existing register code
    const { name, email, password, role } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await userService.registerUser({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const user = await authService.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.Password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.Id,
          name: user.Name,
          email: user.Email,
          role: user.Role
        },
        token
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong during login',
      error: error.message
    });
  }
};

module.exports = {
  register,
  login
};