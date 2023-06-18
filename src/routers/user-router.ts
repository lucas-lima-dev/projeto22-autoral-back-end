import { Router } from 'express';
import userController from '@/controllers/users-controller';
import { validateBody } from '@/middlewares';
import { signInSchema, signUpSchema } from '@/schemas';
import { authenticateToken } from '@/middlewares/authentication-middleware';

const userRouter = Router();

userRouter.post('/sign-up',validateBody(signUpSchema), userController.createUser);
userRouter.post('/sign-in',validateBody(signInSchema), userController.singIn);
userRouter.post('/search-users', userController.searchUsers)

export default userRouter;