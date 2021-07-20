import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import jwt from 'express-jwt';

import { auth, requiresAuth }  from 'express-openid-connect';
import { deserialize, serialize } from 'typescript-json-serializer';

import { Database } from './database';
import { getCorsOrigin, getApiSecret, getApiPort, getAuthIssuesBaseUrl } from './environment';
import { Chase, ChaseList, ChaseMetaData } from './shared/models/chase';

const jwt_protection = jwt({
  secret: getApiSecret(),
  algorithms: ['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512', 'PS256', 'PS384', 'PS512', 'ES256', 'ES384', 'ES512']
});
// TODO catch jwt exception and only pass "Unauthorized"

var database = new Database();

const app = express();
const upload = multer();


app.use(
  auth({
    issuerBaseURL: getAuthIssuesBaseUrl(),
    baseURL: 'http://localhost:' + getApiPort(),
    clientID: 'odyquest-api',
    secret: 'f6a9d73a3d8b5afcb7d4e973031f1f21d59ea80db16f7bb05ee00f946c1a826f',
    //idpLogout: true,
    authRequired: false, // do not require auth for all routes
    routes: {
      login: false,
      //postLogoutRedirect: '/custom-logout',
    }
  })
);

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
    'Authorization',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: getCorsOrigin(),
  preflightContinue: false,
};
app.use(cors(options));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Boom!');
});

/**
 * dummy call, may be changed in future versions
 */
app.get('/test', requiresAuth(), (req, res) => {
  res.send('success');
});

app.get('/chase', (req, res) => {
  database.getChaseList().then(list => {
    const chases = new ChaseList();
    chases.chases = list;
    res.send(serialize(chases as ChaseList));
  }).catch(() => {
    //TODO set error code
    // send empty list
    const chases = new ChaseList();
    res.send(serialize(chases));
  });
});

app.get('/chase/*', (req, res) => {
  database.getChase(req.params[0]).then(chase => {
    res.send(serialize(chase as Chase));
  }).catch(() => {
    //TODO set error code
    res.send('{}');
  });
});

app.post('/chase', requiresAuth(), function (req, res) {
  console.log('received chase');
  database.createOrUpdateChase(deserialize(req.body, Chase)).then(id => {
    res.send('{ chaseId: "' + id + '" }');
  }).catch(() => {
    //TODO set error code
    res.send('{}');
  });
});

app.delete('/chase/*', requiresAuth(), function (req, res) {
  database.deleteChase(req.params[0]).then(id => {
    res.send('{status:"success"}');
  }).catch(() => {
    //TODO set error code
    res.send('{status:"failed"}');
  });
});

app.get('/media/*', (req, res) => {
  database.getMedia(req.params[0]).then(data => {
    res.send(data);
  }).catch(() => {
    //TODO set error code
    res.send('');
  });
});

function addMedia(req:express.Request): string {
  return database.createMedia(req.body.chaseId, req.body.name, req.file.mimetype, req.file.buffer);
}

app.post('/media', requiresAuth(), upload.single('file'), function (req, res) {
  console.log('received media data');
  const id = addMedia(req);
  res.send('media/' + id);
});

app.delete('/media/*', requiresAuth(), upload.single('file'), function (req, res) {
  database.deleteMedia(req.params[0]).then(data => {
    res.send(data);
  }).catch(() => {
    //TODO set error code
    res.send('');
  });
});

const port = getApiPort();

app.listen(port, () => {
    console.log('The application is listening on port ' + port + '!');
})

