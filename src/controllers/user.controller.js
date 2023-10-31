const { userService } = require('../services');

const createUser = async (req, res) => {
  const newUser = req.body;

  const { status, data } = await userService.createUser(newUser);
 
  if (data.message) return res.status(status).json(data);

  return res.status(status).json({ token: data });
};

module.exports = {
  createUser,
};