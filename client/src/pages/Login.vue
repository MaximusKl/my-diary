<template lang="pug">
h2 Login component
ui-form(class="login-form")
	div
		ui-textfield(class="mt-20 input" v-model="email") email address
		ui-textfield(class="mt-20 input" v-model="password" input-type="password" ) password
	ui-button(class="mt-20" raised @click="login") Войти
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
		const user = { email: email.value.trim(), password: password.value.trim() }
		store.dispatch('login', user).then(() => {
			if (store.getters.isLoggedIn) router.push('/')
		})
	}
</script>

<style scoped lang="scss">
	.login-form {
		width: 400px;
		height: 230px;
		background-color: white;
		position: relative;
		left: 50%;
		top: 100px;
		transform: translateX(-50%);
		box-shadow: 0 0 4px 1px black;
	}

	.mt-20 {
		margin-top: 20px;
	}

	.input {
		width: 360px;
	}
</style>
