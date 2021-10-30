import axios, { AxiosInstance } from 'axios'
import router from '../router'

const apiClient: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL as string,
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
	validateStatus: null, // Для того, чтобы Promise не выдавал reject в случае ошибочного статуса
})

// Add a request interceptor
apiClient.interceptors.request.use(
	function (config) {
		const token = localStorage.getItem('AuthToken')
		if (token) {
			if (config.headers) {
				config.headers['Authorization'] = `Bearer ${token}`
			} else {
				config.headers = { Authorization: `Bearer ${token}` }
			}
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

apiClient.interceptors.response.use(
	response => {
		if (response.status === 401) {
			router.push('/login')
		}
		return response
	},
	function (error) {
		return Promise.reject(error)
	}
)

export default apiClient
