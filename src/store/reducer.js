import { USER } from './action-type'
import { combineReducers } from 'redux'
function getUser() {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch (error) {
    return {}
  }
}
function user(state = {}, action) {
  switch (action.type) {
    case USER:
      localStorage.setItem('user', JSON.stringify(action.data))
      return { ...action.data }
    default:
      return { ...getUser() }
  }
}

export const finalReducer = combineReducers({
  user
})
