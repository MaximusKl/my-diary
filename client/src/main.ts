import { createApp } from 'vue'

import App from './App.vue'
import store from './store/index'
import router from './router'

// @ts-ignore
import BalmUI from 'balm-ui' // Official Google Material Components
// @ts-ignore
import BalmUIPlus from 'balm-ui-plus' // BalmJS Team Material Components
// import $confirm from 'balm-ui/plugins/confirm'
import 'balm-ui-css'

import DefaultLayout from './layouts/DefaultLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'

const app = createApp(App)

app.component(
	'default-layout',
	// defineAsyncComponent(() => import('./layouts/DefaultLayout.vue'))
	DefaultLayout
)
app.component(
	'auth-layout',
	// defineAsyncComponent(() => import('./layouts/AuthLayout.vue'))
	AuthLayout
)
app.use(store)
app.use(router)
app.use(BalmUI)
app.use(BalmUIPlus)
// app.use($confirm, {})
app.mount('#app')
