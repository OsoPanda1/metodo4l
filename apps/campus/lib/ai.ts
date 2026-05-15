import { db } from "./db";

export async function askAI(message: string) {
  const places = await db.place.findMany({ take: 5, orderBy: { name: "asc" } });
  const context = places.map((place) => place.name).join(", ") || "sin lugares registrados";

  return `Consulta: ${message}\nLugares: ${context}`;
}
