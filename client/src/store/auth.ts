import apiClient from '../api/axios'

const errorLocalizations = {
	'no login data': 'Заполните поля',
	'wrong login data': 'Неправильные данные для входа',
	'user not found': 'Пользователь не найден',
}

export default {
	namespaced: true,
	state: () => ({
		token: null,
		error: null,
	}),
	mutations: {
		setToken(state, token) {
			state.token = token
			if (token === null) {
				localStorage.removeItem('AuthToken')
			} else {
				localStorage.setItem('AuthToken', token)
			}
		},
		setError(state, message) {
			state.error = message
		},
	},
	actions: {
		async login({ commit }, user) {
			try {
				const res = await apiClient.post('/auth/login', JSON.stringify(user))
				if (res.status >= 200 && res.status < 300) {
					const result = res.data
					commit('setToken', result.token)
				} else {
					const result = res.data
					commit('setError', result.message)
				}
			} catch (e) {
				console.log(e)
			}
		},
		logout({ commit }) {
			commit('setToken', null)
		},
		setError({ commit }, message) {
			commit('setError', message)
		},
	},
	getters: {
		token: s => s.token,
		isLoggedIn: s => s.token !== null,
		error: s => {
			return errorLocalizations[s.error] || s.error
		},
	},
}
