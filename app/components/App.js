import TodoForm from './TodoForm.js'
import Todos from './Todos.js'
import Sagas from '../store/Sagas.js'
import eventEmitter from '../store/EventEmitter.js'
import { ADD_TODO_REQUEST, LOAD_TODO_REQUEST } from '../constants.js'

const todoForm = new TodoForm()
const todos = new Todos()
const sagas = new Sagas()

class App {
  render() {
    const app = document.querySelector('#app')
    const form = todoForm.render()
    app.append(form)
    eventEmitter.emit({
      type: LOAD_TODO_REQUEST,
      payload: 'all',
    })
  }
}

export default App
