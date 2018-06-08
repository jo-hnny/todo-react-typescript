import { readJson, saveJson } from '../../storage'

export interface ITodo {
  content: string
  type: string
  status: boolean
}

const DEL_TODO = 'DEL_TODO'

const ADD_TODO = 'ADD_TODO'

const CHANGE_TODO_STATUS = 'CHANGE_TODO_STATUS'

export const delTodo = (index: number) => {
  return {
    type: DEL_TODO,
    payload: index
  }
}

export const addTodo = (todo: ITodo) => {
  return {
    type: ADD_TODO,
    payload: todo
  }
}

export const changeTodoStatus = (payload: { index: number; type: string }) => {
  return {
    type: CHANGE_TODO_STATUS,
    payload
  }
}

interface IState {
  todoList: ITodo[]
}

const defaultState: IState = readJson('todo') || {
  todoList: [{ content: 'hello', type: '默认', status: true }]
}

export default (state = defaultState, { type, payload }: any): IState => {
  let newState: IState
  switch (type) {
    case DEL_TODO:
      newState = {
        ...state,
        todoList: state.todoList.filter((_, index) => index !== payload)
      }
      break
    case CHANGE_TODO_STATUS:
      newState = {
        ...state,
        todoList: [
          ...state.todoList.filter((todo: ITodo) => todo.type !== payload.type),
          ...state.todoList
            .filter((todo: ITodo) => todo.type === payload.type)
            .map((item: ITodo, index: number) => {
              return index === payload.index
                ? { ...item, status: !item.status }
                : item
            })
        ]
      }
      break
    case ADD_TODO:
      newState = {
        ...state,
        todoList: [...state.todoList, payload]
      }
      break
    default:
      newState = { ...state }
  }
  saveJson('todo', newState)
  return newState
}
