// MoongoDB
import connectDB from "@/config/MongoDB";

// Schemas
import Store from "@/models/StoreSchema";

// Next
import { NextResponse } from "next/server";


export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section"); // e.g., ?section=filters

    const projection = section ? { [section]: 1 } : {};
    const data = await Store.findOne({}, projection);

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");

    if (section === "events") {
      const updatedStore = await Store.findOneAndUpdate(
        {},
        { $push: { events: body } },
        { new: true, upsert: true },
      );
      return NextResponse.json(
        { success: true, newStore: updatedStore },
        { status: 201 },
      );
    } else if (section === "contents") {
      const updatedStore = await Store.findOneAndUpdate(
        {},
        { $push: { contents: body } },
        { new: true, upsert: true },
      );
      return NextResponse.json(
        { success: true, newStore: updatedStore },
        { status: 201 },
      );
    }

    const newStore = await Store.create(body);
    return NextResponse.json({ success: true, newStore }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
