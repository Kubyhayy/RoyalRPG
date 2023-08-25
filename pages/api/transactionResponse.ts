import { createOrder } from "@lib/actions/order.actions";
import { createOrderTest } from "@lib/database";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.body["tr_status"] === "TRUE") {
      const hiddenDescription = JSON.parse(req.body["tr_crc"]);
    }
    console.log("0:0");
    await createOrderTest();
    console.log("1:1");

    res.status(200).send("TRUE");
  } catch (e) {
    res.status(501).send({ FALSE: e });
  }
}
