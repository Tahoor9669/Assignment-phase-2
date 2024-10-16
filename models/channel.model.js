const mongoose = require('mongoose');

// Message Schema
const messageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Channel Schema
const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  messages: [messageSchema]  // Embed message schema inside the messages array
});

module.exports = mongoose.model('Channel', channelSchema);
