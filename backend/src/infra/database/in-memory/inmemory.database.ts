import { User } from "../../../domain/user/user.domain.js";

export class InMemoryDatabase {
  private static instance: Map<string, User>;

  private constructor() { }

  public static getInstance(): Map<string, User> {
    if (!InMemoryDatabase.instance) {
      InMemoryDatabase.instance = new Map<string, User>();
    }
    return InMemoryDatabase.instance;
  }  
}