# Containerization

## Docker

##### Change Directory to folder _docker_

### Build and run 

`docker compose up -d --build`

### Shutdown and clean

`docker compose down`

## Kubernetes
We use the local cluster management system minikube (https://minikube.sigs.k8s.io/docs/)

### Start minikube
`minikube start`

### Load images
`minikube image load books-rest-api:latest`

`minikube image load books-api-client:latest`

### Start Ingress Contour Controller
`kubectl apply -f https://projectcontour.io/quickstart/contour.yaml`

### Display Contour service
`kubectl get -n projectcontour service envoy -o wide`

Fetch **contour external address** from EXTERNAL-IP column

### Configure your host DNS entries (/etc/hosts)

`<contour external address> 	booksserver`

### Apply deployments
##### Change Directory to folder _k8s_

`kubectl  apply -f .`

### Check that deployments are up
`kubectl get deployments`

### Use port forward to access client
`kubectl port-forward service/booksapp 4100:4100`

### Access application
http://localhost:4100

### Remove contour service
`kubectl apply -f https://projectcontour.io/quickstart/contour.yaml`

### Remove deployments
##### In folder _k8s_

`kubectl delete -f .`

### Stop minikube
`minikube stop`
