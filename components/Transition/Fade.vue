<template>
	<transition
		name="fade"
		v-on="hooks"
	>
		<slot />
	</transition>
</template>

<script>
	import $ from 'jquery';

	export default {
		name: 'FadeTransition',
		props: {
			duration: {
				type: Number,
				default: 500
			},
			afterLeave: {
				type: Function,
				default: function() {}
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
				$(el).fadeIn(obj.duration, function() { done(); });
			},
			leave(el, done) {
				var obj = this;
				$(el).fadeOut(obj.duration, function() { done(); obj.afterLeave() });
			}
		}
	};
</script>