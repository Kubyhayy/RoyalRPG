import Order from "@lib/models/order.model";
import Payer from "@lib/models/payer.model";

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
