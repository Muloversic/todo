import mongoose from 'mongoose'
import Koa from 'koa'
import KoaLogger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import cors from '@koa/cors'
import todosRouter from './router'
import configs from './configs'

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
  router.use('/todos', ...todosRouter())
  app.use(router.routes())
  return app
}

function serve() {
  const server = runKoa()
  connectDb()
  server.listen(configs.PORT, () => {
    console.log(`Server is running on http://localhost:${configs.PORT}`)
  })
}

serve()
