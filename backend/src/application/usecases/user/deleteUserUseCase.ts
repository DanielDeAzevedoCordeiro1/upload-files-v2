import { IUserRepository } from "../../../domain/user/IUser.repository.js";

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(email: string): Promise<boolean> {
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw new Error("Usuario nao encontrado");
    }
    const isSuccess = await this.userRepository.deleteUser(email);
    if (!isSuccess) {
      throw new Error("Erro ao deletar usuario");
    }
    return isSuccess;
  }
}