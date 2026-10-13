# Kubernetes Day 7 Architecture

## Configuration Flow

The `app-config` ConfigMap stores non-sensitive application settings.

The `db-credentials` Secret stores demonstration database credentials.

The `day7-web` Deployment creates two NGINX replicas in the `day7-lab`
namespace. Its container specification injects selected ConfigMap and
Secret keys as environment variables.

The `day7-web-service` ClusterIP Service selects pods labeled
`app: day7-web` and routes port 80 to their named HTTP container port.

An EndpointSlice records the pod endpoints associated with the Service.

## Security Considerations

- Never commit real credentials.
- Restrict Secret access with Kubernetes RBAC.
- Configure encryption at rest where appropriate.
- Rotate credentials when necessary.
- Avoid logging Secret values.
- Remember that changing a Secret does not automatically update environment
  variables in already-running containers.

## Lab Limitations

The project runs on a local Minikube cluster. It demonstrates core Kubernetes
operations but is not, by itself, a production deployment.
