# Todo-SSD: High Performance Task Management

## Project Identity
**Todo-SSD** es una plataforma de **Task Management de alto rendimiento** que combina la eficiencia y estructura de un SaaS Moderno con un toque de diseño inspirado en las vibras cálidas y atractivas de Stardew Valley. Creado con un enfoque en la productividad, fluidez y un gran encanto visual.

## Tech Stack
El proyecto está construido sobre un stack tecnológico robusto y moderno:
- **Frontend:** React estructurado con Vite y estilizado mediante Tailwind CSS.
- **Backend & Base de Datos:** Node.js integrado con **Prisma 7** como ORM y **SQLite** para una persistencia de datos rápida y eficiente.
- **Despliegue (Cloud - Azure):** 
  - Backend alojado en **Azure App Service** (Node.js 20 Linux Web App).
  - Frontend configurado para poder alojarse en **Azure Static Web Apps**.

## Architecture (SDD)
La arquitectura de Todo-SSD está basada en **Spec-Driven Development (SDD)**. 
Toda la lógica de comunicación, modelos de datos y validaciones dependen de una única fuente de verdad (Single Source of Truth): nuestro contrato definido en el archivo `openapi.yaml`.

## Infrastructure as Code (IaC)
La infraestructura base de despliegue en Azure ha sido declarada y automatizada utilizando **Terraform**.
Para asegurar un correcto control de gobernanza y costos, los recursos siempre se despliegan con tags específicos:
- `CostCenter:` MBA-Learning
- `Project:` Todo-SSD

## Agentes & Herramientas
El proceso de creación y ensamblaje de Todo-SSD aprovecha el potencial de herramientas integradas en entornos asistidos por IA:
- **Antigravity:** Actuando como orquestador, arquitecto de backend (SDD), y configurador de IaC (Terraform) y CI/CD.
- **Stitch (MCP):** Aprovechado a través de su Model Context Protocol para el prototipado visual rápido y la generación de la Interfaz de Usuario (UI) reactiva.

## Guía de Despliegue (CI/CD)
Este proyecto cuenta con Pipelines estructurados para realizar despliegues ágiles y seguros asegurando el cumplimiento de especificaciones:
1. **GitHub Actions** automatiza el flujo general.
2. Cada Push o Pull Request en las ramas principales dispara validaciones del Contrato OpenAPI (Spectral), Linting y Type-checking.
3. Se genera el **Prisma Client** de manera transitoria y se ejecuta el build.
4. Tras validaciones exitosas, los despliegues se automatizan hacia la infraestructura de Azure.

## 🗺️ Guía del Arquitecto: Estructura del Proyecto

Si eres nuevo en el ecosistema de Node.js o en este proyecto, aquí tienes un mapa para navegar por las carpetas:

- **`src/`**: Aquí vive el código fuente del servidor backend. [(Detalles Técnicos)](./docs/markdown/backend.md)
  - `index.ts`: El punto de entrada de la aplicación.
- **`frontend/`**: Aquí vive toda la interfaz de usuario. [(Detalles Técnicos)](./docs/markdown/frontend.md)
  - **`src/`**: El código de la aplicación React.
    - `main.tsx`: El punto de inicio del frontend.
    - `App.tsx`: El componente principal.
    - `api.ts`: La capa que "habla" con el backend. [(Análisis de Código)](./docs/markdown/frontend.md#1-la-conexión-con-el-servidor-srcapits)
- **`prisma/`**: Configuración de la base de datos. [(Detalles Técnicos)](./docs/markdown/database.md)
  - `schema.prisma`: Define tus modelos de datos.
- **`terraform/`**: Infraestructura como Código. [(Detalles Técnicos)](./docs/markdown/infrastructure.md)
- **`docs/`**: Documentación técnica detallada y registros de decisiones (ADRs).
- **`.github/workflows/`**: Automatización de pruebas y despliegues. [(CI/CD Flow)](./docs/markdown/infrastructure.md#🚀-despliegue-automático)

### 🛠️ Conceptos Clave para Principiantes

#### ¿Qué es Prisma?
Imagina que Prisma es un traductor inteligente. En lugar de escribir código complejo para hablar con la base de datos (SQL), usas Prisma para hablar en lenguaje de programación (TypeScript). Él se encarga de que todo coincida y sea seguro.

#### ¿Por qué `src`?
Es una convención estándar. Separamos el código "sucio" de configuración del código "limpio" que nosotros escribimos. Todo lo que esté en `src` es lo que realmente hace que la aplicación funcione.

#### La Magia de `openapi.yaml`
Este proyecto es **Spec-Driven**. Antes de escribir una sola línea de código para una nueva función, la definimos en este archivo. Es el contrato que tanto el Frontend como el Backend deben respetar.

#### TypeScript vs JavaScript
Usamos TypeScript (archivos `.ts` y `.tsx`). Es como JavaScript pero con "superpoderes" de detección de errores. Si intentas usar algo que no existe, el editor te avisará antes de que el programa falle. 

*Nota: Los archivos `.tsx` son especiales para React; permiten escribir HTML directamente dentro de nuestro código TypeScript.*

#### ¿Qué es Vite?
Vite es como un motor de carreras para el desarrollo. Hace que los cambios que hagas en el código se vean instantáneamente en el navegador sin tener que esperar.
