import { PrismaClient } from "../../../../../generated/prisma/client.js";
import { IUserRepository } from "../../../../domain/user/IUser.repository.js";
import { User } from "../../../../domain/user/user.domain.js";
import { UserMapper } from "./user.mapper.js";

export class UserPrismaRepository implements IUserRepository {

  constructor(private client: PrismaClient) { }
  
  async createUser(user: User): Promise<User> {
    const created = await this.client.user.create({
      data: UserMapper.toPersistence(user),
    });
    return UserMapper.toDomain(created);
  }

  async getByEmail(email: string): Promise<User | null> {
    const found = await this.client.user.findUnique({ where: { email } });
    return found ? UserMapper.toDomain(found) : null;
  }

  async deleteUser(email: string): Promise<boolean> {
    try {
      await this.client.user.delete({ where: { email } });
      return true;
    } catch {
      return false;
    }
  }

  async updateUser(email: string, user: User): Promise<User | null> {
    try {
      const updated = await this.client.user.update({
        where: { email },
        data: UserMapper.toPersistence(user),
      });
      return UserMapper.toDomain(updated);
    } catch {
      return null;
    }
  }

  async getAllUsers(): Promise<User[] | null> {
    const users = await this.client.user.findMany();
    return users.map(UserMapper.toDomain);
  }
}