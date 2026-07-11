import { PrismaClient } from "../../../../../generated/prisma/client.js";
import { IUploadRepository } from "../../../../domain/uploads/IUpload.repository.js";
import { Upload } from "../../../../domain/uploads/upload.domain.js";
import { UploadMapper } from "./upload.mapper.js";

export class UploadRepository implements IUploadRepository {

  constructor(private client: PrismaClient) { }
  
  async createUpload(userId: string, fileName: string, size: number, mimetype: string, filePath: string, fileStotorageName: string): Promise<string> {
    const newUpload = Upload.create(userId, fileName, size, mimetype, filePath, fileStotorageName);
    const uploadId = (await this.client.upload.create({ data: UploadMapper.toPersistence(newUpload) })).id;
    return uploadId;
  }
  async getUploadById(id: string): Promise<Upload | null> {
    const uploadExists = await this.client.upload.findUnique({ where: { id } });
    if (!uploadExists) {
      return null;
    }
   return UploadMapper.toDomain(uploadExists);
  }
  
  async getUploadsByUserId(userId: string, page: number, limit: number): Promise<Upload[]> {
    const uploadsExists = await this.client.upload.findMany({ where: { userId }, skip: (page - 1) * limit, take: limit });
    if (!uploadsExists) {
      return [];
    }
    return uploadsExists.map(UploadMapper.toDomain);
  }
  async deleteUploadById(id: string): Promise<boolean> {
    const uploadExists = await this.client.upload.findUnique({ where: { id } });
    if (!uploadExists) {
      return false;
    }
    await this.client.upload.delete({ where: { id } });
    return true;
  }
}