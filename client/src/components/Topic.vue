<template lang="pug">
div(class="container")
	div(class="date") {{ dateFormatted }}
	div(class="content") {{ content }}
	//div(class="tags") {{ tags }}
	ui-chips(:chips="tags" class="tags")
		ui-chip(v-for="item in tags" key="item" class="tag") {{ item }}
</template>

<script setup lang="ts">
	import dateFilter from '../filters/date.filter'
	import { computed } from 'vue'

	const props = defineProps({
		// aType: {
		// 	type: String,
		// 	required: true,
		// },
		date: {
			type: Date,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		tags: {
			type: <String>Array,
			required: true,
		},
	})

	const dateFormatted = computed(() => {
		return dateFilter(props.date, 'datetime')
	})
</script>

<style scoped lang="scss">
	.container {
		border-radius: 10px 0 10px 10px;
		//height: 100px;
		margin: 10px;
		background-color: lightskyblue;
		opacity: 0.7;
	}

	.date {
		font-size: 1.5em;
		padding-top: 10px;
	}

	.content {
		text-align: left;
		padding: 10px 20px;
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
