import { db } from "@/lib/db";

export default async function CommercePage() {
  const commerces = await db.commerce.findMany({ orderBy: { name: "asc" }, take: 50 });

  return (
    <div className="stack">
      <section>
        <a href="/" className="accent small">← Volver al campus</a>
        <h1>Comercio conectable</h1>
        <p className="muted">Directorio base de comercios para activar economía territorial y pagos.</p>
      </section>
      <section className="grid grid-2">
        {commerces.map((commerce) => (
          <article key={commerce.id} className="card">
            <h3>{commerce.name}</h3>
            <p className="small">Categoría: {commerce.category}</p>
          </article>
        ))}
        {commerces.length === 0 && <div className="card"><p className="muted">Sin comercios registrados todavía.</p></div>}
      </section>
    </div>
  );
}
