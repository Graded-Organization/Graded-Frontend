<template>
	<div
		class="field-wrapper"
		:style="fieldStyles"
		:class="{ 'is-selected': selected || isFocused, 'is-focused': isFocused }"
	>
		<span
			class="field-name"
			:style="isFocused ? `background-color: ${ $stringToColour(isFocused.userName) }; border-color: ${ $stringToColour(isFocused.userName) }` : ''"
			:class="{ 'is-checkbox': value.type == 'checkbox', 'is-select': value.type == 'select', 'is-radio': value.type == 'radio' }"
		>
			<span v-if="isFocused">{{ isFocused.userName }} is editing <strong>{{ value.name }}</strong></span>
			<span v-else>{{ value.name }}</span>
		</span>

		<div
			class="field-input"
			:class="{ 'is-checkbox': value.type == 'checkbox', 'is-select': value.type == 'select', 'is-radio': value.type == 'radio' }"
		>
			<input type="checkbox" v-if="value.type == 'checkbox'">
			<input type="radio" v-if="value.type == 'radio'">

			<input
				class="field-control"
				:type="inputType(value.type)"
				v-model="latestAnswer"
				v-if="value.type == 'short-text-input' || value.type == 'date-input' || value.type == 'number-input'"
				@focus="focusField"
				:disabled="isFocused"
			>

			<textarea
				v-if="value.type == 'long-text-input'"
				class="field-control"
				@focus="focusField"
				:disabled="isFocused"
				v-model="latestAnswer"
			/>

			<select v-if="value.type == 'select'">
				<option v-for="choice in value.content.choices">{{ choice }}</option>
			</select>
		</div>

		<div
			:style="isFocused ? `background-color: ${ $stringToColour(isFocused.userName) }; border-color: ${ $stringToColour(isFocused.userName) }` : ''"
			class="field-air"
			:class="{ 'is-checkbox': value.type == 'checkbox', 'is-select': value.type == 'select', 'is-radio': value.type == 'radio' }"
		/>

		<button
			v-if="!isFocused"
			class="field-close"
			@click="blurField"
		>
			<i class="fal fa-fw fa-times" />
		</button>


		<img
			v-if="isFocused"
			:src="`${ $config.apiUrl }/users/${ isFocused.userId }/avatar?size=200`"
			class="focus-avatar avatar"
			:style="isFocused ? `background-color: ${ $stringToColour(isFocused.userName) }; border-color: ${ $stringToColour(isFocused.userName) }` : ''"
		>

	</div>
</template>

<script>
	import Vue from 'vue';

	import { mapGetters, mapActions } from 'vuex';

	export default {
		name: 'PdfField',
		props: {
			value: {
				type: Object,
				required: true
			},
			selected: {
				type: Boolean,
				default: false
			},
			focused: {
				type: Boolean,
				default: false
			},
			isFocused: {
				type: [Object, Boolean],
				default: false
			}
		},
		data: () => ({
			answer: ''
		}),
		computed: {
			...mapGetters({ answers: 'worksheet/answers' }),
			fieldStyles() {

				return {
					top: this.value.content.geo?.y + '%',
					left: this.value.content.geo?.x + '%',
					width: this.value.content.geo?.width + '%',
					height: this.value.content.geo?.height + '%'
				};
			},
			latestAnswer: {
				get() {
					const latestAnswers = this.answers.filter(a => a.id_block == this.value.id);

					if(latestAnswers.length) {
						const latestAnswer = latestAnswers.reduce(function(prev, current) {
							return (prev.id > current.id) ? prev : current
						});
						if(latestAnswer) return latestAnswer.content.userAnswer;
					}

					return '';
				},
				set(answer) {
					this.answer = answer;
				}
			}
		},
		methods: {
			...mapActions({ addAnswer: 'worksheet/addAnswer' }),

			inputType(type) {

				if(type == 'date-input') return 'date';
				if(type == 'number-input') return 'number';
				else return 'text';
			},

			focusField(event) {

				if(!this.isFocused) {
					this.$emit('focus-tool', this.value);
				}

			},

			async blurField(event) {

				await this.saveAnswer();
				this.$emit('blur-tool', this.value);
			},

			async saveAnswer() {

				const content =  {
					userAnswer: this.answer,
					originalQuestion: this.value
				};

				const answer = {
					id_block: this.value.id,
					content: content
				};

				const applicationAnswer = await this.$axios.$post(`/applications/${this.$route.params.id}/answer`, answer);

				this.addAnswer(applicationAnswer.data);
				this.$emit('new-answer', applicationAnswer.data);
			}
		},
		async fetch() {

		}
	};
</script>

<style lang="less" scoped>

	.page-content.resizing .field-wrapper:not(.resizing) {

		&:hover {
			z-index: 0;
			.field-name, .field-air { opacity: 0; }
		}
	}

	.drag-handle > * {

		pointer-events: none;
	}

	.field-wrapper {

		position: absolute;
		box-sizing: border-box;

		.field-name {

			display: flex;
			align-items: center;
			white-space: nowrap;
			position: absolute;
			line-height: 22px;
			height: 22px;
			top: -26px;
			left: 0;
			font-size: 0.8rem;
			line-height: 1;
			opacity: 0;
			background: white;
			border: 1px solid @border-1;
			border-bottom: 0;
			padding: @margin-third @margin-half;
			z-index: 2;
			max-width: 100%;
			border-radius: @radius-2 @radius-2 0 0;

			a, strong {

				margin-right: @margin-half;
			}

			span {

				overflow: hidden;
				text-overflow: ellipsis;
				min-width: 0;
			}

			&.is-checkbox,
			&.is-radio {

				z-index: 0;
				max-width: none;
				width: 200px;
				left: 50%;
				margin-left: -100px;
				border-radius: @radius-2;
				border: 1px solid @border-1;
			}
		}

		.field-air {

			border: 1px solid @border-1;
			opacity: 0;
			border-radius: @radius-2;
			box-shadow: @-shadow-3;
			.overlay-element();
			width: calc(~"100% + 10px");
			height: calc(~"100% + 10px");
			background: white;
			margin-left: -5px;
			margin-top: -5px;
			z-index: 0;

			.resize-handle {

				position: absolute;
				width: 30px;
				height: 10px;
				right: 0;
				bottom: 0;
			}

			&.is-radio,
			&.is-checkbox {

				border-radius: 0 0 @radius-2 @radius-2;
				border-top: 0;

				.resize-handle {

					display: none;
				}
			}
		}

		.field-close {

			position: absolute;
			background: @primary !important;
			width: 25px;
			height: 25px;
			right: -22px;
			top: -22px;
			color: white;
			border-radius: @radius-round;
			display: none;
		}

		.focus-avatar {

			width: 40px;
			z-index: 1000;
			position: absolute;
			left: -35px;
			top: -38px;
			box-shadow: @shadow-3;
		}

		.field-input {

			background: #CCC;
			.overlay-element();
			resize: none;
			padding: @margin-half;
			z-index: 1;

			&.is-radio {

				border-radius: @radius-round;
			}

			&.is-radio,
			&.is-checkbox {

				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0;

				input {

					pointer-events: none;
				}
			}

			&.is-select {

				padding: 0;

				select {

					.overlay-element();
					background: transparent;
				}
			}

			.field-control {

				.overlay-element();
				background: transparent;
				padding: @margin-third;
				resize: none;
				font-size: 0.8rem;
			}
		}

		&:hover {

			z-index: 100;
			.field-name, .field-air { opacity: 1; }
		}


		&.is-focused {

			z-index: 100;
			.field-name, .field-air {

				opacity: 1;
				background-color: @danger;
				border-color: @danger;
			}

			.avatar {

				border: 2px solid @danger;
			}

			.field-input {

				background: fade(white, 25%);
			}
		}

		&.is-selected {

			z-index: 100;

			.field-name, .field-air { opacity: 1; }

			.field-close {

				display: block;
				z-index: 1000;
			}
		}
	}

</style>