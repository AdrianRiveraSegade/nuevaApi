require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const {
  newUserEndpoint,
  getUserEndpoint,
  loginEndpoint,
} = require('./controllers/users');

const {
  getNotesEndpoint,
  newNoteEndpoint,
  getSingleNoteEndpoint,
  deleteNoteEndpoint,
} = require('./controllers/notes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

//Endpoints
//usuarios
app.post('/user', newUserEndpoint);
app.get('/user/:id', getUserEndpoint);
app.post('/login', loginEndpoint);

//notas
app.get('/', getNotesEndpoint);
app.post('/', newNoteEndpoint);
app.get('/note/:id', getSingleNoteEndpoint);
app.delete('/note/:id', deleteNoteEndpoint);

//Middeware 404
app.use((req, res) => {
  res.statusCode(404).send({
    status: 'error',
    message: 'Not found',
  });
});

//Middleware para la gestion de errores
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

app.listen(3000, () => {
  console.log('Servidor funcionando!');
});
