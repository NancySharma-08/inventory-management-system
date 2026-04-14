const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.Id,
      email: user.Email,
      role: user.Role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d'
    }
  );
};

module.exports = generateToken;