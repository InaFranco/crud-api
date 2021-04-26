const express = require('express')
const authRouter = require('./controller/auth')
const userRouter = require('./controller/user')
const port = process.env.PORT

const app = express()

app.use(express.json())

app.use('/auth', authRouter)
app.use('/user', userRouter)

app.get('/status', (req, res) => {
  res.json({ message: 'OK' })
})

app.listen(port, () => {
  console.log(`Crud-API initialized and listening on http://localhost:${port}`)
})