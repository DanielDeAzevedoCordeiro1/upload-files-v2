import { createUploadController } from "../../application/controllers/uploads/index.js";
import { authMiddleware, AuthRequest } from "../auth/user.auth.js";
import { multerMiddleware } from "../multer/multer.js";
import { router } from "./index.js";

const uploadRoutes = router;

router.post(
  "/new",
  authMiddleware,
  multerMiddleware.single("file"),
  (req, res) => createUploadController.handle(req as AuthRequest, res)
);

export { uploadRoutes };