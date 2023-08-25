import mongoose, { mongo } from "mongoose";
import Order from "./models/order.model";
import Payer from "./models/payer.model";
import { Rcon } from "rcon-client";

let isConnected = false;

export const connectToDB = async () => {
  if (!isConnected) {
    if (!process.env.MONGODB_URL) {
      console.log("Missing MongoDB URL");
      return;
    }
    try {
      await mongoose.connect(process.env.MONGODB_URL);
      isConnected = true;

      console.log("MongoDB connected3");
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("MongoDB connection already established444");
  }
};

interface OrderParams {
  name: string;
  days: number;
  price: number;
  payerId: string;
}

export async function createOrder({ name, days, price, payerId }: OrderParams) {
  try {
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

export async function fetchPayer(nick: string, email: string) {
  try {
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
