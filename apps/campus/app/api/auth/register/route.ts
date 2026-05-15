import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { email } = (await req.json()) as { email?: string };

  if (!email) {
    return Response.json({ error: "email is required" }, { status: 400 });
  }

  const user = await db.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      role: "citizen",
      wallet: { create: {} },
    },
    include: { wallet: true },
  });

  return Response.json(user);
}
