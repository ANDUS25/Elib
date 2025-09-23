import Express from "express";

import bookRouterController from "./bookController.js";

const bookRouter = Express.Router();

bookRouter.get("/", bookRouterController);

export default bookRouter;
