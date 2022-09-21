import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
})

instance.interceptors.request.use((config) => {
  const userStore = JSON.parse(localStorage.getItem('userStore'))
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
    const userStore = JSON.parse(localStorage.getItem('userStore'))
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      try {
        originalRequest._isRetry = true
        const response = await axios.post('http://localhost:8080/auth/refresh', {
          refreshToken: userStore.refreshToken,
        })
        const { data } = response.data
        const { accessToken } = data
        localStorage.setItem(
          'userStore',
          JSON.stringify({
            ...userStore,
            token: accessToken,
            authenticated: true,
          }),
        )
        return instance.request(originalRequest)
      } catch (err) {
        console.log('No auth', err)
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  },
)

export default instance
