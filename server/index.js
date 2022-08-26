import http from 'http'
import mongoose from 'mongoose'
import router from './router'

const db = 'mongodb://localhost:27017/todo'
const connectDb = async () => {
  try {
    await mongoose.connect(db)
    console.log('connected to DB')
  } catch (err) {
    console.error(err)
  }
}
connectDb()

const PORT = 8080
const server = http.createServer()
server.on('request', async (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Content-Type', 'application/json')
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  router(request, response)
})

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
