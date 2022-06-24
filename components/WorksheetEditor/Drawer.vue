<template>
	<div
		class="drawer drawer-editor"
		:class="[ show ? 'is-visible' : '' ]"
	>
		<div class="component-actions p-half">
			<a href="#" class="button button-primary button-small" @click.prevent="close"><i class="fal fa-fw fa-times" /></a>
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

		transition: right 750ms;
		width: 350px;
		right: -350px !important;

		&.is-visible {

			right: 0 !important;
		}
	}

</style>