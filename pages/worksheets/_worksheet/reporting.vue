<template>
	<div class="section-dashboard-reporting">
		<div class="boxfix-vert">
			<div class="reporting-wrapper">
				<!--<aside>
					<h2>Filters</h2>
				</aside>-->
				<section>
					<!--<div class="reporting-actions">
						<div class="buttons">
							<a href="#" class="button button-ghost-primary">Download Report</a>
						</div>
					</div>-->

					<div class="inner">

						<form-group>
							<input
								type="text"
								class="input-block form-control form-control-search"
								placeholder="Search..."
								v-model="searchQuery"
								@input="search"
							>

							<a class="search-control">
								<i class="far fa-search" />
							</a>
						</form-group>

						<table class="table">
							<thead>
								<th>Field</th>
								<th>Input</th>
								<th class="text-center">Collaborators</th>
								<th>Last Edit Date</th>
								<th>Versión History</th>
							</thead>
							<tbody>
								<tr v-for="answer in orderedAnswers">
									<td>{{ answer.name }}</td>
									<td>
										<p>{{ answer.answers[0].content.userAnswer }}</p>
									</td>
									<td class="text-center">
										<img
											v-for="a in uniqueCollaborators(answer.answers)"
											class="avatar"
											width="20"
											v-tooltip.bottom="a.nicename || a.login"
											:src="`${ $config.apiUrl }/users/${ a.id }/avatar?size=35`"
										>
									</td>
									<td>
										{{ $dayjs(answer.answers[0].created).format('MM/DD/YYYY, hh:mm A') }}
									</td>
									<td>
										<a
											href="#"
											@click.prevent="showHistory(answer.id)"
											class="button button-xsmall button-pill button-primary"
										>View History</a>
									</td>
									<!--
									<td>{{ answer.content.originalQuestion.name }}</td>
									<td>{{ answer.content.userAnswer }}</td>
									<td>
										<img
											class="avatar"
											width="20"
											:src="`${ $config.apiUrl }/users/${ answer.id_user }/avatar?size=35`"
										>
									</td>
									<td>{{ answer.created }}</td>
									<td></td>
									-->
								</tr>

							</tbody>

						</table>

						<!--<graded-data-table
							:columns="columns"
							:url="`/worksheets/${ $route.params.worksheet }/applications?pdo[applicants]=getApplicants&query_fields=id,uid,id_worsheet,grade,status,user_name,created,applicants`"
							:max-height="`calc(100vh - 225px)`"
						>
							<div slot="applicantsNumber" slot-scope="props">
								<p v-tooltip.left="{ content: `${ formatApplicants(props.row.applicants) }`, html: true }">{{ props.row.applicants.length }}</p>
							</div>
							<div slot="view" slot-scope="props">
								<a href="#" @click.prevent="showApplication(props.row)" class="button button-small button-ghost-primary button-pill">View</a>
								<a v-tooltip.bottom="`Copy UID`" href="#" @click.prevent="copy(`${ props.row.uid }`)" class="button button-small"><i class="far fa-copy" /></a>
							</div>
						</graded-data-table>-->
					</div>

					<!-- <data-table
						:columns="columns"
						:options="options"
						:url="`/worksheets/${ $route.params.worksheet }/applications`"
					/> -->
				</section>
			</div>
		</div>

		<graded-modal
			v-model="showModal"
			name="application-worksheet"
		>
			<template v-slot="{ params, close }">
				<div class="inner">
					<worksheet :key="updateSheet" />
				</div>
			</template>
		</graded-modal>

		<div
			class="drawer drawer-editor"
			:class="[ history ? 'is-visible' : '' ]"
		>
			<div class="component-actions p-half">
				<a href="#" class="button button-small" @click.prevent="history = false"><i class="fa fa-fw fa-times" /></a>
			</div>

			<h2 class="drawer-title" v-if="history"><small>{{ history[0].content.originalQuestion.name }}</small> <span>Answer History</span></h2>

			<div class="drawer-content">
				<div class="answer-history" v-if="history">
					<template v-for="answer in history">
						<div class="history-answer">
							<img
								class="avatar"
								width="20"
								:src="`${ $config.apiUrl }/users/${ answer.id_user }/avatar?size=35`"
							>
							<div class="answer-content">
								<p class="answer-user">Edited by <strong>{{ answer.user.nicename }}</strong></p>
								<p class="answer-date">{{ $dayjs(answer.created).format('MM/DD/YYYY, hh:mm A') }}</p>
								<p class="content">"{{ answer.content.userAnswer || '(Blank)' }}"</p>
							</div>

						</div>
					</template>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapGetters, mapActions } from 'vuex';

	export default {
		name: 'WorkSheetPageReporting',
		middleware: 'auth',
		data: () => ({
			showModal: false,
			history: false,
			searchQuery: '',
			answers: [],
			app: 0,
			updateSheet: 0,
			columns: [
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
					field: 'pass_status',
					label: 'Status',
				},
				{
					field: 'grade',
					label: 'Grade',
				},
				{
					field: 'created',
					label: 'Submission Date',
					type: 'date',
					dateInputFormat: 'yyyy-MM-dd HH:mm:ss', // expects 2018-03-16
					dateOutputFormat: 'MMM do yyyy',
				},
				{
					field: 'view',
					label: 'View',
					width: '150px',
					tdClass: 'text-center',
				},
			],
		}),
		computed: {
			orderedAnswers() {
				// Order answers by name
				return Object.values(this.answers).sort((a, b) => {
					if(a.name < b.name) return -1;
					if(a.name > b.name) return 1;
					return 0;
				});
			},
		},
		methods: {
			...mapActions({
				setApplication: 'worksheet/setApplication',
			}),
			async showHistory(idBlock) {

				const { data } = await this.$axios.$get(`/worksheets/${ this.$route.params.worksheet }/blocks/${ idBlock }/history`);

				this.history = data;
			},
			uniqueCollaborators(answers) {

				// Create an array of unique collaborators
				const collaborators = {};

				for(const a in answers) {
					// check if the key exists
					if(!collaborators[answers[a].id_user]) {
						collaborators[answers[a].id_user] = answers[a].user;
					}
				}

				return Object.values(collaborators);
			},
			formatApplicants(applicants) {

				if(!applicants.length) false;

				let applicantsString = '';

				for(const a in applicants) {
					applicantsString += applicants[a].nicename + '<br>';
				}

				return applicantsString;
			},
			async copy(text) {
				try {
					await this.$copyText(text);

					this.$notify({
						group: 'graded',
						title: 'Copied!',
						text: 'UID copied to clipboard, sweet!',
					});

				} catch(e) {
					console.error(e);
				}
			},

			showApplication(app) {

				this.showModal = true;
				this.updateSheet++;
				this.setApplication(app);
			},
		},
		async fetch() {
			const res = await this.$axios.$get(`/worksheets/${ this.$route.params.worksheet }/reporting`);
			this.answers = res.data;
		},
	};
</script>

<style scoped lang="less">

	.section-dashboard-reporting {

		width: 100%;

		& > div {

			display: flex;
			flex: 1;
			flex-direction: column;
			height: 100%;
		}

		.reporting-wrapper {

			display: flex;
			flex: 1;
			height: 100%;
			align-items: stretch;
			padding: @margin-double 0;
			box-sizing: border-box;

			aside {

				padding: @margin-default;
				box-sizing: border-box;
				width: 300px;
				border-right: 1px solid @border-1;
				display: flex;

				h2 {

					font-size: 1.2rem;
					margin-bottom: @margin-default;
				}
			}

			section {

				flex: 1;
				padding: @margin-default;

				.reporting-actions {

					display: flex;
					margin-bottom: @margin-default;

					.buttons {

						margin-left: auto;
					}
				}

				/deep/ .vgt-responsive {

					height: calc(~'100vh - 210px') !important;
				}
			}
		}
	}

	.form-control-search {

		border-radius: 100px;
	}

	.search-control {

		position: absolute;
		top: 50%;
		right: @margin-double;
		transform: translateY(-50%);
	}

	.table {

		width: calc(~"100% - 50px");
		margin: 0 auto;

		thead {

			th {

				background: @background-1;
				font-size: 0.8rem;
				padding: @margin-half;
			}
		}

		tbody {

			td {

				padding: @margin-half;
				border-bottom: 1px solid @border-1;
			}

			.avatar {

				display: inline-block;
				margin: @margin-half;
			}
		}
	}

	.drawer {

		height: calc(~'100vh - 62px - 43px') !important;
		top: 62px;
		width: 320px;
		right: -50vw;
		transition: right 0.3s ease-in-out;

		&.is-visible {

			right: 0;
		}
	}

	.drawer-title {

		position: sticky;
		top: 0;
		padding: @margin-default;
		z-index: 100;
		background: white;
		z-index: 2;
		line-height: 1.2;

		padding-right: 45px;

		small {

			font-size: 1rem;
			font-weight: bold;
			display: block;
		}
	}

	.history-answer {

		display: flex;
		padding: @margin_default;
		align-items: flex-start;
		position: relative;
		z-index: 1;


		&:before {

			content: '';
			border-left: 2px solid @border-1;
			height: 100%;
			position: absolute;
			left: calc(~'0.75rem + 15px');
			top: 0;
			z-index: 1;
		}

		&:first-child {

			&:before {

				height: calc(~"100% - 0.75rem");
				top: auto;
				bottom: 0;
			}
		}

		&:last-child {

			&:before {

				height: 0.75rem;
			}
		}

		// if just one, remove the border
		&:only-child {

			&:before {

				display: none;
			}
		}

		.avatar {

			margin-right: @margin_default;
			border: 1px solid @border-1;
			position: relative;
			z-index: 2;
		}

		.answer-user,
		.answer-date {

			font-size: 0.8rem;
		}

		.answer-date {

			color: @background-5;
			font-weight: bold;
		}

		.content {

			font-style: italic;
		}
	}

</style>