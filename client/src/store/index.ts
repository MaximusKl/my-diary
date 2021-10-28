import { createStore } from 'vuex'
import auth from './auth'
import topics from './topics'

const store = createStore({
	state: {},
	mutations: {},
	actions: {},
	getters: {},
	modules: { auth, topics },
})

export default store
