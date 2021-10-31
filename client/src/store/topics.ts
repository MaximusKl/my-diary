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
		editTopic(state, topic) {
			const ind = state.topics.findIndex(t => t._id === topic._id)
			if (ind >= 0) {
				state.topics[ind] = topic
			}
		},
		removeTopic(state, id) {
			state.topics = state.topics.filter(topic => topic._id !== id)
			// const ind = state.topics.findIndex(topic => topic._id === id)
			// if (ind >= 0) {
			// 	state.topics.splice(ind, 1)
			// }
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
				const res = await apiClient.post(`/record`, JSON.stringify(topic))
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
		async editTopic({ commit }, topic) {
			try {
				const res = await apiClient.patch(`/record/${topic._id}`, JSON.stringify(topic))
				if (res.status >= 200 && res.status < 300) {
					const result = res.data
					// console.log(`Result: ${JSON.stringify(result)}`)
					commit('editTopic', result)
				} else {
					console.log(`Error: ${res.status}`)
					const result = res.data
					console.log(`Error: ${result.message}`)
				}
			} catch (e) {
				console.log(e)
			}
		},
		async removeTopic({ commit }, id) {
			try {
				const res = await apiClient.delete(`/record/${id}`)
				if (res.status >= 200 && res.status < 300) {
					// const result = res.data
					// console.log(`Result: ${JSON.stringify(result)}`)
					commit('removeTopic', id)
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
		topic: s => id => {
			return s.topics.find(topic => topic._id === id)
		},
	},
}
