import { createOrder } from "@lib/actions/order.actions";
import { fetchPayer } from "@lib/actions/payer.actions";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.body) {
      // const hiddenDescription: string[] = req.body["tr_crc"].split(" ");
      // const payerId = fetchPayer("Kubyhayy");

      await createOrder({
        target: "Ranga VIP",
        days: "30",
        price: "15",
        expirationDate: "15.0",
        payer: `Kubyhayy`,
      });
    }
    res.status(200).send("TRUE");
  } catch (e) {
    res.status(500).send({ FALSE: e });
  }
}
