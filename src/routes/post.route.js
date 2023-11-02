const express = require('express');
const { postController } = require('../controllers');
const { auth, validateCreateNewPost } = require('../middlewares');

const route = express.Router();

route.post('/', auth, validateCreateNewPost, postController.createNewPost);

module.exports = route;