import { prisma } from '@/config';

async function create(data: any) {
   return prisma.users.create({
        data,
    });
}

async function findByEmail(email: string) {
  return prisma.users.findUnique({
    where: {
      email,
    },
  });
}

const userRepository = {create,findByEmail}

export default userRepository;