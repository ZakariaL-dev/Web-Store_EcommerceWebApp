// MoongoDB
import connectDB from "@/config/MongoDB";
import mongoose from "mongoose";

// Schemas
import Coupon from "@/models/CouponSchema";

// Next
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const CouponData = await Coupon.findById(id)

    if (!CouponData) {
      return NextResponse.json({ message: "Coupon not found" }, { status: 404 });
    }
    return NextResponse.json({ CouponData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { "error in fetching Coupon": error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid Coupon ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { _id, createdAt, updatedAt, ...updateData } = body;

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )

    if (!updatedCoupon) {
      return NextResponse.json(
        { success: false, message: "Coupon not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Coupon updated successfully",
        data: updatedCoupon,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete Coupon
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid Coupon ID" },
        { status: 400 }
      );
    }

    const deletedCoupon = await Coupon.findByIdAndDelete(id);

    if (!deletedCoupon) {
      return NextResponse.json(
        { success: false, message: "Coupon not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Coupon deleted successfully",
        data: { id: deletedCoupon._id },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
