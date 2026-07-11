import { IUploadRepository } from "../../../domain/uploads/IUpload.repository.js";
import { UploadRequestDTO } from "../../../domain/uploads/types/upload.request.js";
import { IUserRepository } from "../../../domain/user/IUser.repository.js";
import { emailTemplateUploadNotification } from "../../../domain/user/templates/email.template.js";
import { IPersistFile } from "../../../infra/persistence-files/IPersist.file.js";
import { EmailProvider } from "../../../infra/resend/email.provider.js";

export class CreateUploadUseCase { 
  constructor(private readonly userRepository: IUserRepository,
              private readonly uploadRepository: IUploadRepository,
              private readonly persistFilesProvider: IPersistFile,
  ) { }

  async execute(email: string, buffer: Buffer, uploadInput: UploadRequestDTO): Promise<string | null> {
    const userExists = await this.userRepository.getByEmail(email);
    if (!userExists) {
      throw new Error("User not found!");
    }

    const [filePath, fileStorageName] = await this.persistFilesProvider.saveFile(buffer, uploadInput.fileName, userExists.getId());
    
    const uploadId = await this.uploadRepository.createUpload(
      userExists.getId(),
      uploadInput.fileName,
      uploadInput.size,
      uploadInput.mimetype,
      filePath,
      fileStorageName,
    );

    const uploadEmailContent = {
      to: userExists.getEmail(),
      subject: `Ola ${userExists.getName()}! Upload do arquivo concluido`,
      filename: uploadInput.fileName,
    }

    const htmlContent = emailTemplateUploadNotification(uploadEmailContent);

    await EmailProvider.sendEmail(userExists.getEmail(), uploadEmailContent.subject, htmlContent);

    return uploadId;
  }
}