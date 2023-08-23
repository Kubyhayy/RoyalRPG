import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.body) {
      const amount = req.body["tr_paid"];
      const paid = req.body["tr_paid"];
      if (amount === paid && req.body["tr_status"] === "TRUE") {
        //Send hidden description to rcon
        const hidDesc: string[] = req.body["tr_crc"].split("&");
        console.log(`/Service grant ${hidDesc[0]} ${hidDesc[1]} ${hidDesc[2]}`);
      }
    }
    res.status(200).send("TRUE");
  } catch (e) {
    res.status(500).send({ FALSE: e });
  }
}
