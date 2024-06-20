import { Router, Request, Response } from "express"
import { userLoginController, userRegisterController } from "../controllers/user.controller";

const userRouter = Router()

//TODO EMAIL VALIDATION AND ERROR MANAGEMENT
userRouter.post("/register", userRegisterController);

userRouter.post("/login",userLoginController)

export default userRouter;