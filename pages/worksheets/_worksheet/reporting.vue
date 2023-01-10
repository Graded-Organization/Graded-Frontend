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

						<graded-data-table
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
						</graded-data-table>
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
					label: 'Applicants'
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
					tdClass: 'text-center'
				}
			],
		}),
		methods: {
			...mapActions({
				setApplication: 'worksheet/setApplication',
			}),
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
						text: 'UID copied to clipboard, sweet!'
					});

				} catch (e) {
					console.error(e);
				}
			},

			showApplication(app) {

				this.showModal = true;
				this.updateSheet++;
				this.setApplication(app);
			}
		}
	}
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

</style>