<template lang="pug">
div(class="container")
	div(class="topic-header")
		ui-icon(class="header-icon") edit
		div(class="date")  {{ dateFormatted }}
		ui-icon(class="header-icon" @click="openConfirmation = true") close
	div(class="content" v-html="content" )
	//div(class="tags") {{ tags }}
	ui-chips(:chips="tags" class="tags")
		ui-chip(v-for="item in tags" key="item" class="tag") {{ item }}
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
		// aType: {
		// 	type: String,
		// 	required: true,
		// },
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

	const emits = defineEmits(['remove'])

	const store = useStore()

	const dateFormatted = computed(() => {
		return dateFilter(props.date, 'datetime')
	})

	let openConfirmation = ref(false)

	const removeTopic = () => {
		emits('remove', props.id)
		openConfirmation.value = false
		// return store.dispatch('removeTopic', props.id).then(() => {
		// 	openConfirmation.value = false
		// })
	}
</script>

<style scoped lang="scss">
	//$bubble-editor-height: 10px;

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
		padding: 0 20px 10px 20px;
		//justify-content: center;
	}

	.tag {
		background-color: deepskyblue;
		min-width: 50px;
		justify-content: center;
	}
</style>
