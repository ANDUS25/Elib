/* eslint-disable no-unused-vars */
import createHttpError from "http-errors";
import jwt from "jwt";
import bcrypt from "bcrypt";

import { userModel } from "../userModel.js";
import { config } from "../../config/config";

const userLoginController = async (req, res, next) => {
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
};

export default userLoginController;
