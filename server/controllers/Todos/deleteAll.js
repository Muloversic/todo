import Todo from '../../models/todoModel'

const deleteAllTodo = async (ctx) => {
  try {
    const todos = await Todo.deleteMany()
    console.log('all todos were deleted')
    ctx.resolve(todos)
  } catch (err) {
    console.log('delete all todo err:', err.message)
    ctx.notFound(err.message)
  }
}

export default deleteAllTodo
