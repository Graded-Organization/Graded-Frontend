<template>
	<div
		class="drawer drawer-editor"
		:class="[ show ? 'is-visible' : '' ]"
		@keydown.esc="close"
	>
		<div class="component-actions p-half">
			<a href="#" class="button button-small" @click.prevent="close"><i class="fa fa-fw fa-times" /></a>
		</div>

		<div class="drawer-content">
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

		height: calc(~"100% - 63px - 43px") !important;
		border-left: 1px solid @border-1;

		top: 63px;
		box-shadow: none;
		transition: right 150ms;
		width: 350px;
		right: -350px !important;

		.component-actions {

			position: sticky;
			float: right;
			z-index: 101;
		}

		&.is-visible {

			right: 0 !important;
		}
	}

</style>