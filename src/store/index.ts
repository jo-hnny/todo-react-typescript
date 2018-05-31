import { createStore, combineReducers } from 'redux'
import type from './modules/type.reducer'

const reducer = combineReducers({
  type
})

export default createStore(reducer)
