<template>
	<div class="section-dashboard">
		<div class="m-double">
			<h2 class="dashboard-title">My Worksheets</h2>

			<div class="worksheet-cards">
				<div class="row">
					<div class="col col-12 col-sm-3">
						<div class="worksheet-card worksheet-add">
							<a class="new-worksheet">Create a new Worksheet</a>
							<a class="new-folder">Create a new Folder</a>
						</div>
					</div>


				</div>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: 'DashboardPage',
		middleware: 'auth',
		layout: 'platform',
		methods: {}
	}
</script>

<style scoped lang="less">

	.dashboard-title {

		font-size: @font-size-4;
		margin-bottom: @margin-default;
	}

	.worksheet-card {

		aspect-ratio: 16/9;
		display: flex;
		border-radius: @radius-2;
		flex-direction: column;
		border: 1px solid @border-1;

		&.worksheet-add {

			border-style: dashed;

			a {

				display: flex;
				align-items: center;
				justify-content: center;
				padding: @margin-default;
				background: @gray-1;
				margin: @margin-half;
				text-align: center;
				border-radius: @radius-1;
				cursor: pointer;

				&:hover {

					background: @green-4;
				}
			}

			.new-worksheet {

				flex: 1;
				margin-bottom: 0;
			}
		}
	}

</style>