# 0001: Cambio de Región a West US 2

## Date
2026-04-02

## Status
Accepted

## Context
Durante el despliegue inicial de la infraestructura en Azure utilizando Terraform, nos encontramos con restricciones de cuota o capacidad para la creación de planes App Service gratuitos (F1) en regiones geográficas predeterminadas. 

## Decision
Decidimos migrar y cambiar la región y localización del Resource Group asociado (y por ende de todos sus recursos) hacia `West US 2`.

## Consequences
- **Positivas:** Esta región permitió el aprovisionamiento exitoso de la infraestructura "production-lite" sin errores de cuota.
- **Negativas/Consideraciones:** Puede existir una sutil diferencia de latencia dependiendo de la región de origen del usuario, pero es perfectamente manejable y óptima para el alcance del proyecto.
