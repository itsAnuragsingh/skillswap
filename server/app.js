const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { Webhook } = require('svix');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const ideaRoutes = require('./routes/ideaRoutes');
const svixHandlers = require('./utils/svixHandlers');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Webhook verification middleware
const verifyWebhook = async (req, res, next) => {
  const payload = await getRawBody(req);
  const headers = req.headers;

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  try {
    wh.verify(payload, headers);
    req.body = JSON.parse(payload);
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid webhook signature' });
  }
};

// Routes
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/ideas', ideaRoutes);

// Webhook route
app.post('/api/webhook', verifyWebhook, async (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case 'user.created':
      await svixHandlers.handleUserCreated(data);
      break;
    case 'user.updated':
      await svixHandlers.handleUserUpdated(data);
      break;
    case 'user.deleted':
      await svixHandlers.handleUserDeleted(data);
      break;
    default:
      console.log('Unhandled webhook type:', type);
  }

  res.sendStatus(200);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Helper function to get raw body
function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(data);
    });
    req.on('error', reject);
  });
}
