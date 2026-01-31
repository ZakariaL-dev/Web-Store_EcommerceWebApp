import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      trim: true,
    },

    image: {
      type: String,
      trim: true,
    },

    title: {
      type: String,
      trim: true,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },

    comment: {
      type: String,
      trim: true,
    },

    timeOfSubmit: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate reviews per user/product
ReviewSchema.index({ user: 1, product: 1 }, { unique: true });

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
