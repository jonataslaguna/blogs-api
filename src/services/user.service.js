const { User, BlogPost, sequelize } = require('../models');
const { generateToken } = require('../utils/token/generateToken');

const getUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return { status: 200, data: users };
};

const getUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return { status: 404, data: { message: 'User does not exist' } }; 
  }

  return { status: 200, data: user };
};

const createUser = async (user) => {
  const { email } = user;

  const findUser = await User.findOne({
    where: { email },
  });
    
  if (findUser) return { status: 409, data: { message: 'User already registered' } };

  await User.create(user);

  const payload = {
    email,
  };
    
  const token = generateToken(payload);

  return { status: 201, data: token };
};

const removeUser = async (userId) => sequelize.transaction(async (t) => {
  try {
    await BlogPost
      .destroy({ where: { userId } }, { transaction: t });

    await User
      .destroy({ where: { id: userId } }, { transaction: t });

    return { status: 204 };
  } catch (error) {
    return { status: 500, data: { message: `Error removing user: ${error.message}` } };
  }
});

module.exports = {
  createUser,
  getUsers,
  getUserById,
  removeUser,
};