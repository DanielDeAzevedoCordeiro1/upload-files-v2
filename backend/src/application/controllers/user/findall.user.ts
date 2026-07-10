import { Request, Response } from "express";
import { FindAllUserUseCase } from "../../usecases/user/findall.user.js";
import { User } from "../../../domain/user/user.domain.js";
import { UserResponseDTO } from "../../../domain/user/types/user.response.js";

export class FindAllUserController { 
  constructor(private readonly findAllUserUseCase: FindAllUserUseCase) { }

  async handle(response: Response): Promise<UserResponseDTO[]> { 
    const users = await this.findAllUserUseCase.execute();
    if (!users) {
       return response.status(404).json({ message: "No users found" });
    }
    const usersList = users.map(user => user);
    return response.status(200).json(usersList);
  }
}