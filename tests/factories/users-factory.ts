import bcrypt from 'bcrypt';
import { faker } from "@faker-js/faker";
import { prisma } from '@/config';

export async function createUser(params?: any): Promise<any> {
  const incomingPassword = (faker.internet.password() || params.password);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.users.create({
    data: {
      username: faker.internet.userName() || params.username,
      email: faker.internet.email() || params.email,
      password: hashedPassword,
      user_url: faker.internet.url() || params.user_url,
    },
  });
}

export function generateValidBody() {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    user_url: faker.internet.url(),
  };
}
