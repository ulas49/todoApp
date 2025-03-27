const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "string.base": "Name must be a string",
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot be longer than 30 characters",
    "any.required": "Name is required"
  }),
  surname: Joi.string().min(2).max(30).required().messages({
    "string.base": "Surname must be a string",
    "string.min": "Surname must be at least 2 characters long",
    "string.max": "Surname cannot be longer than 30 characters",
    "any.required": "Surname is required"
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required"
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required"
  })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required"
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required"
  })
});

module.exports = { registerSchema, loginSchema };
