const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  }
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');