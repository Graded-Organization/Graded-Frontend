<template>
	<div class="block-tool-wrapper is-live" v-if="block">

		<h2 class="block-name-wrapper">{{ block.name }}</h2>

		<p>{{ block.content.text }}</p>
	</div>
</template>

<script>
	import BlockMixin from './tool.mixin.js';

	export default {
		mixins: [ BlockMixin ],
		mounted() {

			if(!this.block?.content?.text) {
				this.block.content.text = '';
			}
		},
	}
</script>

<style lang="less" scoped>

</style>