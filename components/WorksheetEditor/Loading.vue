<template>
	<div>
		<i v-if="loading" class="fas fa-fw fa-circle-notch fa-spin"></i>
		<i v-else class="fal fa-fw fa-check-circle"></i>
	</div>
</template>

<script>
	import WorksheetMixin from '~/pages/worksheets/worksheet.mixin.js';

	export default {
		name: 'WorksheetEditorLoading',
		mixins: [ WorksheetMixin ],
	}
</script>

<style scoped lang="less">

</style>