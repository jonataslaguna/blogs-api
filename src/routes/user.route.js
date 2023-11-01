const express = require('express');
const { userController } = require('../controllers');
const { validadeCreateUser, auth } = require('../middlewares');

const route = express.Router();

route.get('/', auth, userController.getUsers);

route.post('/', validadeCreateUser, userController.createUser);

module.exports = route;