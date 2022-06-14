<template>
	<div>

		<div class="container bg-slate-100 p-10">

			<drag-select
				attribute="cell"
				class="grid"
				:style="gridStyle"
				v-slot="{ selected }"
				@change="selectionOcurred($event)"
				@mouseup.native="selectionFinished"
			>
				<template v-for="row in rows">
					<worksheet-editor-cell
						v-for="col in columns"
						v-if="!Object.keys(assignedAreas).includes(`area${ col-1 }-${ row-1 }`)"
						:col="col-1"
						:row="row-1"
						:is-max-col="col-1 == columns-1"
						:is-max-row="row-1 == rows-1"
						:key="`area${ col-1 }-${ row-1 }`"
						:cell="`area${ col-1 }-${ row-1 }`"
						:class="{ 'bg-blue-200': selected.includes(`area${ col-1 }-${ row-1 }`) }"
					/>
				</template>
			</drag-select>


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
			<pre>{{ assignedAreas }}</pre>
			<pre>{{ areas }}</pre>
			<pre>{{ cssAreas }}</pre>

			<pre>{{ Object.values(assignedAreas).filter((v, i, a) => a.indexOf(v) === i) }}</pre>
		</div>

	</div>
</template>

<script>
	import Vue from 'vue';
	import DragSelect from "drag-select-vue";

	export default {
		name: 'Editor',
		data: () => ({
			newAreaName: '',
			selectedItems: [],
			columns: 6,
			rows: 6,
			min: 6,
			areaSelected: false,
			assignedAreas: {}
		}),
		components: { DragSelect },
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
					'grid-template-areas': this.cssAreas,
					'grid-template-columns': cols.join(' '),
					'grid-template-rows': rows.join(' ')
				}
			}
		},
		methods: {
			addCol() {
				this.columns++;
			},
			addRow() {
				this.rows++;
			},
			removeCol() {
				if(this.columns > 6) this.columns--;
			},
			removeRow() {
				if(this.rows > 6) this.rows--;
			},
			selectionOcurred(items) {
				this.selectedItems = items;
			},
			selectionFinished() {

				this.areaSelected = true;
				console.log('Finished');
			},
			setArea() {
				console.log(this.selectedItems);

				for(const s in this.selectedItems) {
					this.assignedAreas[this.selectedItems[s]] = this.newAreaName;
				}

				this.newAreaName = '';
			}
		}
	}
</script>

<style>

	.active {

		background: red;
	}
</style>