const { BlogPost, Category, PostCategory } = require('../models');

const findNewPost = async (published) => {
  const newPost = await BlogPost.findOne({ where: { published } });
  return newPost;
};

const createPostCategory = async (categoryIds, postId) => {
  await Promise.all(categoryIds.map(async (categoryId) => {
    await PostCategory.create({
      postId,
      categoryId,
    });
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

const createNewPost = async ({ title, content, categoryIds }, userId) => {
  const newPostCreate = await BlogPost
    .create({ title, content, userId, published: new Date(), updated: new Date() });

  const { id, title: titlePost, content: postContent, published, 
    updated } = await findNewPost(newPostCreate.published);

  await createPostCategory(categoryIds, id);

  const newPost = { id,
    title: titlePost,
    content: postContent,
    userId,
    updated,
    published,
  };
  
  return { status: 201, data: newPost };
};

module.exports = {
  createNewPost,
  existCategories,
};