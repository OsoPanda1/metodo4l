import { rewardUser } from "@/lib/ledger";

export async function POST(req: Request) {
  const { userId, amount } = (await req.json()) as { userId?: string; amount?: number };

  if (!userId || typeof amount !== "number") {
    return Response.json({ error: "userId and numeric amount are required" }, { status: 400 });
  }

  const result = await rewardUser(userId, amount);

  return Response.json({ success: true, ...result });
}
