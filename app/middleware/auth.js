const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

const authErrors = {
  'base': `Error on authentication: `,
  'notFound': `No authorization header found, use the Bearer Token given by '/auth/authenticate'.`,
  'invalidHeader': `Invalid authorization header, use the Bearer Token given by '/auth/authenticate'.`,
  'invalidToken': `Invalid token, use the Bearer Token given by '/auth/authenticate'.`
}

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  let error

  if (!authHeader) {
    error = authErrors.base + authErrors.notFound
  }

  const parts = authHeader.split(' ')
  if (parts.length !== 2) {
    error = authErrors.base + authErrors.invalidHeader
  }

  const [ scheme, token ] = parts
  const bearerRegex = /^Bearer$/i
  if (!bearerRegex.test(scheme)) {
    error = authErrors.base + authErrors.invalidHeader
  }

  if (error) {
    console.log(error)
    return res.status(401).send({ error })
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      const error = authErrors.base + authErrors.invalidToken
      console.log(error, err)

      return res.status(401).send({ error })
    }

    req.userId = decoded.id
    return next()
  })
}

module.exports = authMiddleware