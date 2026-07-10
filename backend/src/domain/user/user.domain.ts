import { UserResponseDTO } from "./types/user.response.js";

export class User {
  private id: string;
  private createdAt: string;
  private updatedAt: string;

  private constructor(
    public name: string,
    public email: string,
    public password: string,
    id?: string,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id ?? crypto.randomUUID();
    this.createdAt = createdAt ?? new Date().toISOString();
    this.updatedAt = updatedAt ?? new Date().toISOString();
  }

  static create(
    name: string,
    email: string,
    password: string
  ): User {
    return new User(name, email, password);
  }

  static restore(props: {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  }): User {
    return new User(
      props.name, props.email,
      props.password, props.id,
      props.createdAt, props.updatedAt);
  }

  static toResponseDTO(user: User): UserResponseDTO {
    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt()
    };
  }

  getName(): string { return this.name; }
  getEmail(): string { return this.email; }
  getPassword(): string { return this.password; }
  getId(): string { return this.id; }
  getCreatedAt(): string { return this.createdAt; }
  getUpdatedAt(): string { return this.updatedAt; }
}