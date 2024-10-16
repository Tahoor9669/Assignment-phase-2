const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    default: ['User'], // Default role is 'User'
    enum: ['User', 'GroupAdmin', 'SuperAdmin'], // Allowed roles
  },
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group', // Refers to the Group model (we will create this model later)
  }],
});

module.exports = mongoose.model('User', userSchema);
