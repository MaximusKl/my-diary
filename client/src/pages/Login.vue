<template lang="pug">
h2 Login component
ui-form(class="login-form")
	div
		ui-textfield(class="mt-20 input") email address
		ui-textfield(class="mt-20 input") password
	ui-button(class="mt-20" raised) Войти
</template>

<script></script>

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
