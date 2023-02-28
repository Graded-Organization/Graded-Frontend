<template>
	<button
		v-bind="$attrs"
		class="button"
		type="button"
		v-on="listeners"
	>
		<slot />
	</button>

</template>

<script>
	export default {
		name: 'GradedButton',
		computed: {
			listeners() {
				return this.$listeners;
			},
		},
	};
</script>