import { envsConfig } from "../../config/envsConfig.js";
import { JwtPayload } from "../user.auth.js";
import jwt from 'jsonwebtoken';

export class JwtValidator {
  private static readonly secretKey: string = "123456789";
  private static instance: JwtValidator;

  private constructor() {}

  static getInstance(): JwtValidator {
    if (!JwtValidator.instance) {
      JwtValidator.instance = new JwtValidator();
    }
    return JwtValidator.instance;
  }

  static validateToken(token: string): JwtPayload | null { 
    try {
      const decoded = jwt.verify(token, this.secretKey)
      return decoded as JwtPayload;
    } catch (error) {
      return null;
    }
  }
}