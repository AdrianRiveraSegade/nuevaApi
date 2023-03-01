const {
  createNote,
  getAllNotes,
  getNoteById,
  deleteNoteById,
} = require('../db/notas');
const { generateError, createPathIfNotExists } = require('../helpers');
const path = require('path');
const sharp = require('sharp');
const { v4: uuid } = require('uuid');

const getNotesEndpoint = async (req, res, next) => {
  try {
    const notes = await getAllNotes();
    res.send({
      status: 'ok',
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};
const newNoteEndpoint = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      throw generateError('Debe haber texto en la nota creada', 400);
    }

    let nombreImagen;

    if (req.files && req.files.image) {
      //creamos el path
      const uploadsDir = path.join(__dirname, '../uploads');

      //creamos el directorio si no existe
      await createPathIfNotExists(uploadsDir);
      //procesamos la imagen
      const image = sharp(req.files.image.data);
      image.resize(750);

      //guardamos la imagen con nombre random

      nombreImagen = `${uuid(50)}.jpg`;

      await image.toFile(path.join(uploadsDir, nombreImagen));
    }

    const id = await createNote(req.userId, text, nombreImagen);

    res.send({
      status: 'ok',
      message: `Nota con id: ${id} creada`,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleNoteEndpoint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await getNoteById(id);
    res.send({
      status: 'ok',
      data: note,
    });
  } catch (error) {
    next(error);
  }
};
const deleteNoteEndpoint = async (req, res, next) => {
  try {
    const { id } = req.params;

    //sacamos la informacion de la nota a borrar

    const note = await getNoteById(id);

    //comprobamos que el usuario que quiere borrar, es el creador de la nota

    if (req.userId !== note.user_id) {
      throw generateError('Esta nota no es tuya, no puedes borrarlo', 401);
    }

    //borramos la nota
    await deleteNoteById(id);
    res.send({
      status: 'ok',
      message: `La nota con la id: ${id} se borro correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotesEndpoint,
  newNoteEndpoint,
  getSingleNoteEndpoint,
  deleteNoteEndpoint,
};
