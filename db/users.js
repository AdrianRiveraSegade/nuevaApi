const bcrypt = require('bcrypt');
const { generateError } = require('../helpers');
const { getConnection } = require('./db');

//conseguimos la informacion publica de un usuario
const getUserById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [userID] = await connection.query(
      `
    SELECT id, nickname, created_at FROM users WHERE id = ?`,
      [id]
    );
    if (userID.lenght === 0) {
      throw generateError('El usuario no existe (no existe la id)', 404);
    } //porque no funciona esto? si pido un id de usuario inexistente, sencillamente me da "ok" y ya. HALP
    return userID[0];
  } finally {
    if (connection) connection.release();
  }
};
//Metemos un usuario en la base de datos y obtenemos la id

const createUser = async (nickname, email, password) => {
  let connection;

  try {
    connection = await getConnection();

    //comprobamos que no exista el nickname
    const [nick] = await connection.query(
      `
    SELECT id FROM users WHERE nickname = ?
    `,
      [nickname]
    );
    if (nick.lenght > 0) {
      throw generateError('Nickname no disponible', 409);
    }

    //comprobamos que no exista el correo electronico
    const [mail] = await connection.query(
      `
      SELECT id FROM users WHERE email = ?
      `,
      [email]
    );
    if (mail.lenght > 0) {
      throw generateError('Este email ya esta registrado', 409);
    }

    //encriptamos la contraseña
    const encryptedPassword = await bcrypt.hash(password, 10);

    //creamos el usuario (por fin)
    const [newUser] = await connection.query(
      `
    INSERT INTO users (nickname, email, password) VALUES(?, ?, ?)
    `,
      [nickname, email, encryptedPassword]
    );

    //Conseguimos el id del usuario creado
    return newUser.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createUser,
  getUserById,
};
