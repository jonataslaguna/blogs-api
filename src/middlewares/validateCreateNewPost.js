const { existCategories } = require('../services/post.service');
const { validateBodyCreatePost } = require('../utils/shemas/validateInputValues');

const validateCreateNewPost = async (req, res, next) => {
  const { categoryIds } = req.body;
  const { error } = validateBodyCreatePost(req.body);

  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' }); 
  }

  const findCategories = await existCategories(categoryIds);
 
  if (findCategories === null) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  next();
};

module.exports = validateCreateNewPost;