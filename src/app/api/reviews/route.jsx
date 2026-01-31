// MoongoDB
import connectDB from "@/config/MongoDB";

// Schemas
import Review from "@/models/ReviewShema";

// Next
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await connectDB();
    const Reviews = await Review.find({})
      .populate("user", "email profileImage")
      .populate("product", "title slug")
      .sort({ createdAt: -1 });;

    return NextResponse.json({ Reviews }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const newReview = await Review.create(body);

    return NextResponse.json({ newReview }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
