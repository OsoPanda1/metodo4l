import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET ?? "sk_test_missing", {
  apiVersion: "2024-06-20",
});
