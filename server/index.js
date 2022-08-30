import mongoose from 'mongoose'
import Koa from 'koa'
import KoaLogger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
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
app.use(cors())
app.use(bodyParser())
app.use(KoaLogger())
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
