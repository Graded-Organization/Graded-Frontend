<template>
	<div>
		<h2 class="drawer-title">Edit Tool Area</h2>

		<worksheet-editor-drawer-block title="Formatting">
			<form-group class="form-group-color">
				<color-picker v-model="properties.backgroundColor" @change="change" />
				<label>Background Color</label>
			</form-group>

			<form-group class="form-group-color">
				<color-picker v-model="properties.color" />
				<label>Text Color</label>
			</form-group>

			<form-group class="form-group-color">
				<color-picker v-model="properties.borderColor" />
				<label>Border Color</label>
			</form-group>

			<form-group label="Border Width">
				<form-group class="controls-group">
					<input v-model="borderWidth" type="number" class="input-block form-control">
					<span class="group-label">px</span>
				</form-group>
			</form-group>
		</worksheet-editor-drawer-block>

		<!--<pre>{{ properties }}</pre>-->

		<portal-target name="tool-area-editor"></portal-target>
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
			},
			block: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				properties: this.value
			}
		},
		computed: {
			borderWidth: {
				get() {
					return parseInt(this.properties.borderWidth);
				},
				set(value) {
					this.properties.borderWidth = `${ value }px`;
				}
			}
		},
		created() {
			if(typeof this.properties.backgroundColor === 'undefined') Vue.set(this.properties, 'backgroundColor', '#FFFFFF');
			if(typeof this.properties.color === 'undefined') Vue.set(this.properties, 'color', '#333');
			if(typeof this.properties.borderColor === 'undefined') Vue.set(this.properties, 'borderColor', 'transparent');
			if(typeof this.properties.borderWidth === 'undefined') Vue.set(this.properties, 'borderWidth', 0);
		},
		methods: {
			change() {}
		}
	}
</script>

<style lang="less" scoped>

	.drawer-title {

		position: sticky;
		top: 0;
		padding: @margin-default;
		z-index: 100;
		background: @gray-1 url('~/assets/images/template/topology.png') center center no-repeat;
	}

	.form-group-color {

		display: flex;
		align-items: center;

		.one-colorpicker {

			margin-right: @margin-default;

			/deep/ .color-block-layer {

				border: 1px solid @border-1;
				border-radius: 5px;
			}
		}
	}

</style>