import mongoose, { mongo } from "mongoose";
import Order from "./models/order.model";
import Payer from "./models/payer.model";

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

export async function createOrderTest() {
  try {
    await connectToDB();

    let payer = await Payer.findOne(
      { nick: "KubyhayyTesttt" },
      { email: "emailtestt@gmaill.com" },
    );

    if (!payer) {
      payer = await Payer.create({
        nick: "KubyhayyTestTtytrhj",
        email: "emailtest@gmailhrh.com",
      });
    }

    const order = new Order({
      name: "Ranga Vip",
      days: 99,
      price: 99,
      payer: payer._id,
    });

    await Payer.findByIdAndUpdate(payer._id, { $push: { orders: order._id } });

    await order.save();
  } catch (error) {
    console.error("Error creating order:", error);
  }
}
