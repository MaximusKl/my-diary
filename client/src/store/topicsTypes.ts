import apiClient from '../api/axios'

const mapNames = {
	idea: 'Мысль',
	note: 'Заметка',
}

export default {
	state: () => ({
		topicsTypes: [],
	}),
	mutations: {
		setTopicsTypes(state, topicsTypes) {
			state.topicsTypes = topicsTypes.map(t => {
				return { ...t, localizedName: mapNames[t.name] }
			})
		},
	},
	actions: {
		async loadTopicsTypes({ commit }) {
			try {
				const res = await apiClient.get('/record-type')
				if (res.status >= 200 && res.status < 300) {
					const result = res.data
					// console.log(`Result: ${JSON.stringify(result)}`)
					commit('setTopicsTypes', result)
				} else {
					console.log(`Error: ${res.status}`)
					const result = res.data
					console.log(`Error: ${result.message}`)
				}
			} catch (e) {
				console.log(e)
			}
		},
	},
	getters: {
		topicsTypes: s => {
			return s.topicsTypes
		},
		topicType: s => id => {
			return s.topicsTypes.find(topicType => topicType._id === id)
		},
	},
}
