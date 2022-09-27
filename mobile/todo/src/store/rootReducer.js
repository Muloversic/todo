import { combineReducers } from 'redux'
import { todo, filter } from './reducers/todo'
import { user, userError } from './reducers/user'

const rootReducer = combineReducers({
  todo,
  filter,
  user,
  userError,
})

export default rootReducer
