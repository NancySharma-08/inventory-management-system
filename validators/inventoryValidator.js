const Joi = require('joi');

const stockSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().positive().required(),
  remarks: Joi.string().allow('', null).max(255)
});

module.exports = {
  stockSchema
};