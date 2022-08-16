import TodoForm from './TodoForm.js'
import Todos from './Todos.js'
const todoForm = new TodoForm()
const todos = new Todos()

class App {
  render = () => {
    const app = document.querySelector('#app')
    const form = todoForm.render()
    app.append(form)
  }
}

export default App
