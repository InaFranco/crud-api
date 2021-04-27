const express = require('express')

const authMiddleware = require('../middleware/auth')
const Message = require('../model/message')

const collectionsRouter = express.Router()
collectionsRouter.use(authMiddleware)

const availableCollections = {
  'message': Message
}

function getCollectionNotFoundError(collectionName) {
  const collectionsStr = ''
  for (collection in availableCollections) {
    collectionsStr += '\n  - '+ collection
  }
  return `Collection '${collectionName}' not prepared. Available collections:${collectionsStr}`
}

collectionsRouter.post('/:collectionName/create', async (req, res) => {
  const { collectionName } = req.params
  if (!collectionName in Object.keys(availableCollections)) {
    const error = getCollectionNotFoundError(collectionName)
    res.status(400).send({ error })
  }

  const body = req.body
  body.createdBy = req.userId

  try {
    const collection = availableCollections[collectionName]
    const result = await collection.create(body)

    return res.send(result)
  } catch (err) {
    const error = 'Error on create object'
    console.log(err)

    return res.status(400).send({ error })
  }
})

module.exports = collectionsRouter
