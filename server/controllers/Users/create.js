import userModel from '../../models/userModel'

const createUser = async (ctx) => {
  try {
    const { name, password } = ctx.request.body
    console.log(ctx.request.body)
    if (!name || name.trim() === '') {
      console.log('invalid user nickname came while registration')
      ctx.notFound('invalid user nickname')
      return
    }

    if (!password || password.length < 4 || password.length > 13) {
      console.log('invalid user password came while registration')
      ctx.notFound('invalid user password')
      return
    }

    const candidate = await userModel.findOne({ name })
    if (candidate) {
      console.log('User already exists')
      ctx.notFound('User already exists')
      return
    }

    ctx.resolve(ctx.request.body)
  } catch (err) {
    console.log('create user:', err.message)
    ctx.notFound(err.message)
  }
}

export default createUser
