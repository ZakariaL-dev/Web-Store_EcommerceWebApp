// MoongoDB
import connectDB from "@/config/MongoDB";

// Schemas
import Coupon from "@/models/CouponSchema";

// Next
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await connectDB();
    const now = new Date();

    await Coupon.updateMany(
      {
        expired: false,
        expireDate: { $lt: now.toISOString() },
      },
      { $set: { expired: true } },
    );

    const Coupons = await Coupon.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ Coupons }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { code } = body;
    const CouponExists = await Coupon.findOne({ code });
    if (CouponExists) {
      return NextResponse.json(
        { success: false, message: "Coupon already exists" },
        { status: 400 },
      );
    }

    const newCoupon = await Coupon.create(body);

    const response = NextResponse.json({
      success: true,
      message: "Coupon added successfully.",
      Coupon: newCoupon,
    });

    return response;
  } catch (error) {
    console.log("posting new Coupon: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// const verificationToken = crypto.randomInt(100000, 1000000).toString();;
// const verificationTokenExpiresAt = Date.now() + 4 * 60 * 60 * 1000;
// const newCoupon = await Coupon.create({
//   ...body,
//   verificationToken,
//   verificationTokenExpiresAt,
// });
