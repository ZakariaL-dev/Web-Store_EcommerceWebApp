// MoongoDB
import connectDB from "@/config/MongoDB";
import mongoose from "mongoose";

// Schemas
import Order from "@/models/OrderSchema";

// Next
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const o = await Order.findById(id)
      .populate("user", "phoneNumber email")
      .populate({
        path: "products.product",
        select: "previewImages title",
        model: "Product",
      });

    if (!o) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ o }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, "error in getting the Order route": error.message },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid Order ID" },
        { status: 400 },
      );
    }

    const body = await request.json();
    const { _id, createdAt, updatedAt, ...updateData } = body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    )
      .populate("user", "phoneNumber")
      .populate({
        path: "products.product",
        select: "previewImages",
        model: "Product",
      });

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Order updated successfully",
        data: updatedOrder,
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
