<template>
	<vue-final-modal
		v-slot="{ params, close }"
		v-bind="$attrs"
		classes="modal-container"
		content-class="modal-content"
		v-on="$listeners"
		:class="{ 'show-close': showClose }"
	>
		<span v-if="title" class="modal-title">
			<h2>{{ title }}</h2>
		</span>

		<div class="modal-inner-content">
			<slot v-bind:params="params" :close="close"></slot>
		</div>
		<button
			v-if="showClose"
			class="modal-close"
			@click="close"
		>
			<i class="fal fa-fw fa-times" />
		</button>
	</vue-final-modal>
</template>

<script>
	export default {
		name: 'GradedModal',
		inheritAttrs: false,
		props: {
			title: {
				type: String,
				default: ''
			},
			showClose: {
				type: Boolean,
				default: true
			}
		},
		methods: {
		}
	}
</script>


<style lang="less" scoped>

	/deep/ .modal-container {

		display: flex;
		justify-content: center;
		align-items: center;

		&.show-close {

			padding-top: @margin-triple;
		}
	}

	.modal-title {

		margin-bottom: @margin-default;

		h2 {

			font-size: 1.2rem;
		}
	}

	/deep/ .modal-content {

		position: relative;
		display: flex;
		flex-direction: column;
		max-height: 90%;
		border-radius: 0.25rem;
		background: white;
		padding: @margin-double;
		max-width: 90%;
	}

	.modal-content {

		flex-grow: 1;
		overflow-y: auto;
	}

	.modal-close {

		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
	}
</style>
