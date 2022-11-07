<template>
	<div class="block-tool-wrapper is-live" v-if="block">

		<h2 class="block-name-wrapper"><span class="block-name">{{ block.name }}</span></h2>
		<form-group>
			<input type="text" v-model="answer" class="input-block form-control" placeholder="Enter your answer here">
		</form-group>

		<portal v-if="isCurrentBlock" to="tool-area-editor">
		</portal>
	</div>
</template>

<script>
	import BlockMixin from './tool.mixin.js';

	export default {
		mixins: [ BlockMixin ],
	}
</script>

<style lang="less" scoped>

</style>