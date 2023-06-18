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

async function updatePost() {}

async function deletePost() {}

const postRepository = {
  createPost,
  readAllPosts,
  updatePost,
  deletePost,
};

export default postRepository;
