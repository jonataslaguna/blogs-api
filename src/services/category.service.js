const { Category } = require('../models');

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
};