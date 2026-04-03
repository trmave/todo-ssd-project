terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.100"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

# Estrategia de Tags
locals {
  common_tags = {
    Project     = "TodoSSD"
    Environment = "Production-Lite"
    Owner       = "Tulio"
    ManagedBy   = "Terraform"
    CostCenter  = "MBA-Learning"
  }
}

resource "azurerm_resource_group" "rg" {
  name     = "rg-todo-ssd-prod"
  location = var.region
  tags     = local.common_tags
}

resource "azurerm_service_plan" "asp" {
  name                = "asp-todo-ssd-prod"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  os_type             = "Linux"
  sku_name            = "F1"
  tags                = local.common_tags
}

resource "azurerm_linux_web_app" "app" {
  name                = "app-todo-ssd-tulio"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_service_plan.asp.location
  service_plan_id     = azurerm_service_plan.asp.id
  tags                = local.common_tags

  site_config {
    application_stack {
      node_version = "20-lts"
    }
    # always_on = true no es soportado en la capa F1 (Free)
    always_on = false
  }

  app_settings = {
    "WEBSITE_LOCAL_CACHE_OPTION"          = "Never"
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "true" # Habilita almacenamiento persistente
  }
}
