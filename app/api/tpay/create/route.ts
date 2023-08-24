import { NextRequest, NextResponse } from "next/server";

async function getAccessToken() {
  try {
    const authorizationResponse = await fetch(
      "https://api.tpay.com/oauth/auth",

      {
        method: "POST",
        body: `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    ).then((res) => res.json());
    return NextResponse.json(authorizationResponse.access_token);
  } catch (er) {
    console.log(er);
    return NextResponse.json("Error");
  }
}

export async function POST(req: NextRequest) {
  try {
    const authorization = await getAccessToken().then((res) => res.json());
    const payment = await req.json();

    const orderCreateResponse = await fetch(
      "https://api.tpay.com/transactions",
      {
        method: "POST",
        body: JSON.stringify({
          amount: payment.price,
          description: payment.description,
          payer: {
            email: payment.buyer.email,
            name: payment.buyer.nick,
          },
          hiddenDescription: JSON.stringify({
            nick: payment.buyer.nick,
            email: payment.buyer.email,
            item_name: payment.item.name,
            price: payment.price,
            days: `${payment.item.priceSteps[payment.itemVariantID].days}`,
          }),
        }),
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${authorization}`,
        },
      },
    );
    const jsonResponse = await orderCreateResponse.json();

    return NextResponse.json({
      Success: "TRUE",
      redirectLink: jsonResponse["transactionPaymentUrl"],
    });
  } catch (e) {
    return NextResponse.json({ Error: e });
  }
}
