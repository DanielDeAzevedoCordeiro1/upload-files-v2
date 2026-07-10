import { Request, Response } from "express";
import { FindUserUseCase } from "../../usecases/user/find.user.js";

export class FindUserController {
  constructor(private findUserUseCase: FindUserUseCase) { }

  async handle(req: Request, response: Response): Promise<any> {
    const user = await this.findUserUseCase.execute(req.body.email);
    return user !== null ?
      response.status(200).json(user)
      :
      response.status(404).json({ message: "User not found" });
  }
}