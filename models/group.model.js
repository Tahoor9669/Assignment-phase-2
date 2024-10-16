const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the user who created the group
    required: true,
  },
  channels: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel',  // Reference to channels in this group
  }],
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to users in this group
  }]
});

module.exports = mongoose.model('Group', groupSchema);
