import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },

    discount: {
      type: String,
      required: true,
    },

    expireDate: {
      type: String,
      trim: true,
    },

    expired: {
      type: Boolean,
      default: false,
    },

  },
  { timestamps: true },
);

export default mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);
