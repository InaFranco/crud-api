const express = require('express')

const authMiddleware = require('../middleware/auth')

const usersRouter = express.Router();
usersRouter.use(authMiddleware)

usersRouter.get('/', (req, res) => {
  const message = 'Ok'
  console.log(message)

  return res.send({ message, userId: req.userId })
})

module.exports = usersRouter
