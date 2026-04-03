# 💾 Deep Dive: Base de Datos (Prisma + SQLite)

Explicación de cómo guardamos la información para que no se pierda al apagar el servidor.

## ⚙️ Tecnologías Utilizadas
- **SQLite**: Una base de datos "en un archivo". No necesita un servidor gigante, es ligera y perfecta para este tipo de apps.
- **Prisma Schema**: El lenguaje donde definimos nuestras tablas.

## 🔍 Análisis del Esquema (`prisma/schema.prisma`)

### El Modelo `Todo`
```prisma
model Todo {
  id          String   @id @default(uuid())
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
}
```
Aquí definimos qué datos tiene cada tarea:
- **id**: Un código único y largo (UUID) para reconocer la tarea.
- **title**: El nombre de la tarea (ej: "Regar las plantas").
- **description**: Detalle de la tarea (es opcional, marcado por el `?`).
- **completed**: Un interruptor (true/false). Empieza en `false`.
- **createdAt**: Se guarda la fecha y hora exacta en que se creó.

## 🛠️ Comandos Útiles
- `npx prisma migrate dev`: Guarda los cambios que hagas en este archivo en la base de datos real.
- `npx prisma studio`: Abre una página web donde puedes ver y editar tus datos visualmente (¡muy útil!).
