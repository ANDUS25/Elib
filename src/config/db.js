/* eslint-disable no-undef */
import mongoose from "mongoose";
import { config } from "./config.js";

const connectToDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("====================================");
      console.log("Connected to Mongo DB database.");
      console.log("====================================");
    });
    mongoose.connection.on("error", (error) => {
      console.log("====================================");
      console.log("Occur error while connecting to Mongo DB database.", error);
      console.log("====================================");
    });
    await mongoose.connect(config.DATABASE_URL);
  } catch (error) {
    console.log("====================================");
    console.log("This is an error:- ", error);
    console.log("====================================");

    // exit used because if we are not able to connect to database then no need to stop the server.
    process.exit(1);
  }
};

export default connectToDB;
