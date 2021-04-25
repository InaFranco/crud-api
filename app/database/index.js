const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${process.env.MONGODB_HOST}/crud-api`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

module.exports = mongoose