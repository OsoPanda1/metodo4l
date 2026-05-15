import { db } from "@/lib/db";
import { stripe } from "@/lib/payments";

export async function POST(req: Request) {
  const { amount } = (await req.json()) as { amount?: number };

  if (typeof amount !== "number" || amount <= 0) {
    return Response.json({ error: "positive numeric amount is required" }, { status: 400 });
  }

  const intent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: "mxn",
  });

  await db.paymentIntent.create({
    data: {
      amount,
      status: intent.status,
      provider: "stripe",
    },
  });

  return Response.json({ clientSecret: intent.client_secret });
}
