import axios from 'axios'
import { AsyncStorage } from 'react-native'
import store from '../store/store'
import { CLEAR_USER_STATE } from '../constants'

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
})

instance.interceptors.request.use((config) => {
  //   const userStore = JSON.parse(localStorage.getItem('userStore'))
  const userStore = JSON.parse(AsyncStorage.getItem('userStore'))
  if (!userStore) {
    return config
  }

  config.headers.authorization = `Bearer ${userStore.token}`
  return config
})

instance.interceptors.response.use(
  (confing) => confing,
  async (error) => {
    const originalRequest = error.config
    // const userStore = JSON.parse(localStorage.getItem('userStore'))
    const userStore = JSON.parse(AsyncStorage.getItem('userStore'))
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry &&
      userStore &&
      (error.config.url !== 'login' || error.config.url !== 'registration')
    ) {
      try {
        originalRequest._isRetry = true
        const response = await axios.post('http://localhost:8080/auth/refresh', {
          refreshToken: userStore.refreshToken,
        })
        const { accessToken } = response.data.data
        AsyncStorage.setItem(
          'userStore',
          JSON.stringify({
            ...userStore,
            token: accessToken,
            authenticated: true,
          }),
        )
        // localStorage.setItem(
        //   'userStore',
        //   JSON.stringify({
        //     ...userStore,
        //     token: accessToken,
        //     authenticated: true,
        //   }),
        // )
        return instance.request(originalRequest)
      } catch (err) {
        AsyncStorage.clear()
        // localStorage.clear()
        store.dispatch({ type: CLEAR_USER_STATE })
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  },
)

export default instance
