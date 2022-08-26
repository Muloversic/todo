import mongoose from 'mongoose'

const Todo = new mongoose.Schema(
  {
    name: { type: String, required: true },
    active: { type: Boolean, required: true },
  },
  { timestamps: true },
)

export default mongoose.model('Todo', Todo)
