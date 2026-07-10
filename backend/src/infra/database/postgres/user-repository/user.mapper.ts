import { User } from "../../../../domain/user/user.domain.js";
import { User as PrismaUser } from "../../../../../generated/prisma/client.js";

export class UserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.restore({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      password: raw.password,
      createdAt: raw.createdAt.toDateString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  static toPersistence(user: User): PrismaUser {
    return {
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
    };
  }
}