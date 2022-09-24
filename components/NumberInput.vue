<template>
	<label
		:for="`toggle_switch_${ uid }`"
		:class="{ active: state }"
		class="toggle-switch"
	>
		<input
			type="checkbox"
			:disabled="disabled"
			:id="`toggle_switch_${ uid }`"
			v-model="state"
		/>
		<span class="toggle-button" />
		<slot>
			<span v-if="state" class="switch-label">
				{{ label }}
			</span>
			<span v-else class="switch-label">
				{{ offLabel }}
			</span>
		</slot>
	</label>
</template>

<script>
export default {
	name: "ToggleSwitch",
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
		label: {
			type: String,
			default: 'On',
		},
		offLabel: {
			type: String,
			default: 'Off',
		},
		color: {
			type: String,
			default: '#53B883'
		},
		value: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		uid() { return this._uid; },
		state: {
			get() { return this.value; },
			set(state) { console.log('ok', state); this.$emit('input', state); },
		},
	},
	methods: {
		toggle(event) {

			this.state = event.target.checked;
			this.$emit('input', this.state);
		}
	}
};
</script>

<style scoped lang="less">

	.toggle-switch {

		display: inline-flex;
		vertical-align: baseline;
		user-select: none;
		cursor: pointer;
		@switch-size: 1em;

		input[type="checkbox"] {

			opacity: 0;
			position: absolute;
			width: 1px;
			height: 1px;
		}

		.toggle-button {

			display: inline-block;
			height: @switch-size;
			border-radius: @switch-size;
			min-width: @switch-size*2;
			background: @gray-4;
			box-shadow: inset 0 0 1px @gray-4;
			position: relative;
			transition: all .25s;
			margin-right: @margin-half;

			&:after,
			&:before {

				content: '';
				position: absolute;
				display: block;
				height: @switch-size;
				width: @switch-size;
				border-radius: 50%;
				left: -1px;
				top: 0;
				transform: translateX(0);
				transition: all .25s cubic-bezier(.5, -.6, .5, 1.6);
			}

			&:after {

				background: @gray-7;
				box-shadow: 0 0 1px @gray-7;
			}

			&:before {
				background: @gray-7;
				box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
				opacity: 0;
			}
		}

		.switch-label {

			line-height: @switch-size;
			display: inline-block;
			vertical-align: baseline;
		}

		&.active .toggle-button {

			background: var(--success-light);
			box-shadow: inset 0 0 1px var(--success-light);
		}

		&.active .toggle-button:after,
		&.active .toggle-button:before {

			transform: translateX(@switch-size);
		}

		&.active .toggle-button:after {

			left: 1px;
			background: var(--success);
			box-shadow: 0 0 1px var(--success);
		}
	}

</style>