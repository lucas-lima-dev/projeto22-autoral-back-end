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
    const user_id = res.locals.user_id;
    const { id } = req.params;
    const { description } = req.body as { description: string };
    

    try {
        const updatedDescription = await postService.updatePost( Number(id), description, Number(user_id) );
        return res.status(httpStatus.OK).send(updatedDescription);
    } catch (error) {
        next(error);
    }
}

async function deletePost(req: Request, res: Response, next: NextFunction){
    const user_id = res.locals.user_id;
    const { id } = req.params;

    try {
        await postService.deletePost( Number(id), Number(user_id) );
        return res.status(httpStatus.NO_CONTENT).send("OK");
    } catch (error) {
        next(error);
    }
}

const postController = {
    createPost,
    readPost,
    updatePost,
    deletePost,
}

export default postController;