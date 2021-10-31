import { createStore } from 'vuex'
import auth from './auth'
import topics from './topics'
import topicsTypes from './topicsTypes'

const store = createStore({
	state: {},
	mutations: {},
	actions: {},
	getters: {},
	modules: { auth, topics, topicsTypes },
})

export default store
