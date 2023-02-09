const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');
const { createUser, getUserById, getUserByEmail } = require('../db/users');

const newUserEndpoint = async (req, res, next) => {
  try {
    const { nickname, email, password } = req.body;

    //Todo este sistema de errores podria hacerse mas compacto, pero queda asi para tener unos errores mucho mas
    //descriptivos que un error generico de "faltan campos"
    if (!nickname) {
      throw generateError('Falta poner un Nickname', 400);
    }

    if (!email) {
      throw generateError('Falta poner un Email');
    }

    if (!password) {
      throw generateError('Falta la contraseña');
    }

    const id = await createUser(nickname, email, password);

    res.send({
      status: 'ok',
      message: `Usuario creado correctamente con la id : ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

const getUserEndpoint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const loginEndpoint = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw generateError('Email o contraseña incorrectas', 400);
    }

    //Conseguir los datos del usuario en base a su email
    const user = await getUserByEmail(email);

    //Comprobamos que tienen la misma contraseña
    const goodPassword = await bcrypt.compare(password, user.password);

    if (!goodPassword) {
      throw generateError('Contraseña o usuario no valido', 401);
    }
    //Creamos el token
    const payload = { id: user.id };

    //Firmamos el token
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: '7d',
    });

    //Enviamos el token

    res.send({
      status: 'ok',
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newUserEndpoint,
  getUserEndpoint,
  loginEndpoint,
};
