import mongoose from "mongoose";

const productReportSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reason: {
      type: String,
      enum: [
        "Incorrect or Misleading Information",
        "Pricing Error",
        "Image Issue",
        "Incorrect Category",
        "Duplicate Listing",
        "Broken Links",
        "Discount Code Not Working",
        "Other",
      ],
      required: true,
    },

    OtherReason: {
      type: String,
    },

    comment: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "underReview", "resolved"],
      default: "pending",
    },

    timeOfReport: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.ProductReport ||
  mongoose.model("ProductReport", productReportSchema);
