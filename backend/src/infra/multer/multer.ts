import multer, { memoryStorage } from "multer";

export const multerMiddleware = multer({
  storage: memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
})