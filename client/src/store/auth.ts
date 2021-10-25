export default {
	state: {
		token: null,
	},
	mutations: {
		setToken(state, token) {
			state.token = token
			if (token === null) {
				localStorage.removeItem('AuthToken')
			} else {
				localStorage.setItem('AuthToken', token)
			}
		},
	},
	actions: {
		async login({ commit }, user) {
			try {
				const url = import.meta.env.VITE_API_URL
				console.log(url)
				const res = await fetch(`${url}/auth/login`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json;charset=utf-8' },
					body: JSON.stringify(user),
				})
				if (res.ok) {
					const result = await res.json()
					console.log(`Result: ${result.token}`)
					commit('setToken', result.token)
				} else {
					console.log(`Error: ${res.statusText}`)
					const result = await res.json()
					console.log(`Error: ${result.message}`)
				}
			} catch (e) {
				console.log(`Error: ${e}`)
			}
		},
		logout({ commit }) {
			commit('setToken', null)
		},
	},
	getters: {
		token: s => s.token,
		isLoggedIn: s => s.token !== null,
	},
}
