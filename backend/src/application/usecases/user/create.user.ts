import { IUserRepository } from "../../../domain/user/IUser.repository.js";
import { User } from "../../../domain/user/user.domain.js";
import { UserResponseDTO } from "../../../domain/user/types/user.response.js";
import { UserRequestDTO } from "../../../domain/user/types/user.request.js";

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(userInput: UserRequestDTO): Promise<UserResponseDTO> { 
    const user = User.create(
      userInput.name,
      userInput.email,
      userInput.password
    );
    const newUser = await this.userRepository.createUser(user)
    if (!newUser) {
      throw new Error("Erro ao criar usuario");
    }
    return User.toResponseDTO(user)
  }
}
