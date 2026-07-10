import { createUploadFileUseCase } from "../../usecases/index.js";
import { CreateUploadController } from "./create.upload.js";

export const createUploadController = new CreateUploadController(createUploadFileUseCase);
