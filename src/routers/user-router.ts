import { Router } from 'express';
import userController from '@/controllers/users-controller';
import { validateBody } from '@/middlewares';
import { signInSchema, signUpSchema } from '@/schemas';

const userRouter = Router();

userRouter.post('/sign-up',validateBody(signUpSchema), userController.createUser);
userRouter.post('/sign-in',validateBody(signInSchema), userController.singIn);

export default userRouter;