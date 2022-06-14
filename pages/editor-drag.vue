<template>
	<div>
		<div class="container bg-slate-100 p-10 m-auto">

			<div class="grid-wrapper relative h-[400px]">
				<div
					attribute="cell"
					class="grid absolute left-0 top-0 w-full h-full outline-0"
					id="grid-area"
					:style="gridStyle"
					@keydown.esc="escape"
					tabindex="-1"
				>
					<template v-for="row in rows">
						<worksheet-editor-empty-cell
							v-for="col in columns"
							:col="col-1"
							:row="row-1"
							:data-item="`area${ col-1 }-${ row-1 }`"
							:is-max-col="col-1 == columns-1"
							:is-max-row="row-1 == rows-1"
							:key="`area${ col-1 }-${ row-1 }`"
							class="drag-element"
							:class="{
								'bg-blue-200': isSelected(`area${ col-1 }-${ row-1 }`) && !isOverlaping(`area${ col-1 }-${ row-1 }`),
								'bg-red-200': isSelected(`area${ col-1 }-${ row-1 }`) && isOverlaping(`area${ col-1 }-${ row-1 }`)
							}"
							@mouseover="selectLayer(`area${ col-1 }-${ row-1 }`)"
						/>
					</template>
				</div>

				<div
					class="grid relative left-0 top-0 w-full h-full"
					:class="{'pointer-events-none': cellType == 'Free', 'pointer-events-auto': cellType == 'Overlapping'}"
					:style="gridAreaStyle"
					:key="updateAreas"
				>
					<template v-for="row in rows">
						<div
							v-for="col in columns"
							v-if="!Object.keys(assignedAreas).includes(`area${ col-1 }-${ row-1 }`)"
							class="select-none min-h-[50px] pointer-events-none"
						/>
					</template>

					<worksheet-editor-cell
						v-for="cell in Object.values(assignedAreas).filter((v, i, a) => a.indexOf(v) === i)"
						class="text-center min-h-[50px] z-10 bg-white bg-opacity-50"
						:class="cell"
						@remove="removeArea(cell)"
						@add-tool="addTool(cell)"
						@edit="editCell(cell)"
						:style="getCellStyle(cell)"
					></worksheet-editor-cell>
				</div>
			</div>


			<p class="text-center">{{ columns }} &times; {{ rows }}</p>

			<p class="mb-2" v-if="areaSelected">
				<input type="text" v-model="newAreaName">
				<graded-button @click.prevent="setArea">Set Area</graded-button>
			</p>

			<p class="mb-2">
				<graded-button @click.prevent="addCol">Add Column</graded-button>
				<graded-button @click.prevent="removeCol">Remove Column</graded-button>
			</p>

			<p>
				<graded-button @click.prevent="addRow">Add Row</graded-button>
				<graded-button @click.prevent="removeRow">Remove Row</graded-button>
			</p>

			<p>Selected items:</p>
			<pre>{{ selectedItems }}</pre>

			<p>Assigned Areas:</p>
			<pre>{{ assignedAreas }}</pre>

			<p>Areas:</p>
			<pre>{{ areas }}</pre>

			<pre>{{ Object.values(assignedAreas).filter((v, i, a) => a.indexOf(v) === i) }}</pre>
		</div>


		<!-- Editor -->
		<div
			class="fixed top-0 h-full w-[400px] bg-white shadow-2xl z-10 transition-all duration-500"
			:class="[ showEditor ? 'right-0' : 'right-[-400px]' ]"
		>
			<a href="#" @click.prevent="closeEditor">Close</a>

			<label>Background</label>
			<input type="color" @change="setCellBackground($event.target.value)" v-model="currentCellBackground">
		</div>

	</div>
</template>

<script>
	import Vue from 'vue';
	import DragSelect from 'dragselect';

	export default {
		name: 'Editor',
		data: () => ({
			showEditor: false,
			cellType: 'Free',
			updateAreas: 0,
			ds: null,
			newAreaName: '',
			selectedItems: [],
			columns: 6,
			rows: 6,
			min: 6,
			areaSelected: false,
			assignedAreas: {},
			// Styles
			currentCell: null,
			cellStyles: {},
			currentCellBackground: '',
		}),
		mounted() {

			const obj = this;

			this.ds = new DragSelect({
				area: document.getElementById('grid-area'),
				selectables: document.getElementsByClassName('drag-element'),
				draggability: false,
				immediateDrag: false
			});

			this.ds.subscribe('dragstart', (cObj) => { this.selectCells(cObj.items); });
			this.ds.subscribe('dragmove', (cObj) => { this.selectCells(cObj.items); });
			this.ds.subscribe('callback', (cObj) => { this.selectionOcurred(cObj); });
		},
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
			setCellBackground(color) {
				if(typeof this.cellStyles[this.currentCell] === 'undefined') {
					Vue.set(this.cellStyles, [this.currentCell], {});
				}

				Vue.set(this.cellStyles[this.currentCell], 'backgroundColor', color);
			},
			editCell(cell) {
				this.currentCell = cell;
				this.showEditor = true;
			},
			closeEditor() {

				this.currentCell = null;
				this.showEditor = false;
			},
			removeArea(cell) {

				for(const i in this.assignedAreas) {
					if(this.assignedAreas[i] == cell) {
						delete this.assignedAreas[i];
					}
				}

				this.columns++;
				this.columns--;
			},
			selectLayer(cell) {
				let cellType = this.isOverlaping(cell) ? 'Overlapping' : 'Free';
				this.cellType = cellType;
			},
			selectCells(cells) {
				let items = [];

				for(const i in cells) {
					items.push(cells[i].dataset.item);
				}
				Vue.set(this, 'selectedItems', items);
			},
			isSelected(cls) {
				return this.selectedItems.includes(cls);
			},
			isOverlaping(cls) {
				return Object.keys(this.assignedAreas).includes(cls);
			},
			reset() {
				const obj = this;
				this.ds.stop();
				this.ds.start();
				setTimeout(function() {
					obj.ds.addSelectables(document.getElementsByClassName('drag-element'), true);
				}, 100);
			},
			addCol() {
				this.columns++;
				this.reset();
			},
			addRow() {
				this.rows++;
				this.reset();
			},
			removeCol() {
				if(this.columns > 6) this.columns--;
				this.reset();
			},
			removeRow() {
				if(this.rows > 6) this.rows--;
				this.reset();
			},
			selectionOcurred(cObj) {
				this.selectCells(cObj.items);

				console.log();

				for(const c in this.selectedItems) {
					if(this.isOverlaping(this.selectedItems[c])) {
						alert('Boxes overlapping, no good');
						Vue.set(this, 'selectedItems', []);
						this.newAreaName = '';
						this.areaSelected = false;
						return;
					}
				}

				this.areaSelected = true;
			},
			escape() {
				console.log('FUCK');
				Vue.set(this, 'selectedItems', []);
				this.newAreaName = '';
				this.areaSelected = false;
				return;
			},
			addTool(cell) {
				console.log(cell);
			},
			getCellStyle(cell) {

				let styles = {
					'grid-area': cell
				};

				if(typeof this.cellStyles[cell] !== 'undefined') {

					styles['background-color'] = this.cellStyles[cell]?.backgroundColor || 'white';
				}

				return styles;

			},
			setArea() {
				this.updateAreas++;

				for(const s in this.selectedItems) {
					this.assignedAreas[this.selectedItems[s]] = this.newAreaName;
				}

				this.ds.clearSelection();
				this.columns++;
				this.columns--;

				Vue.set(this, 'selectedItems', []);
				this.newAreaName = '';
				this.areaSelected = false;

				this.reset();
			}
		}
	}
</script>