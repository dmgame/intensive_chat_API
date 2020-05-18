const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const messagesService = require('../services/messages');

/**
 * @route /api/messages/chat/:id
 * @description ...
 * @private
 */
router.get('/chat/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await messagesService.getChatMessages(id);
    res.status(200).send(messages);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;