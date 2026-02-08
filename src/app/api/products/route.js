// MoongoDB
import connectDB from "@/config/MongoDB";

// Schemas
import Product from "@/models/ProductSchema";

// Next
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const opt = searchParams.get("opt");
    const limitParam = searchParams.get("limit");
    const page = parseInt(searchParams.get("page")) || 1;

    const limit =
      limitParam === "all" || !limitParam ? 0 : parseInt(limitParam);

    const skip = limit > 0 ? (page - 1) * limit : 0;
    const query = opt && opt !== "all" ? { status: opt } : {};

    const Products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments();

    return NextResponse.json({ Products, total }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const newProduct = await Product.create(body);

    return NextResponse.json({ newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
