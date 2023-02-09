require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

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

const { authUser } = require('./middlewares/auth');

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('./uploads'));

//Endpoints
//usuarios
app.post('/user', newUserEndpoint);
app.get('/user/:id', getUserEndpoint);
app.post('/login', loginEndpoint);

//notas
app.get('/', getNotesEndpoint);
app.post('/', authUser, newNoteEndpoint);
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
