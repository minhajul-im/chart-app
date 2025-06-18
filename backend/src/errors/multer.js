import multer from "multer";

export const multerFileError = (err, req, res, next) => {
  console.error("Multer Error:", err);
  if (
    err instanceof multer.MulterError ||
    err?.message.includes("Only JPEG, JPG, PNG, or GIF images allowed")
  ) {
    return res.status(400).json({
      status: false,
      code: 400,
      message: "Only JPEG, JPG, PNG, or GIF images allowed",
      errors: [err?.message],
    });
  }
  next(err);
};
