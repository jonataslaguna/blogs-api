const express = require('express');
const { categoryController } = require('../controllers');
const { auth, validateNewCategory } = require('../middlewares');

const route = express.Router();

route.post('/', auth, validateNewCategory, categoryController.createCategory);

module.exports = route;