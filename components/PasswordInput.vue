<template>
	<div>
		<div class="input-wrapper">
			<input
				v-model="input"
				type="password"
				tabindex="1"
				class="form-control input-block"
				autocorrect="off"
				autocapitalize="off"
				autocomplete="do-not-autofill"
			/>
			<div
				v-if="input"
				class="password-score"
				:data-score="password.score"
			>{{ password.score }}
			</div>
		</div>

		<transition-slide>
			<div v-if="input">
				<password
					v-model="value"
					:strength-meter-only="true"
					@score="showScore"
					@feedback="showFeedback"
				/>
			</div>
		</transition-slide>
		<transition-slide>
			<div class="help-block" v-if="password.warning">
				<span>{{ password.warning }}</span>
			</div>
		</transition-slide>
	</div>
</template>

<script>
	import Password from 'vue-password-strength-meter';

	export default {
		name: 'PasswordInput',
		components: { Password },
		props: {
			value: {
				type: String,
				required: true,
			},
		},
		data: () => ({
			password: {
				suggestions: [],
				warning: '',
				score: 0,
			},
		}),
		computed: {
			input: {
				get() {
					return this.value;
				},
				set(value) {
					this.$emit('input', value);
				},
			},
		},
		methods: {
			showFeedback({ suggestions, warning }) {
				console.log('🙏', suggestions);
				console.log('⚠', warning);
				this.password.warning = warning;
			},
			showScore(score) {
				console.log('💯', score);
				this.password.score = score;
			},
		},
	};
</script>

<style scoped lang="less">
	.password-score {

		position: absolute;
		top: 0;
		right: @margin-half;
		line-height: 1rem;
		padding: @margin-half;
		background: @background-1;
		top: calc(~"50% - ((1rem + @{margin-half} + @{margin-half})/2)");
		border-radius: 2px;
		width: 2rem;
		text-align: center;

		&[data-score='0'] { background: @background-1; }

		&[data-score='1'] { color: white; background: #ff4500; }

		&[data-score='2'] { color: white; background: orange; }

		&[data-score='3'] { color: white; background: #9acd32; }

		&[data-score='4'] { color: white; background: green; }
	}

	/deep/ .Password {

		max-width: 100%;

		.Password__strength-meter {

			margin-bottom: 0;
		}
	}
</style>