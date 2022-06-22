<template>
	<div
		class="cell"
		v-on="listeners"
		@click.self="$emit('edit')"
	>
		<!--<div
			class="resize-area resize-left"
			draggable="true"
			@dragstart="resizeStart"
			@dragend="resizeEnd"
		/>
		<div
			class="resize-area resize-right"
			draggable="true"
			@dragstart="resizeStart"
			@dragend="resizeEnd"
		/>
		<div
			class="resize-area resize-top"
			draggable="true"
			@dragstart="resizeStart"
			@dragend="resizeEnd"
		/>
		<div
			class="resize-area resize-bottom"
			draggable="true"
			@dragstart="resizeStart"
			@dragend="resizeEnd"
		/>-->

		<a
			v-if="!touchLeft"
			href="#"
			@click.prevent="expand('left')"
			class="button-add button-add-col-left button button-primary button-small"
		>
			<i class="fad fa-arrow-alt-from-right" />
		</a>

		<a
			v-if="!touchRight"
			href="#"
			@click.prevent="expand('right')"
			class="button-add button-add-col-right button button-primary button-small"
		>
			<i class="fad fa-arrow-alt-from-left" />
		</a>

		<a
			v-if="!touchTop"
			href="#"
			@click.prevent="expand('top')"
			class="button-add button-add-col-top button button-primary button-small"
		>
			<i class="fad fa-arrow-alt-from-bottom" />
		</a>

		<a
			v-if="!touchBottom"
			href="#"
			@click.prevent="expand('bottom')"
			class="button-add button-add-col-bottom button button-primary button-small"
		>
			<i class="fad fa-arrow-alt-from-top" />
		</a>

		<slot>

			<div class="component-actions p-half">
				<button
					type="button"
					class="button button-small button-danger button-remove"
					@click="$emit('remove')"
				>
					<i class="fal fa-fw fa-times" />
				</button>
			</div>

			<button
				type="button"
				@click="$emit('add-tool')"
				class="button-add-tool button button-ghost-primary"
			><i class="fal fa-fw fa-plus"></i></button>

		</slot>
	</div>
</template>

<script>
	export default {
		props: {
			id: {
				type: String,
				required: true
			},
			cells: {
				type: Array,
				required: true
			},
			maxCols: {
				type: Number,
				required: true
			},
			maxRows: {
				type: Number,
				required: true
			}
		},
		computed: {
			listeners() {
				return this.$listeners;
			},
			origin() {
				let x = this.maxCols;
				let y = this.maxRows;
				for(const c in this.cells) {
					x = Math.min(x, this.cells[c][0]);
					y = Math.min(y, this.cells[c][1]);
				}

				return [x, y];
			},
			maxPoint() {
				let x = 0;
				let y = 0;
				for(const c in this.cells) {
					x = Math.max(x, this.cells[c][0]);
					y = Math.max(y, this.cells[c][1]);
				}

				return [x, y];
			},
			touchLeft() {

				for(const c in this.cells) if(this.cells[c][0] == 0) return true;
				return false;
			},
			touchTop() {

				for(const c in this.cells) if(this.cells[c][1] == 0) return true;
				return false;
			},
			touchRight() {

				for(const c in this.cells) if(this.cells[c][0] == this.maxCols-1) return true;
				return false;
			},
			touchBottom() {

				for(const c in this.cells) if(this.cells[c][1] == this.maxRows-1) return true;
				return false;
			}
		},
		methods: {
			expand(dir) {

				let info = {
					touchLeft: this.touchLeft,
					touchTop: this.touchTop,
					touchRight: this.touchRight,
					touchBottom: this.touchBottom,
					origin: this.origin,
					maxPoint: this.maxPoint
				};

				this.$emit('expand', this.id, dir, info);
			},
			resizeStart() {
				console.log('ResizeStart');
				this.$emit('resize-start');
			},
			resizeOver() {
				console.log('ResizeOver');
			},
			resizeDrop() {
				console.log('resizeDrop');
			},
			resizeEnd() {
				console.log('resizeEnd');
				this.$emit('resize-end');
			}
		}
	}
</script>

<style lang="less" scoped>

	.button-add {

		position: absolute;
		opacity: 0;
		transition: opacity 500ms;
		width: 30px;

		&.button-add-col-right {

			right: -15px;
			top: 50%;
			margin-top: -31px/2;
		}

		&.button-add-col-left {

			left: -15px;
			top: 50%;
			margin-top: -31px/2;
		}

		&.button-add-col-bottom {

			bottom: -31px/2;
			left: 50%;
			margin-left: -15px;
		}

		&.button-add-col-top {

			top: -31px/2;
			left: 50%;
			margin-left: -15px;
		}
	}

	.button-add-tool {

		z-index: 100;
	}

	.component-controls {

		position: absolute;
		right: 0;
		top: 0;
		margin: @margin-half;
	}

	.button-remove {

		transition: opacity 500ms;
		opacity: 0;
	}

	.cell {

		box-shadow: @-shadow-2;
		min-height: 50px;
		z-index: 10;
		background: fade(white, 90%);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;

		&:hover {

			z-index: 10;

			.button-add { opacity: 1; }
			.button-remove { opacity: 1; }
		}
	}

	.resize-area {

		position: absolute;
		width: 10px;
		height: 10px;

		&:hover {

			background: @-gray-1;
		}

		&.resize-left {

			height: 100%;
			left: 0;
			top: 0;
			cursor: ew-resize;
		}

		&.resize-right {

			height: 100%;
			right: 0;
			top: 0;
			cursor: ew-resize;
		}

		&.resize-top {

			width: 100%;
			left: 0;
			top: 0;
			cursor: ew-resize;
		}

		&.resize-bottom {

			width: 100%;
			left: 0;
			bottom: 0;
			cursor: ew-resize;
		}
	}

</style>