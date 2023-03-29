<template>
	<div class="application-wrapper" v-if="worksheet && application">
		<div class="join" v-if="!$auth.loggedIn">
			<header class="application-header">
				<nuxt-link to="/dashboard" class="site-logo">
					<graded-logo :size="2" />
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
			</header>

			<div class="inner">
				<div class="m-double hello">
					<h3 v-if="userFirstname || userLastname">Hello {{ userFirstname }} {{ userLastname }}.</h3>

					<h2>Join <strong>{{ worksheet.name }}</strong><small>created by
						<strong>{{ application.user_name }}</strong></small></h2>

					<template v-if="!(userFirstname || userLastname)">
						<h3>Please register to join this worksheet</h3>

						<div
							class="submit-application"
							:class="{ 'animate__animated animate__shakeX': authenticateHasError }"
						>
							<div class="row">
								<div class="col col-6">
									<form-group label="First name" :class="{ 'has-error': $v.user.firstname.$error }">
										<input
											type="text"
											v-model.trim="$v.user.firstname.$model"
											class="input-block form-control"
										>
									</form-group>
								</div>

								<div class="col col-6">
									<form-group label="Last name" :class="{ 'has-error': $v.user.lastname.$error }">
										<input
											type="text"
											v-model.trim="$v.user.lastname.$model"
											class="input-block form-control"
										>
									</form-group>
								</div>
							</div>

							<form-group label="Email" :class="{ 'has-error': $v.user.username.$error }">
								<input
									type="email"
									v-model.trim="$v.user.username.$model"
									class="input-block form-control"
								>
							</form-group>
						</div>
					</template>

					<p>
						<button
							:disabled="!agreeJoin"
							:class="{ disabled: !agreeJoin, 'is-loading': isLoading }"
							class="button button-primary"
							@click="joinApplication"
						>Join {{ worksheet.name }}
						</button>
					</p>
				</div>
			</div>

		</div>
		<template v-else>
			<header class="application-header">
				<nuxt-link to="/dashboard" class="site-logo">
					<graded-logo :size="2" />
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
									v-tooltip.bottom="user.nicename"
									:style="`border-color: ${ $stringToColour(user.nicename) }`"
								>
							</div>
						</div>
					</div>

					<template v-if="application.status !== 'Completed'">
						<a href="#" @click.prevent="sureModal = true" class="button button-primary">Submit</a>
					</template>
				</div>
			</header>

			<div class="application-body" :class="{ 'is-completed': application.status === 'Completed' }">
				<div class="inner">

					<div class="application-submitted" v-if="application.status === 'Completed'">
						<div class="date">
							<!-- 2022-11-17 17:51:42 -->
							<p>Submited by
								<strong>{{ application.user_name }}</strong> on {{ application.modified | moment('dddd, MMMM Do YYYY') }}
							</p>
						</div>
					</div>

					<div class="grade" v-if="application.status === 'Completed'">
						<img src="~/assets/images/template/grade.svg" alt="">
						<h2>{{ application.grade }}</h2>
					</div>

					<worksheet v-if="worksheet.type === 'grid'" v-model="answers" />
					<worksheet-pdf
						v-else
						:focused-fields="focusedFields"
					/>

					<graded-modal
						v-model="sureModal"
						name="submit-application"
						title="Are you sure you want to submit your answers?"
						:show-close="false"
					>
						<template v-slot="{ params, close }">
							<div class="submit-application">

								<p class="text-right">
									<a href="#" @click.prevent="close" class="button button-ghost-gray">Nevermind</a>
									<a
										href="#"
										@click.prevent="submitApplication"
										class="button button-primary"
									>Yes, submit</a>
								</p>
							</div>
						</template>
					</graded-modal>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import WorksheetMixin from '../worksheets/worksheet.mixin.js';
	import Vue from 'vue';
	import { required, email } from 'vuelidate/lib/validators';

	export default {
		name: 'WorkSheetApplication',
		layout: 'preview',
		mixins: [WorksheetMixin],
		data: () => ({
			authenticateHasError: false,
			answers: {},
			sureModal: false,
			socket: {},
			connectedUsers: [],
			focusedFields: [],
			agreeJoin: true,
			isLoading: false,
			user: {
				firstname: '',
				lastname: '',
				username: '',
			},
		}),
		validations: {
			user: {
				firstname: { required },
				lastname: { required },
				username: { required, email },
			},
		},
		mounted() {

			this.sockets();
		},
		computed: {
			assignedAreas() { return this.worksheet.content.assignedAreas; },
			toolAreas() { return this.worksheet.content.toolAreas; },
			worksheetName() {return this.worksheet.name || 'Untitled Worksheet'; },
			worksheetDescription() { return this.worksheet.description; },

			userId() { return this.$route.query?.userId; },
			userFirstname() { return this.$route.query?.user_firstname; },
			userLastname() { return this.$route.query?.user_lastname; },
			userEmail() { return this.$route.query?.user_email; },

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

			getToolAreaStyle(area) {

				if(!area) return {};

				let styles = { 'grid-area': area };

				if(typeof this.toolAreas[area] !== 'undefined') {

					styles = { ...styles, ...(this.toolAreas[area]?.styles || {}) };
				}

				return styles;
			},

			async submitApplication() {

				const application = {
					id_worksheet: this.worksheet.id,
					status: 'Completed',
					user_name: this.application.user_name,
					user_email: this.application.user_email,
					answers: this.answers,
				};

				const applicationSubmit = await this.$axios.$put(`/applications/${ this.$route.params.id }`, application);

				const applicationRefetch = await this.$axios.$get(`/applications/${ this.$route.params.id }`);
				this.setApplication(applicationRefetch.data);

				this.sureModal = false;
			},

			async authenticate() {

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
					user_email: this.user.username,
					answers: {},
				};

				const authenticate = await this.$axios.$post(`/applications/`, application);

				await this.$router.push({ path: `/application/${ authenticate.data.uid }` });
			},

			async joinApplication() {

				await this.authenticate();

				let user;

				this.isLoading = true;

				if(this.userEmail) {
					user = {
						firstname: this.userFirstname,
						lastname: this.userLastname,
						username: this.userEmail,
						metas: { avatar_link: `${ this.$config.apiUrl }/users/${ this.userId }/avatar` },
					};
				} else {
					user = this.user;
				}

				const join = await this.$axios.$post(`/applications/${ this.$route.params.id }/join`, user);
				await this.$auth.setUserToken(join.jwt);
				await this.$auth.fetchUser();

				this.isLoading = false;

				this.sockets();
			},
		},
		async fetch() {

			const application = await this.$axios.$get(`/applications/${ this.$route.params.id }`);
			this.setApplication(application.data);

			await this.fetchWorksheet(this.application.id_worksheet);

			if(this.application.type === 'grid') {

				Vue.set(this, 'answers', this.$shallow(this.application.answers));

			} else {

				const answers = await this.$axios.$get(`/applications/${ this.$route.params.id }/answers`);
				this.setAnswers(answers.data);
			}
		},

		beforeRouteLeave(to, from, next) {

			if(this.$auth.loggedIn) this.socket.emit('disconnected', this.$auth.user);
			next();
		},
	};
</script>

<style scoped lang="less">

	.join {

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;

		.inner {

			text-align: center;

			h2 {

				font-size: 2rem;
				margin-bottom: @margin-default;

				small {

					display: block;
					font-size: 1.2rem;
				}
			}

			h3 {

				font-size: 1.5rem;
			}

			.form-check {

				display: inline-block;
			}
		}
	}

	.application-wrapper {

		width: 100%;
		display: flex;
		justify-content: center;
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

				width: 70px;

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

	.application-submitted {

		display: flex;
		align-items: flex-end;
		margin-bottom: @margin-default;

		.grade {

			line-height: 1;
			color: @red-8;

			small {

				display: block;
			}

			h2 {

				font-size: 4rem;
				font-weight: 900;
			}
		}

		.date {

			margin-left: auto;
		}
	}

	.grade {

		width: 150px;
		position: absolute;
		z-index: 100;
		right: @margin-default;
		top: 50px;

		h2 {

			font-size: 3rem;
			.overlay-element();
			color: #D82F02;
			font-family: 'Patrick Hand', cursive;
			display: flex;
			align-items: center;
			font-style: italic;
			justify-content: center;
			transform: rotate(-15deg);
		}
	}

	.submit-application {

		margin: 0 auto;
		text-align: left;
		max-width: 500px;
		margin-bottom: @margin-double;
	}

</style>