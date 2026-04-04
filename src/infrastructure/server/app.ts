import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import * as OpenApiValidator from 'express-openapi-validator';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import cors from 'cors';
import { prisma } from '../database/prisma';

const app = express();
app.use(express.json());

// Configuracion de CORS (Asegurada para Azure Frontend y entorno local)
const allowedOrigins = [
  'http://localhost:5173', 
  'https://purple-dune-0afb89c1e.2.azurestaticapps.net', 
  /^https:\/\/.*\.azurestaticapps\.net$/
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin origen (como herramientas de prueba) o las listadas
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') return origin === allowedOrigin;
      if (allowedOrigin instanceof RegExp) return allowedOrigin.test(origin);
      return false;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

const apiSpec = path.join(__dirname, '../../../openapi.yaml');

// Documentación interactiva basada en el SSOT
const swaggerDocument = yaml.load(fs.readFileSync(apiSpec, 'utf8')) as object;
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check endpoint (Raíz)
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: "online", project: "Todo-SSD", version: "1.0.0" });
});

// Enforzamos el SSOT para todas las rutas documentadas
app.use(
  OpenApiValidator.middleware({
    apiSpec,
    validateRequests: true,
    validateResponses: true,
  }),
);

// ----------------------------------------------------
// Rutas (cumpliendo con openapi.yaml y usando Prisma)
// ----------------------------------------------------

app.get('/api/todos', async (req: Request, res: Response) => {
  const todos = await prisma.todo.findMany();
  res.status(200).json(todos.map((t: any) => {
    const { description, ...rest } = t;
    return {
      ...rest,
      ...(description !== null ? { description } : {}),
      createdAt: t.createdAt.toISOString()
    };
  }));
});

app.post('/api/todos', async (req: Request, res: Response) => {
  const newTodo = await prisma.todo.create({
    data: {
      title: req.body.title,
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

app.patch('/api/todos/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const count = await prisma.todo.count({ where: { id } });
  
  if (count === 0) {
    return res.status(404).json({ message: 'No encontrado' });
  }

  if (typeof req.body.completed === 'boolean') {
      await prisma.todo.update({ where: { id }, data: { completed: req.body.completed }});
  }
  
  res.status(200).json({});
});

app.delete('/api/todos/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const count = await prisma.todo.count({ where: { id } });
  
  if (count === 0) {
    return res.status(404).json({ message: 'No encontrado' });
  }
  
  await prisma.todo.delete({ where: { id } });
  res.status(204).send();
});

// ----------------------------------------------------
// Middleware de Manejo de Errores
// ----------------------------------------------------
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

export default app;
