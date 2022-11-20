<template>
	<file-uploader
		@update="uploadAttachment"
		accept="image/*"
	>
		<span class="uploader-image" v-if="image">
			<transition-fade>
				<img
					:src="image"
					v-show="imgLoaded"
					@load="onImgLoad"
				>
			</transition-fade>
		</span>
		<span class="uploader-drop-text" aria-hidden="true">
			<slot name="uploader-drop-text"></slot>
		</span>
	</file-uploader>
</template>
<script>
	export default {
		name: 'ThumbnailUploader',
		data: () => ({
			imgLoaded: false,
			cache: 0
		}),
		props: {
			value: {
				type: String,
				default: ''
			},
		},
		computed: {
			image: {
				get() {
					return this.value + `&cache=${ this.cache }`;
				},
				set(val) {
					obj.$emit('input', val);
				}
			}
		},
		methods: {
			onImgLoad() {
				var obj = this;
				setTimeout(function() { obj.imgLoaded = true; }, 300);
			},
			async uploadAttachment(files) {
				var obj = this;

				var formData = new FormData();
				formData.append('file', files[0]);

				//$('.vts-file-dropzone').loading();

				const res = await obj.$axios.$post('/users/me/avatar', formData);

				this.cache++;
				obj.$emit('uploaded', res.data);

				//$('.vts-file-dropzone').loading('done');
			}
		}
	}
</script>

<style lang="less" scoped>

	/deep/ .file-uploader-dropzone {

		border-radius: @radius-round !important;
		overflow: hidden;

		img {

			border-radius: @radius-round !important;
		}

		&:hover {

			.uploader-drop-text {

				opacity: 1;
			}
		}
	}

	.uploader-drop-text {

		position: absolute;
		.overlay-element();
		color: white;
		background: fade(black, 75%);
		opacity: 0;
		transition: opacity 500ms;
	}

</style>