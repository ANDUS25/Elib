import Express from "express";

import userLoginController from "./Controller/login.js";
import userRegisterController from "./Controller/register.js";

const userRouter = Express.Router();

// User Registration flow
userRouter.post("/register", userLoginController);

// User Login Flow

userRouter.post("/login", userRegisterController);

export default userRouter;
