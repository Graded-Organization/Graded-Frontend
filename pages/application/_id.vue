<template>
	<div class="application-wrapper" v-if="worksheet && application">

		<header class="application-header">
			<nuxt-link to="/dashboard" class="site-logo">
				<graded-logo :size="2" />
			</nuxt-link>

			<div class="worksheet-title">
				<div>
					<h2 class="worksheet-name-wrapper">{{ worksheetName }}</h2>
					<p v-if="worksheetDescription" class="worksheet-description-wrapper">{{ worksheetDescription }}</p>
				</div>
			</div>

			<div class="header-actions">

				<div class="student-info">
					<h3>{{ application.user_name }}</h3>
					<p>{{ application.user_email }}</p>
				</div>

				<template v-if="application.status != 'Completed'">
					<a href="#" @click.prevent="sureModal = true" class="button button-primary">Submit</a>
				</template>
			</div>
		</header>

		<div class="application-body" :class="{ 'is-completed': application.status == 'Completed' }">
			<div class="inner">

				<div class="application-submitted" v-if="application.status == 'Completed'">
					<div class="date">
						<!-- 2022-11-17 17:51:42 -->
						<p>Submited by <strong>{{ application.user_name }}</strong> on {{ application.modified | moment("dddd, MMMM Do YYYY") }}</p>
					</div>
				</div>

				<div class="grade" v-if="application.status == 'Completed'">
					<img src="~/assets/images/template/grade.svg" alt="">
					<h2>{{ application.grade }}</h2>
				</div>

				<worksheet v-model="answers" />

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
								<a href="#" @click.prevent="submitApplication" class="button button-primary">Yes, submit</a>
							</p>
						</div>
					</template>
				</graded-modal>
			</div>
		</div>
	</div>
</template>

<script>
	import WorksheetMixin from '../worksheets/worksheet.mixin.js';
	import Vue from 'vue';

	export default {
		name: 'WorkSheetApplication',
		layout: 'preview',
		mixins: [ WorksheetMixin ],
		data: () => ({
			answers: {},
			sureModal: false
		}),
		computed: {
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

			async submitApplication() {

				var application = {
					id_worksheet: this.worksheet.id,
					status: 'Completed',
					user_name: this.application.user_name,
					user_email: this.application.user_email,
					answers: this.answers
				};

				const applicationSubmit = await this.$axios.$put(`/applications/${ this.$route.params.id }`, application);

				const applicationRefetch = await this.$axios.$get(`/applications/${ this.$route.params.id }`);
				this.setApplication(applicationRefetch.data);

				this.sureModal = false;
			}
		},
		async fetch() {

			const application = await this.$axios.$get(`/applications/${ this.$route.params.id }`);
			this.setApplication(application.data);

			await this.fetchWorksheet(this.application.id_worksheet);
			Vue.set(this, 'answers', this.$shallow(this.application.answers));
		}
	}
</script>

<style scoped lang="less">

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

</style>