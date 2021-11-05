<template lang="pug">
h2 Login component
ui-form(class="login-form")
	div(v-if="store.getters['auth/error']" class="error")
		p {{ store.getters['auth/error'] }}
	div
		ui-textfield(class="mt-20 input" v-model="email" @keypress.enter="login") email address
		ui-textfield(class="mt-20 input" v-model="password" input-type="password" @keypress.enter="login") password
	ui-button(class="mt-20 btn" raised @click="login" ) Войти
</template>

<script setup lang="ts">
	import { useStore } from 'vuex'
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'

	const store = useStore()
	const router = useRouter()

	const email = ref('')
	const password = ref('')

	function login() {
		const user = { email: email.value.trim(), password: password.value.trim() } // TODO сделать валиидацию
		if (user.email && user.password) {
			store.dispatch('auth/login', user).then(() => {
				if (store.getters['auth/isLoggedIn']) {
					store.dispatch('auth/setError', null)
					router.push('/')
				}
			})
		} else {
			store.dispatch('auth/setError', 'no login data')
		}
	}
</script>

<style scoped lang="scss">
	.login-form {
		display: flex;
		flex-direction: column;
		width: 400px;
		//height: 230px;
		background-color: white;
		position: relative;
		left: 50%;
		top: 100px;
		transform: translateX(-50%);
		box-shadow: 0 0 4px 1px black;
		padding: 20px 30px;
	}

	.mt-20 {
		margin-top: 20px;
		padding: 0;
	}

	.btn {
		margin-left: 20%;
		margin-right: 20%;
	}

	.input {
		width: 100%;
		padding-left: 1rem;
	}

	.error {
		color: red;
	}
</style>
