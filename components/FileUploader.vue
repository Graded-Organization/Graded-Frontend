<template>
	<label
		:for="id"
		:class="[
			'file-uploader',
			{
				'file-uploader-droppable': droppable,
				'file-uploader-selected': !!localFiles.length,
			},
			classes.label,
		]"
	>
		<input
			:id="id"
			ref="input"
			v-bind="$attrs"
			type="file"
			:class="['file-uploader-input', classes.input]"
			@change="onChange"
			v-on="$listeners"
		/>
		<span :class="['file-uploader-text', classes.text]">
			<slot name="label">{{ label }}</slot>
		</span>

		<div
			class="file-uploader-dropzone"
			@dragenter.prevent="droppable = true"
		>
			<slot v-bind="{ files: localFiles, droppable }">
				<span
					class="uploader-drop-text"
					aria-hidden="true"
				>
					{{ dropText }}
				</span>
			</slot>

			<span
				v-if="droppable"
				class="file-uploader-overlay"
				@drop.prevent="onDrop"
				@dragenter.stop="droppable = true"
				@dragleave.stop="droppable = false"
				@dragover.prevent
			>
				<slot name="overlay" />
			</span>
		</div>
	</label>
</template>

<script>
	export default {
		name: 'FileUploader',
		model: {
			prop: 'files',
			event: 'update',
		},
		props: {
			label: {
				type: String,
				default: ''
			},
			dropText: {
				type: String,
				default: 'Choose files or drop here'
			},
			files: {
				type: Array,
				default: () => []
			},

			classes: {
				type: Object,
				default: () => ({})
			},
		},
		data: () => ({
			localFiles: [],
			droppable: false,
		}),
		watch: {
			files(files) {
				this.localFiles = files;
			},
			localFiles() {
				this.droppable = false;
			},
		},
		created() { this.id = this.$attrs.id || 'file-uploader-' + this.$randomString(4); },
		methods: {
			onChange(event) {

				const files = Array.from(event.target.files);
				this.localFiles = files;

				if(files.length > 0) {
					this.$emit('update', files);
				}
			},

			onDrop(event) {
				const files = Array.from(event.dataTransfer.files);
				const isMulti = this.$attrs.multiple != null;

				if (!isMulti && files.length > 1) {
					files.length = 1;
				}
				this.localFiles = files;
				this.$emit('update', files);
			},
		},
	};
</script>

<style scoped lang="less">

	.file-uploader {

		.file-uploader-dropzone {

			border-radius: 5px;
			position: relative;
			aspect-ratio: 1;
		}

		.file-uploader-overlay {

			background: fade(white, 12.5%);
		}

		.file-uploader-input {

			position: absolute;
			overflow: hidden;
			clip: rect(0 0 0 0);
			width: 1px;
			height: 1px;
			margin: -1px;
			border: 0;
			padding: 0;
		}

		.file-uploader-dropzone {

			position: relative;
			text-align: center;
			border: 1px solid #CCC;
		}

		.uploader-image {

			.overlay-element();
			overflow: hidden;

			img {

				.overlay-element();
				width: 95%;
				height: 95%;
				margin: 2.5%;
			}
		}

		.uploader-drop-text {

			.overlay-element();
			box-sizing: border-box;
			display: block;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 20px;
		}

		.file-uploader-overlay {

			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
		}

		input:focus ~ .file-uploader-dropzone {

			outline-width: 100px;
			outline-style: auto;
			outline-color: -webkit-focus-ring-color;
		}
	}
</style>