const { validateBodyUpdatePost } = require('../utils/shemas/validateInputValues');

const validateUpdatePost = (req, res, next) => {
  const { error } = validateBodyUpdatePost(req.body);
  
  if (error) return res.status(400).json({ message: 'Some required fields are missing' });
    
  next();
};

module.exports = validateUpdatePost;