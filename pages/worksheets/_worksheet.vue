<template>
	<div class="section-dashboard">
		<template v-if="!$fetchState.pending && !$fetchState.error">
			<div class="m-double">

				<portal to="logo-portal">
					<div class="breadcrumb"><nuxt-link to="/dashboard">Home</nuxt-link> | <span v-text="worksheet.name"></span></div>
				</portal>

				<div class="inner boxfix-vert">
					<div class="m-default">
						<div class="worksheet-title-wrapper" @click.prevent="enableTitleEditable" v-click-outside="disableTitleEditable">
							<contenteditable
								class="worksheet-title"
								tag="h2"
								id="worksheet-title"
								:contenteditable="titleIsEditable"
								v-model="worksheet.name"
								:noNL="true"
								:noHTML="true"
								@returned="disableTitleEditable"
							/>
							<a href="#" v-show="!titleIsEditable"><i class="fa fa-fw fa-pencil" /></a>
						</div>
						<p class="worksheet-description mb-default">No description</p>

						<worksheet-editor
							@show-editor="showEditor = true"
							@hide-editor="showEditor = false"
							@set-tool-area="currentToolArea = $event"
						/>
					</div>
				</div>
			</div>

			<worksheet-editor-drawer
				:show="showEditor"
				@close="closeEditor"
			>
				<worksheet-editor-tool-area-editor
					:key="toolAreaUpdate"
					:tool-area="currentToolArea"
					@input="setToolAreaStyle"
				/>
			</worksheet-editor-drawer>
		</template>
	</div>
</template>

<script>
	import Vue from 'vue';
	import DragSelect from 'dragselect';

	export default {
		name: 'WorkSheetPage',
		middleware: 'auth',
		layout: 'platform',
		data: () => ({
			worksheet: null,
			titleIsEditable: false,
			showEditor: false,
			currentToolArea: null,
			toolAreaUpdate: 0,
		}),
		computed: {
			areas() {

				let cells = [];

				for(var i = 0; i < this.rows; i++) {

					cells[i] = [];

					for(var j = 0; j < this.columns; j++) {

						let areaName = `area${ j }-${ i }`;

						if(typeof this.assignedAreas[areaName] !== 'undefined') {

							Vue.set(cells[i], j, this.assignedAreas[areaName]);
						} else {

							Vue.set(cells[i], j, areaName);
						}

					}
				}
				return cells;
			},
			cssAreas() {

				let css = '';
				for(const r in this.areas) {
					css = `${css} "${ this.areas[r].join(' ').trim() }"`;
				}

				return css.trim();
			},
			gridStyle() {

				let cols = [];
				let rows = [];

				for(var i = 0; i < this.columns; i++) {
					cols.push('1fr');
				}

				for(var i = 0; i < this.rows; i++) {
					rows.push('1fr');
				}

				return {
					'grid-template-columns': cols.join(' '),
					'grid-template-rows': rows.join(' ')
				}
			},
			gridAreaStyle() {

				let cols = [];
				let rows = [];

				for(var i = 0; i < this.columns; i++) {
					cols.push('1fr');
				}

				for(var i = 0; i < this.rows; i++) {
					rows.push('1fr');
				}

				return {
					'grid-template-areas': this.cssAreas,
					'grid-template-columns': cols.join(' '),
					'grid-template-rows': rows.join(' ')
				}
			}
		},
		methods: {
			enterPressed() { alert('Enter Pressed'); },
			placeCaretAtEnd(el) {
				el.focus();
				if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
					var range = document.createRange();
					range.selectNodeContents(el);
					range.collapse(false);
					var sel = window.getSelection();
					sel.removeAllRanges();
					sel.addRange(range);
				} else if (typeof document.body.createTextRange != "undefined") {
					var textRange = document.body.createTextRange();
					textRange.moveToElementText(el);
					textRange.collapse(false);
					textRange.select();
				}
			},
			enableTitleEditable() {
				const obj = this;

				if(!obj.titleIsEditable) {

					setTimeout(function() {
						obj.placeCaretAtEnd(document.getElementById('worksheet-title'));
					}, 0);
				}

				obj.titleIsEditable = true;
			},
			async disableTitleEditable() {

				if(this.titleIsEditable)  await this.save();
				this.titleIsEditable = false;
			},
			async save() {

				await this.$axios.$put(`worksheets/${ this.$route.params.worksheet }`, this.worksheet);
			},
			closeEditor() {

				this.currentToolArea = null;
				this.showEditor = false;
			},
			addTool(cell) {
				console.log(cell);
			},
			setToolAreaStyle(styles) {
				if(this.currentToolArea) {
					Vue.set(this.toolAreas[this.currentToolArea], 'styles', styles);
				}
			},
		},
		async fetch() {

			const obj = this;

			const worksheet = await this.$axios.$get(`/worksheets/${ this.$route.params.worksheet }`);
			this.worksheet = worksheet.data;
		}
	}
</script>

<style scoped lang="less">

	.breadcrumb {

		a {

			color: @primary;
			text-decoration: none;
		}
	}

	.worksheet-title-wrapper {

		display: inline-flex;
		align-items: center;
		cursor: pointer;

		.worksheet-title {

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