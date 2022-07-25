<template>
	<div class="section-dashboard">
		<div class="m-double">
			<h2 class="dashboard-title">My Worksheets</h2>

			<div class="worksheet-cards">
				<div class="row">
					<div class="col col-12 col-sm-3">
						<div class="worksheet-card worksheet-add">
							<a class="new-worksheet">Create a new Worksheet</a>
							<a @click.prevent="newFolder" class="new-folder">Create a new Folder</a>
						</div>
					</div>


				</div>
			</div>

		</div>

		<modal name="new-folder" height="auto">
			<div class="new-folder">
				<div class="the-content">
					<h2>New folder</h2>
					<p>Folders help you organize your worksheets.</p>
				</div>

				<form-group label="Folder Name" required>
					<input type="text" class="input-block form-control form-control-medium" placeholder="My super duper new folder">
				</form-group>

				<p class="text-right">
					<a href="#" @click.prevent="hideNewFolder" class="button button-ghost-gray">Cancel</a>
					<a href="#" class="button button-primary">Create</a>
				</p>
			</div>
		</modal>
	</div>
</template>

<script>
	export default {
		name: 'DashboardPage',
		middleware: 'auth',
		layout: 'platform',
		mounted() {},
		methods: {
			newFolder() {
				this.$modal.show('new-folder');
			},
			hideNewFolder() {
				this.$modal.hide('new-folder');
			}
		}
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
				margin: @margin-half;
				text-align: center;
				border-radius: @radius-1;
				cursor: pointer;
				background: @gray-1 url('~/assets/images/template/topology.png') center center no-repeat;
				transition: background 500ms;

				&:hover {

					background-color: @green-4;
				}
			}

			.new-worksheet {

				flex: 1;
				margin-bottom: 0;
			}
		}
	}

	.new-folder {

		padding: @margin-double;

		.the-content {

			margin-bottom: @margin-double;
		}
	}

</style>