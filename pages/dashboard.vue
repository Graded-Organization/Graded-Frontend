<template>
	<div class="section-dashboard">
		<div class="m-double">
			<h2 class="dashboard-title">My Worksheets</h2>

			<div class="worksheet-cards">
				<div class="row">
					<div class="col col-12 col-sm-3">
						<div class="worksheet-card worksheet-add">
							<a @click.prevent="newWorksheet" class="new-worksheet">
								<span>
									<i class="fal fa-fw fa-plus" />
								</span>
								Create a new Worksheet
							</a>
							<a @click.prevent="newFolder" class="new-folder">Create a new Folder</a>
						</div>
					</div>

					<div
						class="col col-12 col-sm-3"
						v-if="!$fetchState.pending && !$fetchState.error"
						v-for="worksheet in worksheets"
					>
						<div class="worksheet-card">
							<nuxt-link tag="div" :to="`/worksheets/${ worksheet.id }`" class="card-wrapper">
								<h3 class="card-title">{{ worksheet.name }}</h3>
							</nuxt-link>

							<div class="worksheet-actions">
								<a href="#" @click.prevent="showDeleteWorksheet(worksheet.id)" class="button button-small button-danger">
									<i class="fal fa-fw fa-times" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>

		<graded-modal
			v-model="newFolderModal"
			name="new-folder"
			:show-close="false"
		>
			<div class="new-folder">
				<div class="the-content">
					<h2>New folder</h2>
					<p>Folders help you organize your worksheets.</p>
				</div>

				<form-group label="Folder Name" required>
					<input type="text" class="input-block form-control form-control-medium" placeholder="My super duper new folder">
				</form-group>

				<p class="text-right">
					<a href="#" @click.prevent="close" class="button button-ghost-gray">Cancel</a>
					<a href="#" class="button button-primary">Create</a>
				</p>
			</div>
		</graded-modal>

		<graded-modal
			v-model="deleteModal"
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
	export default {
		name: 'DashboardPage',
		middleware: 'auth',
		layout: 'platform',
		mounted() {},
		data: () => ({
			worksheets: [],
			newFolderModal: false,
			deleteModal: false
		}),
		methods: {
			newFolder() { this.$vfm.show('new-folder'); },
			showDeleteWorksheet(id) { this.$vfm.show('delete-worksheet', { id: id }); },
			async deleteWorkSheet(id) {

				const worksheet = await this.$axios.$delete(`/users/me/worksheets/${id}`);
				const worksheets = await this.$axios.$get('/users/me/worksheets');
				this.deleteModal = false;
				this.worksheets = worksheets.data;
			},
			async newWorksheet() {

				const worksheet = await this.$axios.$post('worksheets', { id_user: this.$auth.user.id, name: 'Untitled Worksheet' });
				this.$router.push({ path: `/worksheets/${ worksheet.data.id }` });
			}
		},
		async fetch() {

			const worksheets = await this.$axios.$get('/users/me/worksheets');
			this.worksheets = worksheets.data;
		}
	}
</script>

<style scoped lang="less">

	.section-dashboard {

		width: 100%;
	}

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

		&:not(.worksheet-add) {

			.card-wrapper {

				background: @green-3 url('~/assets/images/template/topology.png') center center no-repeat;
				margin: @margin-half;
				border-radius: @radius-1;
				padding: @margin-default;
				flex: 1;
				cursor: pointer;
				display: flex;
			}

			.card-title {

				font-size: @font-size-3;
			}
		}

		.worksheet-actions {

			opacity: 0;
			transition: opacity 500ms;
			position: absolute;
			right: 0;
			bottom: 0;
			padding: @margin-double;
		}

		&:hover {

			.worksheet-actions {

				opacity: 1;
			}
		}

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
				flex-direction: column;
				margin-bottom: 0;

				span {

					border: 1px solid @body-color;
					display: block;
					line-height: 30px;
					width: 30px;
					border-radius: @radius-2;
					margin-bottom: @margin-half;
				}
			}
		}
	}

	.new-folder {


		.the-content {

			margin-bottom: @margin-double;
		}
	}

</style>