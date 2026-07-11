export interface IPersistFile {
  saveFile(buffer: Buffer, filename: string, userId: string): Promise<[string, string]>;
  deleteFile(userId: string, filePath: string): Promise<void>;
}