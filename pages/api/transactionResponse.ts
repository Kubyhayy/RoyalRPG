import { createOrder, grantOrderItem } from "@lib/actions/order.actions";
import { fetchPayer } from "@lib/actions/payer.actions";
import { connectToDB } from "@lib/database";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.body["tr_status"] === "TRUE") {
      const hiddenDescription = JSON.parse(req.body["tr_crc"]);
      console.log("0")
      await connectToDB();

      // const payer = await fetchPayer(
      //   hiddenDescription.nick,
      //   hiddenDescription.email,
      // );

      // const order = await createOrder({
      //   name: hiddenDescription.item_name,
      //   days: hiddenDescription.days,
      //   price: hiddenDescription.price,
      //   payerId: payer._id,
      // });
      // await grantOrderItem(order._id);
    }

    res.status(200).send("TRUE");
  } catch (e) {
    res.status(501).send({ FALSE: e });
  }
}
