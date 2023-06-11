import { badRequestError } from "@/errors";
import postRepository from "@/repositories/posts-repository";
import urlMetadata from "url-metadata";

async function createPost({ url, description, user_id }: any) {
  const createdPost = await postRepository.createPost({
    url,
    description,
    user_id,
  });
  return createdPost;
}

async function readPost() {
  const allPosts: any = await postRepository.readPost();
  

  try {
    allPosts.forEach( async (post: any) => {
        for (post of allPosts) {
            const meta = await urlMetadata(post.url);
            post.title = meta.title;
            post.image = meta.image;
            post.brief = meta.description;
          }
      })
  } catch (error) {
    console.log(error)
    throw badRequestError()
  }

  return allPosts;
}

async function updatePost() {}

async function deletePost() {}

const postService = {
  createPost,
  readPost,
  updatePost,
  deletePost,
};

export default postService;
