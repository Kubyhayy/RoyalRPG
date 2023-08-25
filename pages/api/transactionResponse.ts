import { createOrder, grantOrderItem } from "@lib/actions/order.actions";
import { fetchPayer } from "@lib/actions/payer.actions";
import { connectToDB } from "@lib/database";
import Order from "@lib/models/order.model";
import Payer from "@lib/models/payer.model";

import { NextApiRequest, NextApiResponse } from "next";
import { Rcon } from "rcon-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.body["tr_status"] === "TRUE") {
      const hiddenDescription = JSON.parse(req.body["tr_crc"]);
      console.log("0");
      await connectToDB();

      let payer = await Payer.findOne(
        { nick: hiddenDescription.nick },
        { email: hiddenDescription.email },
      );
      if (!payer) {
        payer = Payer.create({
          nick: hiddenDescription.nick,
          email: hiddenDescription.email,
        });
      }

      const order = await Order.create({
        name: hiddenDescription.name,
        days: hiddenDescription.days,
        price: hiddenDescription.price,
        payer: payer._id,
      });

      await Payer.findByIdAndUpdate(payer._id, {
        $push: { orders: order._id },
      });

      await grantOrderItem(order._id);

      const order2 = await Order.findById(order._id).populate({
        path: "payer",
        model: Payer,
      });
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
        await Order.findByIdAndUpdate(order2._id, {
          $set: { granted: true },
        });
      }
    }

    res.status(200).send("TRUE");
  } catch (e) {
    res.status(501).send({ FALSE: e });
  }
}
