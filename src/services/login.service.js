const { User } = require('../models');
const { generateToken } = require('../utils/token/generateToken');

const executeLogin = async ({ email, password }) => {
  const findUser = await User.findOne({
    where: { email, password },
  });

  if (!findUser) return { status: 400, data: { message: 'Invalid fields' } };
  
  const { id, displayName } = findUser;

  const payload = {
    id,
    displayName,
    email,
  };
    
  const token = generateToken(payload);

  return { status: 200, data: token };
};

module.exports = {
  executeLogin,
};