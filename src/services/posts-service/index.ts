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
// async function readPost() {
//   try {
//     const allPosts = await postRepository.readPost();
//     const p: any = [];

//     await Promise.all(
//       allPosts.map(async (post: any) => {
//         const meta = await urlMetadata(post.url);
//         post.title = meta.title;
//         post.image = meta.image;
//         post.brief = meta.description;
//         p.push(post);
//       })
//     );

//     return p;
//   } catch (error) {
//     console.log(error);
//     throw badRequestError();
//   }
// }

async function updatePost() {}

async function deletePost() {}

const postService = {
  createPost,
  readAllPosts,
  updatePost,
  deletePost,
};

export default postService;
