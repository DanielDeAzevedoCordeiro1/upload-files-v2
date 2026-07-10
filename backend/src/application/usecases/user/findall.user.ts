import { IUserRepository } from "../../../domain/user/IUser.repository.js";
import { UserResponseDTO } from "../../../domain/user/types/user.response.js";
import { User } from "../../../domain/user/user.domain.js";

export class FindAllUserUseCase {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(): Promise<UserResponseDTO[] | null> {
    const users = await this.userRepository.getAllUsers();
    if (!users) {
      return null;
    }
    return users.map(User.toResponseDTO);
  }
}