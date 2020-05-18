const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  },
  chats: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Chat'
    }
  ]
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');