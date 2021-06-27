import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import jwt from 'express-jwt';

import { Database } from './database';
import { getCorsOrigin, getApiSecret, getApiPort } from './environment';
import { Chase, ChaseList, ChaseMetaData } from './shared/models/chase';
import { deserialize, serialize } from 'typescript-json-serializer';

const jwt_protection = jwt({
  secret: getApiSecret(),
  algorithms: ['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512', 'PS256', 'PS384', 'PS512', 'ES256', 'ES384', 'ES512']
});
// TODO catch jwt exception and only pass "Unauthorized"

var database = new Database();

const app = express();
const upload = multer();

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
app.get('/login', jwt_protection, (req, res) => {
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

app.post('/chase', jwt_protection, function (req, res) {
  console.log('received chase');
  database.createOrUpdateChase(deserialize(req.body, Chase)).then(id => {
    res.send('{ chaseId: "' + id + '" }');
  }).catch(() => {
    //TODO set error code
    res.send('{}');
  });
});

app.delete('/chase/*', jwt_protection, function (req, res) {
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

function addMedia(req:express.Request, res:express.Response) {
  console.log('received media data');
  const id = database.createMedia(req.body.chaseId, req.body.name, req.file.mimetype, req.file.buffer);
  res.send('{ url: "media/' + id + '" }');
}

app.post('/media', jwt_protection, upload.single('file'), function (req, res) {
  addMedia(req, res);
});

app.delete('/media/*', jwt_protection, upload.single('file'), function (req, res) {
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

