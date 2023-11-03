const { postService } = require('../services');

const getPosts = async (_req, res) => {
  const { status, data } = await postService.getPosts();

  res.status(status).json(data);
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await postService.getPostById(id);

  res.status(status).json(data);
};

const createNewPost = async (req, res) => {
  const newPost = req.body;
  const { user } = req;
 
  const { status, data } = await postService.createNewPost(newPost, user.id);

  return res.status(status).json(data);
};

module.exports = {
  createNewPost,
  getPosts,
  getPostById,
};