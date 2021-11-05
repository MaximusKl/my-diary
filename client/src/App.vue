<template lang="pug">
header
	h1 Мой дневник
component(:is="layout")
	router-view
</template>

<script setup lang="ts">
	import { computed } from 'vue'
	import { useRoute } from 'vue-router'

	const route = useRoute()
	const layout = computed(() => route.meta.layout) // || 'default-layout'
</script>

<style lang="scss">
	@font-face {
		font-family: 'Montserrat';
		src: local('Montserrat'), url(/fonts/Montserrat/Montserrat-Regular.ttf) format('truetype');
	}

	* {
		font-family: Montserrat, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		//text-align: center;
		/*color: #2c3e50;*/
		/*margin-top: 60px;*/
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		position: relative;
	}

	header {
		position: fixed;
		//display: inline;
		left: 0;
		top: 0;
		background-color: lightskyblue;
		width: 100%;
		line-height: 50px;
		z-index: 1;
		text-align: center;
	}
</style>
