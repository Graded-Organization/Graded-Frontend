<template>
	<transition
		name="slide-big"
		v-on="hooks"
	>
		<slot></slot>
	</transition>
</template>
<script>

	import $ from 'jquery';
	import Velocity from 'velocity-animate';
	import 'velocity-animate/velocity.ui.min.js';

	export default {
		name: 'SlideBigTransition',
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
				var obj = this;
				$(el).hide();
				Velocity(el, 'transition.slideUpBigIn', { delay: this.duration, complete: done });
			},
			leave(el, done) {
				var obj = this;
				Velocity(el, 'transition.slideUpBigOut', { duration: this.duration, complete: done });
			}
		}
	};
</script>