<template>
	<div
		class="cell cell-empty"
		:class="{ 'border-right': isMaxCol, 'border-bottom': isMaxRow }"
		v-on="listeners"
	>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			col: {
				type: [Number, String],
				required: true
			},
			row: {
				type: [Number, String],
				required: true
			},
			isMaxRow: {
				type: Boolean,
				default: false
			},
			isMaxCol: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			listeners() {
				return this.$listeners;
			},
		}
	}
</script>

<style lang="less" scoped>

	.cell {

		border-style: dashed;
		border-color: transparent;
		border-width: 1px;
		border-top-color: @gray-3;
		border-left-color: @gray-3;
	}

	.border-right { border-right-color: @gray-3; }
	.border-bottom { border-bottom-color: @gray-3; }

</style>