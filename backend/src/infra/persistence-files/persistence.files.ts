import path from "node:path";
import { IPersistFile } from "./IPersist.file.js";
import { mkdirSync, writeFile } from "node:fs";
import { fileURLToPath } from "node:url";
import { mkdir } from "node:fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class PersistenceFilesProvider implements IPersistFile{ 
  private UPLOAD_DIR = path.resolve(__dirname, "../../../uploads-data")

  constructor() {
    mkdirSync(this.UPLOAD_DIR, {recursive: true});
  }
  
  async saveFile(buffer: Buffer, filename: string, userId: string): Promise<string> {
    const userDirPath = path.join(this.UPLOAD_DIR, userId);
    await mkdir(userDirPath, { recursive: true });
    
    const timestamp = Date.now();
    const uniqueFilename = `$${timestamp}:${filename}`;
    
    const filePath = path.join(userDirPath, uniqueFilename)
    writeFile(filePath, buffer, (err) => {
      if (err) {
        throw new Error(`Error saving file: ${err.message}`);
      }
    });
    return Promise.resolve(filePath);
  }
  
  deleteFile(filePath: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}