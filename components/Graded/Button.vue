<template>
	<button
		v-bind="$attrs"
		class="border border-green-500 bg-green-500 text-white px-4 py-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
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
		}
	}
</script>