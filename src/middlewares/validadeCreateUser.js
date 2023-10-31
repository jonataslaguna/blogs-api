const { validateBodyCreateUser } = require('../utils/shemas/validateInputValues');

const validateLogin = async (req, res, next) => {
  const { error } = validateBodyCreateUser(req.body);
  
  if (error) return res.status(400).json({ message: error.message });
  
  next();
};
  
module.exports = validateLogin;