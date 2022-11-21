<template>
	<div class="application-wrapper" v-if="worksheet">
		<div class="gate-overlay" v-if="!staying"></div>

		<div class="application-header" v-if="showHeader">

			<nuxt-link to="/dashboard" class="site-logo">
				<graded-logo :size="2" v-if="showBranding" />
			</nuxt-link>

			<div class="worksheet-title" v-if="showSheetInfo">
				<div>
					<h2 class="worksheet-name-wrapper">{{ worksheetName }}</h2>
					<p v-if="worksheetDescription" class="worksheet-description-wrapper">{{ worksheetDescription }}</p>
				</div>
			</div>

			<div class="header-actions">
				<template v-if="showActions">
					<a href="#" @click.prevent="enterModal = true" class="button button-primary">Edit</a>
				</template>
			</div>
		</div>

		<div class="application-body" :class="{ 'has-header': showHeader }" @click="enterModal = true && showActions">
			<div class="inner">

				<div class="my-default">
					<worksheet />
				</div>
			</div>
		</div>

		<graded-modal
			v-model="enterModal"
			name="submit-application"
		>
			<template v-slot="{ params, close }">
				<div class="submit-application" :class="{ 'animate__animated animate__shakeX': authenticateHasError }">
					<div class="modal-image" v-if="showBranding">
						<img src="~/assets/images/template/stop.png" alt="Please authenticate to edit worksheet">
					</div>
					<h2 class="modal-title">Please authenticate to edit worksheet</h2>

					<div class="row">
						<div class="col col-6">
							<form-group label="First name" :class="{ 'has-error': $v.user.firstname.$error }">
								<input type="text" v-model.trim="$v.user.firstname.$model" class="input-block form-control">
							</form-group>
						</div>

						<div class="col col-6">
							<form-group label="Last name" :class="{ 'has-error': $v.user.lastname.$error }">
								<input type="text" v-model.trim="$v.user.lastname.$model" class="input-block form-control">
							</form-group>
						</div>
					</div>

					<form-group label="Email" :class="{ 'has-error': $v.user.email.$error }">
						<input type="email" v-model.trim="$v.user.email.$model" class="input-block form-control">
					</form-group>


					<p class="text-right">
						<a href="#" @click.prevent="authenticate" class="button button-primary">Access</a>
					</p>
				</div>
			</template>
		</graded-modal>
	</div>
</template>

<script>
	import WorksheetMixin from '../../worksheets/worksheet.mixin.js';
	import Vue from 'vue';
	import { required, email } from 'vuelidate/lib/validators';

	export default {
		name: 'WorkSheetApplication',
		layout: 'preview',
		mixins: [ WorksheetMixin ],
		data: () => ({
			staying: false,
			enterModal: false,
			authenticateHasError: false,
			user: {
				firstname: '',
				lastname: '',
				email: ''
			}
		}),
		validations: {
			user: {
				firstname: { required },
				lastname: { required },
				email: { required, email }
			}
		},
		mounted() {

			this.enterModal = this.$shallow(this.showActions);
		},
		computed: {
			// Query Params
			showHeader() { return this.$route.query?.header != parseInt(0); },
			showBranding() { return this.$route.query?.branding != parseInt(0); },
			showSheetInfo() { return this.$route.query?.sheet_info != parseInt(0); },
			showActions() { return this.$route.query?.actions != parseInt(0); },

			assignedAreas() { return this.worksheet.content.assignedAreas; },
			toolAreas() { return this.worksheet.content.toolAreas; },
			worksheetName() {return this.worksheet.name || 'Untitled Worksheet'; },
			worksheetDescription() { return this.worksheet.description },
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
					css = `${css} "${ this.areas[r].join(' ').trim() }"`;
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
					'grid-template-rows': rows.join(' ')
				}
			},
		},
		methods: {
			getToolAreaStyle(area) {

				if(!area) return {};

				let styles = { 'grid-area': area };

				if(typeof this.toolAreas[area] !== 'undefined') {

					styles = {...styles, ...(this.toolAreas[area]?.styles || {})};
				}

				return styles;
			},
			async authenticate() {

				this.$v.$touch();
				if (this.$v.$invalid) {
					this.authenticateHasError = true;
					setTimeout(function() {
						this.authenticateHasError = false;

					}.bind(this), 1000);
					return;
				}

				var application = {
					id_worksheet: this.worksheet.id,
					status: 'Pending',
					user_name: `${ this.user.firstname } ${ this.user.lastname }`,
					user_email: this.user.email,
					answers: {}
				};

				const authenticate = await this.$axios.$post(`/applications/`, application);

				this.$router.push({ path: `/application/embed/${ authenticate.data.uid }`, query: this.$route.query });

			}
		},
		async fetch() {

			await this.fetchWorksheet(this.$route.params.uid);

			this.user.firstname = this.$route.query.firstname;
			this.user.lastname = this.$route.query.lastname;
			this.user.email = this.$route.query.email;

			setTimeout(function() {
				if(this.user.firstname && this.user.lastname && this.user.email) this.authenticate();
			}.bind(this), 250);

			if(!(this.user.firstname && this.user.lastname && this.user.email)) {

				this.staying = true;
			}
		}
	}
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

		min-height: 63px;
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

	.gate-overlay {

		.overlay-element();
		z-index: 10000;
		background: white;
	}

	.application-body {

		padding-top: @margin-double;

		&.has-header {

			padding-top: calc(~'80px + @{margin-double}');
		}

		&.is-completed {

			pointer-events: none;
		}
	}

</style>