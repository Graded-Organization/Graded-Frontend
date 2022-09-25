<template>
	<div class="block-tool-wrapper is-live" v-if="block">

		<div class="m-default">
			<h2 class="block-name-wrapper">{{ block.name }}</h2>

			<div class="options">
				<div
					v-for="(option, i) in block.content.options"
					class="option"
				>
					<input
						:type="block.content.type"
						name="block-tool-inputs"
						v-model="answer"
						:id="`option${i}`"
						:value="block.content.options[i].text"
					>

					<p class="option-text">{{ block.content.options[i].text }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BlockMixin from './tool.mixin.js';
	import Vue from 'vue';

	export default {
		mixins: [ BlockMixin ],
		watch: {
			'block.content.type'(n, o) {
				if(n == 'radio') {
					for(const o in this.block.content.options) {
						Vue.set(this.block.content.options[o], 'correct', false);

						if(o == 0) Vue.set(this.block.content.options[o], 'correct', true);
					}
				}
			},
		},
		mounted() {

			if(!this.answer) this.answer = [];

			if(!this.block?.content?.type) {
				this.block.content.type = 'checkbox';
			}

			if(!this.block?.content?.grading) {
				Vue.set(this.block.content, 'grading', { active: false });
			}

			if(!this.block?.content?.options) {
				this.block.content.options = [
					{
						text: '',
						correct: true
					},
					{
						text: '',
						correct: false
					},
				];
			}
		},
		methods: {
		}
	}
</script>

<style lang="less" scoped>

	.options {

		.option {

			display: flex;
			align-items: center;
			margin-bottom: @margin-default;
			background: fade(white, 50%);
			border: 1px solid @border-1;
			padding: @margin-default;
			border-radius: @radius-2;

			input {

				margin-right: @margin-default;
			}

			.option-text {

				flex: 1;
				margin-right: @margin-default;

				/deep/ .contenteditable {

					word-break: break-all !important;
				}
			}

			&.option-add {

				cursor: pointer;
				background: @primary;

				svg {

					margin-right: @margin-half;
				}

				a {

					color: white;
					text-decoration: none;
				}
			}
		}
	}

</style>