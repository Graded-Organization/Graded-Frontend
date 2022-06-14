<template>
	<div
		class="text-center min-h-[50px] z-10 bg-white bg-opacity-90 relative flex items-center justify-center"
		v-on="listeners"
		@click="$emit('edit')"
	>
		<slot>
			<button
				type="button"
				@click="$emit('remove')"
				class="border border-red-500 bg-red-500 text-white rounded-sm px-2 py-1 m-2 text-xs transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline absolute right-1 top-1"
			><i class="fal fa-fw fa-times" /> Remove</button>

			<button
				type="button"
				@click="$emit('add-tool')"
				class="w-[42px] h-[42px] border border-gray-500 bg-gray-500 text-white rounded-sm text-center text-2xl transition duration-500 ease select-none hover:bg-gray-600 focus:outline-none focus:shadow-outline"
			><i class="fal fa-fw fa-plus"></i></button>

		</slot>
	</div>
</template>

<script>
	export default {
		props: {
		},
		computed: {
			listeners() {
				return this.$listeners;
			},
		}
	}
</script>