import express from 'express';

const app = express();

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
