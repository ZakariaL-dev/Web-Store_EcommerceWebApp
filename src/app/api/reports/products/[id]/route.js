// MoongoDB
import connectDB from "@/config/MongoDB";
import mongoose from "mongoose";

// Schemas
import ProductReport from "@/models/ProductReportSchema";

// Next
import { NextResponse } from "next/server";


export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ProductReport ID" },
        { status: 400 },
      );
    }

    const body = await request.json();
    const { _id, createdAt, updatedAt, ...updateData } = body;

    const updatedProductReport = await ProductReport.findByIdAndUpdate(
      id,
      { $set: { status: body.status } },
      { new: true, runValidators: true },
    );

    if (!updatedProductReport) {
      return NextResponse.json(
        { success: false, message: "Product Report not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product Report updated successfully",
        data: updatedProductReport,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}

// DELETE - Delete ProductReport
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ProductReport ID" },
        { status: 400 },
      );
    }

    const deletedProductReport = await ProductReport.findByIdAndDelete(id);

    if (!deletedProductReport) {
      return NextResponse.json(
        { success: false, message: "ProductReport not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "ProductReport deleted successfully",
        data: { id: deletedProductReport._id },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}
