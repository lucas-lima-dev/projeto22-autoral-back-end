import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import postService from "@/services/posts-service";

async function createPost(req: Request, res: Response, next: NextFunction) {
    const { url, description } = req.body;
    const user_id = res.locals.user_id;

    try {
        const createdPost = await postService.createPost({ url, description, user_id });
        return res.status(httpStatus.CREATED).send(createdPost);
    } catch (error) {
        next(error);
    }
}

async function readPost(req: Request, res: Response, next: NextFunction){

    try {
        const allPosts = await postService.readAllPosts();
        return res.status(httpStatus.OK).send(allPosts);
    } catch (error) {
        next(error)
    }

}

async function updatePost(req: Request, res: Response, next: NextFunction){

}

async function deletePost(req: Request, res: Response, next: NextFunction){
    
}

const postController = {
    createPost,
    readPost,
    updatePost,
    deletePost,
}

export default postController;