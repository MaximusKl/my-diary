<template lang="pug">
div(id="modal-mask")
	div(id="main-frame")
		div(id="title") {{ title }}
		div(id="topic-type")
			ui-select(id="topic-type-select" v-model="currentTopicType" :options="getTypesOptions()" outlined) Тип записи
		div(id="topic-content")
			ui-editor(:options='{scrollingContainer: "#topic-content"}' placeholder="Напиши что-нибудь..." :toolbar="toolbar" v-model="content" )
		div(id="topic-tags")
			ui-textfield(class="input" v-model="chip" @keypress.enter="addChip" placeholder="название метки")
			ui-chips(:chips="tagsRef" type="input")
				ui-chip(v-for="item in tagsRef" key="item" class="tag") {{ item }}
		div(id="btn-group")
			ui-button(class="save-btn" @click="saveTopic" raised) Сохранить
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
	import { onMounted, ref } from 'vue'
	import { useStore } from 'vuex'

	const store = useStore()

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
		action: {
			type: String,
			required: true,
		},
		aType: {
			type: String,
			required: true,
		},
		id: {
			type: String,
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

	let title = ref('')

	onMounted(() => {
		switch (props.action) {
			case 'add':
				title.value = 'Добавить запись'
				break
			case 'edit':
				title.value = 'Изменить запись'
				break
			default:
				title.value = 'Записать запись'
		}
	})

	const emits = defineEmits(['close', 'startLoading'])

	const emitClose = () => {
		emits('close')
	}

	let currentTopicType = ref(props.aType)

	const getTypesOptions = () => {
		return store.getters.topicsTypes.map(topicType => {
			return { label: topicType.localizedName, value: topicType._id }
		})
	}

	let chip = ref('')
	let tagsRef = ref(props.tags)

	const addChip = () => {
		if (chip.value.trim().length) {
			tagsRef.value.push(chip.value)
			chip.value = ''
		}
	}

	const saveTopic = () => {
		if (props.content.trim().length) {
			const topic = {
				aType: currentTopicType.value,
				content: props.content,
				tags: props.tags,
			}

			let actionName = ''
			switch (props.action) {
				case 'add':
					actionName = 'addTopic'
					break
				case 'edit':
					actionName = 'editTopic'
					topic._id = props.id
					break
				default:
					alert('Не распознали действие')
					return
			}

			emits('startLoading')
			store.dispatch(actionName, topic).then(() => {
				emitClose()
			})
		} else {
			alert('Нет текста!')
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
	}

	#main-frame {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		max-width: 560px;
		width: 90%;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
		border-radius: 10px 0 10px 10px;
	}

	#title {
		background-color: #cccccc;
		line-height: 30px;
		border-radius: 10px 0 0 0;
		text-align: center;
	}

	#topic-type {
		width: 100%;
		text-align: center;
		padding-top: 10px;

		&-select {
			width: 60%;
		}
	}

	#topic-content {
		overflow-y: auto;
		max-height: 300px;
		margin: 10px;
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
