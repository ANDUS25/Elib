import { config } from "../config/config.js";

const globalErrorHandler = (error, req, res, next) => {
  const errorHandler = error.statusCode || 500;

  // error.stack contains all the information of the error. file, line number, which type of error is it.
  // but is should not use in production because it may contain some sensitive information.
  return res.status(errorHandler).json({
    Message: error.message,
    errorStack: config.ENV === "development" ? error.stack : "",
  });
};

export default globalErrorHandler;
