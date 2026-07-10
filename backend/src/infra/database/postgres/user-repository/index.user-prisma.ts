import { UserPrismaRepository } from "./user-prisma.repository.js";
import { prismaClientProvider } from "../client-pg.js";

export const prismaUserRepository = new UserPrismaRepository(prismaClientProvider);