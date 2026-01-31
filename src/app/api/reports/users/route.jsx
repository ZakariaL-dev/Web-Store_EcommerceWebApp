// MoongoDB
import connectDB from "@/config/MongoDB";

// Schemas
import UserReport from "@/models/UserReportSchema";

// Next
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await connectDB();
    const UserReports = await UserReport.find({})
      .populate("reportedBy", "userName email profileImage")
      .populate("reportedUser", "userName email profileImage")
      .sort({ createdAt: -1 });

    return NextResponse.json({ UserReports }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const newUserReport = await UserReport.create(body);

    return NextResponse.json({ newUserReport }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
