import instance from './axiosInstance'

const api = async (path, options) => {
  const response = await instance({
    ...options,
    url: path,
  })

  return response.data
}

export default api
