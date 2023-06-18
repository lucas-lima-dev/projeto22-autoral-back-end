import { badRequestError } from "@/errors";
import postRepository from "@/repositories/posts-repository";
import urlMetadata from "url-metadata";

async function createPost({ url, description, user_id }: any) {
  const meta = await urlMetadata(url);

  const data = {
    user_id,
    description,
    url,
    title: meta.title,
    image: meta.image,
    brief: meta.description,
  };

  const createdPost = await postRepository.createPost(data);
  return createdPost;
}

async function readAllPosts() {
  const allPosts = await postRepository.readAllPosts();
  return allPosts;
}

async function updatePost() {}

async function deletePost() {}

const postService = {
  createPost,
  readAllPosts,
  updatePost,
  deletePost,
};

export default postService;
