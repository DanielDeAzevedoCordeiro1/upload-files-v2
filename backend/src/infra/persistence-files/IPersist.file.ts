export interface IPersistFile {
  saveFile(buffer: Buffer, filename: string, userId: string): Promise<string>;
  deleteFile(filePath: string): Promise<void>;
}