const Joi = require('joi');

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
};