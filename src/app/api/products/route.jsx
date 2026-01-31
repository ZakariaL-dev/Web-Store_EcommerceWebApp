// MoongoDB
import connectDB from "@/config/MongoDB";

// Schemas
import Product from "@/models/ProductSchema";

// Next
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await connectDB();
    const Products = await Product.find({}).sort({ createdAt: -1 });;

    return NextResponse.json({ Products }, { status: 200 });
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
