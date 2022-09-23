import mongoose from 'mongoose'
import Koa from 'koa'
import KoaLogger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import cors from '@koa/cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import todosRouter from './routers/todosRouter'
import usersRouter from './routers/usersRouter'
import configs from './configs'
import { responseHelpers } from './middlewares'

const connectDb = async () => {
  try {
    await mongoose.connect(configs.mongo_URL)
    console.log('connected to DB')
  } catch (err) {
    console.error(err)
  }
}

function runKoa() {
  const app = new Koa()
  const router = Router()
  app.use(cors())
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
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  })

  io.on('connection', (socket) => {
    app.context.socketIO = socket
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
