<template lang="pug">
div(class="topics-list-container")
	div(class="topics-list-wrapper" v-if="!isLoading")
		div(class="filter-bar")
			ui-select(id="topics-type-select" v-model="currentTopicType" :options="getTypesOptions()" outlined) Тип записи
			ui-textfield(id="topics-tags-filter" v-model="filterTags" outlined with-trailing-icon) Метка
				template(#after)
					ui-textfield-icon(v-if="filterTags" @click="cleanTagsFilter()" trailing) close
			ui-datepicker(id="topics-range-filter" v-model="dateRange" :label="'Выбор дат'" :config="dateRangeOptions" @update:modelValue="dateRangeChange" outlined with-trailing-icon)
				template(#after)
					ui-textfield-icon(v-if="thereIsDateRange()" @click="dateRangeClean()" trailing) close
		div(class="topics-content")
			topic(v-for="i in topics" key="i._id" :date="new Date(i.created)" :content="i.content" :tags="i.tags" :id="i._id" :a-type="i.aType || ''" @remove="removeTopic" @edit="editTopic")
	div(class="spinner-container" v-else)
		spinner
ui-fab(class="float-btn" @click="addTopic")
	ui-icon(class="black") add
topic-edit(v-if="showModal" @close="closeModal" @startLoading="isLoading = true" :content="topicContent" :tags='topicTags' :action="modalAction" :id="topicId" :a-type="topicType || ''")
</template>

<script setup lang="ts">
	import TopicEdit from '../components/TopicEdit.vue'
	import Topic from '../components/Topic.vue'
	import Spinner from './spinner.vue'
	import { computed, onMounted, ref } from 'vue'
	import { useStore } from 'vuex'
	import { Russian } from 'flatpickr/dist/l10n/ru.js'

	const store = useStore()

	const topics = computed(() => {
		return store.getters.topics
	})

	let isLoading = ref(true) // Без этого удалеие будет с ошибами

	onMounted(() => {
		store.dispatch('loadTopicsTypes').then(() => {
			store.dispatch('loadTopics').then(() => {
				isLoading.value = false
			})
		})
	})

	let showModal = ref(false)

	let modalAction = ref('')
	let topicId = ref('')
	let topicType = ref('')
	let topicContent = ref('')
	let topicTags = ref([])

	const clearModalForm = () => {
		topicId.value = ''
		topicType.value = ''
		topicContent.value = ''
		topicTags.value = []
	}

	const closeModal = () => {
		showModal.value = false
		isLoading.value = false
		clearModalForm()
	}

	const addTopic = () => {
		modalAction.value = 'add'
		showModal.value = true
	}

	const removeTopic = async id => {
		isLoading.value = true
		await store.dispatch('removeTopic', id).then(() => {
			isLoading.value = false
		})
	}

	const editTopic = async id => {
		// Получить запись по id
		const topic = store.getters.topic(id)
		if (topic) {
			// Заполнить поля
			modalAction.value = 'edit'
			topicId.value = id
			topicType.value = topic.aType
			topicContent.value = topic.content
			topicTags.value = topic.tags
			// Открыть окно
			showModal.value = true
		} else {
			console.log('Topic not found')
		}
	}

	let currentTopicType = ref('')

	const getTypesOptions = () => {
		const types = store.getters.topicsTypes.map(topicType => {
			return { label: topicType.localizedName, value: topicType._id }
		})
		return [{ label: 'Все', value: -1 }, ...types]
	}

	const filterTags = ref('')

	const cleanTagsFilter = () => {
		filterTags.value = ''
	}

	let dateRange = ref([''])

	const dateRangeOptions = {
		dateFormat: 'd-m-Y',
		maxDate: Date.now(),
		locale: Russian,
		mode: 'range',
		position: 'auto center',
	}

	const thereIsDateRange = () => {
		return dateRange.value[0].length > 0
	}

	const dateRangeClean = () => {
		dateRange.value = ['', '']
		console.log('Date changed 2: ', dateRange.value)
	}

	const dateRangeChange = data => {
		console.log('Date changed: ', data)
		console.log('Date changed 2: ', dateRange.value)
	}
</script>

<style scoped lang="scss">
	.topics-list-container {
		position: relative;
		top: 0;
		border: 1px dotted black;
	}

	.topics-list-wrapper {
		max-width: 800px;
		border: 1px dotted dimgray;
		margin-top: 80px;
		height: calc(100vh - 110px);
		background-color: rgba(255, 255, 255, 0.1);
		overflow-y: auto;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
	}

	.spinner-container {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		justify-content: center;
		align-items: center;
		$color: white;
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

	.filter-bar {
		//height: 80px;
		padding: 5px 0;
		position: sticky;
		top: 0;
		background-color: lightskyblue;
		opacity: 1;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: space-around;
		flex-wrap: wrap;
		border-radius: 5px;
	}

	#topics-type-select {
		width: 120px;
		margin: 5px;
	}

	#topics-tags-filter {
		width: 180px;
		margin: 5px;
	}

	#topics-range-filter {
		width: 280px;
		margin: 5px;
	}
</style>
