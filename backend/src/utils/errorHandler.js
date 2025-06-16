import { logSchema } from "../validations/logSchema.js";

export const logValidationError = (req, res, next) => {
  const { error } = logSchema.validate(req.body);

  if (error) {
    const data = error.details || [];
    const errors = data?.map((err) => err?.message);

    return res.status(400).json({
      message: "Validation error",
      errors: errors,
      status: false,
      code: 400,
    });
  }

  next();
};
