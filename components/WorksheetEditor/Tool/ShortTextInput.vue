<template>
	<div class="block-tool-wrapper" v-if="block">

		<p :class="contrastColor" class="block-type">Short Text input</p>
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

		<form-group>
			<input readonly type="text" class="input-block form-control" placeholder="Enter your answer here">
		</form-group>

		<portal v-if="isCurrentBlock" to="tool-area-editor">

			<worksheet-editor-drawer-block title="Grading">

				<toggle-switch
					v-model="block.content.grading.active"
					label="Question is part of grading"
					off-label="Question is not part of grading"
				/>
			</worksheet-editor-drawer-block>
		</portal>
	</div>
</template>

<script>
	import BlockMixin from './tool.mixin.js';
	import Vue from 'vue';

	export default {
		mixins: [ BlockMixin ],
		mounted() {

			if(!this.block?.content?.grading) {
				Vue.set(this.block.content, 'grading', { active: false });
			}
		},
	}
</script>

<style lang="less" scoped>

</style>