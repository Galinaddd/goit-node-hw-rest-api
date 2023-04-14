const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().min(6).max(16).required(),
  favorite: Joi.boolean(),
});

const updateSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().min(6).max(16),
});

module.exports = { addSchema, updateSchema };
