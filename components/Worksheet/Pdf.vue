<template>
	<div class="editor mb-double" v-if="worksheet">

		<div class="selected-tool-info" v-if="selectedTool" :class="{ 'has-history': !!history }">
			<p>You are editing <strong>{{ selectedFieldInfo.name }}</strong> on {{ selectedFieldInfo.area }}</p>
			<p><a href="#" @click.prevent="showHistory(selectedTool)">View edits history</a></p>
		</div>

		<div class="editor-wrapper" ref="editorWrapper">
			<div class="pdf-editor">
				<div class="editor-page" v-for="page in workingPages">
					<img :src="page.image" alt="">

					<div class="page-content">
						<div
							@click="blurTool"
							class="page-opacity"
							:class="{ 'is-active' : !!selectedTool || !!focusedTool }"
						></div>
						<worksheet-pdf-field
							v-for="field in getPageFields(page.id)"
							:key="field.id"
							:value="field"
							:ref="`field-${field.id}`"
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

		<div
			class="drawer drawer-editor"
			:class="[ history ? 'is-visible' : '' ]"
		>
			<div class="component-actions p-half">
				<a href="#" class="button button-small" @click.prevent="history = false"><i class="fa fa-fw fa-times" /></a>
			</div>

			<h2 class="drawer-title" v-if="history && history.length">
				<small>{{ history[0].content.originalQuestion.name }}</small>
				<span>Answer History</span></h2>

			<div class="drawer-content">
				<div class="answer-history" v-if="history && history.length">
					<template v-for="(answer, i) in history">
						<div class="history-answer">
							<div href="#" class="history-actions" v-if="!!i">
								<a
									href="#"
									@click.prevent="restoreAnswer(answer.content.userAnswer, answer)"
									class="button button-xsmall button-primary"
								>Restore</a>
							</div>

							<img
								class="avatar"
								width="20"
								:src="`${ $config.apiUrl }/users/${ answer.id_user }/avatar?size=35`"
							>
							<div class="answer-content">
								<p class="answer-user">Edited by <strong>{{ answer.user.nicename }}</strong></p>
								<p class="answer-date">{{ $dayjs(answer.created).format('MM/DD/YYYY, hh:mm A') }}</p>
								<p class="content">"{{ answer.content.userAnswer || '(Blank)' }}"</p>
							</div>

						</div>
					</template>
				</div>
				<div class="empty" v-else>
					<img src="~/assets/images/template/tumbleweed.gif" alt="Empty, so empty...">
					<p>This field hasn't been edited.</p>
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
				default: () => ([]),
			},
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
			uploadingAttachment: false,
			history: false,
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
			selectedFieldInfo() {
				return this.worksheet.blocks.find(b => b.id == this.selectedTool);
			},
			pages() {

				if(!this.worksheet.content?.pdf?.pages) return [];

				return this.worksheet.content?.pdf?.pages || [];
			},
			fieldsFromPDF() {
				return this.worksheet.options?.fields_from_pdf;
			},
			workingPages() {

				if(!this.worksheet.content?.pdf?.pages) return [];

				return Object.values(this.worksheet.content?.pdf?.pages)
					.filter(p => this.selectedPages.includes(p.id));
			},
		},
		methods: {
			...mapActions({
				addAnswer: 'worksheet/addAnswer',
				updateContent: 'worksheet/updateContent',
				updateOptions: 'worksheet/updateOptions',
			}),
			async restoreAnswer(text, answer) {

				const content = {
					userAnswer: text,
					originalQuestion: answer,
				};
				console.log('restoreAnswer', answer, content);

				const theAnswer = {
					id_block: answer.id_block,
					content: content,
				};

				const applicationAnswer = await this.$axios.$post(`/worksheets/${ this.$route.params.uid }/answer`, theAnswer);

				this.addAnswer(applicationAnswer.data);

				this.broadcastNewAnswer(applicationAnswer.data);

				await this.showHistory(answer.id_block);
			},
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

				if(typeof this.$parent.socket !== 'undefined') {
					this.$parent.socket.emit('focusTool', {
						userId: this.$auth.user.id,
						userName: this.$auth.user.nicename,
						application: this.$route.params.uid,
						fieldId: tool.id,
					});
				}
			},

			blurTool(tool) {

				this.history = false;

				if(!!this.focusedTool) {

					console.log(this.focusedTool.id, this.$refs);
					// Run the blurField action on the ref of the field
					this.$refs[`field-${ this.focusedTool.id }`][0].blurField();
				}

				this.focusedTool = null;
				this.deselectTool();

				if(typeof this.$parent.socket !== 'undefined') {
					this.$parent.socket.emit('blurTool', {
						userId: this.$auth.user.id,
						application: this.$route.params.uid,
						fieldId: tool.id,
					});
				}
			},

			showTool(tool) { this.selectedTool = tool; },
			deselectTool() { this.selectedTool = null; },

			broadcastNewAnswer(answer) {

				console.log('broadcastNewAnswer', answer);

				answer.application = this.$route.params.uid;

				if(typeof this.$parent.socket !== 'undefined') {
					this.$parent.socket.emit('newAnswer', answer);
				}
			},

			async showHistory(idBlock) {

				const { data } = await this.$axios.$get(`/worksheets/${ this.$route.params.uid }/blocks/${ idBlock }/history`);
				this.history = data;
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

	.selected-tool-info {

		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		top: 0;
		background: @background-0;
		box-shadow: @shadow-3;
		padding: @margin-default;
		z-index: 1000;
		border-radius: 0 0 0.5rem 0.5rem;
		transition: all 150ms;

		&.has-history {

			top: -50vw;
		}
	}

	.drawer {

		height: calc(~'100vh - 55px') !important;
		top: 55px;
		width: 320px;
		right: -50vw;
		transition: right 0.3s ease-in-out;

		&.is-visible {

			right: 0;
		}
	}

	.drawer-title {

		position: sticky;
		top: 0;
		padding: @margin-default;
		z-index: 100;
		background: white;
		z-index: 2;
		line-height: 1.2;

		padding-right: 45px;

		small {

			font-size: 1rem;
			font-weight: bold;
			display: block;
		}
	}

	.history-answer {

		display: flex;
		padding: @margin_default;
		align-items: flex-start;
		position: relative;
		z-index: 1;
		transition: all 500ms;

		.history-actions {

			position: absolute;
			right: 0;
			top: 0;
			padding: @margin-default;
			opacity: 0;
			pointer-events: none;
			transition: opacity 500ms;
			z-index: 2;
		}

		&:hover {

			background: @background-1;

			.history-actions {

				opacity: 1;
				pointer-events: all;
			}
		}

		&:before {

			content: '';
			border-left: 2px solid @border-1;
			height: 100%;
			position: absolute;
			left: calc(~'0.75rem + 15px');
			top: 0;
			z-index: 1;
		}

		&:first-child {

			&:before {

				height: calc(~"100% - 0.75rem");
				top: auto;
				bottom: 0;
			}
		}

		&:last-child {

			&:before {

				height: 0.75rem;
			}
		}

		// if just one, remove the border
		&:only-child {

			&:before {

				display: none;
			}
		}

		.avatar {

			margin-right: @margin_default;
			border: 1px solid @border-1;
			position: relative;
			z-index: 2;
		}

		.answer-user,
		.answer-date {

			font-size: 0.8rem;
		}

		.answer-date {

			color: @background-5;
			font-weight: bold;
		}

		.content {

			font-style: italic;
		}
	}

	.empty {

		text-align: center;

		img {

			margin: 0 auto;
		}
	}

</style>