const express = require('express');
const { postController } = require('../controllers');
const { auth, validateCreateNewPost, validateUpdatePost } = require('../middlewares');

const route = express.Router();

route.get('/', auth, postController.getPosts);

route.get('/:id', auth, postController.getPostById);

route.post('/', auth, validateCreateNewPost, postController.createNewPost);

route.put('/:id', auth, validateUpdatePost, postController.updatePost);

route.delete('/:id', auth, postController.removePost);

module.exports = route;