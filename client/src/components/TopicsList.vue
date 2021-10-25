<template lang="pug">
div(class="topics-list-container")
	div(class="topics-list-wrapper")
		div(class="filter-bar")
		div(class="topics-content")
			div(class="topic" v-for="i in 15")
</template>

<script>
	export default {
		name: 'TopicsList',
	}
</script>

<style scoped lang="scss">
	.topics-list-container {
		position: relative;
		top: 0;
		border: 1px dotted black;
	}

	.topics-list-wrapper {
		//min-width: 200px;
		max-width: 800px;
		border: 1px dotted white;
		//margin: 100px 60px 10px 60px;
		margin-top: 80px;
		height: calc(100vh - 110px);
		background-color: rgba(255, 255, 255, 0.05);
		overflow-y: auto;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
	}

	.filter-bar {
		height: 50px;
		//border: 1px dotted white;
		position: sticky;
		top: 0;
		background-color: lightskyblue;
		opacity: 1;
		z-index: 1;
	}

	.topics-content {
		//border: 1px dotted white;
	}

	.topic {
		//border: 1px dotted white;
		border-radius: 10px 0 10px 10px;
		height: 100px;
		margin: 10px;
		background-color: lightskyblue;
		opacity: 0.7;
	}
</style>
