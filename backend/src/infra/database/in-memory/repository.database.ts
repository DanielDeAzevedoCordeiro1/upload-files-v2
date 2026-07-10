import { IUserRepository } from "../../../domain/user/IUser.repository.js";
import { User } from "../../../domain/user/user.domain.js";
import { InMemoryDatabase } from "./inmemory.database.js";

export class InMemoryDatabaseRepository implements IUserRepository {

  private readonly database: Map<string, User>;
  
  constructor(database: Map<string, User>) {
    this.database = database
  }
  
  createUser(user: User): Promise<User> {
    const userExists = this.database.get(user.getId());
    if (userExists) {
      throw new Error("Usuario ja existe");
    }
    const newUser: User = User.create(user.getName(), user.getEmail(), user.getPassword());

    this.database.set(user.getEmail(), newUser);
    return Promise.resolve(newUser);
  }
  
  getByEmail(email: string): Promise<User | null> {
    const userExists = this.database.get(email);
    if (!userExists) {
      return Promise.resolve(null);
    }
    return Promise.resolve(userExists);
  }

  deleteUser(email: string): Promise<boolean> {
    const exists = this.database.has(email);
    if (exists) {
      this.database.delete(email);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  updateUser(email: string, user: User): Promise<User | null> {
    const userSaved = this.database.get(email);
    if (!userSaved) {
      return Promise.resolve(null);
    }

    this.database.delete(email)
    this.database.set(user.email, user)
    return Promise.resolve(user);
  }

  getAllUsers(): Promise<User[] | null> {
    const users = Array.from(this.database.values());
    return Promise.resolve(users);
  }
}