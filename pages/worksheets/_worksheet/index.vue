<template>
	<div class="section-dashboard-editor">
		<template>
			<div class="m-double">
				<div class="inner boxfix-vert">
					<div class="m-default">
						<graded-content-editable
							tag="h2"
							v-model="worksheetName"
							v-slot="slotProps"
							default-text="Untitled Worksheet"
							class="worksheet-name-wrapper"
							:classes="{ contenteditable: 'worksheet-name' }"
						>
							<a href="#" v-show="!slotProps.isEditable"><i class="fa fa-fw fa-pencil" /></a>
						</graded-content-editable>

						<br>

						<graded-content-editable
							tag="p"
							v-model="worksheetDescription"
							v-slot="slotProps"
							default-text="Set a description for your worksheet"
							class="worksheet-description-wrapper"
							:classes="{ contenteditable: 'worksheet-description mb-default' }"
						/>
						<worksheet-editor
							@tool-added="reFetch"
						/>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapGetters, mapActions } from 'vuex';
	import DragSelect from 'dragselect';
	import WorksheetMixin from '../worksheet.mixin.js';

	export default {
		name: 'WorkSheetPageEditor',
		middleware: 'auth',
		mixins: [ WorksheetMixin ],
		data: () => ({}),
		watch: {
			worksheet: {
				handler(n, o) {

					console.log('Worksheet', n, o);

					if(!o) return;

					console.log('Calling worksheet save');
					this.save();
				},
				deep: true
			}
		},
		computed: {
			worksheetName: {
				get() { return this.worksheet.name || 'Untitled Worksheet'; },
				set(val) { this.$store.commit('worksheet/updateName', val); }
			},
			worksheetDescription: {
				get() { return this.worksheet.description || 'Set a description for your worksheet'; },
				set(val) { this.$store.commit('worksheet/updateDescription', val); }
			},
			worksheetContent: {
				get() { return this.worksheet.content; },
				set(v) { this.updateContent(this.$shallow(v)); }
			}
		},
		methods: {
			async reFetch() { await this.fetchWorksheet(this.$route.params.worksheet); }
		}
	}
</script>

<style scoped lang="less">

	.section-dashboard-editor {

		width: 100%;
	}

	.worksheet-general-menu {

		height: 100%;
		display: flex;
		align-items: flex-end;

		.menu-item {

			border-bottom: 2px solid transparent;

			a {

				display: block;
				padding: 10px;
				text-decoration: none;
				color: @body-color;
			}

			&:hover {

				border-bottom-color: @primary;

				a {

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

		a {

			color: @primary;
			text-decoration: none;
		}
	}

	/deep/ .worksheet-name-wrapper {

		display: inline-flex;
		align-items: center;
		cursor: pointer;

		.worksheet-name {

			font-size: @font-size-4;
			margin-right: @margin-default;
		}

		a {

			color: @gray-3;
		}

		&:hover {

			a {

				color: @green-5;
			}
		}
	}

	.worksheet-description-wrapper {

		cursor: pointer;
		display: inline-flex;

		&.is-editing { cursor: auto; }

		p {

			display: inline-block;
		}
	}

	.cell {

		user-select: none;
		min-height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;

		&.is-selected { background: @blue-1; }
		&.is-forbidden { background: @red-1; }

		&.drag-element {

			&:hover:not(.is-selected) { background: @gray-1; }
			&:hover:is(.is-selected) { background: @blue-2; }
		}

		&.tool-area {

			aspect-ratio: auto;
		}
	}


	.grid-wrapper {

		.comb;
		border: 0;
		padding: @margin-double;
		border-radius: @component-border-radius;
		position: relative;
		box-shadow: @-shadow-3;

		.grid-area {

			display: grid;

			&.grid-area-blocks {

				.overlay-element();
			}

			&.free-cells { pointer-events: none; }
			&.overlapping-cells { pointer-events: auto; }
		}

		&:hover {

			.row-buttons, .col-buttons {
				opacity: 1;
				pointer-events: all;
			}
		}
	}

	.row-buttons {

		position: absolute;
		bottom: -38px/2;
		text-align: center;
		width: 80px;
		left: 50%;
		margin-left: -40px;
		z-index: 100;
		opacity: 0;
		transition: opacity 500ms;
		pointer-events: none;
	}

	.col-buttons {

		position: absolute;
		right: -35px/2;
		z-index: 100;
		width: 35px;
		top: 50%;
		margin-top: -86px/2;
		opacity: 0;
		transition: opacity 500ms;
		pointer-events: none;

		.button {

			margin: @margin-half 0;
		}
	}
</style>