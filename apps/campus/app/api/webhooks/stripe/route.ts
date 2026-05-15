import { stripe } from "@/lib/payments";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (webhookSecret && signature) {
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    return Response.json({ received: true, type: event.type });
  }

  const event = JSON.parse(body) as { type?: string };

  if (event.type === "payment_intent.succeeded") {
    console.log("Pago exitoso");
  }

  return new Response("ok");
}
