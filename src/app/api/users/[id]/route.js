// MoongoDB
import connectDB from "@/config/MongoDB";
import mongoose from "mongoose";

// Schemas
import User from "@/models/UserSchema";

// Next
import { NextResponse } from "next/server";

// Bcrypt
import bcrypt from "bcryptjs";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const UserData = await User.findById(id)
      .populate("cart.product")
      .populate("checkout.product");

    if (!UserData) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ UserData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { "error in fetching user": error.message },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid user ID" },
        { status: 400 },
      );
    }

    const body = await request.json();
    const { oldPassword, newPassword, ...updateData } = body;

    const user = await User.findById(id).select("+password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    if (newPassword) {
      // 1. Check if user is credentials-based
      if (user.provider !== "credentials") {
        return NextResponse.json(
          {
            success: false,
            message: "OAuth users cannot change passwords here",
          },
          { status: 400 },
        );
      }

      // 2. Verify Old Password
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { success: false, message: "Current password is incorrect" },
          { status: 401 },
        );
      }

      // 3. Hash New Password
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    ).select("-password");

    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully",
        UserData: updatedUser,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}

// DELETE - Delete user
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid user ID" },
        { status: 400 },
      );
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully",
        data: { id: deletedUser._id },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}
