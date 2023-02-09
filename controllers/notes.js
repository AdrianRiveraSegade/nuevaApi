const { createNote } = require('../db/notas');
const { generateError } = require('../helpers');

const getNotesEndpoint = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};
const newNoteEndpoint = async (req, res, next) => {
  try {
    console.log(req.body);
    const { text } = req.body;

    if (!text) {
      throw generateError('Debe haber texto en la nota creada', 400);
    }

    const id = await createNote(req.userId, text);
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
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};
const deleteNoteEndpoint = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
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
