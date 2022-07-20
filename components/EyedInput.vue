<template>
	<form-group class="form-group-eyed-input" tabindex="-1">
		<div class="form-control">
			<a
				href="#"
				@click.prevent="passwordType = passwordType == 'password' ? 'text' : 'password'"
				class="form-control-password-reveal fa fa-fw"
				:class="passwordType == 'password' ? 'fa-eye' : 'fa-eye-slash'"
			/>
			<input
				:type="passwordType"
				:value="value"
				:tabindex="tabindex"
				:class="['form-control-input', classes.input]"
				:placeholder="placeholder"
				:autocomplete="autocomplete"
				@input="handleInput"
				maxlength="25"
			>
		</div>
	</form-group>
</template>

<script>
	import FormGroup from '~/components/FormGroup.vue';

	export default {
		name: 'EyedInput',
		components: { 'form-group': FormGroup },
		props: {
			value: {
				type: String,
				default: ''
			},
			classes: {
				type: Object,
				default: () => ({}),
			},
			placeholder: {
				type: String,
				default: '',
			},
			tabindex: {
				type: [String, Number],
				default: '2',
			},
			autocomplete: {
				type: String,
				default: 'current-password',
			}
		},
		data: () => ({
			passwordType: 'password',
		}),
		methods: {
			handleInput(e) {
				this.$emit('input', e.target.value);
			}
		}
	};
</script>
<style scoped lang="less">

	.form-group {

		.form-control {

			display: flex;

			.form-control-password-reveal {

				position: absolute;
				right: 0;
				bottom: 0;
				height: 100%;
				font-size: 1.2em;
				padding: 0 @margin-third * 2;
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				width: 40px;
				box-sizing: border-box;
				min-width: 40px;
				max-width: 40px;
				text-decoration: none;
				color: @body-color;
			}

			.form-control-input {

				&:extend(.form-group .form-control);
				padding-left: 0;
				height: auto;
				border: none;
				background: none;
				width: calc(~'100% - 40px') !important;

				&:focus {

					outline: 0;
					box-shadow: 0;
				}
			}

			&:focus-within {

				&:extend(.form-group .form-control:focus);
			}
		}
	}
</style>