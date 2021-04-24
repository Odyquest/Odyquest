import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose'
import { Database, ChaseMetaDataModel, DescriptionModel } from './database';
import { Chase, ChaseList } from './shared/models/chase';
import { deserialize, serialize } from 'typescript-json-serializer';

var database = new Database();

const app = express();

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
    console.log('api: chase has ' + chase.gameElements.size + ' game elements');
    const data = serialize(chase as Chase);
    res.send(data);
  }).catch(() => {
    //TODO set error code
    res.send('{}');
  });
})

app.post('/chase', function (req, res) {
  // FIXME implement authentication
  res.send('FIXME implement');
})

const port = 8400;

app.listen(port, () => {
    console.log('The application is listening on port ' + port + '!');
})

//import { getSimpleExample } from './shared/models/example/chaseExample';
//
//console.log('create example');
//database.createChase(getSimpleExample());
//console.log('print chase list:');
//console.log(database.getChaseList());
