<template>
	<div
		class="cell"
		v-on="listeners"
		@mouseleave="hideConfirm()"
	>
		<div
			class="buttons-group buttons-x buttons-left"
			:class="{
				'no-top': touchTop && height == 1,
				'no-bottom': touchBottom && height == 1
			}"
		>
			<a
				v-if="!touchLeft"
				href="#"
				@click.prevent="expand('left')"
				class="button button-size button-small"
			>
				<i class="fad fa-arrow-alt-from-right" />
			</a>
			<a
				v-if="width > 1"
				href="#"
				@click.prevent="contract('left')"
				class="button button-size button-small"
			>
				<i class="fad fa-arrow-alt-from-left" />
			</a>
		</div>


		<div
			class="buttons-group buttons-x buttons-right"
			:class="{
				'no-top': touchTop && height == 1,
				'no-bottom': touchBottom && height == 1
			}"
		>
			<a
				v-if="!touchRight"
				href="#"
				@click.prevent="expand('right')"
				class="button button-size button-small"
			>
				<i class="fad fa-arrow-alt-from-left" />
			</a>

			<a
				v-if="width > 1"
				href="#"
				@click.prevent="contract('right')"
				class="button button-size button-small"
			>
				<i class="fad fa-arrow-alt-from-right" />
			</a>
		</div>

		<div class="buttons-group buttons-y buttons-top">
			<a
				v-if="!touchTop"
				href="#"
				@click.prevent="expand('top')"
				class="button button-size button-small"
			>
				<i class="fad fa-arrow-alt-from-bottom" />
			</a>
			<a
				v-if="height > 1"
				href="#"
				@click.prevent="contract('top')"
				class="button button-size button-small"
			>
				<i class="fad fa-arrow-alt-from-top" />
			</a>
		</div>

		<div class="buttons-group buttons-y buttons-bottom">
			<a
				v-if="!touchBottom"
				href="#"
				@click.prevent="expand('bottom')"
				class="button button-size button-small"
			>
				<i class="fad fa-arrow-alt-from-top" />
			</a>

			<a
				v-if="height > 1"
				href="#"
				@click.prevent="contract('bottom')"
				class="button button-size button-small"
			>
				<i class="fad fa-arrow-alt-from-bottom" />
			</a>
		</div>

		<div
			class="component-actions"
			:class="{ 'no-right': touchRight && width == 1 }"
		>
			<button
				type="button"
				class="button button-xsmall button-primary button-settings"
				@click="$emit('edit')"
			>
				<i class="fal fa-fw fa-cog" />
			</button>

			<v-dropdown>
				<button
					type="button"
					class="button button-xsmall button-danger button-remove"
				>
					<i class="fal fa-fw fa-times" />
				</button>

				<template #popper>
					<div class="delete-confirm">
						<h3>Are you sure you want to delete this block?</h3>
						<div class="row">
							<div class="col-6"><a href="#" @click.prevent="hideConfirm(true)" class="button button-block button-xsmall button-primary">No</a></div>
							<div class="col-6"><a href="#" @click.prevent="$emit('remove')" class="button button-block button-xsmall button-danger">Yes</a></div>
						</div>
					</div>
				</template>

			</v-dropdown>
		</div>

		<slot>
			<div class="add-tool-wrapper">
				<button
					type="button"
					@click="$emit('add-tool')"
					class="button-add-tool button button-small button-ghost-primary"
				><i class="fal fa-fw fa-plus" /></button>
			</div>
		</slot>
	</div>
</template>

<script>
	import { hideAllPoppers } from 'floating-vue';

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
			width() {
				return (this.maxPoint[0] - this.origin[0])+1;
			},
			height() {
				return (this.maxPoint[1] - this.origin[1])+1;
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
			contract(dir) {

				let info = {
					touchLeft: this.touchLeft,
					touchTop: this.touchTop,
					touchRight: this.touchRight,
					touchBottom: this.touchBottom,
					origin: this.origin,
					maxPoint: this.maxPoint
				};

				this.$emit('contract', this.id, dir, info);
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
			},
			hideConfirm(bypass = false) {
				if(!document.querySelector('.v-popper__popper:hover') || bypass) {
					hideAllPoppers();
				}
			}
		}
	}
</script>

<style lang="less" scoped>

	.delete-confirm {

		padding: @margin-default;
		max-width: 150px;
		text-align: center;

		h3 {

			font-size: 0.8rem;
			margin-bottom: @margin-half;
		}
	}

	.component-actions {

		padding: @margin-default;
		z-index: 100;
		white-space: nowrap;

		& > div { display: inline-block; }

		&.no-right {

			padding-right: 5px;
		}
	}

	.buttons-group {

		position: absolute;
		opacity: 0;
		display: flex;
		z-index: 100;
		transition: opacity 250ms;

		&:hover {

			opacity: 1;
		}

		.button-size {

			border-radius: @radius-1;
			border-color: @border-1;
			padding: @margin-third;
			background: white;
			color: @border-2;
			width: 30px;
			height: 30px;

			&:hover {

				background-color: @background-1;
			}
		}

		&.buttons-x {

			height: 100%;
			width: 30px;
			flex-direction: column;
			justify-content: center;
			display: flex;
			flex-direction: column;

			&:before {

				content: '';
				width: 4px;
				height: 100%;
				position: absolute;
				left: 50%;
				background: @primary;
			}

			&.no-top {

				top: 0;
				//height: calc(~"100% - 25px");
			}

			&.no-bottom {

				bottom: 0;
				//height: calc(~"100% - 25px");
			}

			.button {

				//flex: 1;

				margin: @margin-third 0;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				right: 0;

				//border-top: 0 !important;

				/*&:last-child:not(:first-child) {

					border-bottom: 0 !important;
				}

				&:last-child:first-child {

					border-bottom: 0 !important;
				}*/
			}
		}

		&.buttons-y {

			width: 100%;
			justify-content: center;
			display: flex;
			height: 30px;

			&:before {

				content: '';
				height: 4px;
				width: 100%;
				position: absolute;
				top: 50%;
				background: @primary;
			}

			.button {

				margin: 0 @margin-third;
				position: relative;
				bottom: 0;
				//flex: 1;
				//&:first-child:not(:last-child) { border-right: 0; }
			}
		}

		&.buttons-left { left: -15px; }
		&.buttons-right {
			right: -15px;
			&:before { left: auto; right: 50%; }
		}


		&.buttons-top { top: -15px; }

		&.buttons-bottom {
			bottom: -15px;
			&:before { top: auto; bottom: 50%; }
		}
	}

	.button-add {

		position: absolute;
		opacity: 0;
		transition: opacity 250ms;
		width: 30px;

		&.button-add-col-right {

			right: -15px;
			top: 50%;
			margin-top: -31px;
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

	.add-tool-wrapper {

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button-add-tool {

		z-index: 100;
		background: white;
		outline: 3px solid white !important;
	}

	.component-controls {

		position: absolute;
		right: 0;
		top: 0;
		margin: @margin-half;
	}

	.component-actions > *:not(.v-popper--shown) {

		transition: opacity 250ms;
		opacity: 0;
	}

	.cell {

		box-shadow: 0 0 5px fade(black, 5%);
		min-height: 50px;
		z-index: 10;
		background: fade(white, 90%);
		display: flex;
		align-items: stretch;
		justify-content: center;
		z-index: 1;
		border: 1px solid fade(black, 1%);

		&:hover {

			z-index: 10;

			.component-actions > * { opacity: 1; }

			.button-add { opacity: 1; }
			//.buttons-group { opacity: 1; }
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