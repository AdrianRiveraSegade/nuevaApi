const { generateError } = require('../helpers');
const { getConnection } = require('./db');

const createNote = async (userId, text, image = '') => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
    INSERT INTO notes (user_id, text, image)
    VALUES(?, ?, ?)
    `,
      [userId, text, image]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createNote,
};
