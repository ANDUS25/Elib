/* eslint-disable no-constant-condition */
import path, { dirname } from "node:path";
import cloudinary from "../config/cloudinary.js";
import { fileURLToPath } from "node:url";
import createHttpError from "http-errors";
import booksModel from "./bookModel.js";
import { rm } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirName = dirname(__filename);

const uploadData = (req) => {
  let dataMimeType;
  let filePath;
  let fileName;

  const { genre, title } = req.body;

  if (req.files && req.files.coverImage) {
    const filesData = req.files.coverImage[0];
    dataMimeType = filesData.mimetype.split("/").at(-1);
    fileName = filesData.filename;
    filePath = path.resolve(__dirName, "../../Public/data/books", fileName);
    return { dataMimeType, filePath, fileName, genre, title };
  } else if (req.files && req.files.file) {
    const filesData = req.files.file[0];
    dataMimeType = filesData.mimetype.split("/").at(-1);
    fileName = filesData.filename;
    filePath = path.resolve(__dirName, "../../Public/data/books", fileName);
    return { dataMimeType, filePath, fileName, genre, title };
  }
};

const bookRouterController = async (req, res, next) => {
  try {
    const uploadCloudinaryData = await cloudinary.uploader.upload(
      uploadData(req).filePath,
      {
        resource_type:
          uploadData(req).coverImageMimeType === "pdf" || "PDF" ? "raw" : "",
        filename_override: uploadData(req).fileName,
        folder:
          uploadData(req).coverImageMimeType === "pdf" || "PDF"
            ? "Book-PDF"
            : "Book-Covers",
        format: uploadData(req).coverImageMimeType,
      }
    );

    const newBook = await booksModel.create({
      title: uploadData(req)?.title,
      genre: uploadData(req)?.genre,
      author: "68d011636820647fda4a719e",
      coverImage: uploadCloudinaryData?.secure_url,
      file: uploadCloudinaryData?.secure_url,
    });

    rm(
      path.resolve(__dirName, "../../Public/data/books"),
      { recursive: true, force: true },
      (err) => {
        if (err) {
          return "Error deleting folder";
        } else {
          return "Folder deleted successfully";
        }
      }
    );

    res.status(200).json({
      Message:
        Object.keys(newBook).length > 0 ? "Create" : "Please check the issue",
      filePath: "folder delete successfully",
    });
  } catch (error) {
    return next(createHttpError(500, error));
  }
};

export default bookRouterController;
