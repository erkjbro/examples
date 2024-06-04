# Manage Kubernetes Resources via Terraform

> [Kubernetes Provider Tutorial](https://developer.hashicorp.com/terraform/tutorials/kubernetes/kubernetes-provider)

Kubernetes (K8S) is an open-source workload scheduler with focus on containerized applications. You can use the Terraform Kubernetes provider to interact with resources supported by Kubernetes.

### Prerequisites

- Kubernetes & Kubetcl
- Kind CLI (For targeting local cluster)
- Terraform CLI

### Troubleshooting

If you're using WSL, you may encounter an error when trying to apply the terraform update. The reason for this is a known issue with Docker Desktop with a WSL-based engine on windows. The culprit is the base OS for the docker image.

Helpful Article: [Docker Desktop Container crash with exit code 139 on Windows WSL Fix](https://dev.to/damith/docker-desktop-container-crash-with-exit-code-139-on-windows-wsl-fix-438)

```bash
touch /mnt/c/users/[your_username]/.wslconfig
```

```bash
# .wslconfig file
[wsl2]
kernelCommandLine = vsyscall=emulate
```

Restart your PC and the issue should be resolved.
