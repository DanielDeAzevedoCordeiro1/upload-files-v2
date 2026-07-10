import { Request, Response } from "express";
import { DeleteUserUseCase } from "../../usecases/user/deleteUserUseCase.js";

export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) { }

  async handle(request: Request, response: Response): Promise<any> {
    const { email } = request.body;

    try {
      await this.deleteUserUseCase.execute(email);
      return response.status(204).json({ message: "User deleted successfully" });
    } catch (error: Error | any) {
      return response.status(400).json({ message: error.message })
    }
  }
}