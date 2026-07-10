import { Upload } from "../../../../domain/uploads/upload.domain.js";
import { Upload as UploadPrisma } from "../../../../../generated/prisma/client.js";

export class UploadMapper {
  static toDomain(raw: UploadPrisma): Upload {
      return Upload.restore({
        id: raw.id,
        userId: raw.userId,
        fileName: raw.fileName,
        size: raw.size,
        mimetype: raw.mimetype,
        createdAt: raw.createdAt.toDateString(),
        updatedAt: raw.updatedAt.toISOString(),
      });
    }
  
    static toPersistence(user: Upload): UploadPrisma {
      return {
        id: user.getId(),
        userId: user.getUserId(),
        fileName: user.getFileName(),
        size: user.getSize(),
        mimetype: user.getMimetype(),
        createdAt: new Date(user.getCreatedAt()),
        updatedAt: new Date(user.getUpdatedAt()),
      };
    }
}