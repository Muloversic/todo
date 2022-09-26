import Todo from '../../models/todoModel'

const postTodo = async (ctx) => {
  try {
    const { name, active } = ctx.request.body
    const { _id: userId } = ctx.state.user
    if (!(name && name.trim()) || typeof active !== 'boolean') {
      console.log('invalid data came while creating new todo')
      ctx.notFound('invalid data')
      return
    }

    const newTodo = await Todo.create({ name, active, userId })
    console.log('New todo was created')
    ctx.resolve({ newTodo })
    ctx.sendEvent({ type: 1, data: { newTodo } }, { creator: ctx.state.user })
  } catch (err) {
    console.log('post todo error:', err.message)
    ctx.notFound(err.message)
  }
}

export default postTodo
