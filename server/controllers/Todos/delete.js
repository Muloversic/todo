import Todo from '../../models/todoModel'

const deleteTodo = async (ctx) => {
  try {
    const { id } = ctx.request.params
    const { _id: userId } = ctx.state.user
    const gotTodo = await Todo.findById(id)
    if (!gotTodo) {
      console.log('todo was not found by id while deleting')
      ctx.notFound('todo was not found')
      return
    }

    if (gotTodo.userId.toString() !== userId) {
      console.log('user not allowed to delete not his todos')
      ctx.noAccess('No permission to delete others todos')
      return
    }

    const todo = await Todo.findByIdAndDelete(id)
    console.log('todo was deleted')
    ctx.sendEvent({ type: 2, data: { todo } }, ctx.state.user)
    ctx.resolve({ todo })
  } catch (err) {
    console.log('error while deleting todo:', err.message)
    ctx.notFound(err.message)
  }
}

export default deleteTodo
