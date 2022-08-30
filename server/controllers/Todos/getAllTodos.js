import Todo from '../../models/todoModel'

const getAllTodos = async (ctx) => {
  try {
    const { active } = ctx.query
    const filter = {}
    if (active) {
      filter.active = active
    }

    const todos = await Todo.find(filter)
    console.log('all todos were got')
    ctx.status = 200
    ctx.body = todos
  } catch (err) {
    console.log('error while trying to get all todos:', err.message)
    ctx.body = err.message
  }
}

export default getAllTodos
