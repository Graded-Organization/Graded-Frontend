<template>
	<div class="section-profile">
		<div class="m-double">

			<div class="inner">
				<div class="profile-wrapper">

					<h2 class="dashboard-title">My Profile</h2>

					<message
						v-model="messages.update.text"
						:type="messages.update.type"
						class="mb-default"
					/>

					<div class="form-fields">
						<h3 class="profile-title">My Information</h3>
						<div class="profile-block">
							<form-group
								:label="$t('register.field.firstname')"
								required
								:has-error="$v.profile.metas.firstname.$error"
							>
								<input
									v-model.trim="$v.profile.metas.firstname.$model"
									type="text"
									tabindex="1"
									:disabled="loading"
									class="form-control input-block"
									autocorrect="off"
									spellcheck="false"
								/>
								<template #help-block>This field is required</template>
							</form-group>

							<form-group
								:label="$t('register.field.lastname')"
								required
								:has-error="$v.profile.metas.lastname.$error"
							>
								<input
									v-model.trim="$v.profile.metas.lastname.$model"
									type="text"
									tabindex="2"
									:disabled="loading"
									class="form-control input-block"
									autocorrect="off"
									spellcheck="false"
								/>
								<template #help-block>This field is required</template>
							</form-group>

							<form-group
								:label="$t('register.field.username')"
							>
								<input
									v-model.trim="$auth.user.email"
									type="email"
									disabled
									tabindex="3"
									class="form-control input-block"
									autocorrect="off"
									autocapitalize="off"
									spellcheck="false"
									autocomplete="do-not-autofill"
								/>
							</form-group>

							<p class="text-right">
								<a
									href="#"
									@click.prevent="updateProfile"
									class="button button-primary"
									:class="{ 'is-loading': loading }"
								>SaveDetails</a>
							</p>
						</div>

						<h3 class="profile-title">Security</h3>
						<div class="profile-block">
							<p><a href="#" class="button button-primary">Change password</a></p>
						</div>

						<h3 class="profile-title">Danger Zone</h3>
						<div class="profile-block">
							<p><a href="#" class="button button-danger">Delete account</a></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {required} from 'vuelidate/lib/validators';
	import Password from 'vue-password-strength-meter';

	export default {
		name: 'ProfilePage',
		middleware: 'auth',
		layout: 'platform',
		components: {Password},
		data: () => ({
			loading: false,
			messages: {
				update: {
					type: '',
					text: ''
				}
			},
			profile: {
				metas: {
					firstname: '',
					lastname: '',
				}
			}
		}),
		validations: {
			profile: {
				metas: {
					firstname: {required},
					lastname: {required},
				}
			}
		},
		mounted() {

			this.profile.metas.firstname = this.$auth.user.metas.firstname;
			this.profile.metas.lastname = this.$auth.user.metas.lastname;
		},
		methods: {
			async updateProfile() {
				const obj = this;

				this.loading = true;

				obj.$v.profile.$touch();
				if (obj.$v.profile.$invalid) {

					return;
				}

				await this.$axios.$put('/users/me', this.profile);

				this.messages.update.type = "success";
				this.messages.update.text = "Alrighty then! Your information has been updated.";

				this.loading = false;
			}
		}
	}
</script>

<style scoped lang="less">

	.section-profile {

		width: 100%;
		background: @background-1;
	}


	.profile-wrapper {

		max-width: 640px;
		margin: 0 auto;

		.dashboard-title {

			font-size: @font-size-4;
			margin-bottom: @margin-default;
			text-align: center;
		}

		.profile-title {

			font-size: 1.2rem;
			margin-bottom: @margin-half;
		}

		.profile-block {

			background: white;
			padding: @margin-default;
			border-radius: @radius-2;
			margin-bottom: @margin-double;
		}

	}

</style>