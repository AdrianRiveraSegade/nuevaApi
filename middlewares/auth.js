const { generateError } = require('../helpers');
const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw generateError('Falta la cabecera de autorizacion', 401);
    }

    //comprobamos que el token es correcto
    let token;
    try {
      token = jwt.verify(authorization, process.env.SECRET);
    } catch {
      throw generateError('Token no valido', 401);
    }

    console.log(token);
    //usamos el token
    req.userId = token.id;

    //saltamos al controlador
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authUser,
};
