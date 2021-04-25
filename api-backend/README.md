# api-backend

Server side implementation for database requests.

* Build: `npm run build`
* Run: `nodejs dist/index.js`

## create example database

Create database entry from valid file:
```
curl -X POST -H "Content-Type: application/json" -d @../xaver-shared/assets/examples/xaver/chase.json http://localhost:8400/chase
```
