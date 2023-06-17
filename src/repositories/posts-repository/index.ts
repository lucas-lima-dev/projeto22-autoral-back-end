import { prisma } from "@/config";

async function createPost(data: any) {
  return prisma.posts.create({
    data,
  });
}

async function readAllPosts() {
  return prisma.posts.findMany();
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
