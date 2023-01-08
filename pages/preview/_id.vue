<template>
	<div class="worksheet-preview-wrapper" v-if="worksheet">
		<header class="preview-header">
			<nuxt-link to="/dashboard" class="site-logo">
				<graded-logo :size="2" />
			</nuxt-link>
			<div class="worksheet-title">
				<div>
					<h2 class="worksheet-name-wrapper">{{ worksheetName }}</h2>
					<p v-if="worksheetDescription" class="worksheet-description-wrapper">{{ worksheetDescription }}</p>
				</div>
			</div>
		</header>

		<div class="worksheet-wrapper">
			<div class="inner">
				<worksheet v-if="worksheet.type == 'grid'" />
				<worksheet-pdf v-else />
			</div>
		</div>
	</div>
</template>

<script>
	import Logo from "~/assets/images/template/logo-mono.svg?inline";
	import WorksheetMixin from '../worksheets/worksheet.mixin.js';
	import Vue from 'vue';

	export default {
		name: 'WorkSheetPreview',
		middleware: 'auth',
		components: { Logo },
		layout: 'preview',
		mixins: [ WorksheetMixin ],
		data: () => ({}),
		computed: {
			assignedAreas() { return this.worksheet.content.assignedAreas; },
			toolAreas() { return this.worksheet.content.toolAreas; },
			worksheetName() {return this.worksheet.name || 'Untitled Worksheet'; },
			worksheetDescription() { return this.worksheet.description },
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
		async fetch() {

			await this.fetchWorksheet(this.$route.params.id);
		}
	}
</script>

<style scoped lang="less">

	.worksheet-preview-wrapper {

		flex: 1;
		background: @green-5 url('~/assets/images/template/texture-x1000.png') center center fixed !important;
		padding-top: calc(~'80px + @{margin-double}');
	}

	.preview-header {

		display: flex;
		align-items: stretch;
		border-bottom: 1px solid @border-1;
		position: fixed;
		top: 0;
		left: 0;
		background: white;
		width: 100%;
		z-index: 100;

		.site-logo {

			margin: @margin-default;
			margin-right: @margin-default;

			svg {

				width: 70px;

				rect,
				polygon,
				path {

					fill: @-green-6;
				}
			}
		}

		.worksheet-title {

			display: flex;
			align-items: center;

			h2 {

				font-weight: bolder;
			}

			p {

				font-size: 0.8rem;
			}
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

			div {

				min-height: 100px;
			}
		}
	}

	.editor {

		background: white;
		border-radius: @radius-2;
	}

</style>