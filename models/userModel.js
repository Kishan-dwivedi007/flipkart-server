import mongoose from "mongoose";
import validator from "validator";

//Schema model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "full name is required"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
