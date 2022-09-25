<template>
	<div class="block-tool-wrapper" v-if="block" :key="blockUpdateKey">

		<img class="tool-image" v-if="this.block.content.image.url" :src="this.block.content.image.url" alt="">

		<portal v-if="isCurrentBlock" to="tool-area-editor">

			<worksheet-editor-drawer-block title="Tool Options">

				<div class="image-selected-wrapper" v-if="block.content.image.url">
					<h2 class="drawer-block-subtitle">Image selected</h2>

					<div class="image-selected" >
						<a href="#" @click.prevent="removeImage" class="button button-danger button-xsmall button-remove">Remove Image</a>

						<img :src="block.content.image.url" alt="">
					</div>
				</div>
				<div v-else class="select-image">
					<h2 class="drawer-block-subtitle">Search for your image</h2>
					<unsplash-search @image-selected="setImage"></unsplash-search>
				</div>
			</worksheet-editor-drawer-block>
		</portal>
	</div>
</template>

<script>
	import BlockMixin from './tool.mixin.js';
	import Vue from 'vue';

	export default {
		mixins: [ BlockMixin ],
		data: () => ({}),
		mounted() {

			if(!this.block?.content?.image) {
				Vue.set(this.block.content, 'image', { url: '' });
			}
		},
		methods: {
			setImage(img) {

				if(img) {

					Vue.set(this.block.content.image, 'url', img);
					this.$forceUpdate();
				}
			},
			removeImage() {
				Vue.set(this.block.content.image, 'url', '');
			}
		}
	}
</script>

<style lang="less" scoped>

	.tool-image {

		.overlay-element();
		object-fit: cover;
	}

	.image-selected {

		height: 300px;

		img {

			object-fit: cover;
			.overlay-element();
		}

		.button-remove {

			position: absolute;
			right: @margin-default;
			top: @margin-default;
			opacity: 0;
			transition: opacity 500ms;
			z-index: 2;
		}

		&:hover {

			.button-remove {

				opacity: 1;
			}
		}
	}

</style>