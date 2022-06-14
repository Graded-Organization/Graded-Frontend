<template>
	<div
		class="select-none border-dashed border-slate-300 border-t border-l text-center min-h-[50px]"
		:class="{ 'border-r': isMaxCol, 'border-b': isMaxRow }"
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