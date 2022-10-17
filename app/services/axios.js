import axios from 'axios'
import storage from 'services/storage'
import { handleError } from 'services/logger'
import Config from 'root/config'

const BASE_API_URL = `${Config.USE_HTTPS ? 'https' : 'http'}://${
  Config.AVAILABLE_ENVIRONMENTS[Config.SELECTED_ENV]
}/index.php/api`

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
})

axiosInstance.interceptors.request.use(async config => {
  const jwtToken = await storage.getAuthToken()
  if (jwtToken) {
    config.headers.Authorization = `Bearer ${jwtToken}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  async response => response,
  error => {
    handleError(error)
    return Promise.reject(error)
  },
)

export default axiosInstance
