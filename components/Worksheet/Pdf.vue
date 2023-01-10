<template>
	<div class="editor mb-double" v-if="worksheet">

		<div class="editor-wrapper" ref="editorWrapper">
			<div class="pdf-editor" v-if="mode == 'editor'">

				<div class="editor-page" v-for="page in workingPages.reverse()">
					<img :src="page.image" alt="">

					<div class="page-content">
						<div class="page-opacity" :class="{ 'is-active' : !!selectedTool || !!focusedTool }"></div>
						<worksheet-pdf-field
							v-for="field in getPageFields(page.object)"
							:key="field.id"
							:value="field"
							:is-focused="checkFocus(field.id)"
							:selected="selectedTool == field.id"
							@focus-tool="focusTool"
							@blur-tool="blurTool"
							@new-answer="broadcastNewAnswer"
							class="resize-drag"
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
	import interact from 'interactjs';

	export default {
		name: 'WorkSheetPDF',
		props: {
			focusedFields: {
				type: Array,
				default: () => ([])
			}
		},
		data: () => ({
			mode: '',
			loadFields: null,
			selectedPages: [],
			selectedTool: '', // Drawer open, big version visible
			focusedTool: null, // Drawer open
			showDrawer: false,
			updateKey: 0,
			position: { x: 0, y: 0 },
			uploadingAttachment: false
		}),
		mounted() {

			const obj = this;

			this.selectedPages = this.worksheet.options?.selected_pages ? this.$shallow(this.worksheet.options?.selected_pages) : [];
			this.mode = this.selectedPages.length ? 'editor' : 'pages';
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
			}),
			pages() {

				if(!this.worksheet.content?.pdf?.pages) return [];

				return this.worksheet.content?.pdf?.pages || [];
			},
			fieldsFromPDF() {
				return this.worksheet.options?.fields_from_pdf;
			},
			workingPages() {

				if(!this.worksheet.content?.pdf?.pages) return [];
				return Object.values(this.worksheet.content?.pdf?.pages).filter(p => this.selectedPages.includes(p.object));
			}
		},
		methods: {
			...mapActions({
				updateContent: 'worksheet/updateContent',
				updateOptions: 'worksheet/updateOptions',
			}),
			update(val) {
				this.updateKey = val;
			},
			startAgain() {
				this.updateContent(null);
			},
			checkFocus(id) {

				const index = this.focusedFields.findIndex(f => f.fieldId == id && f.userId != this.$auth.user.id);

				if(index > -1) {
					return this.focusedFields[index];
				}

				return false;
			},

			async loadPDFFields() {
				const obj = this;

				this.$loading.show({ container: this.$refs.editorWrapper });

				const res = await obj.$axios.$post(`/worksheets/${ this.worksheet.id }/convert-fields`);

				this.$loading.hide();

				this.loadFields = true;
				this.mode = 'editor';
			},
			togglePage(page) {

				if(this.selectedPages.includes(page)) {

					this.selectedPages.splice(this.selectedPages.findIndex(p => p == page), 1);

				} else {
					this.selectedPages.push(page);
				}

				this.updateOptions(this.$shallow({ ...this.worksheet.options, selected_pages: this.selectedPages }));
			},
			selectPages() {
				this.mode = 'editor';
			},

			getPageFields(page) {

				return this.worksheet.blocks.filter(b => b.area == page);
			},

			focusTool(tool) {

				this.focusedTool = this.worksheet.blocks.find(b => b.id == tool.id);

				this.showTool(tool.id);

				this.$parent.socket.emit('focusTool', {
					userId: this.$auth.user.id,
					userName: this.$auth.user.nicename,
					fieldId: tool.id
				});
			},

			blurTool(tool) {

				this.focusedTool = null;
				this.deselectTool();

				this.$parent.socket.emit('blurTool', {
					userId: this.$auth.user.id,
					fieldId: tool.id
				});
			},

			showTool(tool) { this.selectedTool = tool; },
			deselectTool() { this.selectedTool = null; },

			broadcastNewAnswer(answer) {

				console.log('broadcastNewAnswer', answer);
				this.$parent.socket.emit('newAnswer', answer);
			}
		}
	}
</script>

<style scoped lang="less">

	.uploader-start {

		text-align: center;

		img {

			width: 60px*2;
			image-rendering: pixelated;
			display: block;
			margin: 0 auto;
			margin-bottom: @margin-double;
		}
	}

	.editor-controls {

		display: flex;
		align-items: center;

		.controls-info {

			font-size: 0.8rem;
		}

		.controls-buttons {

			margin-left: auto;
		}
	}

	.message-fields {

		display: flex;
		justify-content: space-between;
	}

	.pdf-page {

		display: block;
		border: 2px solid transparent;
		border-radius: @radius-2;
		transition: all 150ms;
		position: relative;

		.page-name {

			position: absolute;
			display: block;
			box-sizing: border-box;
			bottom: @margin-default;
			right: @margin-default;
			z-index: 10;
			background: @primary;
			color: white;
			font-size: 0.8rem;
			padding: @margin-half @margin-default;
			border-radius: @radius-2;
			opacity: 0;
			transition: opacity 500ms;
		}

		img {

			transition: opacity 500ms;
		}

		&:hover {

			background: @background-1;

			img {

				opacity: 0.5;
			}

			.page-name {

				opacity: 1;
			}
		}

		&.is-selected {

			border-color: @primary;
		}
	}

	.pdf-editor {

		.editor-page {

			border-radius: @component-border-radius;
			box-shadow: @-shadow-3;

			img {

				border-radius: @component-border-radius;
			}

			.page-opacity {

				.overlay-element();
				z-index: 10;
				opacity: 0;
				pointer-events: none;
				background: fade(black, 50%);
				transition: opacity 150ms;

				&.is-active {

					pointer-events: all;
					opacity: 1;
				}
			}

			.page-content {

				.overlay-element();
			}
		}
	}

	/deep/ .file-uploader {
		.file-uploader-dropzone {

			aspect-ratio: auto;
			height: 500px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

</style>