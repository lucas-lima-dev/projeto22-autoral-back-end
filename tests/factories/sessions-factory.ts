import { sessions } from '@prisma/client';
import { createUser } from './users-factory';
import { prisma } from '@/config';
import * as jwt from 'jsonwebtoken';
import { users } from '@prisma/client';

export async function createSession(token: string): Promise<sessions> {
  const user = await createUser();

  return prisma.sessions.create({
    data: {
      token: token,
      user_id: user.id,
    },
  });
}

export async function generateValidToken(user?: users) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ user_id: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(token);

  return token;
}