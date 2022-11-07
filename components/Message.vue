<template>
	<transition-slide :duration="duration">
		<div
			class="message"
			:class="`message-${type}`"
			v-if="message"
		>
			{{ message }}
			<a
				class="message-close"
				@click="message = ''"
			>
				<i class="fal fa-fw fa-times" />
			</a>
		</div>
	</transition-slide>
</template>
<script>

	export default {
		name: 'Message',
		props: {
			duration: {
				type: Number,
				default: 500
			},
			type: {
				type: String,
				default: 'info'
			},
			value: {
				type: String,
				default: ''
			}
		},
		computed: {
			message: {
				get: function() { return this.value },
				set: function(value) { this.$emit('input', value); }
			}
		},
		methods: {
		}
	}
</script>
<style scoped lang="less">


</style>