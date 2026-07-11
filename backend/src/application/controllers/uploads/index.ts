import { createUploadFileUseCase, findAllUploadsUseCase } from "../../usecases/index.js";
import { CreateUploadController } from "./create.upload.js";
import { FindAllUploadController } from "./find-all.upload.js";

export const createUploadController = new CreateUploadController(createUploadFileUseCase);
export const findAllUploadsController = new FindAllUploadController(findAllUploadsUseCase);
