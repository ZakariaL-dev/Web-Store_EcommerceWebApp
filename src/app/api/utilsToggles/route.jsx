// MoongoDB
import connectDB from "@/config/MongoDB";

// Schemas
import User from "@/models/UserSchema";

// Next
import { NextResponse } from "next/server";


export async function PATCH(req) {
  try {
    await connectDB();
    const { userId, productId, actionType, action } = await req.json();

    const user = await User.findById(userId);
    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );

    // Determine which array to target
    const targetArray =
      actionType.toLowerCase() === "compare" ? "compare" : "wishlist";
    const isPresent = user[targetArray].includes(productId);

    const isRemoval = action === "remove" || isPresent;

    // Limit check for comparison (max 3)
    if (actionType === "compare" && !isRemoval && user.compare.length >= 3) {
      return NextResponse.json(
        { success: false, message: "Comparison limit reached (max 3 items)" },
        { status: 400 }
      );
    }

    let update;
    let message;

    if (action === "clear") {
      update = { $set: { [targetArray]: [] } };
      message = `${targetArray} cleared successfully`;
    } else {
      const isPresent = user[targetArray].includes(productId);
      const isRemoval = action === "remove" || isPresent;

      // Limit check for comparison (max 3)
      if (targetArray === "compare" && !isRemoval && user.compare.length >= 3) {
        return NextResponse.json(
          { success: false, message: "Comparison limit reached (max 3 items)" },
          { status: 400 }
        );
      }

      update = isRemoval
        ? { $pull: { [targetArray]: productId } }
        : { $addToSet: { [targetArray]: productId } };

      message = isRemoval
        ? `Removed from ${actionType}`
        : `Added to ${actionType}`;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, update, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      data: updatedUser[targetArray],
      message: message,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
