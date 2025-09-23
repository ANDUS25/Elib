import mongoose from "mongoose";

const booksModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: {
      // This is for the connecting book database together
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Books", booksModel);
