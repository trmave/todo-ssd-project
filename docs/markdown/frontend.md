# 🎨 Deep Dive: Frontend (React + Vite)

Aquí explicamos cómo funciona la interfaz que el usuario ve y toca.

## ⚙️ Tecnologías Utilizadas
- **Vite**: Nuestra herramienta de construcción super rápida.
- **React**: La librería para crear interfaces interactivas con componentes.
- **Tailwind CSS**: Estilo visual "Stardew Valley" usando clases moderas.
- **Fetch API**: La forma en que pedimos datos al servidor por internet.

## 🔍 Análisis del Código

### 1. La Conexión con el Servidor (`src/api.ts`)
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```
Este archivo es el "teléfono" del frontend. Sabe a qué dirección llamar para pedir los To-Dos. Usamos variables de entorno para que en producción llame a Azure y en desarrollo use `localhost`.

### 2. El Componente Principal (`src/App.tsx`)
Este archivo organiza la casa:
- Tiene el **Header** (la barra superior con el logo "Todo SSD Stardrop").
- Tiene el **Main** con una tarjeta de progreso (Farm Efficiency).
- Llama al componente `<TodoList />` para mostrar la lista real de tareas.

### 3. Los Estilos (`src/index.css` y `App.css`)
Usamos efectos visuales como:
- **Backdrop Blur**: Ese efecto de vidrio transparente (glassmorphism) en la barra superior.
- **Iridium Glass**: Un estilo visual premium para las tarjetas principales.

## 🚀 Ciclo de Vida
1. El usuario abre la página.
2. `App.tsx` se carga.
3. Se llama a `getTodos()` de `api.ts`.
4. Los datos llegan del backend y React los dibuja en la pantalla automáticamente.
