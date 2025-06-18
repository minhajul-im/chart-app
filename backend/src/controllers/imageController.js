import { readFileImages, saveFileImages } from "../services/fileService.js";

export const getAllImages = async (req, res) => {
  const images = await readFileImages();
  res.json({
    status: true,
    code: 200,
    message: "Images get successfully",
    data: images,
  });
};

export const storeImages = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      status: false,
      code: 400,
      message: "At least one image file is required",
      errors: ["At least one image file is required"],
    });
  }

  const files = req.files.map(
    (file) => `http://localhost:3000/assets/${file.filename}`
  );

  await saveFileImages(files);

  res.json({
    status: true,
    code: 200,
    message: "Images uploaded successfully",
    urls: files,
  });
};
