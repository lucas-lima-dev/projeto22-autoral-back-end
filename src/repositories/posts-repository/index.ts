import { prisma } from '@/config';

async function createPost({ url, description, user_id }:any) {
    return prisma.posts.create({
        data: {
            user_id,
            description,
            url,
        }
    })
}

async function readPost() {
    return prisma.posts.findMany()
}

async function updatePost() {}

async function deletePost(){}

const postRepository = {
    createPost,
    readPost,
    updatePost,
    deletePost,
}

export default postRepository;