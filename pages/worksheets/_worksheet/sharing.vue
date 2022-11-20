<template>
	<div class="section-dashboard-sharing" v-if="sharing">
		<div class="inner boxfix-vert">
			<div class="m-double">
				<div class="sharing-wrapper">

					<h2 class="sharing-title">Share by Link</h2>

					<div class="sharing-block">
						<toggle-switch
							v-model="sharing.public"
							label="Worksheet link enabled"
							off-label="Worksheet link disabled"
						/>

						<div class="mt-default" v-if="sharing.public">
							<form-group>

								<div class="input-block form-control">
									<a
										@click.prevent="copy(`${ $config.baseUrl }/worksheet/${ worksheet.uid }`)"
										v-tooltip.bottom="'Click to copy link'"
									>{{ $config.baseUrl }}/worksheet/{{ worksheet.uid }}</a>
								</div>
							</form-group>
						</div>
					</div>

					<!-- -->

					<h2 class="sharing-title">Email invite</h2>

					<div class="sharing-block">
						<toggle-switch
							v-model="sharing.email"
							label="Email invites enabled"
							off-label="Email invites disabled"
						/>

						<div class="mt-default" v-if="sharing.email">
							<div class="row">
								<div class="col col-4">
									<form-group label="Email" required :class="{ 'has-error': $v.invitee.email.$error }">
										<input
											type="email"
											:disabled="sharingLoading"
											placeholder="elon@twitter.com"
											v-model.trim="$v.invitee.email.$model"
											class="input-block form-control"
										>
									</form-group>
								</div>
								<div class="col col-4">
									<form-group
										label="First name"
										required
										:class="{ 'has-error': $v.invitee.firstname.$error }"
									>
										<input
											type="text"
											:disabled="sharingLoading"
											placeholder="Elon"
											v-model.trim="$v.invitee.firstname.$model"
											class="input-block form-control"
										>
									</form-group>
								</div>

								<div class="col col-4">
									<form-group
										label="Last name"
										required
										:class="{ 'has-error': $v.invitee.lastname.$error }"
									>
										<input
											type="text"
											placeholder="Musk"
											:disabled="sharingLoading"
											v-model.trim="$v.invitee.lastname.$model"
											class="input-block form-control"
										>
									</form-group>
								</div>
							</div>

							<form-group label="Message (optional)">
								<textarea
									:disabled="sharingLoading"
									v-model.trim="invitee.message"
									class="input-block form-control"
								></textarea>
							</form-group>

							<p class="text-right mb-double">
								<button @click="sendInvite" class="button button-primary" :disabled="sharingLoading">Send invite</button>
							</p>
						</div>
					</div>

					<!-- -->

					<h2 class="sharing-title">Users</h2>

					<div class="sharing-block">
						<graded-data-table
							ref="invitationsTable"
							:columns="columns"
							:url="`/worksheets/${ $route.params.worksheet }/invitations`"
							:max-height="`500px`"
						>
							<div slot="user" slot-scope="props">
								<p>{{ props.row.user_name }}</p>
								<p><small>{{ props.row.user_email }}</small></p>
							</div>
							<div slot="permissions" slot-scope="props">
								<a href="#" class="button button-small button-danger">Delete</a>
							</div>
						</graded-data-table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapGetters, mapActions } from 'vuex';
	import WorksheetMixin from '../worksheet.mixin.js';
	import { required, email } from 'vuelidate/lib/validators';

	const defaultSharing = {
		public: true
	};

	export default {
		name: 'WorkSheetPageSharing',
		middleware: 'auth',
		mixins: [ WorksheetMixin ],
		watch: {
			sharing: {
				handler(n, o) {

					this.setWorksheetProp({name: 'sharing', value: this.$shallow(n) });
					this.save();
				},
				deep: true
			}
		},
		data: () => ({
			sharingLoading: false,
			sharing: null,
			invitee: {
				firstname: '',
				lastname: '',
				email: '',
				message: ''
			},
			columns: [
				{
					label: 'User',
					field: 'user',
				},
				{
					field: 'created',
					label: 'Invited',
					type: 'date',
					dateInputFormat: 'yyyy-MM-dd HH:mm:ss', // expects 2018-03-16
					dateOutputFormat: 'MMM do yyyy',
				},
				{
					field: 'source',
					label: 'Source',
				},
				{
					field: 'permissions',
					label: 'Permissions',
					tdClass: 'text-center'
				}
			],
		}),
		validations: {
			invitee: {
				firstname: { required },
				lastname: { required },
				email: { required, email }
			}
		},
		mounted() {

			if(!this.worksheet?.content?.sharing) {
				this.setWorksheetProp({name: 'sharing', value: defaultSharing});
			}

			this.setWorksheetProp({name: 'sharing', value: {...defaultSharing, ...this.worksheet?.content?.sharing}});

			Vue.set(this, 'sharing', this.$shallow(this.worksheet.content.sharing));
		},
		methods: {
			...mapActions({
				setWorksheetProp: 'worksheet/setWorksheetProp',
			}),
			async copy(text) {
				try {
					await this.$copyText(text);

					this.$notify({
						group: 'graded',
						title: 'Copied!',
						text: 'Text copied to clipboard, sweet!'
					});

				} catch (e) {
					console.error(e);
				}
			},
			async sendInvite() {

				const obj = this;

				obj.$v.invitee.$touch();
				if (obj.$v.invitee.$invalid) {

					return;
				}

				this.sharingLoading = true;

				const res = await this.$axios.$post(`/worksheets/${ obj.$route.params.worksheet }/email-invite`, this.invitee);

				this.sharingLoading = false;

				this.$v.$reset();

				this.$notify({
					group: 'graded',
					type: res.result,
					title: res.result == 'success' ? 'Alright!' : 'Oh no!',
					text: res.message
				});

				this.$refs.invitationsTable.refresh();

				if(res.result == 'success') {

					this.invitee = {
						firstname: '',
						lastname: '',
						email: '',
						message: ''
					}
				}
			}
		}
	}
</script>

<style scoped lang="less">

	.sharing-wrapper {

		margin: 0 auto;
	}

	.section-dashboard-sharing {

		width: 100%;
		background: @background-1;

		.sharing-title {

			font-size: 1.2rem;
			margin-bottom: @margin-half;
		}

		.sharing-block {

			background: white;
			padding: @margin-default;
			border-radius: @radius-2;
			margin-bottom: @margin-double;
		}
	}

</style>