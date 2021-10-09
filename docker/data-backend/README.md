# Docker Image for Data Backend

## Build Docker Image

* Build Api Backend
* Copy `../odyquest-data-backend/package*.json` to this directory and `../odyquest-data-backend/dist` to `build/dist`.
* Build docker image: `sudo docker build -t odyquest-data-backend .`

## Testing

Use `docker-compose.yml` to provide a runnint data backend for frontend testing.

