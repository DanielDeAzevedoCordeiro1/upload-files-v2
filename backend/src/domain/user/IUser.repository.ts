import { User } from "./user.domain.js";


export abstract class IUserRepository { 
  abstract createUser(user: User): Promise<User>;
  abstract getByEmail(email: string): Promise<User | null>;
  abstract deleteUser(email: string): Promise<boolean>;
  abstract updateUser(email: string, user: User): Promise<User | null>;
  abstract getAllUsers(): Promise<User[] | null>;
}