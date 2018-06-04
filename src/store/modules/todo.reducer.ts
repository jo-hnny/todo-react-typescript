const DEL_TODO = 'DEL_TODO'

const CHANGE_TODO_STATUS = 'CHANGE_TODO_STATUS'

export const delTodo = (index: number) => {
  return {
    type: DEL_TODO,
    payload: index
  }
}

export const changeTodoStatus = (index: number) => {
  return {
    type: CHANGE_TODO_STATUS,
    payload: index
  }
}

export interface ITodo {
  content: string
  type: string
  status: boolean
}

interface IState {
  todoList: ITodo[]
}

const defaultState: IState = {
  todoList: []
}

export default (state = defaultState, { type, payload }: any): IState => {
  switch (type) {
    case DEL_TODO:
      return {
        ...state,
        todoList: state.todoList.filter((_, index) => index !== payload)
      }
    case CHANGE_TODO_STATUS:
      return {
        ...state,
        todoList: state.todoList.map((item, index) => {
          return index === payload ? { ...item, status: !item.status } : item
        })
      }
    default:
      return { ...state }
  }
}
