import { readJson, saveJson } from '../../storage'

const ADD_TYPE = 'ADD_TYPE'
const DELETE_TYPE = 'DELETE_TYPE'
const CHANGE_CURRENT_TYPE = 'CHANGE_CURRENT_TYPE'

interface IState {
  types: string[]
  currentType: string
}

const defaultState: IState = readJson('type') || {
  types: ['默认'],
  currentType: '默认'
}

export const addType = (type: string) => ({
  type: ADD_TYPE,
  payload: type
})

export const deleteType = (index: number) => ({
  type: DELETE_TYPE,
  payload: index
})

export const changeCurrentType = (type: string) => ({
  type: CHANGE_CURRENT_TYPE,
  payload: type
})

export default (state = defaultState, { type, payload }: any): IState => {
  let newState: IState
  switch (type) {
    case ADD_TYPE:
      newState = {
        ...state,
        types: [...state.types, payload]
      }
      break
    case DELETE_TYPE:
      newState = {
        ...state,
        types: [...state.types.filter((_, index) => index !== payload)]
      }
      break
    case CHANGE_CURRENT_TYPE:
      newState = {
        ...state,
        currentType: payload
      }
      break
    default:
      newState = { ...state }
  }
  saveJson('type', newState)
  return newState
}
