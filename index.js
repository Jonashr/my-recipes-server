require('dotenv').config()
const app = require('./app')
const http = require('http')
const server = http.createServer(app)
const PORT = process.env.PORT || 3000

console.log('process.env', process.env.PORT)

server.listen(PORT, () => {
  console.log(`Server now running on port ${PORT}`)
})
