const express = require('express')
const postRouter = require('./post/post-router')


const server = express()
server.use(express.json())

server.use('/api/posts', postRouter)















const PORT = 8002
server.listen(PORT, () => console.log('\nAPI RUNNING\n'))