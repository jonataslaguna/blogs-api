const Joi = require('joi');

const validateBodyCreatePost = (body) => 
  Joi.object({
    title: Joi.string().trim().min(1).required(),
    content: Joi.string().trim().min(1).required(),
    categoryIds: Joi.array().items(Joi.number().required()).min(1).required(),
  }).validate(body);

const validateBodyCreateUser = (body) =>
  Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(6).required(),
    image: Joi.string().uri().allow(''),
  }).validate(body);

module.exports = {
  validateBodyCreateUser,
  validateBodyCreatePost,
};