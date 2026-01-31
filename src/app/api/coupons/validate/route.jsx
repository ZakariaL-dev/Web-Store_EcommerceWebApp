// MoongoDB
import connectDB from "@/config/MongoDB";

// Schemas
import Coupon from "@/models/CouponSchema";

// Next
import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    await connectDB();
    const { code } = await request.json();
    const now = new Date();

    const coupon = await Coupon.findOne({ code: code });

    if (!coupon) {
      return NextResponse.json(
        { success: false, message: "Invalid Code" },
        { status: 404 },
      );
    }

    // Check both the boolean and the actual date for safety
    if (coupon.expired || new Date(coupon.expireDate) < now) {
      // Optional: Update the DB if we just found out it's expired
      if (!coupon.expired) {
        coupon.expired = true;
        await coupon.save();
      }
      return NextResponse.json(
        { success: false, message: "Coupon has expired" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      discount: coupon.discount,
      message: "Coupon applied!",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
