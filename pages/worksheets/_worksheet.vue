<template>
	<div class="section-dashboard">
		<template v-if="!$fetchState.pending && !$fetchState.error">
			<portal to="logo-portal">
				<div class="breadcrumb">
					<worksheet-editor-loading :key="loading" />

					<nuxt-link to="/dashboard">Home</nuxt-link>
					| <span v-text="worksheet.name"></span>
				</div>
			</portal>

			<portal to="menu-portal">
				<ul class="worksheet-general-menu">
					<li class="menu-item">
						<nuxt-link :to="`/worksheets/${ $route.params.worksheet }`">Build</nuxt-link>
					</li>
					<!--<li class="menu-item">
						<nuxt-link :to="`/worksheets/${ $route.params.worksheet }/grading`">Grading</nuxt-link>
					</li>-->
					<li class="menu-item">
						<nuxt-link :to="`/worksheets/${ $route.params.worksheet }/reporting`">Reporting</nuxt-link>
					</li>
					<!--<li class="menu-item">
						<nuxt-link :to="`/worksheets/${ $route.params.worksheet }/sharing`">Sharing</nuxt-link>
					</li>-->
				</ul>
			</portal>

			<portal to="user-portal">
				<div class="preview-wrapper">
					<a
						:href="`/preview/${ worksheet.id }`"
						target="_blank"
						class="button button-small button-ghost-primary"
					>Preview</a>
					<a @click.prevent="sharingModal = true" class="button button-small button-primary ml-half">Share</a>
				</div>
			</portal>

			<graded-modal
				v-model="sharingModal"
				name="sharing-tool"
				:show-close="true"
			>
				<graded-sharing :worksheet="worksheet" />
			</graded-modal>

			<nuxt-child />
		</template>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import WorksheetMixin from './worksheet.mixin.js';

	export default {
		name: 'WorkSheetPage',
		middleware: 'auth',
		layout: 'platform',
		mixins: [WorksheetMixin],
		data: () => ({
			sharingModal: false,
		}),
		methods: {},
		async fetch() {
			await this.fetchWorksheet(this.$route.params.worksheet);
		},
	};
</script>

<style scoped lang="less">

	.section-dashboard {

		display: flex;
		width: 100%;
	}

	.preview-wrapper {

		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.worksheet-general-menu {

		height: 100%;
		display: flex;
		align-items: flex-end;

		.menu-item {

			a {

				display: block;
				border-bottom: 2px solid transparent;
				padding: 10px;
				text-decoration: none;
				color: @body-color;

				&.nuxt-link-exact-active {

					border-bottom-color: @primary;
					color: @primary;
				}
			}

			&:hover {

				a {

					border-bottom-color: @primary;
					color: @primary;
				}
			}
		}
	}

	.breadcrumb {

		display: flex;
		align-items: center;

		.fa-stack {

			margin-right: @margin-default;
		}

		span, a {

			margin: 0 @margin-half;
		}

		span {

			white-space: nowrap;
			width: 200px;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		a {

			color: @primary;
			text-decoration: none;
		}
	}

	/deep/ .modal-container .sharing-wrapper {

		padding: 0 !important;

		.mode-default, .mode-email {

			width: 500px;
		}

		.mode-embed {

			width: 700px;
		}
	}

</style>