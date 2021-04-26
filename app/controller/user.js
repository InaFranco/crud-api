const express = require('express')

const authMiddleware = require('../middleware/auth')
const User = require('../model/user')

const userRouter = express.Router();
userRouter.use(authMiddleware)

userRouter.get('/info', async (req, res) => {
  const { userId } = req

  const user = await User.findOne({ _id: userId })
  return res.send(user)
})

module.exports = userRouter
