<template>
	<div
		:class="['graded-dropdown', classes.root]"
		@click="isHovered = true"
		@focus="isFocused = true"
		@blur="isFocused = false"
		@focusout="onFocusout"
	>
		<button
			:aria-expanded="!!isHovered || !!isFocused"
			aria-haspopup="true"
			:class="['graded-dropdown-trigger', classes.trigger]"
			type="button"
			@click="isFocused = !isFocused"
		>
			<!-- @slot The content within the trigger button -->
			<slot name="trigger">
				{{ text }}
			</slot>
		</button>

		<div
			v-if="!!isHovered || !!isFocused"
			class="graded-dropdown-content"
			:class="[`graded-dropdown-content--${position}`, classes.content]"
		>
			<!-- @slot The dropdown content -->
			<slot />
		</div>
	</div>
</template>

<script>
	/**
	 * Adds a button that can show/hide dropdown content when it is hovered over, or clicked. When it is clicked, the content will persist until the user clicks out or focuses out. Includes relevant ARIA attributes for the hidden content.
	 */
	export default {
		name: 'VDrawer',
		props: {
			text: {
				type: String,
				default: '',
			},
			position: {
				type: String,
				default: 'bottom',
				/** @param {string} value */
				validator(value) {
					return ['top', 'bottom'].includes(value);
				},
			},
			/**
			 * The transition name.
			 */
			transition: {
				type: String,
				default: '',
			},
			classes: {
				type: Object,
				default: () => ({}),
			},
		},
		data: () => ({
			isHovered: false,
			isFocused: false,
		}),
		mounted() {
			document.addEventListener('click', this.onClickout);
		},
		/** @deprecated in Vue 3 */
		beforeDestroy() {
			document.removeEventListener('click', this.onClickout);
		},
		beforeUnmount() {
			document.removeEventListener('click', this.onClickout);
		},
		methods: {
			onClickout(e) {
				if(!this.$el.contains(e.target)) {
					this.isFocused = false;
				}
			},
			onFocusout(event) {
				if(!this.$el.contains(event.relatedTarget)) {
					this.isFocused = false;
				}
			},
		},
	};
</script>

<style lang="less" scoped>

	.graded-dropdown {

		display: inline-block;
		position: relative;
		padding-right: 2.25em !important;
		-moz-padding-start: calc(0.75em - 3px);
		background-image: url('data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\'%3e%3cpath fill=\'none\' stroke=\'%23343a40\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M2 5l6 6 6-6\'/%3e%3c/svg%3e');
		background-repeat: no-repeat;
		background-position: right .55em center;
		background-size: 16px 12px;

		&:disabled, .is-disabled { background-color: var(--background-2); }

		&:disabled {

			pointer-events: none;
			filter: none;
			opacity: 0.5;
		}
	}

	.graded-dropdown-content {

		position: absolute;
		z-index: 5;
		min-inline-size: 100%;
		top: 100%;
		background-color: white;
		border: 1px solid @border-1;
		right: 0;

		nav {

			ul {

				li {

					a {

						display: block;
						padding: @margin-half;
						white-space: nowrap;
						text-decoration: none;
					}
				}
			}
		}
	}

	.graded-dropdown-content-top {

		inset-block-start: 0;
		transform: translateY(-100%);
	}
</style>