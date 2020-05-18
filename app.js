const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { url } = require('./config/db');
const app = express();
const http = require('http');
const io = require('socket.io')(http);
// Services
const chatsService = require('./services/chats');
// Routes
const UserController = require('./routes/user');
const ChatsController = require('./routes/chats');
const MessagesController = require('./routes/messages');

const SocketListeners = require('./socket/listeners');
const SocketEmitters = require('./socket/emitters');

const ROUTES = {
  users: '/api/users',
  chats: '/api/chats',
  messages: '/api/messages',
};

const PORT = 3000;

// Init App
async function initApp() {
  try {
    const globalChat = await chatsService.isGlobalChatExist();
    if (globalChat) return Promise.resolve();

    await chatsService.createChat({ name: chatsService.GLOBAL_CHAT_NAME });

  } catch (err) {
    return Promise.reject(err);
  }
}

app.use(cors());
app.use(express.json());

// Connect to DB
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Mongo connected success'))
  .then(initApp)
  .then(() => console.log('App init success'))
  .catch(err => console.log(err));

// Routes
app.use(ROUTES.users, UserController);
app.use(ROUTES.chats, ChatsController);
app.use(ROUTES.messages, MessagesController);

io.on('connection', (socket) => {
  // Join chat
  socket.on(SocketListeners.JOIN_CHAT, () => {
    console.log(SocketListeners.JOIN_CHAT);
    // emit
  });

  //Select chat
  socket.on(SocketListeners.SELECT_CHAT, () => {
    console.log(SocketListeners.SELECT_CHAT);
  });

  socket.on(SocketListeners.USER_TYPING, () => {
    console.log(SocketListeners.USER_TYPING);
    // emit
  });

  // New message
  socket.on(SocketListeners.NEW_MESSAGE, () => {
    console.log(SocketListeners.NEW_MESSAGE);
    // emit
  });
});

app.listen(PORT, () => {``
  console.log(`Server up and running, PORT: ${PORT}`);
});