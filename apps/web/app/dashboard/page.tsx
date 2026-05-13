"use client";

import { useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
  eoctScore: unknown;
  fourLData: unknown;
};

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/dashboard/user_1")
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => setProjects([]));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>UTAMV OS · EOCT Dashboard</h1>
      {projects.map((p) => (
        <div key={p.id} style={{ marginTop: 20 }}>
          <h3>{p.name}</h3>
          <pre>{JSON.stringify(p.eoctScore, null, 2)}</pre>
          <pre>{JSON.stringify(p.fourLData, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}
