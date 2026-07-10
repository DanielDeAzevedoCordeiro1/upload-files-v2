import { JwtPayload } from '../user.auth.js';
import jwt from 'jsonwebtoken';

export class JwtProvider {
  private readonly jwtSecret: string = "123456789";

  constructor() { }

  generateToken(payload: JwtPayload): string {
    const token = jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
    return token;
  }
}