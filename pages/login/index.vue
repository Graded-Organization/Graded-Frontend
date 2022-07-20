<template>
	<form
		@submit.prevent="login"
		method="post"
		class="form-login"
		novalidate
	>
		<div class="logo-wrapper">
			<logo />
		</div>

		<div class="form-copy">
			<div class="the-content">
				<h2 data-aos="fade-left" data-aos-delay="100">{{ $t('login.title') }}</h2>
				<p data-aos="fade-left" data-aos-delay="200">{{ $t('login.tagline') }}</p>
			</div>
		</div>

		<message
			v-model="messages.login.text"
			:type="messages.login.type"
			class="mb-default"
		/>

		<div
			class="form-fields"
			data-aos="fade-right"
			data-aos-delay="100"
		>
			<form-group>
				<input
					v-model.trim="loginCredentials.username"
					type="email"
					tabindex="1"
					class="form-control form-control-email input-block is-transparent"
					:placeholder="$t('login.field.email')"
					autocorrect="off"
					autocapitalize="off"
					spellcheck="false"
					autocomplete="username"
				/>
			</form-group>
			<eyed-input
				class="eyed-input"
				v-model.trim="loginCredentials.password"
				:placeholder="$t('login.field.password')"
				tabindex="2"
				:classes="{ input: 'input-block is-transparent' }"
			/>
		</div>
		<div class="form-actions mb-default">
			<div class="row row-md">
				<div class="col col-md-6">
					<p
						class="action action-remember"
						data-aos="fade-down"
						data-aos-delay="200"
					>
						<label>
							<input
								tabindex="3"
								type="checkbox"
								value="1"
								v-model.number="loginCredentials.remember"
							>
							{{ $t('login.action.remember') }}
						</label>
					</p>
				</div>
				<div class="col col-md-6">
					<p
						class="action action-forgot"
						data-aos="fade-down"
						data-aos-delay="300"
					>
						<nuxt-link
							:to="localePath('/login/forgot')"
							class="button button-link"
						>{{ $t('login.action.forgot') }}</nuxt-link>
					</p>
				</div>
			</div>

			<p
				class="action-submit"
				data-aos="fade-left"
				data-aos-delay="400"
			>
				<button type="submit" class="button button-primary">
					{{ $t('login.action.access') }}
					<span class="icon"><i class="fa fa-fw fa-angle-right" /></span>
				</button>
			</p>
		</div>

		<div class="already">
			<p>Do not have an account? <nuxt-link to="/register">Register here</nuxt-link>.</p>
		</div>
	</form>
</template>

<script>
	import { required, email } from 'vuelidate/lib/validators';
	import Logo from "~/assets/images/template/logo-mono.svg?inline";

	export default {
		name: 'LoginPageIndex',
		layout: 'gate',
		middleware: 'auth',
		auth: 'guest',
		transition: 'slide-big',
		components: { Logo },
		data: () => ({
			messages: {
				login: {
					type: '',
					text: ''
				}
			},
			loginCredentials: {
				username: '',
				password: '',
				remember: 0
			},
		}),
		validations: {
			loginCredentials: {
				username: { required },
				password: { required }
			}
		},
		mounted() {
			AOS.init({ once: true });
		},
		methods: {
			async login() {
				var obj = this;

				obj.$v.loginCredentials.$touch();
				if (obj.$v.loginCredentials.$invalid) {

					obj.messages.login.type = 'error';
					obj.messages.login.text = 'Enter correct credentials';
					return;
				}

				try {
					await obj.$auth.loginWith('local', {
						data: {
							username: obj.loginCredentials.username,
							password: obj.loginCredentials.password
						}
					});

				} catch (e) {

					obj.messages.login.text = e.response?.data.message || e.message;
					obj.messages.login.type = 'error';
				}
			}
		}
	};
</script>

<style lang="less" scoped>

	.form-group {

		margin-bottom: 0;
	}

	.form-control.form-control-email {

		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		margin-bottom: -1px;
	}

	/deep/ .eyed-input .form-control {

		border-top-left-radius: 0 !important;
		border-top-right-radius: 0 !important;
	}

	.already {

		.container-style;
	}
</style>