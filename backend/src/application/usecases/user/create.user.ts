import { IUserRepository } from "../../../domain/user/IUser.repository.js";
import { User } from "../../../domain/user/user.domain.js";
import { UserResponseDTO } from "../../../domain/user/types/user.response.js";
import { UserRequestDTO } from "../../../domain/user/types/user.request.js";
import { emailTemplateBase } from "../../../domain/user/templates/email.template.js";
import { EmailProvider } from "../../../infra/resend/email.provider.js";

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository, private emailProvider: EmailProvider) { }

  async execute(userInput: UserRequestDTO): Promise<UserResponseDTO> { 
    const user = User.create(
      userInput.name,
      userInput.email,
      userInput.password
    );
    
    const newUser = await this.userRepository.createUser(user)
    const emailContent = {
      to: newUser.email,
      subject: "Seja bem vindo a esta plataforma inutil",
    } 

    const generatedHtml = emailTemplateBase(emailContent);
    await EmailProvider.sendEmail(newUser.email, emailContent.subject, generatedHtml);
    
    if (!newUser) {
      throw new Error("Erro ao criar usuario");
    }
    return User.toResponseDTO(user)
  }
}
