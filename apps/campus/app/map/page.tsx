import { db } from "@/lib/db";

export default async function MapPage() {
  const places = await db.place.findMany({ orderBy: { name: "asc" }, take: 50 });

  return (
    <div className="stack">
      <section>
        <a href="/" className="accent small">← Volver al campus</a>
        <h1>Mapa territorial</h1>
        <p className="muted">Nodos, lugares y activos territoriales disponibles para contexto operativo e IA.</p>
      </section>
      <section className="grid grid-2">
        {places.map((place) => (
          <article key={place.id} className="card">
            <h3>{place.name}</h3>
            <p className="small">{place.type} · {place.lat}, {place.lng}</p>
          </article>
        ))}
        {places.length === 0 && <div className="card"><p className="muted">Sin lugares registrados todavía.</p></div>}
      </section>
    </div>
  );
}
