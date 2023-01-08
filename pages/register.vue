<template>
	<form
		@submit.prevent="register"
		method="post"
		class="form-login"
		novalidate
	>
		<div class="logo-wrapper">
			<graded-logo :size="8" />
		</div>

		<transition-slide>
			<div v-show="!success">
				<div class="form-copy">
					<div class="the-content">
						<h2 data-aos="fade-left" data-aos-delay="100">{{ $t('register.title') }}</h2>
						<p data-aos="fade-left" data-aos-delay="200">{{ $t('register.tagline') }}</p>
					</div>
				</div>

				<message
					v-model="messages.register.text"
					:type="messages.register.type"
					class="mb-default"
				/>

				<div
					class="form-fields"
					data-aos="fade-right"
					data-aos-delay="100"
				>
					<div class="row">
						<div class="col">
							<form-group
								:label="$t('register.field.firstname')"
								required
								:has-error="$v.registerFields.firstname.$error"
							>
								<input
									v-model.trim="$v.registerFields.firstname.$model"
									type="text"
									tabindex="1"
									class="form-control input-block"
									autocorrect="off"
									spellcheck="false"
								/>
								<template #help-block>This field is required</template>
							</form-group>
						</div>
						<div class="col">
							<form-group
								:label="$t('register.field.lastname')"
								required
								:has-error="$v.registerFields.lastname.$error"
							>
								<input
									v-model.trim="$v.registerFields.lastname.$model"
									type="text"
									tabindex="1"
									class="form-control input-block"
									autocorrect="off"
									spellcheck="false"
								/>
								<template #help-block>This field is required</template>
							</form-group>
						</div>
					</div>

					<form-group
						:label="$t('register.field.username')"
						required
						:has-error="$v.registerFields.username.$error"
					>
						<input
							v-model.trim="$v.registerFields.username.$model"
							type="email"
							tabindex="1"
							class="form-control input-block"
							autocorrect="off"
							autocapitalize="off"
							spellcheck="false"
							autocomplete="do-not-autofill"
						/>
						<template #help-block>
							<span v.if="!$v.registerFields.username.email">Please enter a valid email</span>
						</template>
					</form-group>

					<form-group
						:label="$t('register.field.password')"
						required
						:has-error="$v.registerFields.password.$error"
					>
						<div class="input-wrapper">
							<input
								v-model.trim="$v.registerFields.password.$model"
								type="password"
								tabindex="1"
								class="form-control input-block"
								autocorrect="off"
								autocapitalize="off"
								autocomplete="do-not-autofill"
							/>
							<div v-if="$v.registerFields.password.$model" class="password-score" :data-score="password.score">{{ password.score }}</div>
						</div>

						<transition-slide>
							<div v-if="!$v.registerFields.password.$error">
								<password
									v-model="$v.registerFields.password.$model"
									:strength-meter-only="true"
									@score="showScore"
									@feedback="showFeedback"
								/>
								<div class="help-block">
									<span v-if="password.warning">{{ password.warning }}</span>
								</div>
							</div>
						</transition-slide>

						<template #help-block>This field is required</template>
					</form-group>
				</div>
				<div class="form-actions mb-default">
					<p
						class="action-submit"
						data-aos="fade-left"
						data-aos-delay="400"
					>
						<button type="submit" class="button button-primary">
							{{ $t('register.action.register') }}
							<span class="icon"><i class="fa fa-fw fa-angle-right" /></span>
						</button>
					</p>
				</div>

				<div class="already">
					<p>Already have an account? <nuxt-link to="/login">Sign in here</nuxt-link>.</p>
				</div>
			</div>
		</transition-slide>
		<transition-slide>
			<div v-show="success">
				<div class="the-content">
					<h2>Alrighty!</h2>
					<p>An email has been sent to your email address with a link to activate and access your <strong>GRADED!</strong> account.</p>
					<p>Please check your Spam folder, we may be there.</p>

					<p><nuxt-link to="/login" class="button button-primary">Sign in here</nuxt-link></p>
				</div>

			</div>
		</transition-slide>
	</form>
</template>

<script>
	import { required, email } from 'vuelidate/lib/validators';
	import Password from 'vue-password-strength-meter';

	export default {
		name: 'RegisterPage',
		layout: 'gate',
		middleware: 'auth',
		auth: 'guest',
		components: { Password },
		data: () => ({
			success: false,
			messages: {
				register: {
					type: '',
					text: ''
				}
			},
			registerFields: {
				firstname: '',
				lastname: '',
				username: '',
				password: ''
			},
			password: {
				suggestions: [],
				warning: '',
				score: 0
			}
		}),
		validations: {
			registerFields: {
				firstname: { required },
				lastname: { required },
				username: { required, email },
				password: { required }
			}
		},
		mounted() {
			AOS.init({ once: true });
		},
		methods: {
			async register() {
				var obj = this;

				obj.$v.registerFields.$touch();
				if (obj.$v.registerFields.$invalid) {

					return;
				}

				const res = await this.$axios.$post('/users/register', this.registerFields);

				this.success = true;
			},
			showFeedback({suggestions, warning}) {
				console.log('🙏', suggestions);
				console.log('⚠', warning);
				this.password.warning = warning;
			},
			showScore(score) {
				console.log('💯', score);
				this.password.score = score;
			}
		}
	};
</script>

<style lang="less" scoped>

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

		&[data-score="0"]{ background: @background-1; }
		&[data-score="1"]{ color: white; background: #ff4500; }
		&[data-score="2"]{ color: white; background: orange; }
		&[data-score="3"]{ color: white; background: #9acd32; }
		&[data-score="4"]{ color: white; background: green; }
	}

	/deep/ .Password {

		max-width: 100%;

		.Password__strength-meter {

			margin-bottom: 0;
		}
	}

	.already {

		.container-style;

		a {

			color: @primary;
			text-decoration: none;
		}
	}

</style>