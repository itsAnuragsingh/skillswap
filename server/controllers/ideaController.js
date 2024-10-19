const Idea = require('../models/idea');
const User = require('../models/user');
const { IDEA_SUBMISSION_CREDITS } = require('../config/constants');

exports.submitIdea = async (req, res) => {
  const { title, description } = req.body;
  const idea = await Idea.create({ userId: req.userId, title, description });
  
  await User.findByIdAndUpdate(req.userId, { $inc: { credits: IDEA_SUBMISSION_CREDITS } });
  
  res.status(201).json({ message: 'Idea submitted and credits added', idea });
};

exports.getIdeas = async (req, res) => {
  const ideas = await Idea.find({ userId: req.userId });
  res.json(ideas);
};
