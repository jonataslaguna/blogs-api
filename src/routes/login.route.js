const express = require('express');
const { loginController } = require('../controllers');
const { validateLogin } = require('../middlewares');

const route = express.Router();

route.post('/', validateLogin, loginController.executeLogin);

module.exports = route;