import { Upload } from "../../../domain/uploads/upload.domain.js";
import { UploadRepository } from "../../../infra/database/postgres/upload-repository/upload.repository.js";

export class FindAllUploadUseCase { 
  constructor(private readonly uploadRepository: UploadRepository) { }

  async execute(id: string, params: { page: number, limit: number}): Promise<Upload[]> {
    const uploads = await this.uploadRepository.getUploadsByUserId(id, params.page, params.limit);
    return uploads;
  }
}