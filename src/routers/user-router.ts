import { Router } from 'express';
import userController from '@/controllers/users-controller';

const userRouter = Router();

userRouter.post('/sign-up', userController.createUser);
userRouter.post('/sign-in', userController.singIn);

export default userRouter;