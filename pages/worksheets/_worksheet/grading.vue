<template>
	<div class="section-dashboard-grading" v-if="grading">
		<div class="inner boxfix-vert">
			<div class="m-double">
				<div class="grading-wrapper">
					<div class="grading-content">
						<div class="the-content">
							<h2>Question Weight</h2>
							<p class="mb-double">Each question can contribute with a different weight towards the final grade. Edit below if you wish to attribute different weights to each question. The sum must always be 100%.</p>

							<form-group class="text-right">
								<strong>Question weight sum</strong>
								<input type="number" class="form-control form-control-small form-control-weight">
							</form-group>

							<div class="questions">
								<form-group
									class="question"
									v-for="block in blocks"
									v-if="block.type == 'multiple-choice-question' && !!block.content.grading.active"
								>
									<input type="number" class="form-control form-control-small form-control-weight">
									<span>{{ block.name || 'Question with no name' }}</span>
								</form-group>
							</div>

							<p class="text-right"><a href="#" class="button button-link">Reset Distribution</a></p>
						</div>
					</div>
					<aside class="grading-sidebar">

						<h3>Grading settings</h3>

						<form-group label="Maxmimum points in sheet">
							<input
								v-model.number="grading.maxPoints"
								type="number"
								class="input-block form-control"
							>
						</form-group>

						<form-group label="Minimum percentage to pass">
							<input
								v-model.number="grading.minToPass"
								type="number"
								class="input-block form-control"
							>
						</form-group>

						<form-group>
							<toggle-switch
								v-model="grading.hideDecimals"
								label="Show Decimals"
								off-label="Hide Decimals"
							/>
						</form-group>

						<form-group label="Number of attemps allowed">
							<input
								v-model="grading.numberOfAttempts"
								type="number"
								class="input-block form-control"
							>
						</form-group>

						<form-group>
							<toggle-switch
								v-model="grading.showCorrectResponses"
								label="Show correct responses after final attempt"
								off-label="Don't show correct responses after final attempt"
							/>
						</form-group>

						<form-group label="Minimum questions answered before submission">
							<input
								v-model="grading.minQuestionsBeforeSubmission"
								type="number"
								class="input-block form-control"
							>
						</form-group>

						<p class="text-right">
							<a href="#" class="button button-link">Reset Grading</a>
						</p>
					</aside>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapGetters, mapActions } from 'vuex';
	import WorksheetMixin from '../worksheet.mixin.js';

	export default {
		name: 'WorkSheetPageGrading',
		middleware: 'auth',
		mixins: [ WorksheetMixin ],
		watch: {
			grading: {
				handler(n, o) {
					this.setWorksheetProp({name: 'grading', value: this.$shallow(n) });
					this.save();
				},
				deep: true
			}
		},
		data: () => ({
			grading: null,
		}),
		mounted() {



			if(!this.worksheet?.content?.grading) {
				this.setWorksheetProp({name: 'grading', value: {
					maxPoints: 100,
					minToPass: 75,
					hideDecimals: false,
					numberOfAttempts: 1,
					showCorrectResponses: false,
					minQuestionsBeforeSubmission: 0
				}});
			}
			Vue.set(this, 'grading', this.$shallow(this.worksheet.content.grading));
		},
		methods: {
			...mapActions({
				setWorksheetProp: 'worksheet/setWorksheetProp'
			})
		}
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

		.form-control-weight {

			width: 50px;
		}

		.question {

			padding: @margin-default 0;
			border-bottom: 1px solid @gray-1;

			&:first-child {
				border-top: 1px solid @gray-1;
			}
		}
	}

</style>