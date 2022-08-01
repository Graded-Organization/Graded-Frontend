<template>
	<div class="section-dashboard-editor">
		<template>
			<div class="m-double">

				<div class="inner boxfix-vert">
					<div class="m-default">
						<div class="worksheet-name-wrapper" @click.prevent="enableNameEditable" v-click-outside="disableNameEditable">
							<contenteditable
								class="worksheet-name"
								tag="h2"
								id="worksheet-name"
								:contenteditable="nameIsEditable"
								v-model="worksheetName"
								:noNL="true"
								:noHTML="true"
								@returned="disableNameEditable"
							/>
							<a href="#" v-show="!nameIsEditable"><i class="fa fa-fw fa-pencil" /></a>
						</div>
						<br>
						<div class="worksheet-description-wrapper"
							:class="{ 'is-editing' : descriptionIsEditable }"
							@click.prevent="enableDescriptionEditable"
							v-click-outside="disableDescriptionEditable"
						>
							<contenteditable
								class="worksheet-description mb-default"
								tag="p"
								id="worksheet-description"
								:contenteditable="descriptionIsEditable"
								v-model="worksheetDescription"
								:noNL="true"
								:noHTML="true"
								@returned="disableDescriptionEditable"
							/>
						</div>

						<worksheet-editor
							@show-editor="showEditor = true"
							@hide-editor="showEditor = false"
							@set-tool-area="currentToolArea = $event"
							v-model="worksheetContent"
						/>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import Vue from 'vue';
	import DragSelect from 'dragselect';
	import WorksheetMixin from '../worksheet.mixin.js';

	export default {
		name: 'WorkSheetPageEditor',
		middleware: 'auth',
		mixins: [ WorksheetMixin ],
		data: () => ({
			nameIsEditable: false,
			descriptionIsEditable: false,
			showEditor: false,
			currentToolArea: null,
			toolAreaUpdate: 0,
		}),
		watch: {
			worksheet: {
				handler(n, o) {
					this.save();
				},
				deep: true
			}
		},
		computed: {
			worksheetName: {
				get() {
					return this.worksheet.name;
				},
				set(val) {
					this.$store.commit('worksheet/updateName', val);
				}
			},
			worksheetDescription: {
				get() {
					return this.worksheet.description || 'No description';
				},
				set(val) {
					this.$store.commit('worksheet/updateDescription', val);
				}
			},
			worksheetContent: {
				get() {
					return this.worksheet.content;
				},
				set(v) {
					this.updateContent(this.$shallow(v));
				}
			},
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
			enterPressed() { },
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
			enableNameEditable() {
				const obj = this;

				if(!obj.nameIsEditable) {
					setTimeout(function() { obj.placeCaretAtEnd(document.getElementById('worksheet-name')); }, 0);
				}

				obj.nameIsEditable = true;
			},
			enableDescriptionEditable() {
				const obj = this;

				if(!obj.descriptionIsEditable) {
					setTimeout(function() { obj.placeCaretAtEnd(document.getElementById('worksheet-description')); }, 0);
				}

				obj.descriptionIsEditable = true;
			},
			async disableNameEditable() {

				if(this.nameIsEditable)  await this.save();
				this.nameIsEditable = false;
			},
			async disableDescriptionEditable() {

				if(this.descriptionIsEditable)  await this.save();
				this.descriptionIsEditable = false;
			},
		}
	}
</script>

<style scoped lang="less">

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

	.worksheet-name-wrapper {

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