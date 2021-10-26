import axios, { AxiosInstance } from 'axios'

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
				config.headers = { Authorization: token }
			}
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

export default apiClient
