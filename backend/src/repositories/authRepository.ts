import { prisma } from '../database/prismaClient';

export const authRepository = {
  async findUserByEmail(email: string) {
    return prisma.user.findFirst({
      where: { email }
    });
  }
};
