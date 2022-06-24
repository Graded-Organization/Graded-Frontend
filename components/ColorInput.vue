<template>
	<div class="color-input-wrapper">
		<input
			:style="`background-color: ${backgroundColor}`"
			type="text"
			readonly
			class="input-block form-control"
			@focus="showPicker = true"
		>
		<twitter-picker
			v-show="showPicker"
			@input="updateColor"
			:value="{hex: backgroundColor}"
			class="twitter-picker"
		/>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Twitter } from 'vue-color';

	export default {
		components: {
			'twitter-picker': Twitter
		},
		props: {
			value: {
				type: String
			}
		},
		data() {
			return {
				backgroundColor: this.value,
				showPicker: false
			}
		},
		mounted() {},
		computed: {},
		methods: {
			updateColor(val) {

				this.backgroundColor = val.hex;
				this.$emit('input', val.hex);
				this.showPicker = false;
			}
		}
	}
</script>

<style lang="less" scoped>

	input {

		cursor: pointer;
	}

	.twitter-picker {

		position: absolute;
		z-index: 100;
		width: 100% !important;
	}

</style>