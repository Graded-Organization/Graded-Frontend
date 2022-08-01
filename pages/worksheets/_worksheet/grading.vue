<template>
	<div class="section-dashboard-grading">
		<div class="inner boxfix-vert">
			<div class="m-double">
				<div class="grading-wrapper">
					<div class="grading-content">
						<div class="the-content">
							<h2>Question Weight</h2>
							<p>Each question can contribute with a different weight towards the final grade. Edit below if you wish to attribute different weights to each question. The sum must always be 100%.</p>
						</div>
					</div>
					<aside class="grading-sidebar">
						<h3>Grading settings</h3>
					</aside>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';

	export default {
		name: 'WorkSheetPageGrading',
		middleware: 'auth',
		data: () => ({
		}),
	}
</script>

<style scoped lang="less">

	.section-dashboard-grading {

		display: flex;

		.inner, .inner > div {

			display: flex;
		}
	}

	.grading-wrapper {

		display: flex;

		.grading-content {

			flex: 1;
			min-height: 100px;
			padding-right: @margin-double;
		}

		.grading-sidebar {

			width: 320px;
			padding-left: @margin-double;
			min-height: 100px;
			border-left: 1px solid @border-1;
		}
	}

</style>