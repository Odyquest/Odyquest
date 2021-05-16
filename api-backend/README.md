# Api Backend

Server side implementation for database requests.

## Build

* Build: `npm run build`
* Run: `nodejs dist/index.js`

## Manual Testing

To test the implementation, you need a MongoDB database running with default configuration.

### Create example database entries

Create database entry from valid chase file:
```
curl -X POST -H "Content-Type: application/json" -d @../xaver-shared/assets/examples/xaver/chase.json http://localhost:8400/chase
```

Create database media entry from valid file:
```
curl -i -X POST -H "Content-Type: multipart/form-data" -F "chaseId=simple" -F "name=example_image" -F "file=@../xaver-app/src/assets/icons/icon-128x128.png" http://localhost:8400/media
```

