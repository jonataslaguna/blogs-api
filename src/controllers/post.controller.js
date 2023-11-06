const { postService } = require('../services');

const getPosts = async (_req, res) => {
  const { status, data } = await postService.getPosts();

  return res.status(status).json(data);
};

const searchPost = async (req, res) => {
  const { q } = req.query;

  const { status, data } = await postService.searchPost(q);

  return res.status(status).json(data);
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await postService.getPostById(id);

  return res.status(status).json(data);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { user } = req;

  const { status, data } = await postService.updatePost(id, user.id, { title, content });

  return res.status(status).json(data);
};

const createNewPost = async (req, res) => {
  const newPost = req.body;
  const { user } = req;
 
  const { status, data } = await postService.createNewPost(newPost, user.id);

  return res.status(status).json(data);
};

const removePost = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const { status, data } = await postService.removePost(id, user.id);

  if (data && data.message) return res.status(status).json(data);

  return res.status(status).end();
};

module.exports = {
  createNewPost,
  getPosts,
  getPostById,
  updatePost,
  removePost,
  searchPost,
};