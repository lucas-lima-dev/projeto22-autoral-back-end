import postController from '@/controllers/posts-controller';
import { validateBody } from '@/middlewares';
import { postSchema } from '@/schemas/post-schema';
import { Router } from 'express';

const homeRouter = Router();

// homeRouter.all('/*',authenticateToken)
homeRouter.get('/timeline', postController.readPost)
homeRouter.post('/posts', validateBody(postSchema), postController.createPost)
homeRouter.patch('/posts/:id', postController.updatePost)
homeRouter.delete('/posts/:id', postController.deletePost)


export default homeRouter;