const Message = require('../models/Message');

async function getChatMessages(chatId) {
  try {
    const messages = await Message.find({ chat: chatId })
      .populate('user', ['firstName', 'lastName']);

    return messages;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function newMessage({ chat, user, text }) {
  try {
    const newMessage = {
      chat,
      user,
      text,
      time: Date.now()
    }

    const messages = await Message.create(newMessage)

    return messages;
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  getChatMessages,
  newMessage
}