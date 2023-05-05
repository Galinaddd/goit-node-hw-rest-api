const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const subscriptions = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },

    avatarURL: { type: String, required: true },

    token: String,

    verify: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
      // required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  password: Joi.string().min(5).max(25).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  subscription: Joi.string().valid(...subscriptions),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .error(new Error("Missing required field email")),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(25).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

userSchema.post("save", handleMongooseError);

//model

const User = model("user", userSchema);

const userSchemas = { registerSchema, emailSchema, loginSchema };

module.exports = { User, userSchemas };
