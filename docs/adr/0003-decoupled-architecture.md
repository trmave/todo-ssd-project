# 0003: Arquitectura Desacoplada de Servicios

## Date
2026-04-02

## Status
Accepted

## Context
Todo-SSD requiere una aproximación donde los desarrollos de la interfaz gráfica y la lógica de negocio subyacente puedan evolucionar e iterarse por separado (y colaborativamente por distintos agentes).

## Decision
Se seleccionó una arquitectura completamente desacoplada:
1. Una Single Page Application (SPA) en React/Vite para el frontend.
2. Una API RESTful independiente en Node.js para el backend.
Todo el ecosistema regido bajo el paradigma **Spec-Driven Development** (con `openapi.yaml` como Single Source of Truth).

## Consequences
- **Positivas:** Permite la delegación de responsabilidades clara; el modelo UI y el API actúan como cajas negras separadas conectadas únicamente mediante los contratos definidos.
- **Negativas/Consideraciones:** Fue necesario un manejo proactivo de reglas **CORS** en el backend para admitir peticiones desde el origen del dominio de frontend (en desarrollo `localhost` y en producción vía Azure Static Web Apps), además de un estricto control de versionado del contrato.
