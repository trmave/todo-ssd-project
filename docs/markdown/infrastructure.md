# ☁️ Deep Dive: Infraestructura (Terraform + Azure)

Aquí explicamos las "máquinas" y servicios que hacen que nuestra app viva en internet.

## 🚜 Terraform: El Arquitecto Digital
En lugar de entrar a la página de Azure y hacer clics manuales, escribimos código (`main.tf`) que le dice a Azure exactamente qué construir.

## 🔍 Análisis de Recursos (`terraform/main.tf`)

### 1. Azure App Service (`azurerm_linux_web_app`)
Es el lugar donde corre nuestro **Backend**. 
- Usamos el plan **F1 (Free)** para no gastar dinero mientras aprendemos.
- Activamos `WEBSITES_ENABLE_APP_SERVICE_STORAGE` para que el archivo de la base de datos SQLite no se borre al reiniciar.

### 2. Azure Static Web App (`azurerm_static_web_app`)
Es donde vive nuestro **Frontend**. Está optimizado para cargar React de forma instantánea en cualquier parte del mundo.

### 3. Etiquetas (Tags)
```hcl
locals {
  common_tags = {
    Project     = "TodoSSD"
    CostCenter  = "MBA-Learning"
  }
}
```
Como si pusiéramos etiquetas a las cajas, esto nos ayuda a saber cuánto dinero gasta cada proyecto en Azure.

## 🚀 Despliegue Automático
Gracias a las salidas (`outputs`), GitHub sabe la dirección de internet de nuestra app y puede enviarle el código nuevo automáticamente cada vez que hacemos un cambio.
