import { prisma } from "@utamv/core-engine/db";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default async function RutaPage({ params }: Props) {
  const ruta = await prisma.ruta.findUnique({
    where: { slug: params.slug },
    include: {
      modulos: {
        include: {
          evidencias: true,
          rubricas: true,
        },
        orderBy: { indice: "asc" },
      },
    },
  });

  if (!ruta) return notFound();

  return (
    <div className="stack">
      <div>
        <a href="/" className="accent small">← Volver al campus</a>
        <h1>{ruta.nombre}</h1>
        <p className="muted">{ruta.descripcion}</p>
        <p className="small">Resultado esperado: {ruta.resultado}</p>
      </div>

      <section>
        <h2 className="section-title">Módulos del Método 4L</h2>
        <div className="module-list">
          {ruta.modulos.map((m) => (
            <article key={m.id} className="card module-card">
              <p className="eyebrow">Módulo {m.indice} · Capa: {m.capa4L}</p>
              <h3>{m.nombre}</h3>
              <p className="muted">{m.resumen}</p>
              <p className="small">Resultados: {m.resultados}</p>
              <p className="eyebrow">Horas estimadas: {m.horasEstimadas}</p>

              <div className="grid grid-2">
                <div>
                  <h4>Evidencias requeridas</h4>
                  <ul className="clean">
                    {m.evidencias.map((e) => (
                      <li key={e.id}>
                        [{e.tipo}] {e.descripcion}
                        {e.plantilla ? <span className="accent"> · plantilla: {e.plantilla}</span> : null}
                      </li>
                    ))}
                    {m.evidencias.length === 0 && <li>Configura evidencias en el sistema/plantillas.</li>}
                  </ul>
                </div>

                <div>
                  <h4>Rúbrica</h4>
                  {m.rubricas[0] ? (
                    <div className="small">
                      <p><strong>Operador:</strong> {m.rubricas[0].nivelOperador}</p>
                      <p><strong>Diseñador:</strong> {m.rubricas[0].nivelDisenador}</p>
                      <p><strong>Arquitecto:</strong> {m.rubricas[0].nivelArquitecto}</p>
                      <p><strong>Centinela:</strong> {m.rubricas[0].nivelCentinela}</p>
                    </div>
                  ) : (
                    <p className="small">Sin rúbrica aún. Define criterios en la DB.</p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
