import Express from "express";
import path from "node:path";

import bookRouterController from "./bookController.js";
import multer from "multer";

const bookRouter = Express.Router();

// we are using Multer as a middleware because express don't accept the file as a json it's a special type of data which can only handle by multer

const uploadFile = multer({
  // destination is for where to store file,need to give path
  dest: path.resolve(path.__dirname, "../../Public/data/books"),
  limits: { fileSize: 10 * 1204 * 1024 },
});

// upload.fields is for multiple file as here we are sharing 2 file main file and coverImage.
bookRouter.get(
  "/",
  uploadFile.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  bookRouterController
);

export default bookRouter;
