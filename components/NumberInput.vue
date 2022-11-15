<template>
	<div class="form-group controls-group">
		<a
			@mousedown.prevent="decrement"
			@mouseleave.prevent="stop"
			@mouseup.prevent="stop"
			class="button button-primary"
		><i class="fal fa-fw fa-minus" /></a>

		<input v-model="number" type="text" class="form-control">

		<a
			@mousedown.prevent="increment"
			@mouseleave.prevent="stop"
			@mouseup.prevent="stop"
			class="button button-primary"
		><i class="fal fa-fw fa-plus" /></a>
	</div>
</template>

<script>
export default {
	name: "ToggleSwitch",
	props: {
		value: {
			type: Number,
			required: true
		},
		max: {
			type: Number,
			default: 1000
		},
		min: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			interval: false,
			number: 0
		}
	},
	mounted() {
		this.number = this.$shallow(this.value);
	},
	methods: {
		stop() {
			clearInterval(this.interval);
			this.interval = false;
			this.$emit('input', this.number);
		},
		increment() {
			if (!this.interval) {
				this.interval = setInterval(function () {

					if (this.number < this.max) this.number++;

				}.bind(this), 100);
			}
		},
		decrement() {
			if (!this.interval) {
				this.interval = setInterval(function () {

					if (this.number > this.min) this.number--;

				}.bind(this), 100);
			}
		}
	}
};
</script>

<style scoped lang="less">

a {

	cursor: pointer;
}

input {

	text-align: center;
	width: 4.5em;
}
</style>