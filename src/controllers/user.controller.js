const { userService } = require('../services');

const getUsers = async (req, res) => {
  const { status, data } = await userService.getUsers();

  return res.status(status).json(data);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await userService.getUserById(id);

  return res.status(status).json(data);
};

const createUser = async (req, res) => {
  const newUser = req.body;

  const { status, data } = await userService.createUser(newUser);
 
  if (data.message) return res.status(status).json(data);

  return res.status(status).json({ token: data });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
};