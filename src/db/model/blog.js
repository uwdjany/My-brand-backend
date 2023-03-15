import mongoose from "mongoose";
const Schema = new mongoose.Schema(
  {
    title: String,
    content: String,
    image: String,
    comments: [
      {
        user_id: {
          type: mongoose.Schema.ObjectId,
          required: true,
          ref: "user",
        },
        email: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: [true, "Please add a comment"],
        },
        postedDate: {
          type: String,
          required: true,
        },
      },
    ],
    likes: [
      {
        user_id: {
          type: mongoose.Schema.ObjectId,
          required: true,
          ref: "user",
        },
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("blog", Schema);
