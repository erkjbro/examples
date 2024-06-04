resource "kubernetes_manifest" "crontab_crd" {
  manifest = {
    "apiVersion" = "apiextensions.k8s.io/v1"
    "kind"       = "CustomResourceDefinition"
    "metadata" = {
      "name" = "crontabs.stable.example.com"
    }
    "spec" = {
      "group" = "stable.example.com"
      "names" = {
        "kind"   = "CronTab"
        "plural" = "crontabs"
        "shortNames" = [
          "ct",
        ]
        "singular" = "crontab"
      }
      "scope" = "Namespaced"
      "versions" = [
        {
          "name" = "v1"
          "schema" = {
            "openAPIV3Schema" = {
              "properties" = {
                "spec" = {
                  "properties" = {
                    "cronSpec" = {
                      "type" = "string"
                    }
                    "image" = {
                      "type" = "string"
                    }
                  }
                  "type" = "object"
                }
              }
              "type" = "object"
            }
          }
          "served"  = true
          "storage" = true
        },
      ]
    }
  }
}

# CRD must be deployed before its custom resource.
resource "kubernetes_manifest" "my_new_crontab" {
  manifest = {
    "apiVersion" = "stable.example.com/v1"
    "kind"       = "CronTab"
    "metadata" = {
      "name"      = "my-new-cron-object"
      "namespace" = "default"
    }
    "spec" = {
      "cronSpec" = "* * * * */5"
      "image"    = "my-awesome-cron-image"
    }
  }
}
