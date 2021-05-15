import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import { Database } from './database';
import { Chase, ChaseList } from './shared/models/chase';
import { deserialize, serialize } from 'typescript-json-serializer';

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
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: 'http://localhost:4200',
  preflightContinue: false,
};
app.use(cors(options));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Boom!');
})

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
})

app.get('/chase/*', (req, res) => {
  database.getChase(req.params[0]).then(chase => {
    res.send(serialize(chase as Chase));
  }).catch(() => {
    //TODO set error code
    res.send('{}');
  });
})

app.post('/chase', function (req, res) {
  // FIXME implement authentication
  console.log('received new chase ' + JSON.stringify(req.body));
  database.createOrUpdateChase(deserialize(req.body, Chase)).then(id => {
    res.send('{ chaseId: "' + id + '" }');
  }).catch(() => {
    //TODO set error code
    res.send('{}');
  });
})

app.put('/chase', function (req, res) {
  // FIXME implement authentication
  console.log('received new chase ' + JSON.stringify(req.body));
  database.createOrUpdateChase(deserialize(req.body, Chase)).then(id => {
    res.send('{ chaseId: "' + id + '" }');
  }).catch(() => {
    //TODO set error code
    res.send('{}');
  });
})

app.get('/media/*', (req, res) => {
  database.getMedia(req.params[0]).then(data => {
    res.send(data);
  }).catch(() => {
    //TODO set error code
    res.send('');
  });
})

function addMedia(req:express.Request, res:express.Response) {
  console.log('received media data ' + JSON.stringify(req.body));
  const id = database.createMedia(req.body.chaseId, req.body.name, req.file.mimetype, req.file.buffer);
  res.send('{ url: "/media/' + id + '" }');
}

app.post('/media', upload.single('file'), function (req, res) {
  // FIXME implement authentication
  addMedia(req, res);
})

const port = 8400;

app.listen(port, () => {
    console.log('The application is listening on port ' + port + '!');
})

