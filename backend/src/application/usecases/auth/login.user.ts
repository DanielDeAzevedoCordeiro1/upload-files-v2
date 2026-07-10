import { IUserRepository } from "../../../domain/user/IUser.repository.js";
import { JwtProvider } from "../../../infra/auth/jwt/jwt.provider.js";

export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository, private jwtService: JwtProvider) { }

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    const payload = { 
      id: user.getId(),
      email: user.email,
      name: user.name
    };

    const token = this.jwtService.generateToken(payload)
    return token;
  }
}