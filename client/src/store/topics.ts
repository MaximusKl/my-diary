import apiClient from '../api/axios'
import moment from 'moment'

export default {
	state: () => ({
		topics: [],
	}),
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
		},
	},
	actions: {
		async loadTopics({ commit }) {
			try {
				const res = await apiClient.get('/record')
				if (res.status >= 200 && res.status < 300) {
					const result = res.data
					commit('setTopics', result)
				} else {
					const result = res.data
					throw result.message
				}
			} catch (e) {
				throw e
			}
		},
		async addTopic({ commit }, topic) {
			try {
				const res = await apiClient.post(`/record`, JSON.stringify(topic))
				if (res.status >= 200 && res.status < 300) {
					const result = res.data
					commit('addTopic', result)
				} else {
					const result = res.data
					throw result.message
				}
			} catch (e) {
				throw e
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
					const result = res.data
					throw result.message
				}
			} catch (e) {
				throw e
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
					const result = res.data
					throw result.message
				}
			} catch (e) {
				throw e
			}
		},
	},
	getters: {
		topics: s => filter => {
			return s.topics.filter(topic => {
				// console.log(filter.currentTopicType)
				// По типу записи
				const hasSuitableType = filter.currentTopicType === 'none' || filter.currentTopicType === topic.aType

				// По тегам
				let hasSuitableTag = true
				if (filter.tags.length) {
					hasSuitableTag = false
					let tags = filter.tags.split(' ')
					tags = tags.filter(tag => tag.trim().length)
					for (const tag of tags) {
						for (const topicTag of topic.tags) {
							if (topicTag.indexOf(tag) !== -1) {
								hasSuitableTag = true
								break
							}
						}
						if (hasSuitableTag) break
					}
				}

				// По датам
				let hasSuitableDate = true
				if (filter.dateRange.length > 1 && filter.dateRange[0].length) {
					const start = moment(filter.dateRange[0], 'DD-MM-YYYY')
					const finish = moment(filter.dateRange[1], 'DD-MM-YYYY').add(1, 'day')
					const created = moment(topic.created, 'YYYY-MM-DD')
					hasSuitableDate = start <= created && created <= finish
				}

				return hasSuitableType && hasSuitableTag && hasSuitableDate
			})
		},
		topic: s => id => {
			return s.topics.find(topic => topic._id === id)
		},
	},
}
