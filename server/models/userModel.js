import mongoose from 'mongoose'

const User = new mongoose.Schema(
  {
    nickname: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
)

export default mongoose.model('User', User)
