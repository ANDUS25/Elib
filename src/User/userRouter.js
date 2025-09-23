import Express from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

import { userModel } from "./userModel.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const userRouter = Express.Router();

// User Registration flow
userRouter.post("/register", async (req, res, next) => {
  const { name, email, password, city, age } = req.body;

  const user = await userModel.findOne({ email });

  const hashPassword = await bcrypt.hash(password, 10);

  let response = { status: 0, message: "", data: [], responseCode: 0 };

  try {
    if (!name || !email || !password || !city || !age) {
      // throwing error inside sync function and it passing into the global error handler.

      response = {
        message: "All fields are required.",
        status: 400,
        data: [],
        responseCode: 0,
      };
      res.status(400).json(response);
      const error = createHttpError(400, "All fields are required.");
      return next(error);
    } else if (user) {
      // If the user is already present with same mail id

      const error = createHttpError(409, "User already exists. Please login.");
      return next(error);
    } else {
      const newUser = await userModel.create({
        name,
        email,
        password: hashPassword,
        city,
        age,
      });

      // if the user is genuine then and then only generate this jwt token and this token will be expire after 1 day.
      const token = jwt.sign({ sub: newUser._id }, config.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .json({ message: "User register successfully", id: token });
    }
  } catch (error) {
    const httpError = createHttpError(500, "Something went wrong");
    return next(httpError);
  }
});

// User Login Flow

userRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const userData = await userModel.findOne({ email });

  try {
    if (!email || !password) {
      return next(createHttpError(404, "Please register user first"));
    }
  } catch (error) {
    return next(createHttpError(500, "Something went wrong"));
  }

  try {
    if (!userData) {
      return next(createHttpError(404, "User not found!"));
    }
  } catch (error) {
    return next(createHttpError(500, "Something went wrong"));
  }

  try {
    // Using compare method for store password and incoming password.
    const iseUserMatch = await bcrypt.compare(password, userData.password);

    if (iseUserMatch) {
      const token = jwt.sign({ sub: userData._id }, config.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      res.status(200).json({ message: "Login Successfully", token });
    } else {
      return next(createHttpError(500, "Incorrect user detail, please check the password and email"));
    }
  } catch (error) {
    console.log("====================================");
    console.log("error", error);
    console.log("====================================");
    return next(createHttpError(500, "Some thing went wrong!"));
  }
});

export default userRouter;
