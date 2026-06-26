// MoongoDB
import connectDB from "@/config/MongoDB";

// Schemas
import Product from "@/models/ProductSchema";
import User from "@/models/UserSchema";
import Review from "@/models/ReviewShema";
import UserReport from "@/models/UserReportSchema";
import ProductReport from "@/models/ProductReportSchema";

// Next
import { NextResponse } from "next/server";

const MODEL_MAP = {
  products: { model: Product, searchField: "title" },
  users: { model: User, searchField: "userName" },
  // orders: { model: Order, searchField: "orderId" },
  reviews: {
    model: Review,
    searchField: "title",
    populate: [
      { path: "user", select: "email profileImage" },
      { path: "product", select: "title slug" },
    ],
    sort: { createdAt: -1 },
  },
  userReport: {
    model: UserReport,
    searchField: "comment",
    populate: [
      { path: "reportedBy", select: "userName email profileImage" },
      { path: "reportedUser", select: "userName email profileImage" },
    ],
    sort: { createdAt: -1 },
  },
  productReport: {
    model: ProductReport,
    searchField: "comment",
    populate: [
      { path: "reportedBy", select: "userName email profileImage" },
      { path: "product", select: "previewImages title slug" },
    ],
    sort: { createdAt: -1 },
  },
};

export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("s");

  if (!query) {
    return NextResponse.json(
      { error: "No search query provided", results: [] },
      { status: 400 },
    );
  }

  try {
    const resolvedParams = await params;
    const targetArray = resolvedParams?.target;
    const target = targetArray?.[0];

    await connectDB();

    if (target && MODEL_MAP[target]) {
      const { model, searchField, populate, sort } = MODEL_MAP[target];

      let dbQuery = model.find({
        [searchField]: { $regex: query, $options: "i" },
      });

      if (populate) {
        dbQuery = dbQuery.populate(populate);
      }

      // Dynamically chain sort if it exists in configuration
      if (sort) {
        dbQuery = dbQuery.sort(sort);
      }

      const results = await dbQuery;

      return NextResponse.json({ [target]: results }, { status: 200 });
    }

    if (!target) {
      const globalResults = {};

      for (const [key, config] of Object.entries(MODEL_MAP)) {
        let dbQuery = config.model
          .find({
            [config.searchField]: { $regex: query, $options: "i" },
          })
          .limit(10);
        if (config.populate) {
          dbQuery = dbQuery.populate(config.populate);
        }
        if (config.sort) {
          dbQuery = dbQuery.sort(config.sort);
        }

        globalResults[key] = await dbQuery;
      }

      return NextResponse.json(globalResults, { status: 200 });
    }

    return NextResponse.json(
      { error: `Invalid search category: '${target}'` },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
