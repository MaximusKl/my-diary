<template lang="pug">
div(class="topics-list-container")
	div(class="topics-list-wrapper")
		div(class="filter-bar")
		div(class="topics-content" v-if="!isLoading")
			topic(v-for="i in topics" key="i._id" :date="new Date(i.created)" :content="i.content" :tags="i.tags" :id="i._id" @remove="removeTopic")
ui-fab(class="float-btn" @click="openModal")
	ui-icon(class="black") add
topic-edit(v-if="showModal" :title="modalTitle" @close="closeModal" :content="modalContent" :tags='modalTags' )
</template>

<script setup lang="ts">
	import Topic from '../components/Topic.vue'
	import TopicEdit from '../components/TopicEdit.vue'
	import { computed, onMounted, ref } from 'vue'
	import { useStore } from 'vuex'

	const store = useStore()

	const topics = computed(() => {
		return store.getters.topics
	})

	let isLoading = ref(true) // Без этого удалеие будет с ошибами

	onMounted(() => {
		store.dispatch('loadTopics').then(() => {
			isLoading.value = false
		})
	})

	let showModal = ref(false)

	let modalTitle = ref('')
	let modalContent = ref('')
	let modalTags = ref([])

	const clearModalForm = () => {
		modalContent.value = ''
		modalTags.value = []
	}

	const closeModal = () => {
		showModal.value = false
		clearModalForm()
	}

	const openModal = () => {
		modalTitle.value = 'Добавить запись'
		showModal.value = true
	}

	const removeTopic = async id => {
		isLoading.value = true
		// console.log('confirm removing topic ' + id)
		await store.dispatch('removeTopic', id).then(() => {
			isLoading.value = false
		})
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
		border: 1px dotted dimgray;
		//margin: 100px 60px 10px 60px;
		margin-top: 80px;
		height: calc(100vh - 110px);
		background-color: rgba(255, 255, 255, 0.1);
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
