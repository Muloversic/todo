import mongoose from 'mongoose'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import koaCors from 'koa-cors'
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
const app = new Koa()
app.use(koaCors())
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

// const server = http.createServer()
// server.on('request', async (request, response) => {
//   response.setHeader('Access-Control-Allow-Origin', '*')
//   response.setHeader('Content-Type', 'application/json')
//   response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
//   router(request, response)
// })

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
