terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.100"
    }
  }

  backend "azurerm" {
    resource_group_name  = "rg-terraform-state-mgm"
    storage_account_name = "sttfstatetulio1775178408"
    container_name       = "tfstate"
    key                  = "todo-ssd.terraform.tfstate"
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
    "DATABASE_URL"                        = "file:/home/data/todo.db"
  }
}

resource "azurerm_static_web_app" "swa" {
  name                = "swa-todo-ssd-prod"
  resource_group_name = azurerm_resource_group.rg.name
  location            = "westus2"
  sku_tier            = "Free"
  sku_size            = "Free"
  tags                = local.common_tags
}

output "static_web_app_url" {
  value       = azurerm_static_web_app.swa.default_host_name
  description = "The default host name of the Static Web App"
}

output "static_web_app_api_key" {
  value       = azurerm_static_web_app.swa.api_key
  sensitive   = true
  description = "The API key for the Static Web App. Needed for Github Actions SWA deploy."
}
