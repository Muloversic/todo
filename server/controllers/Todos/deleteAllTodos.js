import Todo from '../../models/todoModel'

const deleteAllTodo = async (ctx) => {
  try {
    const todos = await Todo.deleteMany()
    console.log('all todos were deleted')
    ctx.status = 200
    ctx.body = todos
  } catch (err) {
    console.error(err.message)
    ctx.status = 404
    ctx.body = err.message
  }
}

export default deleteAllTodo
