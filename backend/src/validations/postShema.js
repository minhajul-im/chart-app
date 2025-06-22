import Joi from "joi";

export const postSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  content: Joi.string().min(10).required(),
  authorId: Joi.number().integer().positive().required(),
}).messages({
  "string.base": "Title and content must be strings",
  "string.empty": "Title and content cannot be empty",
  "string.min": {
    "string.min": "Title must be at least {#limit} characters long",
  },
  "string.max": {
    "string.max": "Title must be at most {#limit} characters long",
  },
  "number.base": "Author ID must be a number",
  "number.integer": "Author ID must be an integer",
  "number.positive": "Author ID must be a positive number",
  "any.required": "{#label} is required",
});
