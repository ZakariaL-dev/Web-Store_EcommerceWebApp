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

function parseParamValues(searchParams, key) {
  const values = searchParams.getAll(key);

  if (values.length === 0) return [];

  // If the frontend stringified an array like '["pending","delivered"]'
  if (values.length === 1 && values[0].startsWith("[")) {
    try {
      return JSON.parse(values[0]);
    } catch {
      // Fallback parser if JSON parsing fails
      return values[0]
        .replace(/[\[\]"\']/g, "")
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
    }
  }

  return values.filter(Boolean);
}

const MODEL_MAP = {
  products: {
    model: Product,
    filters: (searchParams) => {
      const query = {};

      const category = parseParamValues(searchParams, "category");
      if (category.length > 0) {
        query.category = { $in: category };
      }

      const status = parseParamValues(searchParams, "status");
      if (status.length > 0) {
        query.status = { $in: status };
      }

      const price = searchParams.get("price");

      if (price) {
        const cleanString = price.replace(/[\[\]]/g, "");
        const [minStr, maxStr] = cleanString.split(",");

        //  transform to numbers
        const min = parseFloat(minStr);
        const max = parseFloat(maxStr);

        if (!isNaN(min) && !isNaN(max)) {
          query.price = { $gte: min, $lte: max };
        }
      }

      const discount = searchParams.get("discount");

      if (discount) {
        const cleanString = discount.replace(/[\[\]]/g, "");
        const [minStr, maxStr] = cleanString.split(",");

        //  transform to numbers
        const min = parseFloat(minStr);
        const max = parseFloat(maxStr);

        if (!isNaN(min) && !isNaN(max)) {
          query.discount = { $gte: min, $lte: max };
        }
      }

      const selectedSizes = parseParamValues(searchParams, "v_size");
      const selectedColors = parseParamValues(searchParams, "v_color");
      const stockStatus = parseParamValues(searchParams, "v_quantity");

      if (selectedSizes.length > 0) {
        query["variants.size"] = { $in: selectedSizes };
      }

      if (selectedColors.length > 0) {
        query["variants.color"] = { $in: selectedColors };
      }

      if (stockStatus.length === 1) {
        const statusChoice = stockStatus[0];

        if (statusChoice === "out of stock") {
          query["variants.quantity"] = 0;
        } else if (statusChoice === "available") {
          query["variants.quantity"] = { $gt: 0 };
        }
      }

      return query;
    },
    sort: (searchParams) => {
      const sortValue = searchParams.get("sort");

      const sortOrder = parseInt(sortValue, 10);

      if (!sortValue) {
        return { createdAt: -1 };
      }
      return { createdAt: sortOrder };
    },
  },
  customers: {
    model: User,
    filters: (searchParams) => {
      const query = {};

      const role = parseParamValues(searchParams, "role");
      const gender = parseParamValues(searchParams, "gender");
      const blockStatus = parseParamValues(searchParams, "block_Status");

      if (role.length > 0) {
        query.role = { $in: role };
      }
      if (gender.length > 0) {
        query.gender = { $in: gender };
      }

      if (blockStatus.length === 1) {
        const blockChoice = blockStatus[0];

        if (blockChoice === "blocked") {
          query.blocked = true;
        } else if (blockChoice === "unblocked") {
          query.blocked = { $ne: true };
        }
      }

      return query;
    },
    sort: (searchParams) => {
      const sortValue = searchParams.get("sort");

      const sortOrder = parseInt(sortValue, 10);

      if (!sortValue) {
        return { createdAt: -1 };
      }
      return { createdAt: sortOrder };
    },
  },
  orders: {
    model: Order,
    filters: (searchParams) => {
      const query = {};

      const status = parseParamValues(searchParams, "status");
      const paymentStatus = parseParamValues(searchParams, "payment_Status");
      const paymentMethod = parseParamValues(searchParams, "payment_Method");
      const deliveryPlace = parseParamValues(searchParams, "delivery_Place");
      const totalAmount = searchParams.get("amount");
      const Pqtn = searchParams.get("products_Quantity");

      if (status.length > 0) {
        query.status = { $in: status };
      }

      if (paymentStatus.length === 1) {
        const statusChoice = paymentStatus[0];

        if (statusChoice === "paid" || statusChoice === "unpaid") {
          query.paymentStatus = statusChoice === "paid";
        }
      }

      if (paymentMethod.length > 0) {
        query.paymentMethod = { $in: paymentMethod };
      }

      if (deliveryPlace.length > 0) {
        query.deliveryPlace = { $in: deliveryPlace };
      }

      if (totalAmount) {
        const cleanString = totalAmount.replace(/[\[\]]/g, "");
        const [minStr, maxStr] = cleanString.split(",");

        //  transform to numbers
        const min = parseFloat(minStr);
        const max = parseFloat(maxStr);

        if (!isNaN(min) && !isNaN(max)) {
          query.totalAmount = { $gte: min, $lte: max };
        }
      }

      if (Pqtn) {
        const cleanPqtnString = Pqtn.replace(/[\[\]]/g, "");
        const [minQtyStr, maxQtyStr] = cleanPqtnString.split(",");

        const minQty = parseInt(minQtyStr, 10);
        const maxQty = parseInt(maxQtyStr, 10);

        if (!isNaN(minQty) && !isNaN(maxQty)) {
          query["products.quantity"] = { $gte: minQty, $lte: maxQty };
        }
      }

      return query;
    },
    populate: [
      { path: "user", select: "userName phoneNumber email" },
      { path: "products.product", select: "previewImages", model: "Product" },
    ],
    sort: (searchParams) => {
      const sortValue = searchParams.get("sort");

      const sortOrder = parseInt(sortValue, 10);

      if (!sortValue) {
        return { createdAt: -1 };
      }
      return { createdAt: sortOrder };
    },
  },
  reviews: {
    model: Review,
    filters: (searchParams) => {
      const query = {};

      const rating = searchParams.get("rating_Range");

      if (rating) {
        const cleanString = rating.replace(/[\[\]]/g, "");
        const [minStr, maxStr] = cleanString.split(",");

        //  transform to numbers
        const min = parseFloat(minStr);
        const max = parseFloat(maxStr);

        if (!isNaN(min) && !isNaN(max)) {
          query.rating = { $gte: min, $lte: max };
        }
      }

      return query;
    },
    populate: [
      { path: "user", select: "email profileImage" },
      { path: "product", select: "title slug" },
    ],
    sort: (searchParams) => {
      const sortValue = searchParams.get("sort");

      const sortOrder = parseInt(sortValue, 10);

      if (!sortValue) {
        return { createdAt: -1 };
      }
      return { createdAt: sortOrder };
    },
  },
  userReports: {
    model: UserReport,
    filters: (searchParams) => {
      const query = {};

      const reason = parseParamValues(searchParams, "reason");
      if (reason.length > 0) {
        query.reason = { $in: reason };
      }

      const status = parseParamValues(searchParams, "status");
      if (status.length > 0) {
        query.status = { $in: status };
      }

      return query;
    },
    populate: [
      { path: "reportedBy", select: "userName email profileImage" },
      { path: "reportedUser", select: "userName email profileImage" },
    ],
    sort: (searchParams) => {
      const sortValue = searchParams.get("sort");

      const sortOrder = parseInt(sortValue, 10);

      if (!sortValue) {
        return { createdAt: -1 };
      }
      return { createdAt: sortOrder };
    },
  },
  productReports: {
    model: ProductReport,
    filters: (searchParams) => {
      const query = {};

      const reason = parseParamValues(searchParams, "reason");
      if (reason.length > 0) {
        query.reason = { $in: reason };
      }

      const status = parseParamValues(searchParams, "status");
      if (status.length > 0) {
        query.status = { $in: status };
      }

      return query;
    },
    populate: [
      { path: "reportedBy", select: "userName email profileImage" },
      { path: "product", select: "previewImages title slug" },
    ],
    sort: (searchParams) => {
      const sortValue = searchParams.get("sort");

      if (!sortValue) {
        return { createdAt: -1 };
      }
      return { createdAt: sortValue };
    },
  },
};

export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);

  try {
    const resolvedParams = await params;
    const targetArray = resolvedParams?.target;
    const target = targetArray?.[0];

    await connectDB();

    if (target && MODEL_MAP[target]) {
      const { model, filters: filterFn, sort, populate } = MODEL_MAP[target];

      const queryFilters =
        typeof filterFn === "function" ? filterFn(searchParams) : {};

      const querySort = typeof sort === "function" ? sort(searchParams) : sort;

      let results;
      if (populate) {
        results = await model
          .find(queryFilters)
          .populate(populate)
          .sort(querySort);
      } else {
        results = await model.find(queryFilters).sort(querySort);
      }

      return NextResponse.json({ [target]: results }, { status: 200 });
    }

    return NextResponse.json(
      { error: `Invalid search category: '${target}'` },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
