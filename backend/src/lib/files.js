import fs from "fs";
import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const sanitizedName = file.originalname
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, "-")
      .replace(/-+/g, "-");
    cb(null, `${Date.now()}-${sanitizedName}`);
  },
});

export const fileUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const isValidMimeType = allowedTypes.test(file.mimetype);
    const isValidExt = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (isValidMimeType && isValidExt) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, JPG, PNG, or GIF images allowed"), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 },
});
