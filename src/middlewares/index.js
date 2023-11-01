const validateLogin = require('./validateLogin');
const validadeCreateUser = require('./validadeCreateUser');
const validateNewCategory = require('./validateNewCategory');
const auth = require('./auth');

module.exports = {
  validateLogin,
  validadeCreateUser,
  auth,
  validateNewCategory,
};