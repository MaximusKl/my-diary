<template lang="pug">
div(class="container")
	div(class="topic-header")
		ui-icon(class="header-icon" @click="editTopic") edit
		div(class="date")  {{ dateFormatted }}
		ui-icon(class="header-icon" @click="openConfirmation = true") close
	div(class="topic-type") {{ topicTypeName() }}
	div(class="content" v-html="content" )
	//ui-chips(:chips="chips" class="tags")
	div(class="tags")
		ui-chip(v-for="item in tags" key="item" class="tag" @click="tagClick") {{ item }}
ui-dialog(v-model="openConfirmation")
	ui-dialog-title Вы уверены?
	ui-dialog-content
		p После удаления записи восстановить её будет невозможно
	ui-dialog-actions
		ui-button(@click="removeTopic") Да, удаляем
		ui-button(@click="openConfirmation = false") Нет, подожди
</template>

<script setup lang="ts">
	import dateFilter from '../filters/date.filter'
	import { computed, ref } from 'vue'
	import { useStore } from 'vuex'

	const props = defineProps({
		aType: {
			type: String,
			required: true,
		},
		id: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		tags: {
			type: Array,
			required: true,
		},
	})

	const store = useStore()

	const emits = defineEmits(['remove', 'edit', 'tagClick'])

	const dateFormatted = computed(() => {
		return dateFilter(new Date(props.date), 'datetime')
	})

	let openConfirmation = ref(false)

	const editTopic = () => {
		emits('edit', props.id)
	}

	const removeTopic = () => {
		emits('remove', props.id)
		openConfirmation.value = false
	}

	const topicTypeName = () => {
		return store.getters['topicsTypes/topicType'](props.aType)?.localizedName || ''
	}

	const tagClick = e => {
		let el = e.target
		if (el.nodeName === 'DIV') {
			el = el.querySelector('.mdc-chip__text')
		}
		if (el) {
			emits('tagClick', el.textContent)
		}
	}
</script>

<style scoped lang="scss">
	.container {
		border-radius: 10px 0 10px 10px;
		//height: 100px;
		margin: 10px;
		background-color: lightskyblue;
		opacity: 0.9;

		&:hover {
			.header-icon {
				visibility: visible;
			}
		}
	}

	.topic-header {
		font-size: 1.5em;
		padding-top: 10px;
		text-align: center;
		display: flex;
		justify-content: space-between;
		margin: 0 20px;
	}

	.header-icon {
		cursor: pointer;
		visibility: hidden;
		transition: all ease 0.1s;
	}

	.topic-type {
		text-align: center;
	}

	.content {
		//text-align: left;
		padding: 10px 20px;
		border: none;
		background-color: aliceblue;
		margin: 5px 10px;
		overflow-y: auto;
		max-height: 100px;
		border-radius: 5px;
	}

	.tags {
		padding: 8px 20px 10px 10px;
	}

	.tag {
		background-color: deepskyblue;
		min-width: 50px;
		justify-content: center;
		margin-right: 6px;

		&:last-child {
			margin-right: 0;
		}
	}
</style>
