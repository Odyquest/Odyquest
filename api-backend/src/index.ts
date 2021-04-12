import express from 'express';
import cors from 'cors';

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
    res.send('FIXME return all the chases');
})

app.get('/chase/*', (req, res) => {
    res.send('FIXME return chase with id: ' + req.params[0]);
})

app.post('/chase', function (req, res) {
    // FIXME implement authentication
    res.send('FIXME implement');
})
const port = 8400;

app.listen(port, () => {
    console.log('The application is listening on port ' + port + '!');
})
