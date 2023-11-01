const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const extractToken = (bearerToken) => bearerToken.split(' ')[1];

const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  const token = extractToken(authorization);

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload;
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};

module.exports = auth;