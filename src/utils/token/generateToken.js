const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const generateToken = (payload) => jwt.sign(payload, SECRET_KEY);

module.exports = {
  generateToken,
};