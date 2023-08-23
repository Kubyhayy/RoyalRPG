"use server"
import Order from "@lib/models/order.model";
import Payer from "@lib/models/payer.model";
import { connectToDB } from "@lib/mongoose";

interface OrderProps {
  target: string;
  days: string;
  price: string;
  expirationDate: string;
  payer: string;
}

export async function createOrder({
  target,
  days,
  price,
  expirationDate,
  payer,
}: OrderProps) {
  try {
    connectToDB();

    const createOrder = await Order.create({
      target,
      days,
      price,
      expirationDate,
      payer,
    });

    await Payer.findByIdAndUpdate(payer, {
      $push: { orders: createOrder._id },
    });
  } catch (e: any) {
    throw new Error(`Failed to create order : ${e.message}`);
  }
}
