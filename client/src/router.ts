import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: () => import('./pages/Home.vue'),
		meta: { layout: 'default-layout', auth: true },
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

router.beforeEach((to, from, next) => {
	const requireAuth = to.matched.some(record => record.meta.auth)

	if (requireAuth && !localStorage.getItem('AuthToken')) {
		next('/login?message=login')
	} else {
		next()
	}
})

export default router
