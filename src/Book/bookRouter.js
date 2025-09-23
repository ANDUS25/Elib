import Express from "express";

import { config } from "../config/config.js";
import bookRouterController from "./bookController.js";

const bookRouter = Express.Router();

bookRouter.get("/", bookRouterController);
