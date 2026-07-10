import { IUserRepository } from "../../../domain/user/IUser.repository.js";
import { User } from "../../../domain/user/user.domain.js";
import { UserResponseDTO } from "../../../domain/user/types/user.response.js";

export class FindUserUseCase {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(email: string): Promise<UserResponseDTO | null> {
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      return null;
    }
    return User.toResponseDTO(user)
  }
}