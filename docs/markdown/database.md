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
## 🤖 La Carpeta `src/generated/prisma` (¡No Tocar!)

En la carpeta `src/generated/prisma` vive el **Prisma Client**.
- **¿Qué es?**: Es el código real que usamos en `index.ts` para hablar con la base de datos.
- **¿De dónde viene?**: Se genera automáticamente cada vez que corres el comando `npx prisma generate` basándose en tu archivo `schema.prisma`.
- **⚠️ REGLA DE ORO**: Nunca edites archivos dentro de esta carpeta manualmente. Cualquier cambio que hagas se borrará la próxima vez que se genere el cliente. Si quieres cambiar algo, cámbialo en `schema.prisma` y vuelve a generar el cliente.

*Nota: Esta carpeta está en el archivo `.gitignore`, lo que significa que no se guarda en GitHub. Se crea "al vuelo" en cada máquina de desarrollador y en el servidor de despliegue.*
