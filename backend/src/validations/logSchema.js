import Joi from "joi";

export const logSchema = Joi.object({
  id: Joi.string().optional(),
  createdAt: Joi.string().optional(),
  updatedAt: Joi.string().optional(),
  ip: Joi.string().required(),
  userAgent: Joi.string().required(),
  time: Joi.date().iso().optional(),
  visitedCount: Joi.number().min(0).optional(),
});
