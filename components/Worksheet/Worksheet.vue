<template>
	<div class="editor" v-if="worksheet">
		<div class="grid-wrapper mb-double">
			<div
				class="grid-areas"
				@mousemove="setControl"
				@mouseleave="clearControl"
			>

				<div
					attribute="cell"
					id="grid-area"
					class="grid-area"
					:style="gridStyle"
					@keydown.esc="escape"
					tabindex="-1"
				>
					<template v-for="row in rows">
						<worksheet-empty-cell
							v-for="col in columns"
							:col="col-1"
							:row="row-1"
							:data-item="`area${ col-1 }-${ row-1 }`"
							:is-max-col="col-1 == columns-1"
							:is-max-row="row-1 == rows-1"
							:key="`area${ col-1 }-${ row-1 }`"
							class="drag-element"
							:class="{
								'is-selected': isSelected(`area${ col-1 }-${ row-1 }`) && !isOverlaping(`area${ col-1 }-${ row-1 }`),
								'is-forbidden': isSelected(`area${ col-1 }-${ row-1 }`) && isOverlaping(`area${ col-1 }-${ row-1 }`)
							}"
						/>
					</template>
				</div>

				<div
					class="grid-area grid-area-blocks"
					:class="{
						'free-cells': cellType == 'Free',
						'overlapping-cells': cellType == 'Overlapping'
					}"
					:style="gridAreaStyle"
					:key="updateAreas"
				>
					<template v-for="row in rows">
						<div
							v-for="col in columns"
							:key="`area${ col-1 }-${ row-1 }`"
							v-if="!Object.keys(assignedAreas).includes(`area${ col-1 }-${ row-1 }`)"
							class="cell"
						/>
					</template>

					<div
						v-if="getToolByArea(cell)"
						v-for="cell in areasList"
						class="tool-area"
						:class="cell"
						:id="cell"
						:key="cell"
						:style="getToolAreaStyle(cell)"
					>
						<component
							:value="getToolByArea(cell)"
							:is="`worksheet-tool-${ getToolByArea(cell).type }`"
							@response="receiveResponse"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapGetters, mapActions } from 'vuex';

	export default {
		name: 'WorkSheet',
		props: {
			value: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		data: () => ({
			// Control vars
			updateAreas: 0,
			toolAreaUpdate: 0,
			showDrawer: false,
			drawerState: null,
			cellType: 'Free',
			newAreaName: '',
			selectedItems: [],
			areaSelected: false,
			currentToolArea: null,
			cellToAddTool: null,

			toolAreas: {},

			// Control
			hoveredCell: [-1, -1],

			answers: {}
		}),
		mounted() {

			const obj = this;

			this.toolAreas = this.worksheet.content.toolAreas;
			this.updateAreas = Object.values(this.assignedAreas).length + 1;
		},
		computed: {
			...mapGetters({
				worksheet: 'worksheet/worksheet',
				currentBlock: 'worksheet/currentBlock',
				currentBlockArea: 'worksheet/currentBlockArea',
				assignedAreas: 'worksheet/assignedAreas',
				blocks: 'worksheet/blocks',
				areas: 'worksheet/areas',
				areasList: 'worksheet/areasList',
				rows: 'worksheet/rows',
				columns: 'worksheet/columns',
				application: 'worksheet/application'
			}),
			styledTools() {

				let styledTools = this.$shallow(this.worksheet.blocks);

				for(const a in styledTools) {

					if(typeof this.toolAreas[styledTools[a].area] !== 'undefined') {
						Vue.set(styledTools[a], 'styles', this.toolAreas[styledTools[a].area].styles);
					}
				}

				return styledTools;
			},
			currentToolAreaStyles() {
				return this.toolAreas[this.currentToolArea]?.styles;
			},
			hoveredArea() {

				if(this.hoveredCell[0] != -1 && this.hoveredCell[1] != -1) {

					if(
						typeof this.areas[this.hoveredCell[1]] !== 'undefined' &&
						typeof this.areas[this.hoveredCell[1]][this.hoveredCell[0]] !== 'undefined'
					) return this.areas[this.hoveredCell[1]][this.hoveredCell[0]];
				}

				return null;
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
			},
		},
		methods: {
			...mapActions({
				setCurrentBlockArea: 'worksheet/setCurrentBlockArea',
				setAssignedAreas: 'worksheet/setAssignedAreas',
				setAssignedArea: 'worksheet/setAssignedArea',
				deleteArea: 'worksheet/deleteArea',
				setRows: 'worksheet/setRows',
				setColumns: 'worksheet/setColumns',
				setToolAreas: 'worksheet/setToolAreas'
			}),

			receiveResponse(response) {

				Vue.set(this.answers, `block-${ response.id }`, response.answer);
				this.$emit('input', this.answers);
			},

			// TODO: Remove unused functions

			getToolByArea(cell) {

				return this.blocks?.find(t => t.area == cell);
			},
			closeDrawer() {
				this.currentToolArea = null;
				this.showDrawer = false;
				this.setCurrentBlockArea('');

				setTimeout(function() { this.drawerState = null; }.bind(this), 150);
			},
			getToolAreaStyle(area) {

				if(!area) return {};

				let styles = { 'grid-area': area };

				if(typeof this.worksheet.content?.toolAreas[area] !== 'undefined') {

					styles = {...styles, ...(this.worksheet.content.toolAreas[area]?.styles || {})};
				}

				return styles;
			},
			resize() { console.log('Resize end', this.hoveredCell); },
			clearControl(e) {
				Vue.set(this, 'hoveredCell', [-1, -1]);
			},
			setControl(e) {

				let gridAreas = document.querySelector('.grid-areas');

				let currentCol = -1;
				let currentRow = -1;

				let rect = gridAreas.getBoundingClientRect();
				let x = e.clientX - rect.left; //x position within the element.
				let y = e.clientY - rect.top;  //y position within the element.

				let colRanges = [];
				let colSize = Math.round(gridAreas.offsetWidth/this.columns);

				let rowRanges = [];
				let rowSize = Math.round(gridAreas.offsetHeight/this.rows);

				// Setting column ranges
				for(var i = 0; i < this.columns; i++) {
					colRanges.push([colSize*i, (colSize*(i+1)) - 1]);
				}

				for(const col in colRanges) {
					if(x >= colRanges[col][0] && x <= colRanges[col][1]) {

						currentCol = col;
						break;
					}
				}

				// Setting row ranges
				for(var i = 0; i < this.rows; i++) {
					rowRanges.push([rowSize*i, (rowSize*(i+1)) - 1]);
				}

				for(const row in rowRanges) {
					if(y >= rowRanges[row][0] && y <= rowRanges[row][1]) {

						currentRow = row;
						break;
					}
				}

				Vue.set(this, 'hoveredCell', [currentCol, currentRow]);

				if(this.hoveredCell[0] != -1 && this.hoveredCell[1] != -1) {

					if(
						typeof this.areas[this.hoveredCell[1]] === 'undefined' ||
						typeof this.areas[this.hoveredCell[1]][this.hoveredCell[0]] === 'undefined'
					) this.cellType = 'Free';
					else this.cellType = this.areas[this.hoveredCell[1]][this.hoveredCell[0]]?.includes('tool') ? 'Overlapping' : 'Free';
				}
			},
			getToolAreas(area) {

				let cells = [];

				for(const a in this.assignedAreas) {

					if(this.assignedAreas[a] == area) cells.push([
						a.replace('area', '').split('-')[0],
						a.replace('area', '').split('-')[1]
					]);
				}

				return cells;
			},
			isSelected(cls) {
				return this.selectedItems.includes(cls);
			},
			setToolAreaStyle(styles) {

				if(this.currentBlockArea) {

					Vue.set(this.toolAreas[this.currentBlockArea], 'styles', styles);
				}
			},
		}
	}
</script>

<style scoped lang="less">

	.cell {

		user-select: none;
		min-height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;

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
		}
	}

</style>