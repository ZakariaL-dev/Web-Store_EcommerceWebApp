// MoongoDB
import connectDB from "@/config/MongoDB";
import mongoose from "mongoose";

// Schemas
import UserReport from "@/models/UserReportSchema";

// Next
import { NextResponse } from "next/server";


export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid UserReport ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { _id, createdAt, updatedAt, ...updateData } = body;

    const updatedUserReport = await UserReport.findByIdAndUpdate(
      id,
      { $set: { status: body.status } },
      { new: true, runValidators: true },
    );

    if (!updatedUserReport) {
      return NextResponse.json(
        { success: false, message: "UserReport not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "UserReport updated successfully",
        data: updatedUserReport,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete UserReport
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid UserReport ID" },
        { status: 400 }
      );
    }

    const deletedUserReport = await UserReport.findByIdAndDelete(id);

    if (!deletedUserReport) {
      return NextResponse.json(
        { success: false, message: "UserReport not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "UserReport deleted successfully",
        data: { id: deletedUserReport._id },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
