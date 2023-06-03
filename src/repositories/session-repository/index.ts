import { prisma } from '@/config';

async function create(data: any) {
  return prisma.sessions.create({
    data,
  });
}

const sessionRepository = {
  create,
};

export default sessionRepository;
