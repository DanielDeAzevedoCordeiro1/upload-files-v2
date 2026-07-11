import { createUploadController, findAllUploadsController } from "../../application/controllers/uploads/index.js";
import { authMiddleware, AuthRequest } from "../auth/user.auth.js";
import { multerMiddleware } from "../multer/multer.js";
import { router } from "./index.js";

const uploadRoutes = router;

uploadRoutes.post(
  "/new",
  authMiddleware,
  multerMiddleware.single("file"),
  (req, res) => createUploadController.handle(req as AuthRequest, res)
);

uploadRoutes.get(
  "/all",
  authMiddleware,
  (req, res) => findAllUploadsController.handle(req as AuthRequest, res)
);

export { uploadRoutes };