<template lang="pug">
div(id="modal-mask")
	div(id="main-frame")
		div(id="title") {{ title }}
		div(id="topic-type") Тип записи
		div(id="topic-content")
			ui-editor(:options='{scrollingContainer: "#topic-content"}' placeholder="Напиши что-нибудь..." :toolbar="toolbar" v-model="content" )
		div(id="topic-tags")
			ui-textfield(class="input" placeholder="тэг" v-model="chip" @keypress.enter="addChip")
			ui-chips(:chips="tagsRef" type="input")
				ui-chip(v-for="item in tagsRef" key="item" class="tag") {{ item }}
		div(id="btn-group")
			ui-button(class="save-btn" raised @click="addTopic") Сохранить
			ui-button(class="cancel-btn" @click="emitClose") Отменить
</template>

<script setup lang="ts">
	// const toolbar = [
	// 	[{ header: [false, 1, 2, 3, 4, 5, 6] }, { font: [] }, { size: [] }, { lineheight: [] }],
	// 	['bold', 'italic', 'underline', { color: [] }, { background: [] }],
	// 	[{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
	// 	[{ list: 'ordered' }, { list: 'bullet' }, { indent: '+1' }, { indent: '-1' }, 'blockquote'],
	// 	['link', 'image', 'video'],
	// 	['strike', { script: 'super' }, { script: 'sub' }, 'divider'],
	// 	['clean', 'undo', 'redo'],
	// 	['preview'], // custom
	// ]
	import { ref } from 'vue'
	import { useStore } from 'vuex'

	const toolbar = [
		[{ header: [false, 1, 2, 3, 4, 5, 6] }, { font: [] }, { size: [] }],
		['bold', 'italic', 'underline', { color: [] }, { background: [] }],
		[{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
		[{ list: 'ordered' }, { list: 'bullet' }, { indent: '+1' }, { indent: '-1' }, 'blockquote', 'code'],
		['link', 'image', 'video'],
		['strike', { script: 'super' }, { script: 'sub' }, 'divider'],
		['clean', 'undo', 'redo'],
	]

	const props = defineProps({
		title: {
			type: String,
			required: true,
		},
		// aType: {
		// 	type: String,
		// 	required: true,
		// },
		content: {
			type: String,
			required: true,
		},
		tags: {
			type: Array,
			required: true,
		},
	})

	const emits = defineEmits(['close'])

	const emitClose = () => {
		emits('close')
	}

	let chip = ref('')
	let tagsRef = ref(props.tags)

	const addChip = () => {
		if (chip.value.trim().length) {
			// console.log('add chip: ' + chip.value)
			tagsRef.value.push(chip.value)
			// console.log('add chip: ' + props.tags)
			chip.value = ''
		}
	}

	const store = useStore()

	const addTopic = () => {
		if (props.content.trim().length && props.tags.length) {
			const topic = {
				// aType: '',
				content: props.content,
				tags: props.tags,
			}

			store.dispatch('addTopic', topic).then(() => {
				emitClose()
			})
		}
	}
</script>

<style scoped lang="scss">
	#modal-mask {
		position: fixed;
		z-index: 9999;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		//display: table;
	}

	#main-frame {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		max-width: 560px;
		//height: 300px;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
		border-radius: 10px 0 10px 10px;
	}

	#title {
		//height: 50px;
		background-color: #cccccc;
		line-height: 30px;
		border-radius: 10px 0 0 0;
		text-align: center;
	}

	#topic-type {
		text-align: center;
		line-height: 24px;
	}

	#topic-content {
		overflow-y: auto;
		max-height: 300px;
		margin: 10px;
	}

	#topic-tags {
		input {
			width: 100%;
		}
	}

	#btn-group {
		text-align: center;
		padding: 10px;

		button {
			margin: 0 10px;
		}

		.save-btn {
			background-color: lightskyblue;
			color: black;
		}

		.cancel-btn {
			color: dodgerblue;
		}
	}

	.input {
		height: 40px;
		width: calc(100% - 20px);
		margin-left: 10px;
	}
</style>
