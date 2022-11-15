<template>
	<div class="section-dashboard-reporting">
		<div class="boxfix-vert">
			<div class="reporting-wrapper">
				<aside>
					<h2>Filters</h2>
				</aside>
				<section>
					<div class="reporting-actions">
						<div class="buttons">
							<a href="#" class="button button-primary">Download Report</a>
						</div>
					</div>

					<graded-data-table
						:columns="columns"
						:url="`/worksheets/${ $route.params.worksheet }/applications`"
						:max-height="`calc(100vh - 310px)`"
					>
						<template v-slot="view">
							<p>HOLA</p>
						</template>
					</graded-data-table>

					<!-- <data-table
						:columns="columns"
						:options="options"
						:url="`/worksheets/${ $route.params.worksheet }/applications`"
					/> -->
				</section>
			</div>
		</div>

		<graded-modal
			v-model="applicationModal"
			name="delete-worksheet"
			title="Are you sure you want to delete this worksheet?"
			:show-close="false"
		>
			<template v-slot="{ params, close }">
				<div class="delete-worksheet">

					<p class="text-right">
						<a href="#" @click.prevent="close" class="button button-ghost-gray">Nevermind</a>
						<a href="#" @click.prevent="deleteWorkSheet(params.id)" class="button button-primary">Yes, delete worksheet</a>
					</p>
				</div>
			</template>
		</graded-modal>
	</div>
</template>

<script>
	import Vue from 'vue';

	export default {
		name: 'WorkSheetPageReporting',
		middleware: 'auth',
		data: () => ({
			applicationModal: false,
			app: 0,
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
					field: 'status',
					label: 'Status',
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
					label: 'View'
				}
			],
		}),
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

				/deep/ .ve-table {

					max-height: calc(~'100vh - 310px') !important;
				}
			}
		}
	}

</style>