import { LoginUserController } from "./auth/login.user.js";
import { CreateUserController } from "./user/create.user.js";
import { FindUserController } from "./user/find.user.js";
import { DeleteUserController } from "./user/delete.user.js";
import { FindAllUserController } from "./user/findall.user.js";
import {
  createUserUseCase,
  deleteUserUseCase,
  findAllUsersUseCase,
  findUserUseCase,
  loginUserUseCase
} from "../usecases/index.js";

export const createUserController = new CreateUserController(createUserUseCase)
export const findUserController = new FindUserController(findUserUseCase);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);
export const loginUserController = new LoginUserController(loginUserUseCase);
export const findAllUsersController = new FindAllUserController(findAllUsersUseCase);