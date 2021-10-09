# Odyquest Data Backend

Server side implementation for database requests.

## Build

* Build: `npm run build`
* Configuration: following variables can be adapted via setting coresponding environment variables
  ```
  ODYQUEST_CORS_ORIGIN='http://localhost:4200'
  ODYQUEST_MONGODB_URL='mongodb://localhost:27017/test'
  ODYQUEST_API_PORT='8444'
  ODYQUEST_USE_AUTH='true'
  ODYQUEST_AUTH_ISSUER_BASE_URL='https://localhost:8080/auth/realms/master'
  ODYQUEST_AUTH_JWKS_URL='https://localhost:8080/auth/realms/master/protocol/openid-connect/certs'
  ```
* Run: `nodejs dist/index.js`

## Authentication

The authentication implementation needs encrypted and offically certified access to a authentication server. For local
testing it is possible to deactivate authentication via environment vairable.

## Manual Testing

To test the implementation, you need a MongoDB database running with default configuration.

### Create example database entries

Create database entry from valid chase file:
```
curl -X POST -H "Content-Type: application/json" -d @../xaver-shared/assets/examples/xaver/chase.json http://localhost:8400/chase
```

Create database media entry from valid file:
```
curl -i -X POST -H "Content-Type: multipart/form-data" -F "chaseId=simple" -F "name=example_image" -F "file=@../odyquest-app/src/assets/icons/icon-128x128.png" http://localhost:8400/media
```

