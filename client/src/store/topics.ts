import apiClient from '../api/axios'

export default {
	state: {
		topics: [],
	},
	mutations: {
		setTopics(state, topics) {
			state.topics = topics
		},
		addTopic(state, topic) {
			state.topics.unshift(topic)
		},
	},
	actions: {
		async loadTopics({ commit }) {
			try {
				const res = await apiClient.get('/record')
				if (res.status >= 200 && res.status < 300) {
					const result = res.data
					// console.log(`Result: ${JSON.stringify(result)}`)
					commit('setTopics', result)
				} else {
					console.log(`Error: ${res.status}`)
					const result = res.data
					console.log(`Error: ${result.message}`)
				}
			} catch (e) {
				console.log(e)
			}
		},
		async addTopic({ commit }, topic) {
			try {
				const res = await apiClient.post('/record', JSON.stringify(topic))
				if (res.status >= 200 && res.status < 300) {
					const result = res.data
					// console.log(`Result: ${JSON.stringify(result)}`)
					commit('addTopic', result)
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
		topics: s => s.topics,
	},
}
