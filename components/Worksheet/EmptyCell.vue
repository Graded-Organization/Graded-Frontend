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

	}

</style>