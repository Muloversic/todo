import TodoForm from './TodoForm'
import Todos from './Todos'
import Sagas from '../store/Sagas'
import eventEmitter from '../store/EventEmitter'
import { LOAD_TODO_REQUEST } from '../constants'

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
    })
  }
}

export default App
