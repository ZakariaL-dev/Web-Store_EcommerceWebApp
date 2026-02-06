// MoongoDB
import connectDB from "@/config/MongoDB";
import mongoose from "mongoose";

// Schemas
import Store from "@/models/StoreSchema";

// Next
import { NextResponse } from "next/server";


export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid Store ID" }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");
    const body = await request.json();

    // 1. Handle Events Section
    if (section === "events") {
      if (!body.updateData?._id) {
        return NextResponse.json({ success: false, message: "Event ID missing" }, { status: 400 });
      }

      const updatedStore = await Store.findByIdAndUpdate(
        id,
        {
          $set: {
            "events.$[elem].title": body.updateData.title,
            "events.$[elem].start": body.updateData.start,
            "events.$[elem].end": body.updateData.end,
            "events.$[elem].description": body.updateData.description,
          },
        },
        {
          arrayFilters: [{ "elem._id": new mongoose.Types.ObjectId(body.updateData._id) }],
          new: true,
        }
      );

      if (!updatedStore) return NextResponse.json({ success: false, message: "Store not found" }, { status: 404 });
      return NextResponse.json({ success: true, data: updatedStore });
    }

    // 2. Handle Contents Section
    if (body.contents && body.pageId) {
      const updatedStore = await Store.findByIdAndUpdate(
        id,
        {
          $set: {
            "contents.$[elem].description": body.contents.description,
            "contents.$[elem].updated": body.contents.updated,
          },
        },
        {
          // FIX: pageId must be cast to ObjectId for arrayFilters to work
          arrayFilters: [{ "elem._id": new mongoose.Types.ObjectId(body.pageId) }],
          new: true,
        }
      );

      if (!updatedStore) return NextResponse.json({ success: false, message: "Store or Page not found" }, { status: 404 });
      return NextResponse.json({ success: true, data: updatedStore });
    }

    // 3. Fallback General Update
    // FIX: Define query specifically for this fallback
    const generalUpdate = await Store.findByIdAndUpdate(
      id, 
      { $set: body }, 
      { new: true }
    );

    return NextResponse.json({ success: true, data: generalUpdate }, { status: 200 });

  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ success: false, message: "Server error", error: error.message }, { status: 500 });
  }
}

// DELETE - Delete Store
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");
    const eventId = searchParams.get("eventId");

    // Handle specific Event deletion within a Store
    if (section === "events" && eventId) {
      const updatedStore = await Store.findByIdAndUpdate(
        id,
        { $pull: { events: { _id: eventId } } },
        { new: true },
      );

      if (!updatedStore)
        return NextResponse.json(
          { success: false, message: "Store not found" },
          { status: 404 },
        );
      return NextResponse.json({ success: true, data: updatedStore });
    }

    // Default: Delete the entire Store document
    const deletedStore = await Store.findByIdAndDelete(id);
    if (!deletedStore)
      return NextResponse.json(
        { success: false, message: "Store not found" },
        { status: 404 },
      );

    return NextResponse.json({ success: true, message: "Store deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
