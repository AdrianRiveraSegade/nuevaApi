const getConnection = require(`../db/db`);

const insertPhoto = async (photo, notes_id) => {
  let connection;

  try {
    connection = await getConnection();
    await connection.query(
      `INSERT INTO photos (name, notes_id, created_at) VALUES (?, ?)`,
      [photo, notes_id]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertPhoto;
