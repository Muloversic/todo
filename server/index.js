import mongoose from 'mongoose'
import Koa from 'koa'
import KoaLogger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import cors from '@koa/cors'
import { createServer } from 'http'
import sockets from 'socket.io'
import todosRouter from './routers/todosRouter'
import usersRouter from './routers/usersRouter'
import configs from './configs'
import { responseHelpers, sendEvent } from './middlewares'

const connectDb = async () => {
  try {
    await mongoose.connect(configs.mongo_URL)
    console.log('connected to DB')
  } catch (err) {
    console.error(err)
  }
}

const io = sockets(4000)

function runKoa() {
  const app = new Koa()
  const router = Router()
  app.use(cors())
  app.use(sendEvent(io))
  app.use(bodyParser())
  app.use(KoaLogger())
  app.use(responseHelpers)
  router.use('/auth', ...usersRouter())
  router.use('/todos', ...todosRouter())
  app.use(router.routes())
  return app
}

function serve() {
  const app = runKoa()
  const httpServer = createServer(app.callback())
  io.on('connection', (socket) => {
    socket.on('auth', (userId) => {
      socket.join(userId)
    })

    socket.on('logout', (room) => {
      socket.leave(room)
    })
  })

  io.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`)
  })

  connectDb()
  httpServer.listen(configs.PORT, () => {
    console.log(`Server is running on http://localhost:${configs.PORT}`)
  })
}

serve()
