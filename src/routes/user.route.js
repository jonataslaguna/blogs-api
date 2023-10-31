const express = require('express');
const { userController } = require('../controllers');
const { validadeCreateUser } = require('../middlewares');

const route = express.Router();

route.post('/', validadeCreateUser, userController.createUser);

module.exports = route;