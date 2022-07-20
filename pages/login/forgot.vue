<template>
	<form
		method="post"
		novalidate
		class="form-forgot"
		@submit.prevent="forgot"
	>
		<div class="logo-wrapper">
		</div>

		<div class="form-copy">
			<div class="the-content">
				<h2>{{ $t('login.forgot.title') }}</h2>
				<p>{{ $t('login.forgot.tagline') }}</p>
			</div>
		</div>

		<message
			:type="messages.forgot.type"
			v-model="messages.forgot.text"
		/>

		<div
			class="form-fields"
			data-aos="fade-right"
			data-aos-delay="100"
		>
			<form-group>
				<input
					type="email"
					tabindex="1"
					name="forgot-email"
					id="forgot-email"
					v-model.trim="forgotEmail"
					class="form-control form-control-email input-block is-transparent"
					:placeholder="$t('login.forgot.field.email')"
					autocorrect="off"
					autocapitalize="off"
					spellcheck="false"
					autocomplete="forgot-email"
				/>
			</form-group>
		</div>
		<div class="form-actions">
			<div class="row row-md">
				<div class="col col-md-4">
					<p
						class="action action-return-login"
						data-aos="fade-down"
						data-aos-delay="200"
					>
						<nuxt-link
							:to="localePath('/login')"
							class="button button-link"
						>
							{{ $t('login.action.back') }}
						</nuxt-link>
					</p>
				</div>
				<div class="col col-md-8">
					<p
						class="action-submit"
						data-aos="fade-down"
						data-aos-delay="300"
					>
						<button type="submit" class="button button-primary">
							{{ $t('login.forgot.action.send') }}
							<span class="icon"><i class="fa fa-fw fa-paper-plane" /></span>
						</button>
					</p>
				</div>
			</div>
		</div>
	</form>
</template>

<script>
	import { required, email } from 'vuelidate/lib/validators';
	//import ChLogo from "~/assets/images/template/logo.svg?inline";

	export default {
		name: 'LoginPageForgot',
		layout: 'gate',
		middleware: 'auth',
		auth: 'guest',
		transition: 'slide-big',
		data: () => ({
			messages: {
				forgot: {
					type: '',
					text: ''
				}
			},
			forgotEmail: ''
		}),
		validations: {
			forgotEmail: { required, email }
		},
		mounted() {
			AOS.init({ once: true });
		},
		methods: {
			async forgot() {
				var obj = this;

				obj.$v.forgotEmail.$touch();
				if (obj.$v.forgotEmail.$invalid) {

					obj.messages.forgot.type = 'error';
					obj.messages.forgot.text = 'Enter a valid email';
					return;
				}

				try {
					await obj.$axios.post(`/users/password-link/${ obj.forgotEmail }`)
					obj.messages.forgot.type = 'success';
					obj.messages.forgot.text = `Thank you, an email has been sent to ${ obj.forgotEmail } with an re-activation link.`;
					return;

				} catch(e) {

					obj.messages.forgot.text = e.response?.data.message || e.message;
					obj.messages.forgot.type = 'error';
				}
			}
		}
	};
</script>