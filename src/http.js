import axios from 'axios'
import { message } from 'antd'
let instance = axios.create({
  baseURL: 'http://localhost:3030'
})
instance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers.token = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
instance.interceptors.response.use(
  response => {
    console.log(response)
    if (response.status < 300) {
      return response
    } else {
      switch (response.status) {
        case 401:
          console.log(response.data)
      }
    }
    return response
  },
  error => {
    if (error.response && error.response.data && error.response.data.message) {
      message.error(error.response.data.message)
    } else {
      message.error(error.message)
    }
    return Promise.reject(error.response)
  }
)
export default instance
