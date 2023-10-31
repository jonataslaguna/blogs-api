const { User } = require('../models');
const { generateToken } = require('../utils/token/generateToken');

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

module.exports = {
  createUser,
};