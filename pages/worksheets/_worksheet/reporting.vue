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

					<data-table
						:columns="columns"
						:options="options"
						:url="`/worksheets/${ $route.params.worksheet }/applications`"
					/>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';

	export default {
		name: 'WorkSheetPageReporting',
		middleware: 'auth',
		data: () => ({
			columns: [
				{
					field: 'user_name',
					key: 'user_name',
					title: 'User Name',
					width: 200,
					align: 'left',
					renderBodyCell: ({ row, column, rowIndex }, h) => {

						const mailTo = `mailto:${ row.user_email }`;

						return (
							<div>
								<p>{ row['user_name'] }</p>
								<p><a href={mailTo}>{ row['user_email'] }</a></p>
							</div>
						);
					},
				},
				{
					field: 'status',
					key: 'status',
					width: 100,
					title: 'Status',
					align: 'left'
				},
				{
					field: 'created',
					key: 'submissionDate',
					title: 'Submission Date',
					width: 150,
					align: 'left'
				},
				{
					field: 'grade',
					key: 'grade',
					title: 'Grade',
					width: 100,
					align: 'left'
				},

				{
					key: 'view',
					title: 'View',
					width: 100,
					align: 'center',
					renderBodyCell: ({ row, column, rowIndex }, h) => {
						return (<a class="button button-small button-primary">View Submission</a>);
					},
				},
			],
		}),
		computed: {
			options() {

				return {

				}
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

				/deep/ .ve-table {

					max-height: calc(~'100vh - 310px') !important;
				}
			}
		}
	}

</style>