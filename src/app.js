import Express from "express";
import createHttpError from "http-errors";

import globalErrorHandler from "./middleware/globalErrorHandler.js";
import userRouter from "./User/userRouter.js";

const app = Express();

app.use(Express.json());

app.get("/", (req, res) => {
  res.status(200).send(`<h1>Hello World</h1>`);
});

// This is a sync function so we can directly pass the error and global error handler will catch it.
app.get("/error", () => {
  const errorHandler = createHttpError(404, "Not data found.");
  throw errorHandler;
});

app.use("/api/Users", userRouter);

// Global error handler
// no need to call it. express will call itself when required.
app.use(globalErrorHandler);

export default app;
