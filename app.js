const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { url } = require('./config/db');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
// Services
const chatsService = require('./services/chats');
const userService = require('./services/users');
const messagesService = require('./services/messages');
// Routes
const UserController = require('./routes/user');
const ChatsController = require('./routes/chats');
const MessagesController = require('./routes/messages');
// Socket
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
  console.log('user connected')
  // Join chat
  socket.on(SocketListeners.JOIN_CHAT, async ({chatId, userId, userName}) => {
    try {
      await userService.userJoinChat(chatId, userId);
      socket.join(chatId);
      io.in(chatId).emit(
        SocketEmitters.NEW_USER_JOIN,
        { userName, userId }
      )
      console.log(chatId, userId, userName)
    } catch (err) {
      console.log(err);
    }
  });

  socket.on(SocketListeners.SELECT_CHAT, ({ chatId }) => {
    socket.join(chatId);
  });

  socket.on(SocketListeners.USER_TYPING, ({ chatId }) => {
    io.in(chatId).emit(
      SocketEmitters.USER_TYPING,
      { chatId }
    );
  });

  socket.on(SocketListeners.NEW_MESSAGE, async ({ chatId, userId, text }) => {
    try {
      const message = await messagesService.newMessage({ chat: chatId, user: userId, text });
      io.in(chatId).emit(
        SocketEmitters.NEW_MESSAGE,
        message
      );
    } catch (err) {
      console.log(err);
    }
  });
});

http.listen(PORT, () => {``
  console.log(`Server up and running, PORT: ${PORT}`);
});