import { mongoose, Schema } from "mongoose";
import mongooseDelete from "mongoose-delete";

const schema = new Schema(
  {
    _id: {
      type: String,
      required: false,
      unique: true,
      default: mongoose.Types.ObjectId,
    },
    products: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "products",
          },
          quantity: { type: Number, default: 1 },
          _id: false,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongooseDelete, { deletedAt: true });

export const CartModel = mongoose.model("carts", schema);
