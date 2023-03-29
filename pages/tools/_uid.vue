<template>
	<div class="application-wrapper" v-if="worksheet && link">

		<div class="application-header">

			<nuxt-link to="/dashboard" class="site-logo">
				<logo />
			</nuxt-link>

			<div class="worksheet-title">
				<div>
					<h2 class="worksheet-name-wrapper">{{ worksheetName }}</h2>
					<p v-if="worksheetDescription" class="worksheet-description-wrapper">{{ worksheetDescription }}</p>
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
								v-tooltip.bottom="user.nicename"
								:style="`border-color: ${ $stringToColour(user.nicename) }`"
							>
						</div>
					</div>
				</div>

				<template>
					<a href="#" @click.prevent="showJoin" class="button button-primary">Share</a>
				</template>
			</div>
		</div>

		<div class="application-body" @click="showJoin">
			<div class="inner">

				<div class="my-default">
					<worksheet v-if="worksheet.type === 'grid'" />
					<worksheet-pdf v-else />
				</div>
			</div>
		</div>

		<graded-modal
			v-model="enterModal"
			name="submit-application"
		>
			<template v-slot="{ params, close }">
				<h2 class="enter-title">
					<img src="~/assets/images/template/transform-robot.svg" alt="Normie">
					Get started!
				</h2>

				<p class="enter-invitation">
					<strong>{{ link.options.invitee.nicename }}</strong> is inviting you to collaborate on this tool
				</p>

				<div class="submit-application" :class="{ 'animate__animated animate__shakeX': authenticateHasError }">

					<p class="mb-default">
						<a href="#" @click.prevent="googleLogin" class="button button-google button-block">
							<span class="icon"><g-logo /></span>
							Access with Google Account
						</a>
					</p>

					<p class="text-center mb-default">or continue with your email</p>

					<div class="row">
						<div class="col col-6">
							<form-group label="First name" required :class="{ 'has-error': $v.user.firstname.$error }">
								<input
									type="text"
									v-model.trim="$v.user.firstname.$model"
									class="input-block form-control"
								>
							</form-group>
						</div>

						<div class="col col-6">
							<form-group label="Last name" required :class="{ 'has-error': $v.user.lastname.$error }">
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
							:readonly="true"
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
						<div class="col">
							<a
								href="#"
								class="button button-block button-ghost-primary"
							>Continue as guest</a>
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
			</template>
		</graded-modal>
	</div>
</template>

<script>
	import Logo from '~/assets/images/template/transform-robot.svg?inline';
	import GLogo from '~/assets/images/template/g-logo.svg?inline';

	import WorksheetMixin from '../worksheets/worksheet.mixin.js';
	import Vue from 'vue';
	import { required, email } from 'vuelidate/lib/validators';

	import VueJwtDecode from 'vue-jwt-decode';

	export default {
		name: 'WorkSheetApplication',
		layout: 'preview',
		mixins: [WorksheetMixin],
		components: { Logo, GLogo, VueJwtDecode },
		data: () => ({
			enterModal: false,
			authenticateHasError: false,
			link: null,
			socket: {},
			connectedUsers: [],
			user: {
				firstname: '',
				lastname: '',
				email: '',
				password: '',
			},
		}),
		mounted() {
			this.enterModal = !this.$auth.loggedIn;
			this.sockets();
		},
		validations: {
			user: {
				firstname: { required },
				lastname: { required },
				email: { required, email },
				password: { required },
			},
		},
		computed: {
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

					this.socket.emit('connected', { ...this.$auth.user, application: this.$route.params.id });
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
				if(!this.$auth.loggedIn) {

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
			async joinWorksheet() {

				this.$v.$touch();
				if(this.$v.$invalid) {
					this.authenticateHasError = true;
					setTimeout(function() {
						this.authenticateHasError = false;

					}.bind(this), 1000);
					return;
				}

				const application = {
					id_worksheet: this.worksheet.id,
					status: 'Pending',
					user_name: `${ this.user.firstname } ${ this.user.lastname }`,
					user_email: this.user.email,
					answers: {},
				};

				const join = await this.$axios.$post(`/worksheets/${ this.$route.params.uid }/join`, this.user);

				console.log(join);

				await this.$auth.setUserToken(join.jwt);
				await this.$auth.fetchUser();

				//await this.$router.push({ path: `/application/${ authenticate.data.uid }` });
				this.$nuxt.refresh();

			},
		},
		async fetch() {

			await this.fetchWorksheet(this.$route.params.uid);

			if(this.$route.query.jwt) {
				const jwt = VueJwtDecode.decode(this.$route.query.jwt);
				const link = await this.$axios.$get(`/links/${ jwt.sub }`);
				this.link = link.data;
				this.user.email = this.link.options.email;
			}
		},
	};
</script>

<style scoped lang="less">

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
		z-index: 100;

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

</style>