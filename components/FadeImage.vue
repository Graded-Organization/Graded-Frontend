<template>
	<transition-fade>
		<img
			:src="src"
			v-show="loaded"
			@load="onImgLoad"
		>
	</transition-fade>
</template>

<script>
	export default {
		name: 'FadeImage',
		props: {
			src: {
				type: String,
				required: true
			}
		},
		data: () => ({
			loaded: false
		}),
		methods: {
			onImgLoad() {
				var vm = this;
				setTimeout(function() {
					vm.loaded = true;
				}, 500);
			}
		}
	}
</script>