export interface UploadResponseDTO {
  id: string;
  userId: string;
  fileName: string;
  size: number;
  mimetype: string;
  fileStorageName?: string;
  createdAt: string;
  updatedAt: string;
}