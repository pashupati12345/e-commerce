const Joi = require("joi");

const createProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(150).required().messages({
    "string.empty": "Product name is required",
    "any.required": "Product name is required",
  }),

  description: Joi.string().trim().min(5).required().messages({
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),

  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be greater than 0",
    "any.required": "Price is required",
  }),

  stock: Joi.number().integer().min(0).required().messages({
    "number.base": "Stock must be a number",
    "number.integer": "Stock must be an integer",
    "number.min": "Stock cannot be negative",
    "any.required": "Stock is required",
  }),

  category: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Category is required",
    "any.required": "Category is required",
  }),

  isActive: Joi.boolean().optional(),
});

const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(150).optional(),

  description: Joi.string().trim().min(5).optional(),

  price: Joi.number().positive().optional().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be greater than 0",
  }),

  stock: Joi.number().integer().min(0).optional().messages({
    "number.base": "Stock must be a number",
    "number.integer": "Stock must be an integer",
    "number.min": "Stock cannot be negative",
  }),

  category: Joi.string().trim().min(2).max(100).optional(),

  isActive: Joi.boolean().optional(),

  image: Joi.string().allow("").optional(),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required for update",
  });

module.exports = {
  createProductSchema,
  updateProductSchema,
};