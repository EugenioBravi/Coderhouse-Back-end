import { Schema, model } from "mongoose";
import mongooseDelete from "mongoose-delete";
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.plugin(mongooseDelete, { deletedAt: true });
export const User = model("Users", userSchema);
