import { prisma } from "@/config";

async function createPost(data: any) {
  return prisma.posts.create({
    data,
  });
}

async function readAllPosts() {
  return prisma.posts.findMany({
    select: {
      id: true,
      url: true,
      description: true,
      title: true,
      image: true,
      brief: true,
      users: {
        select: {
          user_url: true,
          username: true,
        }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  });
}

async function updatePost({ id, description }:any) {
  return prisma.posts.update({
    where: {
      id,
    },
    data: {
      description,
    },
  });
}

async function deletePost(id: any) {
  return prisma.posts.delete({
    where: {
      id,
    },
  });
}

async function readPostById(id: number) {
  return prisma.posts.findUnique({
    where: {
      id,
    },
  });
  
  
}

const postRepository = {
  createPost,
  readAllPosts,
  updatePost,
  deletePost,
  readPostById,
};

export default postRepository;
