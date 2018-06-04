import { createStore, combineReducers } from 'redux'
import type from './modules/type.reducer'
import todo from './modules/todo.reducer'

const reducer = combineReducers({
  type,
  todo
})

export default createStore(reducer)
