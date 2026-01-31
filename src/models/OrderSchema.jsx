import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number, required: true },
        priceAtPurchase: { type: Number, required: true },
        color: String,
        size: String,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    deliveryFee: {
      type: Number,
      required: true,
    },

    timeOfOrder: {
      type: String,
      trim: true,
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "Card"],
      default: ["Cash"],
      required: true,
    },

    deliveryPlace: {
      type: String,
      enum: ["Home", "Bureau"],
      required: true,
    },

    deliveryAddress: {
      address: String,
      bureauAddress: String,
    },

    status: {
      type: String,
      enum: ["pending", "delivered", "canceled"],
      default: "pending",
    },

    paymentStatus: {
      type: Boolean,
      default: false,
    },

    chargilyInvoiceId: {
      type: String,
      index: true,
    },
    chargilyCheckoutUrl: String,
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
