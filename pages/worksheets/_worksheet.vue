<template>
	<div class="section-dashboard">
		<template v-if="!$fetchState.pending && !$fetchState.error">
			<portal to="logo-portal">
				<div class="breadcrumb">
					<i v-if="!loading" class="fal fa-fw fa-check-circle" />
					<i v-else class="fas fa-fw fa-circle-notch fa-spin" />
					<nuxt-link to="/dashboard">Home</nuxt-link>
					| <span v-text="worksheet.name"></span>
				</div>
			</portal>

			<portal to="menu-portal">
				<ul class="worksheet-general-menu">
					<li class="menu-item"><nuxt-link :to="`/worksheets/${ $route.params.worksheet }`">Editor</nuxt-link></li>
					<li class="menu-item"><nuxt-link :to="`/worksheets/${ $route.params.worksheet }/grading`">Grading</nuxt-link></li>
					<li class="menu-item"><nuxt-link :to="`/worksheets/${ $route.params.worksheet }/reporting`">Reporting</nuxt-link></li>
					<li class="menu-item"><nuxt-link :to="`/worksheets/${ $route.params.worksheet }/sharing`">Sharing</nuxt-link></li>
				</ul>
			</portal>

			<portal to="user-portal">
				<div class="preview-wrapper">
					<a href="#" class="button button-small button-primary">Preview Worksheet</a>
				</div>
			</portal>

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
		mixins: [ WorksheetMixin ],
		data: () => ({}),
		methods: {},
		async fetch() {

			const obj = this;

			const worksheet = await this.$axios.$get(`/worksheets/${ this.$route.params.worksheet }`);
			this.setWorksheet(worksheet.data);
		}
	}
</script>

<style scoped lang="less">

	.section-dashboard {

		display: flex;
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

</style>