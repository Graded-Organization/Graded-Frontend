<template>
	<div class="block-tool-wrapper" v-if="block">

		<p class="block-type">Plain Text</p>
		<graded-content-editable
			tag="h2"
			v-model="block.name"
			v-slot="slotProps"
			class="block-name-wrapper"
			:default="`Untitled Block`"
			:classes="{ contenteditable: 'block-name' }"
		>
			<a href="#" v-show="!slotProps.isEditable"><i class="fa fa-fw fa-pencil" /></a>
		</graded-content-editable>
	</div>
</template>

<script>
	import BlockMixin from './tool.mixin.js';

	export default {
		mixins: [ BlockMixin ]
	}
</script>

<style lang="less" scoped>

</style>