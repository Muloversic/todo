import { Schema, model } from 'mongoose'

const Todo = new Schema(
  {
    name: { type: String, required: true },
    active: { type: Boolean, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true, versionKey: false },
)

export default model('Todo', Todo)
