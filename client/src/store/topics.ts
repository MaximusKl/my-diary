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
		removeTopic(state, id) {
			// state.topics = state.topics.filter(topic => topic._id !== id)
			console.log('Id to remove: ' + id)
			const ind = state.topics.findIndex(topic => topic._id === id)
			if (ind >= 0) {
				console.log('Remove index: ' + ind)
				state.topics.splice(ind, 1)
			}
			console.log('Topics: ' + JSON.stringify(state.topics))
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
		async removeTopic({ dispatch }, id) {
			try {
				const res = await apiClient.delete(`/record/${id}`)
				if (res.status >= 200 && res.status < 300) {
					// const result = res.data
					// console.log(`Result: ${JSON.stringify(result)}`)
					// commit('removeTopic', id)
					await dispatch('loadTopics')
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
