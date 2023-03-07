import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    role: {
      type: String,
      enum: ["visitor", "admin"],
      default: "visitor",
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", Schema);
