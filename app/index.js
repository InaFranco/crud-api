const express = require('express')
const authRouter = require('./controller/auth')
const userRouter = require('./controller/user')
const collectionsRouter = require('./controller/collections')

const port = process.env.PORT
const app = express()

app.get('/status', (res) => {
  res.json({ message: 'OK' })
})

app.use(express.json())
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/collection', collectionsRouter)

app.listen(port, () => {
  console.log(`Crud-API initialized and listening on http://localhost:${port}`)
})