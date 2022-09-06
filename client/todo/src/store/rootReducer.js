import { combineReducers } from 'redux'
import { todo, filter } from '../reducers/todo'

const rootReducer = combineReducers({
  todo,
  filter,
})

export default rootReducer
