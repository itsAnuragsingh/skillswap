const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { DAILY_LOGIN_CREDITS } = require('../config/constants');

exports.handleClerkWebhook = async (req, res) => {
  const { type, data } = req.body;

  if (type === 'user.created') {
    const { id: clerkId, email_addresses } = data;
    const primaryEmail = email_addresses.find(email => email.id === data.primary_email_address_id).email_address;

    await User.create({ clerkId, email: primaryEmail });
    res.status(201).json({ message: 'User created successfully' });
  } else {
    res.status(200).json({ message: 'Webhook received' });
  }
};

exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

exports.updateUserProfile = async (req, res) => {
  const { skills, interests } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.userId,
    { skills, interests },
    { new: true }
  );
  res.json(updatedUser);
};

exports.dailyLogin = async (req, res) => {
  const user = await User.findById(req.userId);
  const today = new Date().setHours(0, 0, 0, 0);
  
  if (!user.lastLoginDate || user.lastLoginDate.setHours(0, 0, 0, 0) < today) {
    user.credits += DAILY_LOGIN_CREDITS;
    user.lastLoginDate = new Date();
    await user.save();
    res.json({ message: 'Daily login bonus credited', credits: user.credits });
  } else {
    res.json({ message: 'Daily login bonus already claimed', credits: user.credits });
  }
};

exports.getToken = async (req, res) => {
  const { clerkId } = req.body;
  const user = await User.findOne({ clerkId });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};
