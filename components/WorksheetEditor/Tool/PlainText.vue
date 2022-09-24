<template>
	<div class="block-tool-wrapper" v-if="block">

		<p :class="contrastColor" class="block-type">Plain Text</p>
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

		<graded-content-editable
			tag="p"
			class="mb-double"
			:noNL="false"
			v-model="block.content.text"
			default-text="Set a text for this block"
		/>

		<div class="message message-alert" v-if="$contrast(value.styles.color, value.styles.backgroundColor) < 4.5">
			<p>The contrast between your text color and background color is off. We recomend you improve the contrast for readability.</p>
		</div>

		<portal v-if="isCurrentBlock" to="tool-area-editor">
		</portal>
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