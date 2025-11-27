const Joi = require("joi");

exports.productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(5).max(1000).required(),
  imageUrl: Joi.string().uri().required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().min(2).max(50).required(),
  inStock: Joi.boolean().optional(),
  stockQty: Joi.number().integer().min(0).optional()
});
