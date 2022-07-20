<template>
	<transition
		name="slide"
		v-on="hooks"
	>
		<slot></slot>
	</transition>
</template>
<script>

	import $ from 'jquery';

	export default {
		name: 'SlideTransition',
		props: {
			duration: {
				type: Number,
				default: 500
			}
		},
		computed: {
			hooks() {
				return {
					enter: this.enter,
					leave: this.leave,
					...this.$listeners
				}
			}
		},
		methods: {
			enter(el, done) {
				$(el).hide();
				$(el).slideDown(this.duration, done);
			},
			leave(el, done) {
				$(el).slideUp(this.duration, done);
			}
		}
	};
</script>