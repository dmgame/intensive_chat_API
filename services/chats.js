const Chat = require('../models/Chat');
const { populate } = require('../models/Chat');

const GLOBAL_CHAT_NAME = 'Global';
const CHAT_TYPES = {
  public: 'public'
}

async function isGlobalChatExist() {
  try {
    const chat = await Chat.findOne({ name: GLOBAL_CHAT_NAME });
    return chat;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function createChat(data) {
  try {
    const chat = await Chat.create(data);
    return chat;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getChat(id) {
  try {
    const chat = await Chat.findById(id);
    return chat;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getPublicChats() {
  try {
    const chat = await Chat.find({ type: CHAT_TYPES.public })
      .populate('lastMessage')
    return chat;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function setLastMessage(chatId, messageId) {
  try {
    await Chat.findByIdAndUpdate(chatId, { lastMessage: messageId })
    return true;
  } catch (err) {
    return Promise.reject(err);
  }
}


module.exports = {
  isGlobalChatExist,
  createChat,
  getChat,
  getPublicChats,
  setLastMessage,
  GLOBAL_CHAT_NAME
}