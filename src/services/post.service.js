const { Op } = require('sequelize');
const { BlogPost, Category, PostCategory, sequelize, User } = require('../models');

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Category, as: 'categories' }],
  });
  return { status: 200, data: posts };
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Category, as: 'categories' }],
  });

  if (!post) return { status: 404, data: { message: 'Post does not exist' } };

  return { status: 200, data: post };
};

const searchPost = async (query) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Category, as: 'categories' }],
  });

  return { status: 200, data: posts };
};

const updatePost = async (id, userId, { title, content }) => {
  const findPost = await BlogPost.findOne({
    where: { id },
    include: { model: User, as: 'user' },
  });
 
  if (userId !== findPost.userId) return { status: 401, data: { message: 'Unauthorized user' } };

  await BlogPost.update(
    { title, content },
    { where: { id } },
  );

  const updatedPost = await BlogPost.findOne({
    where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  return { status: 200, data: updatedPost };
};

const removePost = async (id, userId) => {
  const findPost = await BlogPost.findOne({
    where: { id },
    include: { model: User, as: 'user' },
  });
  if (!findPost) return { status: 404, data: { message: 'Post does not exist' } };
 
  if (userId !== findPost.userId) return { status: 401, data: { message: 'Unauthorized user' } };

  BlogPost.destroy({
    where: { id },
  });

  return { status: 204 };
};

const findNewPost = async (published, transaction) => {
  const newPost = await BlogPost.findOne({ where: { published }, transaction });
  return newPost;
};

const createPostCategory = async (categoryIds, postId, transaction) => {
  await Promise.all(categoryIds.map(async (categoryId) => {
    await PostCategory.create({
      postId,
      categoryId,
    }, { transaction });
  }));
};

const existCategories = async (categoryIds) => {
  const categories = await Promise.all(categoryIds.map(async (category) => {
    const findCategory = await Category.findByPk(category);
    if (findCategory) {
      return findCategory;
    }
    return null;
  }));

  if (categories.includes(null)) {
    return null;
  }

  return categories;
};

const createNewPost = async ({ 
  title, content, categoryIds }, userId) => sequelize.transaction(async (t) => {
  const newPostCreate = await BlogPost.create(
    { title, content, userId, published: new Date(), updated: new Date() },
    { transaction: t },
  );

  const { id, 
    title: titlePost, 
    content: postContent, published, updated } = await findNewPost(newPostCreate.published, t);

  await createPostCategory(categoryIds, id, t);

  const newPost = {
    id,
    title: titlePost,
    content: postContent,
    userId,
    updated,
    published,
  };

  return { status: 201, data: newPost };
});

module.exports = {
  createNewPost,
  existCategories,
  getPosts,
  getPostById,
  updatePost,
  removePost,
  searchPost,
};
