import { FindUserUseCase } from "./user/find.user.js";
import { CreateUserUseCase } from "./user/create.user.js";
import { LoginUserUseCase } from "./auth/login.user.js";
import { FindAllUserUseCase } from "./user/findall.user.js";
import { DeleteUserUseCase } from "./user/deleteUserUseCase.js";
import { prismaUserRepository } from "../../infra/database/postgres/user-repository/index.user-prisma.js";
import { jwtProvider } from "../../infra/auth/jwt/index.js";
import { CreateUploadUseCase } from "./uploads/create.upload.js";
import { uploadRepository } from "../../infra/database/postgres/upload-repository/index.upload-repository.js";
import { persistenceFilesProvider } from "../../infra/persistence-files/index.js";
import { FindAllUploadUseCase } from "./uploads/find-all.uploads.js";

export const findUserUseCase = new FindUserUseCase(prismaUserRepository);
export const createUserUseCase = new CreateUserUseCase(prismaUserRepository);
export const deleteUserUseCase = new DeleteUserUseCase(prismaUserRepository);
export const loginUserUseCase = new LoginUserUseCase(prismaUserRepository, jwtProvider);
export const findAllUsersUseCase = new FindAllUserUseCase(prismaUserRepository);

export const createUploadFileUseCase = new CreateUploadUseCase(
  prismaUserRepository,
  uploadRepository, 
  persistenceFilesProvider
);
export const findAllUploadsUseCase = new FindAllUploadUseCase(uploadRepository);