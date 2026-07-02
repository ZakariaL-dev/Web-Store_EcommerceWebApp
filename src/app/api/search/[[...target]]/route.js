// MongoDB Config
import connectDB from "@/config/MongoDB";

// Schemas
import Product from "@/models/ProductSchema";
import User from "@/models/UserSchema";
import Order from "@/models/OrderSchema";
import Review from "@/models/ReviewShema";
import UserReport from "@/models/UserReportSchema";
import ProductReport from "@/models/ProductReportSchema";

// Next
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const MODEL_MAP = {
  products: {
    model: Product,
    getQuery: (query) => ({ title: { $regex: query, $options: "i" } }),
  },
  users: {
    model: User,
    getQuery: (query) => ({ userName: { $regex: query, $options: "i" } }),
  },
  orders: {
    model: Order,
    isAggregate: true,
    getPipeline: (query) => {
      const criteria = [
        { "user_info.userName": { $regex: String(query), $options: "i" } },
        { "user_info.email": { $regex: String(query), $options: "i" } },
        { "user_info.phoneNumber": { $regex: String(query), $options: "i" } },
      ];

      return [
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user_info",
          },
        },
        { $unwind: { path: "$user_info", preserveNullAndEmptyArrays: true } },
        { $match: { $or: criteria } },
        {
          $addFields: {
            user: {
              $cond: {
                if: { $ifNull: ["$user_info", false] },
                then: {
                  _id: "$user_info._id",
                  userName: "$user_info.userName",
                  phoneNumber: "$user_info.phoneNumber",
                  email: "$user_info.email",
                },
                else: null,
              },
            },
          },
        },
        { $project: { user_info: 0 } },
        { $sort: { createdAt: -1 } },
      ];
    },
    
  },
  reviews: {
    model: Review,
    getQuery: (query) => ({ title: { $regex: query, $options: "i" } }),
    populate: [
      { path: "user", select: "email profileImage" },
      { path: "product", select: "title slug" },
    ],
    sort: { createdAt: -1 },
  },
  userReports: {
    model: UserReport,
    getQuery: (query) => ({ comment: { $regex: query, $options: "i" } }),
    populate: [
      { path: "reportedBy", select: "userName email profileImage" },
      { path: "reportedUser", select: "userName email profileImage" },
    ],
    sort: { createdAt: -1 },
  },
  productReports: {
    model: ProductReport,
    getQuery: (query) => ({ comment: { $regex: query, $options: "i" } }),
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
      const config = MODEL_MAP[target];
      let results;

      if (config.isAggregate) {
        results = await config.model.aggregate(config.getPipeline(query));

        if (target === "orders") {
          results = await Order.populate(results, {
            path: "products.product",
            select: "previewImages",
            model: "Product",
          });
        }
      } else {
        let dbQuery = config.model.find(config.getQuery(query));
        if (config.populate) dbQuery = dbQuery.populate(config.populate);
        if (config.sort) dbQuery = dbQuery.sort(config.sort);
        results = await dbQuery;
      }
      
      return NextResponse.json({ [target]: results }, { status: 200 });
    }

    // --- Fallback Global Search Loop Logic ---
    if (!target) {
      const globalResults = {};

      for (const [key, config] of Object.entries(MODEL_MAP)) {
        if (config.isAggregate) {
          let aggregateResults = await config.model
            .aggregate(config.getPipeline(query))
            .option({ limit: 10 });
          if (key === "orders") {
            aggregateResults = await Order.populate(aggregateResults, {
              path: "products.product",
              select: "previewImages",
              model: "Product",
            });
          }
          globalResults[key] = aggregateResults;
        } else {
          let dbQuery = config.model.find(config.getQuery(query)).limit(10);
          if (config.populate) dbQuery = dbQuery.populate(config.populate);
          if (config.sort) dbQuery = dbQuery.sort(config.sort);
          globalResults[key] = await dbQuery;
        }
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
