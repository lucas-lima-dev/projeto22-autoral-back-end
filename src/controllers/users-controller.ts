import userService from "@/services/users-service";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { username, email, password, user_url } = req.body;
  // console.log(req.body);

  try {
    const createdUser = await userService.createUser({ username, email, password, user_url });
    return res.status(httpStatus.CREATED).send(createdUser);
  } catch (error) {
    next(error);
  }
}

async function singIn(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  try {
    const result = await userService.signIn({ email, password });

    console.log(result.token);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    next(error);
  }
}

const userController = {
  createUser,
  singIn,
};

export default userController;
