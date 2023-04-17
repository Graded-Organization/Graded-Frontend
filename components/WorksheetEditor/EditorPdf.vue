<template>
	<div class="editor" v-if="worksheet" ref="editor">
		<template v-if="!Object.values(worksheet.content).length">
			<file-uploader
				@update="uploadAttachment"
				accept="application/pdf"
				:loading="uploadingAttachment"
			>
				<div class="uploader-start">
					<graded-pdf-animation />
					<p>To start, please load a PDF file.</p>
				</div>
			</file-uploader>
		</template>

		<div class="editor-wrapper" ref="editorWrapper" v-else>

			<div class="editor-controls mb-default">
				<p class="controls-info"><strong>Total pages:</strong> {{ Object.values(pages).length }}</p>
				<!--<p class="controls-buttons">
					<a href="#" @click="startAgain" class="button button-ghost-primary button-small">Upload new PDF</a>
					<a
						href="#"
						v-if="mode === 'editor'"
						@click="mode = 'pages'"
						class="button button-ghost-primary button-small"
					>Select Pages</a>
					<a
						href="#"
						v-if="mode === 'pages'"
						@click="mode = 'editor'"
						class="button button-ghost-primary button-small"
					>View Editor</a>
				</p>-->
			</div>

			<transition-slide>
				<div class="message message-fields mb-default" v-if="loadFields == null && !fieldsFromPDF">
					<span>Hey, it looks like your PDF has form fields, do you want to load them in your worksheet?</span>

					<span class="buttons">
						<a
							href="#"
							@click.prevent="loadPDFFields(true)"
							class="button button-small button-primary"
						>Yes, please kind sir</a>
						<a
							href="#"
							@click.prevent="loadPDFFields(false)"
							class="button button-small button-danger"
						>No need</a>
					</span>
				</div>
			</transition-slide>

			<template v-if="mode === 'pages'">
				<p class="text-center mb-default">Please select what pages do you want to use:</p>
				<div class="row">
					<div class="col col-md-4" v-for="(page, i) in pages">
						<a
							class="pdf-page"
							:class="{ 'is-selected' : selectedPages.includes(page.id) }"
							href="#"
							@click.prevent="togglePage(page.id)"
						>
							<span class="page-name">Page {{ i + 1 }}</span>
							<img :src="page.image" alt="">
						</a>
					</div>
				</div>
			</template>

			<div class="pdf-editor" v-if="mode === 'editor'">

				<div class="editor-page" v-for="page in workingPages">
					<img :src="page.image" alt="">

					<div class="page-content">
						<div
							class="page-opacity"
							:class="{ 'is-active' : !!selectedTool || !!focusedTool }"
							@click="closeDrawer"
						></div>
						<worksheet-editor-pdf-field
							v-for="field in getPageFields(page.id)"
							:key="field.id"
							:value="field"
							:selected="selectedTool == field.id"
							:focused="focusedTool && focusedTool.id == field.id"
							@show-tool="showTool"
							@hide-tool="deselectTool"
							@focus-tool="focusTool"
							class="resize-drag"
						/>
					</div>
				</div>
			</div>
		</div>

		<worksheet-editor-drawer
			:show="showDrawer"
			@close="closeDrawer"
		>
			<worksheet-editor-pdf-field-editor
				v-if="!!focusedTool"
				:block="focusedTool"
				@update="update"
			/>

		</worksheet-editor-drawer>
	</div>
</template>

<script>
	import Vue from 'vue';

	import { mapGetters, mapActions } from 'vuex';
	import interact from 'interactjs';

	export default {
		name: 'WorkSheetEditorPDF',
		data: () => ({
			mode: '',
			loadFields: null,
			selectedPages: [],
			selectedTool: '', // Drawer open, big version visible
			focusedTool: null, // Drawer open
			showDrawer: false,
			updateKey: 0,
			position: { x: 0, y: 0 },
			uploadingAttachment: false,
			source: null,
		}),
		mounted() {
			const obj = this;

			this.selectedPages = this.worksheet.options?.selected_pages ? this.$shallow(this.worksheet.options?.selected_pages) : [];
			this.mode = this.selectedPages.length ? 'editor' : 'pages';

			const restrictToParent = interact.modifiers.restrict({
				restriction: 'parent',
				elementRect: { left: 0, right: 0, top: 0, bottom: 0 },
			});

			interact('.resize-drag')
				.resizable({
					edges: { top: true, left: true, bottom: true, right: true },
					listeners: {
						start: function(event) {
							console.log('start');
							event.target.classList.add('resizing');
							obj.showDrawer = false;
						},
						move: function(event) {
							let { x, y } = event.target.dataset;

							x = (parseFloat(x) || 0) + event.deltaRect.left;
							y = (parseFloat(y) || 0) + event.deltaRect.top;

							const pageContentWidth = document.querySelector('.page-content').clientWidth;
							const pageContentHeight = document.querySelector('.page-content').clientHeight;

							const width = event.rect.width * 100 / pageContentWidth;
							const height = event.rect.height * 100 / pageContentHeight;

							Object.assign(event.target.style, {
								width: `${ width }%`,
								height: `${ height }%`,
							});

							Object.assign(event.target.dataset, { x, y });
						},
						end: async function(event) {

							if(!!obj.source) obj.source.cancel('User saved again');
							obj.source = obj.$axios.CancelToken.source();

							obj.showDrawer = true;

							const pageContentWidth = document.querySelector('.page-content').clientWidth;
							const pageContentHeight = document.querySelector('.page-content').clientHeight;

							const width = event.rect.width * 100 / pageContentWidth;
							const height = event.rect.height * 100 / pageContentHeight;

							// get shallow content of focusedTool
							const focusedTool = obj.$shallow(obj.focusedTool);

							Vue.set(focusedTool.content.geo, 'width', width);
							Vue.set(focusedTool.content.geo, 'height', height);

							await obj.$axios.$put(`worksheet-blocks/${ obj.focusedTool.id }`, focusedTool, {
								cancelToken: obj.source.token,
							});

							event.target.classList.remove('resizing');
						},
					},
				})
				.draggable({
					modifiers: [restrictToParent],
					listeners: {
						start(event) {
							console.log(event.type, event.target);
							event.target.classList.add('dragging');

							obj.showDrawer = false;
						},
						move(event) {

							obj.position.x += event.dx;
							obj.position.y += event.dy;

							const pageContentWidth = document.querySelector('.page-content').clientWidth;
							const pageContentHeight = document.querySelector('.page-content').clientHeight;

							const x = obj.position.x * 100 / pageContentWidth;
							const y = obj.position.y * 100 / pageContentHeight;

							event.target.style.left = `${ x }%`;
							event.target.style.top = `${ y }%`;
						},
						end: async function(event) {

							if(!!obj.source) obj.source.cancel('User saved again');
							obj.source = obj.$axios.CancelToken.source();

							obj.showDrawer = true;

							// get .pdf-editor width
							const editorWidth = document.querySelector('.editor-page').clientWidth;
							const editorHeight = document.querySelector('.editor-page').clientHeight;

							// get shallow content of focusedTool
							const focusedTool = obj.$shallow(obj.focusedTool);

							Vue.set(focusedTool.content.geo, 'x', obj.position.x * 100 / editorWidth);
							Vue.set(focusedTool.content.geo, 'y', obj.position.y * 100 / editorHeight);

							await obj.$axios.$put(`worksheet-blocks/${ obj.focusedTool.id }`, focusedTool, {
								cancelToken: obj.source.token,
							});

							event.target.classList.remove('dragging');
						},
					},
				})
				.actionChecker(function(pointer, event, action, interactable, element, interaction) {

					if(interact.matchesSelector(event.target, '.resize-handle')) {

						// resize from the top and right edges
						action.name = 'resize';
						action.edges = { bottom: true, right: true };

					} else {

						action.name = 'drag';
					}

					return action;
				});
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
				return typeof this.worksheet.options?.fields_from_pdf !== 'undefined';
			},
			workingPages() {

				if(!this.worksheet.content?.pdf?.pages) return [];
				return Object.values(this.worksheet.content?.pdf?.pages).filter(p => this.selectedPages.includes(p.id));
			},
		},
		methods: {
			...mapActions({
				updateContent: 'worksheet/updateContent',
				updateOptions: 'worksheet/updateOptions',
				setWorksheet: 'worksheet/setWorksheet',
			}),
			update(val) {
				this.updateKey = val;
			},
			startAgain() {

				this.updateContent(null);
			},
			async loadPDFFields(flag) {
				const obj = this;

				if(flag) {

					let loader = this.$loading.show();
					const res = await obj.$axios.$post(`/worksheets/${ this.worksheet.id }/convert-fields`);
					loader.hide();
					this.setWorksheet(res.data.worksheet);
				}

				this.selectAllPages();

				this.updateOptions(this.$shallow({ ...this.worksheet.options, fields_from_pdf: flag }));

				this.loadFields = true;
				this.mode = 'editor';
			},
			//Select all pages
			selectAllPages() {

				this.selectedPages = this.pages.map(p => p.id);
				this.updateOptions(this.$shallow({ ...this.worksheet.options, selected_pages: this.selectedPages }));
			},
			// Toggles the selected page
			togglePage(page) {

				if(this.selectedPages.includes(page)) {

					this.selectedPages.splice(this.selectedPages.findIndex(p => p === page), 1);

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

				this.position.x = tool.x;
				this.position.y = tool.y;

				this.focusedTool = this.worksheet.blocks.find(b => b.id == tool.id);
				this.showDrawer = true;
			},

			showTool(tool) {

				this.selectedTool = tool;
				this.showDrawer = true;
			},

			deselectTool(tool) {

				this.selectedTool = null;
			},

			closeDrawer() {
				this.showDrawer = false;
				this.focusedTool = null;
			},

			async uploadAttachment(files) {
				var obj = this;

				this.uploadingAttachment = true;

				var formData = new FormData();
				formData.append('file', files[0]);

				const res = await obj.$axios.$post(`/worksheets/${ this.worksheet.id }/upload-pdf`, formData);

				this.uploadingAttachment = false;

				this.updateContent(res.data.worksheet.content);
				this.mode = 'pages';
			},
		},
	};
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
			background: @background-2;
			padding: @margin-half @margin-double;
			border-radius: @radius-2;
			position: absolute;
			right: 0;
			top: -3rem;
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
			width: 100%;
			height: 500px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

</style>