<template>
	<div class="block-tool-wrapper" v-if="block" :key="blockUpdateKey">

		<img class="tool-image" v-if="this.block.content.image.url" :src="this.block.content.image.url" :style="style" alt="">

		<portal v-if="isCurrentBlock" to="tool-area-editor">

			<worksheet-editor-drawer-block title="Tool Options">

				<div class="image-selected-wrapper mb-default" v-if="block.content.image.url">
					<h2 class="drawer-block-subtitle">Image selected</h2>

					<div class="image-selected" >
						<a href="#" @click.prevent="removeImage" class="button button-danger button-xsmall button-remove">Remove Image</a>

						<img :src="block.content.image.url" alt="">
					</div>
				</div>
				<div v-else class="select-image mb-default">
					<h2 class="drawer-block-subtitle">Search for your image</h2>
					<unsplash-search @image-selected="setImage"></unsplash-search>
				</div>

				<form-group label="Background Position (x, y)">
					<div class="row">
						<div class="col">
							<select v-model="block.content.positionX" class="input-block form-control">
								<option value="right">Right</option>
								<option value="left">Left</option>
								<option value="center">Center</option>
							</select>
						</div>
						<div class="col">
							<select v-model="block.content.positionY" class="input-block form-control">
								<option value="top">Top</option>
								<option value="bottom">Bottom</option>
								<option value="center">Center</option>
							</select>
						</div>
					</div>
				</form-group>

				<form-group label="Image Fit">
					<select v-model="block.content.fit" class="input-block form-control">
						<option value="cover">Cover</option>
						<option value="contain">Contain</option>
						<option value="fill">Fill</option>
					</select>
				</form-group>


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

			if(!this.block?.content?.positionX) Vue.set(this.block.content, 'positionX', 'center');
			if(!this.block?.content?.positionY) Vue.set(this.block.content, 'positionY', 'center');
			if(!this.block?.content?.fit) Vue.set(this.block.content, 'fit', 'cover');
		},
		computed: {

			style() {

				return {

					objectPosition: `${ this.block?.content?.positionX || 'center' } ${ this.block?.content?.positionY || 'center' }`,
					objectFit: `${ this.block?.content?.fit || 'cover' }`
				}

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