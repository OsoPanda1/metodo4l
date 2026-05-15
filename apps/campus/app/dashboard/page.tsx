import { db } from "@/lib/db";

export default async function DashboardPage() {
  const [users, commerces, transactions] = await Promise.all([
    db.user.count(),
    db.commerce.count(),
    db.transaction.count(),
  ]);

  return (
    <div className="stack">
      <section>
        <a href="/" className="accent small">← Volver al campus</a>
        <h1>Dashboard SOT</h1>
        <p className="muted">Lectura operativa del Sistema Operativo Territorial conectado al campus.</p>
      </section>
      <section className="grid grid-4">
        <div className="card"><h3>Ciudadanos</h3><p className="section-title">{users}</p></div>
        <div className="card"><h3>Comercios</h3><p className="section-title">{commerces}</p></div>
        <div className="card"><h3>Transacciones</h3><p className="section-title">{transactions}</p></div>
      </section>
    </div>
  );
}
