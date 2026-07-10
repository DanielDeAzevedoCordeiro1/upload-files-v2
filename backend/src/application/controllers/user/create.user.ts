import { Request, Response } from "express";
import { CreateUserUseCase } from "../../usecases/user/create.user.js";


export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) { }

  async handle(request: Request, response: Response): Promise<any> {
    const userRequest = request.body;
    
    try {
      const newUser = await this.createUserUseCase.execute(userRequest);
      return response.status(201).json(newUser);
    } catch (error: Error | any) {
      return response.status(400).json({ message: error.message });
    }
  }
}  
