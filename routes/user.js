const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userService = require('../services/users');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const newUser = {
      email: req.locals.email,
      ...req.body
    };

    const user = await userService.createUser(newUser);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/:email', authMiddleware, async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userService.getUser(email);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
