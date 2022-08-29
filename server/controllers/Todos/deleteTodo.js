import Todo from '../../models/todoModel'

const deleteTodo = async (request, response, id) => {
  try {
    const todo = await Todo.findByIdAndDelete(id)
    console.log('todo was deleted')
    return response.end(200, JSON.stringify(todo))
  } catch (err) {
    console.log(err.message)
    return response.end(404, JSON.stringify(err.message))
  }
}

export default deleteTodo
