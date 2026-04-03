import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import * as OpenApiValidator from 'express-openapi-validator';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());

const apiSpec = path.join(__dirname, '../openapi.yaml');

// Documentación interactiva basada en el SSOT
const swaggerDocument = yaml.load(fs.readFileSync(apiSpec, 'utf8')) as object;
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Enforzamos el SSOT para todas las rutas
app.use(
  OpenApiValidator.middleware({
    apiSpec,
    validateRequests: true,
    validateResponses: true,
  }),
);

import { prisma } from './infrastructure/database/prisma';

// ----------------------------------------------------
// Rutas (cumpliendo con openapi.yaml y usando Prisma)
// ----------------------------------------------------

app.get('/todos', async (req: Request, res: Response) => {
  const todos = await prisma.todo.findMany();
  res.status(200).json(todos.map((t: any) => {
    // Si descrption es null, lo eliminamos de la respuesta para cumplir con la SSOT original.
    const { description, ...rest } = t;
    return {
      ...rest,
      ...(description !== null ? { description } : {}),
      createdAt: t.createdAt.toISOString()
    };
  }));
});

app.post('/todos', async (req: Request, res: Response) => {
  const newTodo = await prisma.todo.create({
    data: {
      title: req.body.title, // Validado y garantizado por OAV
      description: req.body.description,
    }
  });
  
  const { description, ...rest } = newTodo;
  res.status(201).json({
    ...rest,
    ...(description !== null ? { description } : {}),
    createdAt: newTodo.createdAt.toISOString()
  });
});

app.patch('/todos/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string; // string uuid
  
  const count = await prisma.todo.count({ where: { id } });
  
  if (count === 0) {
    // Si no lo encuentra, Express devuelve 404
    return res.status(404).json({ message: 'No encontrado' });
  }

  if (typeof req.body.completed === 'boolean') {
      await prisma.todo.update({ where: { id }, data: { completed: req.body.completed }});
  }
  
  res.status(200).json({});
});

app.delete('/todos/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  
  const count = await prisma.todo.count({ where: { id } });
  if (count === 0) {
    return res.status(404).json({ message: 'No encontrado' });
  }
  
  await prisma.todo.delete({ where: { id } });
  res.status(204).send();
});

// ----------------------------------------------------
// Middleware de Manejo de Errores de OpenAPI Validator
// ----------------------------------------------------
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 SSOT Engram Enforcement Activo 🔥`);
  console.log(`Servidor de To-Dos corriendo en http://localhost:${PORT}`);
  console.log(`Documentación disponible en http://localhost:${PORT}/docs`);
});
