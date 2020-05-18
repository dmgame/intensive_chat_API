const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const chatsService = require('../services/chats');

/**
 * @route /api/chats/public
 * @description ...
 * @private
 */
router.get('/public', authMiddleware, async (req, res) => {
  try {
    const chats = await chatsService.getPublicChats();
    res.status(200).send(chats);
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
 * @route /api/chats/:id
 * @description ...
 * @private
 */
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await chatsService.getChat(id);
    res.status(200).send(chat);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;