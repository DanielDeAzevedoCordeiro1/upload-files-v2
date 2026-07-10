import { Response } from "express";
import { CreateUploadUseCase } from "../../usecases/uploads/create.upload.js";
import { AuthRequest } from "../../../infra/auth/user.auth.js";
import { UploadRequestDTO } from "../../../domain/uploads/types/upload.request.js";

export class CreateUploadController { 
  constructor(private readonly createUploadUseCase: CreateUploadUseCase) { }

  async handle(request: AuthRequest, response: Response): Promise<string> { 
    if (!request.user) {
      return response.status(401).json({ message: "Unauthorized" });
    }

    if (!request.file) {
      return response.status(400).json({ message: "No file uploaded" });
    }

    const userEmail = request.user.email;
    
    const uploadInput: UploadRequestDTO = {
      userId: request.user.id,
      fileName: request.file.originalname,
      size: request.file.size,
      mimetype: request.file.mimetype,
    }
    
    const buffer = request.file.buffer;

    try {
      const uploadId = await this.createUploadUseCase.execute(userEmail, buffer, uploadInput);
      return response.status(201).json({ uploadId });
    } catch (error: Error | any) {
      return response.status(400).json({ message: error.message });
    }
  }
}