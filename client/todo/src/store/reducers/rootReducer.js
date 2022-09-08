import { combineReducers } from 'redux'
import { todo, filter } from './todo'

const rootReducer = combineReducers({
  todo,
  filter,
})

export default rootReducer
