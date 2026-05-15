import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { name, category } = (await req.json()) as { name?: string; category?: string };

  if (!name || !category) {
    return Response.json({ error: "name and category are required" }, { status: 400 });
  }

  const commerce = await db.commerce.create({
    data: { name, category },
  });

  return Response.json(commerce);
}
