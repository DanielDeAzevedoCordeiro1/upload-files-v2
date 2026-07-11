import { Response } from "express";
import { AuthRequest } from "../../../infra/auth/user.auth.js";
import { FindAllUploadUseCase } from "../../usecases/uploads/find-all.uploads.js";
import { UploadResponseDTO } from "../../../domain/uploads/types/upload.response.js";
import { Upload } from "../../../domain/uploads/upload.domain.js";
import { PaginationParams } from "../utils/pagination.params.js";

export class FindAllUploadController { 
  constructor(private readonly findAllUploadUseCase: FindAllUploadUseCase) { }

  async handle(request: AuthRequest, response: Response): Promise<UploadResponseDTO[]>{
    if (!request.user) {
      return response.status(401).json({ message: "Unauthorized" });
    }

    const userId = request.user.id;
    const params = request.query as { page: string, limit: string };
    
    try {
      const uploads = await this.findAllUploadUseCase.execute(userId, {
        page: parseInt(params.page),
        limit: parseInt(params.limit) > 10 ? 10 : parseInt(params.limit),
      });
      return response.status(200).json(uploads.map(Upload.toUploadResponse));
    } catch (error: Error | any) {
      return response.status(400).json({ message: error.message });
    }
  }
}