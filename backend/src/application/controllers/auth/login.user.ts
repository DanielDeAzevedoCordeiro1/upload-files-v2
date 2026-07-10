import { Request, Response } from "express";
import { LoginUserUseCase } from "../../usecases/auth/login.user.js";

export class LoginUserController { 
  constructor(private loginUserUseCase: LoginUserUseCase) { }

  async handle(request: Request, response: Response): Promise<any> { 
    const { email, password } = request.body;
    
    try {
      const token = await this.loginUserUseCase.execute(email, password);
      return response.status(200).json({ token });
    } catch (error: Error | any) {
      return response.status(400).json({ message: error.message });
    }
  }
}