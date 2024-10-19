const Note = require('../models/note');
const User = require('../models/user');
const { UPLOAD_NOTES_CREDITS } = require('../config/constants');

exports.createNote = async (req, res) => {
  const { title, content, skill } = req.body;
  const note = await Note.create({ userId: req.userId, title, content, skill });
  
  await User.findByIdAndUpdate(req.userId, { $inc: { credits: UPLOAD_NOTES_CREDITS } });
  
  res.status(201).json({ message: 'Note created and credits added', note });
};

exports.getNotes = async (req, res) => {
  const notes = await Note.find({ userId: req.userId });
  res.json(notes);
};
