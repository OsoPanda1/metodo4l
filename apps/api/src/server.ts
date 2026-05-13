import express from "express";
import { PrismaClient } from "@prisma/client";
import { evaluateProject } from "../../../packages/core-engine";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post("/project/evaluate", async (req, res) => {
  const { userId, name, data } = req.body;

  const evaluation = evaluateProject(data ?? {});

  const project = await prisma.project.create({
    data: {
      userId,
      name,
      eoctScore: evaluation.eoct,
      fourLData: evaluation.fourL,
    },
  });

  res.json({ project, evaluation });
});

app.get("/dashboard/:userId", async (req, res) => {
  const projects = await prisma.project.findMany({
    where: { userId: req.params.userId },
  });

  res.json(projects);
});

app.listen(4000, () => {
  console.log("UTAMV API running on port 4000");
});
