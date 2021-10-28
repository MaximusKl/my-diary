<template lang="pug">
div(class="topics-list-container")
	div(class="topics-list-wrapper")
		div(class="filter-bar")
		div(class="topics-content")
			topic(v-for="i in store.getters['topics']" key="i._id" :date="new Date(i.created)" :content="i.content" :tags="i.tags")
</template>

<script setup lang="ts">
	import Topic from '../components/Topic.vue'
	import { onMounted } from 'vue'
	import { useStore } from 'vuex'

	const store = useStore()

	onMounted(() => {
		store.dispatch('loadTopics')
	})
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
</style>
