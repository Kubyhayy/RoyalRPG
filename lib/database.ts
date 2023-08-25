import mongoose from "mongoose";
import Order from "./models/order.model";
import Payer from "./models/payer.model";
import { Rcon } from "rcon-client";

let isConnected = false;

export async function connectToDB() {
  if (!isConnected) {
    if (!process.env.MONGODB_URL) {
      console.log("Missing MongoDB URL");
      return;
    }
    try {
      await mongoose.connect(process.env.MONGODB_URL);
      isConnected = true;
      console.log("MongoDB connected");
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("MongoDB connection is already established");
  }
}

interface OrderParams {
  name: string;
  days: number;
  price: number;
  payerId: string;
}

export async function createOrder({ name, days, price, payerId }: OrderParams) {
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
    console.log(`Failed to create order ${error?.message}`);
    return;
  }
}

export async function grantOrderItem(orderId: string) {
  try {
    await connectToDB();

    const order = await Order.findById(orderId).populate({
      path: "payer",
      model: Payer,
    });

    if (!order) {
      console.log("Order which item was to grant does not exist");
      return;
    }

    if (
      !process.env.RCON_HOST ||
      !process.env.RCON_PASSWORD ||
      !process.env.RCON_PORT
    ) {
      console.log("Invalid RCon data");
      return;
    }
    const rcon = new Rcon({
      host: process.env.RCON_HOST,
      password: process.env.RCON_PASSWORD,
      port: parseInt(process.env.RCON_PORT),
      timeout: 3500,
    });
    await rcon.connect();
    const response = await rcon.send(
      `grant ${order.nick} ${order.name} ${order.days}`,
    );
    // if (response === "Successfuly granted") {
    console.log("0:0");
    console.log(order.payer._id);
    Payer.findByIdAndUpdate(order.payer._id, {
      $set: { granted: true },
    });
    // }
  } catch (error: any) {
    console.log(`Failed to grant order's item ${error.message}`);
    return;
  }
}
export async function fetchPayer(nick: string, email: string) {
  try {
    await connectToDB();
    let payer = await Payer.findOne({ nick: nick }, { email: email });
    if (!payer) {
      payer = Payer.create({
        nick: nick,
        email: email,
      });
    }
    return payer;
  } catch (error: any) {
    console.log(`Unable to fetch payer ${error.message}`);
    return;
  }
}

export async function getAllOrdersByNick({ nick }: { nick: string }) {
  try {
    await connectToDB();
    // It has to be like that to avoid warnings - not my fault...
    const orders = await JSON.parse(
      JSON.stringify(
        await Payer.findOne({ nick: nick }).populate({
          path: "orders",
          model: Order,
        }),
      ),
    );

    return orders;
  } catch (error) {}
}
