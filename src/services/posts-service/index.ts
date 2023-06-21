import { badRequestError, forBiddenError } from "@/errors";
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

async function updatePost( id: number, description: string, user_id:number) {
  const post = await postRepository.readPostById(id);
  
  if (!post) {
    throw badRequestError();
  }

  if (post.user_id !== user_id) {
    throw forBiddenError();
  }

  const updatedPost = await postRepository.updatePost({ id, description });
  return updatedPost;
}

async function deletePost( id: number, user_id:number ) {
  const post = await postRepository.readPostById(id);

  if (!post) {
    throw badRequestError();
  }

  if (post.user_id !== user_id) {
    throw forBiddenError();
  }

  await postRepository.deletePost(id);
}

const postService = {
  createPost,
  readAllPosts,
  updatePost,
  deletePost,
};

export default postService;
