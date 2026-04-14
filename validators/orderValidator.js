const Joi = require('joi');

const createOrderSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.number().integer().positive().required(),
        quantity: Joi.number().integer().positive().required()
      })
    )
    .min(1)
    .required()
});

module.exports = {
  createOrderSchema
};