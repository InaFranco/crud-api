const mongoose = require('../database')
const bcrypt = require('bcryptjs')

const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
    require: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message