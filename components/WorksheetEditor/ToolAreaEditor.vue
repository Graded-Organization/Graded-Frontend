<template>
	<div>
		<h2>Edit Tool Area</h2>

		<form-group label="Background Color">
			<color-input v-model="properties.backgroundColor" />
		</form-group>

		<form-group label="Text Color">
			<color-input v-model="properties.color" />
		</form-group>

		<form-group label="Border Color">
			<color-input v-model="properties.borderColor" />
		</form-group>

		<pre>{{ properties }}</pre>

	</div>
</template>

<script>
	import Vue from 'vue';
	import { Twitter } from 'vue-color';

	export default {
		components: {
			'twitter-picker': Twitter
		},
		watch: {
			properties: {
				handler(newVal, oldVal) {
					console.log('Changing');
					this.$emit('input', newVal);
				},
				deep: true
			}
		},
		props: {
			toolArea: {
				type: String,
				default: ''
			},
			value: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				properties: this.value
			}
		},
		created() {
			if(typeof this.properties.backgroundColor === 'undefined') Vue.set(this.properties, 'backgroundColor', '#FFFFFF');
			if(typeof this.properties.color === 'undefined') Vue.set(this.properties, 'color', '#333');
			if(typeof this.properties.borderColor === 'undefined') Vue.set(this.properties, 'borderColor', 'transparent');
		},
		computed: {},
		methods: {}
	}
</script>

<style lang="less" scoped>

</style>