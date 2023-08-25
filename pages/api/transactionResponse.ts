import { createOrder, fetchPayer } from "@lib/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.body["tr_status"] === "TRUE") {
      const hiddenDescription = JSON.parse(req.body["tr_crc"]);

      const payer = await fetchPayer(
        hiddenDescription.nick,
        hiddenDescription.email,
      );

      console.log(payer._id);

      const order = await createOrder({
        name: hiddenDescription.item_name,
        days: hiddenDescription.days,
        price: hiddenDescription.price,
        payerId: payer._id,
      });

      console.log(order._id);
      // await grantOrderItem(order._id);
    }

    res.status(200).send("TRUE");
  } catch (e) {
    res.status(500).send("Unable to handle response");
  }
}
