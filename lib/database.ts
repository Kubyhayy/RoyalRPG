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

      console.log("MongoDB connected3333");
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("MongoDB connection already established111");
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
    throw new Error(`Failed to create order ${error?.message}`);
  }
}

export async function grantOrderItem(orderId: string) {
  try {
    await connectToDB();
    console.log("0:0");
    const order = await Order.findById(orderId).populate({
      path: "payer",
      model: Payer,
    });
    console.log("1:1");

    if (!order) throw new Error("Order which item was to grant does not exist");

    if (
      !process.env.RCON_HOST ||
      !process.env.RCON_PASSWORD ||
      !process.env.RCON_PORT
    ) {
      throw new Error("Invalid rcon data");
    }
    console.log("2:2");
    try {
      const rcon = await Rcon.connect({
        host: process.env.RCON_HOST,
        password: process.env.RCON_PASSWORD,
        port: parseInt(process.env.RCON_PORT),
        timeout: 3000,
      });
      console.log("3:3");

      const response = await rcon.send(
        `grant ${order.payer.nick} ${String(order.name).replaceAll(" ", "_")} ${
          order.days
        }`,
      );
      console.log("4:4");
      console.log("5:5");
      if (response === "Success") {
        await Order.findByIdAndUpdate(orderId, {
          $set: { granted: true },
        });
      }
      rcon.end();
      console.log("6:6");
    } catch (error: any) {
      console.log("Unable to handle connect with Rcon and order's grant item!");
    }
  } catch (error: any) {
    throw new Error(`Failed to grant order's item ${error.message}`);
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
    throw new Error(`Unable to fetch payer ${error.message}`);
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
