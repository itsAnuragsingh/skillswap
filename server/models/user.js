const mongoose = require('mongoose');
const { WELCOME_CREDITS } = require('../config/constants');

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  credits: { type: Number, default: WELCOME_CREDITS },
  skills: [{ type: String }],
  interests: [{ type: String }],
  lastLoginDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
