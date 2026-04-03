output "default_hostname" {
  description = "URL final de la aplicación"
  value       = "https://${azurerm_linux_web_app.app.default_hostname}"
}
