<template>
	<div class="inner">
		<br>
		<br>
		<br>
		<div class="grid-wrapper">
			<div
				class="grid-areas"
			>
				<div
					class="grid-area grid-area-blocks"
					:style="gridAreaStyle"
				>
					<div
						v-for="cell in Object.values(assignedAreas).filter((v, i, a) => a.indexOf(v) === i)"
						:class="cell"
						:id="cell"
						:key="cell"
						:style="getToolAreaStyle(cell)"
					>
					</div>
					<!-- <worksheet-editor-tool-area
						v-for="cell in Object.values(assignedAreas).filter((v, i, a) => a.indexOf(v) === i)"
						class="tool-area"
						:class="cell"
						:id="cell"
						:key="cell"
						:cells="getToolAreas(cell)"
						@remove="removeArea(cell)"
						@add-tool="selectTool(cell)"
						@edit="editToolArea(cell)"
						:style="getToolAreaStyle(cell)"
						@resize-end="resize(cell)"
						:max-cols="columns"
						:max-rows="rows"
					>
						<template v-if="getToolByArea(cell)">
						</template>
					</worksheet-editor-tool-area> -->
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import WorksheetMixin from '../../worksheet.mixin.js';
	import Vue from 'vue';

	export default {
		name: 'WorkSheetPreview',
		middleware: 'auth',
		mixins: [ WorksheetMixin ],
		data: () => ({}),
		computed: {
			assignedAreas() { return this.worksheet.content.assignedAreas; },
			toolAreas() { return this.worksheet.content.toolAreas; },
			rows() { return this.worksheet.content.rows; },
			columns() { return this.worksheet.content.columns; },
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
			},
		},
		methods: {
			getToolAreaStyle(area) {

				if(!area) return {};

				let styles = { 'grid-area': area };

				if(typeof this.toolAreas[area] !== 'undefined') {

					styles = {...styles, ...(this.toolAreas[area]?.styles || {})};
				}

				return styles;
			},
		},
	}
</script>

<style scoped lang="less">


	.grid-wrapper {

		.comb;
		border: 0;
		padding: @margin-double;
		border-radius: @component-border-radius;
		position: relative;
		box-shadow: @-shadow-3;

		.grid-area {

			display: grid;

			div {

				min-height: 100px;
			}
		}
	}

</style>