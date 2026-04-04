# 🖥️ Deep Dive: Backend (Node.js + Express)

Este documento explica cómo funciona el corazón de nuestro servidor, ahora centralizado en `src/infrastructure/server/app.ts` y arrancado desde `src/index.ts`.

## ⚙️ Tecnologías Utilizadas
- **Express**: El framework que maneja las rutas web.
- **CORS**: Un guardia de seguridad que permite que el frontend hable con el backend (específicamente configurado para Azure Static Web Apps).
- **OpenAPI Validator**: Un "juez" que se asegura de que cada petición cumpla con el contrato `openapi.yaml`.
- **Prisma**: Nuestro asistente para hablar con la base de datos sin escribir SQL complicado.

## 🔍 Análisis del Código (`src/infrastructure/server/app.ts`)

### 1. Configuración de Seguridad (CORS)
```typescript
const allowedOrigins = [
  'http://localhost:5173', 
  'https://purple-dune-0afb89c1e.2.azurestaticapps.net', 
  /^https:\/\/.*\.azurestaticapps\.net$/
];
```
Aquí definimos quién tiene permiso para hacernos preguntas. Hemos incluido explícitamente la URL de producción del Frontend de Azure para evitar bloqueos por CORS.

### 2. El Contrato (SSOT)
```typescript
app.use(
  OpenApiValidator.middleware({
    apiSpec,
    validateRequests: true,
    validateResponses: true,
  }),
);
```
Esta es la parte más importante. Si alguien intenta enviarnos un dato que no definimos en `openapi.yaml`, este código lo detendrá automáticamente y enviará un error 400. ¡Seguridad total!

### 3. Las Rutas (Endpoints)
- **GET `/api/todos`**: Trae todos los recordatorios. Usamos `prisma.todo.findMany()` para pedirlos a la base de datos.
- **POST `/api/todos`**: Crea uno nuevo. Recibe el `title` y `description` y los guarda.
- **PATCH `/api/todos/:id`**: Marca un recordatorio como completado o no.
- **DELETE `/api/todos/:id`**: Borra un recordatorio para siempre.

### 4. Manejo de Errores
Al final del archivo hay un bloque de código que atrapa cualquier error y lo devuelve de forma bonita al usuario, para que no se rompa la aplicación.
