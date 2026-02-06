// MoongoDB
import connectDB from "@/config/MongoDB";

// Schemas
import User from "@/models/UserSchema";

// Next
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { userId, selectedItems } = await req.json();

    if (!userId || !selectedItems) {
      return NextResponse.json(
        { success: false, message: "Missing required data" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          checkout: selectedItems.map((item) => ({
            product: item.product._id || item.product,
            color: item.color,
            size: item.size,
            quantity: item.quantity,
          })),
        },
      },
      { new: true }
    ).populate("checkout.product");

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Checkout items updated",
      checkout: updatedUser.checkout,
    });
  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
