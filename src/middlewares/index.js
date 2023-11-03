const validateLogin = require('./validateLogin');
const validadeCreateUser = require('./validadeCreateUser');
const validateNewCategory = require('./validateNewCategory');
const validateCreateNewPost = require('./validateCreateNewPost');
const validateUpdatePost = require('./validateUpdatePost');
const auth = require('./auth');

module.exports = {
  validateLogin,
  validadeCreateUser,
  auth,
  validateNewCategory,
  validateCreateNewPost,
  validateUpdatePost,
};