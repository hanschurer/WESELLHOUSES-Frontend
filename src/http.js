import axios from 'axios'
import { message } from 'antd'
import store from './store/store'
let instance = axios.create({
  baseURL: 'http://localhost:3030',
  withCredentials: true
})
instance.interceptors.request.use(
  config => {
    const token = store.getState().user.token
    if (token) {
      config.headers = config.headers || {}
      config.headers.authorization = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response.status == 401) {
      store.dispatch({
        type: 'USER',
        data: {}
      })
      window.location.href = '/login'
    }
    if (error.response && error.response.data && error.response.data.message) {
      message.error(error.response.data.message)
    } else {
      message.error(error.message)
    }
    return Promise.reject(error.response)
  }
)
export default instance
