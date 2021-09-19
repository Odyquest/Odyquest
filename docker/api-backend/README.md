# Docker Image for Api Backend

## Build Docker Image

* Build Api Backend
* Copy `../api-backend/package*.json` to this directory and `../api-backend/dist` to `build/dist`.
* Build docker image: `sudo docker build -t odyquest-api .`

## Testing

Use `docker-compose.yml` to provide a runnint api backend for frontend testing.

