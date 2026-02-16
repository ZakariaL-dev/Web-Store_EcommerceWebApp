// MoongoDB
import connectDB from "@/config/MongoDB";

// Schemas
import Product from "@/models/ProductSchema";

// Next
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await connectDB();
    const search = await Product.find({})
      .sort({ createdAt: -1 });

    return NextResponse.json({ search }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}