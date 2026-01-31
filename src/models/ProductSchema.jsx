import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      required: true,
      min: 5,
    },

    category: {
      type: String,
      index: true,
      required: true,
      enum: ["man", "woman", "kids", "accessories"],
    },

    status: {
      type: String,
      index: true,
      required: true,
      enum: ["new", "on sale", "normal"],
      default: "new",
    },

    variants: [
      {
        size: { type: String, required: true },
        color: { type: String, required: true },
        quantity: { type: Number, required: true, min: 0 },
      },
    ],

    previewImages: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
