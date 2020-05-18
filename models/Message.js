const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
  chat: {
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  }
});

mongoose.model('Message', MessageSchema);

module.exports = mongoose.model('Message');