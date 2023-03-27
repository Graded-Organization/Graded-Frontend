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
							<a @click.prevent="newFolder" class="new-workbook">Create a new Workbook</a>
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
								<a
									href="#"
									@click.prevent="showDeleteWorksheet(worksheet.id)"
									class="button button-small button-danger"
								>
									<i class="fal fa-fw fa-times" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>

		<graded-modal
			v-model="newWorkbookModal"
			name="new-workbook"
			:show-close="false"
		>
			<div class="new-workbook">
				<div class="the-content">
					<h2>New Workbook</h2>
					<p>Workbooks help you organize your worksheets.</p>
				</div>

				<form-group label="Workbook Name" required>
					<input
						type="text"
						class="input-block form-control form-control-medium"
						placeholder="My super duper new workbook"
					>
				</form-group>

				<p class="text-right">
					<a href="#" @click.prevent="closeNewWorkbook" class="button button-ghost-gray">Cancel</a>
					<a href="#" class="button button-primary">Create</a>
				</p>
			</div>
		</graded-modal>

		<graded-modal
			v-model="newWorksheetModal"
			name="new-worksheet"
			:show-close="false"
		>
			<div class="new-workbook">
				<div class="the-content">
					<h2>New sheet</h2>
					<p>Select the type of sheet that suits best for your project.</p>
				</div>

				<div class="row flexcol">
					<div class="col">
						<div class="new-card" @click="type = 'grid'" :class="{ 'is-selected': type === 'grid' }">
							<h2>Grid Based Sheet</h2>
							<img src="@/assets/images/template/grid-based.png" alt="Grid-based">
							<p>This sheet gives you an editor to create areas inside in a grid-based view.</p>
						</div>

					</div>
					<div class="col">
						<div class="new-card" @click="type = 'pdf'" :class="{ 'is-selected': type === 'pdf' }">
							<h2>PDF Sheet</h2>
							<img src="@/assets/images/template/pdf-based.png" alt="PDF based">
							<p>Upload your own PDF and create form fields on top of it.</p>
						</div>
					</div>
				</div>

				<p class="text-right">
					<a href="#" @click.prevent="closeNewWorksheet" class="button button-ghost-gray">Cancel</a>
					<a
						href="#"
						@click.prevent="createWorksheet"
						:disabled="!type"
						:class="{ 'disabled': !type }"
						class="button button-primary"
					>Create</a>
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
						<a
							href="#"
							@click.prevent="deleteWorkSheet(params.id)"
							class="button button-primary"
						>Yes, delete worksheet</a>
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
			type: '',
			worksheets: [],
			newWorksheetModal: false,
			newWorkbookModal: false,
			deleteModal: false,
		}),
		methods: {
			newFolder() { this.$vfm.show('new-workbook'); },
			showDeleteWorksheet(id) { this.$vfm.show('delete-worksheet', { id: id }); },
			async deleteWorkSheet(id) {

				const worksheet = await this.$axios.$delete(`/users/me/worksheets/${ id }`);
				const worksheets = await this.$axios.$get('/users/me/worksheets');
				this.deleteModal = false;
				this.worksheets = worksheets.data;
			},
			newWorksheet() { this.newWorksheetModal = true; },
			async createWorksheet() {

				if(this.type) {
					const worksheet = await this.$axios.$post('worksheets', {
						id_user: this.$auth.user.id,
						type: this.type,
						name: 'Untitled Worksheet',
					});
					await this.$router.push({ path: `/worksheets/${ worksheet.data.id }` });
				}
			},
			closeNewWorkbook() { this.newWorkbookModal = false; },
			closeNewWorksheet() { this.newWorksheetModal = false; },
		},
		async fetch() {

			const worksheets = await this.$axios.$get('/users/me/worksheets');
			this.worksheets = worksheets.data;
		},
	};
</script>

<style scoped lang="less">

	.section-dashboard {

		width: 100% !important;
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
		margin-bottom: @margin-double;

		&:not(.worksheet-add) {

			.card-wrapper {

				//background: @green-3 url('~/assets/images/template/texture-transparency-x1000.png') center center repeat;
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
				//background: white url('~/assets/images/template/texture-transparency-x1000.png') repeat;
				background-blend-mode: multiply;
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

	.new-workbook {

		.the-content {

			margin-bottom: @margin-double;
		}

		.new-card {

			border: 2px solid @border-1;
			border-radius: @radius-2;
			width: 250px;
			padding: @margin-double;
			margin-bottom: @margin-double;
			filter: grayscale(100%);
			cursor: pointer;
			transition: all 250ms;

			h2 {

				color: @primary;
				text-align: center;
				font-weight: bold;
				text-align: center;
			}

			img {

				width: 64px*2;
				image-rendering: pixelated;
				display: block;
				margin: @margin-default auto;
			}

			p {

				font-size: 0.8rem;
			}

			&.is-selected {

				filter: none;
				border: 2px solid @primary;
			}
		}
	}

</style>