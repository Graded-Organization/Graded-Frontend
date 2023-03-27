<template>
	<div class="section-dashboard-sharing" v-if="sharing">
		<div class="inner boxfix-vert">
			<div class="m-double">
				<div class="|">

					<a href="#" @click.prevent="sharingModal = true" class="button button-primary">Share</a>

					<graded-modal
						v-model="sharingModal"
						name="sharing-tool"
						:show-close="true"
					>
						<graded-sharing />
					</graded-modal>

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

					<h2 class="sharing-title">Share by application link</h2>

					<div class="sharing-block">
						<graded-data-table
							:columns="columnsApplicants"
							:url="`/worksheets/${ $route.params.worksheet }/applications?pdo[applicants]=getApplicants&query_fields=id,uid,id_worsheet,grade,status,user_name,created,applicants`"
							:max-height="`calc(100vh - 225px)`"
						>
							<div slot="applicantsNumber" slot-scope="props">
								<p v-tooltip.left="{ content: `${ formatApplicants(props.row.applicants) }`, html: true }">{{ props.row.applicants.length }}</p>
							</div>
							<div slot="view" slot-scope="props">
								<a
									href="#"
									@click.prevent="copy(`${ $config.baseUrl }/application/${ props.row.uid }`)"
									class="button button-small button-ghost-primary button-pill"
								>Copy application link</a>
							</div>
						</graded-data-table>
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
									<form-group
										label="Email"
										required
										:class="{ 'has-error': $v.invitee.email.$error }"
									>
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
								<button
									@click="sendInvite"
									class="button button-primary"
									:disabled="sharingLoading"
								>Send invite
								</button>
							</p>
						</div>
					</div>

					<!-- -->

					<h2 class="sharing-title">Embed</h2>

					<div class="sharing-block">

						<p class="embeding-switch" :class="{ 'is-active': sharing.embeding }">
							<toggle-switch
								v-model="sharing.embeding"
								label="Embeding enabled"
								off-label="Embeding disabled"
							/>
						</p>

						<div class="row" v-if="sharing.embeding">
							<div class="col col-4">

								<div class="m-default">
									<p class="mb-default">
										<toggle-switch
											v-model="embed.showHeader"
											label="Show Header"
											off-label="Hide Header"
										/>
									</p>

									<p class="mb-default ml-default" v-if="embed.showHeader">
										<toggle-switch
											v-model="embed.showSheetInfo"
											label="Show Worksheet Information"
											off-label="Hide Worksheet Information"
										/>
									</p>

									<p class="mb-default ml-default" v-if="embed.showHeader">
										<toggle-switch
											v-model="embed.showUserInfo"
											label="Show User Information"
											off-label="Hide User Information"
										/>
									</p>

									<p class="mb-default">
										<toggle-switch
											v-model="embed.showBranding"
											label="Show Branding"
											off-label="Hide Branding"
										/>
									</p>

									<p class="mb-default">
										<toggle-switch
											v-model="embed.showActions"
											label="Show Actions"
											off-label="Hide Actions"
										/>
									</p>
								</div>

							</div>
							<div class="col">

								<p class="text-right mb-default">

									<a
										class="button button-link button-small"
										@click.prevent="showPreview"
									><i class="icon fa-fw far fa-external-link-alt" /> Preview</a>

									<a
										@click.prevent="copy(embedCode)"
										v-tooltip.bottom="'Click to copy link'"
										class="button button-primary button-small"
									><i class="icon fa-fw fal fa-copy" /> Copy Embed</a>
								</p>

								<div class="code-wrapper">
									{{ embedCode }}
								</div>
							</div>
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

					<!-- -->
				</div>
			</div>
		</div>

		<graded-modal
			v-model="showModal"
			name="application-worksheet"
		>
			<template v-slot="{ params, close }">
				<div class="modal-wrapper">

					<div class="controls">
						<div class="control">
							<toggle-switch
								v-model="embed.showHeader"
								label="Show Header"
								off-label="Hide Header"
							/>
						</div>

						<div class="control" v-if="embed.showHeader">
							<toggle-switch
								v-model="embed.showSheetInfo"
								label="Show Worksheet Information"
								off-label="Hide Worksheet Information"
							/>
						</div>

						<div class="control" v-if="embed.showHeader">
							<toggle-switch
								v-model="embed.showUserInfo"
								label="Show User Information"
								off-label="Hide User Information"
							/>
						</div>

						<div class="control">
							<toggle-switch
								v-model="embed.showBranding"
								label="Show Branding"
								off-label="Hide Branding"
							/>
						</div>

						<div class="control">
							<toggle-switch
								v-model="embed.showActions"
								label="Show Actions"
								off-label="Hide Actions"
							/>
						</div>

						<div class="actions">
							<a
								@click.prevent="copy(embedCode)"
								v-tooltip.bottom="'Click to copy link'"
								class="button button-primary button-small"
							><i class="icon fa-fw fal fa-copy" /> Copy Embed</a>
						</div>
					</div>

					<div class="previews">
						<div class="desktop">
							<h2>Desktop Embed Preview</h2>

							<div v-html="embedCode"></div>
						</div>

						<div class="mobile">
							<h2>Mobile Embed Preview</h2>
							<!-- <div v-html="embedCode"></div> -->
						</div>
					</div>
				</div>
			</template>
		</graded-modal>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapGetters, mapActions } from 'vuex';
	import WorksheetMixin from '../worksheet.mixin.js';
	import { required, email } from 'vuelidate/lib/validators';

	const defaultSharing = {
		public: true,
	};

	export default {
		name: 'WorkSheetPageSharing',
		middleware: 'auth',
		mixins: [WorksheetMixin],
		watch: {
			sharing: {
				handler(n, o) {

					this.setWorksheetProp({ name: 'sharing', value: this.$shallow(n) });
					this.save();
				},
				deep: true,
			},
		},
		data: () => ({
			showModal: false,
			sharingLoading: false,
			sharing: null,
			sharingModal: false,
			invitee: {
				firstname: '',
				lastname: '',
				email: '',
				message: '',
			},
			embed: {
				showHeader: true,
				showBranding: true,
				showSheetInfo: true,
				showUserInfo: true,
				showActions: true,
			},
			formatApplicants(applicants) {

				if(!applicants.length) false;

				let applicantsString = '';

				for(const a in applicants) {
					applicantsString += applicants[a].nicename + '<br>';
				}

				return applicantsString;
			},
			columnsApplicants: [
				{
					label: 'ID',
					field: 'id',
				},
				{
					label: 'Name',
					field: 'user_name',
				},
				{
					field: 'applicantsNumber',
					label: 'Applicants',
				},
				{
					field: 'status',
					label: 'Activity',
				},
				{
					field: 'view',
					label: 'View',
					width: '150px',
					tdClass: 'text-center',
				},
			],
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
					tdClass: 'text-center',
				},
			],
		}),
		validations: {
			invitee: {
				firstname: { required },
				lastname: { required },
				email: { required, email },
			},
		},
		computed: {

			embedCode() {

				let params = {};

				if(!this.embed.showHeader) params['header'] = 0;
				if(!this.embed.showBranding) params['branding'] = 0;
				if(!this.embed.showSheetInfo) params['sheet_info'] = 0;
				if(!this.embed.showUserInfo) params['user_info'] = 0;
				if(!this.embed.showActions) params['actions'] = 0;

				let result = Object.values(params).length ? '?' + new URLSearchParams(params).toString() : '';

				return '<iframe class="graded-embed" src="' + `${ this.$config.baseUrl }/worksheet/embed/${ this.worksheet.uid }${ result }` + '" backgroundColor="gray" frameborder="0" onmousewheel="" width="100%" height="533" style="background: transparent; border: 1px solid #ccc;"></iframe>';
			},
		},
		mounted() {

			if(!this.worksheet?.content?.sharing) {
				this.setWorksheetProp({ name: 'sharing', value: defaultSharing });
			}

			this.setWorksheetProp({
				name: 'sharing',
				value: { ...defaultSharing, ...this.worksheet?.content?.sharing },
			});

			Vue.set(this, 'sharing', this.$shallow(this.worksheet.content.sharing));
		},
		methods: {
			...mapActions({
				setWorksheetProp: 'worksheet/setWorksheetProp',
			}),
			showPreview() {
				this.showModal = true;
			},
			async copy(text) {
				try {
					await this.$copyText(text);

					this.$notify({
						group: 'graded',
						title: 'Copied!',
						text: 'Link copied to clipboard, sweet!',
					});

				} catch(e) {
					console.error(e);
				}
			},
			async sendInvite() {

				const obj = this;

				obj.$v.invitee.$touch();
				if(obj.$v.invitee.$invalid) {

					return;
				}

				this.sharingLoading = true;

				const res = await this.$axios.$post(`/worksheets/${ obj.$route.params.worksheet }/email-invite`, this.invitee);

				this.sharingLoading = false;

				this.$v.$reset();

				this.$notify({
					group: 'graded',
					type: res.result,
					title: res.result === 'success' ? 'Alright!' : 'Oh no!',
					text: res.message,
				});

				await this.$refs.invitationsTable.refresh();

				if(res.result === 'success') {

					this.invitee = {
						firstname: '',
						lastname: '',
						email: '',
						message: '',
					};
				}
			},
		},
	};
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

	.code-wrapper {

		border-radius: @radius-2;
		background: @background-9;
		color: white;
		word-break: break-all;
		font-family: monospace;
		padding: @margin-double;
	}

	.embeding-switch {

		&.is-active {

			border-bottom: 1px solid @border-1;
			padding-bottom: @margin-default;
			margin-bottom: @margin-default;
		}
	}

	/deep/ .modal-content {

		max-width: 100%;

		.modal-wrapper {

			width: 90vw;
			box-sizing: border-box;

			.controls {

				display: flex;
				border-bottom: 1px solid @border-1;
				margin-bottom: @margin-default;
				align-items: center;
				padding-bottom: @margin-default;

				.control {

					margin-right: @margin-default;
				}

				.actions {

					margin-left: auto;
				}
			}

			.previews {

				display: flex;

				h2 {

					font-size: 1.2rem;
					margin-bottom: @margin-default;
				}

				.desktop {

					flex: 1;
					margin-right: @margin-double;
				}

				.mobile {

					width: 320px;
				}
			}
		}
	}

	/deep/ .modal-container .sharing-wrapper {

		width: 400px;
		padding: 0 !important;
	}

</style>