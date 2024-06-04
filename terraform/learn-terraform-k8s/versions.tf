terraform {
  required_version = "1.8.4"
  required_providers {
    kubernetes = {
      source = "hashicorp/kubernetes"
      version = ">=2.0.0"
    }
  }
}
