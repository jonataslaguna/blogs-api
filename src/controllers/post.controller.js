const { postService } = require('../services');

const createNewPost = async (req, res) => {
  const newPost = req.body;
  const { user } = req;
 
  const { status, data } = await postService.createNewPost(newPost, user.id);

  return res.status(status).json(data);
};

module.exports = {
  createNewPost,
};