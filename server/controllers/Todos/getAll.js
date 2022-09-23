import Todo from '../../models/todoModel'

const getAllTodos = async (ctx) => {
  try {
    const { _id: userId } = ctx.state.user
    const { active } = ctx.query
    const filter = { userId }
    if (active) {
      filter.active = active
    }

    const todos = await Todo.find(filter)
    console.log('all todos were got')
    ctx.resolve({ todos })
    ctx.sendIvent({ todos })
  } catch (err) {
    console.log('error while trying to get all todos:', err.message)
    ctx.notFound(err.message)
  }
}

export default getAllTodos
