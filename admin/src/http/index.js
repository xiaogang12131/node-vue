import axios from 'axios'
import router from '../router'
import {
  Message
} from 'element-ui'


const http = axios.create({
  baseURL: 'http://localhost:3000',
})

http.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const {
      data,
      status
    } = error.response
    if (data) {
      Message({
        type: 'error',
        message: data.message,
      })
    }
    if (status === 401) {
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
export default http