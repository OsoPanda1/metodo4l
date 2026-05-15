import { prisma } from "@utamv/core-engine/db";

const niveles = [
  {
    nivel: "Nivel I — Operador",
    descripcion: "Comprende el sistema y lo usa con criterio.",
  },
  {
    nivel: "Nivel II — Diseñador",
    descripcion: "Construye y modifica piezas dentro del sistema.",
  },
  {
    nivel: "Nivel III — Arquitecto",
    descripcion: "Diseña estructuras completas, flujos y reglas.",
  },
  {
    nivel: "Nivel IV — Centinela",
    descripcion: "Audita, gobierna y mejora sistemas con visión ética y estratégica.",
  },
];

export default async function Page() {
  const rutas = await prisma.ruta.findMany({
    include: {
      _count: { select: { modulos: true } },
    },
    orderBy: { nombre: "asc" },
  });

  return (
    <div className="stack">
      <section>
        <h2 className="section-title">Propósito</h2>
        <p className="muted">
          Este campus organiza el curso completo de UTAMV CAMPUS / Método 4L como un sistema
          formativo ejecutable: módulos, rutas, prácticas, entregables, evaluación y proyectos
          integradores.
        </p>
      </section>

      <section>
        <h2 className="section-title">Rutas formativas</h2>
        <div className="grid grid-2">
          {rutas.map((ruta) => (
            <a key={ruta.id} href={`/ruta/${ruta.slug}`} className="card card-link">
              <h3>{ruta.nombre}</h3>
              <p className="muted">{ruta.descripcion}</p>
              <p className="small">Resultado esperado: {ruta.resultado}</p>
              <p className="eyebrow">Módulos registrados: {ruta._count.modulos}</p>
            </a>
          ))}
          {rutas.length === 0 && (
            <div className="card">
              <h3>Campus sin rutas cargadas</h3>
              <p className="muted">Ejecuta npm run db:seed para poblar la malla académica base.</p>
            </div>
          )}
        </div>
      </section>


      <section>
        <h2 className="section-title">Sistema Operativo Territorial</h2>
        <div className="grid grid-4">
          <a href="/dashboard" className="card card-link"><h3>Dashboard</h3><p className="small">Métricas base de identidad, economía y actividad.</p></a>
          <a href="/map" className="card card-link"><h3>Mapa</h3><p className="small">Lugares y nodos territoriales para contexto de IA.</p></a>
          <a href="/commerce" className="card card-link"><h3>Comercio</h3><p className="small">Directorio conectable para economía y pagos.</p></a>
        </div>
      </section>

      <section>
        <h2 className="section-title">Niveles de certificación</h2>
        <div className="grid grid-4">
          {niveles.map((n) => (
            <div key={n.nivel} className="card">
              <h3>{n.nivel}</h3>
              <p className="small">{n.descripcion}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
