const { Category } = require('../models');

const getCategories = async () => {
  const categories = await Category.findAll();

  return { status: 200, data: categories };
};

const createCategory = async (name) => {
  const findCategory = await Category.findOne({
    where: { name },
  });
  
  if (findCategory) return { status: 409, data: { message: 'This category already exists' } };
  
  await Category.create({ name });

  const newCategory = await Category.findOne({
    where: { name },
  });

  return { status: 201, data: newCategory };
};

module.exports = {
  createCategory,
  getCategories,
};