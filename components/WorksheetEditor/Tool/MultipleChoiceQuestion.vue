<template>
	<div class="block-tool-wrapper" v-if="block" :key="blockUpdateKey">

		<p class="block-type">Multiple Choice Question</p>
		<graded-content-editable
			tag="h2"
			v-model="block.name"
			v-slot="slotProps"
			class="block-name-wrapper"
			:default="`Untitled Block`"
			:classes="{ contenteditable: 'block-name' }"
		>
			<a href="#" v-show="!slotProps.isEditable"><i class="fa fa-fw fa-pencil" /></a>
		</graded-content-editable>


		<div class="options">
			<div
				v-for="(option, i) in block.content.options"
				class="option"
			>
				<input
					type="checkbox"
					v-model="block.content.options[i].correct"
				>

				<graded-content-editable
					tag="p"
					default-text="Option"
					class="option-text"
					v-model="block.content.options[i].text"
					:default="`Option Text`"
				/>

				<a href="#" @click.prevent="removeOption(i)">
					<i class="fal fa-minus-circle" v-if="block.content.options.length > 2" />
				</a>
			</div>

			<div
				class="option option-add"
				@click.prevent="addOption"
			>
				<a>
					<i class="fal fa-plus-circle" />
					Add option
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	import BlockMixin from './tool.mixin.js';
	import Vue from 'vue';

	export default {
		mixins: [ BlockMixin ],
		data: () => ({}),
		mounted() {

			console.log('Mounting again');

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
			addOption() {

				console.log('WAX');

				Vue.set(this.block.content.options, this.block.content.options.length, {
					text: '',
					correct: false
				});

				this.$forceUpdate();
			},
			removeOption(i) {

				this.block.content.options.splice(i, 1);
			}
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