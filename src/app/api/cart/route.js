// Schemas
import User from "@/models/UserSchema";

// MoongoDB
import mongoose from "mongoose";
import connectDB from "@/config/MongoDB";

// Next
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    await connectDB();
    const { userId, productId, itemId, color, size, quantity, action } =
      await req.json();

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid user ID" },
        { status: 400 },
      );
    }

    switch (action) {
      case "add":
        const user = await User.findById(userId);
        if (!user)
          return NextResponse.json(
            { success: false, message: "User not found" },
            { status: 404 },
          );

        const existingIndex = user.cart.findIndex(
          (item) =>
            item.product.toString() === productId &&
            item.color === color &&
            item.size === size,
        );

        if (existingIndex > -1) {
          user.cart[existingIndex].quantity += quantity;
        } else {
          user.cart.push({ product: productId, color, size, quantity });
        }
        await user.save();
        break;

      case "updateQty":
        await User.updateOne(
          { _id: userId, "cart._id": itemId },
          { $set: { "cart.$.quantity": quantity } },
        );
        break;

      case "updateVariant":
        await User.updateOne(
          { _id: userId, "cart._id": itemId },
          { $set: { "cart.$.color": color, "cart.$.size": size } },
        );
        break;

      case "remove":
        // Removes one specific sub-document by its _id
        await User.findByIdAndUpdate(userId, {
          $pull: { cart: { _id: itemId } },
        });
        break;

      case "clear":
        // Resets the cart to an empty array
        await User.findByIdAndUpdate(userId, { $set: { cart: [] } });
        break;
    }

    // Always return the updated cart populated with product details
    const updatedUser = await User.findById(userId).populate("cart.product");
    return NextResponse.json({ success: true, cart: updatedUser.cart });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
