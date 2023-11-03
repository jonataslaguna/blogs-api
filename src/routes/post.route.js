const express = require('express');
const { postController } = require('../controllers');
const { auth, validateCreateNewPost } = require('../middlewares');

const route = express.Router();

route.get('/', auth, postController.getPosts);

route.get('/:id', auth, postController.getPostById);

route.post('/', auth, validateCreateNewPost, postController.createNewPost);

module.exports = route;