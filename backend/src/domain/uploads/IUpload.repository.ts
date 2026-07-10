import { Upload } from "./upload.domain.js";

export interface IUploadRepository {
  createUpload(userId: string, fileName: string, size: number, mimetype: string, path: string): Promise<string>;
  getUploadById(id: string): Promise<Upload | null>;
  getUploadsByUserId(userId: string): Promise<Upload[]>;
  deleteUploadById(id: string): Promise<boolean>;
};
