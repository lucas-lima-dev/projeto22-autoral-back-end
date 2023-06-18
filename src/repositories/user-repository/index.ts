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

async function searchUsers({ username }: any) {
  return prisma.users.findMany({
    where: {
      username: {
        contains: username,
      },
    },
    select:{
      id: true,
      username: true,
      user_url: true,
    }
  });
}

const userRepository = {create,findByEmail, searchUsers}

export default userRepository;