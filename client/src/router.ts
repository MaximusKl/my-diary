import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: () => import('./pages/Home.vue'),
		meta: { layout: 'default-layout' },
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('./pages/Login.vue'),
		meta: { layout: 'auth-layout' },
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
