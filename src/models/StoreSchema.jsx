import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema(
  {
    banners: [String],

    events: [
      {
        title: { type: String, required: true },
        start: { type: String, required: true },
        end: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],

    delivery: {
      type: String,
    //   required: true,
    },

    contents: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        updated: { type: String, required: true },
      },
    ],

    filters: {
      priceRange: {
        min: { type: Number, required: true, min: 0, default: 0 },
        max: { type: Number, required: true, min: 0, default: 0 },
      },
      colors: [{ type: String, lowercase: true, trim: true }],
      sizes: [{ type: String, uppercase: true, trim: true }],
    },
  },
  { timestamps: true },
);

export default mongoose.models.Store || mongoose.model("Store", StoreSchema);
