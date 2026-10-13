# Kubernetes Day 7 — ConfigMaps & Secrets

**Author:** Azeem Amir  
**Focus:** Kubernetes configuration management, Secret consumption,
Deployments, Services, and application verification.

## Project Overview

This hands-on project demonstrates how Kubernetes workloads consume
configuration from ConfigMaps and sensitive values from Secrets.

The lab uses a local Minikube cluster and an NGINX Deployment with
two replicas.

## Technology Stack

- Ubuntu 24.04
- Kubernetes v1.35.1
- Minikube v1.39.0
- kubectl v1.37.0
- NGINX
- YAML
- HTML, CSS, and JavaScript for the portfolio showcase

## Architecture

Browser
  -> Kubernetes ClusterIP Service
  -> NGINX Deployment
  -> Two Pods

Configuration resources:

- ConfigMap: app-config
- Secret: db-credentials

Namespace: day7-lab

## Verified Lab Results

- Deployment rollout completed successfully.
- Two NGINX replicas reached Running and Ready.
- APP_ENV and LOG_LEVEL were read from the ConfigMap.
- DB_USERNAME was read from the Secret.
- DB_PASSWORD presence was checked without printing its value.
- The ClusterIP Service registered both Pod endpoints.
- Port forwarding was started on localhost:8087.

## Run the Lab

Check the cluster:

    kubectl get nodes

Inspect resources:

    kubectl get deployments,pods,services -n day7-lab

Inspect configuration metadata:

    kubectl describe configmap app-config -n day7-lab

    kubectl describe secret db-credentials -n day7-lab

Check the rollout:

    kubectl rollout status deployment/day7-web -n day7-lab

Start browser access:

    kubectl port-forward -n day7-lab service/day7-web-service 8087:80

Open http://localhost:8087.

## Security Notes

The lab uses illustrative credentials only.

- Base64 encoding is not encryption.
- Do not commit real credentials to Git.
- Restrict Secret access using least-privilege RBAC.
- Enable encryption at rest where appropriate.
- Consider external secret-management solutions for production.
- Environment variables do not automatically update when their
  underlying ConfigMap or Secret changes.

This project demonstrates local learning and does not claim to be
a production deployment or a continuously monitored service.

## Portfolio

The static portfolio website is located in `showcase/`.

Author: Azeem Amir
GitHub: https://github.com/azeemamir-maga
LinkedIn: https://www.linkedin.com/in/azeem-aamir-600b78341/
