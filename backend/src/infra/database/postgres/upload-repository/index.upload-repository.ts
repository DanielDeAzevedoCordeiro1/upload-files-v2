import { prismaClientProvider } from "../client-pg.js";
import { UploadRepository } from "./upload.repository.js";

export const uploadRepository = new UploadRepository(prismaClientProvider);
