import mongoose from "mongoose";

const userReportSchema = new mongoose.Schema(
  {
    reportedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
        "Fraud or Scam",
        "Harassment or Inappropriate Content",
        "Review Manipulation",
        "Abusive Behavior and language",
        "Spam / Advertising",
        "Hate Speech",
        "Off-Topic",
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
      enum: ["pending", "reviewed", "action_taken"],
      default: "pending",
    },

    timeOfReport: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.UserReport ||
  mongoose.model("UserReport", userReportSchema);
