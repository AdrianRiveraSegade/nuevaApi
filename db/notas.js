const { generateError } = require('../helpers');
const { getConnection } = require('./db');

const deleteNoteById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
   DELETE FROM notes WHERE id = ?`,
      [id]
    );

    return;
  } finally {
    if (connection) connection.release();
  }
};

const getNoteById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
   SELECT * FROM notes WHERE id = ?`,
      [id]
    );

    if (result.length === 0) {
      throw generateError(`la nota con la id: &{id} no existe`, 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

const getAllNotes = async (id_user, search) => {
  let connection;

  let result;

  try {
    connection = await getConnection();
    if (search) {
      [result] = await connection.query(
        `
        SELECT *
        FROM notes
        WHERE user_id = ? AND (text LIKE ? OR title LIKE ?)
        ORDER BY created_at DESC
        `,
        [id_user, `${search}`, `${search}`]
      );
    } else {
      [result] = await connection.query(
        `
        SELECT *
        FROM notes
        WHERE user_id = ?
        ORDER BY created_at DESC
        `,
        [id_user]
      );
    }

    return result;
  } finally {
    if (connection) connection.release();
  }
};

const createNote = async (userId, text, image, title = '') => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
    INSERT INTO notes (user_id, text, image, title)
    VALUES(?, ?, ?, ?)
    `,
      [userId, text, image, title]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  deleteNoteById,
};
