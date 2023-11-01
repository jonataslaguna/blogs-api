const { categoryService } = require('../services');

const getCategories = async (_req, res) => {
  const { status, data } = await categoryService.getCategories();

  return res.status(status).json(data);
};

const createCategory = async (req, res) => {
  const { name } = req.body;

  const { status, data } = await categoryService.createCategory(name);

  return res.status(status).json(data);
};

module.exports = {
  createCategory,
  getCategories,
};