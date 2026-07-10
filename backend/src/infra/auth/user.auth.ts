import { NextFunction, Request, Response } from "express";
import { JwtValidator } from "./jwt/jwt.validator.js";

export type JwtPayload = {
  id: string;
  email: string;
  name: string;
};

export interface AuthRequest extends Request {
  user?: JwtPayload
};

export const authMiddleware = (request: AuthRequest, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(400).json({ message: "No token provided" });
  }
  const token = authHeader.split(' ')[1]!;
  const tokenIsValid = JwtValidator.validateToken(token);
  if (!tokenIsValid) {
    return response.status(401).json({ message: "Invalid token" });
  }
  request.user = tokenIsValid;
  next();
}

