import { connectToDB } from "@lib/database";
import Order from "@lib/models/order.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { name, days, price, payerId } = await req.json();

  try {
    await connectToDB();
    const order = new Order({
      name: name,
      days: days,
      price: price,
      payer: payerId,
    });

    await order.save();
    return new NextResponse(JSON.stringify(order), {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse("Failed to create a new order", { status: 500 });
  }
};
