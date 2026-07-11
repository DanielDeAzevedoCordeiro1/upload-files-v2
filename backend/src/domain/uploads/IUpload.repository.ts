import { Upload } from "./upload.domain.js";

export interface IUploadRepository {
  createUpload(userId: string, fileName: string, size: number, mimetype: string, filePath: string, fileStorageName: string): Promise<string>;
  getUploadById(id: string): Promise<Upload | null>;
  getUploadsByUserId(userId: string, page: number, limit: number): Promise<Upload[]>;
  deleteUploadById(id: string): Promise<boolean>;
};
