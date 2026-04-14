const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().trim().min(2).max(150).required(),
  description: Joi.string().allow('', null).max(500),
  price: Joi.number().positive().required()
});

module.exports = {
  productSchema
};