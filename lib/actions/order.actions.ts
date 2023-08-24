"use server";
import Order from "@lib/models/order.model";
import Payer from "@lib/models/payer.model";
import { connectToDB } from "@lib/database";
import { Rcon } from "rcon-client";

interface Params {
  name: string;
  days: number;
  price: number;
  payerId: string;
}
export async function createOrder({ name, days, price, payerId }: Params) {
  try {
    await connectToDB();
    const order = await Order.create({
      name: name,
      days: days,
      price: price,
      payer: payerId,
    });
    await Payer.findByIdAndUpdate(payerId, { $push: { orders: order._id } });
    return order;
  } catch (error: any) {
    throw new Error(`Failed to create order ${error?.message}`);
  }
}

export async function grantOrderItem(orderId: string) {
  try {
    await connectToDB();

    const order = await Order.findById(orderId).populate({
      path: "payer",
      model: Payer,
    });

    if (!order) throw new Error("Order which item was to grant does not exist");

    if (
      !process.env.RCON_HOST ||
      !process.env.RCON_PASSWORD ||
      !process.env.RCON_PORT
    ) {
      throw new Error("Invalid rcon data");
    }
    const rcon = await Rcon.connect({
      host: process.env.RCON_HOST,
      password: process.env.RCON_PASSWORD,
      port: parseInt(process.env.RCON_PORT),
    });

    const response = await rcon.send(
      `grant ${order.payer.nick} ${String(order.name).replaceAll(" ", "_")} ${
        order.days
      }`,
    );
    rcon.end();
    if (response === "Success") {
      await Order.findByIdAndUpdate(orderId, {
        $set: { granted: true },
      });
    }
  } catch (error: any) {
    throw new Error(`Failed to grant order's item ${error.message}`);
  }
}
