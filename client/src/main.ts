import { createApp, defineAsyncComponent } from 'vue'

import App from './App.vue'
import store from './store/index'
import router from './router'

// @ts-ignore
import BalmUI, { useToast } from 'balm-ui' // Official Google Material Components
// @ts-ignore
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus' // BalmJS Team Material Components
import 'balm-ui-css'

const app = createApp(App)

// const $toast = useToast()

app.component(
	'default-layout',
	defineAsyncComponent(() => import('./layouts/DefaultLayout.vue'))
	// DefaultLayout
)
app.component(
	'auth-layout',
	defineAsyncComponent(() => import('./layouts/AuthLayout.vue'))
	// AuthLayout
)

app.use(store)
app.use(router)
app.use(BalmUI)
app.use(BalmUIPlus)
// app.use($toast)
// app.use($confirm, {})
app.mount('#app')
