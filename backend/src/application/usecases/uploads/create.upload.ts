import { IUploadRepository } from "../../../domain/uploads/IUpload.repository.js";
import { UploadRequestDTO } from "../../../domain/uploads/types/upload.request.js";
import { IUserRepository } from "../../../domain/user/IUser.repository.js";
import { IPersistFile } from "../../../infra/persistence-files/IPersist.file.js";

export class CreateUploadUseCase { 
  constructor(private readonly userRepository: IUserRepository,
              private readonly uploadRepository: IUploadRepository,
              private readonly persistFilesProvider: IPersistFile,
  ) { }

  async execute(email: string, buffer: Buffer, uploadInput: UploadRequestDTO): Promise<string | null> {
    const userExists = await this.userRepository.getByEmail(email);
    if (!userExists) {
      throw new Error("Usuario nao encontrado");
    }

    const filePath = await this.persistFilesProvider.saveFile(buffer, uploadInput.fileName, userExists.getId());

    const uploadId = await this.uploadRepository.createUpload(
      userExists.getId(),
      uploadInput.fileName,
      uploadInput.size,
      uploadInput.mimetype,
      filePath,
    );

    return uploadId;
  }
}