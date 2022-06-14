<template>
	<div>

		<div class="container">
			<div id="drag-area" class="grid the-grid">
				<div class="e min-h-[100px] select-none" style="grid-area: e">E</div>
				<div class="drag-element min-h-[100px] select-none" v-for="i in 8">
					{{ i }}
				</div>
			</div>
		</div>


	</div>
</template>

<script>
	import Vue from 'vue';
	import DragSelect from 'dragselect';

	export default {
		name: 'Editor',
		data: () => ({
			ds: null
		}),
		mounted() {

			this.ds = new DragSelect({
				selectables: document.getElementsByClassName('drag-element'),
				draggability: false,
				selectedClass: 'bg-blue-200'
			});
		}
	}
</script>

<style>

	.the-grid {

		gap: 0 0;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		grid-template-areas: "e e ." "e e ." ". . ." ". . .";
	}
</style>