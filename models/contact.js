const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");
// scheme
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

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
  favorite: Joi.boolean(),
});
const updateFavoriteSchema = Joi.object({ favorite: Joi.boolean().required() });

module.exports = { addSchema, updateSchema };

contactSchema.post("save", handleMongooseError);

// model

const Contact = model("contact", contactSchema);

const schemas = { addSchema, updateSchema, updateFavoriteSchema };

module.exports = { Contact, schemas };
