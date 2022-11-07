<template>
	<div class="application-wrapper" v-if="worksheet && application">

		<div class="application-header">
			<div class="inner boxfix-vert">
				<div class="header-content">
					<div class="m-half">
						<h2 class="worksheet-name">{{ worksheetName }}</h2>
						<p v-if="worksheetDescription" class="worksheet-description">{{ worksheetDescription }}</p>
					</div>

					<div class="header-actions">
						<template v-if="application.status != 'Completed'">
							<a href="#" @click.prevent="sureModal = true" class="button button-primary">Submit</a>
						</template>

						<template v-else>
							<p>Submited by {{ application.user_name }} on {{ application.modified }}</p>
						</template>
					</div>
				</div>
			</div>
		</div>

		<div class="application-body" :class="{ 'is-completed': application.status == 'Completed' }">
			<div class="inner">

				<div class="my-default">
					<worksheet v-model="answers" />
				</div>

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
		middleware: 'auth',
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

		position: sticky;
		top: 0;
		background: white;
		z-index: 100;
		border-bottom: 1px solid @border-1;

		.worksheet-name {

			font-size: 1.5rem;
		}

		.worksheet-description {

			font-size: 0.8rem;
		}

		.header-content {

			display: flex;
			align-items: center;
			padding: 0 @margin-double;

			.header-actions {

				margin-left: auto;
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

	.application-body.is-completed {

		pointer-events: none;
	}

</style>