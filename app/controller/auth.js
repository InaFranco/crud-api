const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth')
const User = require('../model/user')

function generateToken(userId) {
  return jwt.sign(
    { id: userId },
    authConfig.secret,
    { expiresIn: 60 * 60 * 6 }
  )
}

const authRouter = express.Router();
authRouter.post('/signup', async (req, res) => {
  try {
    const { email } = req.body

    if (await User.findOne({ email })) {
      const error = `Error on registration: This email is already in use.`
      console.log(error)

      return res.status(400).send({ error })
    }

    const user = await User.create(req.body)
    const token = generateToken(user.id)

    const message = `User '${ user.name }' has been created. Use the token provided to access crud-api.`
    console.log(message)

    return res.send({ message, token })
  } catch (err) {
    const error = 'Error on registration: Failed.'
    console.log(error, err)

    return res.status(400).send({ error })
  }
})

authRouter.post('/login', async (req, res) => {
  const { name, email, password } = req.body
  let user

  try {
    if (email) {
      user = await User.findOne({ email }).select('+password')
    } else if (name) {
      user = await User.findOne({ name }).select('+password')
    } else {
      const error = `Error on authentication: User email not found.`
      console.log(error, err)
  
      return res.status(404).send({ error })  
    }
  } catch (err) {
    const error = `Error on authentication: Failed to get user from database.`
    console.log(error, err)

    return res.status(404).send({ error })
  }

  if (!user) {
    const error = `Error on authentication: User not found.`
    console.log(error)

    return res.status(404).send({ error })
  }

  if (!await bcrypt.compare(password, user.password)) {
    const error = `Error on authentication: Invalid password.`
    console.log(error)

    return res.status(400).send({ error })
  }

  const token = generateToken(user.id)

  const message = `User '${ user.name }' has been authenticated. Use the token provided to access crud-api.`
  console.log(message)

  return res.send({ message, token })
})

module.exports = authRouter