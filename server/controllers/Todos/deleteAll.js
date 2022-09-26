import Todo from '../../models/todoModel'

const deleteAllTodo = async (ctx) => {
  try {
    const { _id: userId } = ctx.state.user
    const todos = await Todo.deleteMany({ userId })
    console.log('all todos were deleted')
    ctx.sendEvent({ type: 3, data: todos }, { creator: ctx.state.user })
    ctx.resolve(todos)
  } catch (err) {
    console.log('delete all todo err:', err.message)
    ctx.notFound(err.message)
  }
}

export default deleteAllTodo
