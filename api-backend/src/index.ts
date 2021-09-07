import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import { deserialize, serialize } from 'typescript-json-serializer';

import {getSimpleJwksService, secure} from 'express-oauth-jwt';

import { Database } from './database';
import { getCorsOrigin, getApiPort, getAuthIssuesBaseUrl, getAuthJwksUrl } from './environment';
import { Chase, ChaseList, ChaseMetaData } from './shared/models/chase';

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

// Configure OAuth security to validate JWTs and to check the issuer + audience claims
const authOptions = {
    claims: [
        {
            name: 'iss',
          value: getAuthIssuesBaseUrl(),
        },
    ]
};
const jwksService = getSimpleJwksService(getAuthJwksUrl());
app.use('/protected/*', secure(jwksService, authOptions));

/**
 * dummy call, may be changed in future versions
 */
app.get('/test', (req, res) => {
  res.send('success');
});
app.get('/protected/test', (req, res) => {
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

app.post('/protected/chase', function (req, res) {
  console.log('received chase');
  database.createOrUpdateChase(deserialize(req.body, Chase)).then(id => {
    res.send('{ chaseId: "' + id + '" }');
  }).catch(() => {
    //TODO set error code
    res.send('{}');
  });
});

app.delete('/protected/chase/*', function (req, res) {
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

app.post('/protected/media', upload.single('file'), function (req, res) {
  console.log('received media data');
  const id = addMedia(req);
  res.send('media/' + id);
});

app.delete('/protected/media/*', upload.single('file'), function (req, res) {
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

