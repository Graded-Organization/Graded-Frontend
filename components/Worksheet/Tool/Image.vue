<template>
	<div class="block-tool-wrapper is-live" v-if="block" :key="blockUpdateKey">
		<img class="tool-image" v-if="this.block.content.image.url" :src="this.block.content.image.url" alt="">
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
	}
</script>

<style lang="less" scoped>

	.tool-image {

		.overlay-element();
		object-fit: cover;
	}

</style>