import { combineReducers } from 'redux'
import { todo, filter } from './reducers/todo'
import { user } from './reducers/user'

const rootReducer = combineReducers({
  todo,
  filter,
  user,
})

export default rootReducer
