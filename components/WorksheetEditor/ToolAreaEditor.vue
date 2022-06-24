<template>
	<div>
		<h2>Edit Tool Area</h2>

		<form-group label="Background Color">
			<twitter-picker v-model="color" />

		</form-group>

		<form-group label="Text Color">

		</form-group>

		<form-group label="Border Color">

		</form-group>

	</div>
</template>

<script>
	import { Twitter } from 'vue-color';

	let defaultProps = {
		hex: '#194d33e6',
		hsl: {
			h: 150,
			s: 0.5,
			l: 0.2,
			a: 0.9
		},
		hsv: {
			h: 150,
			s: 0.66,
			v: 0.30,
			a: 0.9
		},
		  rgba: {
			r: 159,
			g: 96,
			b: 43,
			a: 0.9
		},
		a: 0.9
	}

	export default {
		components: {
			'twitter-picker': Twitter
		},
		props: {
			value: {
				type: Object,
				required: true
			}
		},
		data: () => ({
			color: defaultProps
		}),
		computed: {

		},
		methods: {
		}
	}
</script>

<style lang="less" scoped>

</style>