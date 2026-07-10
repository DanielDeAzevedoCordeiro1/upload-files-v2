import { UploadResponseDTO } from "./types/upload.response.js";

export class Upload {
  private id: string;
  private createdAt: string;
  private updatedAt: string;

  private constructor(
    public userId: string,
    public fileName: string,
    public size: number,
    public mimetype: string,
    id?: string,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.validate();
    this.id = id ?? crypto.randomUUID();
    this.createdAt = createdAt ?? new Date().toISOString();
    this.updatedAt = updatedAt ?? new Date().toISOString();
  }

  static create(userId: string, fileName: string, size: number, mimetype: string): Upload {
    return new Upload(userId, fileName, size, mimetype);
  }

  static restore(props: {
    id: string;
    userId: string;
    fileName: string;
    size: number;
    mimetype: string;
    createdAt: string;
    updatedAt: string;
  }): Upload {
    return new Upload(
      props.userId,
      props.fileName,
      props.size,
      props.mimetype,
      props.id,
      props.createdAt,
      props.updatedAt
    );
  }

  static toUploadResponse(upload: Upload): UploadResponseDTO {
    return {
      id: upload.getId(),
      userId: upload.getUserId(),
      fileName: upload.getFileName(),
      size: upload.getSize(),
      mimetype: upload.getMimetype(),
      createdAt: upload.getCreatedAt(),
      updatedAt: upload.getUpdatedAt(),
    };
  }

  private validateSize(size: number): boolean {
    return size <= 10 * 1024 * 1024; // 10MB
  }

  private validateMimetype(mimetype: string): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedTypes.includes(mimetype);
  }

  private validateFileName(fileName: string): boolean {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
    return allowedExtensions.includes(`.${fileExtension}`);
  }

  private validate(): void {
    if (!this.validateSize(this.size)) {
      throw new Error('File size invalid. Maximum allowed size is 10MB.');
    }
    if (!this.validateMimetype(this.mimetype)) {
      throw new Error('Invalid mimetype.');
    }
    if (!this.validateFileName(this.fileName)) {
      throw new Error('File name is required.');
    }
  }

  getId(): string { return this.id; }
  getUserId(): string { return this.userId; }
  getFileName(): string { return this.fileName; }
  getSize(): number { return this.size; }
  getMimetype(): string { return this.mimetype; }
  getCreatedAt(): string { return this.createdAt; }
  getUpdatedAt(): string { return this.updatedAt; }
}
