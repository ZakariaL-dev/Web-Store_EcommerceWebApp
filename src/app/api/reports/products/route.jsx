// MoongoDB
import connectDB from "@/config/MongoDB";

// Schemas
import ProductReport from "@/models/ProductReportSchema";

// Next
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await connectDB();
    const ProductReports = await ProductReport.find({})
      .populate("reportedBy", "userName email profileImage")
      .populate("product", "previewImages title slug")
      .sort({ createdAt: -1 });;

    return NextResponse.json({ ProductReports }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const newProductReport = await ProductReport.create(body);

    return NextResponse.json({ newProductReport }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
