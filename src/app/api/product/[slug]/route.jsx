// MoongoDB
import connectDB from "@/config/MongoDB";

// Schemas
import Product from "@/models/ProductSchema";

// Next
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
  try {
    await connectDB();
    const { slug } = await params;
    const p = await Product.findOne({ slug });

    if (!p) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ p }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, "error in getting the product route": error.message },
      { status: 500 }
    );
  }
}
