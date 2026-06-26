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

    const parsedPage = parseInt(searchParams.get("page"), 10);
    const page = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

    let limit = 0;
    if (limitParam && limitParam !== "all") {
      const parsedLimit = parseInt(limitParam, 10);
      limit = isNaN(parsedLimit) ? 0 : parsedLimit;
    }

    const skip = limit > 0 ? (page - 1) * limit : 0;
    const query = opt && opt !== "all" ? { status: opt } : {};

    let mongooseQuery = Product.find(query).sort({ createdAt: -1 }).skip(skip);

    if (limit > 0) {
      mongooseQuery = mongooseQuery.limit(limit);
    }

    const Products = await mongooseQuery;
    const total = await Product.countDocuments(query);

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
