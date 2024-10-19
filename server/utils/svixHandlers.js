const User = require('../models/user');

exports.handleUserCreated = async (data) => {
  const { id: clerkId, email_addresses } = data;
  const primaryEmail = email_addresses.find(email => email.id === data.primary_email_address_id).email_address;
  await User.create({ clerkId, email: primaryEmail });
};

exports.handleUserUpdated = async (data) => {
  const { id: clerkId, email_addresses } = data;
  const primaryEmail = email_addresses.find(email => email.id === data.primary_email_address_id).email_address;
  await User.findOneAndUpdate({ clerkId }, { email: primaryEmail });
};

exports.handleUserDeleted = async (data) => {
  const { id: clerkId } = data;
  await User.findOneAndDelete({ clerkId });
};
