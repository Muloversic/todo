import Todo from '../../models/todoModel'

const postTodo = async (ctx) => {
  try {
    const { name, active, userId } = ctx.request.body

    if (!(name && name.trim()) || typeof active !== 'boolean') {
      console.log('invalid data came while creating new todo')
      ctx.notFound('invalid data')
      return
    }

    const newTodo = await Todo.create({ name, active, userId })
    console.log('New todo was created')
    ctx.resolve(newTodo)
  } catch (err) {
    console.log('post todo error:', err.message)
    ctx.notFound(err.message)
  }
}

export default postTodo
