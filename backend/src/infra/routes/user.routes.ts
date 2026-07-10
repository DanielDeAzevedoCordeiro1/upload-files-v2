import { Request, Response, Router } from "express";
import { router } from "./index.js";
import {
  createUserController,
  findAllUsersController,
  findUserController,
  loginUserController,
  deleteUserController
} from "../../application/controllers/index.js";
import { authMiddleware } from "../auth/user.auth.js";

const userRouter = router;

userRouter.post('/user/signup', async (req: Request, res: Response) => { 
  await createUserController.handle(req, res);
})

userRouter.post('/user/signin', async (req: Request, res: Response) => {
  await loginUserController.handle(req, res);
});

userRouter.get('/user', authMiddleware, async (req: Request, res: Response) => {
  await findUserController.handle(req, res);
});

userRouter.delete('/user', authMiddleware, async (req: Request, res: Response) => {
  await deleteUserController.handle(req, res);
});

userRouter.get('/user/all', async (req: Request, res: Response) => {
  await findAllUsersController.handle(res);
});

export { userRouter };