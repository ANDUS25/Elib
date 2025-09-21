import Express from "express";

const userRouter = Express.Router();

userRouter.post("/register", (req, res, next) => {
  res.send("Create a new user");
});

export default userRouter;
