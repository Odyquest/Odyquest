import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose'
import { Database, ChaseMetaDataModel, DescriptionModel } from './database';

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
  origin: 'localhost',
  preflightContinue: false,
};
app.use(cors(options));

app.get('/', (req, res) => {
    res.send('Boom!');
})

app.get('/chase', (req, res) => {
  database.getChaseList().then(list => {
    res.send('FIXME return all ' + list.length + ' chases');
  }).catch(() => {
    //TODO set error code
    res.send('FIXME no chases error');
  });
})

app.get('/chase/*', (req, res) => {
  database.getChase(req.params[0]).then(chase => {
    res.send('FIXME return chase with id ' + req.params[0] + ' and title ' + chase.metaData.title);
  }).catch(() => {
    //TODO set error code
    res.send('FIXME no such chase error');
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
