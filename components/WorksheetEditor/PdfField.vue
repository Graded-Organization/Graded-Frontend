<template>
	<div
		class="field-wrapper"
		:style="fieldStyles"
		:class="{ 'is-selected': selected, 'is-focused': focused }"
	>
		<span class="field-name">
			<a href="#" @click.prevent="$emit('show-tool', value.id)" v-if="!selected">
				<i class="fas fa-fw fa-external-link-square-alt" />
			</a>

			<a href="#" @click.prevent="$emit('hide-tool')" v-if="selected">
				<i class="fal fa-fw fa-times" />
			</a>
			<strong>Name:</strong>
			<span>{{ value.name }}</span>
		</span>

		<textarea @focus="focusField" class="field-input"></textarea>

		<div class="field-air"></div>
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
		},
		computed: {

			fieldStyles() {

				return {
					bottom: this.value.content.geo?.y + '%',
					left: this.value.content.geo?.x + '%',
					width: this.value.content.geo?.width + '%',
					height: this.value.content.geo?.height + '%'
				};
			},
		},
		methods: {

			focusField() {

				this.$emit('focus-tool', this.value.id);
			}
		}
	};
</script>

<style lang="less" scoped>

	.field-wrapper {

		position: absolute;
		box-sizing: border-box;
		transition: all 150ms;

		.field-name {

			display: flex;
			align-items: center;
			white-space: nowrap;
			position: absolute;
			line-height: 22px;
			height: 22px;
			top: -31px;
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
		}

		.field-air {

			border: 1px solid @border-1;
			opacity: 0;
			border-radius: @radius-2;
			box-shadow: @-shadow-3;
			.overlay-element();
			width: calc(~"100% + 20px");
			height: calc(~"100% + 20px");
			background: white;
			margin-left: -10px;
			margin-top: -10px;
			z-index: 0;
		}

		.field-input {

			background: fade(black, 12.5%);
			.overlay-element();
			resize: none;
			padding: @margin-half;
			z-index: 1;
		}

		&:hover {

			z-index: 100;
			.field-name, .field-air { opacity: 1; }
		}

		&.is-focused {

			z-index: 100;
			.field-name, .field-air { opacity: 1; }
		}

		&.is-selected {

			z-index: 100;

			.field-name, .field-air { opacity: 1; }
			width: 80% !important;
			min-height: 100px !important;
			left: 10% !important;

			.field-input {

				border-radius: @radius-2;
			}

			.field-name {

				padding-right: @margin-double;
				font-size: 1rem;
				height: 30px;
				line-height: 25px;
				top: -39px;
			}
		}
	}

</style>