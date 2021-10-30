<template lang="pug">
div(class="view-container")
	router-view
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
	.view-container {
		width: 100vw;
		min-height: 100vh;
		background: url('./src/assets/starry-sky.jpg');
		//position: relative;
	}
</style>
