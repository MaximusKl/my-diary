<template lang="pug">
div(class="view-container")
	router-view
ui-fab(class="float-btn")
	ui-icon(class="black") add
</template>

<script></script>

<style scoped lang="scss">
	.view-container {
		width: 100vw;
		min-height: 100vh;
		background: url('./src/assets/starry-sky.jpg');
		//position: relative;
	}

	.float-btn {
		position: fixed;
		bottom: 20px;
		right: 20px;
		background-color: lightskyblue;
		z-index: 1;
	}

	.black {
		color: black;
	}
</style>
