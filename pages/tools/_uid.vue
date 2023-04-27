<template>
	<div class="application-wrapper">

		<!-- wait for nuxt fetch -->
		<div v-if="$fetchState.pending" class="application-loading">
			<p>Loading...</p>
		</div>
		<p v-else-if="$fetchState.error">An error occurred</p>
		<template v-else>
			<div class="application-header">

				<nuxt-link to="/dashboard" class="site-logo">
					<logo />
				</nuxt-link>

				<div class="worksheet-title">
					<div>
						<h2 class="worksheet-name-wrapper">{{ worksheetName }}</h2>
						<p
							v-if="worksheetDescription"
							class="worksheet-description-wrapper"
						>{{ worksheetDescription }}</p>
					</div>
				</div>

				<div class="header-actions">

					<div class="student-info">
						<div class="connected-user" v-for="user in connectedUsers">
							<div class="avatar-wrapper">
								<img
									class="avatar"
									width="40"
									:src="`${ $config.apiUrl }/users/${ user.id }/avatar?size=200`"
									v-tooltip.bottom="user.nicename || user.login"
									:style="`border-color: ${ $stringToColour(user.nicename) }`"
								>
							</div>
						</div>
					</div>

					<template v-if="hasAccess">
						<!--<a href="#" @click.prevent="showJoin" class="button button-primary">Share</a>-->
						<a
							@click.prevent="sharingModal = true"
							class="button button-small button-primary ml-half"
						>Share</a>
					</template>
				</div>
			</div>

			<div class="application-body" @click="showJoin">
				<div class="inner">

					<div class="my-default">
						<worksheet v-if="worksheet.type === 'grid'" />
						<worksheet-pdf
							v-else
							:class="{ 'not-active': !hasAccessToWorksheet }"
							:focused-fields="focusedFields"
						/>
					</div>
				</div>
			</div>

			<graded-modal
				v-model="enterModal"
				name="submit-application"
				v-if="!hasAccess"
			>
				<template v-slot="{ params, close }">
					<div v-if="modalMode === 'register'">
						<h2 class="enter-title">
							<img src="~/assets/images/template/transform-robot.svg" alt="Normie">
							<span v-if="!hasAccount">Get started!</span>
							<span v-else>Welcome back, {{ $auth.user.nicename }}</span>
						</h2>

						<!--<p class="enter-invitation" v-if="typeof link.options === 'undefined'">
							Join this tool as {{ roles[queryParamRole] }}
						</p>-->

						<p class="enter-invitation" v-if="typeof link.options !== 'undefined'">
							<strong>{{ link.options.inviter.nicename }}</strong> is inviting you to collaborate on this tool as
							<strong>{{ link.options.invite_type }}</strong>.
						</p>

						<div
							v-if="!hasAccount"
							class="submit-application"
							:class="{ 'animate__animated animate__shakeX': authenticateHasError }"
						>
							<div class="the-content text-center">
								<p class="mb-default">
									<strong>{{ owner }}</strong> is inviting you to join
									<strong>{{ worksheetName }}</strong> as
									<strong>{{ roles[queryParamRole] }}</strong>.<br>Create an account or login to start collaborating!
								</p>
							</div>

							<!--<p class="mb-default">
								<a href="#" @click.prevent="googleLogin" class="button button-google button-block">
									<span class="icon">
										<g-logo />
									</span>
									Access with Google Account
								</a>
							</p>

							<p class="text-center mb-default">or continue with your email</p>-->

							<div class="row">
								<div class="col col-6">
									<form-group
										label="First name"
										required
										:class="{ 'has-error': $v.user.firstname.$error }"
									>
										<input
											type="text"
											v-model.trim="$v.user.firstname.$model"
											class="input-block form-control"
										>
									</form-group>
								</div>

								<div class="col col-6">
									<form-group
										label="Last name"
										required
										:class="{ 'has-error': $v.user.lastname.$error }"
									>
										<input
											type="text"
											v-model.trim="$v.user.lastname.$model"
											class="input-block form-control"
										>
									</form-group>
								</div>
							</div>

							<form-group label="Email" required :class="{ 'has-error': $v.user.email.$error }">
								<input
									type="email"
									:readonly="!!workingJWTLink"
									v-model.trim="$v.user.email.$model"
									class="input-block form-control"
								>
							</form-group>

							<form-group
								label="Create Password"
								required
								:has-error="$v.user.password.$error"
							>
								<password-input v-model.trim="$v.user.password.$model"></password-input>

								<template #help-block>This field is required</template>
							</form-group>

							<div class="row">
								<div class="col" v-if="workingJWTLink">
									<a
										href="#"
										class="button button-block button-ghost-primary"
										@click.prevent="skipForNow"
									>Skip for now</a>
								</div>
								<div class="col">
									<a
										href="#"
										@click.prevent="joinWorksheet"
										class="button button-block button-primary"
									>Create account</a>
								</div>
							</div>
						</div>
						<div v-else class="text-center">
							<div class="the-content">
								<p class="mb-default">
									<strong>{{ owner }}</strong> is inviting you to join
									<strong>{{ worksheetName }}</strong> as
									<strong>{{ roles[queryParamRole] }}</strong>.<br>Accept the invite to start collaborating!
								</p>
							</div>

							<div class="submit-application">
								<p>
									<a href="#" @click.prevent="authJoin" class="button button-block button-primary">
										Accept invite
									</a>
								</p>
							</div>
						</div>

						<p v-if="!hasAccount" class="text-center pt-2">Have an account ? <a
							@click.prevent="modalMode = 'login'"
							href="#"
						>Log in</a></p>
					</div>

					<div v-else>
						<h2 class="enter-title">
							<img src="~/assets/images/template/transform-robot.svg" alt="Normie">
							<span v-if="!hasAccount">Log in</span>
						</h2>

						<div
							v-if="!hasAccount"
							class="submit-application"
							:class="{ 'animate__animated animate__shakeX': authenticateHasError }"
						>
							<div class="the-content text-center">
								<p class="mb-default">
									<strong>{{ owner }}</strong> is inviting you to join
									<strong>{{ worksheetName }}</strong> as
									<strong>{{ roles[queryParamRole] }}</strong>.<br>Create an account or login to start collaborating!
								</p>
							</div>

							<form-group label="Email" required :class="{ 'has-error': $v.login.email.$error }">
								<input
									type="email"
									v-model.trim="$v.login.email.$model"
									class="input-block form-control"
								>
							</form-group>

							<form-group
								label="Password"
								required
								:has-error="$v.login.password.$error"
							>
								<input
									type="password"
									v-model.trim="$v.login.password.$model"
									class="input-block form-control"
								>
							</form-group>

							<div class="row">
								<div class="col">
									<a
										href="#"
										@click.prevent="loginAndJoinWorksheet"
										class="button button-block button-primary"
									>Login</a>
								</div>
							</div>
						</div>

						<p class="text-center pt-2">Not on Transform yet ? <a
							@click.prevent="modalMode = 'register'"
							href="#"
						>Sign Up</a></p>
					</div>

				</template>
			</graded-modal>

			<graded-modal
				v-model="sharingModal"
				name="sharing-tool"
				:show-close="true"
			>
				<graded-sharing :worksheet="worksheet" />
			</graded-modal>
		</template>
	</div>
</template>

<script>
	import Logo from '~/assets/images/template/transform-robot.svg?inline';
	import GLogo from '~/assets/images/template/g-logo.svg?inline';

	import WorksheetMixin from '../worksheets/worksheet.mixin.js';
	import Vue from 'vue';
	import { email, required } from 'vuelidate/lib/validators';

	import VueJwtDecode from 'vue-jwt-decode';

	export default {
		name: 'WorkSheetApplication',
		layout: 'preview',
		mixins: [WorksheetMixin],
		components: { Logo, GLogo, VueJwtDecode },
		data: () => ({
			hasAccess: false,
			sharingModal: false,
			hasAccount: false,
			userStatus: null,
			enterModal: false,
			authenticateHasError: false,
			link: null,
			socket: {},
			focusedFields: [],
			connectedUsers: [],
			user: {
				firstname: '',
				lastname: '',
				email: '',
				password: '',
			},
			login: {
				email: '',
				password: '',
			},
			modalMode: 'register',
			roles: {
				coowner: 'Co-owner',
				editor: 'Editor',
				'view-only': 'View only',
			},
		}),
		mounted() {

		},
		validations: {
			user: {
				firstname: { required },
				lastname: { required },
				email: { required, email },
				password: { required },
			},
			login: {
				email: { required, email },
				password: { required },
			},
		},
		computed: {
			hasAccessToWorksheet() {
				if(this.$auth.loggedIn && this.hasAccess) return true;
			},
			workingJWTLink() {
				return this.$route.query.jwt && this.link && this.user.email;
			},
			queryParamRole() {
				return this.$route.query.t || 'view-only';
			},
			owner() {
				return this.worksheet.users.find(user => user.role === 'owner').nicename;
			},
			assignedAreas() { return this.worksheet.content.assignedAreas; },
			toolAreas() { return this.worksheet.content.toolAreas; },
			worksheetName() {return this.worksheet.name || 'Untitled Worksheet'; },
			worksheetDescription() { return this.worksheet.description; },
			areas() {

				let cells = [];

				for(var i = 0; i < this.rows; i++) {

					cells[i] = [];

					for(var j = 0; j < this.columns; j++) {

						let areaName = `area${ j }-${ i }`;

						if(typeof this.assignedAreas[areaName] !== 'undefined') {

							Vue.set(cells[i], j, this.assignedAreas[areaName]);
						} else {

							Vue.set(cells[i], j, areaName);
						}

					}
				}
				return cells;
			},
			cssAreas() {

				let css = '';
				for(const r in this.areas) {
					css = `${ css } "${ this.areas[r].join(' ').trim() }"`;
				}

				return css.trim();
			},
			gridAreaStyle() {

				let cols = [];
				let rows = [];

				for(var i = 0; i < this.columns; i++) {
					cols.push('1fr');
				}

				for(var i = 0; i < this.rows; i++) {
					rows.push('1fr');
				}

				return {
					'grid-template-areas': this.cssAreas,
					'grid-template-columns': cols.join(' '),
					'grid-template-rows': rows.join(' '),
				};
			},
		},
		methods: {
			sockets() {

				if(this.$auth.loggedIn) {

					this.socket = this.$nuxtSocket({});

					this.socket.emit('connected', { ...this.$auth.user, application: this.$route.params.uid });
					this.checkConnected();

					this.socket.on('connectedUsers', (msg, cb) => {

						this.connectedUsers = msg;
						this.checkConnected();
					});

					this.socket.on('focusedFields', (msg, cb) => {

						this.focusedFields = msg;
					});

					this.socket.on('newAnswer', (msg, cb) => {

						this.addAnswer(msg);
					});
				}
			},
			checkConnected() {
				this.socket.emit('checkConnected');
			},
			showJoin() {
				if(!this.hasAccess) {

					this.enterModal = true;
				}
			},
			getToolAreaStyle(area) {

				if(!area) return {};

				let styles = { 'grid-area': area };

				if(typeof this.toolAreas[area] !== 'undefined') {

					styles = { ...styles, ...(this.toolAreas[area]?.styles || {}) };
				}

				return styles;
			},
			async loginAndJoinWorksheet() {
				const obj = this;

				const payload = { ...this.login, action: 'login' };

				if(this.$route.query.t) {
					payload.role = this.$route.query.t || 'editor';
				}

				try {

					const joinRes = await this.$axios.$post(`/worksheets/${ this.$route.params.uid }/join`, payload);

					const oldRedirect = this.$auth.options.redirect;
					this.$auth.options.redirect = false;
					await this.$auth.setUserToken(joinRes.jwt);
					this.$auth.options.rewriteRedirects = oldRedirect;

					await this.$auth.fetchUser();

				} catch(e) {

					// get response from server
					const { response } = e;

					return;
				}
				this.hasAccess = true;
				this.hasAccount = true;

				this.sockets();

				// Close modal
				this.enterModal = false;

				// Remove query from url
				await this.$router.push({ path: this.$route.path });
			},

			async authJoin() {

				const email = !this.hasAccount ? this.user.email : this.$auth.user.email;
				const payload = { email };

				if(this.$route.query.t) {
					payload.role = this.$route.query.t || 'editor';
				}

				await this.$axios.$post(`/worksheets/${ this.$route.params.uid }/join`, payload);
				await this.$auth.fetchUser();

				this.hasAccess = true;

				this.sockets();

				// Close modal
				this.enterModal = false;

				// Remove query from url
				await this.$router.push({ path: this.$route.path });
			},
			async skipForNow() {

				await this.$axios.$post(`/worksheets/${ this.$route.params.uid }/join`, {
					email: this.user.email,
				});
				await this.$auth.fetchUser();
				this.hasAccess = true;

				this.sockets();

				// Close modal
				this.enterModal = false;

				// Remove query from url
				await this.$router.push({ path: this.$route.path });
			},

			async joinWorksheet() {

				this.$v.user.$touch();
				if(this.$v.user.$invalid) {
					this.authenticateHasError = true;

					setTimeout(function() {
						this.authenticateHasError = false;
					}.bind(this), 1000);
					return;
				}

				// There are two cases, a user joining with a jwt or a public link

				if(this.workingJWTLink) {

					await this.$axios.$post(`/worksheets/${ this.$route.params.uid }/join`, this.user);
					await this.$auth.fetchUser();
					this.hasAccess = true;

				} else {

					// Get the t query param
					const role = this.$route.query.t || 'editor';

					const joinRes = await this.$axios.$post(`/worksheets/${ this.$route.params.uid }/join`, {
						...this.user,
						role,
					});

					const oldRedirect = this.$auth.options.redirect;
					this.$auth.options.redirect = false;
					await this.$auth.setUserToken(joinRes.jwt);
					this.$auth.options.rewriteRedirects = oldRedirect;

					await this.$auth.fetchUser();
					this.hasAccess = true;
				}

				this.sockets();

				// Close modal
				this.enterModal = false;

				// Remove query from url
				await this.$router.push({ path: this.$route.path });
			},
		},
		async fetch() {

			await this.fetchWorksheet(this.$route.params.uid);

			// If user is logged in, check if they have access to the worksheet
			if(this.$auth.loggedIn) {

				this.hasAccount = true;

				const res = await this.$axios.$get(`/worksheets/${ this.$route.params.uid }/check-access`);
				if(res.data === 'Active') this.hasAccess = true;

				// If user is the owner, they have access
				if(this.$auth.user.id === this.worksheet.users.find(user => user.role === 'owner').id) this.hasAccess = true;
			}

			// Magic link from inviter
			if(this.$route.query.jwt && !this.hasAccess) {

				const jwt = VueJwtDecode.decode(this.$route.query.jwt);
				const link = await this.$axios.$get(`/links/${ jwt.sub }`);
				this.link = link.data;
				this.user.email = this.link.options.email;

				// Send join event to get the user bearer token
				// {id}/log-and-join/{jwt}
				const joinRes = await this.$axios.$get(`/worksheets/${ this.$route.params.uid }/log-and-join/${ this.$route.query.jwt }`);

				console.log('joinRes', joinRes);

				// Check the user status
				this.userStatus = joinRes.data.user.worksheet_status;
				this.hasAccount = joinRes.data.user.has_password;

				this.link.options.invite_type = joinRes.data.role;

				// If not has password or is pending, show the modal
				if(this.userStatus === 'Pending' || !this.hasAccount) {
					this.enterModal = true;
				}

				const oldRedirect = this.$auth.options.redirect;
				this.$auth.options.redirect = false;
				await this.$auth.setUserToken(joinRes.jwt);
				this.$auth.options.rewriteRedirects = oldRedirect;

				const accessRes = await this.$axios.$get(`/worksheets/${ this.$route.params.uid }/check-access`);
				if(accessRes.data === 'Active') this.hasAccess = true;

				if(this.userStatus === 'Active' || this.hasAccess) {
					this.sockets();
					this.hasAccess = true;
				}

			} else {

				if(this.hasAccount && this.hasAccess) {
					this.sockets();
				} else {
					this.showJoin();
				}

				this.link = true;
			}

			const answers = await this.$axios.$get(`/worksheets/${ this.$route.params.uid }/answers`);
			this.setAnswers(answers.data);
		},
	};
</script>

<style scoped lang="less">

	.application-loading {

		.overlay-element();
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-title {

		text-align: center;
		font-size: 1.2rem;
		font-weight: bold;
		margin-bottom: @margin-double;
	}

	.modal-image {

		background: @primary;
		width: 120px;
		height: 120px;
		margin: 0 auto;
		margin-top: -70px;
		border-radius: @radius-round;
		display: flex;
		align-items: center;
		justify-content: center;

		img {

			image-rendering: pixelated;
			width: 47px*2;
			display: block;
			margin: 0 auto;
		}
	}

	.application-wrapper {

		width: 100%;
	}

	.application-header {

		display: flex;
		align-items: stretch;
		border-bottom: 1px solid @border-1;
		position: fixed;
		top: 0;
		left: 0;
		background: white;
		width: 100%;
		z-index: 101;

		.site-logo {

			margin: @margin-default;
			margin-right: @margin-default;

			svg {

				width: 30px;

				rect,
				polygon,
				path {

					fill: @-green-6;
				}
			}
		}

		.worksheet-title {

			display: flex;
			align-items: center;

			h2 {

				font-weight: bolder;
			}

			p {

				font-size: 0.8rem;
			}
		}

		.header-actions {

			display: flex;
			align-items: center;
			margin-left: auto;
			padding-right: @margin-default;

			.student-info {

				padding-right: @margin-default;
				text-align: right;

				display: flex;

				.avatar-wrapper {

					&:before {

						content: '';
						width: 12px;
						height: 12px;
						background: @success;
						border: 2px solid white;
						position: absolute;
						top: 0;
						right: 0;
						border-radius: @radius-round;
					}
				}

				.avatar {

					border: 3px solid transparent;
					margin-left: @margin-half;
				}

				h3 {

					font-size: 1rem;
					line-height: 1;
					font-weight: 700;
					margin-bottom: @margin-third;
				}

				p {

					font-size: 0.8rem;
					line-height: 1;
				}
			}
		}
	}

	.grid-wrapper {

		.comb;
		border: 0;
		padding: @margin-double;
		border-radius: @component-border-radius;
		position: relative;
		box-shadow: @-shadow-3;

		.grid-area {

			display: grid;

			div {

				min-height: 100px;
			}
		}
	}

	.application-body {

		padding-top: calc(~'80px + @{margin-double}');

		&.is-completed {

			pointer-events: none;
		}
	}

	.enter-title {

		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: @margin-default;
		display: flex;
		justify-content: center;
		align-items: center;

		img {

			margin-right: @margin-half;
			height: 20px;
		}
	}

	.enter-invitation {

		text-align: center;
		margin-bottom: @margin-default;
	}

	.not-active {

		pointer-events: none;

		/deep/ .field-wrapper {

			//Blur
			filter: blur(2px) !important;
		}
	}

</style>