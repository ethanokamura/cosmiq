## Running locally
Run the following command to spin up the backend:
```sh
docker run cosmiq-server:latest
```

## Deploying the backend

Build the docker image (on linux/amd64)
```sh
docker build -t cosmiq-server:latest --platform linux/amd64 .
```

Tag the docker image
```sh
docker tag < INSERT DOCKER IMAGE ID > us-west2-docker.pkg.dev/cosmiq-456603/cosmiq-server/cosmiq-image
```

Push to Google Cloud Run
```sh
docker push us-west2-docker.pkg.dev/cosmiq-456603/cosmiq-server/cosmiq-image:latest
```