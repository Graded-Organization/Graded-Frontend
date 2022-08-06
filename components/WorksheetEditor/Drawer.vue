<template>
	<div
		class="drawer drawer-editor"
		:class="[ show ? 'is-visible' : '' ]"
	>
		<div class="component-actions p-half">
			<a href="#" class="button button-small" @click.prevent="close"><i class="fa fa-fw fa-times" /></a>
		</div>

		<div class="m-default">
			<slot></slot>
		</div>

	</div>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			listeners() {
				return this.$listeners;
			},
		},
		methods: {
			close() {
				this.$emit('close');
			}
		}
	}
</script>

<style lang="less" scoped>

	.drawer-editor {

		height: calc(~"100% - 67px - 43px") !important;
		border-left: 1px solid @border-1;

		top: 67px;
		box-shadow: none;
		transition: right 150ms;
		width: 350px;
		right: -350px !important;

		&.is-visible {

			right: 0 !important;
		}
	}

</style>