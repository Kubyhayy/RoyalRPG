"use server";
import Order from "@lib/models/order.model";
import Payer from "@lib/models/payer.model";
import { connectToDB } from "@lib/database";

interface Params {
  name: string;
  days: number;
  price: number;
  payerId: string;
}
export async function createOrder({
  name,
  days,
  price,
  payerId,
}: Params): Promise<void> {
  try {
    await connectToDB();
    const order = await Order.create({
      name: name,
      days: days,
      price: price,
      payer: payerId,
    });
    await Payer.findByIdAndUpdate(payerId, { $push: { orders: order._id } });
  } catch (error: any) {
    throw new Error(`Failed to create order ${error?.message}`);
  }
}
