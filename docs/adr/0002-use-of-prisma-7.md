# 0002: Uso de Prisma 7 con SQLite

## Date
2026-04-02

## Status
Accepted

## Context
Para el desarrollo del servicio To-Do en Node.js/TypeScript, era fundamental implementar una capa de acceso a datos ligera, moderna y fuertemente tipada (type-safe) que se integrara en armonía con SQLite (para minimizar la complejidad de infraestructura de BD en etapa temprana).

## Decision
Adoptar **Prisma 7** como el Object-Relational Mapper (ORM) principal de la aplicación.

## Consequences
- **Positivas:** Interfaz limpia para operaciones a la base de datos, excelente experiencia de desarrollo (DX) gracias al soporte de tipos automáticos, y gran sinergia con el flujo Spec-Driven.
- **Negativas/Consideraciones:** Introduce la necesidad de generar explícitamente el `Prisma Client` en el entorno de validación CI/CD (GitHub Actions) e inyectar configuraciones ambientales (`DATABASE_URL`) adecuadamente en el pipeline para evitar problemas durante la fase de Build.
