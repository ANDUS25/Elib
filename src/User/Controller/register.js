/* eslint-disable no-unused-vars */
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { userModel } from "../userModel.js";
import { config } from "../../config/config.js";

const userRegisterController = async (req, res, next) => {
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
      return next(
        createHttpError(
          500,
          "Incorrect user detail, please check the password and email"
        )
      );
    }
  } catch (error) {
    console.log("====================================");
    console.log("error", error);
    console.log("====================================");
    return next(createHttpError(500, "Some thing went wrong!"));
  }
};

export default userRegisterController;
