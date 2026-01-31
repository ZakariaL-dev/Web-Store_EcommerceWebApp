// MoongoDB
import connectDB from "@/config/MongoDB";

// Schemas
import Order from "@/models/OrderSchema";

// Next
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await connectDB();
    const Orders = await Order.find({})
      .populate("user", "phoneNumber email")
      .populate({
        path: "products.product",
        select: "previewImages",
        model: "Product",
      })
      .sort({ createdAt: -1 });;

    return NextResponse.json({ Orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const newOrder = await Order.create(body);

    if (body.paymentMethod === "Card") {
      /* Example Chargily V2 Logic:
      const checkout = await chargilyClient.createCheckout({
        items: [
          {
            price: 'price_id_from_chargily', // Or dynamic amount logic
            quantity: 1,
          },
        ],
        amount: body.totalAmount, // Your totalAmount (DZD)
        currency: 'dzd',
        success_url: `${process.env.NEXT_PUBLIC_URL}/order-success?id=${newOrder._id}`,
        failure_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
        metadata: { orderId: newOrder._id.toString() },
      });

      // Update order with Chargily details
      newOrder.chargilyInvoiceId = checkout.id;
      await newOrder.save();

      return NextResponse.json({ newOrder, checkoutUrl: checkout.checkout_url }, { status: 201 });
      */

      // Temporary placeholder until you add your Chargily Keys:
      return NextResponse.json(
        {
          newOrder,
          message: "Order created. Chargily integration pending.",
        },
        { status: 201 }
      );
    }

    return NextResponse.json({ newOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
