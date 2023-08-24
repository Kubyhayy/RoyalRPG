import { createOrder } from "@lib/actions/order.actions";
import { fetchPayer } from "@lib/actions/payer.actions";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const hiddenDescription = JSON.parse(req.body["tr_crc"]);

    const payer = await fetchPayer(
      hiddenDescription.nick,
      hiddenDescription.email,
    );

    await createOrder({
      name: hiddenDescription.item_name,
      days: hiddenDescription.days,
      price: hiddenDescription.price,
      payerId: payer._id,
    });

    res.status(200).send("TRUE");
  } catch (e) {
    res.status(501).send({ FALSE: e });
  }
}
