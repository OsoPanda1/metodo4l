import type { Metadata } from "next";
import React from "react";
import "./styles.css";

export const metadata: Metadata = {
  title: "UTAMV CAMPUS · Método 4L",
  description:
    "Sistema académico TAMV para formar operadores, diseñadores, arquitectos y centinelas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="site-header">
          <div>
            <h1>UTAMV CAMPUS · Método 4L</h1>
            <p>Aprende a construir sistemas, no solo a usar herramientas.</p>
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
