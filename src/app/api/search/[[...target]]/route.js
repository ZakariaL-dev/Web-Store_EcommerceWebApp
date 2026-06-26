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
  reviews: { model: Review, searchField: "title" },
  userReport: { model: UserReport, searchField: "reason" },
  productReport: { model: ProductReport, searchField: "reason" },
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
      const { model, searchField } = MODEL_MAP[target];

      const results = await model.find({
        [searchField]: { $regex: query, $options: "i" },
      });

      return NextResponse.json({ [target]: results }, { status: 200 });
    }

    if (!target) {
      const globalResults = {};

      for (const [key, config] of Object.entries(MODEL_MAP)) {
        globalResults[key] = await config.model
          .find({
            [config.searchField]: { $regex: query, $options: "i" },
          })
          .limit(10);
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
